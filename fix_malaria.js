(async function () {
  try {
    var tests = await dbGetAll('tests');
    var test = tests.find(function (t) { return t.code === 'PAR-004'; }) ||
               tests.find(function (t) { return /Malaria Microscopy/i.test(t.name); });
    if (!test) { console.error('❌ فحص الملاريا غير موجود'); return; }

    var all = await dbGetAll('parameters');
    var params = all.filter(function (p) { return p.test_id === test.id; })
                    .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

    if (params.some(function (p) { return p.name === 'Species'; })) {
      console.log('ℹ️ المعايير موجودة مسبقاً، لا تغيير');
      return;
    }
    if (params.length > 1) {
      console.error('❌ عدد معايير غير متوقع:', params.map(function (p) { return p.name; }));
      return;
    }

    var defs = [
      { name: 'Result', type: 'select', ref: 'No Malaria Parasite Seen',
        options: 'No Malaria Parasite Seen|Malaria Parasite Seen|Positive|Negative|Doubtful' },
      { name: 'Species', type: 'select', ref: 'Not applicable',
        options: 'Not applicable|P. falciparum|P. vivax|P. ovale|P. malariae|Mixed infection' },
      { name: 'Stage', type: 'select', ref: 'Not applicable',
        options: 'Not applicable|Ring form|Trophozoite|Schizont|Gametocyte' },
      { name: 'Density', type: 'text', ref: 'Not applicable', options: null }
    ];

    for (var i = 0; i < defs.length; i++) {
      var d = defs[i];
      var fields = {
        name: d.name, name_ar: d.name, unit: null,
        ref_min: null, ref_max: null, ref_text: d.ref,
        result_type: d.type, options: d.options, order: i
      };
      if (i === 0 && params.length === 1) {
        await dbPut('parameters', Object.assign({}, params[0], fields));
      } else {
        await dbAdd('parameters', Object.assign({ test_id: test.id }, fields));
      }
    }
    console.log('✅ تم: الفحص ' + test.name + ' صار فيه 4 معايير');
  } catch (e) {
    console.error('❌ فشل:', e);
  }
})();
