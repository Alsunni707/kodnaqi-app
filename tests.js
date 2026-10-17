// قاعدة بيانات الفحوصات الطبية — معايير CLSI
window.ALL_SYSTEM_TESTS = [
  {
    "code": "HEM-001",
    "name": "Complete Blood Count (CBC)",
    "name_ar": "صورة الدم الكاملة",
    "dept": "Hematology",
    "dept_ar": "أمراض الدم",
    "sub": "Routine",
    "price": 15000,
    "component_count": 15,
    "components": [
      {
        "name": "WBC",
        "name_ar": "كريات الدم البيضاء",
        "unit": "10^3/µL",
        "ref_min": 4.5,
        "ref_max": 11.0,
        "ref_text": "4.5 - 11.0",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "RBC",
        "name_ar": "كريات الدم الحمراء",
        "unit": "10^6/µL",
        "ref_min": 4.5,
        "ref_max": 5.9,
        "ref_text": "4.5 - 5.9 (M) | 4.1 - 5.1 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Hemoglobin (Hb)",
        "name_ar": "الهيموجلوبين",
        "unit": "g/dL",
        "ref_min": 13.5,
        "ref_max": 17.5,
        "ref_text": "13.5 - 17.5 (M) | 12.0 - 15.5 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Hematocrit (Hct)",
        "name_ar": "الهيماتوكريت",
        "unit": "%",
        "ref_min": 41,
        "ref_max": 50,
        "ref_text": "41 - 50 (M) | 36 - 48 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "MCV",
        "name_ar": "متوسط حجم الكرية",
        "unit": "fL",
        "ref_min": 80,
        "ref_max": 100,
        "ref_text": "80 - 100",
        "result_type": "numeric",
        "options": null,
        "order": 4
      },
      {
        "name": "MCH",
        "name_ar": "متوسط هيموغلوبين الكرية",
        "unit": "pg",
        "ref_min": 27,
        "ref_max": 33,
        "ref_text": "27 - 33",
        "result_type": "numeric",
        "options": null,
        "order": 5
      },
      {
        "name": "MCHC",
        "name_ar": "تركيز هيموغلوبين الكرية",
        "unit": "g/dL",
        "ref_min": 32,
        "ref_max": 36,
        "ref_text": "32 - 36",
        "result_type": "numeric",
        "options": null,
        "order": 6
      },
      {
        "name": "RDW",
        "name_ar": "عرض توزيع الحمراء",
        "unit": "%",
        "ref_min": 11.5,
        "ref_max": 14.5,
        "ref_text": "11.5 - 14.5",
        "result_type": "numeric",
        "options": null,
        "order": 7
      },
      {
        "name": "Platelets",
        "name_ar": "الصفائح الدموية",
        "unit": "10^3/µL",
        "ref_min": 150,
        "ref_max": 450,
        "ref_text": "150 - 450",
        "result_type": "numeric",
        "options": null,
        "order": 8
      },
      {
        "name": "MPV",
        "name_ar": "حجم الصفائح المتوسط",
        "unit": "fL",
        "ref_min": 7.5,
        "ref_max": 11.5,
        "ref_text": "7.5 - 11.5",
        "result_type": "numeric",
        "options": null,
        "order": 9
      },
      {
        "name": "Neutrophils",
        "name_ar": "الخلايا المتعادلة",
        "unit": "%",
        "ref_min": 40,
        "ref_max": 60,
        "ref_text": "40 - 60",
        "result_type": "numeric",
        "options": null,
        "order": 10
      },
      {
        "name": "Lymphocytes",
        "name_ar": "الخلايا اللمفاوية",
        "unit": "%",
        "ref_min": 20,
        "ref_max": 40,
        "ref_text": "20 - 40",
        "result_type": "numeric",
        "options": null,
        "order": 11
      },
      {
        "name": "Monocytes",
        "name_ar": "الخلايا الوحيدة",
        "unit": "%",
        "ref_min": 2,
        "ref_max": 8,
        "ref_text": "2 - 8",
        "result_type": "numeric",
        "options": null,
        "order": 12
      },
      {
        "name": "Eosinophils",
        "name_ar": "الخلايا الحامضية",
        "unit": "%",
        "ref_min": 1,
        "ref_max": 4,
        "ref_text": "1 - 4",
        "result_type": "numeric",
        "options": null,
        "order": 13
      },
      {
        "name": "Basophils",
        "name_ar": "الخلايا القاعدية",
        "unit": "%",
        "ref_min": 0.5,
        "ref_max": 1.0,
        "ref_text": "0.5 - 1.0",
        "result_type": "numeric",
        "options": null,
        "order": 14
      }
    ]
  },
  {
    "code": "HEM-002",
    "name": "ESR",
    "name_ar": "سرعة ترسيب الدم",
    "dept": "Hematology",
    "dept_ar": "أمراض الدم",
    "sub": "Routine",
    "price": 7000,
    "component_count": 1,
    "components": [
      {
        "name": "ESR (1 hr)",
        "name_ar": "سرعة الترسيب",
        "unit": "mm/hr",
        "ref_min": null,
        "ref_max": 15,
        "ref_text": "< 15 (M) | < 20 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HEM-003",
    "name": "Reticulocyte Count",
    "name_ar": "عدد الخلايا الشبكية",
    "dept": "Hematology",
    "dept_ar": "أمراض الدم",
    "sub": "Routine",
    "price": 10000,
    "component_count": 1,
    "components": [
      {
        "name": "Reticulocytes",
        "name_ar": "الخلايا الشبكية",
        "unit": "%",
        "ref_min": 0.5,
        "ref_max": 2.5,
        "ref_text": "0.5 - 2.5",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HEM-004",
    "name": "Sickling Test",
    "name_ar": "اختبار الأنيميا المنجلية",
    "dept": "Hematology",
    "dept_ar": "أمراض الدم",
    "sub": "Special",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      }
    ]
  },
  {
    "code": "HEM-005",
    "name": "Hb Electrophoresis",
    "name_ar": "رحلان الهيموغلوبين",
    "dept": "Hematology",
    "dept_ar": "أمراض الدم",
    "sub": "Special",
    "price": 60000,
    "component_count": 5,
    "components": [
      {
        "name": "Hb A",
        "name_ar": "هيموغلوبين A",
        "unit": "%",
        "ref_min": 95,
        "ref_max": 100,
        "ref_text": "95 - 100",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Hb A2",
        "name_ar": "هيموغلوبين A2",
        "unit": "%",
        "ref_min": 0,
        "ref_max": 3.5,
        "ref_text": "0 - 3.5",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Hb F",
        "name_ar": "هيموغلوبين F",
        "unit": "%",
        "ref_min": 0,
        "ref_max": 1.0,
        "ref_text": "0 - 1.0",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Hb S",
        "name_ar": "هيموغلوبين S",
        "unit": "%",
        "ref_min": 0,
        "ref_max": 0,
        "ref_text": "0 - 0",
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Hb C",
        "name_ar": "هيموغلوبين C",
        "unit": "%",
        "ref_min": 0,
        "ref_max": 0,
        "ref_text": "0 - 0",
        "result_type": "numeric",
        "options": null,
        "order": 4
      }
    ]
  },
  {
    "code": "HEM-006",
    "name": "G6PD",
    "name_ar": "إنزيم G6PD",
    "dept": "Hematology",
    "dept_ar": "أمراض الدم",
    "sub": "Special",
    "price": 40000,
    "component_count": 1,
    "components": [
      {
        "name": "G6PD Level",
        "name_ar": "مستوى G6PD",
        "unit": "U/g Hb",
        "ref_min": 7.0,
        "ref_max": 20.5,
        "ref_text": "7.0 - 20.5",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HEM-007",
    "name": "HbA1c",
    "name_ar": "الهيموغلوبين السكري",
    "dept": "Hematology",
    "dept_ar": "أمراض الدم",
    "sub": "Special",
    "price": 30000,
    "component_count": 1,
    "components": [
      {
        "name": "HbA1c",
        "name_ar": "الهيموغلوبين السكري",
        "unit": "%",
        "ref_min": null,
        "ref_max": 5.7,
        "ref_text": "< 5.7% (Normal) | 5.7-6.4% (Pre-DM)",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "BLD-001",
    "name": "Blood Group & Rh",
    "name_ar": "فصيلة الدم وعامل Rh",
    "dept": "Blood Bank",
    "dept_ar": "بنك الدم",
    "sub": "Immunohematology",
    "price": 5000,
    "component_count": 2,
    "components": [
      {
        "name": "ABO Group",
        "name_ar": "فصيلة ABO",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "O",
        "result_type": "select",
        "options": "A|B|AB|O",
        "order": 0
      },
      {
        "name": "Rh Factor",
        "name_ar": "عامل Rh",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Positive",
        "result_type": "select",
        "options": "Positive|Negative",
        "order": 1
      }
    ]
  },
  {
    "code": "BLD-002",
    "name": "Direct Coombs (DAT)",
    "name_ar": "كوماتس مباشر",
    "dept": "Blood Bank",
    "dept_ar": "بنك الدم",
    "sub": "Immunohematology",
    "price": 20000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      }
    ]
  },
  {
    "code": "BLD-003",
    "name": "Indirect Coombs (IAT)",
    "name_ar": "كوماتس غير مباشر",
    "dept": "Blood Bank",
    "dept_ar": "بنك الدم",
    "sub": "Immunohematology",
    "price": 20000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      }
    ]
  },
  {
    "code": "BLD-004",
    "name": "Crossmatch",
    "name_ar": "مطابقة الدم",
    "dept": "Blood Bank",
    "dept_ar": "بنك الدم",
    "sub": "Immunohematology",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Compatible",
        "result_type": "select",
        "options": "Compatible|Incompatible",
        "order": 0
      }
    ]
  },
  {
    "code": "COA-001",
    "name": "PT/INR",
    "name_ar": "زمن البروثرومبين",
    "dept": "Coagulation",
    "dept_ar": "سيولة الدم",
    "sub": "Routine",
    "price": 40000,
    "component_count": 2,
    "components": [
      {
        "name": "PT",
        "name_ar": "زمن البروثرومبين",
        "unit": "sec",
        "ref_min": 11,
        "ref_max": 13.5,
        "ref_text": "11 - 13.5",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "INR",
        "name_ar": "النسبة المعيارية",
        "unit": "Ratio",
        "ref_min": 0.8,
        "ref_max": 1.1,
        "ref_text": "0.8 - 1.1",
        "result_type": "numeric",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "code": "COA-002",
    "name": "APTT",
    "name_ar": "زمن الثرومبوبلاستين الجزئي",
    "dept": "Coagulation",
    "dept_ar": "سيولة الدم",
    "sub": "Routine",
    "price": 60000,
    "component_count": 1,
    "components": [
      {
        "name": "APTT",
        "name_ar": "زمن APTT",
        "unit": "sec",
        "ref_min": 30,
        "ref_max": 40,
        "ref_text": "30 - 40",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "COA-003",
    "name": "D-Dimer",
    "name_ar": "دي ديمر",
    "dept": "Coagulation",
    "dept_ar": "سيولة الدم",
    "sub": "Special",
    "price": 45000,
    "component_count": 1,
    "components": [
      {
        "name": "D-Dimer",
        "name_ar": "دي ديمر",
        "unit": "µg/mL FEU",
        "ref_min": null,
        "ref_max": 0.5,
        "ref_text": "< 0.5",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "COA-004",
    "name": "Fibrinogen",
    "name_ar": "الفيبرينوجين",
    "dept": "Coagulation",
    "dept_ar": "سيولة الدم",
    "sub": "Special",
    "price": 35000,
    "component_count": 1,
    "components": [
      {
        "name": "Fibrinogen",
        "name_ar": "الفيبرينوجين",
        "unit": "mg/dL",
        "ref_min": 200,
        "ref_max": 400,
        "ref_text": "200 - 400",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "CHE-001",
    "name": "Kidney Function (RFT)",
    "name_ar": "وظائف الكلى",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "RFT",
    "price": 60000,
    "component_count": 7,
    "components": [
      {
        "name": "Urea",
        "name_ar": "اليوريا",
        "unit": "mg/dL",
        "ref_min": 7,
        "ref_max": 20,
        "ref_text": "7 - 20",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Creatinine",
        "name_ar": "الكرياتينين",
        "unit": "mg/dL",
        "ref_min": 0.7,
        "ref_max": 1.3,
        "ref_text": "0.7 - 1.3 (M) | 0.6 - 1.1 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Uric Acid",
        "name_ar": "حمض اليوريك",
        "unit": "mg/dL",
        "ref_min": 3.5,
        "ref_max": 7.2,
        "ref_text": "3.5 - 7.2 (M) | 2.6 - 6.0 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "eGFR",
        "name_ar": "معدل الترشيح",
        "unit": "mL/min/1.73m²",
        "ref_min": 90,
        "ref_max": null,
        "ref_text": "> 90",
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Sodium",
        "name_ar": "الصوديوم",
        "unit": "mmol/L",
        "ref_min": 135,
        "ref_max": 145,
        "ref_text": "135 - 145",
        "result_type": "numeric",
        "options": null,
        "order": 4
      },
      {
        "name": "Potassium",
        "name_ar": "البوتاسيوم",
        "unit": "mmol/L",
        "ref_min": 3.5,
        "ref_max": 5.2,
        "ref_text": "3.5 - 5.2",
        "result_type": "numeric",
        "options": null,
        "order": 5
      },
      {
        "name": "Chloride",
        "name_ar": "الكلوريد",
        "unit": "mmol/L",
        "ref_min": 96,
        "ref_max": 106,
        "ref_text": "96 - 106",
        "result_type": "numeric",
        "options": null,
        "order": 6
      }
    ]
  },
  {
    "code": "CHE-002",
    "name": "Liver Function (LFT)",
    "name_ar": "وظائف الكبد",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "LFT",
    "price": 60000,
    "component_count": 9,
    "components": [
      {
        "name": "ALT (SGPT)",
        "name_ar": "إنزيم ALT",
        "unit": "U/L",
        "ref_min": 7,
        "ref_max": 56,
        "ref_text": "7 - 56",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "AST (SGOT)",
        "name_ar": "إنزيم AST",
        "unit": "U/L",
        "ref_min": 10,
        "ref_max": 40,
        "ref_text": "10 - 40",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "ALP",
        "name_ar": "الفوسفاتيز القلوي",
        "unit": "U/L",
        "ref_min": 44,
        "ref_max": 147,
        "ref_text": "44 - 147",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "GGT",
        "name_ar": "ناقلة غاما غلوتاميل",
        "unit": "U/L",
        "ref_min": 9,
        "ref_max": 48,
        "ref_text": "9 - 48",
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Total Bilirubin",
        "name_ar": "البيليروبين الكلي",
        "unit": "mg/dL",
        "ref_min": 0.3,
        "ref_max": 1.2,
        "ref_text": "0.3 - 1.2",
        "result_type": "numeric",
        "options": null,
        "order": 4
      },
      {
        "name": "Direct Bilirubin",
        "name_ar": "البيليروبين المباشر",
        "unit": "mg/dL",
        "ref_min": null,
        "ref_max": 0.3,
        "ref_text": "< 0.3",
        "result_type": "numeric",
        "options": null,
        "order": 5
      },
      {
        "name": "Total Protein",
        "name_ar": "البروتين الكلي",
        "unit": "g/dL",
        "ref_min": 6.0,
        "ref_max": 8.3,
        "ref_text": "6.0 - 8.3",
        "result_type": "numeric",
        "options": null,
        "order": 6
      },
      {
        "name": "Albumin",
        "name_ar": "الألبومين",
        "unit": "g/dL",
        "ref_min": 3.4,
        "ref_max": 5.4,
        "ref_text": "3.4 - 5.4",
        "result_type": "numeric",
        "options": null,
        "order": 7
      },
      {
        "name": "Globulin",
        "name_ar": "الجلوبيولين",
        "unit": "g/dL",
        "ref_min": 2.0,
        "ref_max": 3.5,
        "ref_text": "2.0 - 3.5",
        "result_type": "numeric",
        "options": null,
        "order": 8
      }
    ]
  },
  {
    "code": "CHE-003",
    "name": "Lipid Profile",
    "name_ar": "صورة الدهون",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "Lipids",
    "price": 100000,
    "component_count": 5,
    "components": [
      {
        "name": "Total Cholesterol",
        "name_ar": "الكوليسترول الكلي",
        "unit": "mg/dL",
        "ref_min": null,
        "ref_max": 200,
        "ref_text": "< 200",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Triglycerides",
        "name_ar": "الدهون الثلاثية",
        "unit": "mg/dL",
        "ref_min": null,
        "ref_max": 150,
        "ref_text": "< 150",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "HDL",
        "name_ar": "الكوليسترول النافع",
        "unit": "mg/dL",
        "ref_min": 40,
        "ref_max": null,
        "ref_text": "> 40 (M) | > 50 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "LDL",
        "name_ar": "الكوليسترول الضار",
        "unit": "mg/dL",
        "ref_min": null,
        "ref_max": 100,
        "ref_text": "< 100",
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "VLDL",
        "name_ar": "الكوليسترول VLDL",
        "unit": "mg/dL",
        "ref_min": 5,
        "ref_max": 40,
        "ref_text": "5 - 40",
        "result_type": "numeric",
        "options": null,
        "order": 4
      }
    ]
  },
  {
    "code": "CHE-004",
    "name": "Cardiac Profile",
    "name_ar": "ملف القلب",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "Cardiac",
    "price": 120000,
    "component_count": 3,
    "components": [
      {
        "name": "Troponin I",
        "name_ar": "التروبونين I",
        "unit": "ng/mL",
        "ref_min": null,
        "ref_max": 0.04,
        "ref_text": "< 0.04",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "CK-MB",
        "name_ar": "إنزيم CK-MB",
        "unit": "U/L",
        "ref_min": null,
        "ref_max": 25,
        "ref_text": "< 25",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "NT-proBNP",
        "name_ar": "NT-proBNP",
        "unit": "pg/mL",
        "ref_min": null,
        "ref_max": 125,
        "ref_text": "< 125",
        "result_type": "numeric",
        "options": null,
        "order": 2
      }
    ]
  },
  {
    "code": "CHE-005",
    "name": "Electrolytes (Na, K, Cl)",
    "name_ar": "الكهارل",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "Electrolytes",
    "price": 20000,
    "component_count": 3,
    "components": [
      {
        "name": "Sodium",
        "name_ar": "الصوديوم",
        "unit": "mmol/L",
        "ref_min": 135,
        "ref_max": 145,
        "ref_text": "135 - 145",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Potassium",
        "name_ar": "البوتاسيوم",
        "unit": "mmol/L",
        "ref_min": 3.5,
        "ref_max": 5.2,
        "ref_text": "3.5 - 5.2",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Chloride",
        "name_ar": "الكلوريد",
        "unit": "mmol/L",
        "ref_min": 96,
        "ref_max": 106,
        "ref_text": "96 - 106",
        "result_type": "numeric",
        "options": null,
        "order": 2
      }
    ]
  },
  {
    "code": "CHE-006",
    "name": "Calcium & Phosphorus",
    "name_ar": "الكالسيوم والفوسفور",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "Minerals",
    "price": 40000,
    "component_count": 2,
    "components": [
      {
        "name": "Calcium",
        "name_ar": "الكالسيوم",
        "unit": "mg/dL",
        "ref_min": 8.5,
        "ref_max": 10.2,
        "ref_text": "8.5 - 10.2",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Phosphorus",
        "name_ar": "الفوسفور",
        "unit": "mg/dL",
        "ref_min": 2.5,
        "ref_max": 4.5,
        "ref_text": "2.5 - 4.5",
        "result_type": "numeric",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "code": "CHE-007",
    "name": "Serum Magnesium",
    "name_ar": "المغنيسيوم",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "Minerals",
    "price": 20000,
    "component_count": 1,
    "components": [
      {
        "name": "Magnesium",
        "name_ar": "المغنيسيوم",
        "unit": "mg/dL",
        "ref_min": 1.7,
        "ref_max": 2.2,
        "ref_text": "1.7 - 2.2",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "CHE-008",
    "name": "Amylase & Lipase",
    "name_ar": "إنزيمات البنكرياس",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "Pancreas",
    "price": 70000,
    "component_count": 2,
    "components": [
      {
        "name": "Amylase",
        "name_ar": "الأميليز",
        "unit": "U/L",
        "ref_min": 30,
        "ref_max": 110,
        "ref_text": "30 - 110",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Lipase",
        "name_ar": "الليباز",
        "unit": "U/L",
        "ref_min": 0,
        "ref_max": 160,
        "ref_text": "0 - 160",
        "result_type": "numeric",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "code": "CHE-009",
    "name": "Total Protein & Albumin",
    "name_ar": "البروتين والألبومين",
    "dept": "Clinical Chemistry",
    "dept_ar": "الكيمياء السريرية",
    "sub": "Proteins",
    "price": 50000,
    "component_count": 4,
    "components": [
      {
        "name": "Total Protein",
        "name_ar": "البروتين الكلي",
        "unit": "g/dL",
        "ref_min": 6.0,
        "ref_max": 8.3,
        "ref_text": "6.0 - 8.3",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Albumin",
        "name_ar": "الألبومين",
        "unit": "g/dL",
        "ref_min": 3.4,
        "ref_max": 5.4,
        "ref_text": "3.4 - 5.4",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Globulin",
        "name_ar": "الجلوبيولين",
        "unit": "g/dL",
        "ref_min": 2.0,
        "ref_max": 3.5,
        "ref_text": "2.0 - 3.5",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "A/G Ratio",
        "name_ar": "نسبة A/G",
        "unit": null,
        "ref_min": 1.1,
        "ref_max": 2.5,
        "ref_text": "1.1 - 2.5",
        "result_type": "numeric",
        "options": null,
        "order": 3
      }
    ]
  },
  {
    "code": "DIA-001",
    "name": "Fasting Blood Sugar (FBS)",
    "name_ar": "سكر الدم صائم",
    "dept": "Diabetes",
    "dept_ar": "السكر والأيض",
    "sub": "Glucose",
    "price": 7000,
    "component_count": 1,
    "components": [
      {
        "name": "Fasting Glucose",
        "name_ar": "الجلوكوز صائم",
        "unit": "mg/dL",
        "ref_min": 70,
        "ref_max": 100,
        "ref_text": "70 - 100",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "DIA-002",
    "name": "Random Blood Sugar (RBS)",
    "name_ar": "سكر الدم عشوائي",
    "dept": "Diabetes",
    "dept_ar": "السكر والأيض",
    "sub": "Glucose",
    "price": 7000,
    "component_count": 1,
    "components": [
      {
        "name": "Random Glucose",
        "name_ar": "الجلوكوز عشوائي",
        "unit": "mg/dL",
        "ref_min": 70,
        "ref_max": 145,
        "ref_text": "70 - 145",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "DIA-003",
    "name": "2-Hour Postprandial",
    "name_ar": "سكر الدم بعد الأكل",
    "dept": "Diabetes",
    "dept_ar": "السكر والأيض",
    "sub": "Glucose",
    "price": 8000,
    "component_count": 1,
    "components": [
      {
        "name": "2h PP Glucose",
        "name_ar": "الجلوكوز بعد ساعتين",
        "unit": "mg/dL",
        "ref_min": null,
        "ref_max": 140,
        "ref_text": "< 140",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "DIA-004",
    "name": "Fasting Insulin",
    "name_ar": "الأنسولين الصائم",
    "dept": "Diabetes",
    "dept_ar": "السكر والأيض",
    "sub": "Hormones",
    "price": 45000,
    "component_count": 1,
    "components": [
      {
        "name": "Fasting Insulin",
        "name_ar": "الأنسولين الصائم",
        "unit": "µIU/mL",
        "ref_min": 2.6,
        "ref_max": 24.9,
        "ref_text": "2.6 - 24.9",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "DIA-005",
    "name": "C-Peptide",
    "name_ar": "الببتيد ج",
    "dept": "Diabetes",
    "dept_ar": "السكر والأيض",
    "sub": "Hormones",
    "price": 50000,
    "component_count": 1,
    "components": [
      {
        "name": "C-Peptide",
        "name_ar": "الببتيد ج",
        "unit": "ng/mL",
        "ref_min": 0.78,
        "ref_max": 1.89,
        "ref_text": "0.78 - 1.89",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-001",
    "name": "Thyroid Profile (TFT)",
    "name_ar": "وظائف الغدة الدرقية",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Thyroid",
    "price": 90000,
    "component_count": 3,
    "components": [
      {
        "name": "TSH",
        "name_ar": "هرمون TSH",
        "unit": "µIU/mL",
        "ref_min": 0.4,
        "ref_max": 4.0,
        "ref_text": "0.4 - 4.0",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Free T4",
        "name_ar": "T4 الحر",
        "unit": "ng/dL",
        "ref_min": 0.9,
        "ref_max": 1.7,
        "ref_text": "0.9 - 1.7",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Free T3",
        "name_ar": "T3 الحر",
        "unit": "pg/mL",
        "ref_min": 2.3,
        "ref_max": 4.2,
        "ref_text": "2.3 - 4.2",
        "result_type": "numeric",
        "options": null,
        "order": 2
      }
    ]
  },
  {
    "code": "HOR-002",
    "name": "TSH",
    "name_ar": "هرمون TSH",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Thyroid",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "TSH",
        "name_ar": "هرمون TSH",
        "unit": "µIU/mL",
        "ref_min": 0.4,
        "ref_max": 4.0,
        "ref_text": "0.4 - 4.0",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-003",
    "name": "Free T4",
    "name_ar": "T4 الحر",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Thyroid",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "Free T4",
        "name_ar": "T4 الحر",
        "unit": "ng/dL",
        "ref_min": 0.9,
        "ref_max": 1.7,
        "ref_text": "0.9 - 1.7",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-004",
    "name": "Free T3",
    "name_ar": "T3 الحر",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Thyroid",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "Free T3",
        "name_ar": "T3 الحر",
        "unit": "pg/mL",
        "ref_min": 2.3,
        "ref_max": 4.2,
        "ref_text": "2.3 - 4.2",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-005",
    "name": "Prolactin",
    "name_ar": "هرمون الحليب",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Reproductive",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "Prolactin",
        "name_ar": "البرولاكتين",
        "unit": "ng/mL",
        "ref_min": null,
        "ref_max": 20,
        "ref_text": "< 20 (M) | < 25 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-006",
    "name": "FSH",
    "name_ar": "الهرمون المنبه للجريب",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Reproductive",
    "price": 30000,
    "component_count": 1,
    "components": [
      {
        "name": "FSH",
        "name_ar": "الهرمون المنبه للجريب",
        "unit": "U/L",
        "ref_min": 1.5,
        "ref_max": 12.4,
        "ref_text": "1.5 - 12.4 (M) | Varies by cycle (F)",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-007",
    "name": "LH",
    "name_ar": "الهرمون اللوتيني",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Reproductive",
    "price": 30000,
    "component_count": 1,
    "components": [
      {
        "name": "LH",
        "name_ar": "الهرمون اللوتيني",
        "unit": "U/L",
        "ref_min": 1.7,
        "ref_max": 8.6,
        "ref_text": "1.7 - 8.6 (M) | Varies by cycle (F)",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-008",
    "name": "Total Testosterone",
    "name_ar": "التستوستيرون الكلي",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Reproductive",
    "price": 50000,
    "component_count": 1,
    "components": [
      {
        "name": "Total Testosterone",
        "name_ar": "التستوستيرون",
        "unit": "ng/dL",
        "ref_min": 300,
        "ref_max": 1000,
        "ref_text": "300 - 1000 (M)",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-009",
    "name": "Estradiol (E2)",
    "name_ar": "الإستراديول",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Reproductive",
    "price": 40000,
    "component_count": 1,
    "components": [
      {
        "name": "Estradiol",
        "name_ar": "الإستراديول",
        "unit": "pg/mL",
        "ref_min": 12,
        "ref_max": 48,
        "ref_text": "Follicular: 12 - 48",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-010",
    "name": "Progesterone",
    "name_ar": "البروجسترون",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Reproductive",
    "price": 40000,
    "component_count": 1,
    "components": [
      {
        "name": "Progesterone",
        "name_ar": "البروجسترون",
        "unit": "ng/mL",
        "ref_min": null,
        "ref_max": 1.5,
        "ref_text": "Follicular: < 1.5",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-011",
    "name": "Cortisol (AM)",
    "name_ar": "الكورتيزول صباحاً",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Adrenal",
    "price": 40000,
    "component_count": 1,
    "components": [
      {
        "name": "Cortisol AM",
        "name_ar": "الكورتيزول صباحاً",
        "unit": "µg/dL",
        "ref_min": 6,
        "ref_max": 23,
        "ref_text": "6 - 23",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "HOR-012",
    "name": "Beta HCG (Quantitative)",
    "name_ar": "هرمون الحمل الكمي",
    "dept": "Hormones",
    "dept_ar": "الهرمونات",
    "sub": "Reproductive",
    "price": 50000,
    "component_count": 1,
    "components": [
      {
        "name": "Beta HCG",
        "name_ar": "هرمون الحمل",
        "unit": "mIU/mL",
        "ref_min": null,
        "ref_max": 5,
        "ref_text": "Non-pregnant: < 5",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "VIT-001",
    "name": "Vitamin B12",
    "name_ar": "فيتامين B12",
    "dept": "Vitamins",
    "dept_ar": "الفيتامينات والمعادن",
    "sub": "Vitamins",
    "price": 20000,
    "component_count": 1,
    "components": [
      {
        "name": "Vitamin B12",
        "name_ar": "فيتامين B12",
        "unit": "pg/mL",
        "ref_min": 200,
        "ref_max": 900,
        "ref_text": "200 - 900",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "VIT-002",
    "name": "Vitamin D (25-OH)",
    "name_ar": "فيتامين د",
    "dept": "Vitamins",
    "dept_ar": "الفيتامينات والمعادن",
    "sub": "Vitamins",
    "price": 20000,
    "component_count": 1,
    "components": [
      {
        "name": "25-OH Vitamin D",
        "name_ar": "فيتامين د",
        "unit": "ng/mL",
        "ref_min": 30,
        "ref_max": 100,
        "ref_text": "30 - 100",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "VIT-003",
    "name": "Folate (Folic Acid)",
    "name_ar": "حمض الفوليك",
    "dept": "Vitamins",
    "dept_ar": "الفيتامينات والمعادن",
    "sub": "Vitamins",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "Folate",
        "name_ar": "حمض الفوليك",
        "unit": "ng/mL",
        "ref_min": 2.7,
        "ref_max": 17.0,
        "ref_text": "2.7 - 17.0",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "VIT-004",
    "name": "Zinc",
    "name_ar": "الزنك",
    "dept": "Vitamins",
    "dept_ar": "الفيتامينات والمعادن",
    "sub": "Minerals",
    "price": 30000,
    "component_count": 1,
    "components": [
      {
        "name": "Zinc",
        "name_ar": "الزنك",
        "unit": "µg/dL",
        "ref_min": 60,
        "ref_max": 120,
        "ref_text": "60 - 120",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "IRO-001",
    "name": "Iron Studies",
    "name_ar": "دراسة الحديد",
    "dept": "Iron Studies",
    "dept_ar": "دراسة الحديد",
    "sub": "Iron",
    "price": 50000,
    "component_count": 4,
    "components": [
      {
        "name": "Serum Iron",
        "name_ar": "الحديد في المصل",
        "unit": "µg/dL",
        "ref_min": 65,
        "ref_max": 175,
        "ref_text": "65 - 175 (M) | 50 - 170 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Ferritin",
        "name_ar": "الفيريتين",
        "unit": "ng/mL",
        "ref_min": 24,
        "ref_max": 336,
        "ref_text": "24 - 336 (M) | 11 - 307 (F)",
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "TIBC",
        "name_ar": "السعة الكلية لربط الحديد",
        "unit": "µg/dL",
        "ref_min": 240,
        "ref_max": 450,
        "ref_text": "240 - 450",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Transferrin Saturation",
        "name_ar": "تشبع الترانسفيرين",
        "unit": "%",
        "ref_min": 20,
        "ref_max": 50,
        "ref_text": "20 - 50",
        "result_type": "numeric",
        "options": null,
        "order": 3
      }
    ]
  },
  {
    "code": "SER-001",
    "name": "HBsAg",
    "name_ar": "فيروس الكبد B",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 15000,
    "component_count": 1,
    "components": [
      {
        "name": "HBsAg",
        "name_ar": "HBsAg",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive",
        "order": 0
      }
    ]
  },
  {
    "code": "SER-002",
    "name": "Anti-HCV",
    "name_ar": "فيروس الكبد C",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 15000,
    "component_count": 1,
    "components": [
      {
        "name": "Anti-HCV",
        "name_ar": "Anti-HCV",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive",
        "order": 0
      }
    ]
  },
  {
    "code": "SER-003",
    "name": "HIV Ab/Ag Combo",
    "name_ar": "فحص الإيدز",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 15000,
    "component_count": 1,
    "components": [
      {
        "name": "HIV Ag/Ab",
        "name_ar": "HIV Ag/Ab",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive",
        "order": 0
      }
    ]
  },
  {
    "code": "SER-004",
    "name": "VDRL / RPR",
    "name_ar": "فحص الزهري",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 10000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive",
        "order": 0
      }
    ]
  },
  {
    "code": "SER-005",
    "name": "Widal Agglutination Test",
    "name_ar": "اختبار ويدال (تيفويد)",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Bacterial",
    "price": 7000,
    "component_count": 5,
    "components": [
      {
        "name": "S. typhi O",
        "name_ar": "تيفويد O",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1:20|1:40|1:80|1:160|1:320|1:640",
        "order": 0
      },
      {
        "name": "S. typhi H",
        "name_ar": "تيفويد H",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1:20|1:40|1:80|1:160|1:320|1:640",
        "order": 1
      },
      {
        "name": "S. paratyphi AH",
        "name_ar": "باراتيفويد AH",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1:20|1:40|1:80|1:160|1:320|1:640",
        "order": 2
      },
      {
        "name": "S. paratyphi BH",
        "name_ar": "باراتيفويد BH",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1:20|1:40|1:80|1:160|1:320|1:640",
        "order": 3
      },
      {
        "name": "S. paratyphi CH",
        "name_ar": "باراتيفويد CH",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1:20|1:40|1:80|1:160|1:320|1:640",
        "order": 4
      }
    ]
  },
  {
    "code": "SER-006",
    "name": "Brucella Agglutination",
    "name_ar": "البروسيلا (تلزن)",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Bacterial",
    "price": 8000,
    "component_count": 2,
    "components": [
      {
        "name": "B. abortus",
        "name_ar": "بروسيلا أبورتس",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1:20|1:40|1:80|1:160|1:320|1:640",
        "order": 0
      },
      {
        "name": "B. melitensis",
        "name_ar": "بروسيلا مليتنسس",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1:20|1:40|1:80|1:160|1:320|1:640",
        "order": 1
      }
    ]
  },
  {
    "code": "SER-007",
    "name": "Brucella ICT",
    "name_ar": "البروسيلا (سريع)",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Bacterial",
    "price": 8000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive",
        "order": 0
      }
    ]
  },
  {
    "code": "SER-008",
    "name": "Typhoid ICT",
    "name_ar": "التيفويد (سريع)",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Bacterial",
    "price": 7500,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      }
    ]
  },
  {
    "code": "SER-009",
    "name": "Toxoplasma IgG/IgM",
    "name_ar": "التوكسوبلازما",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Parasitic",
    "price": 12000,
    "component_count": 2,
    "components": [
      {
        "name": "IgG",
        "name_ar": "IgG",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive|Equivocal",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": "IgM",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive|Equivocal",
        "order": 1
      }
    ]
  },
  {
    "code": "SER-010",
    "name": "Rubella IgG/IgM",
    "name_ar": "الحصبة الألمانية",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 12000,
    "component_count": 2,
    "components": [
      {
        "name": "IgG",
        "name_ar": "IgG",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive|Equivocal",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": "IgM",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive|Equivocal",
        "order": 1
      }
    ]
  },
  {
    "code": "SER-011",
    "name": "CMV IgG/IgM",
    "name_ar": "الفيروس المضخم للخلايا",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 12000,
    "component_count": 2,
    "components": [
      {
        "name": "IgG",
        "name_ar": "IgG",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive|Equivocal",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": "IgM",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive|Equivocal",
        "order": 1
      }
    ]
  },
  {
    "code": "SER-012",
    "name": "H. pylori Ab",
    "name_ar": "جرثومة المعدة - أجسام مضادة",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Bacterial",
    "price": 10000,
    "component_count": 2,
    "components": [
      {
        "name": "IgG",
        "name_ar": "IgG",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": "IgM",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive",
        "order": 1
      }
    ]
  },
  {
    "code": "SER-013",
    "name": "Dengue Profile",
    "name_ar": "حمى الضنك",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 30000,
    "component_count": 3,
    "components": [
      {
        "name": "NS1 Antigen",
        "name_ar": "أنتيجين NS1",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      },
      {
        "name": "IgG",
        "name_ar": "IgG",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 1
      },
      {
        "name": "IgM",
        "name_ar": "IgM",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 2
      }
    ]
  },
  {
    "code": "SER-014",
    "name": "Pregnancy Test (HCG)",
    "name_ar": "اختبار الحمل",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Hormone",
    "price": 7000,
    "component_count": 1,
    "components": [
      {
        "name": "HCG Urine",
        "name_ar": "HCG البولي",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      }
    ]
  },
  {
    "code": "SER-015",
    "name": "COVID-19 Antigen",
    "name_ar": "كوفيد-19",
    "dept": "Serology",
    "dept_ar": "المصليات",
    "sub": "Viral",
    "price": 15000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Invalid",
        "order": 0
      }
    ]
  },
  {
    "code": "INF-001",
    "name": "CRP",
    "name_ar": "بروتين سي التفاعلي",
    "dept": "Inflammatory",
    "dept_ar": "الالتهابات والمناعة الذاتية",
    "sub": "Acute Phase",
    "price": 10000,
    "component_count": 1,
    "components": [
      {
        "name": "CRP",
        "name_ar": "CRP",
        "unit": "mg/L",
        "ref_min": null,
        "ref_max": 5,
        "ref_text": "< 5",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "INF-002",
    "name": "hs-CRP",
    "name_ar": "CRP عالي الحساسية",
    "dept": "Inflammatory",
    "dept_ar": "الالتهابات والمناعة الذاتية",
    "sub": "Cardiac Risk",
    "price": 20000,
    "component_count": 1,
    "components": [
      {
        "name": "hs-CRP",
        "name_ar": "hs-CRP",
        "unit": "mg/L",
        "ref_min": null,
        "ref_max": 1.0,
        "ref_text": "< 1.0",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "INF-003",
    "name": "ASO",
    "name_ar": "الأنتيستربتوليسين O",
    "dept": "Inflammatory",
    "dept_ar": "الالتهابات والمناعة الذاتية",
    "sub": "Bacterial",
    "price": 10000,
    "component_count": 1,
    "components": [
      {
        "name": "ASO",
        "name_ar": "ASO",
        "unit": "IU/mL",
        "ref_min": null,
        "ref_max": 200,
        "ref_text": "< 200",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "INF-004",
    "name": "RF",
    "name_ar": "العامل الروماتويدي",
    "dept": "Inflammatory",
    "dept_ar": "الالتهابات والمناعة الذاتية",
    "sub": "Autoimmune",
    "price": 15000,
    "component_count": 1,
    "components": [
      {
        "name": "RF",
        "name_ar": "RF",
        "unit": "IU/mL",
        "ref_min": null,
        "ref_max": 14,
        "ref_text": "< 14",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "INF-005",
    "name": "ANA",
    "name_ar": "الأجسام المضادة للنواة",
    "dept": "Inflammatory",
    "dept_ar": "الالتهابات والمناعة الذاتية",
    "sub": "Autoimmune",
    "price": 100000,
    "component_count": 2,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      },
      {
        "name": "Pattern",
        "name_ar": "النمط",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Applicable",
        "result_type": "text",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "code": "INF-006",
    "name": "Anti-CCP",
    "name_ar": "الببتيد الحلقي المضاد",
    "dept": "Inflammatory",
    "dept_ar": "الالتهابات والمناعة الذاتية",
    "sub": "Autoimmune",
    "price": 50000,
    "component_count": 1,
    "components": [
      {
        "name": "Anti-CCP",
        "name_ar": "Anti-CCP",
        "unit": "U/mL",
        "ref_min": null,
        "ref_max": 17,
        "ref_text": "< 17",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "INF-007",
    "name": "Anti-dsDNA",
    "name_ar": "الحمض النووي مزدوج الشريط",
    "dept": "Inflammatory",
    "dept_ar": "الالتهابات والمناعة الذاتية",
    "sub": "Autoimmune",
    "price": 50000,
    "component_count": 1,
    "components": [
      {
        "name": "Anti-dsDNA",
        "name_ar": "Anti-dsDNA",
        "unit": "IU/mL",
        "ref_min": null,
        "ref_max": 30,
        "ref_text": "< 30",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "MIC-001",
    "name": "Blood Culture",
    "name_ar": "مزرعة الدم",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Culture",
    "price": 25000,
    "component_count": 3,
    "components": [
      {
        "name": "Growth",
        "name_ar": "النمو",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "No Growth",
        "result_type": "select",
        "options": "No Growth|Normal Flora|Pathogenic Growth",
        "order": 0
      },
      {
        "name": "Organism",
        "name_ar": "الكائن المسبب",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Isolated",
        "result_type": "text",
        "options": null,
        "order": 1
      },
      {
        "name": "Sensitivity",
        "name_ar": "الحساسية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Sensitive",
        "result_type": "select",
        "options": "Sensitive|Intermediate|Resistant",
        "order": 2
      }
    ]
  },
  {
    "code": "MIC-002",
    "name": "Urine Culture",
    "name_ar": "مزرعة البول",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Culture",
    "price": 15000,
    "component_count": 3,
    "components": [
      {
        "name": "Growth",
        "name_ar": "النمو",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "No Growth",
        "result_type": "select",
        "options": "No Growth|Normal Flora|Pathogenic Growth",
        "order": 0
      },
      {
        "name": "Organism",
        "name_ar": "الكائن المسبب",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Isolated",
        "result_type": "text",
        "options": null,
        "order": 1
      },
      {
        "name": "Sensitivity",
        "name_ar": "الحساسية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Sensitive",
        "result_type": "select",
        "options": "Sensitive|Intermediate|Resistant",
        "order": 2
      }
    ]
  },
  {
    "code": "MIC-003",
    "name": "Stool Culture",
    "name_ar": "مزرعة البراز",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Culture",
    "price": 60000,
    "component_count": 3,
    "components": [
      {
        "name": "Growth",
        "name_ar": "النمو",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal Flora",
        "result_type": "select",
        "options": "No Growth|Normal Flora|Pathogenic Growth",
        "order": 0
      },
      {
        "name": "Organism",
        "name_ar": "الكائن المسبب",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Isolated",
        "result_type": "text",
        "options": null,
        "order": 1
      },
      {
        "name": "Sensitivity",
        "name_ar": "الحساسية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Sensitive",
        "result_type": "select",
        "options": "Sensitive|Intermediate|Resistant",
        "order": 2
      }
    ]
  },
  {
    "code": "MIC-004",
    "name": "Wound Swab Culture",
    "name_ar": "مزرعة مسحة الجرح",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Culture",
    "price": 20000,
    "component_count": 3,
    "components": [
      {
        "name": "Growth",
        "name_ar": "النمو",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "No Growth",
        "result_type": "select",
        "options": "No Growth|Normal Flora|Pathogenic Growth",
        "order": 0
      },
      {
        "name": "Organism",
        "name_ar": "الكائن المسبب",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Isolated",
        "result_type": "text",
        "options": null,
        "order": 1
      },
      {
        "name": "Sensitivity",
        "name_ar": "الحساسية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Sensitive",
        "result_type": "select",
        "options": "Sensitive|Intermediate|Resistant",
        "order": 2
      }
    ]
  },
  {
    "code": "MIC-005",
    "name": "Throat Swab Culture",
    "name_ar": "مزرعة مسحة الحلق",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Culture",
    "price": 20000,
    "component_count": 3,
    "components": [
      {
        "name": "Growth",
        "name_ar": "النمو",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal Flora",
        "result_type": "select",
        "options": "No Growth|Normal Flora|Pathogenic Growth",
        "order": 0
      },
      {
        "name": "Organism",
        "name_ar": "الكائن المسبب",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Isolated",
        "result_type": "text",
        "options": null,
        "order": 1
      },
      {
        "name": "Sensitivity",
        "name_ar": "الحساسية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Sensitive",
        "result_type": "select",
        "options": "Sensitive|Intermediate|Resistant",
        "order": 2
      }
    ]
  },
  {
    "code": "MIC-006",
    "name": "Gram Stain",
    "name_ar": "صبغة جرام",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Stain",
    "price": 8000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "No Organism Seen",
        "result_type": "select",
        "options": "No Organism Seen|Gram Positive Cocci|Gram Positive Bacilli|Gram Negative Cocci|Gram Negative Bacilli|Mixed Flora",
        "order": 0
      }
    ]
  },
  {
    "code": "MIC-007",
    "name": "AFB Stain (Ziehl-Neelsen)",
    "name_ar": "صبغة الزيل نلسن (الدرن)",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Stain",
    "price": 8000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive Scanty|Positive 1+|Positive 2+|Positive 3+",
        "order": 0
      }
    ]
  },
  {
    "code": "MIC-008",
    "name": "GeneXpert MTB/RIF",
    "name_ar": "جين إكسبرت للدرن",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Molecular",
    "price": 80000,
    "component_count": 2,
    "components": [
      {
        "name": "MTB DNA",
        "name_ar": "DNA الدرن",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Detected",
        "result_type": "select",
        "options": "Not Detected|Detected",
        "order": 0
      },
      {
        "name": "Rifampicin Resistance",
        "name_ar": "مقاومة الريفامبيسين",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Detected",
        "result_type": "select",
        "options": "Not Detected|Detected",
        "order": 1
      }
    ]
  },
  {
    "code": "MIC-009",
    "name": "Fungal Culture",
    "name_ar": "مزرعة الفطريات",
    "dept": "Microbiology",
    "dept_ar": "الميكروبيولوجي",
    "sub": "Culture",
    "price": 30000,
    "component_count": 1,
    "components": [
      {
        "name": "Growth",
        "name_ar": "النمو",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "No Growth",
        "result_type": "select",
        "options": "No Growth|Yeast Cells Seen|Hyphae Seen|Both",
        "order": 0
      }
    ]
  },
  {
    "code": "PAR-001",
    "name": "Malaria Microscopy (BFFM)",
    "name_ar": "الملاريا - الفيلم المجهري",
    "dept": "Parasitology",
    "dept_ar": "الطفيليات",
    "sub": "Malaria",
    "price": 25000,
    "component_count": 4,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "No Malaria Parasite Seen",
        "result_type": "select",
        "options": "No Malaria Parasite Seen|Malaria Parasite Seen",
        "order": 0
      },
      {
        "name": "Species",
        "name_ar": "النوع",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Applicable",
        "result_type": "select",
        "options": "Not Applicable|P. falciparum|P. vivax|P. malariae|P. ovale|Mixed",
        "order": 1
      },
      {
        "name": "Stage",
        "name_ar": "الطور",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Applicable",
        "result_type": "select",
        "options": "Not Applicable|Ring|Trophozoite|Schizont|Gametocyte|Multiple",
        "order": 2
      },
      {
        "name": "Density",
        "name_ar": "الكثافة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Applicable",
        "result_type": "select",
        "options": "Not Applicable|Scanty|+|++|+++|++++",
        "order": 3
      }
    ]
  },
  {
    "code": "PAR-002",
    "name": "Malaria ICT",
    "name_ar": "الملاريا - اختبار سريع",
    "dept": "Parasitology",
    "dept_ar": "الطفيليات",
    "sub": "Malaria",
    "price": 10000,
    "component_count": 2,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive Reactive P. falciparum|Positive Reactive P. vivax|Positive Reactive P. ovale|Positive Reactive P. malariae|Positive Reactive Mixed",
        "order": 0
      },
      {
        "name": "Species",
        "name_ar": "النوع",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Applicable",
        "result_type": "select",
        "options": "Not Applicable|P. falciparum|P. vivax|P. ovale|P. malariae|Mixed",
        "order": 1
      }
    ]
  },
  {
    "code": "PAR-003",
    "name": "Stool Ova & Parasites",
    "name_ar": "بيوض وطفيليات البراز",
    "dept": "Parasitology",
    "dept_ar": "الطفيليات",
    "sub": "Stool",
    "price": 10000,
    "component_count": 2,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Ascaris lumbricoides|Hookworm|Giardia lamblia|Entamoeba histolytica|Hymenolepis nana|Taenia spp|Schistosoma mansoni|Trichuris trichiura|Enterobius vermicularis|Mixed",
        "order": 0
      },
      {
        "name": "Quantity",
        "name_ar": "الكمية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Applicable",
        "result_type": "select",
        "options": "Not Applicable|Scanty|Few|Moderate|Many",
        "order": 1
      }
    ]
  },
  {
    "code": "PAR-004",
    "name": "Stool Occult Blood",
    "name_ar": "الدم الخفي بالبراز",
    "dept": "Parasitology",
    "dept_ar": "الطفيليات",
    "sub": "Stool",
    "price": 25000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Trace",
        "order": 0
      }
    ]
  },
  {
    "code": "PAR-005",
    "name": "Giardia Antigen",
    "name_ar": "أنتيجين الجيارديا",
    "dept": "Parasitology",
    "dept_ar": "الطفيليات",
    "sub": "Stool",
    "price": 15000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      }
    ]
  },
  {
    "code": "PAR-006",
    "name": "Entamoeba Antigen",
    "name_ar": "أنتيجين الأميبا",
    "dept": "Parasitology",
    "dept_ar": "الطفيليات",
    "sub": "Stool",
    "price": 15000,
    "component_count": 1,
    "components": [
      {
        "name": "Result",
        "name_ar": "النتيجة",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      }
    ]
  },
  {
    "code": "URN-001",
    "name": "Urine Analysis (UG)",
    "name_ar": "تحليل البول العام",
    "dept": "Urine Analysis",
    "dept_ar": "تحليل البول",
    "sub": "Routine",
    "price": 5000,
    "component_count": 21,
    "components": [
      {
        "name": "Color",
        "name_ar": "اللون",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Pale Yellow",
        "result_type": "select",
        "options": "Colorless|Pale Yellow|Yellow|Dark Yellow|Amber|Red|Brown|Orange",
        "order": 0
      },
      {
        "name": "Appearance",
        "name_ar": "المظهر",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Clear",
        "result_type": "select",
        "options": "Clear|Slightly Cloudy|Cloudy|Turbid",
        "order": 1
      },
      {
        "name": "pH",
        "name_ar": "الأس الهيدروجيني",
        "unit": null,
        "ref_min": 4.6,
        "ref_max": 8.0,
        "ref_text": "4.6 - 8.0",
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Specific Gravity",
        "name_ar": "الكثافة النوعية",
        "unit": null,
        "ref_min": 1.005,
        "ref_max": 1.03,
        "ref_text": "1.005 - 1.03",
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Protein",
        "name_ar": "البروتين",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Trace|1+|2+|3+|4+",
        "order": 4
      },
      {
        "name": "Glucose",
        "name_ar": "الجلوكوز",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Trace|1+|2+|3+|4+",
        "order": 5
      },
      {
        "name": "Ketones",
        "name_ar": "الكيتونات",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Trace|1+|2+|3+|4+",
        "order": 6
      },
      {
        "name": "Blood",
        "name_ar": "الدم",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Trace|1+|2+|3+|4+",
        "order": 7
      },
      {
        "name": "Nitrite",
        "name_ar": "النيتريت",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 8
      },
      {
        "name": "Leukocyte Esterase",
        "name_ar": "استريز الكريات",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Trace|1+|2+|3+",
        "order": 9
      },
      {
        "name": "Bilirubin",
        "name_ar": "البيليروبين",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 10
      },
      {
        "name": "Urobilinogen",
        "name_ar": "اليوروبيلينوجين",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal",
        "result_type": "select",
        "options": "Normal|Increased",
        "order": 11
      },
      {
        "name": "WBC Microscopy",
        "name_ar": "كريات بيضاء (مجهري)",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 5 /HPF",
        "result_type": "text",
        "options": null,
        "order": 12
      },
      {
        "name": "RBC Microscopy",
        "name_ar": "كريات حمراء (مجهري)",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 2 /HPF",
        "result_type": "text",
        "options": null,
        "order": 13
      },
      {
        "name": "Epithelial Cells",
        "name_ar": "خلايا ظهارية",
        "unit": "/HPF",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 5",
        "result_type": "text",
        "options": null,
        "order": 14
      },
      {
        "name": "Casts",
        "name_ar": "أسطوانات",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Hyaline|Granular|RBC Casts|WBC Casts",
        "order": 15
      },
      {
        "name": "Crystals",
        "name_ar": "بلورات",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Uric Acid|Calcium Oxalate|Triple Phosphate|Others",
        "order": 16
      },
      {
        "name": "Bacteria",
        "name_ar": "بكتيريا",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Few|Moderate|Many",
        "order": 17
      },
      {
        "name": "Fungi / Yeast",
        "name_ar": "فطريات / خمائر",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Few|Moderate|Many",
        "order": 18
      },
      {
        "name": "Trichomonas",
        "name_ar": "ترايكوموناس",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Seen",
        "order": 19
      },
      {
        "name": "Schistosoma haematobium Ova",
        "name_ar": "بيوض البلهارسيا البولية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Seen",
        "order": 20
      }
    ]
  },
  {
    "code": "URN-002",
    "name": "Microalbumin (Urine)",
    "name_ar": "الألبومين الدقيق",
    "dept": "Urine Analysis",
    "dept_ar": "تحليل البول",
    "sub": "Proteins",
    "price": 7000,
    "component_count": 1,
    "components": [
      {
        "name": "Microalbumin",
        "name_ar": "الألبومين الدقيق",
        "unit": "mg/L",
        "ref_min": null,
        "ref_max": 30,
        "ref_text": "< 30",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "STL-001",
    "name": "Stool Analysis",
    "name_ar": "تحليل البراز العام",
    "dept": "Stool Analysis",
    "dept_ar": "تحليل البراز",
    "sub": "Routine",
    "price": 5000,
    "component_count": 10,
    "components": [
      {
        "name": "Color",
        "name_ar": "اللون",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Brown",
        "result_type": "select",
        "options": "Brown|Yellow|Green|Black|Red|Pale",
        "order": 0
      },
      {
        "name": "Consistency",
        "name_ar": "القوام",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Formed",
        "result_type": "select",
        "options": "Formed|Semi-formed|Loose|Watery|Hard",
        "order": 1
      },
      {
        "name": "Ova & Parasites",
        "name_ar": "البيوض والطفيليات",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Ascaris|Hookworm|Giardia|Entamoeba|H. nana|Taenia|Schistosoma|Other",
        "order": 2
      },
      {
        "name": "Occult Blood",
        "name_ar": "الدم الخفي",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 3
      },
      {
        "name": "Pus Cells",
        "name_ar": "الخلايا الصديدية",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 2 /HPF",
        "result_type": "text",
        "options": null,
        "order": 4
      },
      {
        "name": "RBCs",
        "name_ar": "كريات حمراء",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 1 /HPF",
        "result_type": "text",
        "options": null,
        "order": 5
      },
      {
        "name": "Ova",
        "name_ar": "بيوض",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Ascaris|Hookworm|Taenia|H. nana|Schistosoma",
        "order": 6
      },
      {
        "name": "Cysts",
        "name_ar": "أكياس",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Entamoeba histolytica|Giardia lamblia",
        "order": 7
      },
      {
        "name": "Bacteria",
        "name_ar": "بكتيريا",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal Flora",
        "result_type": "select",
        "options": "Normal Flora|Abnormal|Not Seen",
        "order": 8
      },
      {
        "name": "Fungi / Yeast",
        "name_ar": "فطريات / خمائر",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Seen",
        "order": 9
      }
    ]
  },
  {
    "code": "TMR-001",
    "name": "PSA Total",
    "name_ar": "مؤشر البروستاتا",
    "dept": "Tumor Markers",
    "dept_ar": "مؤشرات الأورام",
    "sub": "Prostate",
    "price": 120000,
    "component_count": 1,
    "components": [
      {
        "name": "Total PSA",
        "name_ar": "PSA الكلي",
        "unit": "ng/mL",
        "ref_min": null,
        "ref_max": 4.0,
        "ref_text": "< 4.0",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "TMR-002",
    "name": "CEA",
    "name_ar": "المستضد السرطاني المضغي",
    "dept": "Tumor Markers",
    "dept_ar": "مؤشرات الأورام",
    "sub": "Colorectal",
    "price": 60000,
    "component_count": 1,
    "components": [
      {
        "name": "CEA",
        "name_ar": "CEA",
        "unit": "ng/mL",
        "ref_min": null,
        "ref_max": 3.0,
        "ref_text": "< 3.0",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "TMR-003",
    "name": "AFP",
    "name_ar": "ألفا فيتو بروتين",
    "dept": "Tumor Markers",
    "dept_ar": "مؤشرات الأورام",
    "sub": "Liver",
    "price": 20000,
    "component_count": 1,
    "components": [
      {
        "name": "AFP",
        "name_ar": "AFP",
        "unit": "ng/mL",
        "ref_min": null,
        "ref_max": 10,
        "ref_text": "< 10",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "TMR-004",
    "name": "CA-125",
    "name_ar": "مؤشر سرطان المبيض",
    "dept": "Tumor Markers",
    "dept_ar": "مؤشرات الأورام",
    "sub": "Ovary",
    "price": 70000,
    "component_count": 1,
    "components": [
      {
        "name": "CA-125",
        "name_ar": "CA-125",
        "unit": "U/mL",
        "ref_min": null,
        "ref_max": 35,
        "ref_text": "< 35",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "TMR-005",
    "name": "CA 15-3",
    "name_ar": "مؤشر سرطان الثدي",
    "dept": "Tumor Markers",
    "dept_ar": "مؤشرات الأورام",
    "sub": "Breast",
    "price": 70000,
    "component_count": 1,
    "components": [
      {
        "name": "CA 15-3",
        "name_ar": "CA 15-3",
        "unit": "U/mL",
        "ref_min": null,
        "ref_max": 30,
        "ref_text": "< 30",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "code": "TMR-006",
    "name": "CA 19-9",
    "name_ar": "مؤشر سرطان البنكرياس",
    "dept": "Tumor Markers",
    "dept_ar": "مؤشرات الأورام",
    "sub": "Pancreas",
    "price": 70000,
    "component_count": 1,
    "components": [
      {
        "name": "CA 19-9",
        "name_ar": "CA 19-9",
        "unit": "U/mL",
        "ref_min": null,
        "ref_max": 37,
        "ref_text": "< 37",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  }
];

console.log('✅ تم تحميل 92 فحصاً');

function getAllTestsData() { return window.ALL_SYSTEM_TESTS || []; }
