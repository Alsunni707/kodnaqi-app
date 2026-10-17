// ═══════════════════════════════════════════════════════
// استيراد الفحوصات مباشرة من البنية الجديدة (بدون تخمين)
// ═══════════════════════════════════════════════════════

async function importTestsToDB() {
  const existingCount = await dbCount('tests');
  if (existingCount > 0) {
    console.log(`ℹ️ التحاليل موجودة مسبقاً (${existingCount})`);
    return existingCount;
  }

  const testsData = window.ALL_SYSTEM_TESTS || [];
  if (!testsData.length) {
    console.error('❌ window.ALL_SYSTEM_TESTS فارغ');
    return 0;
  }

  console.log(`📥 جاري استيراد ${testsData.length} فحص...`);
  let imported = 0, totalParams = 0;

  for (const t of testsData) {
    try {
      const testId = await dbAdd('tests', {
        code: t.code || '',
        name: t.name || '',
        name_ar: t.name_ar || t.name || '',
        category: t.dept || 'General',
        category_ar: t.dept_ar || '',
        sub_category: t.sub || '',
        price: t.price || 0,
        unit: null,
        active: true
      });

      const comps = t.components || [];
      for (let i = 0; i < comps.length; i++) {
        const c = comps[i];
        await dbAdd('parameters', {
          test_id: testId,
          name: c.name || '',
          name_ar: c.name_ar || c.name || '',
          unit: c.unit || null,
          ref_min: (c.ref_min !== undefined) ? c.ref_min : null,
          ref_max: (c.ref_max !== undefined) ? c.ref_max : null,
          ref_text: c.ref_text || null,
          result_type: c.result_type || 'text',
          options: c.options || null,
          order: i
        });
        totalParams++;
      }
      imported++;
    } catch (e) {
      console.error('❌ فشل:', t.name, e);
    }
  }

  console.log(`✅ تم استيراد ${imported} فحص و ${totalParams} معيار`);
  return imported;
}

window.importTestsToDB = importTestsToDB;
console.log('[import_tests.js] محمّل — جاهز للاستيراد الصارم');


// ═══════════════════════════════════════════════════════
// نظام الترقية التلقائي (Migration): يضمن إضافة الفحوصات الجديدة للنسخ القديمة
// ═══════════════════════════════════════════════════════
async function runMigrations() {
  console.log('🔄 جاري فحص تحديثات قاعدة البيانات...');
  const existingTests = await dbGetAll('tests');
  const existingNames = existingTests.map(t => t.name);

  // قائمة الفحوصات التي نضمن وجودها (يمكنك إضافة المزيد مستقبلاً)
  const requiredTests = [
    'Peripheral Blood Film (PBF)',
    'Manual WBC Differential (100 cells)'
  ];

  let added = 0;
  for (const reqName of requiredTests) {
    if (!existingNames.includes(reqName)) {
      // ابحث عن الفحص في ملف tests.js الأساسي
      const testData = window.ALL_SYSTEM_TESTS.find(t => t.name === reqName);
      if (testData) {
        const testId = await dbAdd('tests', {
          code: testData.code, name: testData.name, name_ar: testData.name_ar,
          category: testData.dept, category_ar: testData.dept_ar,
          sub_category: testData.sub, price: testData.price, active: true
        });
        for (let i = 0; i < testData.components.length; i++) {
          const c = testData.components[i];
          await dbAdd('parameters', {
            test_id: testId, name: c.name, name_ar: c.name_ar, unit: c.unit,
            ref_min: c.ref_min, ref_max: c.ref_max, ref_text: c.ref_text,
            result_type: c.result_type, options: c.options, order: i
          });
        }
        console.log('✅ تم ترقية قاعدة البيانات وإضافة:', reqName);
        added++;
      }
    }
  }
  if (added === 0) console.log('✅ قاعدة البيانات محدثة، لا توجد فحوصات ناقصة.');
  else console.log(`✅ تمت إضافة ${added} فحص جديد عبر الترقية التلقائية.`);
}

// تشغيل الترقية عند التحميل
if (typeof window !== 'undefined') {
  window.runMigrations = runMigrations;
  // استدعاء الترقية بعد تحميل ملف tests.js
  setTimeout(() => { if (typeof db !== 'undefined') runMigrations(); }, 2000);
}
