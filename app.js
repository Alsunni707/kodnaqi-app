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

// ============================================================
// KodNaqi Standalone — منطق التطبيق
// ============================================================

let currentPage = 'dashboard';
let cachedPatients = [];

// ============ التنقل ============
function showPage(pageName) {
  // إخفاء كل الصفحات
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // إظهار الصفحة المطلوبة
  const page = document.getElementById('page-' + pageName);
  if (page) page.classList.add('active');

  // تحديث الـ bottom nav
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageName);
  });

  currentPage = pageName;

  // تحديث البيانات
  if (pageName === 'dashboard') loadDashboard();
  if (pageName === 'patients') renderPatients();
  if (pageName === 'tests') renderTests();
  setTimeout(ensureDateValues, 100);  // عيّن التواريخ بعد عرض الصفحة
  if (pageName === 'finance' && typeof renderFinance === 'function') renderFinance();
  if (pageName === 'settings') {
    if (typeof updateAccountDisplay === 'function') updateAccountDisplay();
    setTimeout(function() {
      if (typeof renderCloudSection === 'function') {
        renderCloudSection();
      } else {
        var el = document.getElementById('cloudSection');
        if (el) el.innerHTML = '<div class="alert alert-warning small m-2">⚠️ cloud.js لم يُحمّل</div>';
      }
    }, 300);
  }
  if (pageName === 'stats' && typeof renderStats === 'function') renderStats();
  if (pageName === 'notifications' && typeof renderNotificationsPage === 'function') renderNotificationsPage();
  if (pageName === 'users' && typeof renderUsersPage === 'function') renderUsersPage();
  if (pageName === 'reports-advanced' && typeof loadReport === 'function') loadReport('week');

  // scroll لأعلى
  window.scrollTo({ top: 0, behavior: 'smooth' });

  
  // طبّق صلاحيات الدور الحالي
  if (typeof applyRolePermissions === 'function') {
    setTimeout(function() { applyRolePermissions(); }, 150);
  }
}

// ============ التهيئة ============

// ============ التهيئة بعد الدخول (بدون reload) ============
async function postLoginInit() {
  try {
    console.log('🚀 بدء التهيئة بعد الدخول...');
    
    // 1) اطلب تخزين دائم
    if (navigator.storage && navigator.storage.persist) {
      try { await navigator.storage.persist(); } catch(e) {}
    }
    
    // 2) افتح قاعدة البيانات
    if (typeof openDB === 'function') {
      await openDB();
    }
    
    // 3) استيراد التحاليل إذا كانت القاعدة فارغة
    if (typeof importTestsToDB === 'function') {
      try { await importTestsToDB(); } catch(e) {}
    }
    
    // 4) استعد المستخدمين
    if (typeof restoreUsersFromIndexedDB === 'function') {
      try { await restoreUsersFromIndexedDB(); } catch(e) {}
    }
    if (typeof syncUsersToIndexedDB === 'function') {
      try { await syncUsersToIndexedDB(); } catch(e) {}
    }
    
    // 5) الوقت
    if (typeof updateTime === 'function') {
      updateTime();
      setInterval(updateTime, 30000);
    }
    
    // 6) استرجع من النسخة التلقائية إذا كانت فارغة
    try {
      var pCount = await dbCount('patients');
      var tCount = await dbCount('tests');
      if (pCount === 0 && tCount === 0 && typeof restoreFromAutoBackup === 'function') {
        await restoreFromAutoBackup();
      }
    } catch(e) {}
    
    // 7) طبّق الصلاحيات
    if (typeof applyRolePermissions === 'function') {
      applyRolePermissions();
    }
    
    // 8) حمّل لوحة التحكم
    if (typeof loadDashboard === 'function') {
      await loadDashboard();
    }
    
    // 9) اذهب للرئيسية
    if (typeof showPage === 'function') {
      showPage('dashboard');
    }
    
    // 10) 🔑 أخفِ شاشة التحميل
    var lo = document.getElementById('loadingOverlay');
    if (lo) lo.classList.add('hidden');
    if (lo) lo.style.display = 'none';
    
    // 11) تأكد أن المحتوى ظاهر
    document.body.style.overflow = '';
    
    console.log('✅ اكتملت التهيئة بعد الدخول');
  } catch (e) {
    console.error('❌ خطأ postLoginInit:', e);
    // حتى لو فشل، أخفِ شاشة التحميل
    var lo2 = document.getElementById('loadingOverlay');
    if (lo2) { lo2.classList.add('hidden'); lo2.style.display = 'none'; }
  }
}

