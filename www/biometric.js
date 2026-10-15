/*!
 * KodNaqi — المصادقة البيومترية (بصمة الإصبع / Face ID)
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 *
 * يستخدم WebAuthn API — معتمد من W3C
 * البصمة تبقى على الجهاز ولا تُرسَل لأي مكان.
 */

(function() {
  'use strict';

  const CREDENTIAL_KEY = 'kodnaqi_biometric_cred_id';
  const ENABLED_KEY = 'kodnaqi_biometric_enabled';
  const USER_ID_KEY = 'kodnaqi_biometric_user_id';

  // ═══════════════════════════════════════════════════
  // 1. فحص الدعم
  // ═══════════════════════════════════════════════════
  async function isSupported() {
    if (!window.PublicKeyCredential) return false;
    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return available === true;
    } catch (e) {
      console.warn('[Biometric] Check failed:', e);
      return false;
    }
  }

  function isEnabled() {
    return localStorage.getItem(ENABLED_KEY) === 'true'
      && !!localStorage.getItem(CREDENTIAL_KEY);
  }

  // ═══════════════════════════════════════════════════
  // 2. أدوات مساعدة
  // ═══════════════════════════════════════════════════
  function bufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64ToBuffer(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function getRpId() {
    // يعمل على localhost وعلى النطاق الحقيقي
    return location.hostname;
  }

  function generateChallenge() {
    return crypto.getRandomValues(new Uint8Array(32));
  }

  function getOrCreateUserId() {
    let id = localStorage.getItem(USER_ID_KEY);
    if (!id) {
      id = bufferToBase64(crypto.getRandomValues(new Uint8Array(16)));
      localStorage.setItem(USER_ID_KEY, id);
    }
    return base64ToBuffer(id);
  }

  // ═══════════════════════════════════════════════════
  // 3. التسجيل (تفعيل البصمة)
  // ═══════════════════════════════════════════════════
  async function register(username) {
    if (!await isSupported()) {
      return { success: false, error: 'غير مدعوم على هذا الجهاز' };
    }

    try {
      const challenge = generateChallenge();
      const userId = getOrCreateUserId();

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: {
            name: 'KodNaqi Diagnostics',
            id: getRpId()
          },
          user: {
            id: userId,
            name: username || 'admin',
            displayName: 'مدير KodNaqi'
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },   // ES256 (Android/iOS)
            { type: 'public-key', alg: -257 }  // RS256 (Windows Hello)
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',  // البصمة المدمجة
            userVerification: 'required',
            requireResidentKey: false
          },
          timeout: 60000,
          attestation: 'none'
        }
      });

      if (!credential) {
        return { success: false, error: 'لم يتم التسجيل' };
      }

      // حفظ credential ID
      const credId = bufferToBase64(credential.rawId);
      localStorage.setItem(CREDENTIAL_KEY, credId);
      localStorage.setItem(ENABLED_KEY, 'true');

      console.log('[Biometric] Registered successfully');
      return { success: true, credId: credId };

    } catch (err) {
      console.error('[Biometric] Register failed:', err);
      
      if (err.name === 'NotAllowedError') {
        return { success: false, error: 'تم إلغاء العملية' };
      }
      if (err.name === 'InvalidStateError') {
        return { success: false, error: 'البصمة مسجّلة بالفعل' };
      }
      return { success: false, error: err.message || 'فشل التسجيل' };
    }
  }

  // ═══════════════════════════════════════════════════
  // 4. المصادقة (الدخول بالبصمة)
  // ═══════════════════════════════════════════════════
  async function authenticate() {
    if (!isEnabled()) {
      return { success: false, error: 'البصمة غير مُفعّلة' };
    }

    try {
      const credIdBase64 = localStorage.getItem(CREDENTIAL_KEY);
      const credIdBuffer = base64ToBuffer(credIdBase64);

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: generateChallenge(),
          allowCredentials: [{
            id: credIdBuffer,
            type: 'public-key',
            transports: ['internal', 'hybrid']
          }],
          userVerification: 'required',
          timeout: 60000
        }
      });

      if (!assertion) {
        return { success: false, error: 'فشلت المصادقة' };
      }

      console.log('[Biometric] Authentication successful');
      return { success: true, credentialId: assertion.id };

    } catch (err) {
      console.error('[Biometric] Auth failed:', err);

      if (err.name === 'NotAllowedError') {
        return { success: false, error: 'تم إلغاء العملية' };
      }
      if (err.name === 'InvalidStateError') {
        // البصمة لم تعد موجودة (بيانات مسحوبة)
        disable();
        return { success: false, error: 'يجب إعادة التفعيل' };
      }
      return { success: false, error: err.message || 'فشل الدخول' };
    }
  }

  // ═══════════════════════════════════════════════════
  // 5. إلغاء التفعيل
  // ═══════════════════════════════════════════════════
  function disable() {
    localStorage.removeItem(CREDENTIAL_KEY);
    localStorage.removeItem(ENABLED_KEY);
    console.log('[Biometric] Disabled');
    return { success: true };
  }

  // ═══════════════════════════════════════════════════
  // 6. واجهة الإعدادات
  // ═══════════════════════════════════════════════════
  async function showSettings() {
    const supported = await isSupported();
    const enabled = isEnabled();

    if (!supported) {
      alert(
        '🔒 بصمة الإصبع غير متاحة\n\n' +
        'الأسباب المحتملة:\n' +
        '• الجهاز لا يدعم البصمة\n' +
        '• المتصفح قديم\n' +
        '• التطبيق لم يُثبَّت كـ PWA بعد'
      );
      return;
    }

    if (enabled) {
      const choice = confirm(
        '🔒 بصمة الإصبع مُفعّلة\n\n' +
        'هل تريد إلغاء تفعيلها؟'
      );
      if (choice) {
        disable();
        alert('✅ تم إلغاء البصمة');
        location.reload();
      }
      return;
    }

    const choice = confirm(
      '🔒 تفعيل بصمة الإصبع\n\n' +
      'سيتم تفعيل الدخول السريع ببصمة الإصبع.\n' +
      'ستستمر كلمة المرور كخيار احتياطي.\n\n' +
      'هل تريد المتابعة؟'
    );

    if (!choice) return;

    showToast('⏳ انتظر... ضع إصبعك على المستشعر', 'info');

    const result = await register('admin');

    if (result.success) {
      alert(
        '✅ تم تفعيل البصمة بنجاح!\n\n' +
        'من الآن يمكنك الدخول ببصمة الإصبع.'
      );
      location.reload();
    } else {
      alert('❌ ' + result.error);
    }
  }

  // ═══════════════════════════════════════════════════
  // 7. إضافة زر البصمة في شاشة الدخول
  // ═══════════════════════════════════════════════════
  function injectLoginButton() {
    if (!isEnabled()) return;
    if (document.getElementById('kn-biometric-login-btn')) return;

    // ابحث عن زر الدخول المباشر
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) {
      console.log('[Biometric] loginBtn not found yet');
      return;
    }

    const btn = document.createElement('button');
    btn.id = 'kn-biometric-login-btn';
    btn.type = 'button';
    btn.style.cssText = 'width:100%;padding:14px;margin-top:12px;background:linear-gradient(135deg,#198754,#20c997);color:white;border:none;border-radius:10px;font-family:Cairo,sans-serif;font-weight:700;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 12px rgba(25,135,84,0.3);';
    btn.innerHTML = '<span style="font-size:1.4rem;">🔒</span> الدخول ببصمة الإصبع';

    btn.onclick = async function() {
      btn.disabled = true;
      btn.style.opacity = '0.7';
      btn.innerHTML = '<span style="font-size:1.4rem;">⏳</span> انتظر... ضع إصبعك';

      const result = await authenticate();

      if (result.success) {
        btn.innerHTML = '<span style="font-size:1.4rem;">✅</span> تم التحقق!';
        btn.style.background = '#198754';

        setTimeout(async function() {
          const lastUser = localStorage.getItem('kodnaqi_last_user') || 'admin';
          
          if (typeof window.loginWithBiometric === 'function') {
            const result = await window.loginWithBiometric(lastUser);
            
            if (result && result.success) {
              console.log('[Biometric] ✅ Logged in successfully');
              // postLoginInit مسؤول عن الانتقال
            } else {
              alert('❌ فشل الدخول بالبصمة:\n' + (result ? result.error : 'خطأ غير معروف'));
              btn.disabled = false;
              btn.style.opacity = '1';
              btn.innerHTML = '<span style="font-size:1.4rem;">🔒</span> الدخول ببصمة الإصبع';
            }
          } else {
            alert('⚠️ دالة الدخول بالبصمة غير محمّلة\n\nافتح التطبيق من جديد.');
            location.reload();
          }
        }, 400);
      } else {
        btn.innerHTML = '<span style="font-size:1.4rem;">🔒</span> الدخول ببصمة الإصبع';
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(135deg,#198754,#20c997)';

        if (result.error !== 'تم إلغاء العملية') {
          const errDiv = document.getElementById('loginError');
          if (errDiv) {
            errDiv.textContent = '❌ ' + result.error;
            errDiv.style.display = 'block';
          } else {
            alert('❌ ' + result.error);
          }
        }
      }
    };

    // أدخل بعد زر الدخول مباشرة
    loginBtn.parentElement.insertBefore(btn, loginBtn.nextSibling);
  }

  // ═══════════════════════════════════════════════════
  // 8. Toast
  // ═══════════════════════════════════════════════════
  function showToast(msg, type) {
    type = type || 'info';
    const colors = { success: '#198754', error: '#dc3545', info: '#0d3b66', warning: '#ffc107' };
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:' + colors[type] + ';color:white;padding:12px 24px;border-radius:25px;font-family:Cairo,sans-serif;font-size:0.95rem;font-weight:700;z-index:999999;box-shadow:0 5px 20px rgba(0,0,0,0.3);max-width:90%;text-align:center;';
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function() { toast.remove(); }, 300);
    }, 2500);
  }

  // ═══════════════════════════════════════════════════
  // API عام
  // ═══════════════════════════════════════════════════
  window.KNBiometric = {
    isSupported: isSupported,
    isEnabled: isEnabled,
    register: register,
    authenticate: authenticate,
    disable: disable,
    showSettings: showSettings,
    injectLoginButton: injectLoginButton
  };

  // التهيئة — راقب ظهور شاشة الدخول
  function init() {
    // حاول مباشرة
    injectLoginButton();

    // راقب التغييرات (شاشة الدخول تظهر/تختفي)
    const observer = new MutationObserver(function() {
      injectLoginButton();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // محاولات متعددة (في حال ظهور الشاشة متأخرًا)
    setTimeout(injectLoginButton, 500);
    setTimeout(injectLoginButton, 1500);
    setTimeout(injectLoginButton, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  console.log('🔒 KodNaqi Biometric System loaded');
})();
