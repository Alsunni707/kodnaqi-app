/*! KodNaqi License Dashboard — إدارة التراخيص من Firebase */
(function() {
  'use strict';

  // ═══ حدود الأجهزة حسب الباقة ═══
  const TIER_DEVICE_LIMITS = { 'B': 1, 'S': 3, 'A': 30, 'E': 50, 'TRIAL': 1 };
  function tierDeviceLimit(tier) {
    return TIER_DEVICE_LIMITS[String(tier || '').toUpperCase()] || 3;
  }

  const SESSION_KEY = 'kodnaqi_admin_secret';

  function getSecret() {
    try { return localStorage.getItem(SESSION_KEY) || ''; } catch (e) { return ''; }
  }
  function setSecret(s) {
    try { localStorage.setItem(SESSION_KEY, s); } catch (e) {}
  }
  function clearSecret() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function toast(msg, type) {
    if (typeof window.toast === 'function') { window.toast(msg, type || 'success'); return; }
    alert(msg);
  }

  function fbUrl(path, secret) {
    const cfg = window.KODNAQI_FIREBASE;
    if (!cfg || !cfg.url) throw new Error('firebase-config.js غير محمّل');
    return cfg.url + '/' + cfg.licensesPath + '/' + path + '.json?auth=' + encodeURIComponent(secret);
  }

  async function licFetch(path) {
    const secret = getSecret();
    if (!secret) throw new Error('لم تسجّل الدخول');
    const r = await fetch(fbUrl(path, secret), { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  }

  async function licPut(path, body) {
    const secret = getSecret();
    if (!secret) throw new Error('لم تسجّل الدخول');
    const r = await fetch(fbUrl(path, secret), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  }

  async function licPatch(path, body) {
    const secret = getSecret();
    if (!secret) throw new Error('لم تسجّل الدخول');
    const r = await fetch(fbUrl(path, secret), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  }

  // ═══ الدخول ═══
  window.licLogin = function() {
    const input = document.getElementById('licSecretInput');
    const msg = document.getElementById('licAuthMsg');
    const val = (input.value || '').trim();
    if (!val) { msg.textContent = '❌ أدخل الـ Secret'; msg.style.color = '#dc3545'; return; }
    setSecret(val);
    msg.textContent = '⏳ جاري التحقق...';
    msg.style.color = '#0d3b66';
    licRefresh().then(function() {
      msg.textContent = '✅ تم الدخول بنجاح';
      msg.style.color = '#198754';
      input.value = '';
      document.getElementById('licAuthBox').style.display = 'none';
      document.getElementById('licDashboard').style.display = 'block';
    }).catch(function(e) {
      clearSecret();
      msg.textContent = '❌ ' + e.message;
      msg.style.color = '#dc3545';
    });
  };

  window.licLogout = function() {
    clearSecret();
    document.getElementById('licAuthBox').style.display = 'block';
    document.getElementById('licDashboard').style.display = 'none';
    toast('تم الخروج');
  };

  // ═══ البيانات ═══
  let _licenses = [];

  window.licRefresh = async function() {
    const data = await licFetch('');
    _licenses = [];
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(function(k) {
        _licenses.push(Object.assign({ _id: k }, data[k]));
      });
    }
    licRender();
  };

  function licStatusOf(lic) {
    if (lic.status === 'revoked') return { key: 'revoked', label: '⛔ ملغى', color: '#dc3545' };
    if (lic.status === 'suspended') return { key: 'suspended', label: '⏸️ معلّق', color: '#f59e0b' };
    if (lic.expires && Date.now() > lic.expires) return { key: 'expired', label: '⏰ منتهي', color: '#f59e0b' };
    return { key: 'active', label: '✅ نشط', color: '#198754' };
  }

  function daysUntil(ts) {
    if (!ts) return '∞';
    const d = Math.ceil((ts - Date.now()) / 86400000);
    return d > 0 ? d + ' يوم' : 'منتهي';
  }

  function fmtDate(ts) {
    if (!ts) return '—';
    try { return new Date(ts).toLocaleDateString('ar-EG'); } catch (e) { return '—'; }
  }

  window.licRender = function() {
    const search = (document.getElementById('licSearch').value || '').trim().toLowerCase();
    let total = 0, active = 0, revoked = 0, expired = 0;

    const html = _licenses.filter(function(lic) {
      if (!search) return true;
      const id = (lic._id || '').toLowerCase();
      const cust = (lic.customer || '').toLowerCase();
      return id.indexOf(search) !== -1 || cust.indexOf(search) !== -1;
    }).map(function(lic) {
      const st = licStatusOf(lic);
      total++;
      if (st.key === 'active') active++;
      else if (st.key === 'revoked' || st.key === 'suspended') revoked++;
      else if (st.key === 'expired') expired++;

      const devices = Array.isArray(lic.devices) ? lic.devices.join(', ') : '*';
      const tier = lic.tier || '?';

      return ''
        + '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px;">'
        +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
        +     '<div style="font-weight:800;color:#0d3b66;font-size:0.9rem;">' + (lic.customer || 'بدون اسم') + '</div>'
        +     '<span style="background:' + st.color + '22;color:' + st.color + ';padding:3px 8px;border-radius:6px;font-size:0.75rem;font-weight:700;">' + st.label + '</span>'
        +   '</div>'
        +   '<div style="font-size:0.8rem;color:#64748b;font-family:monospace;margin-bottom:4px;">' + lic._id + '</div>'
        +   '<div style="display:flex;gap:10px;font-size:0.8rem;color:#334155;flex-wrap:wrap;margin-bottom:8px;">'
        +     '<span>🎯 ' + tier + '</span>'
        +     '<span>📱 ' + devices + '</span>'
        +     '<span>📅 ' + daysUntil(lic.expires) + '</span>'
        +     '<span>🔢 rev ' + (lic.rev || 1) + '</span>'
        +   '</div>'
        +   '<div style="display:flex;gap:6px;flex-wrap:wrap;">'
        +     (st.key === 'active'
              ? '<button onclick="licRevoke(\'' + lic._id + '\')" style="padding:6px 12px;background:#dc3545;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">⛔ إلغاء</button>'
              : '<button onclick="licReactivate(\'' + lic._id + '\')" style="padding:6px 12px;background:#198754;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">✅ إعادة تفعيل</button>'
                + '<button onclick="licDelete(\'' + lic._id + '\')" style="padding:6px 12px;background:#b91c1c;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">🗑️ حذف نهائي</button>')
        +     (st.key === 'active' ? window.licAddDeviceButtonHTML(lic._id) : '')
        +     '<button onclick="licCopyId(\'' + lic._id + '\')" style="padding:6px 12px;background:#e2e8f0;color:#334155;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">📋 نسخ المعرّف</button>'
        +   '</div>'
        + '</div>';
    }).join('');

    document.getElementById('licList').innerHTML = html || '<div style="text-align:center;color:#94a3b8;padding:20px;">لا توجد تراخيص</div>';
    document.getElementById('licTotal').textContent = total;
    document.getElementById('licActive').textContent = active;
    document.getElementById('licRevoked').textContent = revoked;
    document.getElementById('licExpired').textContent = expired;
  };

  window.licRevoke = async function(id) {
    if (!confirm('إلغاء الترخيص ' + id + '؟\nلن يعمل عند العميل عند أول اتصال بالإنترنت.')) return;
    try {
      const cur = await licFetch(encodeURIComponent(id));
      const rev = ((cur && cur.rev) || 1) + 1;
      await licPatch(encodeURIComponent(id), { status: 'revoked', rev: rev, updatedAt: Date.now() });
      toast('✅ تم الإلغاء');
      licRefresh();
    } catch (e) { toast('❌ ' + e.message, 'error'); }
  };

  window.licReactivate = async function(id) {
    try {
      const cur = await licFetch(encodeURIComponent(id));
      const rev = ((cur && cur.rev) || 1) + 1;
      await licPatch(encodeURIComponent(id), { status: 'active', rev: rev, updatedAt: Date.now() });
      toast('✅ تم إعادة التفعيل');
      licRefresh();
    } catch (e) { toast('❌ ' + e.message, 'error'); }
  };

  window.licCopyId = function(id) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id).then(function() { toast('📋 تم النسخ'); });
    } else {
      prompt('انسخ يدويًا:', id);
    }
  };

  // ═══ التهيئة ═══
  document.addEventListener('DOMContentLoaded', function() {
    if (getSecret()) {
      document.getElementById('licAuthBox').style.display = 'none';
      document.getElementById('licDashboard').style.display = 'block';
      licRefresh().catch(function() {});
    }
  });

  // ═══ إصدار ترخيص جديد ═══
  let _lastLicense = '';
  let _lastCustomer = '';
  let _lastDevices = [];

  function licSetMsg(msg, color) {
    const el = document.getElementById('licNewError');
    if (el) { el.textContent = msg; el.style.color = color || '#dc3545'; }
  }


  window.licDelete = async function(id) {
    if (!confirm('⚠️ هل أنت متأكد من الحذف النهائي للترخيص ' + id + '؟\nلا يمكن التراجع عن هذه العملية!')) return;
    try {
      const secret = getSecret();
      const cfg = window.KODNAQI_FIREBASE;
      const url = cfg.url + '/' + cfg.licensesPath + '/' + encodeURIComponent(id) + '.json?auth=' + encodeURIComponent(secret);
      const r = await fetch(url, { method: 'DELETE' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      toast('✅ تم الحذف نهائياً');
      licRefresh();
    } catch (e) { toast('❌ ' + e.message, 'error'); }
  };

  // ═══ إدارة حقول الأجهزة الديناميكية ═══
  let _licDeviceCount = 0;
  const LIC_MAX_DEVICES = 30;

  function licDeviceFieldHTML(n, removable) {
    const id = 'licDevField_' + n;
    return '<div style="display:flex;gap:6px;align-items:stretch;" id="' + id + '">'
      + '<input type="text" class="form-control center" placeholder="' + (n === 1 ? '1AHI4L' : 'كود الجهاز ' + n) + '" maxlength="6" style="text-transform:uppercase;letter-spacing:2px;flex:1;" oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,\'\').slice(0,6)">'
      + (removable ? '<button type="button" onclick="licRemoveDeviceField(' + n + ')" style="padding:0 12px;background:#fee2e2;color:#b91c1c;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:1.1rem;">✕</button>' : '')
      + '</div>';
  }

  window.licAddDeviceField = function() {
    const container = document.getElementById('licDevicesContainer');
    if (!container) return;
    if (container.children.length >= LIC_MAX_DEVICES) {
      if (window.toast) toast('⚠️ الحد الأقصى ' + LIC_MAX_DEVICES + ' جهاز', 'error');
      return;
    }
    _licDeviceCount++;
    const n = _licDeviceCount;
    const div = document.createElement('div');
    div.innerHTML = licDeviceFieldHTML(n, true);
    container.appendChild(div.firstChild);
  };

  window.licRemoveDeviceField = function(n) {
    const el = document.getElementById('licDevField_' + n);
    if (el) el.remove();
  };

  function licResetDeviceFields() {
    const container = document.getElementById('licDevicesContainer');
    if (!container) return;
    container.innerHTML = '';
    _licDeviceCount = 1;
    const div = document.createElement('div');
    div.innerHTML = licDeviceFieldHTML(1, false);
    container.appendChild(div.firstChild);
  }

  window.licOpenNewModal = function() {
    document.getElementById('licNewModal').style.display = 'flex';
    document.getElementById('licNewForm').style.display = 'block';
    document.getElementById('licNewResult').style.display = 'none';
    document.getElementById('licNewError').textContent = '';
    licResetDeviceFields();
    licUpdateKeyStatus();
  };

  window.licCloseNewModal = function() {
    document.getElementById('licNewModal').style.display = 'none';
  };

  window.licUpdateKeyStatus = function() {
    const el = document.getElementById('licKeyStatus');
    if (!el) return;
    if (window.KodNaqiSigning && window.KodNaqiSigning.hasKey && window.KodNaqiSigning.hasKey()) {
      el.textContent = '✅ المفتاح الخاص محمّل: ' + (window.KodNaqiSigning.getKeyName ? window.KodNaqiSigning.getKeyName() : '');
      el.style.color = '#198754';
    } else {
      el.textContent = '⚠️ المفتاح الخاص غير محمّل';
      el.style.color = '#dc3545';
    }
  };

  window.licLoadPK = async function(ev) {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    try {
      await window.KodNaqiSigning.loadPrivateKey(file);
      licUpdateKeyStatus();
      licSetMsg('✅ تم تحميل المفتاح الخاص', '#198754');
    } catch (e) {
      licSetMsg('❌ ' + e.message, '#dc3545');
    }
  };

  window.licCreate = async function() {
    const name = (document.getElementById('licNewName').value || '').trim();
    const phone = (document.getElementById('licNewPhone')?.value || '').trim();
    const address = (document.getElementById('licNewAddress')?.value || '').trim();
    const tier = (document.getElementById('licNewTier').value || 'S').toUpperCase();
    const days = parseInt(document.getElementById('licNewDays').value, 10) || 365;

    const devices = [];
    let hasInvalid = false;
    const container = document.getElementById('licDevicesContainer');
    if (!container) return licSetMsg('❌ حاوية الأجهزة غير موجودة', '#dc3545');
    container.querySelectorAll('input').forEach(function(el) {
      const v = (el.value || '').trim().toUpperCase();
      if (!v) return;
      if (v.length !== 6) { hasInvalid = true; return; }
      devices.push(v);
    });

    if (!name) return licSetMsg('❌ أدخل اسم العميل', '#dc3545');
    if (hasInvalid) return licSetMsg('❌ كل كود جهاز يجب أن يكون 6 أحرف', '#dc3545');
    if (devices.length === 0) return licSetMsg('❌ أدخل كود جهاز واحد على الأقل', '#dc3545');
    if (devices.length !== new Set(devices).size) return licSetMsg('❌ يوجد كود مكرر', '#dc3545');
    if (!window.KodNaqiSigning || !window.KodNaqiSigning.hasKey || !window.KodNaqiSigning.hasKey()) {
      return licSetMsg('❌ حمّل المفتاح الخاص أولاً', '#dc3545');
    }
    if (days < 1 || days > 3650) return licSetMsg('❌ عدد الأيام غير صحيح', '#dc3545');

    licSetMsg('⏳ جاري الإصدار والنشر...', '#0d3b66');

    try {
      const result = await window.KodNaqiSigning.generate({
        tier: tier,
        devices: devices,
        days: days,
        customer: name
      });
      const payload = result.payload;

      const secret = getSecret();
      const cfg = window.KODNAQI_FIREBASE;
      const url = cfg.url + '/' + cfg.licensesPath + '/' + encodeURIComponent(payload.id) + '.json?auth=' + encodeURIComponent(secret);

      const r = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'active',
          tier: payload.tier,
          customer: payload.customer,
          phone: phone || '',
          address: address || '',
          devices: payload.devices,
          expires: payload.expires,
          issued: payload.issued,
          rev: 1,
          updatedAt: Date.now()
        })
      });
      if (!r.ok) throw new Error('Firebase HTTP ' + r.status);

      _lastLicense = result.license;
      _lastCustomer = name;
      _lastDevices = devices;

      document.getElementById('licNewForm').style.display = 'none';
      document.getElementById('licNewResult').style.display = 'block';
      document.getElementById('licNewResultLicense').value = result.license;
      document.getElementById('licNewResultCustomer').textContent = name;
      document.getElementById('licNewResultDevice').textContent = devices.join(', ');
      document.getElementById('licNewResultTier').textContent = tier;
      document.getElementById('licNewResultDays').textContent = days;

      toast('✅ تم الإصدار والنشر');
      licRefresh();
    } catch (e) {
      licSetMsg('❌ ' + e.message, '#dc3545');
    }
  };

  window.licCopyNew = function() {
    const lic = _lastLicense || '';
    if (!lic) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lic).then(function() { toast('📋 تم النسخ'); });
    } else {
      prompt('انسخ يدويًا:', lic);
    }
  };

  window.licWhatsApp = function() {
    const lic = _lastLicense || '';
    const name = _lastCustomer || '';
    const devicesStr = (_lastDevices || []).join(', ');
    const msg = '🔑 مفتاح ترخيص KodNaqi\n\n' +
                '🏥 العميل: ' + name + '\n' +
                '📱 الأجهزة: ' + devicesStr + '\n\n' +
                lic + '\n\n' +
                '📞 للدعم: +249 111 729 111';
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
  };

  // ═══ نافذة "إضافة جهاز لترخيص موجود" ═══
  let _licAddTargetId = '';

  function ensureAddDeviceModal() {
    let m = document.getElementById('licAddDeviceModal');
    if (m) return m;
    m = document.createElement('div');
    m.id = 'licAddDeviceModal';
    m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:10000;align-items:center;justify-content:center;padding:14px;';
    m.innerHTML = ''
      + '<div style="background:#fff;border-radius:14px;max-width:480px;width:100%;padding:20px;max-height:92vh;overflow-y:auto;">'
      +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
      +     '<h2 style="margin:0;color:#0d3b66;font-size:1.1rem;">➕ إضافة جهاز لترخيص موجود</h2>'
      +     '<button onclick="licCloseAddDevice()" style="background:#e2e8f0;border:none;width:32px;height:32px;border-radius:8px;cursor:pointer;">✕</button>'
      +   '</div>'
      +   '<div id="licAddInfo" style="background:#f1f5f9;padding:12px;border-radius:8px;margin-bottom:12px;font-size:0.85rem;color:#334155;"></div>'
      +   '<div class="form-group">'
      +     '<label class="form-label">📱 كود الجهاز الجديد (6 أحرف) *</label>'
      +     '<input type="text" id="licAddDeviceCode" class="form-control center" placeholder="ABCDEF" maxlength="6" style="text-transform:uppercase;letter-spacing:2px;" oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,\'\').slice(0,6)">'
      +   '</div>'
      +   '<div id="licAddError" style="min-height:22px;margin-bottom:8px;text-align:center;font-size:0.85rem;"></div>'
      +   '<button id="licAddConfirmBtn" onclick="licConfirmAddDevice()" class="btn btn-primary" style="width:100%;padding:12px;font-weight:800;background:linear-gradient(135deg,#0d3b66,#1e6091);">✅ إضافة الجهاز</button>'
      + '</div>';
    document.body.appendChild(m);
    return m;
  }

  window.licOpenAddDevice = function(licenseId) {
    _licAddTargetId = licenseId;
    const m = ensureAddDeviceModal();
    document.getElementById('licAddDeviceCode').value = '';
    document.getElementById('licAddError').textContent = '';
    m.style.display = 'flex';

    (async function() {
      try {
        const cur = await licFetch(encodeURIComponent(licenseId));
        const devices = Array.isArray(cur.devices) ? cur.devices : [];
        const limit = tierDeviceLimit(cur.tier);
        const used = devices.length;
        const remaining = limit - used;
        const pct = Math.min(100, Math.round((used / limit) * 100));

        let warnColor = '#0d3b66';
        let warnText = '';
        if (remaining <= 0) { warnColor = '#dc3545'; warnText = '❌ وصلت للحد الأقصى'; }
        else if (remaining === 1) { warnColor = '#f59e0b'; warnText = '⚠️ جهاز واحد فقط متبقٍ'; }

        document.getElementById('licAddInfo').innerHTML =
          '<strong>' + (cur.customer || 'بدون اسم') + '</strong>'
          + ' <span style="color:#64748b;font-size:0.8rem;">(' + (cur.tier || '?') + ')</span><br>'
          + '<div style="margin-top:8px;background:#fff;border-radius:6px;height:8px;overflow:hidden;border:1px solid #cbd5e1;">'
          +   '<div style="height:100%;width:' + pct + '%;background:' + warnColor + ';"></div>'
          + '</div>'
          + '<div style="margin-top:6px;color:' + warnColor + ';font-weight:700;">الأجهزة: ' + used + ' من ' + limit + ' — ' + remaining + ' متبقٍ</div>'
          + (warnText ? '<div style="margin-top:4px;font-size:0.85rem;">' + warnText + '</div>' : '')
          + '<div style="margin-top:8px;font-size:0.8rem;color:#64748b;">الحالية: ' + (devices.length ? devices.join(', ') : '—') + '</div>';

        const btn = document.getElementById('licAddConfirmBtn');
        const input = document.getElementById('licAddDeviceCode');
        if (remaining <= 0) {
          if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; btn.textContent = '⛔ الحد الأقصى'; }
          if (input) { input.disabled = true; input.placeholder = 'لا يوجد مكان'; }
        } else {
          if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.textContent = '✅ إضافة الجهاز'; }
          if (input) { input.disabled = false; input.placeholder = 'ABCDEF'; }
        }
      } catch (e) {
        document.getElementById('licAddInfo').textContent = '⚠️ ' + e.message;
      }
    })();
  };

  window.licCloseAddDevice = function() {
    const m = document.getElementById('licAddDeviceModal');
    if (m) m.style.display = 'none';
  };

  window.licConfirmAddDevice = async function() {
    const err = document.getElementById('licAddError');
    const code = (document.getElementById('licAddDeviceCode').value || '').trim().toUpperCase();

    if (!code || code.length !== 6) {
      err.textContent = '❌ كود الجهاز 6 أحرف';
      err.style.color = '#dc3545';
      return;
    }

    err.textContent = '⏳ جاري الإضافة...';
    err.style.color = '#0d3b66';

    try {
      const cur = await licFetch(encodeURIComponent(_licAddTargetId));
      const devices = Array.isArray(cur.devices) ? cur.devices.slice() : [];
      const limit = tierDeviceLimit(cur.tier);

      if (devices.indexOf(code) !== -1) {
        err.textContent = '⚠️ هذا الجهاز موجود مسبقًا';
        err.style.color = '#f59e0b';
        return;
      }

      if (devices.length >= limit) {
        err.textContent = '⛔ وصلت للحد الأقصى (' + limit + ' أجهزة للباقة ' + (cur.tier || '?') + ')';
        err.style.color = '#dc3545';
        return;
      }

      devices.push(code);
      const rev = ((cur && cur.rev) || 1) + 1;

      await licPatch(encodeURIComponent(_licAddTargetId), {
        devices: devices,
        rev: rev,
        updatedAt: Date.now()
      });

      err.textContent = '✅ تمت الإضافة';
      err.style.color = '#198754';
      toast('✅ تم إضافة الجهاز بنجاح');
      setTimeout(function() { licCloseAddDevice(); licRefresh(); }, 800);
    } catch (e) {
      err.textContent = '❌ ' + e.message;
      err.style.color = '#dc3545';
    }
  };

  // ═══ نافذة "نقل الترخيص" (استبدال جهاز بآخر) ═══
  let _licTransferTargetId = null;
  let _licTransferOldCode = null;

  function ensureTransferModal() {
    let m = document.getElementById('licTransferModal');
    if (m) return m;
    m = document.createElement('div');
    m.id = 'licTransferModal';
    m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;padding:16px;';
    m.innerHTML = ''
      + '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;padding:20px;direction:rtl;">'
      + '  <h2 style="margin:0 0 14px;color:#0d3b66;font-size:1.1rem;">🔄 نقل الترخيص لجهاز جديد</h2>'
      + '  <div id="licTransferInfo" style="background:#f1f5f9;padding:12px;border-radius:8px;margin-bottom:14px;font-size:0.85rem;color:#334155;"></div>'
      + '  <label style="display:block;margin-bottom:6px;font-weight:700;color:#0d3b66;">كود الجهاز القديم:</label>'
      + '  <select id="licTransferOld" style="width:100%;padding:10px;border:2px solid #cbd5e1;border-radius:8px;margin-bottom:12px;font-family:monospace;"></select>'
      + '  <label style="display:block;margin-bottom:6px;font-weight:700;color:#0d3b66;">كود الجهاز الجديد (6 أحرف):</label>'
      + '  <input id="licTransferNew" type="text" maxlength="6" placeholder="ABCDEF" style="width:100%;padding:10px;border:2px solid #cbd5e1;border-radius:8px;font-family:monospace;text-transform:uppercase;margin-bottom:12px;box-sizing:border-box;">'
      + '  <label style="display:block;margin-bottom:6px;font-weight:700;color:#0d3b66;">فترة السماح للجهاز القديم:</label>'
      + '  <select id="licTransferGrace" style="width:100%;padding:10px;border:2px solid #cbd5e1;border-radius:8px;margin-bottom:12px;">'
      + '    <option value="0">إبطال فوري (الحجب الآن)</option>'
      + '    <option value="3600000">1 ساعة</option>'
      + '    <option value="86400000" selected>24 ساعة (افتراضي)</option>'
      + '    <option value="604800000">7 أيام</option>'
      + '  </select>'
      + '  <div id="licTransferError" style="min-height:20px;color:#dc2626;margin-bottom:10px;font-size:0.85rem;"></div>'
      + '  <button onclick="licConfirmTransfer()" style="width:100%;padding:12px;background:linear-gradient(135deg,#0d3b66,#1e6091);color:#fff;border:none;border-radius:10px;font-weight:800;cursor:pointer;margin-bottom:8px;">✅ تأكيد النقل</button>'
      + '  <button onclick="licCloseTransfer()" style="width:100%;padding:10px;background:#e2e8f0;color:#334155;border:none;border-radius:10px;font-weight:600;cursor:pointer;">إلغاء</button>'
      + '</div>';
    document.body.appendChild(m);
    return m;
  }

  window.licOpenTransfer = function(licenseId) {
    _licTransferTargetId = licenseId;
    const m = ensureTransferModal();
    document.getElementById('licTransferNew').value = '';
    document.getElementById('licTransferError').textContent = '';
    m.style.display = 'flex';
    (async function() {
      try {
        const cur = await licFetch(encodeURIComponent(licenseId));
        const devices = Array.isArray(cur.devices) ? cur.devices : [];
        const sel = document.getElementById('licTransferOld');
        sel.innerHTML = devices.map(d => '<option value="' + d + '">' + d + '</option>').join('');
        document.getElementById('licTransferInfo').innerHTML =
          '<strong>' + (cur.customer || 'بدون اسم') + '</strong> — الباقة: ' + (cur.tier || '?') + '<br>'
          + 'الأجهزة الحالية: ' + (devices.length ? devices.join(', ') : '—');
      } catch (e) {
        document.getElementById('licTransferInfo').textContent = '⚠️ ' + e.message;
      }
    })();
  };

  window.licCloseTransfer = function() {
    const m = document.getElementById('licTransferModal');
    if (m) m.style.display = 'none';
  };

  window.licConfirmTransfer = async function() {
    const err = document.getElementById('licTransferError');
    const oldCode = document.getElementById('licTransferOld').value;
    const newCode = (document.getElementById('licTransferNew').value || '').trim().toUpperCase();
    if (!newCode || newCode.length !== 6) {
      err.textContent = '❌ كود الجهاز الجديد 6 أحرف';
      return;
    }
    err.textContent = '⏳ جاري النقل...';
    err.style.color = '#0d3b66';
    try {
      const cur = await licFetch(encodeURIComponent(_licTransferTargetId));
      let devices = Array.isArray(cur.devices) ? cur.devices.slice() : [];
      const idx = devices.indexOf(oldCode);
      if (idx === -1) {
        err.textContent = '❌ الجهاز القديم غير موجود';
        err.style.color = '#dc3545';
        return;
      }
      if (devices.indexOf(newCode) !== -1) {
        err.textContent = '⚠️ الجهاز الجديد موجود مسبقًا';
        err.style.color = '#f59e0b';
        return;
      }
      devices[idx] = newCode; // استبدال
      const graceMs = parseInt(document.getElementById('licTransferGrace').value, 10) || 0;
      const graceUntil = graceMs > 0 ? Date.now() + graceMs : 0;
      const rev = ((cur && cur.rev) || 1) + 1;
      await licPatch(encodeURIComponent(_licTransferTargetId), {
        devices: devices,
        revokedDevices: Object.assign({}, cur.revokedDevices || {}, graceUntil > 0 ? { [oldCode]: graceUntil } : {}),
        rev: rev,
        updatedAt: Date.now()
      });
      err.textContent = '✅ تم النقل بنجاح';
      err.style.color = '#198754';
      setTimeout(function() { licCloseTransfer(); licRefresh(); }, 800);
    } catch (e) {
      err.textContent = '❌ ' + e.message;
      err.style.color = '#dc3545';
    }
  };

  // ═══ نافذة "استبدال جميع الأجهزة" (نقل كامل) ═══
  let _licReplaceTargetId = null;

  function ensureReplaceModal() {
    let m = document.getElementById('licReplaceModal');
    if (m) return m;
    m = document.createElement('div');
    m.id = 'licReplaceModal';
    m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;padding:16px;';
    m.innerHTML = ''
      + '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;padding:20px;direction:rtl;">'
      + '  <h2 style="margin:0 0 14px;color:#991b1b;font-size:1.1rem;">⚠️ استبدال جميع الأجهزة</h2>'
      + '  <div style="background:#fef3c7;padding:12px;border-radius:8px;margin-bottom:14px;font-size:0.85rem;color:#92400e;">'
      + '    سيتم <strong>حذف جميع الأجهزة القديمة</strong> واستبدالها بالجهاز الجديد. هذا الإجراء لا يمكن التراجع عنه.'
      + '  </div>'
      + '  <div id="licReplaceInfo" style="background:#f1f5f9;padding:12px;border-radius:8px;margin-bottom:14px;font-size:0.85rem;color:#334155;"></div>'
      + '  <label style="display:block;margin-bottom:6px;font-weight:700;color:#0d3b66;">كود الجهاز الجديد (6 أحرف):</label>'
      + '  <input id="licReplaceNew" type="text" maxlength="6" placeholder="ABCDEF" style="width:100%;padding:10px;border:2px solid #cbd5e1;border-radius:8px;font-family:monospace;text-transform:uppercase;margin-bottom:12px;box-sizing:border-box;">'
      + '  <div id="licReplaceError" style="min-height:20px;color:#dc2626;margin-bottom:10px;font-size:0.85rem;"></div>'
      + '  <button onclick="licConfirmReplace()" style="width:100%;padding:12px;background:linear-gradient(135deg,#dc2626,#991b1b);color:#fff;border:none;border-radius:10px;font-weight:800;cursor:pointer;margin-bottom:8px;">⚠️ تأكيد الاستبدال الكامل</button>'
      + '  <button onclick="licCloseReplace()" style="width:100%;padding:10px;background:#e2e8f0;color:#334155;border:none;border-radius:10px;font-weight:600;cursor:pointer;">إلغاء</button>'
      + '</div>';
    document.body.appendChild(m);
    return m;
  }

  window.licOpenReplace = function(licenseId) {
    _licReplaceTargetId = licenseId;
    const m = ensureReplaceModal();
    document.getElementById('licReplaceNew').value = '';
    document.getElementById('licReplaceError').textContent = '';
    m.style.display = 'flex';
    (async function() {
      try {
        const cur = await licFetch(encodeURIComponent(licenseId));
        const devices = Array.isArray(cur.devices) ? cur.devices : [];
        document.getElementById('licReplaceInfo').innerHTML =
          '<strong>' + (cur.customer || 'بدون اسم') + '</strong> — الباقة: ' + (cur.tier || '?') + '<br>'
          + 'الأجهزة الحالية: ' + (devices.length ? devices.join(', ') : '—');
      } catch (e) {
        document.getElementById('licReplaceInfo').textContent = '⚠️ ' + e.message;
      }
    })();
  };

  window.licCloseReplace = function() {
    const m = document.getElementById('licReplaceModal');
    if (m) m.style.display = 'none';
  };

  window.licConfirmReplace = async function() {
    const err = document.getElementById('licReplaceError');
    const newCode = (document.getElementById('licReplaceNew').value || '').trim().toUpperCase();
    if (!newCode || newCode.length !== 6) {
      err.textContent = '❌ كود الجهاز الجديد 6 أحرف';
      return;
    }
    if (!confirm('هل أنت متأكد؟ سيتم حذف جميع الأجهزة القديمة.')) return;
    err.textContent = '⏳ جاري الاستبدال...';
    err.style.color = '#0d3b66';
    try {
      const cur = await licFetch(encodeURIComponent(_licReplaceTargetId));
      const rev = ((cur && cur.rev) || 1) + 1;
      await licPatch(encodeURIComponent(_licReplaceTargetId), {
        devices: [newCode],
        rev: rev,
        updatedAt: Date.now()
      });
      err.textContent = '✅ تم الاستبدال بنجاح';
      err.style.color = '#198754';
      setTimeout(function() { licCloseReplace(); licRefresh(); }, 800);
    } catch (e) {
      err.textContent = '❌ ' + e.message;
      err.style.color = '#dc3545';
    }
  };

  // ═══ نقل + إصدار مفتاح جديد (مع الاحتفاظ بنفس expires) ═══
  window.licTransferWithNewKey = async function(licenseId) {
    // نفتح نافذة النقل الجزئي لكن مع خيار إصدار مفتاح جديد
    _licTransferTargetId = licenseId;
    const m = ensureTransferModal();
    document.getElementById('licTransferNew').value = '';
    document.getElementById('licTransferError').textContent = '';
    // تغيير نص الزر ليعكس أننا سنصدر مفتاحًا جديدًا
    const btn = m.querySelector('button[onclick="licConfirmTransfer()"]');
    if (btn) { btn.textContent = '🔑 نقل + إصدار مفتاح جديد'; btn.setAttribute('onclick', 'licConfirmTransferWithNewKey()'); }
    m.style.display = 'flex';
    (async function() {
      try {
        const cur = await licFetch(encodeURIComponent(licenseId));
        const devices = Array.isArray(cur.devices) ? cur.devices : [];
        const sel = document.getElementById('licTransferOld');
        sel.innerHTML = devices.map(d => '<option value="' + d + '">' + d + '</option>').join('');
        document.getElementById('licTransferInfo').innerHTML =
          '<strong>' + (cur.customer || 'بدون اسم') + '</strong> — الباقة: ' + (cur.tier || '?') + '<br>'
          + 'الأجهزة الحالية: ' + (devices.length ? devices.join(', ') : '—') + '<br>'
          + '<span style="color:#059669;font-size:0.8rem;">سيتم إصدار مفتاح جديد بنفس تاريخ الانتهاء</span>';
      } catch (e) {
        document.getElementById('licTransferInfo').textContent = '⚠️ ' + e.message;
      }
    })();
  };

  window.licConfirmTransferWithNewKey = async function() {
    const err = document.getElementById('licTransferError');
    const oldCode = document.getElementById('licTransferOld').value;
    const newCode = (document.getElementById('licTransferNew').value || '').trim().toUpperCase();
    const graceMs = parseInt(document.getElementById('licTransferGrace').value, 10) || 0;
    
    if (!newCode || newCode.length !== 6) {
      err.textContent = '❌ كود الجهاز الجديد 6 أحرف';
      return;
    }
    
    err.textContent = '⏳ جاري النقل وإصدار المفتاح...';
    err.style.color = '#0d3b66';
    
    try {
      // 1. جلب البيانات الحالية
      const cur = await licFetch(encodeURIComponent(_licTransferTargetId));
      let devices = Array.isArray(cur.devices) ? cur.devices.slice() : [];
      const idx = devices.indexOf(oldCode);
      if (idx === -1) {
        err.textContent = '❌ الجهاز القديم غير موجود';
        err.style.color = '#dc3545';
        return;
      }
      if (devices.indexOf(newCode) !== -1) {
        err.textContent = '⚠️ الجهاز الجديد موجود مسبقًا';
        err.style.color = '#f59e0b';
        return;
      }
      
      // 2. استبدال الجهاز
      devices[idx] = newCode;
      const graceUntil = graceMs > 0 ? Date.now() + graceMs : 0;
      const rev = ((cur && cur.rev) || 1) + 1;
      
      // 3. تحديث Firebase
      await licPatch(encodeURIComponent(_licTransferTargetId), {
        devices: devices,
        revokedDevices: Object.assign({}, cur.revokedDevices || {}, graceUntil > 0 ? { [oldCode]: graceUntil } : {}),
        rev: rev,
        updatedAt: Date.now()
      });
      
      // 4. إصدار مفتاح جديد بنفس expires
      if (!window.KodNaqiSigning || !window.KodNaqiSigning.hasKey()) {
        err.textContent = '⚠️ تم النقل لكن لا يوجد مفتاح خاص لإصدار ترخيص جديد';
        err.style.color = '#f59e0b';
        setTimeout(function() { licCloseTransfer(); licRefresh(); }, 1500);
        return;
      }
      
      const daysLeft = cur.expires ? Math.ceil((cur.expires - Date.now()) / 86400000) : 365;
      const result = await window.KodNaqiSigning.generate({
        tier: cur.tier || 'B',
        customer: cur.customer || '',
        devices: devices,
        days: daysLeft
      });
      
      // 5. عرض المفتاح الجديد
      err.innerHTML = '✅ تم النقل وإصدار مفتاح جديد<br>'
        + '<textarea readonly style="width:100%;height:80px;margin-top:8px;padding:8px;border:1px solid #059669;border-radius:6px;font-family:monospace;font-size:0.75rem;" onclick="this.select()">' + result.license + '</textarea>';
      err.style.color = '#059669';
      
      // 6. نسخ تلقائي
      try {
        await navigator.clipboard.writeText(result.license);
        err.innerHTML += '<div style="font-size:0.8rem;margin-top:4px;">📋 تم نسخ المفتاح تلقائيًا</div>';
      } catch(e) {}
      
    } catch (e) {
      err.textContent = '❌ ' + e.message;
      err.style.color = '#dc3545';
    }
  };

  // ═══ مسح جميع التراخيص ═══
  window.licClearAll = async function() {
    if (!confirm('⚠️ تحذير خطير!\n\nسيتم مسح جميع التراخيص نهائيًا من Firebase.\nلا يمكن التراجع عن هذا الإجراء.\n\nهل أنت متأكد؟')) return;
    if (!confirm('تأكيد أخير: هل تريد فعلًا مسح كل التراخيص؟')) return;
    
    try {
      const secret = getSecret();
      if (!secret) {
        alert('❌ يجب تسجيل الدخول بالـ Secret أولاً');
        return;
      }
      const cfg = window.KODNAQI_FIREBASE;
      const url = cfg.url + '/' + cfg.licensesPath + '.json?auth=' + encodeURIComponent(secret);
      
      const r = await fetch(url, { method: 'DELETE' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      
      alert('✅ تم مسح جميع التراخيص بنجاح');
      licRefresh();
    } catch (e) {
      alert('❌ فشل المسح: ' + e.message);
    }
  };

  // ═══ طباعة العقد ═══
  window.licPrintContract = async function(licenseId) {
    try {
      const cur = await licFetch(encodeURIComponent(licenseId));
      const contractData = {
        customer: cur.customer || '',
        phone: cur.phone || '',
        address: cur.address || '',
        tier: cur.tier || 'B',
        devices: cur.devices || [],
        expires: cur.expires || 0,
        issued: cur.issued || Date.now(),
        licenseId: licenseId
      };
      localStorage.setItem('kodnaqi_contract_data', JSON.stringify(contractData));
      window.open('contract.html', '_blank');
    } catch (e) {
      alert('❌ فشل تحضير العقد: ' + e.message);
    }
  };

  // ═══ زر "إضافة جهاز" يُدرج في بطاقة كل ترخيص ═══
  window.licAddDeviceButtonHTML = function(licenseId) {
    return '<div style="display:flex;gap:6px;flex-wrap:wrap;">'
      + '<button onclick="licOpenAddDevice(\'' + licenseId + '\')" style="padding:6px 12px;background:#0d3b66;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">➕ إضافة جهاز</button>'
      + '<button onclick="licOpenTransfer(\'' + licenseId + '\')" style="padding:6px 12px;background:#f59e0b;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">🔄 نقل جزئي</button>'
      + '<button onclick="licOpenReplace(\'' + licenseId + '\')" style="padding:6px 12px;background:#dc2626;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">⚠️ نقل كامل</button>'
      + '<button onclick="licTransferWithNewKey(\'' + licenseId + '\')" style="padding:6px 12px;background:#059669;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">🔑 نقل + مفتاح جديد</button>'
      + '<button onclick="licPrintContract(\'' + licenseId + '\')" style="padding:6px 12px;background:#7c3aed;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">🖨️ طباعة العقد</button>'
      + '<button onclick="licPrintInvoice(\'' + licenseId + '\')" style="padding:6px 12px;background:#0891b2;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">🧾 فاتورة</button>'
      + '<button onclick="licSendWhatsApp(\'' + licenseId + '\')" style="padding:6px 12px;background:#25d366;color:#fff;border:none;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;">💬 واتساب</button>'
      + '</div>';
  };

  console.log('[License Dashboard] loaded');
})();

