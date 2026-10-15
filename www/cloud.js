/*!
 * KodNaqi PWA — نظام إدارة المعامل الطبية التشخيصية
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 * All Rights Reserved. جميع الحقوق محفوظة.
 *
 * هذا الكود ملكية فكرية خاصة.
 * يُحظر نسخه أو توزيعه أو تعديله أو إعادة استخدامه
 * بأي شكل دون إذن كتابي مسبق من المالك.
 *
 * Contact: kodnaqi@gmail.com
 */

// KodNaqi — Google Drive Backup
const CLOUD_URL_KEY = 'kodnaqi_cloud_url';
const DEFAULT_CLOUD_URL = '';  // كل عميل يُدخل رابطه الخاص

function getCloudUrl() {
  return localStorage.getItem(CLOUD_URL_KEY) || DEFAULT_CLOUD_URL;
}

function setCloudUrl(url) {
  localStorage.setItem(CLOUD_URL_KEY, url.trim());
}

async function saveCloudUrl() {
  const url = document.getElementById('cloudUrlInput').value.trim();
  if (!url || !url.includes('script.google.com')) {
    alert('⚠️ الرابط غير صحيح');
    return;
  }
  setCloudUrl(url);
  alert('✅ تم حفظ الرابط');
  renderCloudSection();
}

async function testCloudConnection() {
  const url = getCloudUrl();
  if (!url) { alert('⚠️ احفظ الرابط أولاً'); return; }
  
  try {
    const resp = await fetch(url + '?action=list');
    const data = await resp.json();
    if (data.success) {
      alert('✅ الاتصال ناجح!\nعدد النسخ السحابية: ' + data.files.length);
    } else {
      alert('⚠️ ' + (data.error || 'خطأ'));
    }
  } catch (e) {
    alert('❌ فشل: ' + e.message);
  }
}

async function uploadToCloud(silent) {
  // 🔐 اطلب كلمة مرور إذا لم تكن محفوظة
  if (typeof hasEncryptionPassword === 'function' && !hasEncryptionPassword()) {
    if (!silent) {
      return new Promise(function(resolve) {
        showPasswordDialog(
          '🔐 كلمة مرور التشفير',
          'أدخل كلمة مرور لتشفير النسخة قبل رفعها للسحابة.\nاحفظها في مكان آمن!',
          async function() {
            var ok = await uploadToCloud(silent);
            resolve(ok);
          }
        );
      });
    } else {
      console.warn('تخطي الرفع التلقائي — لا توجد كلمة مرور');
      return false;
    }
  }

  const url = getCloudUrl();
  if (!url) {
    if (!silent) alert('⚠️ لم يتم إعداد Google Drive');
    return false;
  }

  try {
    const data = {};
    const stores = ['patients','tests','parameters','visits','visit_tests','results','expenses','inventory','counters','activity','notifications','users_store'];
    for (const store of stores) {
      try { data[store] = await dbGetAll(store); } catch (e) { data[store] = []; }
    }
    data._exported_at = new Date().toISOString();
    data._version = 2;
    data._source = 'PWA Standalone';

    // 🔐 شفّر البيانات
    var json;
    if (typeof prepareEncryptedBackup === 'function' && hasEncryptionPassword()) {
      try {
        json = await prepareEncryptedBackup(data);
        console.log('🔐 النسخة مشفرة (' + json.length + ' حرف)');
      } catch (e) {
        console.error('فشل التشفير:', e);
        if (!silent) alert('❌ فشل التشفير: ' + e.message);
        return false;
      }
    } else {
      json = JSON.stringify(data);
    }
    
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = 'kodnaqi_' + (isEncrypted(json) ? 'ENC_' : '') + ts + '.json';

    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ filename: filename, content: json })
    });

    localStorage.setItem('kodnaqi_last_cloud_upload', new Date().toISOString());
    localStorage.setItem('kodnaqi_last_cloud_filename', filename);

    if (!silent) alert('✅ تم الرفع:\n' + filename);
    return true;
  } catch (e) {
    if (!silent) alert('❌ فشل: ' + e.message);
    return false;
  }
}

