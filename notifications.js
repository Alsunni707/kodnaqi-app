// ============================================================
// KodNaqi — نظام الإشعارات WhatsApp
// ============================================================

// ============ قوالب الرسائل ============
const NOTIFICATION_TEMPLATES = {
  'ready': {
    name: 'نتائج جاهزة',
    icon: '✅',
    build: function(patient, visit) {
      var dateStr = new Date(visit.date).toLocaleDateString('ar-EG');
      return 'عزيزنا ' + patient.name + '،\n\n' +
        'نتائج تحاليلك جاهزة في *KodNaqi Diagnostics* ✅\n\n' +
        '📋 رقم التقرير: *' + visit.serial + '*\n' +
        '📅 التاريخ: ' + dateStr + '\n\n' +
        'يرجى التواصل معنا لاستلام التقرير أو نرسله لك.\n\n' +
        '📞 +249111729111\n' +
        '📍 الخرطوم - السودان\n\n' +
        'شكراً لثقتكم 🌟';
    }
  },
  'reminder': {
    name: 'تذكير بالاستلام',
    icon: '⏰',
    build: function(patient, visit) {
      var dateStr = new Date(visit.date).toLocaleDateString('ar-EG');
      return 'عزيزنا ' + patient.name + '،\n\n' +
        'نودّ تذكيرك بأن نتائج تحاليلك لا تزال في انتظارك 📋\n\n' +
        '📋 رقم التقرير: *' + visit.serial + '*\n' +
        '📅 تاريخ التحليل: ' + dateStr + '\n\n' +
        'يرجى المرور لاستلامها.\n\n' +
        '📞 +249111729111\n' +
        '📍 الخرطوم - السودان';
    }
  },
  'abnormal': {
    name: 'نتائج تحتاج مراجعة',
    icon: '⚠️',
    build: function(patient, visit) {
      var dateStr = new Date(visit.date).toLocaleDateString('ar-EG');
      return 'عزيزنا ' + patient.name + '،\n\n' +
        'نتائج تحاليلك جاهزة، وبعض القيم تحتاج مراجعة الطبيب ⚠️\n\n' +
        '📋 رقم التقرير: *' + visit.serial + '*\n' +
        '📅 التاريخ: ' + dateStr + '\n\n' +
        'يرجى التواصل معنا بأسرع وقت.\n\n' +
        '📞 +249111729111\n' +
        '📍 الخرطوم - السودان\n\n' +
        'نتمنى لك الشفاء العاجل 🌟';
    }
  },
  'appointment': {
    name: 'تذكير بموعد',
    icon: '📅',
    build: function(patient, visit) {
      var dateStr = new Date(visit.date).toLocaleDateString('ar-EG');
      return 'عزيزنا ' + patient.name + '،\n\n' +
        'نودّ تذكيرك بموعدك معنا 📅\n\n' +
        '📅 الموعد: ' + dateStr + '\n\n' +
        'يرجى الحضور في الوقت المحدد.\n\n' +
        '📞 +249111729111\n' +
        '📍 الخرطوم - السودان';
    }
  },
  'thanks': {
    name: 'شكر وتقدير',
    icon: '💚',
    build: function(patient, visit) {
      return 'عزيزنا ' + patient.name + '،\n\n' +
        'شكراً لثقتك بـ *KodNaqi Diagnostics* 💚\n\n' +
        'نتائجك جاهزة، ونتمنى لك دوام الصحة والعافية.\n\n' +
        '📞 +249111729111\n' +
        '📍 الخرطوم - السودان';
    }
  }
};

