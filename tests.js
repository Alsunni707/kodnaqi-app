// ============================================================
// KodNaqi — بيانات التحاليل الطبية (73 فحص بمعايير WHO)
// مُصدّر من قاعدة البيانات الأصلية
// ============================================================

const TESTS_DATA = [
  {
    "name": "Semen Analysis",
    "name_ar": "تحليل السائل المنوي",
    "category": "Andrology",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Volume",
        "name_ar": null,
        "unit": "mL",
        "ref_min": 1.5,
        "ref_max": 5.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Color",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Grayish White",
        "result_type": "select",
        "options": "Grayish White|White|Yellowish|Transparent",
        "order": 1
      },
      {
        "name": "Viscosity",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal",
        "result_type": "select",
        "options": "Normal|Increased|Decreased|Liquefied",
        "order": 2
      },
      {
        "name": "pH",
        "name_ar": null,
        "unit": null,
        "ref_min": 7.2,
        "ref_max": 8.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Sperm Count",
        "name_ar": null,
        "unit": "million/mL",
        "ref_min": 15.0,
        "ref_max": null,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 4
      },
      {
        "name": "Total Motility",
        "name_ar": null,
        "unit": "%",
        "ref_min": 40.0,
        "ref_max": null,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 5
      },
      {
        "name": "Progressive Motility",
        "name_ar": null,
        "unit": "%",
        "ref_min": 32.0,
        "ref_max": null,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 6
      },
      {
        "name": "Normal Morphology",
        "name_ar": null,
        "unit": "%",
        "ref_min": 4.0,
        "ref_max": null,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 7
      },
      {
        "name": "WBC",
        "name_ar": null,
        "unit": "million/mL",
        "ref_min": 0.0,
        "ref_max": 1.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 8
      }
    ]
  },
  {
    "name": "CK-MB",
    "name_ar": "إنزيم القلب",
    "category": "Cardiac",
    "price": 120000.0,
    "unit": null,
    "parameters": [
      {
        "name": "CK-MB",
        "name_ar": null,
        "unit": "U/L",
        "ref_min": 0.0,
        "ref_max": 25.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "NT-proBNP",
    "name_ar": "فشل القلب",
    "category": "Cardiac",
    "price": 25000.0,
    "unit": null,
    "parameters": [
      {
        "name": "NT-proBNP",
        "name_ar": null,
        "unit": "pg/mL",
        "ref_min": 0.0,
        "ref_max": 125.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Troponin I",
    "name_ar": "التروبونين",
    "category": "Cardiac",
    "price": 80000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Troponin I",
        "name_ar": "التروبونين I",
        "unit": "ng/mL",
        "ref_min": 0.0,
        "ref_max": 0.04,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Amylase & Lipase",
    "name_ar": "إنزيمات البنكرياس",
    "category": "Chemistry",
    "price": 70000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Amylase",
        "name_ar": "الأميليز",
        "unit": "U/L",
        "ref_min": 30.0,
        "ref_max": 110.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Lipase",
        "name_ar": "الليباز",
        "unit": "U/L",
        "ref_min": 10.0,
        "ref_max": 140.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "name": "Calcium & Phosphorus",
    "name_ar": "الكالسيوم والفوسفور",
    "category": "Chemistry",
    "price": 40000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Calcium",
        "name_ar": "الكالسيوم",
        "unit": "mg/dL",
        "ref_min": 8.5,
        "ref_max": 10.5,
        "ref_text": null,
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
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "name": "Electrolytes (Na, K, Cl)",
    "name_ar": "الكهارل",
    "category": "Chemistry",
    "price": 20000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Sodium (Na)",
        "name_ar": null,
        "unit": "mmol/L",
        "ref_min": 135.0,
        "ref_max": 145.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Potassium (K)",
        "name_ar": null,
        "unit": "mmol/L",
        "ref_min": 3.5,
        "ref_max": 5.1,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Chloride (Cl)",
        "name_ar": null,
        "unit": "mmol/L",
        "ref_min": 98.0,
        "ref_max": 107.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      }
    ]
  },
  {
    "name": "Fasting Blood Sugar (FBS)",
    "name_ar": "سكر الدم صائم",
    "category": "Chemistry",
    "price": 7000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Glucose (Fasting)",
        "name_ar": "الجلوكوز صائم",
        "unit": "mg/dL",
        "ref_min": 70.0,
        "ref_max": 100.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "HbA1c",
    "name_ar": "الهيموغلوبين السكري",
    "category": "Chemistry",
    "price": 30000.0,
    "unit": null,
    "parameters": [
      {
        "name": "HbA1c",
        "name_ar": "الهيموغلوبين السكري",
        "unit": "%",
        "ref_min": 4.0,
        "ref_max": 5.6,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Estimated Average Glucose",
        "name_ar": "متوسط الجلوكوز التقديري",
        "unit": "mg/dL",
        "ref_min": 68.0,
        "ref_max": 114.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "name": "Iron Studies",
    "name_ar": "دراسة الحديد",
    "category": "Chemistry",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Serum Iron",
        "name_ar": "الحديد",
        "unit": "µg/dL",
        "ref_min": 60.0,
        "ref_max": 170.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Ferritin",
        "name_ar": "الفيريتين",
        "unit": "ng/mL",
        "ref_min": 20.0,
        "ref_max": 250.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "TIBC",
        "name_ar": "القدرة الكلية للارتباط",
        "unit": "µg/dL",
        "ref_min": 240.0,
        "ref_max": 450.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      }
    ]
  },
  {
    "name": "Kidney Functions",
    "name_ar": "وظائف الكلى",
    "category": "Chemistry",
    "price": 60000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Urea",
        "name_ar": "اليوريا",
        "unit": "mg/dL",
        "ref_min": 15.0,
        "ref_max": 45.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Creatinine",
        "name_ar": "الكرياتينين",
        "unit": "mg/dL",
        "ref_min": 0.6,
        "ref_max": 1.2,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Uric Acid",
        "name_ar": "حمض اليوريك",
        "unit": "mg/dL",
        "ref_min": 3.4,
        "ref_max": 7.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Sodium",
        "name_ar": "الصوديوم",
        "unit": "mmol/L",
        "ref_min": 135.0,
        "ref_max": 145.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Potassium",
        "name_ar": "البوتاسيوم",
        "unit": "mmol/L",
        "ref_min": 3.5,
        "ref_max": 5.1,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 4
      },
      {
        "name": "Chloride",
        "name_ar": "الكلوريد",
        "unit": "mmol/L",
        "ref_min": 98.0,
        "ref_max": 107.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 5
      }
    ]
  },
  {
    "name": "Lipid Profile",
    "name_ar": "صورة الدهون",
    "category": "Chemistry",
    "price": 100000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Total Cholesterol",
        "name_ar": "الكوليسترول الكلي",
        "unit": "mg/dL",
        "ref_min": 0.0,
        "ref_max": 200.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Triglycerides",
        "name_ar": "الدهون الثلاثية",
        "unit": "mg/dL",
        "ref_min": 0.0,
        "ref_max": 150.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "HDL Cholesterol",
        "name_ar": "الكوليسترول النافع",
        "unit": "mg/dL",
        "ref_min": 40.0,
        "ref_max": null,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "LDL Cholesterol",
        "name_ar": "الكوليسترول الضار",
        "unit": "mg/dL",
        "ref_min": 0.0,
        "ref_max": 100.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "VLDL Cholesterol",
        "name_ar": "الكوليسترول VLDL",
        "unit": "mg/dL",
        "ref_min": 5.0,
        "ref_max": 40.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 4
      }
    ]
  },
  {
    "name": "Liver Functions",
    "name_ar": "وظائف الكبد",
    "category": "Chemistry",
    "price": 60000.0,
    "unit": null,
    "parameters": [
      {
        "name": "ALT (SGPT)",
        "name_ar": "إنزيم ALT",
        "unit": "U/L",
        "ref_min": 7.0,
        "ref_max": 56.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "AST (SGOT)",
        "name_ar": "إنزيم AST",
        "unit": "U/L",
        "ref_min": 10.0,
        "ref_max": 40.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "ALP",
        "name_ar": "الفوسفاتيز القلوي",
        "unit": "U/L",
        "ref_min": 44.0,
        "ref_max": 147.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Total Bilirubin",
        "name_ar": "البيليروبين الكلي",
        "unit": "mg/dL",
        "ref_min": 0.1,
        "ref_max": 1.2,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Direct Bilirubin",
        "name_ar": "البيليروبين المباشر",
        "unit": "mg/dL",
        "ref_min": 0.0,
        "ref_max": 0.3,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 4
      },
      {
        "name": "Albumin",
        "name_ar": "الألبومين",
        "unit": "g/dL",
        "ref_min": 3.5,
        "ref_max": 5.0,
        "ref_text": null,
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
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 6
      }
    ]
  },
  {
    "name": "Random Blood Sugar (RBS)",
    "name_ar": "سكر الدم عشوائي",
    "category": "Chemistry",
    "price": 7000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Glucose (Random)",
        "name_ar": "الجلوكوز عشوائي",
        "unit": "mg/dL",
        "ref_min": 70.0,
        "ref_max": 140.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Serum Magnesium",
    "name_ar": "المغنيسيوم",
    "category": "Chemistry",
    "price": 20000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Magnesium",
        "name_ar": null,
        "unit": "mg/dL",
        "ref_min": 1.7,
        "ref_max": 2.2,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Total Protein & Albumin",
    "name_ar": "البروتين والألبومين",
    "category": "Chemistry",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Total Protein",
        "name_ar": null,
        "unit": "g/dL",
        "ref_min": 6.0,
        "ref_max": 8.3,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Albumin",
        "name_ar": null,
        "unit": "g/dL",
        "ref_min": 3.5,
        "ref_max": 5.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Globulin",
        "name_ar": null,
        "unit": "g/dL",
        "ref_min": 2.0,
        "ref_max": 3.5,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "A/G Ratio",
        "name_ar": null,
        "unit": null,
        "ref_min": 1.1,
        "ref_max": 2.5,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      }
    ]
  },
  {
    "name": "APTT",
    "name_ar": "زمن الثرومبوبلاستين الجزئي",
    "category": "Hematology",
    "price": 60000.0,
    "unit": null,
    "parameters": [
      {
        "name": "APTT",
        "name_ar": null,
        "unit": "seconds",
        "ref_min": 25.0,
        "ref_max": 35.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Control",
        "name_ar": null,
        "unit": "seconds",
        "ref_min": 25.0,
        "ref_max": 35.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "name": "Blood Group & Rh",
    "name_ar": "فصيلة الدم وعامل Rh",
    "category": "Hematology",
    "price": 5000.0,
    "unit": null,
    "parameters": [
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
    "name": "CBC",
    "name_ar": "صورة الدم الكاملة",
    "category": "Hematology",
    "price": 20000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Hemoglobin (Hb)",
        "name_ar": "الهيموغلوبين",
        "unit": "g/dL",
        "ref_min": 12.0,
        "ref_max": 17.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "WBC",
        "name_ar": "كريات الدم البيضاء",
        "unit": "10^3/µL",
        "ref_min": 4.0,
        "ref_max": 11.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "RBC",
        "name_ar": "كريات الدم الحمراء",
        "unit": "10^6/µL",
        "ref_min": 4.1,
        "ref_max": 5.9,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Hematocrit (PCV)",
        "name_ar": "الهيماتوكريت",
        "unit": "%",
        "ref_min": 36.0,
        "ref_max": 52.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "MCV",
        "name_ar": "متوسط حجم الكرية",
        "unit": "fL",
        "ref_min": 80.0,
        "ref_max": 100.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 4
      },
      {
        "name": "MCH",
        "name_ar": "متوسط هيموغلوبين الكرية",
        "unit": "pg",
        "ref_min": 27.0,
        "ref_max": 33.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 5
      },
      {
        "name": "MCHC",
        "name_ar": "تركيز هيموغلوبين الكرية",
        "unit": "g/dL",
        "ref_min": 32.0,
        "ref_max": 36.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 6
      },
      {
        "name": "Platelets",
        "name_ar": "الصفائح الدموية",
        "unit": "10^3/µL",
        "ref_min": 150.0,
        "ref_max": 450.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 7
      },
      {
        "name": "Neutrophils",
        "name_ar": "العدلات",
        "unit": "%",
        "ref_min": 40.0,
        "ref_max": 75.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 8
      },
      {
        "name": "Lymphocytes",
        "name_ar": "اللمفاويات",
        "unit": "%",
        "ref_min": 20.0,
        "ref_max": 45.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 9
      },
      {
        "name": "Monocytes",
        "name_ar": "الوحيدات",
        "unit": "%",
        "ref_min": 2.0,
        "ref_max": 10.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 10
      },
      {
        "name": "Eosinophils",
        "name_ar": "الحمضات",
        "unit": "%",
        "ref_min": 1.0,
        "ref_max": 6.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 11
      },
      {
        "name": "Basophils",
        "name_ar": "القعدات",
        "unit": "%",
        "ref_min": 0.0,
        "ref_max": 1.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 12
      }
    ]
  },
  {
    "name": "ESR",
    "name_ar": "سرعة ترسيب الدم",
    "category": "Hematology",
    "price": 7000.0,
    "unit": null,
    "parameters": [
      {
        "name": "ESR (1 hour)",
        "name_ar": null,
        "unit": "mm/hr",
        "ref_min": 0.0,
        "ref_max": 20.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "G6PD Screening",
    "name_ar": "فحص إنزيم G6PD",
    "category": "Hematology",
    "price": 40000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal",
        "result_type": "select",
        "options": "Normal|Deficient|Partial Deficiency",
        "order": 0
      }
    ]
  },
  {
    "name": "Hemoglobin",
    "name_ar": "الهيموغلوبين",
    "category": "Hematology",
    "price": 5000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Hemoglobin (Hb)",
        "name_ar": null,
        "unit": "g/dL",
        "ref_min": 12.0,
        "ref_max": 17.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "PCV / Hematocrit",
    "name_ar": "الهيماتوكريت",
    "category": "Hematology",
    "price": 5000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Hematocrit (PCV)",
        "name_ar": null,
        "unit": "%",
        "ref_min": 36.0,
        "ref_max": 52.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "PT / INR",
    "name_ar": "زمن البروثرومبين",
    "category": "Hematology",
    "price": 40000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Prothrombin Time",
        "name_ar": null,
        "unit": "seconds",
        "ref_min": 11.0,
        "ref_max": 13.5,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "INR",
        "name_ar": null,
        "unit": null,
        "ref_min": 0.8,
        "ref_max": 1.2,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Control",
        "name_ar": null,
        "unit": "seconds",
        "ref_min": 11.0,
        "ref_max": 14.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      }
    ]
  },
  {
    "name": "Platelet Count",
    "name_ar": "عدد الصفائح الدموية",
    "category": "Hematology",
    "price": 10000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Platelets",
        "name_ar": null,
        "unit": "10^3/µL",
        "ref_min": 150.0,
        "ref_max": 450.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "RBC Count",
    "name_ar": "عدد كريات الدم الحمراء",
    "category": "Hematology",
    "price": 10000.0,
    "unit": null,
    "parameters": [
      {
        "name": "RBC",
        "name_ar": null,
        "unit": "10^6/µL",
        "ref_min": 4.1,
        "ref_max": 5.9,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Reticulocyte Count",
    "name_ar": "عدد الخلايا الشبكية",
    "category": "Hematology",
    "price": 10000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Reticulocyte %",
        "name_ar": null,
        "unit": "%",
        "ref_min": 0.5,
        "ref_max": 2.5,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Sickling Test",
    "name_ar": "اختبار الأنيميا المنجلية",
    "category": "Hematology",
    "price": 25000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
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
    "name": "TWBCS",
    "name_ar": "عدد كريات الدم البيضاء",
    "category": "Hematology",
    "price": 4000.0,
    "unit": null,
    "parameters": [
      {
        "name": "WBC",
        "name_ar": null,
        "unit": "10^3/µL",
        "ref_min": 4.0,
        "ref_max": 11.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "AFP",
    "name_ar": "ألفا فيتو بروتين",
    "category": "Hormones",
    "price": 20000.0,
    "unit": null,
    "parameters": [
      {
        "name": "AFP",
        "name_ar": null,
        "unit": "ng/mL",
        "ref_min": 0.0,
        "ref_max": 10.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Beta HCG (Quantitative)",
    "name_ar": "هرمون الحمل الكمي",
    "category": "Hormones",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Beta HCG",
        "name_ar": null,
        "unit": "mIU/mL",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-pregnant: <5 / Pregnant: variable",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "CA-125",
    "name_ar": "مؤشر سرطان المبيض",
    "category": "Hormones",
    "price": 70000.0,
    "unit": null,
    "parameters": [
      {
        "name": "CA-125",
        "name_ar": null,
        "unit": "U/mL",
        "ref_min": 0.0,
        "ref_max": 35.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "CEA",
    "name_ar": "مؤشر سرطان القولون",
    "category": "Hormones",
    "price": 60000.0,
    "unit": null,
    "parameters": [
      {
        "name": "CEA",
        "name_ar": null,
        "unit": "ng/mL",
        "ref_min": 0.0,
        "ref_max": 5.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Cortisol (Morning)",
    "name_ar": "الكورتيزول صباحاً",
    "category": "Hormones",
    "price": 40000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Cortisol (AM)",
        "name_ar": null,
        "unit": "µg/dL",
        "ref_min": 6.2,
        "ref_max": 19.4,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Estradiol (E2)",
    "name_ar": "الإستراديول",
    "category": "Hormones",
    "price": 80000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Estradiol",
        "name_ar": null,
        "unit": "pg/mL",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Follicular: 12-48 / Ovulatory: 100-500",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "FSH",
    "name_ar": "الهرمون المنبه للجريب",
    "category": "Hormones",
    "price": 90000.0,
    "unit": null,
    "parameters": [
      {
        "name": "FSH",
        "name_ar": null,
        "unit": "mIU/mL",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Male: 1.5-12.4 / Female varies by cycle",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "LH",
    "name_ar": "الهرمون اللوتيني",
    "category": "Hormones",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "LH",
        "name_ar": null,
        "unit": "mIU/mL",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Male: 1.7-8.6 / Female varies by cycle",
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "PSA (Total)",
    "name_ar": "فحص البروستاتا",
    "category": "Hormones",
    "price": 120000.0,
    "unit": null,
    "parameters": [
      {
        "name": "PSA Total",
        "name_ar": "PSA الكلي",
        "unit": "ng/mL",
        "ref_min": 0.0,
        "ref_max": 4.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Prolactin",
    "name_ar": "البرولاكتين",
    "category": "Hormones",
    "price": 10000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Prolactin",
        "name_ar": null,
        "unit": "ng/mL",
        "ref_min": 4.0,
        "ref_max": 15.2,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Testosterone",
    "name_ar": "التستوستيرون",
    "category": "Hormones",
    "price": 120000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Total Testosterone",
        "name_ar": null,
        "unit": "ng/mL",
        "ref_min": 2.8,
        "ref_max": 8.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Thyroid Function (TSH, T3, T4)",
    "name_ar": "وظائف الغدة الدرقية",
    "category": "Hormones",
    "price": 90000.0,
    "unit": null,
    "parameters": [
      {
        "name": "TSH",
        "name_ar": "هرمون TSH",
        "unit": "µIU/mL",
        "ref_min": 0.4,
        "ref_max": 4.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      },
      {
        "name": "Total T3",
        "name_ar": "هرمون T3 الكلي",
        "unit": "ng/dL",
        "ref_min": 80.0,
        "ref_max": 200.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 1
      },
      {
        "name": "Total T4",
        "name_ar": "هرمون T4 الكلي",
        "unit": "µg/dL",
        "ref_min": 5.0,
        "ref_max": 12.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Free T3",
        "name_ar": "هرمون T3 الحر",
        "unit": "pg/mL",
        "ref_min": 2.3,
        "ref_max": 4.2,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Free T4",
        "name_ar": "هرمون T4 الحر",
        "unit": "ng/dL",
        "ref_min": 0.8,
        "ref_max": 1.8,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 4
      }
    ]
  },
  {
    "name": "Vitamin B12",
    "name_ar": "فيتامين B12",
    "category": "Hormones",
    "price": 20000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Vitamin B12",
        "name_ar": "فيتامين B12",
        "unit": "pg/mL",
        "ref_min": 200.0,
        "ref_max": 900.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Vitamin D (25-OH)",
    "name_ar": "فيتامين د",
    "category": "Hormones",
    "price": 20000.0,
    "unit": null,
    "parameters": [
      {
        "name": "25-OH Vitamin D",
        "name_ar": "فيتامين د",
        "unit": "ng/mL",
        "ref_min": 30.0,
        "ref_max": 100.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "ANA (Antinuclear Antibody)",
    "name_ar": "الأجسام المضادة للنواة",
    "category": "Immunology",
    "price": 100000.0,
    "unit": null,
    "parameters": [
      {
        "name": "ANA",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Weakly Positive|Positive|Strongly Positive",
        "order": 0
      },
      {
        "name": "Pattern",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "select",
        "options": "Not applicable|Homogeneous|Speckled|Nucleolar|Centromeric|Mixed",
        "order": 1
      }
    ]
  },
  {
    "name": "ASO (Antistreptolysin O)",
    "name_ar": "الأنتيستربتوليسين",
    "category": "Immunology",
    "price": 10000.0,
    "unit": null,
    "parameters": [
      {
        "name": "ASO",
        "name_ar": null,
        "unit": "IU/mL",
        "ref_min": 0.0,
        "ref_max": 200.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Anti-CCP",
    "name_ar": "الببتيد الحلقي المضاد",
    "category": "Immunology",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Anti-CCP",
        "name_ar": null,
        "unit": "U/mL",
        "ref_min": 0.0,
        "ref_max": 17.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Anti-dsDNA",
    "name_ar": "الحمض النووي مزدوج الشريط",
    "category": "Immunology",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Anti-dsDNA",
        "name_ar": null,
        "unit": "IU/mL",
        "ref_min": 0.0,
        "ref_max": 30.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "CRP",
    "name_ar": "بروتين سي التفاعلي",
    "category": "Immunology",
    "price": 10000.0,
    "unit": null,
    "parameters": [
      {
        "name": "CRP",
        "name_ar": "CRP",
        "unit": "mg/L",
        "ref_min": 0.0,
        "ref_max": 5.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Rheumatoid Factor (RF)",
    "name_ar": "العامل الروماتويدي",
    "category": "Immunology",
    "price": 15000.0,
    "unit": null,
    "parameters": [
      {
        "name": "RF",
        "name_ar": "RF",
        "unit": "IU/mL",
        "ref_min": 0.0,
        "ref_max": 14.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "BFFM",
    "name_ar": "فيلم الدم للبحث عن الملاريا",
    "category": "Parasitology",
    "price": 5000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
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
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "select",
        "options": "Not applicable|P. falciparum|P. vivax|P. malariae|P. ovale|Mixed",
        "order": 1
      },
      {
        "name": "Stage",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "select",
        "options": "Not applicable|Ring stage|Trophozoite|Schizont|Gametocyte|Multiple stages",
        "order": 2
      },
      {
        "name": "Density",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "select",
        "options": "Not applicable|Scanty|+|++|+++|++++",
        "order": 3
      }
    ]
  },
  {
    "name": "ICT for Malaria",
    "name_ar": "الملاريا - اختبار سريع",
    "category": "Parasitology",
    "price": 8000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive Reactive",
        "order": 0
      },
      {
        "name": "Species Detected",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "select",
        "options": "Not applicable|P. falciparum|P. vivax|P. malariae|P. ovale|Mixed",
        "order": 1
      }
    ]
  },
  {
    "name": "Stool Analysis",
    "name_ar": "تحليل البراز",
    "category": "Parasitology",
    "price": 5000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Color",
        "name_ar": "اللون",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Brown",
        "result_type": "text",
        "options": null,
        "order": 0
      },
      {
        "name": "Consistency",
        "name_ar": "القوام",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Formed",
        "result_type": "text",
        "options": null,
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
        "options": "Not Seen|Ascaris|Hookworm|Giardia|Entamoeba|H. nana|Other",
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
        "unit": "/HPF",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 2",
        "result_type": "text",
        "options": null,
        "order": 4
      }
    ]
  },
  {
    "name": "Stool Culture",
    "name_ar": "مزرعة البراز",
    "category": "Parasitology",
    "price": 60000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Growth",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal Flora",
        "result_type": "select",
        "options": "Normal Flora|Pathogenic Growth|No Growth|Mixed",
        "order": 0
      },
      {
        "name": "Organism",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "text",
        "options": null,
        "order": 1
      }
    ]
  },
  {
    "name": "Stool Occult Blood",
    "name_ar": "الدم الخفي بالبراز",
    "category": "Parasitology",
    "price": 25000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Weak Positive|Trace",
        "order": 0
      }
    ]
  },
  {
    "name": "Stool Ova & Parasites",
    "name_ar": "بيوض وطفيليات البراز",
    "category": "Parasitology",
    "price": 10000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Ascaris lumbricoides|Hookworm|Giardia lamblia|Entamoeba histolytica|Hymenolepis nana|Taenia species|Schistosoma mansoni|Trichuris trichiura|Enterobius vermicularis|Multiple parasites",
        "order": 0
      },
      {
        "name": "Quantity",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "select",
        "options": "Not applicable|Scanty|Few|Moderate|Many",
        "order": 1
      }
    ]
  },
  {
    "name": "Brucella Agglutination",
    "name_ar": "البروسيلا - تلزن",
    "category": "Serology",
    "price": 8000.0,
    "unit": null,
    "parameters": [
      {
        "name": "B. abortus",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1/20|1/40|1/80|1/160|1/320|1/640",
        "order": 0
      },
      {
        "name": "B. melitensis",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1/20|1/40|1/80|1/160|1/320|1/640",
        "order": 1
      }
    ]
  },
  {
    "name": "CMV (IgG/IgM)",
    "name_ar": "الفيروس المضخم للخلايا",
    "category": "Serology",
    "price": 12000.0,
    "unit": null,
    "parameters": [
      {
        "name": "IgG",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Equivocal",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Equivocal",
        "order": 1
      }
    ]
  },
  {
    "name": "COVID-19 Antigen",
    "name_ar": "كوفيد-19",
    "category": "Serology",
    "price": 50000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
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
    "name": "Dengue Fever Profile",
    "name_ar": "حمى الضنك",
    "category": "Serology",
    "price": 30000.0,
    "unit": null,
    "parameters": [
      {
        "name": "NS1 Antigen",
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
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
    "name": "H. pylori Antibody (ICT)",
    "name_ar": "جرثومة المعدة - ICT",
    "category": "Serology",
    "price": 6000.0,
    "unit": null,
    "parameters": [
      {
        "name": "IgG",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 1
      }
    ]
  },
  {
    "name": "H. pylori Antigen (Stool)",
    "name_ar": "جرثومة المعدة - براز",
    "category": "Serology",
    "price": 8000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Weak Positive",
        "order": 0
      }
    ]
  },
  {
    "name": "HIV Antibody",
    "name_ar": "فحص الإيدز",
    "category": "Serology",
    "price": 15000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Anti-HIV 1/2",
        "name_ar": "Anti-HIV",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Indeterminate",
        "order": 0
      }
    ]
  },
  {
    "name": "Hepatitis B Surface Antigen",
    "name_ar": "فيروس الكبد B",
    "category": "Serology",
    "price": 15000.0,
    "unit": null,
    "parameters": [
      {
        "name": "HBsAg",
        "name_ar": "HBsAg",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Weak Positive",
        "order": 0
      }
    ]
  },
  {
    "name": "Hepatitis C Antibody",
    "name_ar": "فيروس الكبد C",
    "category": "Serology",
    "price": 15000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Anti-HCV",
        "name_ar": "Anti-HCV",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Weak Positive",
        "order": 0
      }
    ]
  },
  {
    "name": "ICT Brucella",
    "name_ar": "البروسيلا - ICT",
    "category": "Serology",
    "price": 8000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive Reactive",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 1
      },
      {
        "name": "IgG",
        "name_ar": null,
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
    "name": "ICT for Typhoid",
    "name_ar": "التايفويد - اختبار سريع",
    "category": "Serology",
    "price": 7500.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive Reactive",
        "order": 0
      },
      {
        "name": "IgM (Acute)",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive",
        "order": 1
      },
      {
        "name": "IgG (Chronic)",
        "name_ar": null,
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
    "name": "Pregnancy Test (HCG)",
    "name_ar": "اختبار الحمل",
    "category": "Serology",
    "price": 7000.0,
    "unit": null,
    "parameters": [
      {
        "name": "HCG (Urine)",
        "name_ar": "HCG البولي",
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Weak Positive",
        "order": 0
      }
    ]
  },
  {
    "name": "Rubella (IgG/IgM)",
    "name_ar": "الحصبة الألمانية",
    "category": "Serology",
    "price": 12000.0,
    "unit": null,
    "parameters": [
      {
        "name": "IgG",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Equivocal",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Equivocal",
        "order": 1
      }
    ]
  },
  {
    "name": "Toxoplasma (IgG/IgM)",
    "name_ar": "التوكسوبلازما",
    "category": "Serology",
    "price": 12000.0,
    "unit": null,
    "parameters": [
      {
        "name": "IgG",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Equivocal",
        "order": 0
      },
      {
        "name": "IgM",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Equivocal",
        "order": 1
      }
    ]
  },
  {
    "name": "VDRL / RPR",
    "name_ar": "فحص الزهري",
    "category": "Serology",
    "price": 40000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Non-Reactive",
        "result_type": "select",
        "options": "Non-Reactive|Reactive|Weakly Reactive",
        "order": 0
      },
      {
        "name": "Titer",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "select",
        "options": "Not applicable|1/1|1/2|1/4|1/8|1/16|1/32|1/64",
        "order": 1
      }
    ]
  },
  {
    "name": "Widal Test",
    "name_ar": "اختبار ويدال",
    "category": "Serology",
    "price": 7000.0,
    "unit": null,
    "parameters": [
      {
        "name": "S. typhi O",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1/20|1/40|1/80|1/160|1/320|1/640",
        "order": 0
      },
      {
        "name": "S. typhi H",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1/20|1/40|1/80|1/160|1/320|1/640",
        "order": 1
      },
      {
        "name": "S. paratyphi AH",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1/20|1/40|1/80|1/160|1/320|1/640",
        "order": 2
      },
      {
        "name": "S. paratyphi BH",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1/20|1/40|1/80|1/160|1/320|1/640",
        "order": 3
      },
      {
        "name": "S. paratyphi CH",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|1/20|1/40|1/80|1/160|1/320|1/640",
        "order": 4
      }
    ]
  },
  {
    "name": "Microalbumin (Urine)",
    "name_ar": "الألبومين الدقيق",
    "category": "Urine",
    "price": 7000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Microalbumin",
        "name_ar": null,
        "unit": "mg/L",
        "ref_min": 0.0,
        "ref_max": 30.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "SG",
    "name_ar": "الكثافة النوعية للبول",
    "category": "Urine",
    "price": 5000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Specific Gravity",
        "name_ar": "الكثافة النوعية",
        "unit": null,
        "ref_min": 1.005,
        "ref_max": 1.03,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 0
      }
    ]
  },
  {
    "name": "Urine Analysis (UG)",
    "name_ar": "تحليل البول العام",
    "category": "Urine",
    "price": 5000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Color",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Pale Yellow - Amber",
        "result_type": "select",
        "options": "Pale Yellow - Amber|Colorless|Dark Yellow|Red|Brown|Orange",
        "order": 0
      },
      {
        "name": "Appearance",
        "name_ar": null,
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
        "name_ar": null,
        "unit": null,
        "ref_min": 4.6,
        "ref_max": 8.0,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 2
      },
      {
        "name": "Specific Gravity",
        "name_ar": null,
        "unit": null,
        "ref_min": 1.005,
        "ref_max": 1.03,
        "ref_text": null,
        "result_type": "numeric",
        "options": null,
        "order": 3
      },
      {
        "name": "Protein",
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Normal",
        "result_type": "select",
        "options": "Normal|Increased|Decreased",
        "order": 11
      },
      {
        "name": "WBC (Microscopy)",
        "name_ar": null,
        "unit": "/HPF",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 5",
        "result_type": "text",
        "options": null,
        "order": 12
      },
      {
        "name": "RBC (Microscopy)",
        "name_ar": null,
        "unit": "/HPF",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "0 - 2",
        "result_type": "text",
        "options": null,
        "order": 13
      },
      {
        "name": "Epithelial Cells",
        "name_ar": null,
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
        "name_ar": null,
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
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Calcium Oxalate|Uric Acid|Triple Phosphate|Others",
        "order": 16
      },
      {
        "name": "Bacteria",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not Seen",
        "result_type": "select",
        "options": "Not Seen|Few|Moderate|Many",
        "order": 17
      }
    ]
  },
  {
    "name": "Urine Culture & Sensitivity",
    "name_ar": "مزرعة البول والحساسية",
    "category": "Urine",
    "price": 15000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Growth",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "No Growth",
        "result_type": "select",
        "options": "No Growth|Significant Growth|Insignificant Growth|Mixed Growth",
        "order": 0
      },
      {
        "name": "Organism",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "text",
        "options": null,
        "order": 1
      },
      {
        "name": "Colony Count",
        "name_ar": null,
        "unit": "CFU/mL",
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "text",
        "options": null,
        "order": 2
      },
      {
        "name": "Sensitivity",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Not applicable",
        "result_type": "text",
        "options": null,
        "order": 3
      }
    ]
  },
  {
    "name": "Urine Pregnancy Test (HCG)",
    "name_ar": "اختبار الحمل البولي",
    "category": "Urine",
    "price": 5000.0,
    "unit": null,
    "parameters": [
      {
        "name": "Result",
        "name_ar": null,
        "unit": null,
        "ref_min": null,
        "ref_max": null,
        "ref_text": "Negative",
        "result_type": "select",
        "options": "Negative|Positive|Weak Positive|Invalid",
        "order": 0
      }
    ]
  }
];


