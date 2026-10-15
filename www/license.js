/*! KodNaqi PWA — نظام الترخيص v2 (ECDSA P-256) */
(function() {
  'use strict';

  const STORAGE_KEY = 'kodnaqi_license';
  const TRIAL_KEY   = 'kodnaqi_trial_start';
  const TRIAL_DAYS  = 14;
  const WARN_DAYS   = 30;

  // جدول الباقات والميزات
  const TIER_FEATURES = {
    TRIAL: ['finance', 'cloud', 'jsonIO', 'users'],
    B:     ['finance'],
    S:     ['finance', 'cloud', 'jsonIO', 'users'],
    A:     ['finance', 'cloud', 'jsonIO', 'users', 'advReports', 'roles', 'audit', 'whiteLabel'],
    E:     ['finance', 'cloud', 'jsonIO', 'users', 'advReports', 'roles', 'audit', 'whiteLabel']
  };

  // حدود كل باقة (من صفحة الأسعار)
  const TIER_LIMITS = {
    TRIAL: { devices: 1, users: 1, supportMonths: 2 },
    B:     { devices: 1, users: 1, supportMonths: 6 },
    S:     { devices: 3, users: 5, supportMonths: 12 },
    A:     { devices: Infinity, users: Infinity, supportMonths: 24 },
    E:     { devices: Infinity, users: Infinity, supportMonths: 36 }
  };

  function getTierLimits(tier) {
    return TIER_LIMITS[tier] || { devices: 0, users: 0, supportMonths: 0 };
  }

  const TIER_NAMES = {
    TRIAL: 'تجريبية',
    B: 'أساسية',
    S: 'قياسية',
    A: 'متقدمة',
    E: 'مؤسسية'
  };

  // ═══ نظام تذكير التجديد ═══
  const RENEWAL_REMIND_DAYS = 30;
  const RENEWAL_SHOWN_KEY = 'kodnaqi_renewal_shown';

  async function checkRenewalReminder() {
    const st = await getLicenseStatus();
    if (st.status !== 'valid' || !st.payload || !st.payload.expires) return;
    
    const daysLeft = Math.ceil((st.payload.expires - Date.now()) / 86400000);
    
    // إذا كان المتبقي 30 يوم أو أقل
    if (daysLeft <= RENEWAL_REMIND_DAYS && daysLeft > 0) {
      // التحقق من عدم إظهار التذكير مرتين في نفس اليوم
      const today = new Date().toDateString();
      const lastShown = localStorage.getItem(RENEWAL_SHOWN_KEY);
      if (lastShown === today) return;
      
      // إظهار التذكير
      showRenewalDialog(daysLeft, st.payload);
      localStorage.setItem(RENEWAL_SHOWN_KEY, today);
    }
  }

  function showRenewalDialog(daysLeft, payload) {
    // إزالة أي نافذة سابقة
    const old = document.getElementById('kodnaqi-renewal-dialog');
    if (old) old.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'kodnaqi-renewal-dialog';
    wrapper.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:2147483646;padding:16px;direction:rtl;';

    const urgency = daysLeft <= 7 ? '#dc2626' : (daysLeft <= 14 ? '#f59e0b' : '#0d3b66');
    const message = daysLeft <= 7 ? '⚠️ اشتراكك على وشك الانتهاء!' : '⏰ تذكير بتجديد الاشتراك';

    wrapper.innerHTML = ''
      + '<div style="background:#fff;border-radius:16px;max-width:450px;width:100%;padding:24px;text-align:center;box-shadow:0 25px 80px rgba(0,0,0,0.5);">'
      + '  <div style="font-size:3.5rem;margin-bottom:10px;">⏰</div>'
      + '  <h2 style="margin:0 0 8px;color:' + urgency + ';font-size:1.4rem;">' + message + '</h2>'
      + '  <div style="background:' + urgency + ';color:#fff;padding:10px 20px;border-radius:50px;display:inline-block;font-size:1.3rem;font-weight:800;margin:15px 0;">'
      + '    متبقٍ ' + daysLeft + ' يوم'
      + '  </div>'
      + '  <p style="color:#64748b;font-size:0.95rem;line-height:1.7;margin:15px 0;">'
      + '    اشتراكك في باقة <strong>' + (TIER_NAMES[payload.tier] || payload.tier) + '</strong> ينتهي قريبًا.<br>'
      + '    جدد الآن لتجنب توقف النظام عن العمل.'
      + '  </p>'
      + '  <div style="background:#fef3c7;border-right:4px solid #f59e0b;padding:12px;border-radius:8px;text-align:right;font-size:0.85rem;color:#92400e;margin-bottom:20px;">'
      + '    <strong>للتجديد:</strong><br>'
      + '    📞 اتصل: <strong dir="ltr">+249111729111</strong><br>'
      + '    💬 واتساب: <strong dir="ltr">+249111729111</strong>'
      + '  </div>'
      + '  <button id="renewal-close-btn" style="width:100%;padding:14px;background:linear-gradient(135deg,#0d3b66,#1e6091);color:#fff;border:none;border-radius:10px;font-size:1rem;font-weight:800;cursor:pointer;">فهمت، سأتواصل للتجديد</button>'
      + '</div>';

    document.documentElement.appendChild(wrapper);
    
    // إضافة حدث للزر
    const closeBtn = document.getElementById('renewal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        wrapper.remove();
      });
    }
  }

  // ═══ EULA — اتفاقية الاستخدام ═══
  const EULA_KEY = 'kodnaqi_eula_accepted';
  const EULA_VERSION = '1.0';

  function hasAcceptedEULA() {
    try {
      const accepted = localStorage.getItem(EULA_KEY);
      if (!accepted) return false;
      const data = JSON.parse(accepted);
      return data.version === EULA_VERSION && data.accepted === true;
    } catch(e) { return false; }
  }

  function acceptEULA() {
    try {
      localStorage.setItem(EULA_KEY, JSON.stringify({
        version: EULA_VERSION,
        accepted: true,
        date: Date.now()
      }));
      return true;
    } catch(e) { return false; }
  }

  function showEULADialog() {
    // إزالة أي نافذة سابقة
    const old = document.getElementById('kodnaqi-eula-dialog');
    if (old) old.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'kodnaqi-eula-dialog';
    wrapper.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2147483647;padding:16px;direction:rtl;';

    wrapper.innerHTML = ''
      + '<div style="background:#fff;border-radius:16px;max-width:600px;width:100%;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 25px 80px rgba(0,0,0,0.5);">'
      + '  <div style="background:linear-gradient(135deg,#0d3b66,#1e6091);color:#fff;padding:20px;border-radius:16px 16px 0 0;text-align:center;">'
      + '    <h2 style="margin:0;font-size:1.3rem;">📋 اتفاقية استخدام KodNaqi</h2>'
      + '    <div style="font-size:0.8rem;opacity:0.9;margin-top:5px;">الإصدار ' + EULA_VERSION + '</div>'
      + '  </div>'
      + '  <div style="flex:1;overflow-y:auto;padding:20px;font-size:0.9rem;line-height:1.8;color:#334155;">'
      + '    <h3 style="color:#0d3b66;margin-top:0;">1. الترخيص والاستخدام</h3>'
      + '    <p>هذا البرنامج مرخص لك كمستخدم نهائي للمعامل الطبية. لا يجوز إعادة البيع أو التوزيع أو النسخ بدون إذن كتابي من المطور.</p>'
      + '    <h3 style="color:#0d3b66;">2. الملكية الفكرية</h3>'
      + '    <p>جميع حقوق الملكية الفكرية للبرنامج محفوظة للمطور. البيانات المدخلة من قبلك هي ملكك وحدك.</p>'
      + '    <h3 style="color:#0d3b66;">3. الاشتراك والتجديد</h3>'
      + '    <p>الاشتراك سنوي ويتضمن التحديثات والدعم الفني. عند انتهاء الاشتراك، يتوقف البرنامج عن العمل حتى يتم التجديد.</p>'
      + '    <h3 style="color:#0d3b66;">4. حدود المسؤولية</h3>'
      + '    <p>البرنامج أداة مساعدة ولا يغني عن المراجعة الطبية المتخصصة. المطور غير مسؤول عن القرارات الطبية المتخذة بناءً على نتائج البرنامج.</p>'
      + '    <h3 style="color:#0d3b66;">5. الخصوصية والأمان</h3>'
      + '    <p>جميع البيانات تُخزن محليًا على جهازك فقط. لا نجمع أو نشارك بياناتك مع أي طرف ثالث.</p>'
      + '    <h3 style="color:#0d3b66;">6. الدعم الفني</h3>'
      + '    <p>الدعم الفني متاح خلال ساعات العمل عبر: <strong>+249111729111</strong></p>'
      + '  </div>'
      + '  <div style="padding:20px;border-top:1px solid #e2e8f0;display:flex;gap:12px;">'
      + '    <button id="eula-accept" style="flex:1;padding:14px;background:linear-gradient(135deg,#059669,#10b981);color:#fff;border:none;border-radius:10px;font-size:1rem;font-weight:800;cursor:pointer;">✅ أوافق على الاتفاقية</button>'
      + '    <button id="eula-decline" style="flex:1;padding:14px;background:#e2e8f0;color:#64748b;border:none;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer;">❌ أرفض</button>'
      + '  </div>'
      + '</div>';

    document.documentElement.appendChild(wrapper);

    // أحداث الأزرار
    document.getElementById('eula-accept').addEventListener('click', function() {
      acceptEULA();
      wrapper.remove();
      // إعادة تحميل لتطبيق القيود
      location.reload();
    });

    document.getElementById('eula-decline').addEventListener('click', function() {
      alert('❌ يجب الموافقة على اتفاقية الاستخدام لاستخدام البرنامج.');
      // لا نزيل النافذة — المستخدم مجبر على الموافقة
    });
  }

  function checkEULA() {
    if (!hasAcceptedEULA()) {
      showEULADialog();
      return false;
    }
    return true;
  }

  // ═══ وضع القفل عند انتهاء الترخيص (لا يحذف البيانات) ═══
  const LOCK_KEY = 'kodnaqi_expiry_lock';

  function setExpiryLock(on) {
    try {
      if (on) localStorage.setItem(LOCK_KEY, '1');
      else localStorage.removeItem(LOCK_KEY);
    } catch(e) {}
  }

  function isExpiryLocked() {
    try { return localStorage.getItem(LOCK_KEY) === '1'; } catch(e) { return false; }
  }

  function ensureExpiryOverlay() {
    if (document.getElementById('kodnaqi-expiry-lock')) return;
    const div = document.createElement('div');
    div.id = 'kodnaqi-expiry-lock';
    div.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.96);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;';
    div.innerHTML = ''
      + '<div style="max-width:520px;width:100%;background:#fff;border-radius:14px;padding:22px;text-align:center;">'
      + '  <h2 style="margin:0 0 10px;color:#991b1b;">انتهت صلاحية الترخيص</h2>'
      + '  <p style="margin:0 0 14px;color:#334155;line-height:1.8;">تم إيقاف النظام مؤقتًا. بياناتك محفوظة ولم تُحذف. للمتابعة، أدخل مفتاح ترخيص جديد.</p>'
      + '  <button id="kodnaqi-open-license" style="width:100%;padding:12px;border:0;border-radius:10px;background:linear-gradient(135deg,#0d3b66,#1e6091);color:#fff;font-weight:800;cursor:pointer;">فتح إدارة الترخيص</button>'
      + '  <div style="margin-top:10px;font-size:0.85rem;color:#64748b;">لن يعمل النظام إلا بعد إعادة التفعيل.</div>'
      + '</div>';
    document.documentElement.appendChild(div);
    const btn = div.querySelector('#kodnaqi-open-license');
    if (btn) btn.addEventListener('click', function() { showDialog(); });
  }

  function removeExpiryOverlay() {
    const el = document.getElementById('kodnaqi-expiry-lock');
    if (el) el.remove();
  }

  // ═══ أدوات آمنة للتخزين ═══
  function safeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } }
  function safeDel(k) { try { localStorage.removeItem(k); return true; } catch(e) { return false; } }

  // ═══ كود الجهاز (المصدر: security.js) ═══
  async function getMyDeviceCode() {
    if (window.KodNaqiSecurity && window.KodNaqiSecurity.getDeviceCode) {
      return await window.KodNaqiSecurity.getDeviceCode();
    }
    // fallback نادر
    const fp = [navigator.userAgent, navigator.language,
                screen.width + 'x' + screen.height,
                new Date().getTimezoneOffset()].join('|');
    let h = 5381;
    for (let i = 0; i < fp.length; i++) { h = ((h << 5) + h) + fp.charCodeAt(i); h = h & 0xFFFFFFFF; }
    let out = Math.abs(h).toString(36).toUpperCase();
    while (out.length < 6) out += 'X';
    return out.slice(0, 6);
  }

  function formatDeviceCode(code) {
    if (!code || code.length !== 6) return code || '';
    return code.slice(0, 3) + '-' + code.slice(3);
  }

  // ═══ التحقق (يعتمد على security.js الجديد) ═══
  // ═══ فحص الخادم (Firebase) — غير حاجب عند فشل الاتصال ═══
  async function checkServer(payload) {
    if (!payload || !payload.id) return { ok: true };
    if (!window.KodNaqiSecurity || !window.KodNaqiSecurity.checkServerStatus) return { ok: true };
    const remote = await window.KodNaqiSecurity.checkServerStatus(payload.id);
    if (remote.ok) {
      if (remote.status === 'revoked' || remote.status === 'suspended') {
        return { ok: false, valid: false, reason: 'server_' + remote.status };
      }
      return { ok: true };
    }
    const cached = window.KodNaqiSecurity.getCachedServerStatus(payload.id);
    if (cached) {
      if (cached.status === 'revoked' || cached.status === 'suspended') {
        return { ok: false, valid: false, reason: 'server_' + cached.status };
      }
      const age = Date.now() - (cached.serverTime || 0);
      const grace = (window.KODNAQI_FIREBASE && window.KODNAQI_FIREBASE.gracePeriodMs) || (7 * 24 * 60 * 60 * 1000);
      if (age > grace) {
        return { ok: false, valid: false, reason: 'offline_grace_exceeded' };
      }
    }
    return { ok: true };
  }

  async function verify(key) {

    if (!key) return { valid: false, reason: 'empty' };
    const trimmed = String(key).trim();

    // رفض المفاتيح القديمة صراحةً
    if (trimmed.startsWith('KOD-')) {
      return {
        valid: false,
        reason: 'old_format',
        message: 'هذا مفتاح بنظام قديم. تواصل مع المطور للحصول على مفتاح جديد.'
      };
    }
    if (!trimmed.startsWith('KOD2.')) {
      return { valid: false, reason: 'format' };
    }
    if (!window.KodNaqiSecurity || !window.KodNaqiSecurity.verifyLicense) {
      return { valid: false, reason: 'security_not_loaded' };
    }
    const localResult = await window.KodNaqiSecurity.verifyLicense(trimmed);
    if (!localResult) return { valid: false, reason: 'security_error', message: 'تعذر التحقق من الترخيص' };
    if (!localResult.valid) return localResult;
    const serverResult = await checkServer(localResult.payload);
    if (!serverResult.ok) return serverResult;
    return localResult;
  }

  // ═══ التفعيل ═══
  async function activate(key) {
    const check = await verify(key);
    if (!check.valid) return check;
    const data = {
      key: key,
      payload: check.payload,
      deviceCode: check.deviceCode,
      activatedAt: Date.now()
    };
    safeSet(STORAGE_KEY, JSON.stringify(data));
    // عند إعادة التفعيل بنجاح: نزيل قفل الانتهاء ونُعيد الواجهة
    setExpiryLock(false);
    removeExpiryOverlay();
    try { await applyRestrictions(); } catch(e) {}
    return { valid: true, payload: check.payload };
  }

  // ═══ حالة الترخيص ═══
  async function getLicenseStatus() {
    const raw = safeGet(STORAGE_KEY);
    if (!raw) return { status: 'none' };
    let data;
    try { data = JSON.parse(raw); } catch(e) { safeDel(STORAGE_KEY); return { status: 'none' }; }
    const check = await verify(data.key);
    if (!check.valid) return { status: 'invalid', reason: check.reason, message: check.message, data };
    const p = check.payload;
    const daysLeft = p.expires ? Math.ceil((p.expires - Date.now()) / 86400000) : Infinity;
    return { status: 'valid', payload: p, daysLeft, data };
  }

  // ═══ التجريبية ═══
  async function getTrialStatus() {
    let start = safeGet(TRIAL_KEY);
    if (!start) {
      start = String(Date.now());
      safeSet(TRIAL_KEY, start);
      try { await window.KodNaqiSecurity.updateLastSeen(Date.now()); } catch(e) {}
    }
    const startMs = parseInt(start, 10) || Date.now();
    const elapsed = Date.now() - startMs;
    const totalMs = TRIAL_DAYS * 86400000;
    const remaining = totalMs - elapsed;
    const daysLeft = Math.max(0, Math.ceil(remaining / 86400000));
    const expired = remaining <= 0;
    return { active: !expired, daysLeft, startMs, elapsed, expired };
  }

  // ═══ القراءة النشطة (ترخيص أو تجريبية) ═══
  async function getActivePayload() {
    const st = await getLicenseStatus();
    if (st.status === 'valid') { setExpiryLock(false); removeExpiryOverlay(); return st.payload; }

    // إذا كان هناك ترخيص لكنه منتهٍ/غير صالح: لا نسمح بالدخول في TRIAL، ونقفل النظام مع بقاء البيانات
    if (st && st.data && st.data.key && st.status !== 'valid') {
      setExpiryLock(true);
      ensureExpiryOverlay();
      return null;
    }

    // في وضع TRIAL: نُعيد حمولة وهمية حتى تعمل الميزات
    const trial = await getTrialStatus();
    if (trial.active) { setExpiryLock(false); removeExpiryOverlay(); return { tier: 'TRIAL' }; }
    return null;
  }

  async function getActiveTier() {
    const p = await getActivePayload();
    if (p) return p.tier;
    const trial = await getTrialStatus();
    return trial.active ? 'TRIAL' : null;
  }

  // ═══ الميزات ═══
  // التحقق من حدود الباقة (أجهزة/مستخدمون)
  async function checkTierLimit(kind, currentCount) {
    const tier = await getActiveTier();
    if (!tier) return { ok: false, reason: 'no_license', limit: 0 };
    const limits = getTierLimits(tier);
    const limit = limits[kind] !== undefined ? limits[kind] : 0;
    if (limit === Infinity) return { ok: true, limit: Infinity, tier };
    const count = parseInt(currentCount, 10) || 0;
    if (count >= limit) return { ok: false, reason: 'limit_reached', limit, current: count, tier };
    return { ok: true, limit, current: count, tier };
  }

  async function getTierInfo() {
    const tier = await getActiveTier();
    if (!tier) return null;
    return { tier, limits: getTierLimits(tier), features: TIER_FEATURES[tier] || [] };
  }

  async function hasFeature(feature) {
    const p = await getActivePayload();
    if (!p) return false;
    const list = TIER_FEATURES[p.tier] || [];
    return list.indexOf(feature) !== -1;
  }

  async function hasFeatureSync(feature) {
    // نسخة متزامنة تعتمد على آخر حالة محفوظة
    try {
      const raw = safeGet(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      const tier = data && data.payload && data.payload.tier;
      if (!tier) return false;
      const list = TIER_FEATURES[tier] || [];
      return list.indexOf(feature) !== -1;
    } catch(e) { return false; }
  }

  // ═══ القيود على الواجهة ═══
  async function applyRestrictions() {
    // فحص EULA أولاً
    checkEULA();
    // فحص تذكير التجديد
    checkRenewalReminder().catch(function(){});
    
    // إذا كان هناك قفل انتهاء: نخفي كل شيء ونمنع الاستخدام (دون حذف أي بيانات)
    if (isExpiryLocked()) {
      document.documentElement.setAttribute('data-tier', 'EXPIRED');
      document.querySelectorAll('[data-require-tier],[data-require-feature]').forEach(function(el) {
        el.style.display = 'none';
      });
      ensureExpiryOverlay();
      return;
    }

    const tier = (await getActiveTier()) || 'NONE';
    document.documentElement.setAttribute('data-tier', tier);

    // إخفاء العناصر حسب data-require-tier
    const els = document.querySelectorAll('[data-require-tier]');
    els.forEach(function(el) {
      const req = (el.getAttribute('data-require-tier') || '').split(',').map(s => s.trim());
      const ok = req.indexOf(tier) !== -1 || req.indexOf('*') !== -1;
      el.style.display = ok ? '' : 'none';
    });

    // عناصر تتطلب ميزة
    const featEls = document.querySelectorAll('[data-require-feature]');
    featEls.forEach(async function(el) {
      const f = el.getAttribute('data-require-feature');
      const ok = await hasFeature(f);
      el.style.display = ok ? '' : 'none';
    });
  }

  // ═══ نافذة الترخيص ═══
  async function showDialog() {
    // إزالة أي نافذة سابقة
    const old = document.getElementById('kodnaqi-license-dialog');
    if (old) old.remove();

    const status = await getLicenseStatus();
    const trial = await getTrialStatus();
    const devCode = await getMyDeviceCode();
    const formatted = formatDeviceCode(devCode);

    let statusHtml = '';
    let actionLabel = 'تفعيل المفتاح';
    let hideInput = false;

    if (status.status === 'valid') {
      const p = status.payload;
      const tierName = TIER_NAMES[p.tier] || p.tier;
      const daysText = status.daysLeft === Infinity ? 'دائم' : status.daysLeft + ' يوم';
      statusHtml = '<div style="background:#d1fae5;color:#065f46;padding:12px;border-radius:8px;margin-bottom:14px;">'
                 + '<strong>✅ الترخيص نشط</strong><br>'
                 + 'الباقة: ' + tierName + '<br>'
                 + 'المتبقي: ' + daysText + '</div>';
      actionLabel = 'إلغاء الترخيص';
    } else if (trial.active) {
      statusHtml = '<div style="background:#fef3c7;color:#92400e;padding:12px;border-radius:8px;margin-bottom:14px;">'
                 + '<strong>⏳ تجريبية</strong> — متبقٍ ' + trial.daysLeft + ' يوم</div>';
    } else {
      statusHtml = '<div style="background:#fee2e2;color:#991b1b;padding:12px;border-radius:8px;margin-bottom:14px;">'
                 + '<strong>❌ الترخيص منتهٍ</strong></div>';
      hideInput = false;
    }

    const wrapper = document.createElement('div');
    wrapper.id = 'kodnaqi-license-dialog';
    wrapper.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:99999;padding:16px;';

    wrapper.innerHTML = ''
      + '<div style="background:#fff;border-radius:14px;max-width:480px;width:100%;padding:22px;font-family:inherit;direction:rtl;">'
      + '  <h2 style="margin:0 0 12px;color:#0d3b66;">إدارة الترخيص</h2>'
      +    statusHtml
      + '  <div style="background:#f1f5f9;padding:12px;border-radius:8px;margin-bottom:14px;font-family:monospace;">'
      + '    <div style="font-size:0.85rem;color:#64748b;margin-bottom:4px;">كود هذا الجهاز:</div>'
      + '    <div id="kodnaqi-devcode" style="font-size:1.4rem;font-weight:800;color:#0d3b66;letter-spacing:2px;cursor:pointer;" title="اضغط للنسخ">' + formatted + '</div>'
      + '  </div>'
      + (!hideInput ? '<input id="kodnaqi-license-input" type="text" placeholder="الصق المفتاح هنا" style="width:100%;padding:12px;border:2px solid #cbd5e1;border-radius:8px;font-family:monospace;font-size:0.9rem;margin-bottom:10px;box-sizing:border-box;">' : '')
      + '<div id="kodnaqi-license-msg" style="min-height:20px;color:#dc2626;margin-bottom:10px;font-size:0.9rem;"></div>'
      + '<button id="kodnaqi-btn-activate" style="width:100%;padding:14px;background:linear-gradient(135deg,#0d3b66,#1e6091);color:#fff;border:none;border-radius:10px;font-size:1rem;font-weight:800;cursor:pointer;margin-bottom:8px;">' + actionLabel + '</button>'
      + '<button id="kodnaqi-btn-close" style="width:100%;padding:12px;background:#e2e8f0;color:#334155;border:none;border-radius:10px;font-size:0.95rem;font-weight:600;cursor:pointer;">إغلاق</button>'
      + '</div>';

    document.body.appendChild(wrapper);

    // نسخ كود الجهاز بالضغط
    const devEl = document.getElementById('kodnaqi-devcode');
    if (devEl) {
      devEl.addEventListener('click', function() {
        try { navigator.clipboard.writeText(devCode); devEl.textContent = 'تم النسخ ✓'; setTimeout(function() { devEl.textContent = formatted; }, 1200); } catch(e) {}
      });
    }

    document.getElementById('kodnaqi-btn-close').addEventListener('click', function() { wrapper.remove(); });

    document.getElementById('kodnaqi-btn-activate').addEventListener('click', async function() {
                                                  alert('زر التفعيل يعمل!');
      const msg = document.getElementById('kodnaqi-license-msg');

      // إذا كان الترخيص نشطًا → إلغاء
      if (status.status === 'valid') {
        if (!confirm('هل أنت متأكد من إلغاء الترخيص؟')) return;
        safeDel(STORAGE_KEY);
        msg.style.color = '#059669';
        msg.textContent = 'تم الإلغاء';
        setTimeout(function() { wrapper.remove(); location.reload(); }, 800);
        return;
      }

      const input = document.getElementById('kodnaqi-license-input');
      if (!input) return;
      const key = input.value.trim();
      if (!key) { msg.textContent = 'الصق المفتاح أولاً'; return; }

      msg.style.color = '#0d3b66';
      msg.textContent = 'جاري التحقق...';

      const result = await activate(key);
      if (result.valid) {
        msg.style.color = '#059669';
        msg.textContent = '✅ تم التفعيل بنجاح';
        setTimeout(function() { wrapper.remove(); location.reload(); }, 900);
      } else {
        msg.style.color = '#dc2626';
        const map = {
          empty: 'المفتاح فارغ',
          format: 'صيغة المفتاح غير صحيحة',
          old_format: 'هذا مفتاح قديم — تواصل مع المطور',
          signature: 'التوقيع غير صالح — المفتاح مزوّر',
          wrong_device: 'هذا المفتاح لا يخص جهازك',
          expired: 'انتهت صلاحية الترخيص',
          clock_rollback: 'تم اكتشاف تلاعب بساعة الجهاز',
          clock_before_issued: 'ساعة الجهاز غير صحيحة',
          security_not_loaded: 'خطأ في تحميل طبقة الحماية'
        };
        msg.textContent = '❌ ' + (map[result.reason] || result.message || 'فشل التحقق');
      }
    });
  }

  // ═══ تعطيل دالة التوليد (أمني) ═══
  function generateKey() {
    throw new Error('تم إيقاف التوليد في المتصفح لأسباب أمنية. استخدم sign.js على جهاز المالك.');
  }

  // ═══ التصدير العام ═══
  window.KodNaqiLicense = {
    // واجهات مستخدمة من ملفات أخرى
    verify: verify,
    checkEULA: checkEULA,
    checkRenewalReminder: checkRenewalReminder,
    hasAcceptedEULA: hasAcceptedEULA,
    acceptEULA: acceptEULA,
    activate: activate,
    getMyDeviceCode: getMyDeviceCode,
    formatDeviceCode: formatDeviceCode,
    hasFeature: hasFeature,
    hasFeatureSync: hasFeatureSync,
    applyRestrictions: applyRestrictions,
    checkTierLimit: checkTierLimit,
    getTierInfo: getTierInfo,
    getTierLimits: getTierLimits,
    showDialog: showDialog,
    // جديدة
    getLicenseStatus: getLicenseStatus,
    getTrialStatus: getTrialStatus,
    getActiveTier: getActiveTier,
    // معطّلة
    generate: generateKey,
    // ثوابت
    STORAGE_KEY: STORAGE_KEY,
    TRIAL_KEY: TRIAL_KEY,
    TIER_NAMES: TIER_NAMES,
    TIER_FEATURES: TIER_FEATURES
  };

  // تشغيل تلقائي
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { applyRestrictions().catch(function(){}); });
  } else {
    applyRestrictions().catch(function(){});
  }

  console.log('[License] v2 (ECDSA) loaded');
})();
