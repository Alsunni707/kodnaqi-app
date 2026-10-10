// ============================================================
// KodNaqi — السجل الطبي للمريض
// ============================================================

var medChart = null;

// ============ فتح الملف الطبي ============
async function openMedicalRecord(patientId) {
  var patient = await dbGet('patients', patientId);
  if (!patient) {
    alert('المريض غير موجود');
    return;
  }
  
  var container = document.getElementById('medicalRecordContent');
  if (!container) return;
  
  // رسالة تحميل
  container.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-primary"></div></div>';
  
  // اعرض صفحة الملف الطبي
  showPage('medical-record');
  
  // احفظ الـ ID الحالي
  window.currentMedicalPatientId = patientId;
  
  // اعرض المعلومات
  await renderMedicalContent(patientId);
}

// ============ عرض المحتوى ============
async function renderMedicalContent(patientId) {
  var patient = await dbGet('patients', patientId);
  if (!patient) return;
  
  var container = document.getElementById('medicalRecordContent');
  if (!container) return;
  
  var visits = await dbGetByIndex('visits', 'patient_id', patientId);
  visits.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
  
  var html = '';
  
  // ===== بطاقة المريض =====
  html += '<div class="card p-3 mb-3">' +
    '<div class="d-flex justify-content-between align-items-start">' +
    '<div>' +
    '<span class="badge bg-dark mb-1" style="font-family:monospace">' + (patient.serial || '#' + patient.id) + '</span>' +
    '<h5 class="fw-bold mb-0">' + escapeHtml(patient.name) + '</h5>' +
    '</div>' +
    '<button class="btn btn-sm btn-outline-primary" onclick="closeInfoModal(); editPatient(' + patient.id + ')">' +
    '<i class="bi bi-pencil"></i></button>' +
    '</div>' +
    '<div class="row text-center mt-2 small">' +
    '<div class="col-3"><strong>' + (patient.age || '-') + '</strong><div class="text-muted">العمر</div></div>' +
    '<div class="col-3"><strong>' + (patient.gender || '-') + '</strong><div class="text-muted">الجنس</div></div>' +
    '<div class="col-3"><strong>' + (patient.phone || '-') + '</strong><div class="text-muted">الهاتف</div></div>' +
    '<div class="col-3"><strong>' + visits.length + '</strong><div class="text-muted">زيارة</div></div>' +
    '</div>' +
    '</div>';
  
  // ===== الملف الطبي =====
  var med = patient.medical || {};
  
  html += '<div class="card p-3 mb-3">' +
    '<div class="d-flex justify-content-between align-items-center mb-2">' +
    '<h6 class="fw-bold mb-0"><i class="bi bi-heart-pulse text-danger"></i> الملف الطبي</h6>' +
    '<button class="btn btn-sm btn-outline-primary" onclick="showMedicalEditModal(' + patientId + ')">' +
    '<i class="bi bi-pencil"></i> تعديل</button>' +
    '</div>';
  
  // تحقق من وجود بيانات
  var hasData = med.bloodType || med.allergies || med.chronic || med.medications ||
                med.surgeries || med.familyHistory || med.smoking;
  
  if (!hasData) {
    html += '<div class="alert alert-light small text-center py-2 mb-0">' +
      'لم يتم إدخال بيانات طبية بعد — اضغط "تعديل" لإضافة' +
      '</div>';
  } else {
    html += '<div class="row g-2 small">';
    
    if (med.bloodType) {
      html += '<div class="col-6"><div class="p-2 bg-light rounded">' +
        '<div class="text-muted" style="font-size:11px">🩸 فصيلة الدم</div>' +
        '<strong>' + escapeHtml(med.bloodType) + '</strong>' +
        '</div></div>';
    }
    
    if (med.smoking) {
      html += '<div class="col-6"><div class="p-2 bg-light rounded">' +
        '<div class="text-muted" style="font-size:11px">🚬 التدخين</div>' +
        '<strong>' + escapeHtml(med.smoking) + '</strong>' +
        '</div></div>';
    }
    
    if (med.allergies) {
      html += '<div class="col-12"><div class="p-2 rounded" style="background:#fff3cd">' +
        '<div class="text-muted" style="font-size:11px">⚠️ حساسية</div>' +
        '<strong>' + escapeHtml(med.allergies) + '</strong>' +
        '</div></div>';
    }
    
    if (med.chronic) {
      html += '<div class="col-12"><div class="p-2 rounded" style="background:#f8d7da">' +
        '<div class="text-muted" style="font-size:11px">💊 أمراض مزمنة</div>' +
        '<strong>' + escapeHtml(med.chronic) + '</strong>' +
        '</div></div>';
    }
    
    if (med.medications) {
      html += '<div class="col-12"><div class="p-2 rounded" style="background:#cfe2ff">' +
        '<div class="text-muted" style="font-size:11px">💉 أدوية حالية</div>' +
        '<strong>' + escapeHtml(med.medications) + '</strong>' +
        '</div></div>';
    }
    
    if (med.surgeries) {
      html += '<div class="col-12"><div class="p-2 bg-light rounded">' +
        '<div class="text-muted" style="font-size:11px">🏥 عمليات سابقة</div>' +
        '<strong>' + escapeHtml(med.surgeries) + '</strong>' +
        '</div></div>';
    }
    
    if (med.familyHistory) {
      html += '<div class="col-12"><div class="p-2 bg-light rounded">' +
        '<div class="text-muted" style="font-size:11px">👨‍👩‍👧 تاريخ عائلي</div>' +
        '<strong>' + escapeHtml(med.familyHistory) + '</strong>' +
        '</div></div>';
    }
    
    if (med.notes) {
      html += '<div class="col-12"><div class="p-2 bg-light rounded">' +
        '<div class="text-muted" style="font-size:11px">📝 ملاحظات</div>' +
        '<strong>' + escapeHtml(med.notes) + '</strong>' +
        '</div></div>';
    }
    
    html += '</div>';
  }
  
  html += '</div>';
  
  // ===== مقارنة النتائج =====
  html += '<div class="card p-3 mb-3">' +
    '<h6 class="fw-bold mb-2"><i class="bi bi-graph-up text-primary"></i> مقارنة النتائج عبر الزمن</h6>' +
    '<div class="mb-2">' +
    '<input type="text" id="medParamSearch" class="form-control form-control-sm" ' +
    'placeholder="🔍 ابحث عن معيار (مثل Hb, WBC...)" oninput="searchMedParams()">' +
    '</div>' +
    '<div id="medParamResults" class="mb-2" style="max-height:200px; overflow-y:auto;"></div>' +
    '<div id="medChartBox" style="display:none">' +
    '<canvas id="medChart" height="150"></canvas>' +
    '</div>' +
    '</div>';
  
  // ===== التايم لاين =====
  html += '<div class="card mb-3">' +
    '<div class="card-header bg-white fw-bold">' +
    '<i class="bi bi-clock-history"></i> تاريخ الزيارات (' + visits.length + ')</div>';
  
  if (visits.length === 0) {
    html += '<div class="text-center text-muted py-3 small">لا توجد زيارات</div>';
  } else {
    html += '<div class="list-group list-group-flush">';
    
    for (var i = 0; i < visits.length; i++) {
      var v = visits[i];
      var vTests = await dbGetByIndex('visit_tests', 'visit_id', v.id);
      var d = new Date(v.date);
      var dateStr = d.toLocaleDateString('ar-EG') + ' ' + 
        d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
      
      html += '<div class="list-group-item">' +
        '<div class="d-flex justify-content-between align-items-center mb-1">' +
        '<span class="badge bg-primary" style="font-family:monospace;font-size:0.7em">' + (v.serial || '#' + v.id) + '</span>' +
        '<span class="text-muted small">' + dateStr + '</span>' +
        '</div>' +
        '<div class="small">' +
        '<strong>' + vTests.length + '</strong> تحليل — ' +
        '<span class="text-success">' + (v.paid || 0) + ' SDG</span> مدفوع' +
        (v.remaining > 0 ? ' — <span class="text-danger">' + v.remaining + ' SDG</span> متبقي' : '') +
        '</div>' +
        '<div class="mt-1">' +
        '<button class="btn btn-sm btn-outline-primary" onclick="closeInfoModal(); openVisit(' + v.id + ')">' +
        'عرض النتائج</button>' +
        '</div>' +
        '</div>';
    }
    
    html += '</div>';
  }
  
  html += '</div>';
  
  // ===== زر رجوع =====
  html += '<button class="btn btn-secondary w-100 mb-3" onclick="closeInfoModal(); openPatient(' + patientId + ')">' +
    '<i class="bi bi-arrow-right"></i> رجوع لملف المريض</button>';
  
  container.innerHTML = html;
}

