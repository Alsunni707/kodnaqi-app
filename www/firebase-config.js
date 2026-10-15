/*! KodNaqi Firebase Config — Realtime Database للترخيص المركزي */
window.KODNAQI_FIREBASE = {
  url: 'https://kodnaqi-licensing-default-rtdb.europe-west1.firebasedatabase.app',
  licensesPath: 'licenses',
  // فترة السماح بدون اتصال (بالميلي ثانية) — 7 أيام
  gracePeriodMs: 7 * 24 * 60 * 60 * 1000,
  // تكرار الاتصال بالخادم (24 ساعة)
  syncIntervalMs: 24 * 60 * 60 * 1000,
  // مهلة الاتصال (5 ثوان)
  requestTimeoutMs: 5000
};
console.log('[Firebase] Config loaded');
