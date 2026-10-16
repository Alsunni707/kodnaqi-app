(function () {
  var nativeAlert = window.alert.bind(window);
  var ESSENTIAL = ['❌', '⚠️', '🔒', 'خطأ', 'فشل', 'ترخيص', 'تفعيل', 'حذف',
    'نسخة احتياطية', 'استعادة', 'استيراد', 'تصدير', 'مطلوب', 'غير متوفر', 'باقتك'];
  window.alert = function (msg) {
    var text = String(msg == null ? '' : msg);
    var essential = ESSENTIAL.some(function (w) { return text.indexOf(w) !== -1; });
    if (essential) return nativeAlert(text);
    console.log('[muted alert]', text);
  };
})();
