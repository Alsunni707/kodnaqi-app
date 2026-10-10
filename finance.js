// ============================================================
// KodNaqi — المالية والإحصائيات
// ============================================================

// ============ المالية ============
async function renderFinance() {
  const allVisits = await dbGetAll('visits');
  const allExpenses = await dbGetAll('expenses');

  // احسب الإحصائيات
  let collected = 0, due = 0;
  allVisits.forEach(v => {
    collected += v.paid || 0;
    if (v.remaining > 0) due += v.remaining;
  });

  const totalExpenses = allExpenses.reduce((s, e) => s + (e.amount || 0), 0);
  const net = collected - totalExpenses;

  // اعرض البطاقات
  document.getElementById('finCollected').textContent = collected.toLocaleString('ar-EG') + ' SDG';
  document.getElementById('finDue').textContent = due.toLocaleString('ar-EG') + ' SDG';
  document.getElementById('finExpenses').textContent = totalExpenses.toLocaleString('ar-EG') + ' SDG';
  document.getElementById('finNet').textContent = net.toLocaleString('ar-EG') + ' SDG';

  // أحدث الفواتير
  const recent = [...allVisits].sort((a, b) => b.id - a.id).slice(0, 15);
  document.getElementById('finCount').textContent = allVisits.length;

  const invContainer = document.getElementById('financeInvoices');
  if (recent.length === 0) {
    invContainer.innerHTML = '<div class="text-center text-muted py-3 small">لا توجد فواتير</div>';
  } else {
    let html = '';
    for (const v of recent) {
      const patient = await dbGet('patients', v.patient_id);
      const date = new Date(v.date).toLocaleDateString('ar-EG');
      const remainingClass = v.remaining > 0 ? 'text-danger fw-bold' : 'text-success';
      html += `
        <div class="list-group-item">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="badge bg-primary" style="font-family:monospace;font-size:0.7em">${v.serial}</span>
            <span class="small text-muted">${date}</span>
          </div>
          <div class="small fw-bold">${escapeHtml(patient ? patient.name : 'مريض محذوف')}</div>
          <div class="small">
            <span class="text-success">${(v.paid || 0).toLocaleString('ar-EG')} مدفوع</span>
            ${v.remaining > 0 ? ` — <span class="${remainingClass}">${v.remaining.toLocaleString('ar-EG')} متبقي</span>` : ' — <span class="text-success">✓</span>'}
          </div>
        </div>
      `;
    }
    invContainer.innerHTML = html;
  }

  // المصروفات
  const expContainer = document.getElementById('financeExpenses');
  const recentExp = [...allExpenses].sort((a, b) => b.id - a.id).slice(0, 30);

  if (recentExp.length === 0) {
    expContainer.innerHTML = '<div class="text-center text-muted py-3 small">لا توجد مصروفات</div>';
  } else {
    let html = '';
    for (const e of recentExp) {
      html += `
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <div class="small fw-bold">${escapeHtml(e.category || 'عام')}</div>
            <div class="small text-muted">${escapeHtml(e.description || '')} — ${e.date}</div>
          </div>
          <div class="text-end">
            <div class="text-danger fw-bold">${(e.amount || 0).toLocaleString('ar-EG')} SDG</div>
            <button class="btn btn-sm btn-link text-danger p-0" onclick="deleteExpense(${e.id})">×</button>
          </div>
        </div>
      `;
    }
    expContainer.innerHTML = html;
  }
}

async function addExpense() {
  const date = document.getElementById('expDate').value;
  const category = document.getElementById('expCategory').value;
  const description = document.getElementById('expDesc').value.trim();
  const amount = parseFloat(document.getElementById('expAmount').value);

  if (!amount || amount <= 0) {
    alert('⚠️ المبلغ مطلوب');
    return;
  }

  await dbAdd('expenses', {
    date: date || new Date().toISOString().split('T')[0],
    category: category,
    description: description || null,
    amount: amount,
  });

  document.getElementById('expDesc').value = '';
  document.getElementById('expAmount').value = '';

  if (window.backupNow) await window.backupNow();

  alert('✅ تم حفظ المصروف');
  await renderFinance();
}

async function deleteExpense(id) {
  if (!confirm('حذف المصروف؟')) return;
  await dbDelete('expenses', id);
  if (window.backupNow) await window.backupNow();
  await renderFinance();
}

