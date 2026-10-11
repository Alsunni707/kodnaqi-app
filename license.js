/*!
 * KodNaqi PWA — نظام الترخيص
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 * All Rights Reserved.
 */

(function() {
  'use strict';

  const _k = [0x4b, 0x4f, 0x44, 0x4e, 0x41, 0x51, 0x49, 0x5f,
              0x53, 0x45, 0x43, 0x52, 0x45, 0x54, 0x5f, 0x32,
              0x30, 0x32, 0x36];
  const SECRET = _k.map(function(c) { return String.fromCharCode(c ^ 0x5A); }).join('');

  const STORAGE_KEY = 'kodnaqi_license';
  const TRIAL_KEY = 'kodnaqi_trial_start';
  const TRIAL_DAYS = 14;
  const LICENSE_DAYS = 365;        // مدة الترخيص السنوي: سنة كاملة
  const WARN_DAYS = 30;            // تحذير قبل الانتهاء بـ 30 يومًا

  function simpleHash(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    return ((h2 >>> 0) * 4294967296 + (h1 >>> 0)).toString(36).toUpperCase();
  }

  function hmac(payload) {
    return simpleHash(payload + '|' + SECRET).slice(0, 4);
  }

  function randomChars(len) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < len; i++) {
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    return s;
  }

  // ═══ كود الجهاز ═══
  function computeDeviceCodeFromFingerprint(fp) {
    if (!fp) return null;
    const hash = simpleHash(fp + '|KN-DEVICE-2026');
    // خذ 6 أحرف فقط
    let code = hash.replace(/[^A-Z0-9]/g, '');
    while (code.length < 6) code += 'X';
    return code.slice(0, 6).toUpperCase();
  }

  async function getMyDeviceCode() {
    if (!window.KodNaqiSecurity) {
      // fallback — استخدم إشارات المتصفح
      const fp = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset()
      ].join('|');
      return computeDeviceCodeFromFingerprint(fp);
    }
    const fp = await window.KodNaqiSecurity.getDeviceFingerprint();
    return computeDeviceCodeFromFingerprint(fp);
  }

  function formatDeviceCode(code) {
    if (!code || code.length !== 6) return code || '';
    return code.slice(0, 3) + '-' + code.slice(3);
  }

  // ═══ توليد المفتاح (مع كود الجهاز) ═══
  function generateKey(type, deviceCode, yearMonth) {
    if (!deviceCode) deviceCode = 'XXXXXX';
    deviceCode = deviceCode.replace(/-/g, '').toUpperCase();
    if (deviceCode.length !== 6) {
      throw new Error('كود الجهاز يجب أن يكون 6 أحرف');
    }
    
    // إذا لم يُحدَّد تاريخ، استخدم الشهر الحالي
    if (!yearMonth) {
      const now = new Date();
      yearMonth = String(now.getFullYear()).slice(-2) + String(now.getMonth() + 1).padStart(2, '0');
    }
    yearMonth = yearMonth.replace(/[^0-9]/g, '');
    if (yearMonth.length !== 4) {
      throw new Error('التاريخ يجب أن يكون 4 أرقام (YYMM)');
    }
    
    const sig = hmac(type + deviceCode + yearMonth).slice(0, 4);
    return 'KOD-' + type + '-' + deviceCode + '-' + yearMonth + '-' + sig;
  }

  // ═══ التحقق من المفتاح ═══
  async function verifyKey(key) {
    if (!key) return { valid: false, reason: 'empty' };
    
    const parts = key.trim().toUpperCase().split('-');
    if (parts.length !== 5 || parts[0] !== 'KOD') {
      return { valid: false, reason: 'format' };
    }
    
    const type = parts[1];
    const deviceCode = parts[2];    // 6 أحرف
    const yearMonth = parts[3];      // 4 أرقام (YYMM)
    const sig = parts[4];            // 4 أحرف
    
    if (deviceCode.length !== 6 || yearMonth.length !== 4 || sig.length !== 4) {
      return { valid: false, reason: 'format' };
    }
    
    // التحقق أن التاريخ أرقام فقط
    if (!/^\d{4}$/.test(yearMonth)) {
      return { valid: false, reason: 'format' };
    }
    
    // 1. التحقق من التوقيع
    const expectedSig = hmac(type + deviceCode + yearMonth).slice(0, 4);
    if (sig !== expectedSig) {
      return { valid: false, reason: 'signature' };
    }
    
    // 2. التحقق من أن المفتاح يخص هذا الجهاز
    if (deviceCode !== 'XXXXXX') {
      const myCode = await getMyDeviceCode();
      if (myCode && deviceCode !== myCode) {
        return { 
          valid: false, 
          reason: 'wrong_device',
          expected: deviceCode,
          actual: myCode
        };
      }
    }
    
    // 3. استخراج تاريخ الإصدار
    const issueYear = 2000 + parseInt(yearMonth.slice(0, 2));
    const issueMonthNum = parseInt(yearMonth.slice(2, 4)) - 1;
    
    if (issueMonthNum < 0 || issueMonthNum > 11) {
      return { valid: false, reason: 'format' };
    }
    
    const issueDate = new Date(issueYear, issueMonthNum, 1).getTime();
    
    return { 
      valid: true, 
      type: type, 
      key: key.toUpperCase(), 
      deviceCode: deviceCode,
      yearMonth: yearMonth,
      issueDate: issueDate
    };
  }

  function getTrialStart() {
    let start = localStorage.getItem(TRIAL_KEY);
    if (!start) {
      start = Date.now().toString();
      localStorage.setItem(TRIAL_KEY, start);
    }
    return parseInt(start);
  }

  function getTrialDaysLeft() {
    const start = getTrialStart();
    const elapsed = Date.now() - start;
    const daysLeft = TRIAL_DAYS - Math.floor(elapsed / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  }

  function saveLicense(key, type) {
    const now = Date.now();
    const data = {
      key: key.toUpperCase(),
      type: type,
      activated: now,
      expiresAt: now + (LICENSE_DAYS * 24 * 60 * 60 * 1000)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getLicense() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function clearLicense() {
    localStorage.removeItem(STORAGE_KEY);
  }

  async function getStatus() {
    // وضع المطوّر — تجاهل كل شيء
    if (localStorage.getItem('kodnaqi_dev_mode') === 'true') {
      return { status: 'dev' };
    }
    const lic = getLicense();
    if (lic) {
      const check = await verifyKey(lic.key);
      if (check.valid) {
        // مفتاح تجريبي محفوظ سابقًا — نتجاهله ونحسب التجربة
        if (check.type === 'T') {
          clearLicense();
        } else {
          // التحقق من انتهاء الصلاحية
          const now = Date.now();
          const expiresAt = lic.expiresAt || (lic.activated + LICENSE_DAYS * 86400000);
          const daysLeft = Math.ceil((expiresAt - now) / 86400000);

          if (daysLeft <= 0) {
            // انتهى الترخيص السنوي
            return {
              status: 'license_expired',
              type: lic.type,
              key: lic.key,
              activated: lic.activated,
              expiresAt: expiresAt,
              daysLeft: 0
            };
          }

          return {
            status: daysLeft <= WARN_DAYS ? 'license_warning' : 'licensed',
            type: lic.type,
            key: lic.key,
            activated: lic.activated,
            expiresAt: expiresAt,
            daysLeft: daysLeft
          };
        }
      }
    }
    const daysLeft = getTrialDaysLeft();
    if (daysLeft > 0) {
      return { status: 'trial', daysLeft: daysLeft, total: TRIAL_DAYS };
    }
    return { status: 'expired', daysLeft: 0 };
  }

  async function activateWithKey(key) {
    const check = await verifyKey(key);
    if (!check.valid) {
      let errorMsg = 'المفتاح غير صحيح';
      if (check.reason === 'wrong_device') {
        errorMsg = 'هذا المفتاح مُصدَر لجهاز آخر.\n\n' +
                   'الرجاء إرسال كود جهازك الحالي للدعم.';
      } else if (check.reason === 'signature') {
        errorMsg = 'المفتاح مُعدَّل أو غير أصلي';
      } else if (check.reason === 'format') {
        errorMsg = 'صيغة المفتاح غير صحيحة';
      }
      return { success: false, reason: check.reason, message: errorMsg };
    }

    // مفتاح تجريبي (T) → لا يُحفظ كترخيص دائم
    if (check.type === 'T') {
      // إعادة ضبط بداية التجربة إلى الآن
      localStorage.setItem(TRIAL_KEY, Date.now().toString());
      return { success: true, type: 'T', isTrial: true };
    }

    // مفتاح كامل (F) أو مؤسسي (E) → يُربط ببصمة الجهاز مع تاريخ المفتاح
    if (window.KodNaqiSecurity) {
      const payload = await window.KodNaqiSecurity.createLicensePayload(
        key, check.type, '', check.issueDate
      );
      // احفظ تاريخ الإصدار أيضاً
      payload.issuedAt = check.issueDate;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      localStorage.setItem('kodnaqi_device_key', payload.deviceKey || payload.deviceId);
      console.log('[License] Bound to device, expires:', new Date(payload.expiresAt).toLocaleDateString('ar-EG'));
    } else {
      // Fallback إذا لم يُحمَّل security.js
      console.warn('[License] Security layer not loaded — using fallback');
      const now = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        key: key.toUpperCase(),
        type: check.type,
        activated: now,
        expiresAt: now + (LICENSE_DAYS * 86400000)
      }));
    }

    return { success: true, type: check.type, isTrial: false };
  }

  async function showLicenseDialog() {
    const status = await getStatus();

    if (status.status === 'dev') {
      if (confirm('🧑‍💻 وضع المطوّر مفعّل\n\nهل تريد إلغاؤه؟ (لتصبح كعميل عادي)')) {
        localStorage.removeItem('kodnaqi_dev_mode');
        location.reload();
      }
      return;
    }
    
    if (status.status === 'licensed' || status.status === 'license_warning') {
      const icon = status.status === 'license_warning' ? '⚠️' : '✅';
      const title = status.status === 'license_warning' 
        ? '⚠️ تنبيه: الترخيص ينتهي قريبًا' 
        : '✅ التطبيق مُرخَّص';
      
      alert(
        title + '\n\n' +
        'المفتاح: ' + status.key + '\n' +
        'النوع: ' + (status.type === 'F' ? 'ترخيص سنوي' :
                    status.type === 'E' ? 'ترخيص مؤسسي سنوي' : 'ترخيص') + '\n' +
        'تاريخ التفعيل: ' + new Date(status.activated).toLocaleDateString('ar-EG') + '\n' +
        'تاريخ الانتهاء: ' + new Date(status.expiresAt).toLocaleDateString('ar-EG') + '\n' +
        '⏳ المتبقي: ' + status.daysLeft + ' يوم' +
        (status.status === 'license_warning' ? '\n\n⚠️ للتجديد، تواصل معنا قبل انتهاء الفترة' : '') +
        '\n\n📧 kodnaqi@gmail.com\n📱 +249 111 729 111'
      );
      return;
    }

    if (status.status === 'license_expired') {
      const key = prompt(
        '⛔ انتهى ترخيصك السنوي!\n\n' +
        'تاريخ الانتهاء: ' + new Date(status.expiresAt).toLocaleDateString('ar-EG') + '\n\n' +
        'لتجديد الترخيص لسنة أخرى، يرجى:\n' +
        '1. تحويل الرسوم السنوية\n' +
        '2. إرسال إيصال الدفع إلى:\n' +
        '   📧 kodnaqi@gmail.com\n' +
        '   📱 +249 111 729 111\n\n' +
        'سنُرسل لك مفتاح التجديد خلال 24 ساعة.\n\n' +
        'هل لديك مفتاح التجديد الآن؟'
      );
      if (key && key.trim()) {
        const result = activateWithKey(key.trim());
        if (result.success && !result.isTrial) {
          alert('🎉 تم تجديد الترخيص بنجاح!\n\nصالح لمدة سنة كاملة من الآن.');
          location.reload();
        } else {
          alert('❌ المفتاح غير صحيح\n\nتأكد من إدخاله كاملًا.');
        }
      }
      return;
    }

    if (status.status === 'expired') {
      const key = prompt(
        '⛔ انتهت الفترة التجريبية (14 يومًا)\n\n' +
        'للمتابعة، يرجى إدخال مفتاح الترخيص:\n\n' +
        'للحصول على ترخيص، تواصل معنا:\n' +
        '📧 kodnaqi@gmail.com\n' +
        '📱 +249 111 729 111'
      );
      if (key) {
        const result = activateWithKey(key);
        if (result.success) {
          alert('✅ تم تفعيل الترخيص بنجاح!\n\nشكرًا لثقتكم بـ KodNaqi');
          location.reload();
        } else {
          alert('❌ مفتاح الترخيص غير صحيح\n\nتأكد من إدخال المفتاح كاملًا.');
        }
      }
      return;
    }

    alert(
      '⏱️ الفترة التجريبية\n\n' +
      'المتبقي: ' + status.daysLeft + ' يوم من ' + status.total + '\n\n' +
      'للحصول على ترخيص دائم:\n' +
      '📧 kodnaqi@gmail.com\n' +
      '📱 +249 111 729 111'
    );
  }

  // ═══ قفل الشاشة عند انتهاء الترخيص ═══
  function showExpiredLock() {
    const lock = document.createElement('div');
    lock.id = 'kn-license-lock';
    lock.style.cssText = `
      position: fixed; inset: 0; z-index: 999999;
      background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; font-family: 'Cairo', sans-serif;
    `;
    lock.innerHTML = `
      <div style="background: white; border-radius: 20px; padding: 40px 30px; max-width: 450px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
        <div style="font-size: 4rem; margin-bottom: 15px;">⛔</div>
        <h2 style="color: #991b1b; font-weight: 900; margin-bottom: 15px;">انتهى ترخيص التطبيق</h2>
        <p style="color: #666; line-height: 1.8; margin-bottom: 20px;">
          انتهت صلاحية ترخيصك السنوي.<br>
          لتجديد الترخيص لسنة أخرى، يرجى التواصل معنا.
        </p>
        <div style="background: #fef2f2; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
          <div style="color: #991b1b; font-weight: 700; margin-bottom: 10px;">📞 تواصل معنا:</div>
          <div style="color: #333;">📧 kodnaqi@gmail.com</div>
          <div style="color: #333;">📱 +249 111 729 111</div>
        </div>
        <button onclick="KodNaqiLicense.showDialog()" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #0d3b66, #1e6091); color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 800; cursor: pointer;">
          🔑 لدي مفتاح التجديد
        </button>
        <p style="color: #999; font-size: 0.75rem; margin-top: 15px;">
          بياناتك محفوظة بأمان ولن تُفقد
        </p>
      </div>
    `;
    document.body.appendChild(lock);
  }

  // ═══ التحقق من بصمة الجهاز ═══
  async function migrateOldLicense() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const lic = JSON.parse(raw);
      if (lic.deviceId || lic.type === 'T' || !lic.key) return;
      if (!window.KodNaqiSecurity) return;
      
      const fp = await window.KodNaqiSecurity.getDeviceFingerprint();
      lic.deviceId = fp;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lic));
      localStorage.setItem('kodnaqi_device_key', fp);
      console.log('[License] Migrated to device-bound license');
    } catch (e) {}
  }

  async function checkDeviceBinding() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ok: true, reason: 'no_license' };
    try {
      const lic = JSON.parse(raw);
      if (lic.type === 'T' || !lic.deviceId) return { ok: true, reason: 'not_bound' };
      if (!window.KodNaqiSecurity) return { ok: true, reason: 'no_security' };
      
      const fp = await window.KodNaqiSecurity.getDeviceFingerprint();
      if (lic.deviceId !== fp) {
        return { ok: false, reason: 'device_mismatch', expected: lic.deviceId, actual: fp };
      }
      return { ok: true };
    } catch (e) {
      return { ok: true, reason: 'parse_error' };
    }
  }

  function showDeviceLock() {
    if (document.getElementById('kn-device-lock')) return;
    const lock = document.createElement('div');
    lock.id = 'kn-device-lock';
    lock.style.cssText = 'position:fixed;inset:0;z-index:999999;background:linear-gradient(135deg,#7f1d1d,#991b1b);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Cairo,sans-serif;';
    lock.innerHTML = `
      <div style="background:white;border-radius:20px;padding:40px 30px;max-width:450px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
        <div style="font-size:4rem;margin-bottom:15px;">🔒</div>
        <h2 style="color:#991b1b;font-weight:900;margin-bottom:15px;">هذا الترخيص مسجّل على جهاز آخر</h2>
        <p style="color:#666;line-height:1.8;margin-bottom:20px;">
          تم تفعيل هذا المفتاح على جهاز مختلف.<br>
          المفتاح يعمل على جهاز واحد فقط.
        </p>
        <div style="background:#fef2f2;border-radius:10px;padding:15px;margin-bottom:20px;">
          <div style="color:#991b1b;font-weight:700;margin-bottom:10px;">📞 للتواصل:</div>
          <div style="color:#333;">📧 kodnaqi@gmail.com</div>
          <div style="color:#333;">📱 +249 111 729 111</div>
        </div>
      </div>
    `;
    document.body.appendChild(lock);
  }


  // ═══ مساعدات التاريخ ═══
  function getCurrentYearMonth() {
    const now = new Date();
    return String(now.getFullYear()).slice(-2) + String(now.getMonth() + 1).padStart(2, '0');
  }

  function formatYearMonth(yyMM) {
    if (!yyMM || yyMM.length !== 4) return '—';
    const year = 2000 + parseInt(yyMM.slice(0, 2));
    const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const month = parseInt(yyMM.slice(2, 4)) - 1;
    return monthNames[month] + ' ' + year;
  }

  // API عام

  // ═══════════════════════════════════════════════════
  // 📦 باقات الترخيص
  // ═══════════════════════════════════════════════════
  const PACKAGES = {
    B: { 
      name: 'أساسية', 
      nameEn: 'Basic',
      icon: '🥉',
      devices: 1, 
      users: 1, 
      cloud: false, 
      financial: false, 
      advReports: false, 
      userMgmt: false, 
      auditLog: false, 
      whiteLabel: false,
      support: '6 أشهر',
      description: 'للمعامل الصغيرة'
    },
    S: { 
      name: 'قياسية', 
      nameEn: 'Standard',
      icon: '🥈',
      devices: 3, 
      users: 5, 
      cloud: true, 
      financial: true, 
      advReports: true, 
      userMgmt: true, 
      auditLog: false, 
      whiteLabel: false,
      support: 'سنة كاملة',
      description: 'للمعامل المتوسطة'
    },
    A: { 
      name: 'متقدمة', 
      nameEn: 'Advanced',
      icon: '🥇',
      devices: 999, 
      users: 999, 
      cloud: true, 
      financial: true, 
      advReports: true, 
      userMgmt: true, 
      auditLog: true, 
      whiteLabel: true,
      support: 'سنتان',
      description: 'للمعامل الكبيرة'
    },
    E: { 
      name: 'مؤسسية', 
      nameEn: 'Enterprise',
      icon: '🏢',
      devices: 999, 
      users: 999, 
      cloud: true, 
      financial: true, 
      advReports: true, 
      userMgmt: true, 
      auditLog: true, 
      whiteLabel: true,
      support: 'مفتوح',
      description: 'لمجموعات المعامل'
    },
    T: { 
      name: 'تجريبية', 
      nameEn: 'Trial',
      icon: '🎁',
      devices: 1, 
      users: 1, 
      cloud: false, 
      financial: false, 
      advReports: false, 
      userMgmt: false, 
      auditLog: false, 
      whiteLabel: false,
      support: '14 يومًا',
      description: 'نسخة تجريبية'
    },
    F: { 
      name: 'كاملة (قديمة)', 
      nameEn: 'Legacy Full',
      icon: '⚙️',
      devices: 999, 
      users: 999, 
      cloud: true, 
      financial: true, 
      advReports: true, 
      userMgmt: true, 
      auditLog: true, 
      whiteLabel: false,
      support: 'سنة',
      description: 'نظام قديم'
    }
  };

  function getPackageInfo() {
    const lic = getLicense();
    if (!lic) return { type: 'T', ...PACKAGES.T };
    const type = lic.type || 'T';
    return { type, ...(PACKAGES[type] || PACKAGES.T) };
  }

  function hasFeature(featureName) {
    // وضع المطوّر = كل الميزات
    if (localStorage.getItem('kodnaqi_dev_mode') === 'true') return true;
    
    const pkg = getPackageInfo();
    const val = pkg[featureName];
    if (typeof val === 'boolean') return val;
    if (typeof val === 'number') return val > 0;
    return false;
  }

  function getDeviceLimit() {
    if (localStorage.getItem('kodnaqi_dev_mode') === 'true') return 999;
    return getPackageInfo().devices || 1;
  }

  function getUserLimit() {
    if (localStorage.getItem('kodnaqi_dev_mode') === 'true') return 999;
    return getPackageInfo().users || 1;
  }

  // ═══ تطبيق قيود الباقة على الواجهة ═══
  function applyPackageRestrictions() {
    if (localStorage.getItem('kodnaqi_dev_mode') === 'true') {
      console.log('[Package] Dev mode — all features enabled');
      return;
    }
    
    const pkg = getPackageInfo();
    console.log('[Package] Type:', pkg.type, '| Name:', pkg.name);
    console.log('[Package] Features:', {
      financial: pkg.financial,
      cloud: pkg.cloud,
      advReports: pkg.advReports,
      userMgmt: pkg.userMgmt,
      auditLog: pkg.auditLog,
      whiteLabel: pkg.whiteLabel
    });
    
    // ═══ 1. المالية (للـ B فقط) ═══
    if (!pkg.financial) {
      hideElement('a[data-page="finance"]');
      hideElement('#page-finance');
      console.log('[Package] 💰 Financial hidden');
    }
    
    // ═══ 2. الإحصائيات (للـ B فقط) ═══
    if (!pkg.advReports) {
      hideElement('a[data-page="stats"]');
      hideElement('#page-stats');
      hideElement('a[data-page="reports-advanced"]');
      hideElement('#page-reports-advanced');
      hideElement('#admin-reports-advanced-btn');
      console.log('[Package] 📊 Advanced reports hidden');
    }
    
    // ═══ 3. الإشعارات (للـ B فقط) ═══
    if (!pkg.advReports) {
      hideElement('a[data-page="notifications"]');
      hideElement('#page-notifications');
      console.log('[Package] 🔔 Notifications hidden');
    }
    
    // ═══ 4. إدارة المستخدمين (للـ A, E فقط) ═══
    if (!pkg.userMgmt || pkg.type === 'B' || pkg.type === 'S') {
      if (pkg.type === 'B' || pkg.type === 'S') {
        hideElement('a[data-page="users"]');
        hideElement('#page-users');
        hideElement('#admin-manage-users-btn');
        console.log('[Package] 👥 User management hidden');
      }
    }
    
    // ═══ 5. سجل العمليات (للـ A, E فقط) ═══
    if (!pkg.auditLog) {
      // البحث بـ onclick
      document.querySelectorAll('button').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('showAuditLog')) {
          btn.style.display = 'none';
        }
      });
      console.log('[Package] 📋 Audit log hidden');
    }
    
    // ═══ 6. النسخ السحابي (للـ B فقط) ═══
    if (!pkg.cloud) {
      hideElement('#cloudCard');
      console.log('[Package] ☁️ Cloud backup hidden');
    }
    
    // ═══ 7. White Label (للـ B, S فقط) ═══
    if (!pkg.whiteLabel) {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('showCustomizer')) {
          btn.style.display = 'none';
        }
      });
      console.log('[Package] 🎨 White Label customizer hidden');
    }
    
    // ═══ 8. شارة الباقة في الإعدادات ═══
    addPackageBadge(pkg);
    
    console.log('[Package] ✅ Restrictions applied');
  }
  
  function hideElement(selector) {
    try {
      const els = document.querySelectorAll(selector);
      els.forEach(el => {
        el.style.display = 'none';
        el.setAttribute('data-hidden-by-package', 'true');
      });
    } catch (e) {}
  }
  
  function addPackageBadge(pkg) {
    // ابحث عن قسم الإعدادات
    const settingsPage = document.getElementById('page-settings');
    if (!settingsPage) return;
    if (document.getElementById('packageBadge')) return;
    
    // ابحث عن أول بطاقة في الإعدادات
    const firstCard = settingsPage.querySelector('.card');
    if (!firstCard) return;
    
    const badge = document.createElement('div');
    badge.id = 'packageBadge';
    badge.style.cssText = 'background: linear-gradient(135deg, #fef9c3, #fef3c7); border: 2px solid #c9a227; border-radius: 12px; padding: 15px; margin-bottom: 15px; text-align: center;';
    badge.innerHTML = `
      <div style="font-size: 1.8rem; margin-bottom: 5px;">${pkg.icon}</div>
      <div style="font-weight: 800; color: #0d3b66; font-size: 1rem;">باقة ${pkg.name}</div>
      <div style="font-size: 0.75rem; color: #7c2d12; margin-top: 4px;">${pkg.description}</div>
      <div style="font-size: 0.7rem; color: #666; margin-top: 8px;">
        📱 ${pkg.devices === 999 ? 'أجهزة غير محدودة' : pkg.devices + ' جهاز'} · 
        👥 ${pkg.users === 999 ? 'مستخدمون غير محدودين' : pkg.users + ' مستخدمين'} · 
        📞 ${pkg.support}
      </div>
    `;
    
    firstCard.parentElement.insertBefore(badge, firstCard);
  }

  function addPackageBadge(pkg) {
    // ابحث عن قسم "حول التطبيق"
    const aboutSection = document.querySelector('[data-brand="about"]') || 
                        Array.from(document.querySelectorAll('h6')).find(h => h.textContent.includes('حول التطبيق'));
    
    if (!aboutSection) return;
    if (document.getElementById('packageBadge')) return;
    
    const badge = document.createElement('div');
    badge.id = 'packageBadge';
    badge.style.cssText = 'background: linear-gradient(135deg, #fef9c3, #fef3c7); border: 2px solid #c9a227; border-radius: 10px; padding: 12px; margin-bottom: 15px; text-align: center;';
    badge.innerHTML = `
      <div style="font-size: 1.5rem; margin-bottom: 4px;">${pkg.icon}</div>
      <div style="font-weight: 800; color: #0d3b66; font-size: 0.95rem;">باقة ${pkg.name}</div>
      <div style="font-size: 0.75rem; color: #7c2d12;">${pkg.description}</div>
    `;
    
    const parent = aboutSection.parentElement;
    if (parent) parent.insertBefore(badge, aboutSection);
  }


  window.KodNaqiLicense = {
    getMyDeviceCode: getMyDeviceCode,
    formatDeviceCode: formatDeviceCode,
    getCurrentYearMonth: getCurrentYearMonth,
    formatYearMonth: formatYearMonth,
    verify: verifyKey,
    generate: generateKey,
    getPackageInfo: getPackageInfo,
    hasFeature: hasFeature,
    getDeviceLimit: getDeviceLimit,
    getUserLimit: getUserLimit,
    applyRestrictions: applyPackageRestrictions,
    PACKAGES: PACKAGES,
    status: getStatus,
    activate: activateWithKey,
    showDialog: showLicenseDialog,
    clear: clearLicense,
    getLicense: getLicense,
    getTrialDaysLeft: getTrialDaysLeft
  };

  // فحص تلقائي عند التحميل
  document.addEventListener('DOMContentLoaded', async function() {
    setTimeout(async function() {
      // تطبيق قيود الباقة
      try {
        if (window.KodNaqiLicense && window.KodNaqiLicense.applyRestrictions) {
          window.KodNaqiLicense.applyRestrictions();
        }
      } catch (e) {
        console.warn('[Package] restrictions failed:', e);
      }
      
      // ═══ وضع المطوّر — أظهر شارة فقط ═══
      if (localStorage.getItem('kodnaqi_dev_mode') === 'true') {
        console.log('🧑‍💻 Dev mode active');
        const devBadge = document.createElement('div');
        devBadge.style.cssText = 'position:fixed;bottom:80px;left:12px;z-index:9998;font-size:0.7rem;padding:4px 10px;border-radius:20px;font-weight:700;cursor:pointer;background:#6c757d;color:white;box-shadow:0 2px 8px rgba(0,0,0,0.15);';
        devBadge.innerHTML = '🧑‍💻 مطوّر';
        devBadge.title = 'اضغط لإلغاء وضع المطوّر';
        devBadge.onclick = function() {
          if (confirm('إلغاء وضع المطوّر؟\n\nستحتاج لإدخال ترخيص.')) {
            localStorage.removeItem('kodnaqi_dev_mode');
            location.reload();
          }
        };
        document.body.appendChild(devBadge);
        return;
      }

      // 1. ترحيل الترخيص القديم (إن وُجد)
      await migrateOldLicense();

      // 2. فحص بصمة الجهاز
      const deviceCheck = await checkDeviceBinding();
      if (!deviceCheck.ok) {
        console.error('[License] Device mismatch:', deviceCheck);
        showDeviceLock();
        return;
      }

      // 3. فحص حالة الترخيص
      const status = await getStatus();

      if (status.status === 'license_expired') {
        showExpiredLock();
        return;
      }

      if (status.status === 'device_mismatch') {
        showDeviceLock();
        return;
      }

      const badge = document.createElement('div');
      badge.style.cssText = 'position:fixed;bottom:80px;left:12px;z-index:9998;font-size:0.7rem;padding:4px 10px;border-radius:20px;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.15);';

      if (status.status === 'dev') {
      if (confirm('🧑‍💻 وضع المطوّر مفعّل\n\nهل تريد إلغاؤه؟ (لتصبح كعميل عادي)')) {
        localStorage.removeItem('kodnaqi_dev_mode');
        location.reload();
      }
      return;
    }
    
    if (status.status === 'licensed') {
        badge.style.background = '#198754';
        badge.style.color = 'white';
        badge.innerHTML = '🔓 مرخّص';
      } else if (status.status === 'trial') {
        badge.style.background = status.daysLeft <= 3 ? '#dc3545' : '#ffc107';
        badge.style.color = status.daysLeft <= 3 ? 'white' : '#000';
        badge.innerHTML = '⏱️ تجريبي: ' + status.daysLeft + ' يوم';
      } else {
        badge.style.background = '#dc3545';
        badge.style.color = 'white';
        badge.innerHTML = '⛔ انتهت التجربة';
      }
      badge.title = 'اضغط لعرض تفاصيل الترخيص';
      badge.onclick = showLicenseDialog;
      document.body.appendChild(badge);
    }, 1500);
  });

})();
