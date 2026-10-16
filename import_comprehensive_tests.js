// استيراد الفحوصات الشاملة تلقائياً عند أول تشغيل
const COMPREHENSIVE_IMPORTED_KEY = 'kodnaqi_comprehensive_imported';

async function importComprehensiveTests() {
  try {
    // التحقق من عدم الاستيراد مسبقاً
    if (localStorage.getItem(COMPREHENSIVE_IMPORTED_KEY) === 'true') {
      console.log('[Import] Comprehensive tests already imported');
      return;
    }
    
    const response = await fetch('comprehensive_tests.json');
    const tests = await response.json();
    
    // حذف الفحوصات القديمة
    const existing = await dbGetAll('tests');
    for (const test of existing) {
      await dbDelete('tests', test.id);
    }
    
    // إضافة الفحوصات الجديدة
    for (const test of tests) {
      await dbAdd('tests', {
        name: test.Test_Name,
        nameAr: test.Parameter,
        category: test.Department,
        categoryAr: test.Sub_Department,
        price: test.price || 0,
        unit: test.Unit,
        refRange: test.Normal_Range,
        sampleType: test.Sample_Type,
        type: 'single',
        isDefault: true,
        createdAt: new Date().toISOString()
      });
    }
    
    // تسجيل أن الاستيراد تم
    localStorage.setItem(COMPREHENSIVE_IMPORTED_KEY, 'true');
    console.log('[Import] ✅ Imported ' + tests.length + ' comprehensive tests');
    
    // إعادة تحميل الصفحة لعرض الفحوصات
    setTimeout(() => location.reload(), 1000);
  } catch (err) {
    console.error('[Import] Error:', err);
  }
}

// تشغيل تلقائي عند تحميل الصفحة
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(importComprehensiveTests, 2000);
  });
} else {
  setTimeout(importComprehensiveTests, 2000);
}

// تصدير للاستخدام اليدوي
window.importComprehensiveTests = importComprehensiveTests;
