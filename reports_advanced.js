// ============================================================
// KodNaqi — التقارير المتقدمة
// ============================================================

var chartRevenue = null;
var chartVisits = null;
var chartCategories = null;
var chartTests = null;

var currentReport = {
  from: null,
  to: null,
  visits: [],
  expenses: [],
  patients: [],
  stats: {}
};

// ============ حساب الفترة ============
function getReportRange(preset) {
  var today = new Date();
  today.setHours(23, 59, 59, 999);
  
  var from = new Date();
  from.setHours(0, 0, 0, 0);
  
  if (preset === 'today') {
    // اليوم
  } else if (preset === 'week') {
    from.setDate(from.getDate() - 6);
  } else if (preset === 'month') {
    from = new Date(today.getFullYear(), today.getMonth(), 1);
  } else if (preset === 'year') {
    from = new Date(today.getFullYear(), 0, 1);
  } else if (preset === '30days') {
    from.setDate(from.getDate() - 29);
  }
  
  return {
    from: from.toISOString().split('T')[0],
    to: today.toISOString().split('T')[0]
  };
}

// ============ تحميل التقرير ============
async function loadReport(preset) {
  var container = document.getElementById('reportContent');
  if (!container) return;
  
  container.innerHTML = '<div class="text-center text-muted py-4"><div class="spinner-border text-primary"></div><div class="mt-2">جاري الحساب...</div></div>';
  
  var range;
  if (preset && typeof preset === 'object') {
    range = preset;
  } else {
    range = getReportRange(preset || 'week');
  }
  
  // حدّث الحقول
  var fromEl = document.getElementById('repFrom');
  var toEl = document.getElementById('repTo');
  if (fromEl) fromEl.value = range.from;
  if (toEl) toEl.value = range.to;
  
  var fromDate = new Date(range.from + 'T00:00:00');
  var toDate = new Date(range.to + 'T23:59:59');
  
  // اجلب البيانات
  var allVisits = await dbGetAll('visits');
  var allExpenses = await dbGetAll('expenses');
  var allPatients = await dbGetAll('patients');
  var allVisitTests = await dbGetAll('visit_tests');
  var allTests = await dbGetAll('tests');
  var allResults = await dbGetAll('results');
  
  // صفِّ حسب الفترة
  var visits = allVisits.filter(function(v) {
    var d = new Date(v.date);
    return d >= fromDate && d <= toDate;
  });
  
  var expenses = allExpenses.filter(function(e) {
    var d = new Date(e.date + 'T12:00:00');
    return d >= fromDate && d <= toDate;
  });
  
  var newPatients = allPatients.filter(function(p) {
    if (!p.created_at) return false;
    var d = new Date(p.created_at);
    return d >= fromDate && d <= toDate;
  });
  
  // احفظ الحالة
  currentReport = {
    from: range.from,
    to: range.to,
    visits: visits,
    expenses: expenses,
    patients: newPatients,
    visitTests: allVisitTests,
    tests: allTests,
    results: allResults
  };
  
  // احسب الإحصائيات
  var invoiced = 0, collected = 0, due = 0;
  for (var i = 0; i < visits.length; i++) {
    invoiced += (visits[i].total || 0);
    collected += (visits[i].paid || 0);
    due += (visits[i].remaining || 0);
  }
  
  var expensesTotal = 0;
  for (var j = 0; j < expenses.length; j++) {
    expensesTotal += (expenses[j].amount || 0);
  }
  
  currentReport.stats = {
    visitsCount: visits.length,
    newPatientsCount: newPatients.length,
    invoiced: invoiced,
    collected: collected,
    due: due,
    expenses: expensesTotal,
    net: collected - expensesTotal,
    avgInvoice: visits.length > 0 ? (invoiced / visits.length) : 0
  };
  
  renderReport();
}