// ============ دوال مساعدة ============

// الحصول على كل الفئات
function getTestCategories() {
  const cats = new Set();
  TESTS_DATA.forEach(t => cats.add(t.category || 'بدون تصنيف'));
  return Array.from(cats).sort();
}

// الحصول على تحاليل فئة معينة
function getTestsByCategory(category) {
  return TESTS_DATA.filter(t => (t.category || 'بدون تصنيف') === category);
}

// البحث في التحاليل
function searchTests(query) {
  const q = query.toLowerCase().trim();
  if (!q) return TESTS_DATA;
  return TESTS_DATA.filter(t => 
    t.name.toLowerCase().includes(q) ||
    (t.name_ar || '').includes(q) ||
    (t.category || '').toLowerCase().includes(q) ||
    t.parameters.some(p => 
      p.name.toLowerCase().includes(q) ||
      (p.name_ar || '').includes(q)
    )
  );
}

// الحصول على تحليل بالاسم
function getTestByName(name) {
  return TESTS_DATA.find(t => t.name === name);
}

// إحصائيات
function getTestsStats() {
  return {
    total: TESTS_DATA.length,
    categories: getTestCategories().length,
    totalParams: TESTS_DATA.reduce((sum, t) => sum + t.parameters.length, 0),
  };
}