// ============ تعديل الملف الطبي ============
async function showMedicalEditModal(patientId) {
  var patient = await dbGet('patients', patientId);
  if (!patient) return;
  
  var med = patient.medical || {};
  
  var html = '<form id="medForm" autocomplete="off" onsubmit="event.preventDefault(); saveMedicalProfile(' + patientId + '); return false;">' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">🩸 فصيلة الدم</label>' +
    '<select name="bloodType" class="form-select">' +
    '<option value="">— اختر —</option>' +
    '<option value="A+"' + (med.bloodType === 'A+' ? ' selected' : '') + '>A+</option>' +
    '<option value="A-"' + (med.bloodType === 'A-' ? ' selected' : '') + '>A-</option>' +
    '<option value="B+"' + (med.bloodType === 'B+' ? ' selected' : '') + '>B+</option>' +
    '<option value="B-"' + (med.bloodType === 'B-' ? ' selected' : '') + '>B-</option>' +
    '<option value="AB+"' + (med.bloodType === 'AB+' ? ' selected' : '') + '>AB+</option>' +
    '<option value="AB-"' + (med.bloodType === 'AB-' ? ' selected' : '') + '>AB-</option>' +
    '<option value="O+"' + (med.bloodType === 'O+' ? ' selected' : '') + '>O+</option>' +
    '<option value="O-"' + (med.bloodType === 'O-' ? ' selected' : '') + '>O-</option>' +
    '</select></div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">⚠️ حساسية</label>' +
    '<textarea name="allergies" class="form-control" rows="2" placeholder="مثال: حساسية من البنسلين">' + escapeHtml(med.allergies || '') + '</textarea>' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">💊 أمراض مزمنة</label>' +
    '<textarea name="chronic" class="form-control" rows="2" placeholder="مثال: سكري، ضغط">' + escapeHtml(med.chronic || '') + '</textarea>' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">💉 أدوية حالية</label>' +
    '<textarea name="medications" class="form-control" rows="2" placeholder="مثال: Metformin 500mg">' + escapeHtml(med.medications || '') + '</textarea>' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">🚬 التدخين</label>' +
    '<select name="smoking" class="form-select">' +
    '<option value="">— اختر —</option>' +
    '<option value="لا يدخن"' + (med.smoking === 'لا يدخن' ? ' selected' : '') + '>لا يدخن</option>' +
    '<option value="مدخن"' + (med.smoking === 'مدخن' ? ' selected' : '') + '>مدخن</option>' +
    '<option value="مدخن سابق"' + (med.smoking === 'مدخن سابق' ? ' selected' : '') + '>مدخن سابق</option>' +
    '</select></div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">🏥 عمليات سابقة</label>' +
    '<textarea name="surgeries" class="form-control" rows="2">' + escapeHtml(med.surgeries || '') + '</textarea>' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">👨‍👩‍👧 تاريخ عائلي</label>' +
    '<textarea name="familyHistory" class="form-control" rows="2" placeholder="مثال: سكري في العائلة">' + escapeHtml(med.familyHistory || '') + '</textarea>' +
    '</div>' +
    '<div class="mb-3">' +
    '<label class="form-label small fw-bold">📝 ملاحظات</label>' +
    '<textarea name="medNotes" class="form-control" rows="2">' + escapeHtml(med.notes || '') + '</textarea>' +
    '</div>' +
    '<div class="d-grid gap-2">' +
    '<button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> حفظ</button>' +
    '<button type="button" class="btn btn-outline-secondary" onclick="closeInfoModal()">إلغاء</button>' +
    '</div>' +
    '</form>';
  
  showInfoModal(html, '📝 تعديل الملف الطبي');
}