// ============ فتح نافذة (متوافق PWA) ============
function openNotificationWindow(url) {
  var w = window.open(url, '_blank');
  if (!w || w.closed || typeof w.closed === 'undefined') {
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

// ============ إرسال إشعار ============
async function sendNotification(visitId, templateKey) {
  try {
    var visit = await dbGet('visits', visitId);
    if (!visit) {
      alert('الزيارة غير موجودة');
      return false;
    }

    var patient = await dbGet('patients', visit.patient_id);
    if (!patient.phone) {
      alert('⚠️ لا يوجد رقم هاتف لهذا المريض');
      return false;
    }

    var template = NOTIFICATION_TEMPLATES[templateKey];
    if (!template) {
      alert('⚠️ القالب غير موجود');
      return false;
    }

    var message = template.build(patient, visit);
    var phone = patient.phone.replace(/[+\s\-()]/g, '');
    var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);

    openNotificationWindow(url);

    // سجّل الإشعار
    await dbAdd('notifications', {
      visit_id: visitId,
      patient_id: patient.id,
      patient_name: patient.name,
      phone: patient.phone,
      template: templateKey,
      template_name: template.name,
      message: message,
      sent_at: new Date().toISOString(),
      status: 'sent'
    });

    console.log('✅ تم إرسال وتسجيل الإشعار');

    if (window.backupNow) {
      setTimeout(function() { window.backupNow(); }, 1000);
    }

    return true;

  } catch (err) {
    console.error('❌ خطأ في الإرسال:', err);
    alert('❌ فشل الإرسال: ' + err.message);
    return false;
  }
}

// ============ قائمة القوالب ============
async function showNotificationMenu(visitId) {
  var visit = await dbGet('visits', visitId);
  if (!visit) return;

  var patient = await dbGet('patients', visit.patient_id);
  if (!patient.phone) {
    alert('⚠️ لا يوجد رقم هاتف لهذا المريض');
    return;
  }

  var html = '<div class="alert alert-primary py-2 mb-3">' +
    '<div class="d-flex justify-content-between align-items-center">' +
    '<div>' +
    '<strong>' + escapeHtml(patient.name) + '</strong>' +
    '<div class="small text-muted">📱 ' + escapeHtml(patient.phone) + '</div>' +
    '</div>' +
    '<span class="badge bg-dark" style="font-family:monospace">' + visit.serial + '</span>' +
    '</div></div>' +
    '<h6 class="fw-bold mb-2">📝 اختر قالب الرسالة:</h6>' +
    '<div class="list-group">';

  var keys = Object.keys(NOTIFICATION_TEMPLATES);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var tpl = NOTIFICATION_TEMPLATES[key];
    html += '<button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" ' +
      'onclick="previewNotification(' + visitId + ', \'' + key + '\')">' +
      '<div><span style="font-size:1.5em">' + tpl.icon + '</span>' +
      '<strong class="ms-2">' + tpl.name + '</strong></div>' +
      '<i class="bi bi-chevron-left"></i>' +
      '</button>';
  }

  html += '</div>' +
    '<div class="mt-3">' +
    '<button class="btn btn-outline-secondary w-100" onclick="showNotificationHistory(' + visitId + ')">' +
    '<i class="bi bi-clock-history"></i> سجل الإشعارات السابقة</button>' +
    '</div>';

  showInfoModal(html, '📱 إشعار WhatsApp');
}

// ============ معاينة الرسالة ============
async function previewNotification(visitId, templateKey) {
  var visit = await dbGet('visits', visitId);
  var patient = await dbGet('patients', visit.patient_id);
  var template = NOTIFICATION_TEMPLATES[templateKey];
  var message = template.build(patient, visit);

  var safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  var html = '<div class="alert alert-info py-2 mb-3 small">' +
    '<i class="bi bi-info-circle"></i> راجع الرسالة قبل الإرسال' +
    '</div>' +
    '<div style="background:#e5ddd5; padding:12px; border-radius:10px;">' +
    '<div style="background:#dcf8c6; padding:12px; border-radius:10px; max-width:90%; margin-right:auto; font-size:13px;">' +
    safeMessage + '</div></div>' +
    '<div class="d-grid gap-2 mt-3">' +
    '<button class="btn btn-success" onclick="confirmSendNotification(' + visitId + ', \'' + templateKey + '\')">' +
    '<i class="bi bi-whatsapp"></i> فتح WhatsApp وإرسال</button>' +
    '<button class="btn btn-outline-secondary" onclick="closeInfoModal(); showNotificationMenu(' + visitId + ')">' +
    '← رجوع للقوالب</button>' +
    '</div>';

  showInfoModal(html, '📱 ' + template.icon + ' ' + template.name);
}

// ============ تأكيد الإرسال ============
async function confirmSendNotification(visitId, templateKey) {
  closeInfoModal();
  var ok = await sendNotification(visitId, templateKey);
  if (ok) {
    setTimeout(function() {
      alert('✅ تم فتح WhatsApp\n\nاضغط "إرسال" في WhatsApp لإتمام العملية');
    }, 600);
  }
}