// ============ عرض التقرير ============
function renderReport() {
  var container = document.getElementById('reportContent');
  if (!container) return;
  
  var s = currentReport.stats;
  var from = currentReport.from;
  var to = currentReport.to;
  
  var fmt = function(n) {
    return (n || 0).toLocaleString('en-US');
  };
  
  // بطاقة فترة
  var html = '<div class="alert alert-primary py-2 small mb-3">' +
    '<i class="bi bi-calendar-range"></i> ' +
    '<strong>الفترة:</strong> ' + from + ' → ' + to +
    '</div>';
  
  // 8 بطاقات
  html += '<div class="row g-2 mb-3">';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">الزيارات</div>' +
    '<div class="stat-value fs-4">' + s.visitsCount + '</div></div></div>';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">مرضى جدد</div>' +
    '<div class="stat-value fs-4">' + s.newPatientsCount + '</div></div></div>';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">إجمالي الفواتير</div>' +
    '<div class="stat-value fs-5">' + fmt(s.invoiced) + '</div></div></div>';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">المُحصّل</div>' +
    '<div class="fs-5 fw-bold text-success">' + fmt(s.collected) + '</div></div></div>';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">المتأخرات</div>' +
    '<div class="fs-5 fw-bold text-danger">' + fmt(s.due) + '</div></div></div>';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">المصروفات</div>' +
    '<div class="fs-5 fw-bold text-warning">' + fmt(s.expenses) + '</div></div></div>';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">صافي الربح</div>' +
    '<div class="fs-5 fw-bold ' + (s.net >= 0 ? 'text-success' : 'text-danger') + '">' +
    fmt(s.net) + '</div></div></div>';
  
  html += '<div class="col-6"><div class="card p-2 text-center">' +
    '<div class="small text-muted">متوسط الفاتورة</div>' +
    '<div class="stat-value fs-5">' + fmt(s.avgInvoice) + '</div></div></div>';
  
  html += '</div>';
  
  // زر تصدير Excel
  html += '<button class="btn btn-success w-100 mb-3" onclick="exportAdvancedReport()">' +
    '<i class="bi bi-file-earmark-excel"></i> تصدير التقرير Excel</button>';
  
  // رسوم بيانية
  html += '<div class="card p-3 mb-3">' +
    '<h6 class="fw-bold mb-3"><i class="bi bi-graph-up"></i> الإيراد والمصروفات</h6>' +
    '<canvas id="advRevenueChart" height="120"></canvas></div>';
  
  html += '<div class="card p-3 mb-3">' +
    '<h6 class="fw-bold mb-3"><i class="bi bi-bar-chart"></i> الزيارات اليومية</h6>' +
    '<canvas id="advVisitsChart" height="120"></canvas></div>';
  
  html += '<div class="card p-3 mb-3">' +
    '<h6 class="fw-bold mb-3"><i class="bi bi-pie-chart"></i> توزيع حسب فئة التحليل</h6>' +
    '<canvas id="advCatChart" height="200"></canvas></div>';
  
  html += '<div class="card p-3 mb-3">' +
    '<h6 class="fw-bold mb-3"><i class="bi bi-trophy"></i> أكثر 10 تحاليل طلباً</h6>' +
    '<canvas id="advTestsChart" height="200"></canvas></div>';
  
  // جداول
  html += '<div class="card mb-3">' +
    '<div class="card-header bg-white fw-bold">تفاصيل أكثر التحاليل</div>' +
    '<div id="advTestsTable" class="table-responsive"></div></div>';
  
  container.innerHTML = html;
  
  // ارسم الرسوم
  drawAdvancedCharts();
  renderTestsTable();
}