async function saveMedicalProfile(patientId) {
  var patient = await dbGet('patients', patientId);
  if (!patient) return;
  
  var form = document.getElementById('medForm');
  if (!form) return;
  
  patient.medical = {
    bloodType: form.querySelector('[name="bloodType"]').value,
    allergies: form.querySelector('[name="allergies"]').value.trim(),
    chronic: form.querySelector('[name="chronic"]').value.trim(),
    medications: form.querySelector('[name="medications"]').value.trim(),
    smoking: form.querySelector('[name="smoking"]').value,
    surgeries: form.querySelector('[name="surgeries"]').value.trim(),
    familyHistory: form.querySelector('[name="familyHistory"]').value.trim(),
    notes: form.querySelector('[name="medNotes"]').value.trim(),
    updatedAt: new Date().toISOString()
  };
  
  await dbPut('patients', patient);
  console.log('✅ تم حفظ الملف الطبي');
  alert('✅ تم حفظ الملف الطبي');
  closeInfoModal();
  
  if (window.backupNow) setTimeout(function() { window.backupNow(); }, 500);
  
  await renderMedicalContent(patientId);
}

// ============ البحث عن معيار ============
async function searchMedParams() {
  var input = document.getElementById('medParamSearch');
  var resultsEl = document.getElementById('medParamResults');
  if (!input || !resultsEl) return;
  
  var query = input.value.trim().toLowerCase();
  if (!query) {
    resultsEl.innerHTML = '';
    return;
  }
  
  var params = await dbGetAll('parameters');
  var tests = await dbGetAll('tests');
  
  // ابحث
  var matches = params.filter(function(p) {
    return p.name.toLowerCase().includes(query) || 
           (p.name_ar && p.name_ar.includes(query));
  }).slice(0, 15);
  
  if (matches.length === 0) {
    resultsEl.innerHTML = '<div class="text-muted small text-center py-2">لا نتائج</div>';
    return;
  }
  
  var html = '<div class="list-group list-group-flush small">';
  for (var i = 0; i < matches.length; i++) {
    var p = matches[i];
    var test = tests.find(function(t) { return t.id === p.test_id; });
    html += '<button type="button" class="list-group-item list-group-item-action py-1" ' +
      'onclick="renderMedChart(' + p.id + ')">' +
      '<strong>' + escapeHtml(p.name) + '</strong>' +
      (p.name_ar ? ' <span class="text-muted">— ' + escapeHtml(p.name_ar) + '</span>' : '') +
      (test ? ' <span class="badge bg-light text-dark" style="font-size:9px">' + escapeHtml(test.name) + '</span>' : '') +
      '</button>';
  }
  html += '</div>';
  resultsEl.innerHTML = html;
}

