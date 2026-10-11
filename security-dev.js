/*!
 * KodNaqi — حماية وضع المطوّر
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 * All Rights Reserved.
 *
 * نظام متعدد الطبقات لحماية وضع المطور:
 *  - بصمة الجهاز (للمالك)
 *  - مفتاح سري (SHA-256)
 *  - مفتاح طوارئ (SHA-256)
 *  - تجديد كل 90 يومًا
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════
  // الإعدادات
  // ═══════════════════════════════════════════════════
  const CONFIG = {
    // الأجهزة الموثوقة للمالك (بصمة الجهاز)
    ownerDevices: [
      'TM_259f9de6fef2a5012de19ab3a2cd2a95'
    ],
    // SHA-256 للمفاتيح (لا يمكن عكسها)
    validKeyHashes: [
      '9ba977cc2547a82d0362d148ca90c5b5ca7a691e6fc9c88d598ed143e53eec98',
      '7807c22ff5bdbc013ca781a4de20a49d3da3bd61ed07bb3c0c80df79dc37cf3d'
    ],
    // المدة: 90 يومًا
    duration: 90 * 24 * 60 * 60 * 1000,
    // المفاتيح في localStorage
    storageKey: 'kodnaqi_dev_mode',
    expiresKey: 'kodnaqi_dev_expires',
    devicesKey: 'kodnaqi_dev_registered_devices',
    // حد أقصى للأجهزة المسجلة
    maxDevices: 5
  };

  // ═══════════════════════════════════════════════════
  // أدوات SHA-256
  // ═══════════════════════════════════════════════════
  async function sha256(text) {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(text)
    );
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // ═══════════════════════════════════════════════════
  // التحقق من الجهاز
  // ═══════════════════════════════════════════════════
  async function getCurrentFingerprint() {
    if (!window.KodNaqiSecurity) return null;
    try {
      return await window.KodNaqiSecurity.getDeviceFingerprint();
    } catch (e) {
      console.warn('[DevMode] fingerprint error:', e);
      return null;
    }
  }

  async function isOwnerDevice() {
    const fp = await getCurrentFingerprint();
    if (!fp) return false;
    
    // 1) من القائمة الثابتة (أجهزة المالك الأساسية)
    if (CONFIG.ownerDevices.includes(fp)) return true;
    
    // 2) من الأجهزة المسجلة سابقًا
    try {
      const registered = JSON.parse(localStorage.getItem(CONFIG.devicesKey) || '[]');
      return registered.includes(fp);
    } catch (e) {
      return false;
    }
  }

  async function registerCurrentDevice() {
    const fp = await getCurrentFingerprint();
    if (!fp) return;
    
    // لا نسجل جهاز المالك الأساسي
    if (CONFIG.ownerDevices.includes(fp)) return;
    
    try {
      let registered = JSON.parse(localStorage.getItem(CONFIG.devicesKey) || '[]');
      if (!registered.includes(fp)) {
        registered.push(fp);
        // احتفظ بآخر 5 أجهزة فقط
        if (registered.length > CONFIG.maxDevices) {
          registered = registered.slice(-CONFIG.maxDevices);
        }
        localStorage.setItem(CONFIG.devicesKey, JSON.stringify(registered));
        console.log('[DevMode] ✅ تم تسجيل هذا الجهاز');
      }
    } catch (e) {
      console.warn('[DevMode] register error:', e);
    }
  }

  // ═══════════════════════════════════════════════════
  // تفعيل / إلغاء
  // ═══════════════════════════════════════════════════
  async function activate(reason) {
    const now = Date.now();
    localStorage.setItem(CONFIG.storageKey, 'true');
    localStorage.setItem(CONFIG.expiresKey, (now + CONFIG.duration).toString());
    await registerCurrentDevice();
    
    const days = Math.round(CONFIG.duration / 86400000);
    const expires = new Date(now + CONFIG.duration);
    console.log('[DevMode] ✅ مُفعَّل (' + reason + ') — ينتهي: ' + expires.toLocaleDateString('ar-EG'));
    return true;
  }

  function deactivate() {
    localStorage.removeItem(CONFIG.storageKey);
    localStorage.removeItem(CONFIG.expiresKey);
    console.log('[DevMode] 👤 أُلغي');
  }

  async function isActive() {
    if (localStorage.getItem(CONFIG.storageKey) !== 'true') return false;
    
    const expires = parseInt(localStorage.getItem(CONFIG.expiresKey) || '0');
    if (expires <= Date.now()) {
      console.log('[DevMode] ⏰ انتهت الصلاحية');
      deactivate();
      return false;
    }
    
    // تحقق مزدوج: هل الجهاز موثوق؟
    if (!await isOwnerDevice()) {
      console.log('[DevMode] 🚫 جهاز غير موثوق');
      deactivate();
      return false;
    }
    
    return true;
  }

  // ═══════════════════════════════════════════════════
  // المعالج الرئيسي
  // ═══════════════════════════════════════════════════
  async function handleURL() {
    const params = new URLSearchParams(location.search);
    const devParam = params.get('dev');
    
    // ═══ إلغاء ═══
    if (devParam === '0') {
      deactivate();
      return false;
    }
    
    // ═══ تفعيل ═══
    if (devParam === '1') {
      
      // 1) جهازك؟
      if (await isOwnerDevice()) {
        return await activate('owner_device');
      }
      
      // 2) مفتاح سري / طوارئ؟
      const key = params.get('key') || params.get('master');
      if (key) {
        try {
          const keyHash = await sha256(key.trim());
          if (CONFIG.validKeyHashes.includes(keyHash)) {
            return await activate('master_key');
          } else {
            console.log('[DevMode] ❌ مفتاح خاطئ');
          }
        } catch (e) {
          console.warn('[DevMode] hash error:', e);
        }
      }
      
      // 3) تفعيل سابق لا يزال صالحًا؟
      if (await isActive()) {
        return await activate('renewal');
      }
      
      // 4) مرفوض
      console.warn('[DevMode] ❌ غير مصرح');
      deactivate();
      
      // اعرض تنبيهًا
      if (confirm('⚠️ وضع المطوّر محمي\n\nللوصول، يجب:\n• أن تكون على جهاز المالك، أو\n• إدخال مفتاح سري\n\nهل تريد العودة؟')) {
        location.href = location.pathname;
      }
      return false;
    }
    
    // ═══ لا يوجد معامل → افحص الصلاحية الحالية ═══
    if (await isActive()) {
      return await activate('auto_renewal');
    }
    
    return false;
  }

  // ═══════════════════════════════════════════════════
  // API عام
  // ═══════════════════════════════════════════════════
  window.KNDevMode = {
    handle: handleURL,
    isActive: isActive,
    activate: activate,
    deactivate: deactivate,
    getInfo: function() {
      const expires = parseInt(localStorage.getItem(CONFIG.expiresKey) || '0');
      const daysLeft = Math.ceil((expires - Date.now()) / 86400000);
      return {
        active: localStorage.getItem(CONFIG.storageKey) === 'true',
        expiresAt: expires ? new Date(expires) : null,
        daysLeft: daysLeft > 0 ? daysLeft : 0
      };
    }
  };

  console.log('🔐 KodNaqi Dev Mode Protection v1.0 loaded');
})();