// ============ الرسوم البيانية ============
function drawAdvancedCharts() {
  // 1) الإيراد اليومي
  var dailyData = {};
  var fromD = new Date(currentReport.from + 'T00:00:00');
  var toD = new Date(currentReport.to + 'T23:59:59');
  
  var d = new Date(fromD);
  while (d <= toD) {
    var key = d.toISOString().split('T')[0];
    dailyData[key] = { visits: 0, revenue: 0, expenses: 0 };
    d.setDate(d.getDate() + 1);
  }
  
  // الزيارات والإيراد
  for (var i = 0; i < currentReport.visits.length; i++) {
    var v = currentReport.visits[i];
    var key = new Date(v.date).toISOString().split('T')[0];
    if (dailyData[key]) {
      dailyData[key].visits += 1;
      dailyData[key].revenue += (v.paid || 0);
    }
  }
  
  // المصروفات
  for (var j = 0; j < currentReport.expenses.length; j++) {
    var e = currentReport.expenses[j];
    var key2 = e.date;
    if (dailyData[key2]) {
      dailyData[key2].expenses += (e.amount || 0);
    }
  }
  
  var labels = Object.keys(dailyData);
  var revenueData = labels.map(function(k) { return dailyData[k].revenue; });
  var expensesData = labels.map(function(k) { return dailyData[k].expenses; });
  var visitsData = labels.map(function(k) { return dailyData[k].visits; });
  
  // اختصر labels (آخر 5 حروف)
  var shortLabels = labels.map(function(l) { return l.substring(5); });
  
  // 1) الإيراد والمصروفات
  if (chartRevenue) chartRevenue.destroy();
  var ctx1 = document.getElementById('advRevenueChart');
  if (ctx1) {
    chartRevenue = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: shortLabels,
        datasets: [
          {
            label: 'إيراد',
            data: revenueData,
            borderColor: '#198754',
            backgroundColor: 'rgba(25,135,84,0.15)',
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 3
          },
          {
            label: 'مصروفات',
            data: expensesData,
            borderColor: '#dc3545',
            backgroundColor: 'rgba(220,53,69,0.1)',
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
  
  // 2) الزيارات اليومية
  if (chartVisits) chartVisits.destroy();
  var ctx2 = document.getElementById('advVisitsChart');
  if (ctx2) {
    chartVisits = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: shortLabels,
        datasets: [{
          label: 'زيارات',
          data: visitsData,
          backgroundColor: 'rgba(13,110,253,0.7)',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });
  }
  
  // 3) توزيع حسب فئة التحليل
  var catData = {};
  var visitTestsInRange = currentReport.visits.map(function(v) { return v.id; });
  
  for (var k = 0; k < currentReport.visitTests.length; k++) {
    var vt = currentReport.visitTests[k];
    if (visitTestsInRange.indexOf(vt.visit_id) === -1) continue;
    
    var test = currentReport.tests.find(function(t) { return t.id === vt.test_id; });
    if (!test) continue;
    
    var cat = test.category || 'أخرى';
    catData[cat] = (catData[cat] || 0) + 1;
  }
  
  if (chartCategories) chartCategories.destroy();
  var ctx3 = document.getElementById('advCatChart');
  if (ctx3) {
    var catLabels = Object.keys(catData);
    var catValues = catLabels.map(function(k) { return catData[k]; });
    
    var colors = ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6f42c1', '#0dcaf0', '#fd7e14', '#e83e8c', '#20c997', '#6c757d'];
    
    chartCategories = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: catValues,
          backgroundColor: colors.slice(0, catLabels.length)
        }]
      },
      options: { responsive: true }
    });
  }
  
  // 4) أكثر التحاليل
  var testData = {};
  for (var m = 0; m < currentReport.visitTests.length; m++) {
    var vt2 = currentReport.visitTests[m];
    if (visitTestsInRange.indexOf(vt2.visit_id) === -1) continue;
    testData[vt2.test_id] = (testData[vt2.test_id] || 0) + 1;
  }
  
  var sortedTests = Object.keys(testData).map(function(tid) {
    var test = currentReport.tests.find(function(t) { return t.id === parseInt(tid); });
    return {
      id: parseInt(tid),
      name: test ? test.name : 'غير معروف',
      count: testData[tid]
    };
  }).sort(function(a, b) { return b.count - a.count; }).slice(0, 10);
  
  if (chartTests) chartTests.destroy();
  var ctx4 = document.getElementById('advTestsChart');
  if (ctx4) {
    chartTests = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: sortedTests.map(function(t) { return t.name; }),
        datasets: [{
          data: sortedTests.map(function(t) { return t.count; }),
          backgroundColor: 'rgba(13,110,253,0.7)',
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });
  }
}

// ============ جدول أكثر التحاليل ============
function renderTestsTable() {
  var container = document.getElementById('advTestsTable');
  if (!container) return;
  
  var visitTestsInRange = currentReport.visits.map(function(v) { return v.id; });
  var testData = {};
  var testPrice = {};
  
  for (var i = 0; i < currentReport.visitTests.length; i++) {
    var vt = currentReport.visitTests[i];
    if (visitTestsInRange.indexOf(vt.visit_id) === -1) continue;
    
    testData[vt.test_id] = (testData[vt.test_id] || 0) + 1;
    if (!testPrice[vt.test_id]) testPrice[vt.test_id] = vt.price || 0;
  }
  
  var sorted = Object.keys(testData).map(function(tid) {
    var test = currentReport.tests.find(function(t) { return t.id === parseInt(tid); });
    return {
      name: test ? test.name : 'غير معروف',
      count: testData[tid],
      price: testPrice[tid],
      total: testData[tid] * testPrice[tid]
    };
  }).sort(function(a, b) { return b.count - a.count; });
  
  if (sorted.length === 0) {
    container.innerHTML = '<div class="text-center text-muted py-3 small">لا توجد بيانات</div>';
    return;
  }
  
  var html = '<table class="table table-sm mb-0">' +
    '<thead class="table-light"><tr>' +
    '<th>#</th><th>التحليل</th><th>العدد</th><th>الإيراد</th>' +
    '</tr></thead><tbody>';
  
  var maxCount = sorted[0].count;
  for (var j = 0; j < sorted.length; j++) {
    var item = sorted[j];
    var percent = (item.count / maxCount) * 100;
    
    html += '<tr>' +
      '<td>' + (j + 1) + '</td>' +
      '<td><strong>' + item.name + '</strong>' +
      '<div style="background:#e9ecef; height:4px; border-radius:2px; margin-top:4px; overflow:hidden;">' +
      '<div style="background:#0d6efd; height:100%; width:' + percent + '%;"></div>' +
      '</div></td>' +
      '<td><span class="badge bg-primary">' + item.count + '</span></td>' +
      '<td>' + item.total.toLocaleString('en-US') + '</td>' +
      '</tr>';
  }
  
  html += '</tbody></table>';
  container.innerHTML = html;
}

