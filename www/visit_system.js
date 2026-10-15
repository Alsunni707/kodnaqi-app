// ============================================================
// KodNaqi — نظام الزيارات وإدخال النتائج
// ============================================================

let currentVisitPatient = null;
let currentVisitTests = [];  // التحاليل المختارة
let currentVisitTestsData = {};  // بيانات كل تحليل

// ============ بدء زيارة جديدة ============
async function startNewVisit(patientId) {
  const patient = await dbGet('patients', patientId);
  if (!patient) {
    alert('المريض غير موجود');
    return;
  }

  currentVisitPatient = patient;
  currentVisitTests = [];
  currentVisitTestsData = {};

  // اعرض صفحة اختيار التحاليل
  showVisitTestSelection();
}

// ============ شاشة اختيار التحاليل ============
async function showVisitTestSelection() {
  const p = currentVisitPatient;

  let html = `
    <div class="alert alert-primary py-2 mb-2">
      <i class="bi bi-person-circle"></i>
      <strong>${escapeHtml(p.name)}</strong>
      <span class="badge bg-dark ms-2" style="font-family:monospace;font-size:0.65em">${p.serial}</span>
    </div>

    <div class="card p-2 mb-2">
      <input type="search" id="visitTestSearch" class="form-control form-control-sm" 
             placeholder="🔍 ابحث عن تحليل..." oninput="filterVisitTests()">
    </div>

    <div id="visitTestsList" style="max-height: 400px; overflow-y: auto;">
  `;

  // اجلب كل التحاليل
  const allTests = await dbGetAll('tests');
  allTests.sort((a, b) => (a.category || '').localeCompare(b.category || '') || a.name.localeCompare(b.name));

  // اجلب عدد المعايير
  const allParams = await dbGetAll('parameters');
  const paramCount = {};
  allParams.forEach(p => {
    paramCount[p.test_id] = (paramCount[p.test_id] || 0) + 1;
  });

  // تجميع حسب الفئة
  const byCategory = {};
  allTests.forEach(t => {
    const cat = t.category || 'أخرى';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(t);
  });

  for (const [category, tests] of Object.entries(byCategory)) {
    html += `
      <div class="card mb-2 visit-cat">
        <div class="card-header bg-light py-1">
          <small class="fw-bold">
            <i class="bi bi-folder2-open text-primary"></i> ${escapeHtml(category)}
            <span class="badge bg-secondary ms-1">${tests.length}</span>
          </small>
        </div>
        <div class="list-group list-group-flush">
    `;

    for (const t of tests) {
      html += `
        <div class="list-group-item py-2 visit-test-item" data-name="${escapeHtml(t.name.toLowerCase())}" data-name-ar="${escapeHtml((t.name_ar || '').toLowerCase())}">
          <div class="form-check">
            <input class="form-check-input test-checkbox" type="checkbox" 
                   id="test_${t.id}" value="${t.id}" 
                   data-test-name="${escapeHtml(t.name)}"
                   data-price="${t.price || 0}"
                   onchange="toggleTestSelection(${t.id}, this)">
            <label class="form-check-label w-100 d-flex justify-content-between" for="test_${t.id}">
              <div>
                <strong>${escapeHtml(t.name)}</strong>
                ${t.name_ar ? `<div class="small text-muted">${escapeHtml(t.name_ar)}</div>` : ''}
                <span class="badge bg-info" style="font-size:9px">${paramCount[t.id] || 0} معيار</span>
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

  // ملخص أسفل
  html += `
    <div class="card p-3 mt-3 bg-light">
      <div class="d-flex justify-content-between mb-2">
        <span>التحاليل المختارة:</span>
        <span class="fw-bold" id="selectedCount">0</span>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <span>الإجمالي:</span>
        <span class="fw-bold text-primary fs-5" id="visitTotal">0 SDG</span>
      </div>
      <button class="btn btn-success w-100" onclick="proceedToResults()">
        <i class="bi bi-check-circle"></i> إنشاء الزيارة
      </button>
    </div>
  `;

  showInfoModal(html, 'اختيار التحاليل');
}

function filterVisitTests() {
  const q = document.getElementById('visitTestSearch').value.toLowerCase().trim();
  document.querySelectorAll('.visit-test-item').forEach(item => {
    const nameMatch = item.dataset.name.includes(q);
    const nameArMatch = item.dataset.nameAr.includes(q);
    item.style.display = (nameMatch || nameArMatch || !q) ? '' : 'none';
  });

  // إخفاء الفئات الفارغة
  document.querySelectorAll('.visit-cat').forEach(cat => {
    const visibleItems = Array.from(cat.querySelectorAll('.visit-test-item')).filter(i => i.style.display !== 'none');
    cat.style.display = visibleItems.length > 0 ? '' : 'none';
  });
}

function toggleTestSelection(testId, checkbox) {
  const price = parseFloat(checkbox.dataset.price) || 0;
  const testName = checkbox.dataset.testName;

  if (checkbox.checked) {
    if (!currentVisitTests.includes(testId)) {
      currentVisitTests.push(testId);
      currentVisitTestsData[testId] = { name: testName, price: price };
    }
  } else {
    currentVisitTests = currentVisitTests.filter(id => id !== testId);
    delete currentVisitTestsData[testId];
  }

  // احسب الإجمالي
  let total = 0;
  currentVisitTests.forEach(id => {
    total += currentVisitTestsData[id].price;
  });

  document.getElementById('selectedCount').textContent = currentVisitTests.length;
  document.getElementById('visitTotal').textContent = total.toLocaleString('ar-EG') + ' SDG';
}

// ============ الانتقال لإدخال النتائج ============
async function proceedToResults() {
  try {
    console.log('▶️ بدء إنشاء الزيارة...');
    console.log('التحاليل المختارة:', currentVisitTests);

    if (!currentVisitPatient) {
      alert('❌ لم يتم تحديد المريض');
      return;
    }

    if (currentVisitTests.length === 0) {
      alert('⚠️ الرجاء اختيار تحليل واحد على الأقل');
      return;
    }

    // احسب المجموع
    const subtotal = currentVisitTests.reduce((s, id) => s + (currentVisitTestsData[id]?.price || 0), 0);
    console.log('المجموع:', subtotal);

    // رقم تسلسلي
    console.log('⏳ توليد الرقم التسلسلي...');
    const serial = await getNextSerial('visit');
    console.log('✅ الرقم التسلسلي:', serial);

    // أنشئ الزيارة
    const visitData = {
      patient_id: currentVisitPatient.id,
      serial: serial,
      date: new Date().toISOString(),
      status: 'pending',
      discount: 0,
      discount_reason: null,
      paid: 0,
      notes: '',
      subtotal: subtotal,
      total: subtotal,
      remaining: subtotal,
    };
    console.log('📝 بيانات الزيارة:', visitData);

    console.log('⏳ إضافة الزيارة للقاعدة...');
    const visitId = await dbAdd('visits', visitData);
    console.log('✅ تم إنشاء الزيارة ID:', visitId);

    // أضف تحاليل الزيارة
    console.log('⏳ إضافة التحاليل...');
    for (const testId of currentVisitTests) {
      const vtData = {
        visit_id: visitId,
        test_id: testId,
        price: currentVisitTestsData[testId].price,
        status: 'pending',
      };
      console.log('  → إضافة:', vtData);
      await dbAdd('visit_tests', vtData);
    }
    console.log('✅ تم إضافة كل التحاليل');

    // أغلق المودال وانتقل
    closeInfoModal();
    await showVisitResults(visitId);

  } catch (e) {
    console.error('❌ خطأ في إنشاء الزيارة:', e);
    alert('❌ خطأ: ' + (e.message || e));
  }
}

// ============ عرض صفحة إدخال النتائج ============
async function showVisitResults(visitId) {
  // 🛡️ فحص الصلاحية
  if (typeof hasPermission === 'function' && !hasPermission('results_edit')) {
    alert('⛔ ليس لديك صلاحية إدخال أو تعديل النتائج');
    console.log('🚫 Blocked: user without results_edit permission');
    return;
  }
  
  const visit = await dbGet('visits', visitId);
  if (!visit) return;

  const patient = await dbGet('patients', visit.patient_id);
  const visitTests = await dbGetByIndex('visit_tests', 'visit_id', visitId);

  let html = `
    <div class="alert alert-primary py-2 mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${escapeHtml(patient.name)}</strong>
          <div class="small">${escapeHtml(patient.serial)}</div>
        </div>
        <span class="badge bg-dark" style="font-family:monospace">${visit.serial}</span>
      </div>
    </div>
  `;

  // لكل تحليل
  for (const vt of visitTests) {
    const test = await dbGet('tests', vt.test_id);
    if (!test) continue;

    const params = await dbGetByIndex('parameters', 'test_id', test.id);
    params.sort((a, b) => (a.order || 0) - (b.order || 0));

    const testResults = await dbGetByIndex('results', 'visit_id', visitId);
    const resultFor = {};
    testResults.filter(r => r.test_id === test.id).forEach(r => {
      resultFor[r.param_id] = r.value;
    });

    html += `
      <div class="card mb-2">
        <div class="card-header bg-primary text-white py-2">
          <div class="d-flex justify-content-between">
            <strong style="font-size:0.9rem">${escapeHtml(test.name)}</strong>
            <span class="badge bg-light text-dark">${params.length} معيار</span>
          </div>
        </div>
        <div class="card-body p-2">
    `;

    if (params.length === 0) {
      // تحليل بدون معايير
      html += `
        <div class="mb-2">
          <label class="form-label small fw-bold">النتيجة</label>
          <input type="text" class="form-control form-control-sm result-input" 
                 data-visit="${visitId}" data-test="${test.id}" data-param="0" 
                 dir="ltr" value="${resultFor[0] || ''}">
        </div>
      `;
    } else {
      for (const p of params) {
        const field = `result_${visitId}_${test.id}_${p.id}`;
        const val = resultFor[p.id] || '';

        html += `
          <div class="mb-2">
            <label class="form-label small mb-1">
              <strong>${escapeHtml(p.name)}</strong>
              ${p.unit ? `<span class="text-muted" dir="ltr">(${escapeHtml(p.unit)})</span>` : ''}
              ${getRefDisplay(p) ? `<span class="text-muted small"> • ${escapeHtml(getRefDisplay(p))}</span>` : ''}
            </label>
        `;

        if (p.result_type === 'select' && p.options) {
          const options = p.options.split('|');
          html += `
            <select class="form-select form-select-sm result-input" 
                    data-visit="${visitId}" data-test="${test.id}" data-param="${p.id}">
              <option value="">— اختر —</option>
              ${options.map(opt => `<option value="${escapeHtml(opt)}" ${opt === val ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}
            </select>
          `;
        } else if (p.result_type === 'numeric') {
          html += `
            <input type="number" step="any" class="form-control form-control-sm result-input" 
                   data-visit="${visitId}" data-test="${test.id}" data-param="${p.id}"
                   dir="ltr" value="${escapeHtml(val)}">
          `;
        } else {
          html += `
            <input type="text" class="form-control form-control-sm result-input" 
                   data-visit="${visitId}" data-test="${test.id}" data-param="${p.id}"
                   dir="ltr" value="${escapeHtml(val)}">
          `;
        }

        html += '</div>';
      }
    }

    html += '</div></div>';
  }

  // الفاتورة
  html += `
    <div class="card p-3 mt-2">
      <h6 class="fw-bold mb-2">الفاتورة</h6>
      <div class="d-flex justify-content-between mb-1">
        <span>المجموع:</span>
        <strong>${visit.subtotal.toLocaleString('ar-EG')} SDG</strong>
      </div>
      <div class="mb-2">
        <label class="form-label small">الخصم (حد أقصى 50%)</label>
        <input type="number" class="form-control form-control-sm" id="visitDiscount" 
               value="${visit.discount || 0}" max="${visit.subtotal * 0.5}" 
               oninput="updateVisitTotal(${visitId})">
      </div>
      <div class="mb-2" id="reasonBox" style="${visit.discount > 0 ? '' : 'display:none'}">
        <label class="form-label small">سبب الخصم *</label>
        <input type="text" class="form-control form-control-sm" id="visitReason" 
               value="${escapeHtml(visit.discount_reason || '')}" placeholder="مثال: موظف، قريب...">
      </div>
      <div class="d-flex justify-content-between mb-2 border-top pt-2">
        <strong>الإجمالي:</strong>
        <strong class="text-primary" id="visitTotalDisplay">${visit.total.toLocaleString('ar-EG')} SDG</strong>
      </div>
      <div class="mb-2">
        <label class="form-label small">المدفوع</label>
        <input type="number" class="form-control form-control-sm" id="visitPaid" 
               value="${visit.paid || 0}" oninput="updateVisitTotal(${visitId})">
      </div>
      <div class="d-flex justify-content-between mb-3">
        <span>المتبقي:</span>
        <strong class="text-danger" id="visitRemainingDisplay">${visit.remaining.toLocaleString('ar-EG')} SDG</strong>
      </div>
      <div class="mb-3">
        <label class="form-label small">ملاحظات</label>
        <textarea class="form-control form-control-sm" id="visitNotes" rows="2">${escapeHtml(visit.notes || '')}</textarea>
      </div>
      <button class="btn btn-primary w-100 mb-2" onclick="saveVisitResults(${visitId})">
        <i class="bi bi-save"></i> حفظ النتائج
      </button>
      <div class="d-grid gap-1">
        <button class="btn btn-outline-dark btn-sm" onclick="generateReport(${visitId})">
          <i class="bi bi-printer"></i> طباعة التقرير (A4)
        </button>
        <button class="btn btn-outline-success btn-sm" onclick="generateInvoice(${visitId})">
          <i class="bi bi-receipt"></i> فاتورة 58mm
        </button>
        <button class="btn btn-warning btn-sm" onclick="printViaBluetooth(${visitId})">
          <i class="bi bi-bluetooth"></i> طباعة بلوتوث مباشرة
        </button>
        ${patient.phone ? `<button class="btn btn-success btn-sm" onclick="closeInfoModal(); showNotificationMenu(${visitId})">
          <i class="bi bi-whatsapp"></i> إرسال واتساب
        </button>` : ''}
      </div>
    </div>

    <div class="mt-3 mb-5">
      <button class="btn btn-outline-secondary w-100" onclick="closeInfoModal(); showPage('patients')">
        <i class="bi bi-arrow-right"></i> رجوع للمرضى
      </button>
    </div>
  `;

  showInfoModal(html, 'إدخال النتائج');
  window.currentVisitId = visitId;
}