// ═══════════════════════════════════════════════════
// 📊 Dashboard — لوحة التحكم الشاملة
// ═══════════════════════════════════════════════════
async function loadDashboard() {
  try {
    const secret = getSecret();
    if (!secret) return;
    
    const cfg = window.KODNAQI_FIREBASE;
    const url = cfg.url + '/' + cfg.licensesPath + '.json?auth=' + encodeURIComponent(secret);
    const r = await fetch(url, { cache: 'no-store' });
    const data = await r.json();
    
    if (!data) {
      updateDashboardUI({ totalRevenue: 0, activeCustomers: 0, expiringSoon: 0, totalDevices: 0, recent: [], alerts: [] });
      return;
    }
    
    const licenses = Object.values(data);
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    let totalRevenue = 0;
    let activeCustomers = 0;
    let expiringSoon = 0;
    let totalDevices = 0;
    
    const tierPrices = { B: 1500000, S: 2500000, A: 4000000, E: 4000000, TRIAL: 0 };
    
    licenses.forEach(lic => {
      if (lic.status === 'active') {
        activeCustomers++;
        totalRevenue += tierPrices[lic.tier] || 0;
        if (lic.expires && (lic.expires - now) < thirtyDays && (lic.expires - now) > 0) {
          expiringSoon++;
        }
        if (lic.devices) {
          totalDevices += lic.devices.length;
        }
      }
    });
    
    const recent = licenses
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, 5);
    
    const alerts = licenses
      .filter(lic => lic.status === 'active' && lic.expires && (lic.expires - now) < thirtyDays && (lic.expires - now) > 0)
      .sort((a, b) => a.expires - b.expires);
    
    updateDashboardUI({ totalRevenue, activeCustomers, expiringSoon, totalDevices, recent, alerts });
    
  } catch (e) {
    console.error('Dashboard error:', e);
  }
}

