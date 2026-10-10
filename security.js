/*!
 * KodNaqi PWA — طبقة الحماية المتقدمة (Device Binding)
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 * All Rights Reserved.
 *
 * هذه الطبقة تربط الترخيص بجهاز واحد فقط.
 * أي محاولة لنقل الترخيص لجهاز آخر ستفشل تلقائيًا.
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════
  // 1. بصمة الجهاز (Device Fingerprint)
  // ═══════════════════════════════════════════════════
  let _cachedFingerprint = null;

  async function getDeviceFingerprint() {
    // إذا كانت محفوظة مسبقًا، أعدها
    if (_cachedFingerprint) return _cachedFingerprint;

    // حاول استخدام ThumbmarkJS
    if (typeof window.ThumbmarkJS !== 'undefined') {
      try {
        const tm = new window.ThumbmarkJS.Thumbmark();
        const result = await tm.get();
        if (result && result.thumbmark) {
          _cachedFingerprint = 'TM_' + result.thumbmark;
          return _cachedFingerprint;
        }
      } catch (e) {
        console.warn('[Security] ThumbmarkJS failed:', e.message);
      }
    }

    // Fallback — بصمة بسيطة من إشارات المتصفح
    _cachedFingerprint = 'FB_' + fallbackFingerprint();
    return _cachedFingerprint;
  }

  function fallbackFingerprint() {
    const signals = [
      navigator.userAgent || '',
      navigator.language || '',
      (screen.width || 0) + 'x' + (screen.height || 0),
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      screen.colorDepth || 0,
      navigator.platform || '',
      navigator.maxTouchPoints || 0
    ].join('|');

    // Hash بسيط
    let hash = 5381;
    for (let i = 0; i < signals.length; i++) {
      hash = ((hash << 5) + hash) + signals.charCodeAt(i);
      hash = hash & 0xFFFFFFFF;
    }
    return Math.abs(hash).toString(36).toUpperCase();
  }

  // ═══════════════════════════════════════════════════
  // 2. توقيع رقمي (SHA-256 + Salt)
  // ═══════════════════════════════════════════════════
  const SECRET_SALT = 'KODNAQI_SEC_2026_v1_XZ';

  async function signData(data) {
    const str = SECRET_SALT + '|' + JSON.stringify(data) + '|' + SECRET_SALT;
    const encoder = new TextEncoder();
    const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(str));
    const arr = Array.from(new Uint8Array(buffer));
    return arr.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function verifySignature(data, signature) {
    const expected = await signData(data);
    return expected === signature;
  }

  // ═══════════════════════════════════════════════════
  // 3. إنشاء payload للمفتاح (موقّع + مربوط بالجهاز)
  // ═══════════════════════════════════════════════════
  async function createLicensePayload(key, type, labName) {
    const fingerprint = await getDeviceFingerprint();
    const now = Date.now();

    const payload = {
      key: key.toUpperCase(),
      type: type,
      labName: labName || '',
      deviceId: fingerprint,
      activated: now,
      expiresAt: now + (365 * 24 * 60 * 60 * 1000)  // 365 يومًا
    };

    payload.signature = await signData({
      key: payload.key,
      type: payload.type,
      deviceId: payload.deviceId,
      activated: payload.activated,
      expiresAt: payload.expiresAt
    });

    return payload;
  }

  // ═══════════════════════════════════════════════════
  // 4. التحقق من payload (يُستخدم عند كل فتح للتطبيق)
  // ═══════════════════════════════════════════════════
  async function validateLicensePayload(payload) {
    if (!payload || !payload.key || !payload.signature) {
      return { valid: false, reason: 'missing_data' };
    }

    // 1. التحقق من التوقيع (لم يُعدَّل)
    const signatureOk = await verifySignature({
      key: payload.key,
      type: payload.type,
      deviceId: payload.deviceId,
      activated: payload.activated,
      expiresAt: payload.expiresAt
    }, payload.signature);

    if (!signatureOk) {
      return { valid: false, reason: 'tampered' };
    }

    // 2. التحقق من بصمة الجهاز
    const currentFp = await getDeviceFingerprint();
    if (payload.deviceId !== currentFp) {
      return { valid: false, reason: 'device_mismatch' };
    }

    // 3. التحقق من تاريخ الانتهاء
    if (Date.now() > payload.expiresAt) {
      return { valid: false, reason: 'expired', expiresAt: payload.expiresAt };
    }

    return { valid: true, payload: payload };
  }

  // ═══════════════════════════════════════════════════
  // 5. تشخيص
  // ═══════════════════════════════════════════════════
  async function getDeviceInfo() {
    const fp = await getDeviceFingerprint();
    return {
      fingerprint: fp,
      method: fp.substring(0, 2) === 'TM' ? 'ThumbmarkJS' : 'Fallback',
      preview: fp.substring(0, 12) + '...'
    };
  }

  // ═══════════════════════════════════════════════════
  // API عام
  // ═══════════════════════════════════════════════════
  window.KodNaqiSecurity = {
    getDeviceFingerprint: getDeviceFingerprint,
    getDeviceInfo: getDeviceInfo,
    createLicensePayload: createLicensePayload,
    validateLicensePayload: validateLicensePayload,
    signData: signData
  };

  console.log('🔒 KodNaqi Security Layer v1.0 loaded');
})();