function getRefDisplay(p) {
  if (p.ref_min !== null && p.ref_min !== undefined && p.ref_max !== null && p.ref_max !== undefined) {
    return `${p.ref_min} - ${p.ref_max}`;
  }
  if (p.ref_min !== null && p.ref_min !== undefined) return `≥ ${p.ref_min}`;
  if (p.ref_max !== null && p.ref_max !== undefined) return `≤ ${p.ref_max}`;
  return p.ref_text || '';
}

function updateVisitTotal(visitId) {
  const discount = parseFloat(document.getElementById('visitDiscount').value) || 0;
  const paid = parseFloat(document.getElementById('visitPaid').value) || 0;

  dbGet('visits', visitId).then(visit => {
    const maxDisc = visit.subtotal * 0.5;
    let finalDisc = discount;

    if (discount > maxDisc) {
      finalDisc = maxDisc;
      document.getElementById('visitDiscount').value = maxDisc;
      alert(`⚠️ الحد الأقصى للخصم 50% = ${maxDisc.toLocaleString('ar-EG')} SDG`);
    }

    const total = visit.subtotal - finalDisc;
    const remaining = total - paid;

    document.getElementById('visitTotalDisplay').textContent = total.toLocaleString('ar-EG') + ' SDG';
    document.getElementById('visitRemainingDisplay').textContent = remaining.toLocaleString('ar-EG') + ' SDG';

    document.getElementById('reasonBox').style.display = finalDisc > 0 ? '' : 'none';
  });
}

