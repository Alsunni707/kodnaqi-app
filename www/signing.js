/*! KodNaqi Browser Signer v1 — private.pem (PKCS8) يُحمَّل عند الطلب فقط */
(function() {
  'use strict';
  let _privateKey = null, _keyName = '';

  function b64url(buf) {
    const bytes = new Uint8Array(buf);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function pemToArrayBuffer(pemText) {
    const b64 = pemText
      .replace(/-----BEGIN [^-]+-----/g, '')
      .replace(/-----END [^-]+-----/g, '')
      .replace(/\s+/g, '');
    if (!b64) throw new Error('ملف PEM فارغ');
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }

  async function loadPrivateKey(file) {
    const text = await file.text();
    const der = pemToArrayBuffer(text);
    _privateKey = await crypto.subtle.importKey(
      'pkcs8', der,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false, ['sign']
    );
    _keyName = file.name;
    return true;
  }

  function clearPrivateKey() { _privateKey = null; _keyName = ''; }
  function hasKey() { return _privateKey !== null; }
  function getKeyName() { return _keyName; }

  async function generate(options) {
    if (!_privateKey) throw new Error('لم يتم تحميل المفتاح الخاص');
    const now = Date.now();
    const days = parseInt(options.days, 10) || 365;
    const expires = now + days * 24 * 60 * 60 * 1000;
    const devices = Array.isArray(options.devices)
      ? options.devices.map(d => String(d).trim().toUpperCase()).filter(Boolean)
      : ['*'];
    const id = 'KN-' + now.toString(36).toUpperCase();

    const payload = {
      v: 1, id,
      tier: String(options.tier || 'TRIAL').toUpperCase(),
      customer: options.customer || '',
      devices, issued: now, expires
    };

    const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
    const sigBuf = await crypto.subtle.sign(
      { name: 'ECDSA', hash: 'SHA-256' },
      _privateKey, payloadBytes
    );

    return {
      license: 'KOD2.' + b64url(payloadBytes) + '.' + b64url(sigBuf),
      payload
    };
  }

  window.KodNaqiSigning = {
    loadPrivateKey, clearPrivateKey, hasKey, getKeyName, generate
  };
  console.log('[Signing] Browser signer loaded');
})();