async function downloadFromCloud() {
  const url = getCloudUrl();
  if (!url) { alert('⚠️ لم يتم الإعداد'); return; }
  if (!confirm('⚠️ سيتم استبدال البيانات الحالية!\nمتابعة؟')) return;

  try {
    const resp = await fetch(url + '?action=latest');
    var raw = await resp.text();
    
    // 🔐 فحص إذا كانت مشفرة
    var data;
    if (typeof isEncrypted === 'function' && isEncrypted(raw)) {
      if (!hasEncryptionPassword()) {
        return new Promise(function(resolve) {
          showPasswordDialog(
            '🔐 فك التشفير',
            'النسخة السحابية مشفرة. أدخل كلمة المرور لفك التشفير.',
            async function() {
              try {
                data = await parseEncryptedBackup(raw);
                await _applyDownloadedData(data);
                resolve(true);
              } catch (e) {
                alert('❌ فشل فك التشفير: ' + e.message);
                resolve(false);
              }
            }
          );
        });
      } else {
        data = await parseEncryptedBackup(raw);
      }
    } else {
      data = JSON.parse(raw);
    }
    if (!data || !data.patients) { alert('❌ لا توجد نسخة'); return; }

    const stores = ['patients','tests','parameters','visits','visit_tests','results','expenses','inventory','counters','activity','notifications','users_store'];
    for (const store of stores) { try { await dbClear(store); } catch (e) {} }

    let count = 0;
    for (const store of stores) {
      if (data[store] && Array.isArray(data[store])) {
        for (const item of data[store]) {
          try { await dbAdd(store, item); count++; } catch (e) {}
        }
      }
    }
    alert('✅ تم الاسترجاع (' + count + ' سجل)');
    location.reload();
  } catch (e) {
    alert('❌ فشل: ' + e.message);
  }
}

