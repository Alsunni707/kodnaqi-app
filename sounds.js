/*! KodNaqi — أصوات تفاعلية للأزرار */
(function() {
  'use strict';

  // إنشاء AudioContext مشترك
  let audioContext = null;
  
  function getContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  // ═══════════════════════════════════════════════════
  // أصوات مختلفة
  // ═══════════════════════════════════════════════════
  
  // صوت نقرة خفيفة (للأزرار العادية)
  function playClick() {
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = 800;
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  }

  // صوت نجاح (للحفظ والتفعيل)
  function playSuccess() {
    try {
      const ctx = getContext();
      const notes = [523.25, 659.25, 783.99]; // C-E-G
      
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
        
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.3);
      });
    } catch(e) {}
  }

  // صوت خطأ (للأخطاء)
  function playError() {
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
      osc.type = 'sawtooth';
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch(e) {}
  }

  // صوت حذف (للحذف والإلغاء)
  function playDelete() {
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      osc.type = 'triangle';
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch(e) {}
  }

  // صوت إشعار (للتنبيهات)
  function playNotification() {
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = 600;
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch(e) {}
  }

  // ═══════════════════════════════════════════════════
  // ربط الأصوات بالأزرار تلقائياً
  // ═══════════════════════════════════════════════════
  
  function attachSounds() {
    // أصوات النقر للأزرار
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('button, .btn, [role="button"]');
      if (!btn) return;
      
      // تجاهل الأزرار المعطلة
      if (btn.disabled) return;
      
      // تحديد نوع الصوت بناءً على كلاس الزر أو نصه
      const text = btn.textContent || '';
      const className = btn.className || '';
      
      if (text.includes('حذف') || text.includes('إلغاء') || className.includes('danger') || className.includes('delete')) {
        playDelete();
      } else if (text.includes('حفظ') || text.includes('تفعيل') || text.includes('إضافة') || className.includes('success') || className.includes('primary')) {
        playSuccess();
      } else if (text.includes('خطأ') || className.includes('error')) {
        playError();
      } else {
        playClick();
      }
    }, true);
    
    console.log('[Sounds] Interactive sounds attached');
  }

  // تشغيل عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachSounds);
  } else {
    attachSounds();
  }

  // تصدير للاستخدام اليدوي
  window.KodNaqiSounds = {
    click: playClick,
    success: playSuccess,
    error: playError,
    delete: playDelete,
    notification: playNotification,
    mute: function() { /* يمكن إضافة كتم الصوت لاحقاً */ }
  };

  console.log('[Sounds] Module loaded');
})();
