/*!
 * KodNaqi PWA — نظام الهوية الديناميكية (White Label)
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 * All Rights Reserved.
 */

(function() {
  'use strict';

  const BRAND_KEY = 'kodnaqi_brand';

  const DEFAULT_BRAND = {
    labName: 'KodNaqi Diagnostics',
    labNameShort: 'KodNaqi',
    logoData: null,         // Data URL للشعار
    primaryColor: '#0d3b66',
    accentColor: '#c9a227',
    phone: '+249 111 729 111',
    email: 'kodnaqi@gmail.com',
    isConfigured: false
  };

  function getBrand() {
    const raw = localStorage.getItem(BRAND_KEY);
    if (!raw) return { ...DEFAULT_BRAND };
    try {
      return { ...DEFAULT_BRAND, ...JSON.parse(raw) };
    } catch (e) {
      return { ...DEFAULT_BRAND };
    }
  }

  function saveBrand(brand) {
    localStorage.setItem(BRAND_KEY, JSON.stringify(brand));
    applyBrand();
  }

  function applyBrand() {
    // معالجة ?dev=1 / ?dev=0
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('dev') === '1') {
        localStorage.setItem('kodnaqi_dev_mode', 'true');
        console.log('🧑‍💻 Developer mode ENABLED');
      } else if (params.get('dev') === '0') {
        localStorage.removeItem('kodnaqi_dev_mode');
        console.log('👤 Developer mode DISABLED');
      }
    } catch (e) {}
    const b = getBrand();

    // تغيير الاسم في كل مكان
    document.querySelectorAll('[data-brand="name"]').forEach(el => {
      el.textContent = b.labName;
    });
    document.querySelectorAll('[data-brand="name-short"]').forEach(el => {
      el.textContent = b.labNameShort;
    });
    document.querySelectorAll('[data-brand="phone"]').forEach(el => {
      el.textContent = b.phone;
    });
    document.querySelectorAll('[data-brand="email"]').forEach(el => {
      el.textContent = b.email;
    });

    // تغيير الشعار
    document.querySelectorAll('[data-brand="logo"]').forEach(el => {
      if (b.logoData) {
        el.src = b.logoData;
      }
    });

    // تغيير الألوان
    document.documentElement.style.setProperty('--kn-navy', b.primaryColor);
    document.documentElement.style.setProperty('--kn-gold', b.accentColor);

    // تحديث meta theme-color
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = b.primaryColor;

    // تحديث عنوان الصفحة
    document.title = b.labName;
  }

  // ============ شاشة الإعداد الأولى ============
  function showSetupWizard() {
    const b = getBrand();

    const modal = document.createElement('div');
    modal.id = 'kn-setup-wizard';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: linear-gradient(135deg, #0d3b66 0%, #1e6091 100%);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; overflow-y: auto; font-family: 'Cairo', sans-serif;
    `;

    modal.innerHTML = `
      <div style="background: white; border-radius: 20px; padding: 35px 25px; max-width: 480px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
        <div style="text-align: center; margin-bottom: 25px;">
          <img src="./logo.png" style="width: 75px; border-radius: 50%; border: 3px solid #c9a227; padding: 4px; background: white;" alt="Logo">
          <h2 style="color: #0d3b66; font-weight: 900; margin: 15px 0 5px;">مرحبًا بك</h2>
          <p style="color: #666; font-size: 0.9rem;">أدخل بيانات معملك لتفعيل التطبيق</p>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px;">🔑 مفتاح الترخيص</label>
          <input type="text" id="kn-wiz-key" placeholder="KOD-F-XXXX-XXXX-XXXX"
                 style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: monospace; font-size: 1rem; text-align: center; letter-spacing: 1px;">
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px;">🏥 اسم المعمل</label>
          <input type="text" id="kn-wiz-name" placeholder="مثال: معمل النور الطبي"
                 style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;">
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px;">📱 رقم الهاتف (اختياري)</label>
          <input type="tel" id="kn-wiz-phone" placeholder="+249 ..."
                 style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem; direction: ltr;">
        </div>

        <div style="margin-bottom: 20px;">
          <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px;">🎨 شعار المعمل (اختياري)</label>
          <input type="file" id="kn-wiz-logo" accept="image/*"
                 style="width: 100%; padding: 10px; border: 2px dashed #c9a227; border-radius: 8px; background: #fdfcf7;">
          <div id="kn-wiz-preview" style="text-align: center; margin-top: 10px;"></div>
        </div>

        <button id="kn-wiz-submit" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #0d3b66, #1e6091); color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 800; cursor: pointer;">
          ✅ تفعيل التطبيق
        </button>

        <p style="text-align: center; color: #999; font-size: 0.75rem; margin-top: 15px;">
          جميع البيانات تُحفظ على جهازك فقط
        </p>
      </div>
    `;

    document.body.appendChild(modal);

    // ربط الأحداث
    let logoData = null;

    document.getElementById('kn-wiz-logo').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(ev) {
        logoData = ev.target.result;
        document.getElementById('kn-wiz-preview').innerHTML =
          '<img src="' + logoData + '" style="max-width: 80px; border-radius: 50%; border: 2px solid #c9a227; padding: 3px;">';
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('kn-wiz-submit').addEventListener('click', function() {
      const key = document.getElementById('kn-wiz-key').value.trim();
      const name = document.getElementById('kn-wiz-name').value.trim();
      const phone = document.getElementById('kn-wiz-phone').value.trim();

      // التحقق من المفتاح
      if (!window.KodNaqiLicense) {
        alert('⚠️ خطأ في التحميل، أعد فتح التطبيق');
        return;
      }

      const check = window.KodNaqiLicense.verify(key);
      if (!check.valid) {
        alert('❌ مفتاح الترخيص غير صحيح\n\nتأكد من إدخاله كاملًا بالشكل:\nKOD-F-XXXX-XXXX-XXXX');
        return;
      }

      if (!name) {
        alert('⚠️ الرجاء إدخال اسم المعمل');
        return;
      }

      // حفظ الترخيص
      window.KodNaqiLicense.activate(key);

      // حفظ الهوية
      const newBrand = {
        labName: name,
        labNameShort: name.split(' ')[0] || 'Lab',
        logoData: logoData,
        phone: phone || DEFAULT_BRAND.phone,
        email: DEFAULT_BRAND.email,
        primaryColor: DEFAULT_BRAND.primaryColor,
        accentColor: DEFAULT_BRAND.accentColor,
        isConfigured: true,
        configuredAt: Date.now()
      };

      saveBrand(newBrand);
      modal.remove();

      setTimeout(() => location.reload(), 500);
    });
  }

  // ============ إعادة تخصيص الهوية (من الإعدادات) ============
  function showBrandingSettings() {
    // يمكن إعادة استعمال نفس المعالج
    showSetupWizard();
  }

  // ============ API عام ============
  window.KodNaqiBrand = {
    get: getBrand,
    save: saveBrand,
    apply: applyBrand,
    showSetup: showSetupWizard,
    showSettings: showBrandingSettings
  };

  // ============ التشغيل التلقائي ============
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      applyBrand();

      // وضع المطوّر: تجاهل شاشة الترحيب
      if (localStorage.getItem('kodnaqi_dev_mode') === 'true') {
        return;
      }

      const b = getBrand();
      if (!b.isConfigured) {
        showSetupWizard();
      }
    }, 800);
  });

})();