// ============ حفظ النتائج ============
async function saveVisitResults(visitId) {
  const visit = await dbGet('visits', visitId);
  if (!visit) return;

  const discount = parseFloat(document.getElementById('visitDiscount').value) || 0;
  const paid = parseFloat(document.getElementById('visitPaid').value) || 0;
  const reason = document.getElementById('visitReason').value.trim();
  const notes = document.getElementById('visitNotes').value.trim();

  const maxDisc = visit.subtotal * 0.5;
  if (discount > maxDisc) {
    alert(`❌ الحد الأقصى للخصم 50% = ${maxDisc.toLocaleString('ar-EG')} SDG`);
    return;
  }

  if (discount > 0 && !reason) {
    alert('❌ يجب تحديد سبب الخصم');
    return;
  }

  const total = visit.subtotal - discount;
  if (paid > total) {
    alert(`❌ المدفوع لا يمكن أن يتجاوز الإجمالي (${total.toLocaleString('ar-EG')} SDG)`);
    return;
  }

  // احذف النتائج القديمة لهذه الزيارة
  const oldResults = await dbGetByIndex('results', 'visit_id', visitId);
  for (const r of oldResults) {
    await dbDelete('results', r.id);
  }

  // احفظ النتائج الجديدة
  const inputs = document.querySelectorAll('.result-input');
  let savedCount = 0;

  for (const input of inputs) {
    const value = input.value.trim();
    if (!value) continue;

    await dbAdd('results', {
      visit_id: visitId,
      test_id: parseInt(input.dataset.test),
      param_id: parseInt(input.dataset.param),
      value: value,
      date: new Date().toISOString(),
    });
    savedCount++;
  }

  // حدّث الزيارة
  visit.discount = discount;
  visit.discount_reason = reason || null;
  visit.paid = paid;
  visit.total = total;
  visit.remaining = total - paid;
  visit.notes = notes;
  visit.status = savedCount > 0 ? 'done' : 'pending';
  visit.updated_at = new Date().toISOString();

  await dbPut('visits', visit);

  // حدّث حالات التحاليل
  const visitTests = await dbGetByIndex('visit_tests', 'visit_id', visitId);
  for (const vt of visitTests) {
    const testResults = await dbGetByIndex('results', 'visit_id', visitId);
    const hasResult = testResults.some(r => r.test_id === vt.test_id);

    vt.status = hasResult ? 'done' : 'pending';
    await dbPut('visit_tests', vt);
  }

  console.log(`✅ تم حفظ ${savedCount} نتيجة`);
  alert('✅ تم حفظ النتائج بنجاح');

  closeInfoModal();
  await loadDashboard();
  await renderPatients();
}

// ============ فتح زيارة موجودة ============
async function openVisit(visitId) {
  await showVisitResults(visitId);
}

// تصدير
window.startNewVisit = startNewVisit;
window.toggleTestSelection = toggleTestSelection;
window.filterVisitTests = filterVisitTests;
window.proceedToResults = proceedToResults;
window.showVisitResults = showVisitResults;
window.updateVisitTotal = updateVisitTotal;
window.saveVisitResults = saveVisitResults;
window.openVisit = openVisit;
window.getRefDisplay = getRefDisplay;
