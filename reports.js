// ============================================================
// KodNaqi — نظام التقارير والفواتير (نسخة نظيفة)

// ═══ Helper: قراءة الهوية الديناميكية ═══
function KN_BRAND() {
  const c = (window.KodNaqiBrand && window.KodNaqiBrand.get()) || {};
  return {
    name: c.labName || 'KodNaqi Diagnostics',
    phone: c.phone || '+249 111 729 111',
    whatsapp: (c.phone || '+249111729111').replace(/\s/g, '').replace('+', ''),
    email: c.email || 'kodnaqi@gmail.com',
    logoData: c.logoData || null
  };
}
// ============================================================

const LAB_INFO = {
  get name_en() { return KN_BRAND().name; },
  name_ar: 'كود نقي للتشخيص',
  tagline_en: 'ACCURATE • RELIABLE • FAST',
  tagline_ar: 'دقة في التحليل... ثقة في النتائج',
  address: 'الخرطوم - السودان',
  get phone() { return KN_BRAND().phone; },
  get whatsapp() { return KN_BRAND().whatsapp; },
  get email() { return KN_BRAND().email; },
};

// ============ Base64 Helpers ============
let _logoBase64Cache = null;
let _stampBase64Cache = null;
let _techSigBase64Cache = null;
let _doctorSigBase64Cache = null;

