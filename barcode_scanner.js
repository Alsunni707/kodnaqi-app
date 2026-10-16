/*! KodNaqi — Barcode Scanner للبحث السريع */
(function() {
  'use strict';

  let barcodeScanner = null;
  
  // ═══════════════════════════════════════════════════
  // 📷 مسح الباركود
  // ═══════════════════════════════════════════════════
  
  async function startBarcodeScanner() {
    // التحقق من وجود الكاميرا
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('❌ الكاميرا غير مدعومة في هذا الجهاز');
      return;
    }
    
    // إضافة مكتبة html5-qrcode إذا لم تكن موجودة
    if (typeof Html5Qrcode === 'undefined') {
      await loadScript('https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js');
    }
    
    // إنشاء نافذة الماسح
    const overlay = document.createElement('div');
    overlay.id = 'barcodeScannerModal';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:99999;direction:rtl;';
    
    overlay.innerHTML = `
      <div style="background:white;border-radius:20px;padding:25px;max-width:500px;width:100%;text-align:center;box-shadow:0 25px 80px rgba(0,0,0,0.5);">
        <h3 style="margin:0 0 20px;color:#0d3b66;font-size:1.3rem;">📷 مسح باركود المريض</h3>
        
        <div id="barcodeReader" style="width:100%;border-radius:12px;overflow:hidden;background:#000;min-height:250px;"></div>
        
        <p style="color:#64748b;font-size:0.9rem;margin:15px 0;">وجّه الكاميرا نحو الباركود الخاص بالمريض</p>
        
        <div style="display:flex;gap:10px;">
          <button onclick="window.KodNaqiScanner.close()" style="flex:1;padding:14px;background:#e2e8f0;color:#64748b;border:none;border-radius:10px;cursor:pointer;font-size:1rem;font-weight:600;">
            ✕ إلغاء
          </button>
          <button onclick="window.KodNaqiScanner.switchCamera()" style="flex:1;padding:14px;background:#3b82f6;color:white;border:none;border-radius:10px;cursor:pointer;font-size:1rem;font-weight:600;">
            🔄 تبديل الكاميرا
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // بدء الماسح
    try {
      barcodeScanner = new Html5Qrcode("barcodeReader");
      await barcodeScanner.start(
        { facingMode: "environment" }, // الكاميرا الخلفية
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        onBarcodeDetected,
        onBarcodeError
      );
    } catch (err) {
      console.error('[Barcode] Error:', err);
      alert('❌ خطأ في تشغيل الكاميرا: ' + err.message);
      closeBarcodeScanner();
    }
  }
  
  function onBarcodeDetected(decodedText, decodedResult) {
    console.log('[Barcode] Detected:', decodedText);
    
    // إغلاق الماسح أولاً
    closeBarcodeScanner();
    
    // البحث بالباركود
    searchByBarcode(decodedText);
    
    // إظهار نتيجة نجاح
    showBarcodeSuccess(decodedText);
  }
  
  function onBarcodeError(error) {
    // أخطاء المسح الطبيعية — تجاهلها
    // console.log('[Barcode] Scan error:', error);
  }
  
  function closeBarcodeScanner() {
    if (barcodeScanner) {
      barcodeScanner.stop().then(() => {
        barcodeScanner.clear();
        barcodeScanner = null;
      }).catch(() => {});
    }
    
    const modal = document.getElementById('barcodeScannerModal');
    if (modal) modal.remove();
  }
  
  function switchCamera() {
    // إعادة تشغيل الماسح بالكاميرا الأخرى
    if (barcodeScanner) {
      barcodeScanner.stop().then(() => {
        barcodeScanner.clear();
        barcodeScanner = null;
        startBarcodeScanner();
      });
    }
  }
  
  // ═══════════════════════════════════════════════════
  // 🔍 البحث بالباركود
  // ═══════════════════════════════════════════════════
  
  function searchByBarcode(code) {
    // البحث في حقل البحث الرئيسي
    const searchInput = document.querySelector('input[type="search"], input[placeholder*="بحث"], input[placeholder*="اسم"], input[placeholder*="معيار"]');
    
    if (searchInput) {
      searchInput.value = code;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      searchInput.dispatchEvent(new Event('change', { bubbles: true }));
      
      // التركيز على الحقل
      searchInput.focus();
    }
    
    // إذا كان هناك دالة بحث مخصصة، استخدمها
    if (typeof window.searchPatients === 'function') {
      window.searchPatients(code);
    }
  }
  
  function showBarcodeSuccess(code) {
    // إظهار toast نجاح
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#10b981,#059669);color:white;padding:15px 30px;border-radius:30px;font-family:Cairo,sans-serif;z-index:99999;box-shadow:0 8px 25px rgba(0,0,0,0.3);direction:rtl;font-weight:700;font-size:1rem;';
    toast.innerHTML = `✅ تم العثور على المريض: ${code}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load script'));
      document.head.appendChild(script);
    });
  }

  // ═══════════════════════════════════════════════════
  // إضافة زر الماسح إلى الواجهة
  // ═══════════════════════════════════════════════════
  
  function addScannerButton() {
    // البحث عن حقل البحث في صفحة المرضى فقط (ليس في نموذج إضافة مريض)
    const searchInput = document.querySelector('input[placeholder*="بحث بالاسم"], input[placeholder*="الهاتف"], input[placeholder*="التسلسلي"]');
    if (!searchInput) {
      // إذا لم نجد حقل بحث، لا نضيف الزر (تجنب التداخل)
      console.log('[Barcode] Search input not found, skipping button');
      return;
    }
    
    // التحقق من أننا لسنا في نموذج إضافة مريض
    if (document.querySelector('#patientModal, #addPatientModal, [id*="patient"], [id*="addPatient"]')) {
      console.log('[Barcode] In patient form, skipping button');
      return;
    }
    
    const container = searchInput.parentElement;
    if (!container) return;
    
    // التحقق من عدم وجود الزر مسبقاً
    if (document.getElementById('barcodeScanBtn')) return;
    
    // إنشاء زر الماسح
    const btn = document.createElement('button');
    btn.id = 'barcodeScanBtn';
    btn.innerHTML = '📷 مسح باركود';
    btn.style.cssText = 'margin-top:8px;width:100%;padding:12px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:white;border:none;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-size:1rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 15px rgba(139,92,246,0.3);';
    btn.onclick = startBarcodeScanner;
    
    // إضافة hover effect
    btn.onmouseover = () => btn.style.transform = 'translateY(-2px)';
    btn.onmouseout = () => btn.style.transform = 'translateY(0)';
    
    container.appendChild(btn);
    
    console.log('[Barcode] Scanner button added to search field');
  }
  
  function addScannerButtonToHeader() {
    // إضافة الزر في شريط التنقل إذا لم يوجد حقل بحث
    const header = document.querySelector('.navbar, .header, nav');
    if (!header) return;
    
    if (document.getElementById('barcodeScanBtn')) return;
    
    const btn = document.createElement('button');
    btn.id = 'barcodeScanBtn';
    btn.innerHTML = '📷';
    btn.title = 'مسح باركود المريض';
    btn.style.cssText = 'padding:10px 15px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:white;border:none;border-radius:10px;cursor:pointer;font-size:1.2rem;margin-left:10px;box-shadow:0 4px 15px rgba(139,92,246,0.3);';
    btn.onclick = startBarcodeScanner;
    
    header.appendChild(btn);
  }

  // تشغيل عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(addScannerButton, 1000); // تأخير بسيط لضمان تحميل الواجهة
    });
  } else {
    setTimeout(addScannerButton, 1000);
  }

  // تصدير للاستخدام الخارجي
  window.KodNaqiScanner = {
    start: startBarcodeScanner,
    close: closeBarcodeScanner,
    switchCamera: switchCamera,
    search: searchByBarcode
  };

  console.log('[Barcode] Scanner module loaded');
})();
