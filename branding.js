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
    slogan: 'ACCURATE • RELIABLE • FAST',
    slogan: 'ACCURATE • RELIABLE • FAST',
    logoData: null,
    stampData: null,
    techSignatureData: null,
    doctorSignatureData: null,
    address: 'الخرطوم - السودان',         // Data URL للشعار
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
    
    // الشعار التسويقي
    document.querySelectorAll('[data-brand="slogan"]').forEach(el => {
      if (b.slogan && b.slogan.trim()) {
        el.textContent = b.slogan;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // العنوان
    document.querySelectorAll('[data-brand="address"]').forEach(el => {
      el.textContent = b.address || 'الخرطوم - السودان';
    });

    // البريد
    document.querySelectorAll('[data-brand="email"]').forEach(el => {
      el.textContent = b.email || 'kodnaqi@gmail.com';
      if (el.tagName === 'A') el.href = 'mailto:' + (b.email || 'kodnaqi@gmail.com');
    });

    // الختم — مخفي إن لم يوجد
    document.querySelectorAll('[data-brand="stamp"]').forEach(el => {
      if (b.stampData) {
        el.src = b.stampData;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // توقيع الفني
    document.querySelectorAll('[data-brand="tech-signature"]').forEach(el => {
      if (b.techSignatureData) {
        el.src = b.techSignatureData;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // توقيع المدير
    document.querySelectorAll('[data-brand="doctor-signature"]').forEach(el => {
      if (b.doctorSignatureData) {
        el.src = b.doctorSignatureData;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
    
    // الشعار التسويقي
    document.querySelectorAll('[data-brand="slogan"]').forEach(el => {
      if (b.slogan && b.slogan.trim()) {
        el.textContent = b.slogan;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // العنوان
    document.querySelectorAll('[data-brand="address"]').forEach(el => {
      el.textContent = b.address || 'الخرطوم - السودان';
    });

    // البريد
    document.querySelectorAll('[data-brand="email"]').forEach(el => {
      el.textContent = b.email || 'kodnaqi@gmail.com';
      if (el.tagName === 'A') el.href = 'mailto:' + (b.email || 'kodnaqi@gmail.com');
    });

    // الختم — مخفي إن لم يوجد
    document.querySelectorAll('[data-brand="stamp"]').forEach(el => {
      if (b.stampData) {
        el.src = b.stampData;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // توقيع الفني
    document.querySelectorAll('[data-brand="tech-signature"]').forEach(el => {
      if (b.techSignatureData) {
        el.src = b.techSignatureData;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // توقيع المدير
    document.querySelectorAll('[data-brand="doctor-signature"]').forEach(el => {
      if (b.doctorSignatureData) {
        el.src = b.doctorSignatureData;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
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
      display: flex; align-items: flex-start; justify-content: center;
      padding: 20px 15px; overflow-y: auto; font-family: 'Cairo', sans-serif;
      -webkit-overflow-scrolling: touch;
    `;

    modal.innerHTML = `
      <div style="background: white; border-radius: 20px; padding: 30px 22px 45px; max-width: 480px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.4); margin: 20px auto;">
        <div style="text-align: center; margin-bottom: 25px;">
          <img src="./logo.png" style="width: 90px; height: 90px; object-fit: contain; border: 3px solid #c9a227; border-radius: 12px; padding: 4px; background: white; display: block; margin: 0 auto;" alt="Logo">
          <h2 style="color: #0d3b66; font-weight: 900; margin: 15px 0 5px;">مرحبًا بك</h2>
          <p style="color: #666; font-size: 0.9rem;">أدخل بيانات معملك لتفعيل التطبيق</p>
        </div>

        <!-- كود الجهاز -->
        <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
          <div style="font-weight: 800; color: #7c2d12; margin-bottom: 8px; font-size: 0.9rem;">
            📱 كود هذا الجهاز:
          </div>
          <div id="kn-device-code" style="background: white; border-radius: 8px; padding: 12px; text-align: center; font-family: monospace; font-size: 1.4rem; font-weight: 800; color: #0d3b66; letter-spacing: 3px; margin-bottom: 10px;">
            ⏳ جاري الحساب...
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button type="button" id="kn-copy-devcode" style="padding: 8px; background: #0d3b66; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.85rem;">
              📋 نسخ
            </button>
            <button type="button" id="kn-send-devcode" style="padding: 8px; background: #25D366; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.85rem;">
              💬 واتساب
            </button>
          </div>
          <div style="font-size: 0.75rem; color: #7c2d12; margin-top: 10px; line-height: 1.7; padding: 0 5px; word-wrap: break-word;">
            أرسل هذا الكود للدعم على واتساب<br>
            لتحصل على مفتاح الترخيص الخاص بمعملك
          </div>
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

        <div style="margin-bottom: 15px;">
          <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px;">💬 شعار تسويقي (اختياري)</label>
          <input type="text" id="kn-wiz-slogan" placeholder="مثال: ACCURATE • RELIABLE • FAST" maxlength="60"
                 style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem;">
          <div style="font-size: 0.75rem; color: #666; margin-top: 4px;">سطر صغير يظهر تحت اسم معملك</div>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px;">📍 العنوان (اختياري)</label>
          <input type="text" id="kn-wiz-address" placeholder="مثال: الخرطوم - السودان" maxlength="80"
                 style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem;">
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px;">📧 البريد الإلكتروني (اختياري)</label>
          <input type="email" id="kn-wiz-email" placeholder="lab@example.com" maxlength="60" dir="ltr"
                 style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem;">
        </div>

        <!-- قسم المزيد (قابل للطي) -->
        <div style="background: #f8fafc; border-radius: 10px; padding: 12px; margin-bottom: 15px;">
          <button type="button" id="kn-more-toggle" 
                  style="width: 100%; background: transparent; border: none; text-align: right; color: #0d3b66; font-weight: 700; cursor: pointer; padding: 5px; font-size: 0.9rem;">
            ▼ خيارات متقدمة (ختم + توقيعات)
          </button>
          
          <div id="kn-more-options" style="display: none; margin-top: 12px;">
            <p style="font-size: 0.8rem; color: #666; margin-bottom: 12px;">
              🎨 ارفع صور الختم والتوقيعات لتظهر في تقاريرك (اختياري)
            </p>

            <div style="margin-bottom: 12px;">
              <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px; font-size: 0.85rem;">🔖 ختم المعمل</label>
              <input type="file" id="kn-wiz-stamp" accept="image/*"
                     style="width: 100%; padding: 8px; border: 2px dashed #c9a227; border-radius: 8px; background: white; font-size: 0.85rem;">
              <div id="kn-stamp-preview" style="text-align: center; margin-top: 6px;"></div>
            </div>

            <div style="margin-bottom: 12px;">
              <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px; font-size: 0.85rem;">✍️ توقيع الفني/المختص</label>
              <input type="file" id="kn-wiz-tech" accept="image/*"
                     style="width: 100%; padding: 8px; border: 2px dashed #c9a227; border-radius: 8px; background: white; font-size: 0.85rem;">
              <div id="kn-tech-preview" style="text-align: center; margin-top: 6px;"></div>
            </div>

            <div style="margin-bottom: 8px;">
              <label style="font-weight: 700; color: #0d3b66; display: block; margin-bottom: 6px; font-size: 0.85rem;">✍️ توقيع المدير/الطبيب</label>
              <input type="file" id="kn-wiz-doctor" accept="image/*"
                     style="width: 100%; padding: 8px; border: 2px dashed #c9a227; border-radius: 8px; background: white; font-size: 0.85rem;">
              <div id="kn-doctor-preview" style="text-align: center; margin-top: 6px;"></div>
            </div>
          </div>
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

    // ═══ كود الجهاز ═══
    (async function() {
      try {
        const codeEl = document.getElementById('kn-device-code');
        const copyBtn = document.getElementById('kn-copy-devcode');
        const waBtn = document.getElementById('kn-send-devcode');
        if (!codeEl) return;
        
        let deviceCode = 'XXXXXX';
        try {
          if (window.KodNaqiLicense && window.KodNaqiLicense.getMyDeviceCode) {
            deviceCode = await window.KodNaqiLicense.getMyDeviceCode();
          }
        } catch (e) {
          console.warn('Device code error:', e);
        }
        
        const formatted = deviceCode.slice(0, 3) + '-' + deviceCode.slice(3);
        codeEl.textContent = formatted;
        
        if (copyBtn) {
          copyBtn.onclick = function() {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(deviceCode).then(function() {
                copyBtn.textContent = '✅ تم';
                setTimeout(function() { copyBtn.textContent = '📋 نسخ'; }, 2000);
              }).catch(function() {
                prompt('انسخ الكود يدويًا:', deviceCode);
              });
            } else {
              prompt('انسخ الكود يدويًا:', deviceCode);
            }
          };
        }
        
        if (waBtn) {
          waBtn.onclick = function() {
            const msg = encodeURIComponent(
              '🔑 طلب ترخيص KodNaqi\n\n' +
              'كود الجهاز: ' + deviceCode + '\n\n' +
              'الرجاء إرسال مفتاح الترخيص.'
            );
            window.open('https://wa.me/249111729111?text=' + msg, '_blank');
          };
        }
      } catch (err) {
        console.error('Device code setup error:', err);
      }
    })();

    // ═══ خيارات متقدمة — التبديل ═══
    const moreToggle = document.getElementById('kn-more-toggle');
    const moreOptions = document.getElementById('kn-more-options');
    if (moreToggle && moreOptions) {
      moreToggle.onclick = function() {
        const isHidden = moreOptions.style.display === 'none';
        moreOptions.style.display = isHidden ? 'block' : 'none';
        moreToggle.textContent = isHidden 
          ? '▲ إخفاء الخيارات المتقدمة'
          : '▼ خيارات متقدمة (ختم + توقيعات)';
      };
    }

    // ═══ متغيرات الصور ═══
    let logoData = null;
    let stampData = null;
    let techSignatureData = null;
    let doctorSignatureData = null;

    // ═══ ربط حقل الختم ═══
    const stampInput = document.getElementById('kn-wiz-stamp');
    if (stampInput) {
      stampInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
          stampData = ev.target.result;
          document.getElementById('kn-stamp-preview').innerHTML =
            '<img src="' + stampData + '" style="max-width: 70px; border-radius: 8px; border: 2px solid #c9a227; padding: 2px;">';
        };
        reader.readAsDataURL(file);
      });
    }

    // ═══ ربط حقل توقيع الفني ═══
    const techInput = document.getElementById('kn-wiz-tech');
    if (techInput) {
      techInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
          techSignatureData = ev.target.result;
          document.getElementById('kn-tech-preview').innerHTML =
            '<img src="' + techSignatureData + '" style="max-width: 70px; background: white; border-radius: 8px; padding: 2px; border: 1px solid #ddd;">';
        };
        reader.readAsDataURL(file);
      });
    }

    // ═══ ربط حقل توقيع المدير ═══
    const doctorInput = document.getElementById('kn-wiz-doctor');
    if (doctorInput) {
      doctorInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
          doctorSignatureData = ev.target.result;
          document.getElementById('kn-doctor-preview').innerHTML =
            '<img src="' + doctorSignatureData + '" style="max-width: 70px; background: white; border-radius: 8px; padding: 2px; border: 1px solid #ddd;">';
        };
        reader.readAsDataURL(file);
      });
    }

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

    document.getElementById('kn-wiz-submit').addEventListener('click', async function() {
      const key = document.getElementById('kn-wiz-key').value.trim();
      const name = document.getElementById('kn-wiz-name').value.trim();
      const phone = document.getElementById('kn-wiz-phone').value.trim();
      const sloganEl = document.getElementById('kn-wiz-slogan');
      const slogan = sloganEl ? sloganEl.value.trim() : '';
      const addressEl = document.getElementById('kn-wiz-address');
      const address = addressEl ? addressEl.value.trim() : '';
      const emailEl = document.getElementById('kn-wiz-email');
      const email = emailEl ? emailEl.value.trim() : '';

      // التحقق من المفتاح
      if (!window.KodNaqiLicense) {
        alert('⚠️ خطأ في التحميل، أعد فتح التطبيق');
        return;
      }

      const check = await window.KodNaqiLicense.verify(key);
      if (!check.valid) {
        let msg = '❌ مفتاح الترخيص غير صحيح';
        if (check.reason === 'wrong_device') {
          msg = '⚠️ هذا المفتاح مُصدَر لجهاز آخر\n\n' +
                'المفتاح يخص: ' + (check.expected || '—') + '\n' +
                'جهازك الحالي: ' + (check.actual || '—') + '\n\n' +
                'أرسل كود جهازك للدعم.';
        } else if (check.reason === 'signature') {
          msg = '❌ المفتاح غير أصلي';
        } else if (check.reason === 'format') {
          msg = '❌ صيغة المفتاح غير صحيحة';
        } else {
          msg += '\n\nتأكد من إدخاله كاملًا';
        }
        alert(msg);
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
        email: email || DEFAULT_BRAND.email,
        address: address || DEFAULT_BRAND.address,
        slogan: slogan,
        stampData: stampData,
        techSignatureData: techSignatureData,
        doctorSignatureData: doctorSignatureData,
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