function renderCloudSection() {
  const container = document.getElementById('cloudSection');
  if (!container) return;

  const url = getCloudUrl();
  const lastUpload = localStorage.getItem('kodnaqi_last_cloud_upload');
  const lastFile = localStorage.getItem('kodnaqi_last_cloud_filename');

  let lastText = 'لا يوجد';
  if (lastUpload) {
    const d = new Date(lastUpload);
    lastText = d.toLocaleDateString('ar-EG') + ' ' + d.toLocaleTimeString('ar-EG', {hour:'2-digit',minute:'2-digit'});
  }

  // 🔐 قسم التشفير
  let encHtml = '';
  if (typeof hasEncryptionPassword === 'function') {
    const hasPass = hasEncryptionPassword();
    const encStatus = hasPass
      ? '<span class="badge bg-success">🔐 مفعّل</span>'
      : '<span class="badge bg-secondary">غير مفعّل</span>';
    
    encHtml = '<div class="card p-2 mb-3" style="background:#f0f8ff">' +
      '<div class="d-flex justify-content-between align-items-center mb-2">' +
      '<strong class="small">🔐 تشفير النسخ</strong>' + encStatus +
      '</div>' +
      '<div class="small text-muted mb-2">' +
      (hasPass
        ? 'النسخ المرفوعة مشفرة بـ AES-256. كلمة المرور محفوظة خلال هذه الجلسة فقط.'
        : 'لم تُفعّل التشفير. النسخ تُرفع كنص عادي.') +
      '</div>' +
      '<div class="d-grid gap-1">' +
      '<button class="btn btn-outline-primary btn-sm" onclick="setupEncryption()">' +
      (hasPass ? '🔑 تغيير كلمة المرور' : '🔐 تفعيل التشفير') +
      '</button>' +
      (hasPass
        ? '<button class="btn btn-outline-danger btn-sm" onclick="removeEncryption()">إلغاء التشفير</button>'
        : '') +
      '</div>' +
      '</div>';
  }
  
  let html = encHtml + '<div class="mb-3">';
  html += '<label class="form-label small fw-bold">Google Drive URL</label>';
  html += '<input type="text" id="cloudUrlInput" class="form-control form-control-sm" dir="ltr" placeholder="https://script.google.com/macros/s/..." value="' + url + '">';
  html += '</div>';
  html += '<div class="d-grid gap-2">';
  html += '<button class="btn btn-primary btn-sm" onclick="saveCloudUrl()"><i class="bi bi-save"></i> حفظ الرابط</button>';

  if (url) {
    html += '<button class="btn btn-outline-info btn-sm" onclick="testCloudConnection()"><i class="bi bi-wifi"></i> اختبار الاتصال</button>';
    html += '<button class="btn btn-success btn-sm" onclick="uploadToCloud(false)"><i class="bi bi-cloud-upload"></i> رفع نسخة للسحابة الآن</button>';
    html += '<button class="btn btn-warning btn-sm" onclick="downloadFromCloud()"><i class="bi bi-cloud-download"></i> استرجاع من السحابة</button>';
    html += '<button class="btn btn-danger btn-sm w-100 mt-2" onclick="restoreEverythingFromCloud()" id="restore-everything-btn"><i class="bi bi-arrow-clockwise"></i> 🔄 استعادة كل شيء</button>';
    html += '<div class="alert alert-light small py-2 mt-2 mb-0">';
    html += '<div><strong>آخر رفع:</strong> ' + lastText + '</div>';
    if (lastFile) html += '<div class="text-muted" style="font-size:10px">' + lastFile + '</div>';
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
}

window.getCloudUrl = getCloudUrl;
window.saveCloudUrl = saveCloudUrl;
window.testCloudConnection = testCloudConnection;
window.uploadToCloud = uploadToCloud;
window.downloadFromCloud = downloadFromCloud;
window.renderCloudSection = renderCloudSection;


// ============ استعادة كل شيء من السحابة ============
async function restoreEverythingFromCloud() {
  if (!confirm('⚠️ سيتم استبدال كل البيانات الحالية بالنسخة السحابية!\n\nهل أنت متأكد؟')) {
    return;
  }
  
  var url = getCloudUrl();
  if (!url) {
    alert('⚠️ الرابط غير متوفر');
    return;
  }
  
  try {
    // 1) اجلب النسخة كنص
    var resp = await fetch(url + '?action=latest');
    var raw = await resp.text();
    
    // 🔐 فحص إذا كانت مشفرة
    var data;
    if (typeof isEncrypted === 'function' && isEncrypted(raw)) {
      if (!hasEncryptionPassword()) {
        // اطلب كلمة المرور
        showPasswordDialog(
          '🔐 فك التشفير',
          'النسخة السحابية مشفرة. أدخل كلمة المرور لفك التشفير.',
          async function() {
            try {
              var decrypted = await parseEncryptedBackup(raw);
              await _applyDownloadedData(decrypted);
            } catch (e) {
              alert('❌ فشل فك التشفير: ' + e.message);
            }
          }
        );
        return;
      } else {
        data = await parseEncryptedBackup(raw);
      }
    } else {
      data = JSON.parse(raw);
    }
    
    if (!data || !data.patients) {
      alert('❌ لا توجد نسخة سحابية أو النسخة تالفة');
      return;
    }
    
    console.log('📦 تم جلب النسخة السحابية');
    
    // 2) امسح كل شيء
    var stores = ['patients', 'tests', 'parameters', 'visits', 'visit_tests', 'results', 'expenses', 'inventory', 'counters', 'activity', 'notifications', 'users_store'];
    for (var i = 0; i < stores.length; i++) {
      try { await dbClear(stores[i]); } catch(e) {}
    }
    
    // 3) استورد
    var total = 0;
    for (var j = 0; j < stores.length; j++) {
      var store = stores[j];
      if (data[store] && Array.isArray(data[store])) {
        for (var k = 0; k < data[store].length; k++) {
          try {
            await dbAdd(store, data[store][k]);
            total++;
          } catch(e) {}
        }
      }
    }
    
    console.log('✅ تم استيراد ' + total + ' سجل');
    
    // 4) استعد المستخدمين إلى localStorage أيضاً
    if (data.users_store && data.users_store.length > 0) {
      var users = {};
      for (var m = 0; m < data.users_store.length; m++) {
        var u = data.users_store[m];
        if (u.username) users[u.username] = u;
      }
      localStorage.setItem('kodnaqi_users', JSON.stringify(users));
      console.log('✅ تم استعادة ' + Object.keys(users).length + ' مستخدم');
    }
    
    alert('✅ تم استعادة ' + total + ' سجل من السحابة\n\n' + 
          'المستخدمون: ' + (data.users_store ? data.users_store.length : 0) + '\n\n' +
          'سيتم إعادة تحميل التطبيق.');
    
    setTimeout(function() {
      location.reload();
    }, 1000);
    
  } catch (e) {
    console.error('❌ فشل:', e);
    alert('❌ فشل الاستعادة: ' + e.message);
  }
}

window.restoreEverythingFromCloud = restoreEverythingFromCloud;


// ============ تفعيل التشفير ============
function setupEncryption() {
  if (typeof showPasswordDialog !== 'function') {
    alert('⚠️ وحدة التشفير غير محمّلة');
    return;
  }
  
  showPasswordDialog(
    '🔐 تفعيل تشفير النسخ',
    'أدخل كلمة مرور قوية لتشفير النسخ المرفوعة للسحابة.\n\n⚠️ احفظها في مكان آمن — لا يمكن استرجاعها!',
    function() {
      alert('✅ تم تفعيل التشفير بنجاح\n\n' +
            'النسخ القادمة ستُشفَّر تلقائياً قبل الرفع.');
      renderCloudSection();
    }
  );
}

// ============ إلغاء التشفير ============
function removeEncryption() {
  if (!confirm('⚠️ إلغاء التشفير؟\n\nالنسخ القادمة ستُرفع كنص عادي.')) {
    return;
  }
  if (typeof clearEncryptionPassword === 'function') {
    clearEncryptionPassword();
  }
  alert('✅ تم إلغاء التشفير');
  renderCloudSection();
}

window.setupEncryption = setupEncryption;
window.removeEncryption = removeEncryption;