async function exportFinanceCSV() {
  const visits = await dbGetAll('visits');
  const expenses = await dbGetAll('expenses');
  const patients = await dbGetAll('patients');
  const pMap = {};
  patients.forEach(p => pMap[p.id] = p);

  // CSV الفواتير
  let csv = '\uFEFF'; // BOM للعربية
  csv += 'النوع,الرقم التسلسلي,التاريخ,المريض,الإجمالي,المدفوع,المتبقي\n';

  for (const v of visits) {
    const p = pMap[v.patient_id];
    csv += `فاتورة,${v.serial},${v.date},${p ? p.name : 'محذوف'},${v.total || 0},${v.paid || 0},${v.remaining || 0}\n`;
  }

  csv += '\nالنوع,التاريخ,التصنيف,الوصف,المبلغ\n';
  for (const e of expenses) {
    csv += `مصروف,${e.date},${e.category},${e.description || ''},${e.amount}\n`;
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kodnaqi_finance_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert('✅ تم تصدير الملف');
}

// ============ الإحصائيات ============
let weekChartInstance = null;
let revenueChartInstance = null;
let testsChartInstance = null;
let genderChartInstance = null;

async function renderStats() {
  const patients = await dbGetAll('patients');
  const visits = await dbGetAll('visits');
  const visitTests = await dbGetAll('visit_tests');
  const tests = await dbGetAll('tests');

  // بطاقات
  document.getElementById('statsPatients').textContent = patients.length;
  document.getElementById('statsVisits').textContent = visits.length;

  const totalRevenue = visits.reduce((s, v) => s + (v.paid || 0), 0);
  document.getElementById('statsRevenue').textContent = totalRevenue.toLocaleString('ar-EG');

  // هذا الشهر
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthVisits = visits.filter(v => new Date(v.date) >= monthStart);
  const monthRevenue = monthVisits.reduce((s, v) => s + (v.paid || 0), 0);
  document.getElementById('statsMonth').textContent = monthRevenue.toLocaleString('ar-EG');

  // آخر 7 أيام
  const days = [];
  const dayLabels = [];
  const dayCounts = [];
  const dayRevenue = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);

    const nextDay = new Date(d);
    nextDay.setDate(nextDay.getDate() + 1);

    const dayVisits = visits.filter(v => {
      const vd = new Date(v.date);
      return vd >= d && vd < nextDay;
    });

    dayLabels.push(d.toLocaleDateString('ar-EG', { weekday: 'short' }));
    dayCounts.push(dayVisits.length);
    dayRevenue.push(dayVisits.reduce((s, v) => s + (v.paid || 0), 0));
  }

  // Chart 1: زيارات
  if (weekChartInstance) weekChartInstance.destroy();
  weekChartInstance = new Chart(document.getElementById('weekChart'), {
    type: 'bar',
    data: {
      labels: dayLabels,
      datasets: [{
        label: 'زيارات',
        data: dayCounts,
        backgroundColor: 'rgba(13,110,253,0.7)',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });

  // Chart 2: إيراد
  if (revenueChartInstance) revenueChartInstance.destroy();
  revenueChartInstance = new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
      labels: dayLabels,
      datasets: [{
        label: 'إيراد (SDG)',
        data: dayRevenue,
        borderColor: '#198754',
        backgroundColor: 'rgba(25,135,84,0.15)',
        fill: true,
        tension: 0.35,
        borderWidth: 3,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Chart 3: أكثر التحاليل
  const testCount = {};
  visitTests.forEach(vt => {
    testCount[vt.test_id] = (testCount[vt.test_id] || 0) + 1;
  });

  const sortedTests = Object.entries(testCount)
    .map(([tid, cnt]) => ({ name: (tests.find(t => t.id == tid) || {}).name || 'محذوف', count: cnt }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  if (testsChartInstance) testsChartInstance.destroy();
  testsChartInstance = new Chart(document.getElementById('testsChart'), {
    type: 'bar',
    data: {
      labels: sortedTests.map(t => t.name),
      datasets: [{
        label: 'عدد الطلبات',
        data: sortedTests.map(t => t.count),
        backgroundColor: 'rgba(11,61,145,0.7)',
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

  // Chart 4: الجنس
  const maleCount = patients.filter(p => p.gender === 'ذكر').length;
  const femaleCount = patients.filter(p => p.gender === 'أنثى').length;

  if (genderChartInstance) genderChartInstance.destroy();
  genderChartInstance = new Chart(document.getElementById('genderChart'), {
    type: 'doughnut',
    data: {
      labels: ['ذكور', 'إناث'],
      datasets: [{
        data: [maleCount, femaleCount],
        backgroundColor: ['#0d6efd', '#e83e8c']
      }]
    },
    options: { responsive: true }
  });
}

// تصدير
window.renderFinance = renderFinance;
window.addExpense = addExpense;
window.deleteExpense = deleteExpense;
window.exportFinanceCSV = exportFinanceCSV;
window.renderStats = renderStats;
