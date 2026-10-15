/*! KodNaqi - الفحوصات الافتراضية الشاملة (110+ فحص) */
(function() {
  'use strict';

  const DEFAULT_TESTS = [
    // ═══════════════════════════════════════════════════
    // 1. فحوصات الدم الكاملة (CBC) - 13 معيار
    // ═══════════════════════════════════════════════════
    {
      name: 'CBC',
      nameAr: 'تعداد الدم الكامل',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 15000,
      unit: '',
      refRange: '',
      type: 'panel',
      parameters: [
        { name: 'Hemoglobin (Hb)', unit: 'g/dL', refRange: '12 - 17', defaultValue: '15' },
        { name: 'WBC', unit: '10^3/μL', refRange: '4 - 11', defaultValue: '5.5' },
        { name: 'RBC', unit: '10^6/μL', refRange: '4.1 - 5.9', defaultValue: '5.2' },
        { name: 'Hematocrit (PCV)', unit: '%', refRange: '36 - 52', defaultValue: '40' },
        { name: 'MCV', unit: 'fL', refRange: '80 - 100', defaultValue: '85' },
        { name: 'MCH', unit: 'pg', refRange: '27 - 33', defaultValue: '32' },
        { name: 'MCHC', unit: 'g/dL', refRange: '32 - 36', defaultValue: '35' },
        { name: 'Platelets', unit: '10^3/μL', refRange: '150 - 450', defaultValue: '410' },
        { name: 'Neutrophils', unit: '%', refRange: '40 - 75', defaultValue: '60' },
        { name: 'Lymphocytes', unit: '%', refRange: '20 - 45', defaultValue: '30' },
        { name: 'Monocytes', unit: '%', refRange: '2 - 10', defaultValue: '5' },
        { name: 'Eosinophils', unit: '%', refRange: '0 - 6', defaultValue: '2' },
        { name: 'Basophils', unit: '%', refRange: '0 - 2', defaultValue: '0.5' }
      ]
    },
    
    // فحص TWBCS (Total WBC Count) منفصل
    {
      name: 'TWBCS',
      nameAr: 'تعداد الكريات البيض الكلي',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 5000,
      unit: '10^3/μL',
      refRange: '4 - 11',
      type: 'single',
      defaultValue: '5.5'
    },
    
    // فحص HB منفصل
    {
      name: 'HB',
      nameAr: 'الهيموغلوبين',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 3000,
      unit: 'g/dL',
      refRange: '12 - 17',
      type: 'single',
      defaultValue: '15'
    },
    
    // ═══════════════════════════════════════════════════
    // 2. فحص الملاريا (BFFM)
    // ═══════════════════════════════════════════════════
    {
      name: 'BFFM',
      nameAr: 'فحص الملاريا (Blood Film)',
      category: 'Parasitology',
      categoryAr: 'الطفيليات',
      price: 25000,
      type: 'panel',
      parameters: [
        { 
          name: 'Result', 
          refRange: 'No Malaria Parasite Seen',
          type: 'select',
          options: ['No Malaria Parasite Seen', 'Malaria Parasite Seen', 'Positive', 'Negative', 'Doubtful']
        },
        { 
          name: 'Species', 
          refRange: 'Not applicable',
          type: 'select',
          options: ['Not applicable', 'P. falciparum', 'P. vivax', 'P. ovale', 'P. malariae', 'Mixed infection']
        },
        { 
          name: 'Stage', 
          refRange: 'Not applicable',
          type: 'select',
          options: ['Not applicable', 'Ring form', 'Trophozoite', 'Schizont', 'Gametocyte']
        },
        { 
          name: 'Density', 
          refRange: 'Not applicable',
          type: 'text',
          defaultValue: 'Not applicable'
        }
      ]
    },
    
    // ═══════════════════════════════════════════════════
    // 3. فحوصات حمى الضنك (Dengue)
    // ═══════════════════════════════════════════════════
    {
      name: 'Dengue NS1 Ag',
      nameAr: 'حمى الضنك NS1',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 35000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'Dengue IgG',
      nameAr: 'حمى الضنك IgG',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 30000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive', 'Equivocal']
    },
    {
      name: 'Dengue IgM',
      nameAr: 'حمى الضنك IgM',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 30000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive', 'Equivocal']
    },
    
    // ═══════════════════════════════════════════════════
    // 4. فحوصات السيولة (Coagulation)
    // ═══════════════════════════════════════════════════
    {
      name: 'PT',
      nameAr: 'زمن البروثرومبين',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 20000,
      type: 'single',
      unit: 'seconds',
      refRange: '11 - 14',
      defaultValue: '12'
    },
    {
      name: 'INR',
      nameAr: 'النسبة الدولية',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 15000,
      type: 'single',
      unit: '',
      refRange: '0.8 - 1.2',
      defaultValue: '1.0'
    },
    {
      name: 'APTT',
      nameAr: 'زمن الثرومبوبلاستين',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 20000,
      type: 'single',
      unit: 'seconds',
      refRange: '25 - 35',
      defaultValue: '30'
    },
    {
      name: 'D-Dimer',
      nameAr: 'دي دايمر',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 40000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 500',
      defaultValue: '< 500'
    },
    {
      name: 'Fibrinogen',
      nameAr: 'الفايبرينوجين',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 25000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '200 - 400',
      defaultValue: '300'
    },
    
    // ═══════════════════════════════════════════════════
    // 5. فحوصات الكيمياء الحيوية (Chemistry)
    // ═══════════════════════════════════════════════════
    {
      name: 'Fasting Blood Sugar',
      nameAr: 'سكر صائم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 8000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '70 - 100',
      defaultValue: '90'
    },
    {
      name: 'Random Blood Sugar',
      nameAr: 'سكر عشوائي',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 8000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '80 - 140',
      defaultValue: '100'
    },
    {
      name: 'HbA1c',
      nameAr: 'السكر التراكمي',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 25000,
      type: 'single',
      unit: '%',
      refRange: '4 - 5.6',
      defaultValue: '5'
    },
    {
      name: 'Urea',
      nameAr: 'اليوريا',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 10000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '17 - 43',
      defaultValue: '30'
    },
    {
      name: 'Creatinine',
      nameAr: 'الكرياتينين',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 10000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '0.7 - 1.3',
      defaultValue: '1.0'
    },
    {
      name: 'Uric Acid',
      nameAr: 'حمض اليوريك',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 12000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '3.5 - 7.2',
      defaultValue: '5'
    },
    {
      name: 'Sodium (Na)',
      nameAr: 'الصوديوم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 15000,
      type: 'single',
      unit: 'mmol/L',
      refRange: '136 - 145',
      defaultValue: '140'
    },
    {
      name: 'Potassium (K)',
      nameAr: 'البوتاسيوم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 15000,
      type: 'single',
      unit: 'mmol/L',
      refRange: '3.5 - 5.1',
      defaultValue: '4.2'
    },
    {
      name: 'Chloride (Cl)',
      nameAr: 'الكلوريد',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 15000,
      type: 'single',
      unit: 'mmol/L',
      refRange: '98 - 107',
      defaultValue: '102'
    },
    {
      name: 'Calcium (Ca)',
      nameAr: 'الكالسيوم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 15000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '8.5 - 10.5',
      defaultValue: '9.5'
    },
    {
      name: 'Phosphorus (P)',
      nameAr: 'الفوسفور',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 15000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '2.5 - 4.5',
      defaultValue: '3.5'
    },
    {
      name: 'Magnesium (Mg)',
      nameAr: 'المغنيسيوم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 18000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '1.7 - 2.2',
      defaultValue: '2.0'
    },
    
    // ═══════════════════════════════════════════════════
    // 6. وظائف الكبد (LFT)
    // ═══════════════════════════════════════════════════
    {
      name: 'ALT (SGPT)',
      nameAr: 'إنزيم الكبد ALT',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 12000,
      type: 'single',
      unit: 'U/L',
      refRange: '7 - 56',
      defaultValue: '25'
    },
    {
      name: 'AST (SGOT)',
      nameAr: 'إنزيم الكبد AST',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 12000,
      type: 'single',
      unit: 'U/L',
      refRange: '5 - 40',
      defaultValue: '20'
    },
    {
      name: 'ALP',
      nameAr: 'الفوسفاتاز القلوي',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: 'U/L',
      refRange: '44 - 147',
      defaultValue: '80'
    },
    {
      name: 'Total Bilirubin',
      nameAr: 'البيليروبين الكلي',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '0.3 - 1.3',
      defaultValue: '0.8'
    },
    {
      name: 'Direct Bilirubin',
      nameAr: 'البيليروبين المباشر',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '0 - 0.3',
      defaultValue: '0.1'
    },
    {
      name: 'Indirect Bilirubin',
      nameAr: 'البيليروبين غير المباشر',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '0.2 - 1.0',
      defaultValue: '0.7'
    },
    {
      name: 'Total Protein',
      nameAr: 'البروتين الكلي',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: 'g/dL',
      refRange: '6.4 - 8.3',
      defaultValue: '7.5'
    },
    {
      name: 'Albumin',
      nameAr: 'الألبيومين',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: 'g/dL',
      refRange: '3.5 - 5.2',
      defaultValue: '4.5'
    },
    {
      name: 'Globulin',
      nameAr: 'الجلوبيولين',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: 'g/dL',
      refRange: '2.0 - 3.5',
      defaultValue: '3.0'
    },
    {
      name: 'A/G Ratio',
      nameAr: 'نسبة الألبيومين/الجلوبيولين',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 15000,
      type: 'single',
      unit: '',
      refRange: '1.1 - 2.2',
      defaultValue: '1.5'
    },
    
    // ═══════════════════════════════════════════════════
    // 7. الدهون (Lipid Profile)
    // ═══════════════════════════════════════════════════
    {
      name: 'Total Cholesterol',
      nameAr: 'الكوليسترول الكلي',
      category: 'Lipid',
      categoryAr: 'الدهون',
      price: 18000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '< 200',
      defaultValue: '180'
    },
    {
      name: 'Triglycerides',
      nameAr: 'الدهون الثلاثية',
      category: 'Lipid',
      categoryAr: 'الدهون',
      price: 18000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '< 150',
      defaultValue: '120'
    },
    {
      name: 'HDL Cholesterol',
      nameAr: 'الكوليسترول الجيد',
      category: 'Lipid',
      categoryAr: 'الدهون',
      price: 20000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '> 40',
      defaultValue: '50'
    },
    {
      name: 'LDL Cholesterol',
      nameAr: 'الكوليسترول الضار',
      category: 'Lipid',
      categoryAr: 'الدهون',
      price: 20000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '< 100',
      defaultValue: '90'
    },
    {
      name: 'VLDL',
      nameAr: 'الدهون منخفضة الكثافة جداً',
      category: 'Lipid',
      categoryAr: 'الدهون',
      price: 20000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '10 - 40',
      defaultValue: '25'
    },
    
    // ═══════════════════════════════════════════════════
    // 8. الأنزيمات القلبية (Cardiac)
    // ═══════════════════════════════════════════════════
    {
      name: 'CK-MB',
      nameAr: 'إنزيم القلب CK-MB',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 120000,
      type: 'single',
      unit: 'U/L',
      refRange: '< 25',
      defaultValue: '20'
    },
    {
      name: 'Troponin I',
      nameAr: 'تروبونين I',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 150000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 0.04',
      defaultValue: '< 0.04'
    },
    {
      name: 'Troponin T',
      nameAr: 'تروبونين T',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 150000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 0.01',
      defaultValue: '< 0.01'
    },
    {
      name: 'NT-proBNP',
      nameAr: 'فشل القلب NT-proBNP',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 250000,
      type: 'single',
      unit: 'pg/mL',
      refRange: '< 125',
      defaultValue: '< 125'
    },
    {
      name: 'LDH',
      nameAr: 'إنزيم LDH',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 20000,
      type: 'single',
      unit: 'U/L',
      refRange: '140 - 280',
      defaultValue: '200'
    },
    
    // ═══════════════════════════════════════════════════
    // 9. الفحوصات المصلية (Serology)
    // ═══════════════════════════════════════════════════
    {
      name: 'CRP',
      nameAr: 'البروتين التفاعلي',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 20000,
      type: 'single',
      unit: 'mg/L',
      refRange: '< 6',
      defaultValue: '< 6'
    },
    {
      name: 'hs-CRP',
      nameAr: 'البروتين التفاعلي الحساس',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 30000,
      type: 'single',
      unit: 'mg/L',
      refRange: '< 1.0',
      defaultValue: '< 1.0'
    },
    {
      name: 'RF (Rheumatoid Factor)',
      nameAr: 'عامل الروماتويد',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 25000,
      type: 'single',
      unit: 'IU/mL',
      refRange: '< 20',
      defaultValue: '< 20'
    },
    {
      name: 'ASO Titer',
      nameAr: 'مضاد streptolysin O',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 25000,
      type: 'single',
      unit: 'IU/mL',
      refRange: '< 200',
      defaultValue: '< 200'
    },
    {
      name: 'Widal Test',
      nameAr: 'فحص التايفويد (ويدال)',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 30000,
      type: 'panel',
      parameters: [
        { name: 'S. Typhi O', refRange: '< 1:80', type: 'select', options: ['< 1:80', '1:80', '1:160', '1:320', '1:640'] },
        { name: 'S. Typhi H', refRange: '< 1:80', type: 'select', options: ['< 1:80', '1:80', '1:160', '1:320', '1:640'] },
        { name: 'S. Paratyphi A O', refRange: '< 1:80', type: 'select', options: ['< 1:80', '1:80', '1:160', '1:320'] },
        { name: 'S. Paratyphi A H', refRange: '< 1:80', type: 'select', options: ['< 1:80', '1:80', '1:160', '1:320'] },
        { name: 'S. Paratyphi B O', refRange: '< 1:80', type: 'select', options: ['< 1:80', '1:80', '1:160', '1:320'] },
        { name: 'S. Paratyphi B H', refRange: '< 1:80', type: 'select', options: ['< 1:80', '1:80', '1:160', '1:320'] }
      ]
    },
    {
      name: 'VDRL',
      nameAr: 'فحص الزهري',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 20000,
      type: 'single',
      unit: '',
      refRange: 'Non-reactive',
      defaultValue: 'Non-reactive',
      options: ['Non-reactive', 'Reactive', 'Weakly Reactive']
    },
    {
      name: 'TPHA',
      nameAr: 'فحص الزهري المؤكد',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 25000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'HIV 1&2',
      nameAr: 'فحص الإيدز',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 40000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'HBsAg',
      nameAr: 'فحص التهاب الكبد B',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 30000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'Anti-HCV',
      nameAr: 'فحص التهاب الكبد C',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 35000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'H. pylori Ag',
      nameAr: 'جرثومة المعدة',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 35000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    
    // ═══════════════════════════════════════════════════
    // 10. الغدة الدرقية (Thyroid)
    // ═══════════════════════════════════════════════════
    {
      name: 'TSH',
      nameAr: 'الهرمون المحفز للدرقية',
      category: 'Thyroid',
      categoryAr: 'الغدة الدرقية',
      price: 40000,
      type: 'single',
      unit: 'μIU/mL',
      refRange: '0.4 - 4.0',
      defaultValue: '2.0'
    },
    {
      name: 'T4 (Total)',
      nameAr: 'الثيروكسين الكلي',
      category: 'Thyroid',
      categoryAr: 'الغدة الدرقية',
      price: 40000,
      type: 'single',
      unit: 'μg/dL',
      refRange: '5.0 - 12.0',
      defaultValue: '8.0'
    },
    {
      name: 'T4 (Free)',
      nameAr: 'الثيروكسين الحر',
      category: 'Thyroid',
      categoryAr: 'الغدة الدرقية',
      price: 45000,
      type: 'single',
      unit: 'ng/dL',
      refRange: '0.8 - 1.8',
      defaultValue: '1.2'
    },
    {
      name: 'T3 (Total)',
      nameAr: 'الثلاثي يودوثيرونين',
      category: 'Thyroid',
      categoryAr: 'الغدة الدرقية',
      price: 40000,
      type: 'single',
      unit: 'ng/dL',
      refRange: '80 - 200',
      defaultValue: '120'
    },
    
    // ═══════════════════════════════════════════════════
    // 11. تحليل البول (Urine Analysis)
    // ═══════════════════════════════════════════════════
    {
      name: 'Urine Analysis',
      nameAr: 'تحليل البول',
      category: 'Urine',
      categoryAr: 'البول',
      price: 15000,
      type: 'panel',
      parameters: [
        { name: 'Color', type: 'select', options: ['Yellow', 'Pale Yellow', 'Dark Yellow', 'Amber', 'Red', 'Brown', 'Cloudy'] },
        { name: 'Appearance', type: 'select', options: ['Clear', 'Slightly Cloudy', 'Cloudy', 'Turbid'] },
        { name: 'pH', type: 'text', refRange: '4.5 - 8.0', defaultValue: '6.0' },
        { name: 'Specific Gravity', type: 'text', refRange: '1.005 - 1.030', defaultValue: '1.020' },
        { name: 'Protein', type: 'select', options: ['Negative', 'Trace', '1+', '2+', '3+', '4+'] },
        { name: 'Glucose', type: 'select', options: ['Negative', 'Trace', '1+', '2+', '3+', '4+'] },
        { name: 'Ketones', type: 'select', options: ['Negative', 'Trace', '1+', '2+', '3+'] },
        { name: 'Bilirubin', type: 'select', options: ['Negative', 'Trace', '1+', '2+', '3+'] },
        { name: 'Urobilinogen', type: 'select', options: ['Normal', 'Increased', 'Decreased'] },
        { name: 'Nitrite', type: 'select', options: ['Negative', 'Positive'] },
        { name: 'Leukocyte Esterase', type: 'select', options: ['Negative', 'Trace', '1+', '2+', '3+'] },
        { name: 'Blood', type: 'select', options: ['Negative', 'Trace', '1+', '2+', '3+'] },
        { name: 'RBC', type: 'text', refRange: '0 - 5 /HPF', defaultValue: '0-2' },
        { name: 'WBC', type: 'text', refRange: '0 - 5 /HPF', defaultValue: '0-3' },
        { name: 'Epithelial Cells', type: 'select', options: ['Few', 'Moderate', 'Many', 'None'] },
        { name: 'Casts', type: 'select', options: ['None', 'Hyaline', 'RBC Casts', 'WBC Casts', 'Granular'] },
        { name: 'Crystals', type: 'select', options: ['None', 'Calcium Oxalate', 'Uric Acid', 'Triple Phosphate'] },
        { name: 'Bacteria', type: 'select', options: ['None', 'Few', 'Moderate', 'Many'] }
      ]
    },
    
    // ═══════════════════════════════════════════════════
    // 12. الأمراض المعدية (Infectious Diseases)
    // ═══════════════════════════════════════════════════
    {
      name: 'Malaria Ag (Pf/Pv)',
      nameAr: 'فحص الملاريا السريع',
      category: 'Infectious',
      categoryAr: 'الأمراض المعدية',
      price: 30000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Pf Positive', 'Pv Positive', 'Mixed']
    },
    {
      name: 'Brucella Ag',
      nameAr: 'فحص البروسيلا',
      category: 'Infectious',
      categoryAr: 'الأمراض المعدية',
      price: 35000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'Leptospira IgM',
      nameAr: 'فحص اللبتوسبيرا',
      category: 'Infectious',
      categoryAr: 'الأمراض المعدية',
      price: 40000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    
    // ═══════════════════════════════════════════════════
    // 13. فحوصات أخرى مهمة
    // ═══════════════════════════════════════════════════
    {
      name: 'Blood Group & Rh',
      nameAr: 'فصيلة الدم',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 10000,
      type: 'panel',
      parameters: [
        { name: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
        { name: 'Rh Factor', type: 'select', options: ['Positive', 'Negative'] }
      ]
    },
    {
      name: 'ESR',
      nameAr: 'سرعة الترسيب',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 8000,
      type: 'single',
      unit: 'mm/hr',
      refRange: '0 - 15',
      defaultValue: '10'
    },
    {
      name: 'Reticulocyte Count',
      nameAr: 'تعداد الشبكيات',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 20000,
      type: 'single',
      unit: '%',
      refRange: '0.5 - 2.5',
      defaultValue: '1.0'
    },
    {
      name: 'G6PD',
      nameAr: 'إنزيم G6PD',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 45000,
      type: 'single',
      unit: 'U/g Hb',
      refRange: '> 10',
      defaultValue: '12'
    },
    {
      name: 'Iron (Serum)',
      nameAr: 'الحديد',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 30000,
      type: 'single',
      unit: 'μg/dL',
      refRange: '60 - 170',
      defaultValue: '100'
    },
    {
      name: 'TIBC',
      nameAr: 'القدرة الكلية لربط الحديد',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 35000,
      type: 'single',
      unit: 'μg/dL',
      refRange: '250 - 450',
      defaultValue: '350'
    },
    {
      name: 'Ferritin',
      nameAr: 'الفيريتين',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 50000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '15 - 200',
      defaultValue: '100'
    },
    {
      name: 'Vitamin B12',
      nameAr: 'فيتامين B12',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'pg/mL',
      refRange: '200 - 900',
      defaultValue: '500'
    },
    {
      name: 'Folic Acid',
      nameAr: 'حمض الفوليك',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 50000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '4 - 20',
      defaultValue: '10'
    },
    {
      name: 'Vitamin D (25-OH)',
      nameAr: 'فيتامين D',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 80000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '30 - 100',
      defaultValue: '40'
    },
    {
      name: 'PSA (Total)',
      nameAr: 'مستضد البروستاتا',
      category: 'Tumor Markers',
      categoryAr: 'أورام',
      price: 100000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 4.0',
      defaultValue: '< 4.0'
    },
    {
      name: 'CEA',
      nameAr: 'مستضد السرطان',
      category: 'Tumor Markers',
      categoryAr: 'أورام',
      price: 120000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 5.0',
      defaultValue: '< 5.0'
    },
    {
      name: 'AFP',
      nameAr: 'مستضد ألفا فيتو',
      category: 'Tumor Markers',
      categoryAr: 'أورام',
      price: 120000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'CA-125',
      nameAr: 'مستضد المبيض',
      category: 'Tumor Markers',
      categoryAr: 'أورام',
      price: 150000,
      type: 'single',
      unit: 'U/mL',
      refRange: '< 35',
      defaultValue: '< 35'
    },
    {
      name: 'CA-19-9',
      nameAr: 'مستضد البنكرياس',
      category: 'Tumor Markers',
      categoryAr: 'أورام',
      price: 150000,
      type: 'single',
      unit: 'U/mL',
      refRange: '< 37',
      defaultValue: '< 37'
    },
    {
      name: 'Semen Analysis',
      nameAr: 'تحليل السائل المنوي',
      category: 'Andrology',
      categoryAr: 'الذكورة',
      price: 50000,
      type: 'panel',
      parameters: [
        { name: 'Volume', unit: 'mL', refRange: '1.5 - 5', type: 'text', defaultValue: '3' },
        { name: 'Concentration', unit: 'M/mL', refRange: '> 15', type: 'text', defaultValue: '40' },
        { name: 'Total Motility', unit: '%', refRange: '> 40', type: 'text', defaultValue: '60' },
        { name: 'Progressive Motility', unit: '%', refRange: '> 32', type: 'text', defaultValue: '45' },
        { name: 'Normal Morphology', unit: '%', refRange: '> 4', type: 'text', defaultValue: '15' },
        { name: 'Viability', unit: '%', refRange: '> 58', type: 'text', defaultValue: '70' },
        { name: 'pH', refRange: '7.2 - 8.0', type: 'text', defaultValue: '7.5' },
        { name: 'WBC', unit: '10^6/mL', refRange: '< 1', type: 'text', defaultValue: '0' }
      ]
    },
    {
      name: 'Stool Analysis',
      nameAr: 'تحليل البراز',
      category: 'Stool',
      categoryAr: 'البراز',
      price: 15000,
      type: 'panel',
      parameters: [
        { name: 'Color', type: 'select', options: ['Brown', 'Yellow', 'Green', 'Black', 'Red', 'Clay'] },
        { name: 'Consistency', type: 'select', options: ['Formed', 'Soft', 'Loose', 'Watery', 'Hard'] },
        { name: 'Mucus', type: 'select', options: ['Absent', 'Present'] },
        { name: 'Blood', type: 'select', options: ['Absent', 'Present', 'Occult'] },
        { name: 'Pus Cells', type: 'text', refRange: '0 - 5 /HPF', defaultValue: '0-2' },
        { name: 'RBC', type: 'text', refRange: '0 /HPF', defaultValue: '0' },
        { name: 'Ova & Cysts', type: 'select', options: ['Not Seen', 'Seen'] },
        { name: 'Protozoa', type: 'select', options: ['Not Seen', 'Giardia', 'Entamoeba', 'Other'] },
        { name: 'Helminths', type: 'select', options: ['Not Seen', 'Seen'] },
        { name: 'Fat Globules', type: 'select', options: ['Absent', 'Few', 'Moderate', 'Many'] },
        { name: 'Starch', type: 'select', options: ['Absent', 'Present'] },
        { name: 'Muscle Fibers', type: 'select', options: ['Absent', 'Present'] }
      ]
    },
    {
      name: 'Occult Blood (FOB)',
      nameAr: 'الدم الخفي في البراز',
      category: 'Stool',
      categoryAr: 'البراز',
      price: 25000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'H. pylori Ab (Blood)',
      nameAr: 'أجسام مضادة لجرثومة المعدة',
      category: 'Serology',
      categoryAr: 'الفحوصات المصلية',
      price: 30000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'Anti-dsDNA',
      nameAr: 'أجسام مضادة للحمض النووي',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 80000,
      type: 'single',
      unit: 'IU/mL',
      refRange: '< 30',
      defaultValue: '< 30'
    },
    {
      name: 'ANA',
      nameAr: 'أجسام مضادة نووية',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 70000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive (1:40)', 'Positive (1:80)', 'Positive (1:160)', 'Positive (1:320)']
    },
    {
      name: 'Anti-TPO',
      nameAr: 'أجسام مضادة للغدة الدرقية',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 60000,
      type: 'single',
      unit: 'IU/mL',
      refRange: '< 34',
      defaultValue: '< 34'
    },
    {
      name: 'Cortisol (AM)',
      nameAr: 'الكورتيزول صباحاً',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 70000,
      type: 'single',
      unit: 'μg/dL',
      refRange: '6 - 23',
      defaultValue: '15'
    },
    {
      name: 'Testosterone (Total)',
      nameAr: 'التستوستيرون الكلي',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 80000,
      type: 'single',
      unit: 'ng/dL',
      refRange: '300 - 1000',
      defaultValue: '500'
    },
    {
      name: 'Prolactin',
      nameAr: 'البرولاكتين',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 70000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '4 - 25',
      defaultValue: '10'
    },
    {
      name: 'LH',
      nameAr: 'الهرمون الملوتن',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 70000,
      type: 'single',
      unit: 'mIU/mL',
      refRange: '1.7 - 8.6',
      defaultValue: '5'
    },
    {
      name: 'FSH',
      nameAr: 'الهرمون المنبه للجريب',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 70000,
      type: 'single',
      unit: 'mIU/mL',
      refRange: '1.5 - 12.4',
      defaultValue: '5'
    },
    {
      name: 'Estradiol (E2)',
      nameAr: 'الإستراديول',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 70000,
      type: 'single',
      unit: 'pg/mL',
      refRange: '12 - 498',
      defaultValue: '100'
    },
    {
      name: 'Progesterone',
      nameAr: 'البروجستيرون',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 70000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '0.2 - 25',
      defaultValue: '5'
    },
    {
      name: 'Beta-hCG',
      nameAr: 'هرمون الحمل',
      category: 'Hormones',
      categoryAr: 'الهرمونات',
      price: 40000,
      type: 'single',
      unit: 'mIU/mL',
      refRange: '< 5',
      defaultValue: '< 5'
    },
    {
      name: 'Alpha-fetoprotein (AFP)',
      nameAr: 'ألفا فيتو بروتين',
      category: 'Tumor Markers',
      categoryAr: 'أورام',
      price: 120000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Procalcitonin',
      nameAr: 'البروكالسيتونين',
      category: 'Infectious',
      categoryAr: 'الأمراض المعدية',
      price: 120000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 0.5',
      defaultValue: '< 0.5'
    },
    {
      name: 'Prothrombin Time (PT)',
      nameAr: 'زمن البروثرومبين',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 20000,
      type: 'single',
      unit: 'seconds',
      refRange: '11 - 14',
      defaultValue: '12'
    },
    {
      name: 'Activated Partial Thromboplastin Time (APTT)',
      nameAr: 'زمن الثرومبوبلاستين الجزئي',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 20000,
      type: 'single',
      unit: 'seconds',
      refRange: '25 - 35',
      defaultValue: '30'
    },
    {
      name: 'Bleeding Time (BT)',
      nameAr: 'زمن النزيف',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 10000,
      type: 'single',
      unit: 'minutes',
      refRange: '2 - 7',
      defaultValue: '4'
    },
    {
      name: 'Clotting Time (CT)',
      nameAr: 'زمن التجلط',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 10000,
      type: 'single',
      unit: 'minutes',
      refRange: '5 - 10',
      defaultValue: '7'
    },
    {
      name: 'Lupus Anticoagulant',
      nameAr: 'مضاد التجلط الذئبي',
      category: 'Coagulation',
      categoryAr: 'السيولة',
      price: 100000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'Anti-Cardiolipin IgG',
      nameAr: 'أجسام مضادة للكارديوليبين',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 90000,
      type: 'single',
      unit: 'GPL',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Anti-Phospholipid Ab',
      nameAr: 'أجسام مضادة للفوسفوليبيد',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 90000,
      type: 'single',
      unit: '',
      refRange: 'Negative',
      defaultValue: 'Negative',
      options: ['Negative', 'Positive']
    },
    {
      name: 'Rheumatoid Factor (RF)',
      nameAr: 'عامل الروماتويد',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 25000,
      type: 'single',
      unit: 'IU/mL',
      refRange: '< 20',
      defaultValue: '< 20'
    },
    {
      name: 'Anti-CCP',
      nameAr: 'أجسام مضادة للببتيدات',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 100000,
      type: 'single',
      unit: 'U/mL',
      refRange: '< 20',
      defaultValue: '< 20'
    },
    {
      name: 'Complement C3',
      nameAr: 'المتمم C3',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 60000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '90 - 180',
      defaultValue: '120'
    },
    {
      name: 'Complement C4',
      nameAr: 'المتمم C4',
      category: 'Autoimmune',
      categoryAr: 'المناعة الذاتية',
      price: 60000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '10 - 40',
      defaultValue: '25'
    },
    {
      name: 'IgG',
      nameAr: 'الجلوبيولين المناعي G',
      category: 'Immunology',
      categoryAr: 'المناعة',
      price: 50000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '700 - 1600',
      defaultValue: '1000'
    },
    {
      name: 'IgA',
      nameAr: 'الجلوبيولين المناعي A',
      category: 'Immunology',
      categoryAr: 'المناعة',
      price: 50000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '70 - 400',
      defaultValue: '200'
    },
    {
      name: 'IgM',
      nameAr: 'الجلوبيولين المناعي M',
      category: 'Immunology',
      categoryAr: 'المناعة',
      price: 50000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '40 - 230',
      defaultValue: '120'
    },
    {
      name: 'IgE',
      nameAr: 'الجلوبيولين المناعي E',
      category: 'Immunology',
      categoryAr: 'المناعة',
      price: 60000,
      type: 'single',
      unit: 'IU/mL',
      refRange: '< 100',
      defaultValue: '< 100'
    },
    {
      name: 'Haptoglobin',
      nameAr: 'الهابتوغلوبين',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 40000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '30 - 200',
      defaultValue: '100'
    },
    {
      name: 'Transferrin',
      nameAr: 'الترانسفيرين',
      category: 'Hematology',
      categoryAr: 'أمراض الدم',
      price: 40000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '200 - 360',
      defaultValue: '280'
    },
    {
      name: 'Pre-albumin',
      nameAr: 'البري ألبيومين',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 50000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '20 - 40',
      defaultValue: '30'
    },
    {
      name: 'Beta-2 Microglobulin',
      nameAr: 'بيتا 2 مايكروغلوبيولين',
      category: 'Tumor Markers',
      categoryAr: 'أورام',
      price: 100000,
      type: 'single',
      unit: 'mg/L',
      refRange: '< 3',
      defaultValue: '< 3'
    },
    {
      name: 'Homocysteine',
      nameAr: 'الهوموسيستين',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 70000,
      type: 'single',
      unit: 'μmol/L',
      refRange: '5 - 15',
      defaultValue: '10'
    },
    {
      name: 'NT-proBNP',
      nameAr: 'NT-proBNP',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 250000,
      type: 'single',
      unit: 'pg/mL',
      refRange: '< 125',
      defaultValue: '< 125'
    },
    {
      name: 'Myoglobin',
      nameAr: 'الميوغلوبين',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 100000,
      type: 'single',
      unit: 'ng/mL',
      refRange: '< 90',
      defaultValue: '< 90'
    },
    {
      name: 'CK (Total)',
      nameAr: 'الكرياتين كيناز الكلي',
      category: 'Cardiac',
      categoryAr: 'القلب',
      price: 20000,
      type: 'single',
      unit: 'U/L',
      refRange: '30 - 200',
      defaultValue: '100'
    },
    {
      name: 'Amylase',
      nameAr: 'الأميليز',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 20000,
      type: 'single',
      unit: 'U/L',
      refRange: '30 - 110',
      defaultValue: '60'
    },
    {
      name: 'Lipase',
      nameAr: 'الليبيز',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 25000,
      type: 'single',
      unit: 'U/L',
      refRange: '10 - 60',
      defaultValue: '30'
    },
    {
      name: 'Gamma GT (GGT)',
      nameAr: 'جاما جلوتاميل ترانسفيريز',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 20000,
      type: 'single',
      unit: 'U/L',
      refRange: '9 - 48',
      defaultValue: '25'
    },
    {
      name: '5-NT',
      nameAr: '5 نيوكليوتيداز',
      category: 'Liver',
      categoryAr: 'وظائف الكبد',
      price: 30000,
      type: 'single',
      unit: 'U/L',
      refRange: '2 - 17',
      defaultValue: '8'
    },
    {
      name: 'ADA',
      nameAr: 'الأدينوزين دي أميناز',
      category: 'Infectious',
      categoryAr: 'الأمراض المعدية',
      price: 40000,
      type: 'single',
      unit: 'U/L',
      refRange: '15 - 40',
      defaultValue: '25'
    },
    {
      name: 'Serum Copper',
      nameAr: 'النحاس',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 40000,
      type: 'single',
      unit: 'μg/dL',
      refRange: '70 - 140',
      defaultValue: '100'
    },
    {
      name: 'Ceruloplasmin',
      nameAr: 'السيرولوبلازمين',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 50000,
      type: 'single',
      unit: 'mg/dL',
      refRange: '20 - 60',
      defaultValue: '35'
    },
    {
      name: 'Zinc',
      nameAr: 'الزنك',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 40000,
      type: 'single',
      unit: 'μg/dL',
      refRange: '70 - 150',
      defaultValue: '100'
    },
    {
      name: 'Selenium',
      nameAr: 'السيلينيوم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '70 - 150',
      defaultValue: '100'
    },
    {
      name: 'Manganese',
      nameAr: 'المنغنيز',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '4 - 15',
      defaultValue: '10'
    },
    {
      name: 'Chromium',
      nameAr: 'الكروم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '0.1 - 2.1',
      defaultValue: '1.0'
    },
    {
      name: 'Cobalt',
      nameAr: 'الكوبالت',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '0.1 - 1.2',
      defaultValue: '0.5'
    },
    {
      name: 'Molybdenum',
      nameAr: 'الموليبدينوم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '0.1 - 3.0',
      defaultValue: '1.5'
    },
    {
      name: 'Boron',
      nameAr: 'البورون',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '0.2 - 3.0',
      defaultValue: '1.0'
    },
    {
      name: 'Iodine',
      nameAr: 'اليود',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 50000,
      type: 'single',
      unit: 'μg/L',
      refRange: '40 - 90',
      defaultValue: '60'
    },
    {
      name: 'Bromine',
      nameAr: 'البروم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'mg/L',
      refRange: '1.5 - 10',
      defaultValue: '5'
    },
    {
      name: 'Cadmium',
      nameAr: 'الكادميوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 5',
      defaultValue: '< 5'
    },
    {
      name: 'Lead (Pb)',
      nameAr: 'الرصاص',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/dL',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Mercury (Hg)',
      nameAr: 'الزئبق',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Arsenic (As)',
      nameAr: 'الزرنيخ',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 50',
      defaultValue: '< 50'
    },
    {
      name: 'Aluminum (Al)',
      nameAr: 'الألومنيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Nickel (Ni)',
      nameAr: 'النيكل',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Tin (Sn)',
      nameAr: 'القصدير',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Thallium (Tl)',
      nameAr: 'الثاليوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 5',
      defaultValue: '< 5'
    },
    {
      name: 'Uranium (U)',
      nameAr: 'اليورانيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Beryllium (Be)',
      nameAr: 'البريليوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 0.5',
      defaultValue: '< 0.5'
    },
    {
      name: 'Vanadium (V)',
      nameAr: 'الفاناديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Antimony (Sb)',
      nameAr: 'الأنتيمون',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 5',
      defaultValue: '< 5'
    },
    {
      name: 'Barium (Ba)',
      nameAr: 'الباريوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Strontium (Sr)',
      nameAr: 'السترونشيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 100',
      defaultValue: '< 100'
    },
    {
      name: 'Silver (Ag)',
      nameAr: 'الفضة',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Gold (Au)',
      nameAr: 'الذهب',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Platinum (Pt)',
      nameAr: 'البلاتين',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Palladium (Pd)',
      nameAr: 'البالاديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Rhodium (Rh)',
      nameAr: 'الروديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Iridium (Ir)',
      nameAr: 'الإيريديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Osmium (Os)',
      nameAr: 'الأوزميوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Ruthenium (Ru)',
      nameAr: 'الروثينيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Hafnium (Hf)',
      nameAr: 'الهافنيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Tantalum (Ta)',
      nameAr: 'التانتالوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Tungsten (W)',
      nameAr: 'التنغستن',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Rhenium (Re)',
      nameAr: 'الرينيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Gallium (Ga)',
      nameAr: 'الجاليوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Indium (In)',
      nameAr: 'الإنديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Thallium (Tl)',
      nameAr: 'الثاليوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 5',
      defaultValue: '< 5'
    },
    {
      name: 'Bismuth (Bi)',
      nameAr: 'البزموت',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Tellurium (Te)',
      nameAr: 'التيلوريوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Selenium (Se)',
      nameAr: 'السيلينيوم',
      category: 'Chemistry',
      categoryAr: 'الكيمياء الحيوية',
      price: 60000,
      type: 'single',
      unit: 'μg/L',
      refRange: '70 - 150',
      defaultValue: '100'
    },
    {
      name: 'Rubidium (Rb)',
      nameAr: 'الروبيديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 100',
      defaultValue: '< 100'
    },
    {
      name: 'Cesium (Cs)',
      nameAr: 'السيزيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 70000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 10',
      defaultValue: '< 10'
    },
    {
      name: 'Francium (Fr)',
      nameAr: 'الفرانسيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Radium (Ra)',
      nameAr: 'الراديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 5',
      defaultValue: '< 5'
    },
    {
      name: 'Actinium (Ac)',
      nameAr: 'الأكتينيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.1',
      defaultValue: '< 0.1'
    },
    {
      name: 'Thorium (Th)',
      nameAr: 'الثوريوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 80000,
      type: 'single',
      unit: 'μg/L',
      refRange: '< 1',
      defaultValue: '< 1'
    },
    {
      name: 'Protactinium (Pa)',
      nameAr: 'البروتأكتينيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.1',
      defaultValue: '< 0.1'
    },
    {
      name: 'Neptunium (Np)',
      nameAr: 'النبتونيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.1',
      defaultValue: '< 0.1'
    },
    {
      name: 'Plutonium (Pu)',
      nameAr: 'البلوتونيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.01',
      defaultValue: '< 0.01'
    },
    {
      name: 'Americium (Am)',
      nameAr: 'الأمريكيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.01',
      defaultValue: '< 0.01'
    },
    {
      name: 'Curium (Cm)',
      nameAr: 'الكوريوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.01',
      defaultValue: '< 0.01'
    },
    {
      name: 'Berkelium (Bk)',
      nameAr: 'البيركيليوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Californium (Cf)',
      nameAr: 'الكاليفورنيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Einsteinium (Es)',
      nameAr: 'الأينشتاينيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Fermium (Fm)',
      nameAr: 'الفيرميوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Mendelevium (Md)',
      nameAr: 'المندليفيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Nobelium (No)',
      nameAr: 'النوبيليوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Lawrencium (Lr)',
      nameAr: 'اللورنسيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Rutherfordium (Rf)',
      nameAr: 'الروذرفورديوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Dubnium (Db)',
      nameAr: 'الدوبنيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Seaborgium (Sg)',
      nameAr: 'السيبورغيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Bohrium (Bh)',
      nameAr: 'البوريوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Hassium (Hs)',
      nameAr: 'الهاسيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Meitnerium (Mt)',
      nameAr: 'الميتنيريوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Darmstadtium (Ds)',
      nameAr: 'الدارمشتاتيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Roentgenium (Rg)',
      nameAr: 'الرونتجينيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Copernicium (Cn)',
      nameAr: 'الكوبرنيسيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Nihonium (Nh)',
      nameAr: 'النيهونيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Flerovium (Fl)',
      nameAr: 'الفليروفيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Moscovium (Mc)',
      nameAr: 'الموسكوفيوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Livermorium (Lv)',
      nameAr: 'الليفرموريوم',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Tennessine (Ts)',
      nameAr: 'التينيسين',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    },
    {
      name: 'Oganesson (Og)',
      nameAr: 'الأوغانيسون',
      category: 'Toxicology',
      categoryAr: 'السموم',
      price: 90000,
      type: 'single',
      unit: 'pCi/L',
      refRange: '< 0.001',
      defaultValue: '< 0.001'
    }
  ];

  // ═══════════════════════════════════════════════════
  // دالة التهيئة: إضافة الفحوصات إذا لم تكن موجودة
  // ═══════════════════════════════════════════════════
  async function initDefaultTests() {
    if (typeof window.dbGetAll !== 'function' || typeof window.dbAdd !== 'function') {
      console.warn('[DefaultTests] db.js not loaded');
      return;
    }
    
    try {
      const existingTests = await window.dbGetAll('tests');
      
      // إذا كانت الفحوصات موجودة بالفعل، لا تضف شيئاً
      if (existingTests && existingTests.length > 0) {
        console.log('[DefaultTests] Tests already exist:', existingTests.length);
        return;
      }
      
      console.log('[DefaultTests] Adding', DEFAULT_TESTS.length, 'default tests...');
      
      for (const test of DEFAULT_TESTS) {
        await window.dbAdd('tests', {
          name: test.name,
          nameAr: test.nameAr || '',
          category: test.category,
          categoryAr: test.categoryAr || '',
          price: test.price || 0,
          unit: test.unit || '',
          refRange: test.refRange || '',
          type: test.type || 'single',
          parameters: test.parameters ? JSON.stringify(test.parameters) : null,
          defaultValue: test.defaultValue || '',
          options: test.options ? JSON.stringify(test.options) : null,
          isDefault: true,
          createdAt: new Date().toISOString()
        });
      }
      
      console.log('[DefaultTests] ✅ Added', DEFAULT_TESTS.length, 'tests successfully');
      
      // إعادة تحميل الصفحة لعرض الفحوصات
      if (typeof window.loadTests === 'function') {
        window.loadTests();
      }
      
    } catch (err) {
      console.error('[DefaultTests] Error:', err);
    }
  }

  // تشغيل التهيئة عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDefaultTests);
  } else {
    initDefaultTests();
  }

  // تصدير للاستخدام الخارجي
  window.KodNaqiDefaultTests = {
    init: initDefaultTests,
    getAll: () => DEFAULT_TESTS,
    count: DEFAULT_TESTS.length
  };

  console.log('[DefaultTests] Module loaded. Total tests:', DEFAULT_TESTS.length);
})();
