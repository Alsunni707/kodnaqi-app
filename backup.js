/*!
 * KodNaqi — نظام النسخ الاحتياطي المبسّط (تصدير/استيراد ملفات)
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 */

(function() {
  'use strict';

  const LAST_BACKUP_KEY = 'kodnaqi_last_backup';
  const REMINDER_DAYS = 7;

  // ═══════════════════════════════════════════════════
  // 1. توليد اسم الملف
  // ═══════════════════════════════════════════════════
  function generateFilename() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 5).replace(':', '-');
    const labName = ((window.KodNaqiBrand && window.KodNaqiBrand.get().labName) || 'KodNaqi')
      .replace(/\s+/g, '_')
      .replace(/[^\w\u0600-\u06FF-]/g, '');
    return labName + '_' + date + '_' + time + '.kodnaqi.json';
  }

  // ═══════════════════════════════════════════════════
  // 2. جمع كل البيانات
  // ═══════════════════════════════════════════════════
  async function collectAllData() {
    const backup = {
      _format: 'kodnaqi-backup',
      _version: '1.0',
      _created: new Date().toISOString(),
      _app: 'KodNaqi PWA',
      _lab: (window.KodNaqiBrand && window.KodNaqiBrand.get().labName) || 'KodNaqi',
      _device: await getDevicePreview(),
      localStorage: {},
      indexedDB: {}
    };

    // جمع localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('kodnaqi_') || key.startsWith('kn_')) {
        backup.localStorage[key] = localStorage.getItem(key);
      }
    }

    // جمع IndexedDB
    if (window.db && window.db.objectStoreNames) {
      for (const storeName of window.db.objectStoreNames) {
        try {
          backup.indexedDB[storeName] = await window.db.getAll(storeName);
        } catch (e) {
          console.warn('[Backup] Could not read store:', storeName);
        }
      }
    }

    return backup;
  }

  async function getDevicePreview() {
    if (window.KodNaqiSecurity) {
      const info = await window.KodNaqiSecurity.getDeviceInfo();
      return info.preview;
    }
    return 'unknown';
  }

  // ═══════════════════════════════════════════════════
  // 3. تصدير لملف
  // ═══════════════════════════════════════════════════
  async function exportToFile() {
    try {
      showToast('⏳ جاري تجهيز النسخة...', 'info');

      const backup = await collectAllData();
      const content = JSON.stringify(backup, null, 2);
      const filename = generateFilename();

      // إنشاء الملف
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // تحميل
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 2000);

      // حفظ البيانات الوصفية
      localStorage.setItem(LAST_BACKUP_KEY, JSON.stringify({
        date: new Date().toISOString(),
        filename: filename,
        size: blob.size
      }));

      // إشعار نجاح
      showSuccessDialog(filename, blob.size);

      return { success: true, filename: filename, size: blob.size };
    } catch (err) {
      console.error('[Backup] Export failed:', err);
      alert('❌ فشل التصدير: ' + err.message);
      return { success: false, error: err.message };
    }
  }

  // ═══════════════════════════════════════════════════
  // 4. استيراد من ملف
  // ═══════════════════════════════════════════════════
  function selectImportFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.kodnaqi';
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (file) confirmImport(file);
    };
    input.click();
  }

  function confirmImport(file) {
    if (!confirm(
      '⚠️ تحذير مهم\n\n' +
      'سيتم استبدال جميع البيانات الحالية بالبيانات الموجودة في الملف.\n\n' +
      'الملف: ' + file.name + '\n' +
      'الحجم: ' + formatSize(file.size) + '\n\n' +
      'هل أنت متأكد؟'
    )) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup._format !== 'kodnaqi-backup') {
          throw new Error('هذا ليس ملف نسخة KodNaqi');
        }
        performRestore(backup, file.name);
      } catch (err) {
        alert('❌ فشل قراءة الملف:\n' + err.message);
      }
    };
    reader.onerror = function() {
      alert('❌ فشل قراءة الملف');
    };
    reader.readAsText(file);
  }

  // ═══════════════════════════════════════════════════
  // 5. تنفيذ الاستعادة
  // ═══════════════════════════════════════════════════
  async function performRestore(backup, filename) {
    try {
      showToast('⏳ جاري الاسترجاع...', 'info');

      // 1. استعادة IndexedDB
      if (backup.indexedDB && window.db) {
        for (const storeName in backup.indexedDB) {
          if (window.db.objectStoreNames.contains(storeName)) {
            await window.db.clear(storeName);
            const items = backup.indexedDB[storeName];
            for (const item of items) {
              await window.db.add(storeName, item);
            }
          }
        }
      }

      // 2. استعادة localStorage
      if (backup.localStorage) {
        Object.keys(backup.localStorage).forEach(function(key) {
          localStorage.setItem(key, backup.localStorage[key]);
        });
      }

      alert(
        '✅ تم الاسترجاع بنجاح!\n\n' +
        '📁 الملف: ' + filename + '\n' +
        '🏥 المعمل: ' + (backup._lab || 'غير معروف') + '\n' +
        '📅 التاريخ: ' + new Date(backup._created).toLocaleDateString('ar-EG') + '\n\n' +
        'سيُعاد تحميل التطبيق الآن.'
      );

      setTimeout(function() { location.reload(); }, 1500);
    } catch (err) {
      console.error('[Backup] Restore failed:', err);
      alert('❌ فشل الاسترجاع:\n' + err.message);
    }
  }

  // ═══════════════════════════════════════════════════
  // 6. تذكير دوري
  // ═══════════════════════════════════════════════════
  function shouldRemindBackup() {
    const last = localStorage.getItem(LAST_BACKUP_KEY);
    if (!last) return { should: true, reason: 'never' };

    const lastDate = new Date(JSON.parse(last).date);
    const daysSince = Math.floor((Date.now() - lastDate) / 86400000);

    return { should: daysSince >= REMINDER_DAYS, daysSince: daysSince };
  }

  function showBackupReminder() {
    const check = shouldRemindBackup();
    if (!check.should) return;
    if (localStorage.getItem('kodnaqi_dev_mode') === 'true') return;
    if (localStorage.getItem('kodnaqi_reminder_dismissed') === new Date().toDateString()) return;

    const msg = check.reason === 'never'
      ? '📦 لم تأخذ نسخة احتياطية بعد\n\nهل تريد أخذ نسخة الآن؟'
      : '📦 آخر نسخة احتياطية منذ ' + check.daysSince + ' يوم\n\nهل تريد تحديثها الآن؟';

    if (confirm(msg)) {
      exportToFile();
    } else {
      localStorage.setItem('kodnaqi_reminder_dismissed', new Date().toDateString());
    }
  }

  function getLastBackupInfo() {
    const last = localStorage.getItem(LAST_BACKUP_KEY);
    if (!last) return null;
    try { return JSON.parse(last); } catch (e) { return null; }
  }

  // ═══════════════════════════════════════════════════
  // 7. واجهات المستخدم
  // ═══════════════════════════════════════════════════
  function showToast(msg, type) {
    type = type || 'success';
    const colors = { success: '#198754', error: '#dc3545', info: '#0d3b66', warning: '#ffc107' };
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:' + colors[type] + ';color:white;padding:12px 24px;border-radius:25px;font-family:Cairo,sans-serif;font-size:0.95rem;font-weight:700;z-index:999999;box-shadow:0 5px 20px rgba(0,0,0,0.3);max-width:90%;text-align:center;';
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function() { toast.remove(); }, 300);
    }, 2500);
  }

  function showSuccessDialog(filename, size) {
    const sizeKB = (size / 1024).toFixed(1);
    
    // استخدام dialog مخصص بدل alert
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Cairo,sans-serif;';
    overlay.innerHTML =
      '<div style="background:white;border-radius:20px;padding:30px 25px;max-width:420px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.5);">' +
        '<div style="font-size:4rem;margin-bottom:15px;">✅</div>' +
        '<h3 style="color:#0d3b66;font-weight:900;margin-bottom:15px;">تم التصدير بنجاح!</h3>' +
        '<div style="background:#f8f9fa;padding:15px;border-radius:10px;margin-bottom:20px;">' +
          '<div style="font-size:0.85rem;color:#666;margin-bottom:5px;">اسم الملف:</div>' +
          '<div style="font-family:monospace;font-size:0.8rem;color:#0d3b66;word-break:break-all;margin-bottom:10px;">' + filename + '</div>' +
          '<div style="font-size:0.85rem;color:#666;">الحجم: ' + sizeKB + ' KB</div>' +
        '</div>' +
        '<div style="background:#dbeafe;border-right:4px solid #0d3b66;padding:12px;border-radius:8px;text-align:right;font-size:0.85rem;color:#1e3a8a;margin-bottom:20px;">' +
          '<strong>💡 نصيحة:</strong><br>' +
          'احفظ الملف في مكان آمن:<br>' +
          '• فلاشة USB<br>' +
          '• Google Drive<br>' +
          '• أرسله لنفسك على واتساب' +
        '</div>' +
        '<button onclick="this.closest(\'div\').parentElement.remove()" style="width:100%;padding:14px;background:linear-gradient(135deg,#0d3b66,#1e6091);color:white;border:none;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer;">فهمت</button>' +
      '</div>';
    document.body.appendChild(overlay);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  // ═══════════════════════════════════════════════════
  // API عام
  // ═══════════════════════════════════════════════════
  window.KNBackup = {
    export: exportToFile,
    import: selectImportFile,
    getInfo: getLastBackupInfo,
    shouldRemind: shouldRemindBackup,
    showReminder: showBackupReminder,
    filename: generateFilename
  };

  // تذكير تلقائي
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showBackupReminder, 5000);
  });

  console.log('💾 KodNaqi Backup System loaded');
})();