// ============ سجل إشعارات زيارة ============
async function showNotificationHistory(visitId) {
  try {
    var all = await dbGetAll('notifications');
    var filtered = all.filter(function(n) { return n.visit_id === visitId; });
    filtered.sort(function(a, b) {
      return new Date(b.sent_at) - new Date(a.sent_at);
    });

    var html = '';

    if (filtered.length === 0) {
      html = '<div class="text-center text-muted py-4">' +
        '<i class="bi bi-inbox" style="font-size:3rem;opacity:.3"></i>' +
        '<div class="mt-2">لا توجد إشعارات سابقة</div></div>';
    } else {
      for (var i = 0; i < filtered.length; i++) {
        var n = filtered[i];
        var d = new Date(n.sent_at);
        var dateStr = d.toLocaleDateString('ar-EG') + ' ' +
          d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

        html += '<div class="card mb-2 p-2">' +
          '<div class="d-flex justify-content-between align-items-center mb-1">' +
          '<strong class="small">' + (n.template_name || n.template) + '</strong>' +
          '<span class="badge bg-success">مُرسل</span></div>' +
          '<div class="text-muted" style="font-size:11px;">' +
          '<i class="bi bi-clock"></i> ' + dateStr + '</div>' +
          '<div class="mt-2 p-2" style="background:#f8f9fa; border-radius:6px; font-size:12px; white-space:pre-wrap; max-height:100px; overflow-y:auto;">' +
          escapeHtml(n.message.substring(0, 150)) + (n.message.length > 150 ? '...' : '') +
          '</div></div>';
      }
    }

    html += '<div class="mt-3">' +
      '<button class="btn btn-outline-secondary w-100" onclick="closeInfoModal(); showNotificationMenu(' + visitId + ')">' +
      '← رجوع للقوالب</button></div>';

    showInfoModal(html, '📋 سجل الإشعارات (' + filtered.length + ')');

  } catch (err) {
    console.error(err);
    alert('❌ خطأ: ' + err.message);
  }
}

// ============ صفحة الإشعارات ============
async function renderNotificationsPage() {
  var container = document.getElementById('notificationsList');
  if (!container) return;

  try {
    var all = await dbGetAll('notifications');
    all.sort(function(a, b) {
      return new Date(b.sent_at) - new Date(a.sent_at);
    });

    // إحصائيات
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayCount = all.filter(function(n) {
      return new Date(n.sent_at) >= today;
    }).length;
    var weekCount = all.filter(function(n) {
      var diff = (Date.now() - new Date(n.sent_at).getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length;

    var html = '<div class="row g-2 mb-3">' +
      '<div class="col-4"><div class="card p-2 text-center">' +
      '<div class="small text-muted">إجمالي</div>' +
      '<div class="stat-value fs-4">' + all.length + '</div></div></div>' +
      '<div class="col-4"><div class="card p-2 text-center">' +
      '<div class="small text-muted">اليوم</div>' +
      '<div class="stat-value fs-4">' + todayCount + '</div></div></div>' +
      '<div class="col-4"><div class="card p-2 text-center">' +
      '<div class="small text-muted">هذا الأسبوع</div>' +
      '<div class="stat-value fs-4">' + weekCount + '</div></div></div>' +
      '</div>';

    if (all.length === 0) {
      html += '<div class="card p-4 text-center text-muted">' +
        '<i class="bi bi-whatsapp" style="font-size:3rem;opacity:.3"></i>' +
        '<div class="mt-2">لا توجد إشعارات بعد</div>' +
        '<div class="small mt-1">افتح زيارة → إشعار واتساب</div></div>';
    } else {
      html += '<h6 class="fw-bold mb-2">آخر الإشعارات:</h6>';

      var limit = Math.min(all.length, 50);
      for (var i = 0; i < limit; i++) {
        var n = all[i];
        var d = new Date(n.sent_at);
        var dateStr = d.toLocaleDateString('ar-EG') + ' ' +
          d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

        html += '<div class="card mb-2 p-2">' +
          '<div class="d-flex justify-content-between align-items-center mb-1">' +
          '<strong class="small">' + escapeHtml(n.patient_name || 'غير معروف') + '</strong>' +
          '<span class="badge bg-info" style="font-size:9px;">' + (n.template_name || '') + '</span>' +
          '</div>' +
          '<div class="text-muted" style="font-size:11px;">' +
          '📱 ' + escapeHtml(n.phone || '') + ' • 🕒 ' + dateStr +
          '</div></div>';
      }
    }

    container.innerHTML = html;

  } catch (err) {
    console.error('خطأ:', err);
    container.innerHTML = '<div class="alert alert-danger">خطأ في التحميل: ' + err.message + '</div>';
  }
}

// ============ تصدير ============
window.NOTIFICATION_TEMPLATES = NOTIFICATION_TEMPLATES;
window.sendNotification = sendNotification;
window.showNotificationMenu = showNotificationMenu;
window.previewNotification = previewNotification;
window.confirmSendNotification = confirmSendNotification;
window.showNotificationHistory = showNotificationHistory;
window.renderNotificationsPage = renderNotificationsPage;