async function fileToBase64(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) return '';
    const blob = await resp.blob();
    return await new Promise(r => {
      const reader = new FileReader();
      reader.onloadend = () => r(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('fileToBase64 failed:', url, e);
    return '';
  }
}

async function getLogoBase64() {
  if (!_logoBase64Cache) {
    const _customLogo = KN_BRAND().logoData;
    if (_customLogo) { _logoBase64Cache = _customLogo; }
    else { _logoBase64Cache = await fileToBase64('logo.png'); }
  }
  return _logoBase64Cache;
}
async function getStampBase64() {
  if (!_stampBase64Cache) _stampBase64Cache = await fileToBase64('stamp.png');
  return _stampBase64Cache;
}
async function getTechSigBase64() {
  if (!_techSigBase64Cache) _techSigBase64Cache = await fileToBase64('signatures/tech.png');
  return _techSigBase64Cache;
}
async function getDoctorSigBase64() {
  if (!_doctorSigBase64Cache) _doctorSigBase64Cache = await fileToBase64('signatures/doctor.png');
  return _doctorSigBase64Cache;
}

// ============ أدوات مساعدة ============
function getHijriDate(dateInput) {
  try {
    const date = (typeof dateInput === 'string') ? new Date(dateInput) : dateInput;
    try {
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(date);
    } catch(e) {
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(date);
    }
  } catch(e) {
    return '';
  }
}

function evaluateParam(param, value) {
  if (!value || param.result_type !== 'numeric') return 'none';
  const v = parseFloat(value);
  if (isNaN(v)) return 'none';
  if (param.ref_min !== null && param.ref_min !== undefined && v < param.ref_min) return 'low';
  if (param.ref_max !== null && param.ref_max !== undefined && v > param.ref_max) return 'high';
  if (param.ref_min !== null || param.ref_max !== null) return 'normal';
  return 'none';
}

function formatResult(value, evaluation) {
  if (!value) return '<span class="badge-dash">—</span>';
  let cls = '';
  let arrow = '';
  if (evaluation === 'high') { cls = 'val-high'; arrow = ' ↑'; }
  else if (evaluation === 'low') { cls = 'val-low'; arrow = ' ↓'; }
  else if (evaluation === 'normal') { cls = 'val-normal'; }
  return `<span class="${cls}">${escapeHtml(String(value))}${arrow}</span>`;
}

function formatEvaluation(evaluation) {
  if (evaluation === 'high') return '<span class="badge badge-h">HIGH ↑</span>';
  if (evaluation === 'low') return '<span class="badge badge-n">LOW ↓</span>';
  if (evaluation === 'normal') return '<span class="badge badge-o">NORMAL ✓</span>';
  return '<span class="badge-dash">—</span>';
}

function getRefDisplay(p) {
  if (p.ref_min !== null && p.ref_min !== undefined && p.ref_max !== null && p.ref_max !== undefined) {
    return `${p.ref_min} - ${p.ref_max}`;
  }
  if (p.ref_min !== null && p.ref_min !== undefined) return `≥ ${p.ref_min}`;
  if (p.ref_max !== null && p.ref_max !== undefined) return `≤ ${p.ref_max}`;
  return p.ref_text || '';
}

function genderEn(gender) {
  if (gender === 'ذكر') return 'Male';
  if (gender === 'أنثى') return 'Female';
  return gender || '-';
}

// ============ فتح نافذة (متوافق مع PWA) ============
function openNewWindow(url) {
  const w = window.open(url, '_blank');
  if (!w || w.closed || typeof w.closed === 'undefined') {
    console.log('⚠️ window.open محجوب — استخدام طريقة بديلة');
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

// ============ توليد تقرير A4 ============
async function generateReport(visitId) {
  try {
    const logoBase64 = await getLogoBase64();
    const stampBase64 = await getStampBase64();
    const techSigBase64 = await getTechSigBase64();
    const doctorSigBase64 = await getDoctorSigBase64();

    const visit = await dbGet('visits', visitId);
    if (!visit) {
      alert('الزيارة غير موجودة');
      return;
    }

    const patient = await dbGet('patients', visit.patient_id);
    const visitTests = await dbGetByIndex('visit_tests', 'visit_id', visitId);
    const allResults = await dbGetByIndex('results', 'visit_id', visitId);

    const testsData = [];
    for (const vt of visitTests) {
      const test = await dbGet('tests', vt.test_id);
      const params = await dbGetByIndex('parameters', 'test_id', test.id);
      params.sort((a, b) => (a.order || 0) - (b.order || 0));

      const testResults = allResults.filter(r => r.test_id === test.id);
      const resultsMap = {};
      testResults.forEach(r => { resultsMap[r.param_id] = r.value; });

      testsData.push({ test, params, resultsMap });
    }

    const date = new Date(visit.date);
    const dateStr = date.toLocaleDateString('en-GB');
    const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    let html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<title>Report - ${escapeHtml(patient.name)}</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, Tahoma, sans-serif; background: #fff; padding: 15px; color: #111; }
.report { max-width: 800px; margin: 0 auto; border: 2px solid #0b3d91; border-radius: 8px; overflow: hidden; }
.report-header { background: linear-gradient(135deg, #0b3d91, #0d6efd); color: #fff; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.header-left { display: flex; align-items: center; gap: 14px; }
.header-logo { width: 70px; height: 70px; border-radius: 50%; background: #fff; padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-logo img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }
.header-text h1 { font-size: 22px; font-weight: 800; margin: 0; }
.header-text .en { font-size: 10px; letter-spacing: 3px; opacity: .9; margin-top: 3px; }
.header-right { text-align: right; font-size: 11px; line-height: 1.7; }
.info-box { background: #f4f6f9; padding: 14px 20px; border-bottom: 1px solid #dde3eb; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.info-left { display: flex; gap: 20px; flex-wrap: wrap; }
.info-item .label { color: #6c757d; font-size: 10px; text-transform: uppercase; letter-spacing: .8px; font-weight: 600; }
.info-item .value { font-weight: 700; color: #0b3d91; font-size: 14px; margin-top: 2px; }
.info-right { text-align: right; }
.info-right .label { color: #6c757d; font-size: 10px; text-transform: uppercase; letter-spacing: .8px; font-weight: 600; }
.info-right .value { font-weight: 800; color: #0b3d91; font-size: 16px; margin-top: 2px; }
.report-body { padding: 20px; }
.test-block { margin-bottom: 18px; page-break-inside: avoid; }
.test-title { background: #0b3d91; color: #fff; padding: 8px 14px; font-weight: 700; font-size: 13px; border-radius: 6px 6px 0 0; }
table { width: 100%; border-collapse: collapse; }
table th { background: #eef2f7; color: #0b3d91; padding: 8px; font-size: 11px; font-weight: 700; text-align: center; border: 1px solid #dde3eb; text-transform: uppercase; }
table td { padding: 8px; border: 1px solid #dde3eb; font-size: 12px; text-align: center; vertical-align: middle; }
table td.param-name { text-align: left; font-weight: 600; }
table tr:nth-child(even) td { background: #fafbfd; }
.val-normal { color: #198754; font-weight: 700; }
.val-high { color: #dc3545; font-weight: 800; }
.val-low { color: #0dcaf0; font-weight: 800; }
.badge { padding: 3px 9px; border-radius: 10px; font-size: 10px; font-weight: 700; display: inline-block; }
.badge-n { background: #0dcaf0; color: #000; }
.badge-h { background: #dc3545; color: #fff; }
.badge-o { background: #198754; color: #fff; }
.badge-dash { color: #999; }
.signatures { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding-top: 20px; gap: 20px; flex-wrap: wrap; }
.sig-block { text-align: center; flex: 1; min-width: 150px; }
.sig-space { height: 60px; }
.sig-image { max-width: 180px; max-height: 65px; display: block; margin: 0 auto 6px; object-fit: contain; }
.sig-line { border-top: 2px solid #0b3d91; padding-top: 6px; font-size: 11px; color: #0b3d91; font-weight: 700; }
.stamp-block { flex: 0 0 180px; text-align: center; }
.real-stamp { width: 170px; opacity: .85; mix-blend-mode: multiply; transform: rotate(-8deg); }
.report-footer { background: #0b3d91; color: #fff; padding: 10px 20px; font-size: 11px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
.no-print { text-align: center; margin-bottom: 12px; }
.no-print button { padding: 10px 20px; margin: 4px; font-size: 14px; border-radius: 8px; border: none; background: #0d6efd; color: #fff; cursor: pointer; font-weight: 600; }
@media print {
  @page { size: A4 portrait; margin: 8mm; }
  body { padding: 0; }
  .no-print { display: none !important; }
  .report { border: 2px solid #0b3d91 !important; }
  .real-stamp, .sig-image { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
</head>
<body>
<div class="no-print">
  <button onclick="window.print()">🖨️ Print / Save PDF</button>
  <button onclick="window.close()">✖ Close</button>
</div>
<div class="report">
  <div class="report-header">
    <div class="header-left">
      <div class="header-logo"><img src="${logoBase64}" alt="KodNaqi"></div>
      <div class="header-text">
        <h1>${LAB_INFO.name_en}</h1>
        <div class="en">${LAB_INFO.tagline_en}</div>
      </div>
    </div>
    <div class="header-right">
      📍 ${LAB_INFO.address}<br>
      📞 ${LAB_INFO.phone}<br>
      ✉️ ${LAB_INFO.email}
    </div>
  </div>
  <div class="info-box">
    <div class="info-left">
      <div class="info-item"><div class="label">Age</div><div class="value">${patient.age || '-'}</div></div>
      <div class="info-item"><div class="label">Gender</div><div class="value">${genderEn(patient.gender)}</div></div>
      <div class="info-item"><div class="label">Report #</div><div class="value" style="font-family:monospace">${visit.serial}</div></div>
      <div class="info-item"><div class="label">Date (Gregorian)</div><div class="value">${dateStr} ${timeStr}</div></div>
      <div class="info-item"><div class="label">Date (Hijri)</div><div class="value" style="direction:rtl">${getHijriDate(visit.date)}</div></div>
    </div>
    <div class="info-right">
      <div class="label">Patient</div>
      <div class="value" style="direction:rtl;text-align:right">${escapeHtml(patient.name)}</div>
    </div>
  </div>
  <div class="report-body">
`;

    for (const data of testsData) {
      const { test, params, resultsMap } = data;
      html += `<div class="test-block">
      <div class="test-title">${escapeHtml(test.name)}</div>
      <table>
        <thead>
          <tr>
            <th style="width:35%">Test</th>
            <th style="width:20%">Result</th>
            <th style="width:15%">Unit</th>
            <th style="width:15%">Ref. Range</th>
            <th style="width:15%">Assessment</th>
          </tr>
        </thead>
        <tbody>`;

      if (params.length === 0) {
        html += `<tr><td class="param-name">${escapeHtml(test.name)}</td><td colspan="4" class="badge-dash">لا توجد معايير</td></tr>`;
      } else {
        for (const p of params) {
          const val = resultsMap[p.id];
          const evaluation = evaluateParam(p, val);
          html += `<tr>
            <td class="param-name">${escapeHtml(p.name)}</td>
            <td>${formatResult(val, evaluation)}</td>
            <td style="font-size:11px">${escapeHtml(p.unit || '-')}</td>
            <td style="font-size:11px">${escapeHtml(getRefDisplay(p) || '-')}</td>
            <td>${formatEvaluation(evaluation)}</td>
          </tr>`;
        }
      }
      html += '</tbody></table></div>';
    }

    if (visit.notes) {
      html += `<div style="background:#fff8e1;border-left:4px solid #ffc107;padding:11px 15px;border-radius:8px;font-size:12px;margin:14px 0">
        <strong>Notes:</strong> ${escapeHtml(visit.notes)}
      </div>`;
    }

    html += `<div class="signatures">
      <div class="sig-block">
        ${techSigBase64 ? `<img src="${techSigBase64}" class="sig-image" alt="Tech">` : '<div class="sig-space"></div>'}
        <div class="sig-line">TECHNICIAN SIGNATURE</div>
      </div>
      <div class="stamp-block">
        ${stampBase64 ? `<img src="${stampBase64}" class="real-stamp" alt="Stamp">` : ''}
      </div>
      <div class="sig-block">
        ${doctorSigBase64 ? `<img src="${doctorSigBase64}" class="sig-image" alt="Doctor">` : '<div class="sig-space"></div>'}
        <div class="sig-line">DOCTOR / MANAGER SIGNATURE</div>
      </div>
    </div>`;

    html += `
  </div>
  <div class="report-footer">
    <span>Thank you for choosing ${LAB_INFO.name_en}</span>
    <span>📞 ${LAB_INFO.phone}</span>
    <span>✉️ ${LAB_INFO.email}</span>
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    openNewWindow(url);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (err) {
    console.error('generateReport error:', err);
    alert('❌ خطأ في توليد التقرير: ' + err.message);
  }
}

// ============ توليد فاتورة 58mm ============
async function generateInvoice(visitId) {
  try {
    const logoBase64 = await getLogoBase64();

    const visit = await dbGet('visits', visitId);
    if (!visit) return;

    const patient = await dbGet('patients', visit.patient_id);
    const visitTests = await dbGetByIndex('visit_tests', 'visit_id', visitId);

    const date = new Date(visit.date);
    const dateStr = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    let itemsHtml = '';
    let idx = 1;
    for (const vt of visitTests) {
      const test = await dbGet('tests', vt.test_id);
      if (test) {
        itemsHtml += '<tr><td class="name">' + idx + '. ' + escapeHtml(test.name) + '</td><td class="price">' + (vt.price || 0).toLocaleString('en') + '</td></tr>';
        idx++;
      }
    }

    const subtotal = visitTests.reduce((s, vt) => s + (vt.price || 0), 0);
    const discount = visit.discount || 0;
    const total = subtotal - discount;
    const paid = visit.paid || 0;
    const remaining = total - paid;

    // توليد الباركود
    let barcodeSVG = '';
    try {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.display = 'none';
      document.body.appendChild(svg);
      if (typeof JsBarcode !== 'undefined') {
        JsBarcode(svg, visit.serial.replace(/-/g, ''), {
          format: 'CODE128', width: 1.4, height: 40,
          displayValue: true, fontSize: 10, margin: 0, textMargin: 2
        });
        barcodeSVG = svg.outerHTML;
      }
      svg.remove();
    } catch(e) { console.error('Barcode error:', e); }

    // توليد QR
    let qrDataUrl = '';
    const qrText = 'KODNAQI|VISIT:' + visit.serial + '|PATIENT:' + patient.name;
    try {
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);

      if (typeof QRCode !== 'undefined') {
        new QRCode(tempDiv, {
          text: qrText, width: 200, height: 200,
          colorDark: '#000000', colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
        await new Promise(r => setTimeout(r, 300));
        const canvas = tempDiv.querySelector('canvas');
        const img = tempDiv.querySelector('img');
        if (canvas) qrDataUrl = canvas.toDataURL('image/png');
        else if (img && img.src) qrDataUrl = img.src;
        tempDiv.remove();
      }
    } catch(e) { console.error('QR error:', e); }

    const barcodeHtml = barcodeSVG || '<div style="color:#999;font-size:9px">الباركود غير متوفر</div>';
    const qrHtml = qrDataUrl ? '<img src="' + qrDataUrl + '" style="width:80px;height:80px;display:block;margin:0 auto" alt="QR">' : '<div style="color:#999;font-size:9px">QR غير متوفر</div>';

    const html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<title>Invoice ${visit.serial}</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, Tahoma, sans-serif; background: #eee; padding: 10px; }
.receipt { width: 58mm; background: #fff; padding: 4mm 3mm; margin: 0 auto; font-size: 11px; color: #000; }
.center { text-align: center; }
.bold { font-weight: bold; }
.hr { border-top: 1px dashed #000; margin: 5px 0; }
.row { display: flex; justify-content: space-between; margin: 2px 0; }
.logo-wrap { text-align: center; margin-bottom: 4px; }
.logo-wrap img { width: 55px; height: 55px; object-fit: contain; border-radius: 50%; }
.lab-title { text-align: center; font-weight: 800; font-size: 13px; color: #0b3d91; margin-top: 2px; }
.lab-sub { text-align: center; font-size: 8px; color: #666; letter-spacing: 1px; }
.lab-tag { text-align: center; font-size: 9px; color: #0d6efd; font-weight: 600; margin-bottom: 2px; }
.items-table { width: 100%; font-size: 10px; margin: 4px 0; }
.items-table td { padding: 1px 0; }
.items-table .name { text-align: left; width: 65%; }
.items-table .price { text-align: right; width: 35%; }
.total-row { font-size: 13px; font-weight: bold; margin-top: 3px; }
.barcode-wrap { text-align: center; margin-top: 8px; padding: 4px 0; }
.barcode-wrap svg { max-width: 100%; height: 50px; display: block; margin: 0 auto; }
.qr-wrap { text-align: center; margin-top: 4px; padding: 4px 0; }
.footer { text-align: center; font-size: 9px; margin-top: 6px; line-height: 1.5; }
.no-print { text-align: center; margin: 10px auto; }
.no-print button { padding: 10px 18px; margin: 4px; font-size: 13px; cursor: pointer; border-radius: 6px; border: none; background: #0d6efd; color: #fff; font-weight: 600; }
@media print {
  body { background: #fff; padding: 0; }
  .no-print { display: none; }
  @page { size: 58mm auto; margin: 0; }
}
</style>
</head>
<body>
<div class="no-print">
  <button onclick="window.print()">🖨️ طباعة</button>
  <button onclick="window.close()">✖ إغلاق</button>
</div>
<div class="receipt">
  <div class="logo-wrap"><img src="${logoBase64}" alt="KodNaqi"></div>
  <div class="lab-title">${LAB_INFO.name_en}</div>
  <div class="lab-sub">${LAB_INFO.tagline_en}</div>
  <div class="lab-tag">${LAB_INFO.tagline_ar}</div>
  <div class="hr"></div>
  <div class="row"><span>Invoice #:</span><span class="bold">${visit.serial}</span></div>
  <div class="row"><span>Date:</span><span>${dateStr}</span></div>
  <div class="row"><span>Hijri:</span><span style="direction:rtl">${getHijriDate(visit.date)}</span></div>
  <div class="row"><span>Patient:</span><span style="direction:rtl">${escapeHtml(patient.name)}</span></div>
  ${patient.age ? '<div class="row"><span>Age:</span><span>' + patient.age + '</span></div>' : ''}
  ${patient.phone ? '<div class="row"><span>Phone:</span><span>' + escapeHtml(patient.phone) + '</span></div>' : ''}
  <div class="hr"></div>
  <table class="items-table">
    ${itemsHtml || '<tr><td colspan="2" class="center">No tests</td></tr>'}
  </table>
  <div class="hr"></div>
  <div class="row"><span>Subtotal:</span><span>${subtotal.toLocaleString('en')} SDG</span></div>
  ${discount > 0 ? '<div class="row"><span>Discount:</span><span>- ' + discount.toLocaleString('en') + ' SDG</span></div>' : ''}
  ${visit.discount_reason ? '<div class="row" style="font-size:8px;color:#666"><span>Reason:</span><span style="direction:rtl">' + escapeHtml(visit.discount_reason) + '</span></div>' : ''}
  <div class="row total-row"><span>TOTAL:</span><span>${total.toLocaleString('en')} SDG</span></div>
  <div class="row"><span>Paid:</span><span>${paid.toLocaleString('en')} SDG</span></div>
  ${remaining > 0 ? '<div class="row bold" style="color:#dc3545"><span>Remaining:</span><span>' + remaining.toLocaleString('en') + ' SDG</span></div>' : '<div class="row bold center" style="color:#0a0">PAID IN FULL ✓</div>'}
  <div class="hr"></div>
  <div class="barcode-wrap">${barcodeHtml}</div>
  <div class="qr-wrap">
    ${qrHtml}
    <div style="font-size:7px;color:#666;margin-top:2px">Scan to verify</div>
  </div>
  <div class="hr"></div>
  <div class="footer">📞 ${LAB_INFO.phone}<br>📍 ${LAB_INFO.address}<br>✉️ ${LAB_INFO.email}<br><span style="margin-top:3px;display:block">Thank you 🌟</span></div>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    openNewWindow(url);
    setTimeout(() => URL.revokeObjectURL(url), 120000);
  } catch (err) {
    console.error('generateInvoice error:', err);
    alert('❌ خطأ في توليد الفاتورة: ' + err.message);
  }
}

// ============ زر واتساب ============
async function sendWhatsApp(visitId) {
  try {
    const visit = await dbGet('visits', visitId);
    if (!visit) return;

    const patient = await dbGet('patients', visit.patient_id);
    if (!patient.phone) {
      alert('⚠️ لا يوجد رقم هاتف لهذا المريض');
      return;
    }

    const phone = patient.phone.replace(/[+\s\-()]/g, '');

    const message = `عزيزنا ${patient.name}، نتائج تحاليلك جاهزة في ${KN_BRAND().name}.
رقم التقرير: ${visit.serial}

يرجى التواصل معنا لاستلام التقرير.
📞 ${KN_BRAND().phone}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    openNewWindow(url);
  } catch (err) {
    console.error('sendWhatsApp error:', err);
    alert('❌ خطأ في إرسال واتساب: ' + err.message);
  }
}


// ============ طباعة بلوتوث مباشرة (RawBT) ============
async function printViaBluetooth(visitId) {
  try {
    // تحميل المكتبة عند الحاجة
    if (typeof ensureHtml2Canvas === 'function') await ensureHtml2Canvas();
    
    console.log('🖨️ بدء الطباعة المباشرة للزيارة:', visitId);

    const visit = await dbGet('visits', visitId);
    if (!visit) {
      alert('الزيارة غير موجودة');
      return;
    }

    const patient = await dbGet('patients', visit.patient_id);
    const visitTests = await dbGetByIndex('visit_tests', 'visit_id', visitId);

    const date = new Date(visit.date);
    const dateStr = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const hijriDate = getHijriDate(visit.date);

    // احسب الإجماليات
    let itemsHtml = '';
    let idx = 1;
    for (const vt of visitTests) {
      const test = await dbGet('tests', vt.test_id);
      if (test) {
        itemsHtml += '<tr><td class="name">' + idx + '. ' + escapeHtml(test.name) + '</td><td class="price">' + (vt.price || 0).toLocaleString('en') + '</td></tr>';
        idx++;
      }
    }

    const subtotal = visitTests.reduce((s, vt) => s + (vt.price || 0), 0);
    const discount = visit.discount || 0;
    const total = subtotal - discount;
    const paid = visit.paid || 0;
    const remaining = total - paid;

    // احصل على الشعار base64
    const logoBase64 = await getLogoBase64();

    // ابنِ HTML بحجم 58mm
    const html = `
      <div id="receipt-print" dir="ltr" style="width: 384px; padding: 10px 8px; background: #fff; font-family: Tahoma, sans-serif; font-size: 12px; color: #000; line-height: 1.4;">
        <div style="text-align: center; margin-bottom: 8px;">
          ${logoBase64 ? '<img src="' + logoBase64 + '" style="width: 55px; height: 55px; border-radius: 50%;">' : ''}
        </div>
        <div style="text-align: center; font-weight: 800; font-size: 14px; color: #0b3d91;">${KN_BRAND().name}</div>
        <div style="text-align: center; font-size: 9px; color: #666; letter-spacing: 1px;">ACCURATE • RELIABLE • FAST</div>
        <div style="text-align: center; font-size: 10px; color: #0d6efd; font-weight: 600; margin-bottom: 6px;">دقة في التحليل... ثقة في النتائج</div>
        <div style="border-top: 1px dashed #000; margin: 6px 0;"></div>
        <div style="display: flex; justify-content: space-between; font-size: 11px;">
          <span>Invoice #:</span><span style="font-weight: bold;">${visit.serial}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px;">
          <span>Date:</span><span>${dateStr}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px;">
          <span>Hijri:</span><span style="direction: rtl;">${hijriDate}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px;">
          <span>Patient:</span><span style="direction: rtl;">${escapeHtml(patient.name)}</span>
        </div>
        ${patient.age ? '<div style="display: flex; justify-content: space-between; font-size: 11px;"><span>Age:</span><span>' + patient.age + '</span></div>' : ''}
        ${patient.phone ? '<div style="display: flex; justify-content: space-between; font-size: 11px;"><span>Phone:</span><span>' + escapeHtml(patient.phone) + '</span></div>' : ''}
        <div style="border-top: 1px dashed #000; margin: 6px 0;"></div>
        <table style="width: 100%; font-size: 11px;">
          ${itemsHtml || '<tr><td style="text-align: center;">No tests</td></tr>'}
        </table>
        <div style="border-top: 1px dashed #000; margin: 6px 0;"></div>
        <div style="display: flex; justify-content: space-between; font-size: 11px;">
          <span>Subtotal:</span><span>${subtotal.toLocaleString('en')} SDG</span>
        </div>
        ${discount > 0 ? '<div style="display: flex; justify-content: space-between; font-size: 11px;"><span>Discount:</span><span>- ' + discount.toLocaleString('en') + ' SDG</span></div>' : ''}
        ${visit.discount_reason ? '<div style="display: flex; justify-content: space-between; font-size: 9px; color: #666;"><span>Reason:</span><span style="direction: rtl;">' + escapeHtml(visit.discount_reason) + '</span></div>' : ''}
        <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; margin-top: 4px;">
          <span>TOTAL:</span><span>${total.toLocaleString('en')} SDG</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px;">
          <span>Paid:</span><span>${paid.toLocaleString('en')} SDG</span>
        </div>
        ${remaining > 0 ? '<div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; color: #dc3545;"><span>Remaining:</span><span>' + remaining.toLocaleString('en') + ' SDG</span></div>' : '<div style="text-align: center; font-weight: bold; color: #0a0; padding: 4px 0;">PAID IN FULL ✓</div>'}
        <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
        <div style="text-align: center; font-size: 10px;">
          📞 ${KN_BRAND().phone}<br>
          📍 الخرطوم - السودان<br>
          ✉️ ${KN_BRAND().email}<br>
          <span style="margin-top: 4px; display: block;">Thank you 🌟</span>
        </div>
      </div>
    `;

    // أنشئ div مؤقت
    const container = document.createElement('div');
    container.setAttribute('dir', 'ltr');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.direction = 'ltr';
    container.innerHTML = html;
    document.body.appendChild(container);

    // انتظر تحميل الصور
    await new Promise(r => setTimeout(r, 500));

    // حوّل إلى صورة باستخدام html-to-image (يدعم العربية أفضل)
    const imageData = await htmlToImage.toPng(container.firstElementChild, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      skipAutoScale: false,
    });

    // احذف div المؤقت
    document.body.removeChild(container);

    console.log('✅ تم تحويل الفاتورة إلى صورة');

    // افتح RawBT
    const rawbtUrl = 'rawbt:' + imageData;
    
    // افتح بطريقة متوافقة مع PWA
    const a = document.createElement('a');
    a.href = rawbtUrl;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log('✅ تم إرسال الفاتورة إلى RawBT');

  } catch (err) {
    console.error('❌ خطأ في الطباعة:', err);
    alert('❌ فشل الطباعة: ' + err.message + '\n\nتأكد من تثبيت تطبيق RawBT.');
  }
}


// تصدير الدوال
window.generateReport = generateReport;
window.generateInvoice = generateInvoice;
window.sendWhatsApp = sendWhatsApp;
window.printViaBluetooth = printViaBluetooth;
window.LAB_INFO = LAB_INFO;
