// ═══════════════════════════════════════════════════════
// استيراد الفحوصات + نظام الترقية التلقائية (Migration)
// ═══════════════════════════════════════════════════════

async function importTestsToDB() {
  const existingCount = await dbCount('tests');
  if (existingCount > 0) {
    console.log(`ℹ️ التحاليل موجودة مسبقاً (${existingCount})`);
    // إذا كانت موجودة، نشغل الترقية للتأكد من عدم نقص أي فحص
    setTimeout(() => { if (typeof window.runMigrations === 'function') window.runMigrations(); }, 1000);
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
console.log('[import_tests.js] محمّل — جاهز للاستيراد');

// ═══════════════════════════════════════════════════════
// نظام الترقية التلقائي (Migration): يضمن وجود كل الفحوصات
// ═══════════════════════════════════════════════════════
async function runMigrations() {
  console.log('🔄 جاري فحص قاعدة البيانات ومطابقتها مع النظام...');
  const existingTests = await dbGetAll('tests');
  const existingNames = new Set(existingTests.map(t => (t.name || '').toLowerCase().trim()));
  
  const testsData = window.ALL_SYSTEM_TESTS || [];
  let added = 0;

  for (const t of testsData) {
    const testName = (t.name || '').toLowerCase().trim();
    if (!testName) continue;

    if (!existingNames.has(testName)) {
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
      }
      added++;
    }
  }

  if (added > 0) {
    console.log(`✅ تمت إضافة ${added} فحص ناقص بنجاح عبر الترقية التلقائية.`);
    if (typeof toast === 'function') {
        toast(`تم تحديث قاعدة البيانات: تمت إضافة ${added} فحص جديد.`);
        setTimeout(() => location.reload(), 2000);
    } else {
        alert(`تم تحديث قاعدة البيانات: تمت إضافة ${added} فحص جديد. سيتم تحديث الصفحة.`);
        location.reload();
    }
  } else {
    console.log('✅ قاعدة البيانات محدثة بالكامل ولا يوجد فحوصات ناقصة.');
  }
}

if (typeof window !== 'undefined') {
  window.runMigrations = runMigrations;
}
