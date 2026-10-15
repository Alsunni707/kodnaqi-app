// ============================================================
// KodNaqi — إدارة الزيارات (حذف + إضافة تحاليل)
// ============================================================

// حذف زيارة
async function deleteVisit(visitId) {
  const visit = await dbGet('visits', visitId);
  if (!visit) return;

  if (!confirm(`⚠️ حذف الزيارة ${visit.serial}؟\n\nسيتم حذف كل نتائجها أيضاً.`)) return;

  // احذف النتائج
  const results = await dbGetByIndex('results', 'visit_id', visitId);
  for (const r of results) {
    await dbDelete('results', r.id);
  }

  // احذف تحاليل الزيارة
  const visitTests = await dbGetByIndex('visit_tests', 'visit_id', visitId);
  for (const vt of visitTests) {
    await dbDelete('visit_tests', vt.id);
  }

  // احذف الزيارة
  await dbDelete('visits', visitId);

  // نسخة احتياطية
  if (window.backupNow) await window.backupNow();

  console.log('✅ تم حذف الزيارة');
  alert('✅ تم حذف الزيارة');

  // أرجع لملف المريض
  closeInfoModal();
  await renderPatients();
  await loadDashboard();

  // افتح ملف المريض مرة أخرى
  setTimeout(() => openPatient(visit.patient_id), 300);
}

// إضافة تحاليل لزيارة موجودة
async function addTestsToVisit(visitId) {
  const visit = await dbGet('visits', visitId);
  if (!visit) return;

  // التحاليل المضافة حالياً
  const existing = await dbGetByIndex('visit_tests', 'visit_id', visitId);
  const existingIds = new Set(existing.map(vt => vt.test_id));

  // كل التحاليل
  const allTests = await dbGetAll('tests');
  allTests.sort((a, b) => (a.category || '').localeCompare(b.category || '') || a.name.localeCompare(b.name));

  const allParams = await dbGetAll('parameters');
  const paramCount = {};
  allParams.forEach(p => { paramCount[p.test_id] = (paramCount[p.test_id] || 0) + 1; });

  const byCategory = {};
  allTests.forEach(t => {
    const cat = t.category || 'أخرى';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(t);
  });

  let html = `
    <div class="alert alert-info py-2 mb-2">
      <i class="bi bi-info-circle"></i> اختر التحاليل لإضافتها إلى <strong>${visit.serial}</strong>
    </div>
    <div class="card p-2 mb-2">
      <input type="search" class="form-control form-control-sm" id="addTestSearch" 
             placeholder="🔍 ابحث..." oninput="filterAddTests()">
    </div>
    <div id="addTestsList" style="max-height: 400px; overflow-y: auto;">
  `;

  for (const [category, tests] of Object.entries(byCategory)) {
    html += `
      <div class="card mb-2 add-cat">
        <div class="card-header bg-light py-1">
          <small class="fw-bold"><i class="bi bi-folder2-open text-primary"></i> ${escapeHtml(category)}</small>
        </div>
        <div class="list-group list-group-flush">
    `;

    for (const t of tests) {
      const already = existingIds.has(t.id);
      html += `
        <div class="list-group-item py-2 add-test-item" data-name="${escapeHtml(t.name.toLowerCase())}">
          <div class="form-check">
            <input class="form-check-input add-test-cb" type="checkbox" 
                   id="add_${t.id}" value="${t.id}"
                   data-price="${t.price || 0}"
                   ${already ? 'checked disabled' : ''}>
            <label class="form-check-label w-100 d-flex justify-content-between" for="add_${t.id}">
              <div>
                <strong>${escapeHtml(t.name)}</strong>
                ${t.name_ar ? `<div class="small text-muted">${escapeHtml(t.name_ar)}</div>` : ''}
                <span class="badge bg-info" style="font-size:9px">${paramCount[t.id] || 0} معيار</span>
                ${already ? '<span class="badge bg-success" style="font-size:9px">مضاف</span>' : ''}
              </div>
              <span class="badge bg-warning text-dark">${t.price || 0} SDG</span>
            </label>
          </div>
        </div>
      `;
    }

    html += '</div></div>';
  }

  html += '</div>';

  html += `
    <div class="card p-3 mt-3 bg-light">
      <div class="d-flex justify-content-between mb-2">
        <span>المجموع المضافة:</span>
        <strong class="text-primary" id="addTestsTotal">0 SDG</strong>
      </div>
      <button class="btn btn-success w-100" onclick="confirmAddTests(${visitId})">
        <i class="bi bi-plus-circle"></i> إضافة التحاليل
      </button>
    </div>
  `;

  showInfoModal(html, 'إضافة تحاليل');

  // احسب المجموع عند التغيير
  setTimeout(() => {
    document.querySelectorAll('.add-test-cb:not(:disabled)').forEach(cb => {
      cb.addEventListener('change', updateAddTestsTotal);
    });
  }, 100);
}

function updateAddTestsTotal() {
  let total = 0;
  document.querySelectorAll('.add-test-cb:checked:not(:disabled)').forEach(cb => {
    total += parseFloat(cb.dataset.price) || 0;
  });
  const el = document.getElementById('addTestsTotal');
  if (el) el.textContent = total.toLocaleString('ar-EG') + ' SDG';
}

function filterAddTests() {
  const q = document.getElementById('addTestSearch').value.toLowerCase().trim();
  document.querySelectorAll('.add-test-item').forEach(item => {
    item.style.display = (item.dataset.name.includes(q) || !q) ? '' : 'none';
  });
  document.querySelectorAll('.add-cat').forEach(cat => {
    const visible = Array.from(cat.querySelectorAll('.add-test-item')).filter(i => i.style.display !== 'none');
    cat.style.display = visible.length > 0 ? '' : 'none';
  });
}

async function confirmAddTests(visitId) {
  const selected = [];
  document.querySelectorAll('.add-test-cb:checked:not(:disabled)').forEach(cb => {
    selected.push({
      test_id: parseInt(cb.value),
      price: parseFloat(cb.dataset.price) || 0,
    });
  });

  if (selected.length === 0) {
    alert('⚠️ لم تختر أي تحليل جديد');
    return;
  }

  const visit = await dbGet('visits', visitId);

  // أضف التحاليل
  for (const s of selected) {
    await dbAdd('visit_tests', {
      visit_id: visitId,
      test_id: s.test_id,
      price: s.price,
      status: 'pending',
    });
  }

  // أعد حساب الإجماليات
  const visitTests = await dbGetByIndex('visit_tests', 'visit_id', visitId);
  const subtotal = visitTests.reduce((s, vt) => s + (vt.price || 0), 0);
  const discount = visit.discount || 0;
  const total = subtotal - discount;

  visit.subtotal = subtotal;
  visit.total = total;
  visit.remaining = total - (visit.paid || 0);
  visit.status = 'pending'; // إعادة تعيين لأن هناك تحاليل جديدة

  await dbPut('visits', visit);

  // نسخة احتياطية
  if (window.backupNow) await window.backupNow();

  console.log(`✅ أُضيفت ${selected.length} تحاليل`);
  alert(`✅ تمت إضافة ${selected.length} تحاليل`);

  closeInfoModal();
  await openPatient(visit.patient_id);
}

// صدّر الدوال
window.deleteVisit = deleteVisit;
window.addTestsToVisit = addTestsToVisit;
window.confirmAddTests = confirmAddTests;
window.filterAddTests = filterAddTests;