async function init() {
  try {
    // 0) استعد المستخدمين من IndexedDB (إن وُجدوا) أو ازامنهم
    if (typeof restoreUsersFromIndexedDB === 'function') {
      await restoreUsersFromIndexedDB();
    }
    if (typeof syncUsersToIndexedDB === 'function') {
      await syncUsersToIndexedDB();
      console.log('✅ تمت مزامنة المستخدمين');
    }
    
    // 1) تحقق من تسجيل الدخول
    if (typeof setupAuth === 'function') {
      const authenticated = await setupAuth();
      if (!authenticated) {
        // الشاشة معروضة، لا تكمل التهيئة
        return;
      }
    }

    // 2) اطلب تخزين دائم (لن يُمسح مع Cache)
    if (navigator.storage && navigator.storage.persist) {
      const granted = await navigator.storage.persist();
      console.log(granted ? '✅ تخزين دائم مُفعّل' : '⚠️ تخزين مؤقت');
    }

    // اعرض حجم التخزين
    if (navigator.storage && navigator.storage.estimate) {
      const est = await navigator.storage.estimate();
      console.log(`💾 التخزين: ${(est.usage/1024).toFixed(1)} KB`);
    }

    await openDB();
    
    // استيراد التحاليل (إذا كانت فارغة)
    if (typeof importTestsToDB === 'function') {
      await importTestsToDB();
    }

    // عرض الوقت الحالي
    updateTime();
    setInterval(updateTime, 30000);

    // استرجع إن كانت القاعدة فارغة
    const pCount = await dbCount('patients');
    const tCount = await dbCount('tests');
    if (pCount === 0 && tCount === 0) {
      await restoreFromAutoBackup();
    }

    await loadDashboard();

    // إخفاء شاشة التحميل
    document.getElementById('loadingOverlay').classList.add('hidden');

    console.log('✅ التطبيق جاهز');

  } catch (e) {
    console.error('فشل التهيئة:', e);
    document.getElementById('loadingOverlay').innerHTML =
      '<div style="color:red;text-align:center;padding:20px">فشل التحميل: ' + e.message + '</div>';
  }
}

function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('currentTime').textContent = timeStr;
}

// ============ لوحة التحكم ============
async function loadDashboard() {
  const patientsCount = await dbCount('patients');
  const visitsCount = await dbCount('visits');
  const testsCount = await dbCount('tests');

  // زيارات اليوم
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allVisits = await dbGetAll('visits');
  const todayVisits = allVisits.filter(v => new Date(v.date) >= today);

  document.getElementById('statPatients').textContent = patientsCount;
  document.getElementById('statTotalVisits').textContent = visitsCount;
  document.getElementById('statTests').textContent = testsCount;
  document.getElementById('statTodayVisits').textContent = todayVisits.length;

  // أحدث المرضى
  const patients = await dbGetAll('patients');
  patients.sort((a, b) => b.id - a.id);
  const recent = patients.slice(0, 5);

  const container = document.getElementById('recentPatients');
  if (recent.length === 0) {
    container.innerHTML = '<div class="text-center text-muted py-4 small">لا يوجد مرضى بعد</div>';
  } else {
    container.innerHTML = recent.map(p => `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${escapeHtml(p.name)}</strong>
          <div class="small text-muted">${p.serial}</div>
        </div>
        <div class="small text-muted" dir="ltr">${p.phone || '-'}</div>
      </div>
    `).join('');
  }
}

