/*! KodNaqi PWA — Security Layer v2 (ECDSA P-256) */
(function() {
  'use strict';

  const PUBLIC_KEY_DER_B64 = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQl3jatQzrvReTLlo8Vl1piYFBX4fH7W1v7YO7hnhfM6QJYGWo/L14AW57wrGQCapiUBdZjBZCyaKZp3B+AQgNg==';
  const UUID_KEY = 'kodnaqi_device_uuid_v1';
  const TIME_KEY_LOCAL = 'kodnaqi_last_seen_v1';
  const IDB_NAME = 'kodnaqi_guard';
  const IDB_STORE = 'state';
  const CACHE_NAME = 'kodnaqi-guard-v1';
  const CACHE_URL = '/__guard__/last_seen';
  const GRACE_MS = 60 * 60 * 1000;

  let _cachedFingerprint = null;
  let _cachedCode = null;
  let _cachedPublicKey = null;

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  async function sha256Hex(str) {
    const b = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(str)));
    let out = '';
    for (let i = 0; i < b.length; i++) out += b[i].toString(16).padStart(2, '0');
    return out;
  }

  function base64ToBytes(b64) {
    const norm = b64.replace(/-/g, '+').replace(/_/g, '/');
    const pad = norm + '='.repeat((4 - norm.length % 4) % 4);
    const bin = atob(pad);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function fallbackFingerprint() {
    const s = [
      navigator.userAgent || '', navigator.language || '',
      (screen.width || 0) + 'x' + (screen.height || 0),
      new Date().getTimezoneOffset(), navigator.hardwareConcurrency || 0,
      screen.colorDepth || 0, navigator.platform || '',
      navigator.maxTouchPoints || 0
    ].join('|');
    let h = 5381;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) + h) + s.charCodeAt(i); h = h & 0xFFFFFFFF; }
    return Math.abs(h).toString(36).toUpperCase();
  }

  async function getDeviceFingerprint() {
    if (_cachedFingerprint) return _cachedFingerprint;
    let uuid = null;
    try { uuid = localStorage.getItem(UUID_KEY); } catch (e) {}
    if (!uuid) {
      try {
        uuid = (crypto && crypto.randomUUID) ? crypto.randomUUID() :
          'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        localStorage.setItem(UUID_KEY, uuid);
        console.log('[Security] UUID created');
      } catch (e) {
        console.warn('[Security] UUID failed:', e.message);
        _cachedFingerprint = 'FB_' + fallbackFingerprint();
        return _cachedFingerprint;
      }
    }
    _cachedFingerprint = 'UUID_' + uuid;
    return _cachedFingerprint;
  }

  const B36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function hexToBase36(hex, len) {
    let n = BigInt('0x' + hex.slice(0, 16));
    let out = '';
    for (let i = 0; i < len; i++) {
      out = B36[Number(n % 36n)] + out;
      n = n / 36n;
    }
    return out;
  }

  // ═══ بصمة مستقرة (تعيش حتى بعد مسح بيانات المتصفح) ═══
  async function getStableFingerprint() {
    const signals = [];
    try {
      const w = Math.min(screen.width, screen.height);
      const h = Math.max(screen.width, screen.height);
      signals.push('S:' + w + 'x' + h + 'x' + (screen.colorDepth || 0));
    } catch (e) { signals.push('S:e'); }
    try { signals.push('T:' + new Date().getTimezoneOffset()); } catch (e) {}
    try { signals.push('C:' + (navigator.hardwareConcurrency || 0)); } catch (e) {}
    try { signals.push('P:' + (navigator.maxTouchPoints || 0)); } catch (e) {}
    try { signals.push('F:' + (navigator.platform || '')); } catch (e) {}
    try {
      const cv = document.createElement('canvas');
      cv.width = 240; cv.height = 60;
      const ctx = cv.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px "Arial"';
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 100, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('KodNaqi-FP-2026', 2, 15);
        ctx.fillStyle = 'rgba(102,204,0,0.7)';
        ctx.fillText('KodNaqi-FP-2026', 4, 17);
        ctx.beginPath();
        ctx.arc(50, 40, 15, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        signals.push('CV:' + cv.toDataURL());
      }
    } catch (e) { signals.push('CV:e'); }
    try {
      const gcv = document.createElement('canvas');
      const gl = gcv.getContext('webgl') || gcv.getContext('experimental-webgl');
      if (gl) {
        const dbg = gl.getExtension('WEBGL_debug_renderer_info');
        if (dbg) {
          signals.push('GV:' + gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL));
          signals.push('GR:' + gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
        }
        signals.push('GM:' + (gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0));
      } else { signals.push('G:no'); }
    } catch (e) { signals.push('G:e'); }
    return signals.join('||');
  }

  async function getDeviceCode() {
    if (_cachedCode) {
      try { localStorage.setItem('kodnaqi_device_code_v1', _cachedCode); } catch(e) {}
      return _cachedCode;
    }
  // محاولة استرجاع الكود المخزن (ثابت ولا يتغير)
  try {
    const stored = localStorage.getItem('kodnaqi_device_code_v1');
    if (stored && stored.length === 6) {
      _cachedCode = stored;
      try { localStorage.setItem('kodnaqi_device_code_v1', _cachedCode); } catch(e) {}
  return _cachedCode;
    }
  } catch (e) {}

    // 1) جسر أندرويد (مستقبلي — APK)
    if (window.AndroidBridge && typeof window.AndroidBridge.getDeviceId === 'function') {
      try {
        const id = window.AndroidBridge.getDeviceId();
        if (id) {
          const hex = await sha256Hex('KODNAQI-ANDROID|' + id);
          _cachedCode = hexToBase36(hex, 6);
          console.log('[Security] Using native Android ID');
          try { localStorage.setItem('kodnaqi_device_code_v1', _cachedCode); } catch(e) {}
  return _cachedCode;
        }
      } catch (e) {}
    }

    // 2) بصمة مستقرة (الافتراضي — تعيش حتى بعد مسح البيانات)
    try {
      const fp = await getStableFingerprint();
      if (fp && fp.length > 20) {
        const hex = await sha256Hex('KODNAQI-FP|' + fp);
        _cachedCode = hexToBase36(hex, 6);
        console.log('[Security] Using stable fingerprint');
        try { localStorage.setItem('kodnaqi_device_code_v1', _cachedCode); } catch(e) {}
  return _cachedCode;
      }
    } catch (e) {}

    // 3) احتياطي (نادر جدًا)
    const fb = await getDeviceFingerprint();
    const hex2 = await sha256Hex('KODNAQI|' + fb);
    _cachedCode = hexToBase36(hex2, 6);
    try { localStorage.setItem('kodnaqi_device_code_v1', _cachedCode); } catch(e) {}
  return _cachedCode;
  }

  async function getPublicKey() {
    if (_cachedPublicKey) return _cachedPublicKey;
    const der = base64ToBytes(PUBLIC_KEY_DER_B64);
    _cachedPublicKey = await crypto.subtle.importKey(
      'spki', der,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false, ['verify']
    );
    return _cachedPublicKey;
  }

  // ═══ التحقق من التوقيع (ECDSA P-256) ═══
  async function verifyLicenseSignature(licenseStr) {
    try {
      if (!licenseStr || typeof licenseStr !== 'string') return { ok: false, reason: 'empty' };
      const parts = licenseStr.trim().split('.');
      if (parts.length !== 3 || parts[0] !== 'KOD2') return { ok: false, reason: 'format' };

      const payloadBytes = base64ToBytes(parts[1]);
      const sigBytes = base64ToBytes(parts[2]);
      const pub = await getPublicKey();

      const ok = await crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        pub, sigBytes, payloadBytes
      );
      if (!ok) return { ok: false, reason: 'signature' };

      const payload = JSON.parse(dec.decode(payloadBytes));
      return { ok: true, payload };
    } catch (e) {
      return { ok: false, reason: 'exception:' + e.message };
    }
  }

  // ═══ تخزين الوقت في 3 طبقات (localStorage, IndexedDB, Cache) ═══
  function openIDB() {
    return new Promise(function(res, rej) {
      if (!('indexedDB' in window)) return rej(new Error('no idb'));
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = function() {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE))
          db.createObjectStore(IDB_STORE);
      };
      req.onsuccess = function() { res(req.result); };
      req.onerror = function() { rej(req.error); };
    });
  }

  async function idbSet(key, val) {
    try {
      const db = await openIDB();
      await new Promise(function(res, rej) {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(val, key);
        tx.oncomplete = res; tx.onerror = function() { rej(tx.error); };
      });
      db.close();
    } catch (e) {}
  }
  async function idbGet(key) {
    try {
      const db = await openIDB();
      const val = await new Promise(function(res, rej) {
        const tx = db.transaction(IDB_STORE, 'readonly');
        const r = tx.objectStore(IDB_STORE).get(key);
        r.onsuccess = function() { res(r.result); };
        r.onerror = function() { rej(r.error); };
      });
      db.close();
      return val;
    } catch (e) { return null; }
  }

  async function cacheSet(key, val) {
    try {
      if (!('caches' in window)) return;
      const c = await caches.open(CACHE_NAME);
      await c.put(new Request(CACHE_URL + '?k=' + key),
        new Response(String(val), { headers: { 'x-ts': String(val) } }));
    } catch (e) {}
  }
  async function cacheGet(key) {
    try {
      if (!('caches' in window)) return null;
      const c = await caches.open(CACHE_NAME);
      const r = await c.match(new Request(CACHE_URL + '?k=' + key));
      if (!r) return null;
      const v = await r.text();
      const n = parseInt(v, 10);
      return isNaN(n) ? null : n;
    } catch (e) { return null; }
  }

  async function getLastSeenMax() {
    const vals = [];
    try {
      const v = localStorage.getItem(TIME_KEY_LOCAL);
      if (v) vals.push(parseInt(v, 10));
    } catch (e) {}
    const idbV = await idbGet('last_seen');
    if (idbV) vals.push(parseInt(idbV, 10));
    const cacheV = await cacheGet('last_seen');
    if (cacheV) vals.push(parseInt(cacheV, 10));
    vals.push(0);
    return Math.max.apply(null, vals);
  }

  async function updateLastSeen(ts) {
    try { localStorage.setItem(TIME_KEY_LOCAL, String(ts)); } catch (e) {}
    await idbSet('last_seen', ts);
    await cacheSet('last_seen', ts);
  }

  // ═══ الحماية الزمنية (كشف تغيير الساعة) ═══
  async function checkClock(payload) {
    const now = Date.now();
    const lastMax = await getLastSeenMax();

    // 1. إذا رجع العميل الساعة قبل آخر مشاهدة بأكثر من GRACE
    if (lastMax > 0 && now < lastMax - GRACE_MS) {
      return { ok: false, reason: 'clock_rollback', lastMax, now };
    }

    // 2. إذا كانت الساعة قبل تاريخ الإصدار
    if (payload && payload.issued && now < payload.issued - GRACE_MS) {
      return { ok: false, reason: 'clock_before_issued', issued: payload.issued, now };
    }

    // 3. انتهت الصلاحية
    if (payload && payload.expires && now > payload.expires) {
      return { ok: false, reason: 'expired', expires: payload.expires, now };
    }

    // كل شيء سليم — حدّث آخر مشاهدة
    if (now > lastMax) await updateLastSeen(now);
    return { ok: true, now, lastMax };
  }

  // ═══ التحقق الكامل من الترخيص ═══
  async function verifyLicense(licenseStr) {
  try {
    const sig = await verifyLicenseSignature(licenseStr);
  alert('sig result: ' + JSON.stringify(sig));
    if (!sig.ok) return { valid: false, reason: sig.reason };

    const payload = sig.payload;
    const myCode = await getDeviceCode();

    // فحص الأجهزة المسموحة
  alert('devices check: payload.devices=' + JSON.stringify(payload.devices) + ', myCode=' + myCode);
  // (مع دعم فترة السماح للأجهزة المنقولة)
  if (Array.isArray(payload.devices) && payload.devices.length > 0) {
    const isAllowed = payload.devices.indexOf('*') !== -1 || payload.devices.indexOf(myCode) !== -1;
    if (!isAllowed) {
      // التحقق من فترة السماح (revokedDevices)
      const revoked = payload.revokedDevices || {};
      const graceUntil = revoked[myCode] || 0;
      const now = Date.now();
      if (graceUntil > now) {
        // مسموح مؤقتًا خلال فترة السماح
        const clock = await checkClock(payload);
  alert('clock result: ' + JSON.stringify(clock));
        if (!clock.ok) return { valid: false, reason: clock.reason, details: clock };
        await updateLastSeen(now);
        return { valid: true, payload, deviceCode: myCode, grace: true, graceUntil: graceUntil };
      }
      return {
        valid: false,
        reason: 'wrong_device',
        expected: payload.devices,
        actual: myCode
      };
    }
  }

  // فحص الساعة
  const clock = await checkClock(payload);
  if (!clock.ok) return { valid: false, reason: clock.reason, details: clock };

  // نجاح
  await updateLastSeen(Date.now());
  return { valid: true, payload, deviceCode: myCode };
  } catch(e) {
    return { valid: false, reason: 'exception', message: e.message };
  }
  }

  // ═══ API العام ═══
  window.KodNaqiSecurity = {
    getDeviceFingerprint: getDeviceFingerprint,
    getDeviceCode: getDeviceCode,
    verifyLicense: verifyLicense,
    verifyLicenseSignature: verifyLicenseSignature,
    checkClock: checkClock,
    getLastSeenMax: getLastSeenMax,
    checkServerStatus: checkServerStatus,
    getCachedServerStatus: getCachedServerStatus,
    updateLastSeen: updateLastSeen,
    _internal: {
      sha256Hex: sha256Hex,
      base64ToBytes: base64ToBytes,
      publicKeyB64: PUBLIC_KEY_DER_B64
    }
  };

  // ═══ Firebase Central Sync (اختياري — يفشل بصمت بدون إنترنت) ═══
  async function fetchWithTimeout(url, ms) {
    const ctrl = new AbortController();
    const t = setTimeout(function() { ctrl.abort(); }, ms);
    try { return await fetch(url, { signal: ctrl.signal, cache: 'no-store' }); }
    finally { clearTimeout(t); }
  }

  async function checkServerStatus(licenseId) {
    const cfg = window.KODNAQI_FIREBASE;
    if (!cfg || !cfg.url || !licenseId) return { ok: false, reason: 'no_config' };
    const url = cfg.url + '/' + cfg.licensesPath + '/' + encodeURIComponent(licenseId) + '.json';
    try {
      const r = await fetchWithTimeout(url, cfg.requestTimeoutMs || 5000);
      if (!r.ok) return { ok: false, reason: 'http_' + r.status };
      const data = await r.json();
      if (!data) return { ok: false, reason: 'not_found' };
      const result = {
        ok: true,
        status: data.status || 'active',
        rev: data.rev || 0,
        updatedAt: data.updatedAt || 0,
        tier: data.tier,
        expires: data.expires,
        serverTime: Date.now()
      };
      try { localStorage.setItem('kodnaqi_server_cache_' + licenseId, JSON.stringify(result)); } catch (e) {}
      return result;
    } catch (e) {
      return { ok: false, reason: 'network:' + e.message };
    }
  }

  function getCachedServerStatus(licenseId) {
    try {
      const raw = localStorage.getItem('kodnaqi_server_cache_' + licenseId);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  console.log('[Security] v2 (ECDSA P-256) loaded — public key ready');
})();
