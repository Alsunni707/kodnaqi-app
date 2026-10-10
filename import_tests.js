// ============================================================
// استيراد التحاليل إلى قاعدة البيانات (يُشغّل مرة واحدة)
// ============================================================

async function importTestsToDB() {
  const existingCount = await dbCount('tests');

  if (existingCount > 0) {
    console.log(`✅ التحاليل موجودة مسبقاً (${existingCount})`);
    return existingCount;
  }

  console.log('📥 جاري استيراد التحاليل...');
  let imported = 0;
  let totalParams = 0;

  for (const testData of TESTS_DATA) {
    // أضف التحليل
    const testId = await dbAdd('tests', {
      name: testData.name,
      name_ar: testData.name_ar,
      category: testData.category,
      price: testData.price,
      unit: testData.unit,
      active: true,
    });

    // أضف معاييره
    for (const param of testData.parameters) {
      await dbAdd('parameters', {
        test_id: testId,
        name: param.name,
        name_ar: param.name_ar,
        unit: param.unit,
        ref_min: param.ref_min,
        ref_max: param.ref_max,
        ref_text: param.ref_text,
        result_type: param.result_type,
        options: param.options,
        order: param.order,
      });
      totalParams++;
    }

    imported++;
  }

  console.log(`✅ تم استيراد ${imported} فحص و ${totalParams} معيار`);
  return imported;
}

// شغّل تلقائياً عند بدء التطبيق
window.importTestsToDB = importTestsToDB;