// ============ المرضى ============
async function renderPatients() {
  const search = (document.getElementById('patientSearch')?.value || '').toLowerCase().trim();

  cachedPatients = await dbGetAll('patients');
  cachedPatients.sort((a, b) => b.id - a.id);

  let filtered = cachedPatients;
  if (search) {
    filtered = cachedPatients.filter(p =>
      (p.name || '').toLowerCase().includes(search) ||
      (p.phone || '').includes(search) ||
      (p.serial || '').toLowerCase().includes(search)
    );
  }

  const container = document.getElementById('patientsList');
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card p-4 text-center text-muted">
        <i class="bi bi-people" style="font-size:3rem;opacity:.3"></i>
        <div class="mt-2">${search ? 'لا نتائج' : 'لا يوجد مرضى بعد — اضغط "جديد" لإضافة'}</div>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="card p-3 mb-2">
      <div class="d-flex justify-content-between align-items-start">
        <div class="flex-grow-1" onclick="openPatient(${p.id})" style="cursor:pointer">
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="badge bg-dark" style="font-family:monospace;font-size:0.7em">${p.serial}</span>
          </div>
          <div class="fw-bold">${escapeHtml(p.name)}</div>
          <div class="small text-muted">
            ${p.age ? p.age + ' سنة' : ''}
            ${p.gender ? ' • ' + p.gender : ''}
            ${p.phone ? ' • ' + p.phone : ''}
          </div>
        </div>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-primary" onclick="editPatient(${p.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deletePatient(${p.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function showAddPatient() {
  document.getElementById('patientModalTitle').textContent = 'إضافة مريض جديد';
  document.getElementById('patientId').value = '';
  document.getElementById('pName').value = '';
  document.getElementById('pAge').value = '';
  document.getElementById('pGender').value = 'ذكر';
  document.getElementById('pPhone').value = '';
  document.getElementById('pAddress').value = '';
  document.getElementById('pNotes').value = '';

  new bootstrap.Modal(document.getElementById('patientModal')).show();
}

async function editPatient(id) {
  const p = await dbGet('patients', id);
  if (!p) return;

  document.getElementById('patientModalTitle').textContent = 'تعديل: ' + p.name;
  document.getElementById('patientId').value = p.id;
  document.getElementById('pName').value = p.name || '';
  document.getElementById('pAge').value = p.age || '';
  document.getElementById('pGender').value = p.gender || 'ذكر';
  document.getElementById('pPhone').value = p.phone || '';
  document.getElementById('pAddress').value = p.address || '';
  document.getElementById('pNotes').value = p.notes || '';

  new bootstrap.Modal(document.getElementById('patientModal')).show();
}

async function savePatient() {
  const id = document.getElementById('patientId').value;
  const name = document.getElementById('pName').value.trim();
  const phone = document.getElementById('pPhone').value.trim();

  if (!name) {
    alert('⚠️ الاسم مطلوب');
    return;
  }

  // ✅ منع التكرار: بالاسم الرباعي فقط (4 كلمات)
  if (!id) {
    const all = await dbGetAll('patients');
    
    // استخرج كلمات الاسم الجديد
    const nameParts = name.split(/\s+/).filter(function(w) { return w.length > 0; });
    
    // فقط إذا كان الاسم 4 كلمات أو أكثر
    if (nameParts.length >= 4) {
      const firstFour = nameParts.slice(0, 4);
      
      for (var i = 0; i < all.length; i++) {
        const p = all[i];
        const pParts = (p.name || '').split(/\s+/).filter(function(w) { return w.length > 0; });
        
        // تخطى الأسماء الأقل من 4 كلمات
        if (pParts.length < 4) continue;
        
        // قارن الأسماء الأربعة الأولى
        let match = true;
        for (var j = 0; j < 4; j++) {
          if (pParts[j] !== firstFour[j]) {
            match = false;
            break;
          }
        }
        
        if (match) {
          const msg = '⚠️ يوجد مريض مسجل بنفس الاسم الرباعي:\n\n' +
            '👤 ' + p.name + '\n' +
            '📋 ' + p.serial + '\n' +
            '📱 ' + (p.phone || 'لا يوجد') + '\n\n' +
            'هل تريد فتح ملفه؟';
          
          if (confirm(msg)) {
            closeModal();
            openPatient(p.id);
          }
          return;
        }
      }
    }
  }

  // البيانات الجديدة
  const data = {
    name: name,
    age: parseInt(document.getElementById('pAge').value) || null,
    gender: document.getElementById('pGender').value,
    phone: phone || null,
    address: document.getElementById('pAddress').value.trim() || null,
    notes: document.getElementById('pNotes').value.trim() || null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    data.id = parseInt(id);
    await dbPut('patients', data);
    console.log('✅ تم التعديل');
  } else {
    data.serial = await getNextSerial('patient');
    data.created_at = new Date().toISOString();
    await dbAdd('patients', data);
    console.log('✅ تمت الإضافة:', data.serial);
  }

  if (window.backupNow) {
    setTimeout(function() { window.backupNow(); }, 500);
  }

  closeModal();
  await renderPatients();
  await loadDashboard();
}

async function deletePatient(id) {
  if (!confirm('تأكيد الحذف؟')) return;
  await dbDelete('patients', id);
  await renderPatients();
  await loadDashboard();
}

async function openPatient(id) {
  const p = await dbGet('patients', id);
  if (!p) return;

  // احسب الزيارات
  const visits = await dbGetByIndex('visits', 'patient_id', id);
  visits.sort((a, b) => b.id - a.id);

  let html = `
    <div class="card p-3 mb-3">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div>
          <span class="badge bg-dark mb-2" style="font-family:monospace">${p.serial}</span>
          <h5 class="fw-bold mb-0">${escapeHtml(p.name)}</h5>
        </div>
        <button class="btn btn-sm btn-outline-primary" onclick="closeInfoModal(); editPatient(${p.id})">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <div class="row text-center mt-3 small">
        <div class="col-3"><strong>${p.age || '-'}</strong><div class="text-muted">العمر</div></div>
        <div class="col-3"><strong>${p.gender || '-'}</strong><div class="text-muted">الجنس</div></div>
        <div class="col-3"><strong>${p.phone || '-'}</strong><div class="text-muted">الهاتف</div></div>
        <div class="col-3"><strong>${visits.length}</strong><div class="text-muted">زيارة</div></div>
      </div>
      ${p.address ? `<div class="mt-2 small text-muted"><i class="bi bi-geo-alt"></i> ${escapeHtml(p.address)}</div>` : ''}
      ${p.notes ? `<div class="mt-2 small"><i class="bi bi-sticky"></i> ${escapeHtml(p.notes)}</div>` : ''}
    </div>

    <button class="btn btn-primary w-100 mb-3" onclick="closeInfoModal(); startNewVisit(${p.id})">
      <i class="bi bi-plus-circle"></i> زيارة جديدة
    </button>
      <button class="btn btn-outline-danger w-100 mt-2" onclick="closeInfoModal(); openMedicalRecord(${p.id})">
        <i class="bi bi-heart-pulse"></i> السجل الطبي الكامل
      </button>

    <h6 class="fw-bold mb-2"><i class="bi bi-clock-history"></i> سجل الزيارات (${visits.length})</h6>
  `;

  if (visits.length === 0) {
    html += '<div class="card p-3 text-center text-muted small">لا توجد زيارات بعد</div>';
  } else {
    for (const v of visits) {
      const visitTests = await dbGetByIndex('visit_tests', 'visit_id', v.id);
      const statusColors = { done: 'success', pending: 'secondary' };
      const statusLabel = { done: '✅ مكتمل', pending: '⏳ معلق' };

      html += `
        <div class="card p-3 mb-2">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="badge bg-primary" style="font-family:monospace">${v.serial}</span>
            <span class="badge bg-${statusColors[v.status] || 'secondary'}">${statusLabel[v.status] || v.status}</span>
          </div>
          <div class="small text-muted mb-2">
            <i class="bi bi-calendar"></i> ${formatDate(v.date)}
          </div>
          <div class="small mb-2">
            <strong>${visitTests.length}</strong> تحليل — 
            <strong class="text-success">${v.paid || 0} SDG</strong> مدفوع
            ${v.remaining > 0 ? ` — <strong class="text-danger">${v.remaining} SDG</strong> متبقي` : ''}
          </div>
          <div class="d-grid gap-1">
            <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); closeInfoModal(); openVisit(${v.id})">
              <i class="bi bi-pencil-square"></i> ${v.status === 'done' ? 'عرض / تعديل النتائج' : 'إدخال النتائج'}
            </button>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-success flex-grow-1" onclick="event.stopPropagation(); closeInfoModal(); addTestsToVisit(${v.id})">
                <i class="bi bi-plus-circle"></i> إضافة تحاليل
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation(); deleteVisit(${v.id})">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  showInfoModal(html, 'ملف المريض');
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function closeInfoModal() {
  const modalEl = document.getElementById('infoModal');
  if (modalEl) {
    const m = bootstrap.Modal.getInstance(modalEl);
    if (m) m.hide();
  }
}

function closeModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById('patientModal'));
  if (modal) modal.hide();
}

// ============ تصدير/استيراد ============
async function exportData() {
  const data = {};
  const stores = ['patients', 'tests', 'parameters', 'visits', 'visit_tests', 'results', 'expenses', 'inventory', 'counters', 'activity', 'notifications', 'users_store'];

  for (const store of stores) {
    try {
      data[store] = await dbGetAll(store);
    } catch (e) {
      data[store] = [];
    }
  }

  data._exported_at = new Date().toISOString();
  data._version = 1;

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  const filename = `kodnaqi_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log('✅ تم التصدير:', filename);
  alert('✅ تم تصدير النسخة الاحتياطية:\n' + filename);
}

async function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!confirm('⚠️ سيتم استبدال كل البيانات الحالية!\n\nهل أنت متأكد؟')) {
    event.target.value = '';
    return;
  }

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    // امسح البيانات الحالية
    const stores = ['patients', 'tests', 'parameters', 'visits', 'visit_tests', 'results', 'expenses', 'inventory', 'counters', 'activity', 'notifications', 'users_store'];
    for (const store of stores) {
      try { await dbClear(store); } catch (e) { }
    }

    // استورد البيانات
    for (const store of stores) {
      if (data[store] && Array.isArray(data[store])) {
        for (const item of data[store]) {
          try { await dbAdd(store, item); } catch (e) { }
        }
      }
    }

    alert('✅ تم الاستيراد بنجاح');
    location.reload();
  } catch (e) {
    alert('❌ فشل الاستيراد: ' + e.message);
  }

  event.target.value = '';
}

function confirmReset() {
  const confirm1 = confirm('⚠️ سيتم حذف كل البيانات!\n\nهل أنت متأكد؟');
  if (!confirm1) return;

  const confirm2 = prompt('اكتب "حذف" للتأكيد:');
  if (confirm2 !== 'حذف') {
    alert('تم الإلغاء');
    return;
  }

  (async () => {
    const stores = ['patients', 'tests', 'parameters', 'visits', 'visit_tests', 'results', 'expenses', 'inventory', 'counters', 'activity', 'notifications', 'users_store'];
    for (const store of stores) {
      try { await dbClear(store); } catch (e) { }
    }
    alert('✅ تم حذف كل البيانات');
    location.reload();
  })();
}

// ============ أدوات مساعدة ============


// ============ نسخ احتياطي تلقائي ============
async function autoBackupToFile() {
  try {
    const data = {};
    const stores = ['patients', 'tests', 'parameters', 'visits', 'visit_tests', 'results', 'expenses', 'inventory', 'counters', 'activity', 'notifications', 'users_store'];
    for (const store of stores) {
      try { data[store] = await dbGetAll(store); } catch (e) { data[store] = []; }
    }
    data._exported_at = new Date().toISOString();
    data._version = 2;
    try {
      localStorage.setItem('kodnaqi_auto_backup', JSON.stringify(data));
      localStorage.setItem('kodnaqi_auto_backup_time', new Date().toISOString());
      console.log('✅ نسخة تلقائية محفوظة');
    } catch (e) { console.log('⚠️ localStorage ممتلئ'); }
    return data;
  } catch (e) { console.error('❌ فشل:', e); }
}

async function restoreFromAutoBackup() {
  try {
    const dataStr = localStorage.getItem('kodnaqi_auto_backup');
    if (!dataStr) return false;
    const data = JSON.parse(dataStr);
    const stores = ['patients', 'tests', 'parameters', 'visits', 'visit_tests', 'results', 'expenses', 'inventory', 'counters', 'activity', 'notifications', 'users_store'];
    for (const store of stores) { try { await dbClear(store); } catch (e) { } }
    for (const store of stores) {
      if (data[store] && Array.isArray(data[store])) {
        for (const item of data[store]) { try { await dbAdd(store, item); } catch (e) { } }
      }
    }
    console.log('✅ استُرجعت البيانات');
    return true;
  } catch (e) { return false; }
}

setInterval(autoBackupToFile, 5 * 60 * 1000);
window.backupNow = autoBackupToFile;




// ضمان وجود قيمة في كل حقول التاريخ
function ensureDateValues() {
  document.querySelectorAll('input[type="date"]').forEach(el => {
    if (!el.value) {
      el.value = new Date().toISOString().split('T')[0];
    }
  });
}


function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============ تشغيل ============


// ============ التحاليل ============
let cachedTests = [];
let currentTestCategory = null;

async function renderTests() {
  cachedTests = await dbGetAll('tests');
  cachedTests.sort((a, b) => (a.category || '').localeCompare(b.category || '') || a.name.localeCompare(b.name));

  const stats = {
    total: cachedTests.length,
    categories: new Set(cachedTests.map(t => t.category || 'بدون تصنيف')).size,
  };

  // اجلب عدد المعايير لكل فحص
  const allParams = await dbGetAll('parameters');
  const paramCountByTest = {};
  allParams.forEach(p => {
    paramCountByTest[p.test_id] = (paramCountByTest[p.test_id] || 0) + 1;
  });

  const container = document.getElementById('testsList');
  if (!container) return;

  // اعرض إحصائيات
  let html = `
    <div class="row g-2 mb-3">
      <div class="col-6">
        <div class="card p-2 text-center">
          <div class="small text-muted">إجمالي التحاليل</div>
          <div class="stat-value fs-4">${stats.total}</div>
        </div>
      </div>
      <div class="col-6">
        <div class="card p-2 text-center">
          <div class="small text-muted">الفئات</div>
          <div class="stat-value fs-4">${stats.categories}</div>
        </div>
      </div>
    </div>
  `;

  // بحث
  html += `
    <div class="card p-3 mb-3">
      <input type="search" id="testSearch" class="form-control" 
             placeholder="🔍 ابحث عن تحليل أو معيار..." 
             value="${document.getElementById('testSearch')?.value || ''}"
             oninput="renderTests()">
    </div>
  `;

  const query = (document.getElementById('testSearch')?.value || '').toLowerCase().trim();

  // فلترة
  let filtered = cachedTests;
  if (query) {
    filtered = cachedTests.filter(t =>
      t.name.toLowerCase().includes(query) ||
      (t.name_ar || '').includes(query) ||
      (t.category || '').toLowerCase().includes(query)
    );
  }

  // تجميع حسب الفئة
  const byCategory = {};
  filtered.forEach(t => {
    const cat = t.category || 'بدون تصنيف';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(t);
  });

  // عرض كل فئة
  for (const [category, tests] of Object.entries(byCategory)) {
    html += `
      <div class="card mb-3">
        <div class="card-header bg-white">
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">
              <i class="bi bi-folder2-open text-primary"></i>
              ${escapeHtml(category)}
            </span>
            <span class="badge bg-info">${tests.length}</span>
          </div>
        </div>
        <div class="list-group list-group-flush">
          ${tests.map(t => {
            const paramCount = paramCountByTest[t.id] || 0;
            return `
              <div class="list-group-item d-flex justify-content-between align-items-center" 
                   onclick="showTestDetails(${t.id})" style="cursor:pointer">
                <div>
                  <div class="fw-bold">${escapeHtml(t.name)}</div>
                  ${t.name_ar ? `<div class="small text-muted">${escapeHtml(t.name_ar)}</div>` : ''}
                  <div class="small">
                    <span class="badge bg-secondary">${paramCount} معيار</span>
                    ${t.price ? `<span class="badge bg-warning text-dark ms-1">${t.price} SDG</span>` : ''}
                  </div>
                </div>
                <i class="bi bi-chevron-left text-muted"></i>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  if (filtered.length === 0) {
    html += `
      <div class="card p-4 text-center text-muted">
        <i class="bi bi-search" style="font-size:3rem;opacity:.3"></i>
        <div class="mt-2">${query ? 'لا نتائج' : 'جاري تحميل التحاليل...'}</div>
      </div>
    `;
  }

  container.innerHTML = html;
}

async function showTestDetails(testId) {
  const test = await dbGet('tests', testId);
  if (!test) return;

  const params = await dbGetByIndex('parameters', 'test_id', testId);
  params.sort((a, b) => (a.order || 0) - (b.order || 0));

  let html = `
    <div class="mb-2">
      <h5 class="fw-bold mb-1">${escapeHtml(test.name)}</h5>
      ${test.name_ar ? `<div class="text-muted">${escapeHtml(test.name_ar)}</div>` : ''}
      <div class="mt-2">
        <span class="badge bg-primary">${escapeHtml(test.category || 'عام')}</span>
        ${test.price ? `<span class="badge bg-warning text-dark">${test.price} SDG</span>` : ''}
      </div>
    </div>
    <hr>
    <h6 class="fw-bold mb-2">المعايير (${params.length}):</h6>
    <div class="table-responsive">
      <table class="table table-sm table-bordered" style="font-size:12px">
        <thead class="table-light">
          <tr>
            <th>المعيار</th>
            <th>الوحدة</th>
            <th>المدى الطبيعي</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const p of params) {
    let refDisplay = '-';
    if (p.ref_min !== null && p.ref_min !== undefined || p.ref_max !== null && p.ref_max !== undefined) {
      const mn = p.ref_min !== null && p.ref_min !== undefined ? p.ref_min : '';
      const mx = p.ref_max !== null && p.ref_max !== undefined ? p.ref_max : '';
      refDisplay = `${mn} - ${mx}`.trim().replace(/^- | -$/, '') || '-';
    } else if (p.ref_text) {
      refDisplay = p.ref_text;
    }

    html += `
      <tr>
        <td>
          <strong>${escapeHtml(p.name)}</strong>
          ${p.name_ar ? `<div class="small text-muted">${escapeHtml(p.name_ar)}</div>` : ''}
          ${p.result_type === 'select' ? '<span class="badge bg-info" style="font-size:9px">قائمة</span>' : ''}
        </td>
        <td dir="ltr" class="text-center small">${p.unit || '-'}</td>
        <td dir="ltr" class="text-center small">${escapeHtml(String(refDisplay))}</td>
      </tr>
    `;
  }

  html += `
        </tbody>
      </table>
    </div>
  `;

  // اعرض في modal مؤقت
  showInfoModal(html, test.name);
}

function showInfoModal(htmlContent, title) {
  let modalEl = document.getElementById('infoModal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'infoModal';
    modalEl.className = 'modal fade';
    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h6 class="modal-title" id="infoModalTitle"></h6>
            <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="infoModalBody"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
  }

  document.getElementById('infoModalTitle').textContent = title;
  document.getElementById('infoModalBody').innerHTML = htmlContent;
  new bootstrap.Modal(modalEl).show();
}


document.addEventListener('DOMContentLoaded', init);

// إغلاق المودال عند الحفظ بـ Enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('patientModal')?.classList.contains('show')) {
    if (e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      savePatient();
    }
  }
});