// ============ رسم المقارنة ============
async function renderMedChart(paramId) {
  var patientId = window.currentMedicalPatientId;
  if (!patientId) return;
  
  var param = await dbGet('parameters', paramId);
  if (!param) return;
  
  // اجلب كل زيارات المريض
  var visits = await dbGetByIndex('visits', 'patient_id', patientId);
  visits.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });
  
  // اجلب النتائج
  var points = [];
  for (var i = 0; i < visits.length; i++) {
    var v = visits[i];
    var results = await dbGetByIndex('results', 'visit_id', v.id);
    var r = results.find(function(x) { return x.param_id === paramId; });
    if (r && r.value) {
      var numVal = parseFloat(r.value);
      if (!isNaN(numVal)) {
        points.push({
          date: new Date(v.date).toLocaleDateString('en-GB'),
          value: numVal,
          raw: r.value
        });
      }
    }
  }
  
  if (points.length === 0) {
    document.getElementById('medParamResults').innerHTML = 
      '<div class="alert alert-warning small py-2">لا توجد نتائج لهذا المعيار لهذا المريض</div>';
    document.getElementById('medChartBox').style.display = 'none';
    return;
  }
  
  // اعرض الرسم
  document.getElementById('medChartBox').style.display = 'block';
  document.getElementById('medParamResults').innerHTML = 
    '<div class="alert alert-success small py-2">' +
    '<i class="bi bi-check-circle"></i> ' + points.length + ' قياس لـ <strong>' + param.name + '</strong>' +
    '</div>';
  
  var labels = points.map(function(p) { return p.date; });
  var values = points.map(function(p) { return p.value; });
  
  // خط الحد الأدنى والأعلى
  var minLine = param.ref_min !== null && param.ref_min !== undefined ? 
    new Array(labels.length).fill(param.ref_min) : null;
  var maxLine = param.ref_max !== null && param.ref_max !== undefined ? 
    new Array(labels.length).fill(param.ref_max) : null;
  
  if (medChart) medChart.destroy();
  
  var datasets = [{
    label: param.name + (param.unit ? ' (' + param.unit + ')' : ''),
    data: values,
    borderColor: '#0d6efd',
    backgroundColor: 'rgba(13,110,253,0.15)',
    borderWidth: 3,
    tension: 0.3,
    pointRadius: 6,
    pointBackgroundColor: '#0d6efd',
    fill: false
  }];
  
  if (minLine) {
    datasets.push({
      label: 'الحد الأدنى',
      data: minLine,
      borderColor: '#0dcaf0',
      borderWidth: 1,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false
    });
  }
  
  if (maxLine) {
    datasets.push({
      label: 'الحد الأعلى',
      data: maxLine,
      borderColor: '#dc3545',
      borderWidth: 1,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false
    });
  }
  
  medChart = new Chart(document.getElementById('medChart'), {
    type: 'line',
    data: { labels: labels, datasets: datasets },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: { y: { beginAtZero: false } }
    }
  });
}

// ============ تصدير ============
window.openMedicalRecord = openMedicalRecord;
window.renderMedicalContent = renderMedicalContent;
window.showMedicalEditModal = showMedicalEditModal;
window.saveMedicalProfile = saveMedicalProfile;
window.searchMedParams = searchMedParams;
window.renderMedChart = renderMedChart;
