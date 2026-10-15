/*!
 * KodNaqi — محرر أسعار التحاليل
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 * All Rights Reserved.
 *
 * يتيح للمدير تعديل أسعار التحاليل حسب سوقه ومنطقته.
 * مع حماية مزدوجة (IndexedDB + localStorage).
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════
  // المتغيرات العامة
  // ═══════════════════════════════════════════════════
  const LOCAL_STORAGE_KEY = 'kodnaqi_custom_prices_v1';
  let _allTests = [];
  let _editedPrices = {};

  // ═══════════════════════════════════════════════════
  // 1. فتح المحرر
  // ═══════════════════════════════════════════════════
  async function openPricesEditor() {
    try {
      _allTests = await dbGetAll('tests');
      if (!_allTests || _allTests.length === 0) {
        alert('⚠️ لا توجد تحاليل في قاعدة البيانات');
        return;
      }
      _editedPrices = {};
    } catch (e) {
      console.error('Error loading tests:', e);
      alert('❌ خطأ في تحميل التحاليل');
      return;
    }

    renderModal();
  }

  // ═══════════════════════════════════════════════════
  // 2. رسم النافذة
  // ═══════════════════════════════════════════════════
  function renderModal() {
    const old = document.getElementById('kn-prices-editor');
    if (old) old.remove();

    const modal = document.createElement('div');
    modal.id = 'kn-prices-editor';
    modal.style.cssText = 'position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.7); display: flex; align-items: flex-start; justify-content: center; padding: 15px; overflow-y: auto; font-family: Cairo, sans-serif; -webkit-overflow-scrolling: touch;';

    const sortedTests = [..._allTests].sort(function(a, b) {
      const nameA = (a.name_ar || a.name || '').toString();
      const nameB = (b.name_ar || b.name || '').toString();
      return nameA.localeCompare(nameB, 'ar');
    });

    const testsHtml = sortedTests.map(function(t) {
      const displayName = t.name_ar || t.name || 'بدون اسم';
      const currentPrice = _editedPrices[t.id] !== undefined 
        ? _editedPrices[t.id] 
        : (t.price || 0);

      return '<div class="kn-price-row" data-id="' + t.id + '" data-name="' + escapeHtml(displayName.toLowerCase()) + '">' +
        '<div style="flex: 1; min-width: 0;">' +
          '<div style="font-weight: 700; color: #0d3b66; font-size: 0.9rem; word-break: break-word;">' +
            escapeHtml(displayName) +
          '</div>' +
          (t.name !== t.name_ar ? '<div style="font-size: 0.7rem; color: #888; direction: ltr;">' + escapeHtml(t.name) + '</div>' : '') +
        '</div>' +
        '<div style="display: flex; gap: 6px; align-items: center; flex-shrink: 0;">' +
          '<input type="number" class="kn-price-input" data-test-id="' + t.id + '" value="' + currentPrice + '" min="0" step="1000" inputmode="numeric" style="width: 110px; padding: 8px; border: 1px solid #ddd; border-radius: 8px; font-size: 0.9rem; text-align: center; font-weight: 700; color: #0d3b66;">' +
          '<span style="font-size: 0.75rem; color: #888; font-weight: 700;">ج.س</span>' +
        '</div>' +
      '</div>';
    }).join('');

    modal.innerHTML = 
      '<div style="background: white; border-radius: 18px; padding: 20px; max-width: 600px; width: 100%; margin: 20px auto; box-shadow: 0 20px 60px rgba(0,0,0,0.5); max-height: 95vh; display: flex; flex-direction: column;">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-shrink: 0;">' +
          '<h2 style="color: #0d3b66; font-weight: 900; margin: 0; font-size: 1.15rem;">💰 أسعار التحاليل</h2>' +
          '<button onclick="KNPriceEditor.close()" style="background: transparent; border: none; font-size: 1.5rem; color: #999; cursor: pointer; padding: 0; line-height: 1;">✕</button>' +
        '</div>' +
        '<div style="background: #fef3c7; border-right: 4px solid #f59e0b; padding: 10px 14px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 12px; color: #7c2d12; flex-shrink: 0;">✏️ عدّل الأسعار حسب معملك. التعديلات تُحفظ في قاعدة البيانات.</div>' +
        '<div style="margin-bottom: 12px; flex-shrink: 0;"><input type="text" id="kn-price-search" placeholder="🔍 ابحث عن تحليل..." oninput="KNPriceEditor.filter(this.value)" style="width: 100%; padding: 10px 14px; border: 2px solid #e0e5eb; border-radius: 10px; font-family: Cairo; font-size: 0.9rem;"></div>' +
        '<div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #666; margin-bottom: 10px; flex-shrink: 0;"><span>📊 الإجمالي: <strong style="color: #0d3b66;">' + _allTests.length + '</strong> تحليل</span><span>✏️ المعدَّلة: <strong id="kn-edited-count" style="color: #f59e0b;">0</strong></span></div>' +
        '<div id="kn-tests-list" style="flex: 1; overflow-y: auto; border: 1px solid #eee; border-radius: 10px; padding: 8px; margin-bottom: 12px; -webkit-overflow-scrolling: touch; min-height: 200px;">' + testsHtml + '</div>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; flex-shrink: 0;">' +
          '<button onclick="KNPriceEditor.saveAll()" style="padding: 12px; background: linear-gradient(135deg, #0d3b66, #1e6091); color: white; border: none; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; font-family: Cairo;">💾 حفظ التعديلات</button>' +
          '<button onclick="KNPriceEditor.resetAll()" style="padding: 12px; background: #f59e0b; color: white; border: none; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; font-family: Cairo;">🔄 استعادة</button>' +
        '</div>' +
        '<button onclick="KNPriceEditor.close()" style="width: 100%; padding: 12px; background: #f0f0f0; color: #666; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-family: Cairo; flex-shrink: 0;">إلغاء</button>' +
      '</div>';

    document.body.appendChild(modal);

    modal.querySelectorAll('.kn-price-input').forEach(function(input) {
      input.addEventListener('input', handleInputChange);
      input.addEventListener('focus', function() { this.select(); });
    });

    console.log('💰 Prices editor opened');
  }

  // ═══════════════════════════════════════════════════
  // 3. معالج التعديلات
  // ═══════════════════════════════════════════════════
  function handleInputChange(e) {
    const testId = parseInt(e.target.getAttribute('data-test-id'));
    const newPrice = parseFloat(e.target.value) || 0;
    
    const originalTest = _allTests.find(function(t) { return t.id === testId; });
    const originalPrice = originalTest ? (originalTest.price || 0) : 0;
    
    if (newPrice !== originalPrice) {
      _editedPrices[testId] = newPrice;
    } else {
      delete _editedPrices[testId];
    }
    
    updateEditedCount();
  }

  function updateEditedCount() {
    const count = Object.keys(_editedPrices).length;
    const el = document.getElementById('kn-edited-count');
    if (el) el.textContent = count;
  }

  // ═══════════════════════════════════════════════════
  // 4. البحث
  // ═══════════════════════════════════════════════════
  function filter(query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('.kn-price-row').forEach(function(row) {
      const name = row.getAttribute('data-name') || '';
      row.style.display = (q === '' || name.indexOf(q) !== -1) ? '' : 'none';
    });
  }

  // ═══════════════════════════════════════════════════
  // 5. الحفظ في localStorage
  // ═══════════════════════════════════════════════════
  async function savePricesToLocalStorage() {
    try {
      const customPrices = {};
      for (const test of _allTests) {
        if (test.price !== undefined && test.price !== null) {
          customPrices[test.id] = test.price;
        }
      }
      const data = {
        prices: customPrices,
        savedAt: new Date().toISOString(),
        count: Object.keys(customPrices).length
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      console.log('💾 Saved ' + data.count + ' prices to localStorage');
    } catch (e) {
      console.error('localStorage save error:', e);
    }
  }

  // ═══════════════════════════════════════════════════
  // 6. فحص localStorage
  // ═══════════════════════════════════════════════════
  async function checkAndRestoreFromLocalStorage() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return null;

      const data = JSON.parse(raw);
      if (!data || !data.prices) return null;

      const allTests = await dbGetAll('tests');
      if (!allTests || allTests.length === 0) return null;

      let diffs = 0;
      const testsToRestore = [];

      for (const test of allTests) {
        const savedPrice = data.prices[test.id];
        if (savedPrice !== undefined && savedPrice !== test.price) {
          diffs++;
          testsToRestore.push({ test: test, savedPrice: savedPrice });
        }
      }

      if (diffs >= 3) {
        console.log('🔄 Detected ' + diffs + ' price differences');
        return { diffs: diffs, testsToRestore: testsToRestore, data: data };
      }

      return null;
    } catch (e) {
      console.error('localStorage check error:', e);
      return null;
    }
  }

  // ═══════════════════════════════════════════════════
  // 7. استعادة من localStorage
  // ═══════════════════════════════════════════════════
  async function restorePricesFromLocalStorage(testsToRestore) {
    let restored = 0;
    for (const item of testsToRestore) {
      item.test.price = item.savedPrice;
      await dbPut('tests', item.test);
      restored++;
    }

    if (window.cachedTests && Array.isArray(window.cachedTests)) {
      window.cachedTests = await dbGetAll('tests');
    }

    console.log('🔄 Restored ' + restored + ' prices from localStorage');
    return restored;
  }

  // ═══════════════════════════════════════════════════
  // 8. عرض التنبيه
  // ═══════════════════════════════════════════════════
  async function showRestorePrompt(data) {
    const date = new Date(data.savedAt);
    const dateStr = date.toLocaleDateString('ar-EG', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const msg = 
      '💾 لاحظنا أن أسعارك المخصصة مفقودة\n\n' +
      '📊 عدد الأسعار المحفوظة: ' + data.count + '\n' +
      '📅 آخر حفظ: ' + dateStr + '\n\n' +
      'هل تريد استعادتها؟\n\n' +
      'ملاحظة: قد يكون هذا بسبب مسح بيانات المتصفح.';

    return confirm(msg);
  }

  // ═══════════════════════════════════════════════════
  // 9. الحفظ الرئيسي
  // ═══════════════════════════════════════════════════
  async function saveAll() {
    const count = Object.keys(_editedPrices).length;
    if (count === 0) {
      showToast('ℹ️ لم تُعدّل أي سعر', '#6c757d');
      return;
    }

    if (!confirm('💾 حفظ ' + count + ' تعديل؟\n\nسيُطبَّق على كل التقارير الجديدة.')) return;

    try {
      let saved = 0;
      for (const idStr in _editedPrices) {
        const id = parseInt(idStr);
        const newPrice = _editedPrices[idStr];
        const test = _allTests.find(function(t) { return t.id === id; });
        if (!test) continue;
        
        test.price = newPrice;
        await dbPut('tests', test);
        saved++;
      }

      // ═══ حفظ نسخة احتياطية في localStorage ═══
      await savePricesToLocalStorage();

      // تحديث الـ cache
      if (window.cachedTests && Array.isArray(window.cachedTests)) {
        window.cachedTests = await dbGetAll('tests');
      }

      showToast('✅ تم حفظ ' + saved + ' تعديل', '#198754');
      
      setTimeout(function() { close(); }, 1500);
      
      console.log('💰 Saved ' + saved + ' price changes');
    } catch (e) {
      console.error('Save error:', e);
      showToast('❌ فشل الحفظ: ' + e.message, '#dc3545');
    }
  }

  // ═══════════════════════════════════════════════════
  // 10. إعادة التعيين
  // ═══════════════════════════════════════════════════
  async function resetAll() {
    if (!confirm('🔄 استعادة جميع الأسعار إلى القيم الافتراضية؟\n\n⚠️ سيُحذف أي تعديل سابق.')) return;

    try {
      if (typeof TESTS_DATA === 'undefined') {
        showToast('❌ لا يمكن الوصول للأسعار الافتراضية', '#dc3545');
        return;
      }

      let restored = 0;
      for (const test of _allTests) {
        const defaultTest = TESTS_DATA.find(function(t) {
          return t.name === test.name || t.name_ar === test.name_ar;
        });
        if (defaultTest && defaultTest.price !== undefined) {
          test.price = defaultTest.price;
          await dbPut('tests', test);
          restored++;
        }
      }

      if (window.cachedTests && Array.isArray(window.cachedTests)) {
        window.cachedTests = await dbGetAll('tests');
      }

      _editedPrices = {};
      showToast('✅ تم استعادة ' + restored + ' سعر', '#198754');
      close();
      
      console.log('💰 Restored ' + restored + ' prices to default');
    } catch (e) {
      console.error('Reset error:', e);
      showToast('❌ فشل الاستعادة: ' + e.message, '#dc3545');
    }
  }

  // ═══════════════════════════════════════════════════
  // 11. إغلاق
  // ═══════════════════════════════════════════════════
  function close() {
    const modal = document.getElementById('kn-prices-editor');
    if (modal) modal.remove();
    _editedPrices = {};
  }

  // ═══════════════════════════════════════════════════
  // 12. أدوات مساعدة
  // ═══════════════════════════════════════════════════
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function showToast(msg, color) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: ' + color + '; color: white; padding: 12px 22px; border-radius: 25px; font-weight: 700; font-size: 0.9rem; z-index: 999999; box-shadow: 0 5px 20px rgba(0,0,0,0.3); font-family: Cairo; max-width: 90%; text-align: center;';
    document.body.appendChild(t);
    setTimeout(function() {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.3s';
      setTimeout(function() { t.remove(); }, 300);
    }, 2500);
  }

  // ═══════════════════════════════════════════════════
  // 13. الفحص التلقائي عند التحميل
  // ═══════════════════════════════════════════════════
  async function autoCheckRestore() {
    await new Promise(function(r) { setTimeout(r, 5000); });

    if (localStorage.getItem('kodnaqi_dev_mode') === 'true') return;

    try {
      const result = await checkAndRestoreFromLocalStorage();
      if (!result) return;

      const shouldRestore = await showRestorePrompt(result.data);
      if (shouldRestore) {
        const restored = await restorePricesFromLocalStorage(result.testsToRestore);
        showToast('🔄 تم استعادة ' + restored + ' سعر', '#198754');
      }
    } catch (e) {
      console.error('Auto-restore error:', e);
    }
  }

  // ═══════════════════════════════════════════════════
  // API عام
  // ═══════════════════════════════════════════════════
  window.KNPriceEditor = {
    open: openPricesEditor,
    close: close,
    filter: filter,
    saveAll: saveAll,
    resetAll: resetAll,
    checkRestore: checkAndRestoreFromLocalStorage,
    restoreFromLS: restorePricesFromLocalStorage,
    showRestorePrompt: showRestorePrompt
  };

  // ═══════════════════════════════════════════════════
  // التشغيل التلقائي
  // ═══════════════════════════════════════════════════
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoCheckRestore);
  } else {
    setTimeout(autoCheckRestore, 5000);
  }

  console.log('💰 KodNaqi Price Editor loaded');
})();
