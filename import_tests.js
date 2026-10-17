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