function updateDashboardUI(data) {
  // تحديث الإحصائيات
  const el = (id) => document.getElementById(id);
  if (el('dashTotalRevenue')) el('dashTotalRevenue').textContent = data.totalRevenue.toLocaleString();
  if (el('dashActiveCustomers')) el('dashActiveCustomers').textContent = data.activeCustomers;
  if (el('dashExpiringSoon')) el('dashExpiringSoon').textContent = data.expiringSoon;
  if (el('dashTotalDevices')) el('dashTotalDevices').textContent = data.totalDevices;
  
  // آخر التراخيص
  if (el('dashRecentLicenses')) {
    if (data.recent.length === 0) {
      el('dashRecentLicenses').innerHTML = '<p style="color:#64748b;text-align:center;">لا توجد بيانات</p>';
    } else {
      el('dashRecentLicenses').innerHTML = data.recent.map(lic => `
        <div style="padding:12px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-weight:700;color:#0d3b66;">${lic.customer || 'بدون اسم'}</div>
            <div style="font-size:0.8rem;color:#64748b;">${lic.tier || '?'}</div>
          </div>
          <div style="text-align:left;">
            <div style="font-size:0.8rem;color:${lic.expires > Date.now() ? '#059669' : '#dc2626'};">
              ${lic.expires ? Math.ceil((lic.expires - Date.now()) / 86400000) + ' يوم' : '—'}
            </div>
          </div>
        </div>
      `).join('');
    }
  }
  
  // تنبيهات التجديد
  if (el('dashRenewalAlerts')) {
    if (data.alerts.length === 0) {
      el('dashRenewalAlerts').innerHTML = '<p style="color:#059669;text-align:center;">✅ لا توجد تراخيص تنتهي قريباً</p>';
    } else {
      el('dashRenewalAlerts').innerHTML = data.alerts.map(lic => `
        <div style="padding:12px;border-bottom:1px solid #e2e8f0;background:#fef3c7;border-radius:8px;margin-bottom:8px;">
          <div style="font-weight:700;color:#92400e;">${lic.customer || 'بدون اسم'}</div>
          <div style="font-size:0.8rem;color:#b45309;">
            ينتهي خلال ${Math.ceil((lic.expires - Date.now()) / 86400000)} يوم
          </div>
          <button onclick="licSendWhatsApp('${lic.id}')" style="margin-top:8px;padding:6px 12px;background:#25d366;color:white;border:none;border-radius:6px;font-size:0.8rem;cursor:pointer;">
            💬 تذكير واتساب
          </button>
        </div>
      `).join('');
    }
  }
}

// تصدير للاستخدام
window.loadDashboard = loadDashboard;
console.log('[Dashboard] Module loaded');