// ============ تصدير Excel ============
async function exportAdvancedReport() {
  try {
    // تحميل المكتبة عند الحاجة
    if (typeof ensureXLSX === 'function') await ensureXLSX();
    
    if (typeof XLSX === 'undefined') {
      alert('⚠️ مكتبة Excel غير محمّلة');
      return;
    }
    
    var wb = XLSX.utils.book_new();
    var s = currentReport.stats;
    
    // 1) ورقة الملخص
    var summaryData = [
      [`تقرير ${(window.KodNaqiBrand ? window.KodNaqiBrand.get().labName : 'KodNaqi Diagnostics')}`],
      ['من', currentReport.from],
      ['إلى', currentReport.to],
      [],
      ['البند', 'القيمة'],
      ['الزيارات', s.visitsCount],
      ['المرضى الجدد', s.newPatientsCount],
      ['إجمالي الفواتير', s.invoiced],
      ['المُحصّل', s.collected],
      ['المتأخرات', s.due],
      ['المصروفات', s.expenses],
      ['صافي الربح', s.net],
      ['متوسط الفاتورة', s.avgInvoice]
    ];
    var ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws1, 'الملخص');
    
    // 2) ورقة الزيارات
    var visitsData = [['#', 'المريض', 'التاريخ', 'الإجمالي', 'المدفوع', 'المتبقي']];
    for (var i = 0; i < currentReport.visits.length; i++) {
      var v = currentReport.visits[i];
      var patient = await dbGet('patients', v.patient_id);
      visitsData.push([
        v.serial || v.id,
        patient ? patient.name : 'محذوف',
        new Date(v.date).toLocaleDateString('en-GB'),
        v.total || 0,
        v.paid || 0,
        v.remaining || 0
      ]);
    }
    var ws2 = XLSX.utils.aoa_to_sheet(visitsData);
    XLSX.utils.book_append_sheet(wb, ws2, 'الزيارات');
    
    // 3) ورقة المصروفات
    var expData = [['التاريخ', 'التصنيف', 'الوصف', 'المبلغ']];
    for (var j = 0; j < currentReport.expenses.length; j++) {
      var e = currentReport.expenses[j];
      expData.push([e.date, e.category, e.description || '', e.amount]);
    }
    var ws3 = XLSX.utils.aoa_to_sheet(expData);
    XLSX.utils.book_append_sheet(wb, ws3, 'المصروفات');
    
    // احفظ
    var filename = 'kodnaqi_report_' + currentReport.from + '_to_' + currentReport.to + '.xlsx';
    XLSX.writeFile(wb, filename);
    
    console.log('✅ تم تصدير التقرير');
    alert('✅ تم تصدير التقرير: ' + filename);
    
  } catch (err) {
    console.error('❌ خطأ:', err);
    alert('❌ فشل التصدير: ' + err.message);
  }
}

// ============ تصدير ============
window.loadReport = loadReport;
window.exportAdvancedReport = exportAdvancedReport;
window.getReportRange = getReportRange;

// ============ تطبيق الفترة المخصصة ============
function applyCustomRange() {
  var from = document.getElementById('repFrom').value;
  var to = document.getElementById('repTo').value;
  
  if (!from || !to) {
    alert('⚠️ الرجاء تحديد الفترة');
    return;
  }
  
  if (from > to) {
    alert('⚠️ تاريخ البداية يجب أن يكون قبل النهاية');
    return;
  }
  
  loadReport({ from: from, to: to });
}

window.applyCustomRange = applyCustomRange;
