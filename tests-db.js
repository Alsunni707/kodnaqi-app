// ملف التحاليل المدمج للعمل 100% أوفلاين
const OFFLINE_TESTS_DATABASE = [
  {
    "code": "HEM-001",
    "name": "Complete Blood Count (CBC) with Differential",
    "dept": "Hematology & Coagulation",
    "sub": "Routine Hematology",
    "price": 15000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "HEM-002",
    "name": "Erythrocyte Sedimentation Rate (ESR)",
    "dept": "Hematology & Coagulation",
    "sub": "Routine Hematology",
    "price": 8000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HEM-003",
    "name": "Reticulocyte Count",
    "dept": "Hematology & Coagulation",
    "sub": "Special Hematology",
    "price": 20000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HEM-004",
    "name": "Sickling Test",
    "dept": "Hematology & Coagulation",
    "sub": "Special Hematology",
    "price": 25000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HEM-005",
    "name": "Hemoglobin Electrophoresis",
    "dept": "Hematology & Coagulation",
    "sub": "Special Hematology",
    "price": 45000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HEM-006",
    "name": "G6PD Enzyme Activity",
    "dept": "Hematology & Coagulation",
    "sub": "Special Hematology",
    "price": 45000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HEM-007",
    "name": "Prothrombin Time (PT)",
    "dept": "Hematology & Coagulation",
    "sub": "Coagulation",
    "price": 20000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "HEM-008",
    "name": "Activated Partial Thromboplastin Time (APTT)",
    "dept": "Hematology & Coagulation",
    "sub": "Coagulation",
    "price": 20000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HEM-009",
    "name": "D-Dimer",
    "dept": "Hematology & Coagulation",
    "sub": "Coagulation",
    "price": 40000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HEM-010",
    "name": "Fibrinogen Level",
    "dept": "Hematology & Coagulation",
    "sub": "Coagulation",
    "price": 25000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "CHE-001",
    "name": "Kidney Profile",
    "dept": "Clinical Chemistry",
    "sub": "Renal Function Tests (RFT)",
    "price": 10000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "CHE-002",
    "name": "Liver Profile",
    "dept": "Clinical Chemistry",
    "sub": "Liver Function Tests (LFT)",
    "price": 15000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "CHE-003",
    "name": "Lipid Panel",
    "dept": "Clinical Chemistry",
    "sub": "Lipid Profile",
    "price": 18000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "CHE-004",
    "name": "Cardiac Profile",
    "dept": "Clinical Chemistry",
    "sub": "Cardiac Biomarkers",
    "price": 150000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "CHE-005",
    "name": "Serum Electrolytes",
    "dept": "Clinical Chemistry",
    "sub": "Electrolytes & Minerals",
    "price": 15000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "CHE-006",
    "name": "Total Calcium",
    "dept": "Clinical Chemistry",
    "sub": "Electrolytes & Minerals",
    "price": 15000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "CHE-007",
    "name": "Fasting Blood Glucose",
    "dept": "Clinical Chemistry",
    "sub": "Metabolic & Diabetes",
    "price": 8000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "CHE-008",
    "name": "HbA1c (Glycated Hemoglobin)",
    "dept": "Clinical Chemistry",
    "sub": "Metabolic & Diabetes",
    "price": 25000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "MIC-001",
    "name": "Blood Culture and Sensitivity",
    "dept": "Microbiology",
    "sub": "Bacteriology Cultures",
    "price": 100000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "MIC-002",
    "name": "Urine Culture and Sensitivity",
    "dept": "Microbiology",
    "sub": "Bacteriology Cultures",
    "price": 50000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "MIC-003",
    "name": "Wound Swab Culture & Sensitivity",
    "dept": "Microbiology",
    "sub": "Bacteriology Cultures",
    "price": 40000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "MIC-004",
    "name": "Sputum for Acid Fast Bacilli (AFB)",
    "dept": "Microbiology",
    "sub": "Mycobacteriology",
    "price": 30000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "MIC-005",
    "name": "GeneXpert Mycobacterium tuberculosis",
    "dept": "Microbiology",
    "sub": "Mycobacteriology",
    "price": 150000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "PAR-001",
    "name": "Stool Routine Examination",
    "dept": "Parasitology",
    "sub": "Stool & Urine Parasites",
    "price": 15000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "PAR-002",
    "name": "Urine Routine Examination",
    "dept": "Parasitology",
    "sub": "Stool & Urine Parasites",
    "price": 15000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "PAR-003",
    "name": "Urine Complete Analysis",
    "dept": "Parasitology",
    "sub": "Urine & Biochemical Analysis",
    "price": 15000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "PAR-004",
    "name": "Malaria Microscopy (Thick & Thin Film)",
    "dept": "Parasitology",
    "sub": "Endemic Endoparasites",
    "price": 25000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "IMM-001",
    "name": "Widal Agglutination Test (Typhoid)",
    "dept": "Immunology & Serology",
    "sub": "Infectious Serology",
    "price": 30000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "IMM-002",
    "name": "Brucella Agglutination Test",
    "dept": "Immunology & Serology",
    "sub": "Infectious Serology",
    "price": 35000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-003",
    "name": "Visceral Leishmaniasis (Kala-azar)",
    "dept": "Immunology & Serology",
    "sub": "Infectious Serology",
    "price": 40000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-004",
    "name": "Hepatitis B Surface Antigen (HBsAg)",
    "dept": "Immunology & Serology",
    "sub": "Viral Screening",
    "price": 30000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-005",
    "name": "Hepatitis C Virus Antibody (HCV Ab)",
    "dept": "Immunology & Serology",
    "sub": "Viral Screening",
    "price": 35000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-006",
    "name": "HIV 1 & 2 Antibody / Antigen Combo",
    "dept": "Immunology & Serology",
    "sub": "Viral Screening",
    "price": 40000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-007",
    "name": "Rheumatoid Factor (RF)",
    "dept": "Immunology & Serology",
    "sub": "Autoimmunity",
    "price": 25000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-008",
    "name": "Antinuclear Antibodies (ANA)",
    "dept": "Immunology & Serology",
    "sub": "Autoimmunity",
    "price": 70000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-009",
    "name": "Anti-double Stranded DNA (anti-dsDNA)",
    "dept": "Immunology & Serology",
    "sub": "Autoimmunity",
    "price": 80000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-010",
    "name": "Prostate Specific Antigen (PSA)",
    "dept": "Immunology & Serology",
    "sub": "Tumor Markers",
    "price": 100000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-011",
    "name": "Alpha-Fetoprotein (AFP)",
    "dept": "Immunology & Serology",
    "sub": "Tumor Markers",
    "price": 120000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "IMM-012",
    "name": "Cancer Antigen 125 (CA-125)",
    "dept": "Immunology & Serology",
    "sub": "Tumor Markers",
    "price": 150000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HIS-001",
    "name": "Biopsy / Tissue Histopathology Examination",
    "dept": "Histopathology & Cytology",
    "sub": "Surgical Pathology",
    "price": 200000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "HIS-002",
    "name": "Fine Needle Aspiration Cytology (FNAC)",
    "dept": "Histopathology & Cytology",
    "sub": "Cytopathology",
    "price": 150000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HIS-003",
    "name": "Pap Smear (Cervical Cytology)",
    "dept": "Histopathology & Cytology",
    "sub": "Cytopathology",
    "price": 100000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "HIS-004",
    "name": "Breast Cancer IHC Panel",
    "dept": "Histopathology & Cytology",
    "sub": "Immunohistochemistry (IHC)",
    "price": 300000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "MOL-001",
    "name": "Hepatitis B Virus DNA Quantification (Viral Load)",
    "dept": "Molecular & Endocrinology",
    "sub": "Molecular Virology (PCR)",
    "price": 200000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "MOL-002",
    "name": "Hepatitis C Virus RNA Quantification",
    "dept": "Molecular & Endocrinology",
    "sub": "Molecular Virology (PCR)",
    "price": 200000,
    "type": "single",
    "Component_Count": 1
  },
  {
    "code": "MOL-003",
    "name": "Thyroid Function Tests (TFT)",
    "dept": "Molecular & Endocrinology",
    "sub": "Endocrinology / Hormones",
    "price": 40000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "code": "MOL-004",
    "name": "Fertility Panel",
    "dept": "Molecular & Endocrinology",
    "sub": "Reproductive Hormones",
    "price": 70000,
    "type": "panel",
    "Component_Count": 1
  },
  {
    "Test_Code": "HEM-011",
    "Test_Name": "Bleeding Time (BT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Bleeding Time",
        "Unit": "Minutes",
        "Range": "2 - 7"
      }
    ]
  },
  {
    "Test_Code": "HEM-012",
    "Test_Name": "Clotting Time (CT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Clotting Time",
        "Unit": "Minutes",
        "Range": "5 - 10"
      }
    ]
  },
  {
    "Test_Code": "HEM-013",
    "Test_Name": "Blood Group & Rh Typing",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Immunohematology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "EDTA Whole Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "ABO Group",
        "Unit": "Type",
        "Range": "A/B/AB/O"
      },
      {
        "Analyte": "Rh Factor",
        "Unit": "Type",
        "Range": "Positive/Negative"
      }
    ]
  },
  {
    "Test_Code": "HEM-014",
    "Test_Name": "Direct Coombs Test (DAT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Immunohematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Whole Blood",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "DAT",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "HEM-015",
    "Test_Name": "Indirect Coombs Test (IAT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Immunohematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "IAT",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "CHE-009",
    "Test_Name": "Random Blood Glucose",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Metabolic",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Fluoride Plasma",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Glucose",
        "Unit": "mg/dL",
        "Range": "80 - 140"
      }
    ]
  },
  {
    "Test_Code": "CHE-010",
    "Test_Name": "Oral Glucose Tolerance Test (OGTT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Metabolic",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Fluoride Plasma",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Fasting Glucose",
        "Unit": "mg/dL",
        "Range": "70 - 100"
      },
      {
        "Analyte": "1-Hour Glucose",
        "Unit": "mg/dL",
        "Range": "< 180"
      },
      {
        "Analyte": "2-Hour Glucose",
        "Unit": "mg/dL",
        "Range": "< 140"
      }
    ]
  },
  {
    "Test_Code": "CHE-011",
    "Test_Name": "Serum Amylase",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Pancreatic Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Amylase",
        "Unit": "U/L",
        "Range": "30 - 110"
      }
    ]
  },
  {
    "Test_Code": "CHE-012",
    "Test_Name": "Serum Lipase",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Pancreatic Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Lipase",
        "Unit": "U/L",
        "Range": "10 - 60"
      }
    ]
  },
  {
    "Test_Code": "CHE-013",
    "Test_Name": "Serum Iron",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Trace Elements",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Iron",
        "Unit": "ug/dL",
        "Range": "60 - 170"
      }
    ]
  },
  {
    "Test_Code": "CHE-014",
    "Test_Name": "Total Iron Binding Capacity (TIBC)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Trace Elements",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "TIBC",
        "Unit": "ug/dL",
        "Range": "250 - 450"
      }
    ]
  },
  {
    "Test_Code": "CHE-015",
    "Test_Name": "Serum Ferritin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Trace Elements",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Ferritin",
        "Unit": "ng/mL",
        "Range": "15 - 200"
      }
    ]
  },
  {
    "Test_Code": "CHE-016",
    "Test_Name": "Serum Magnesium",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Electrolytes",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "Magnesium",
        "Unit": "mg/dL",
        "Range": "1.7 - 2.2"
      }
    ]
  },
  {
    "Test_Code": "CHE-017",
    "Test_Name": "Serum Phosphorus",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Electrolytes",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Phosphorus",
        "Unit": "mg/dL",
        "Range": "2.5 - 4.5"
      }
    ]
  },
  {
    "Test_Code": "CHE-018",
    "Test_Name": "Serum LDH",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Enzymes",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "LDH",
        "Unit": "U/L",
        "Range": "140 - 280"
      }
    ]
  },
  {
    "Test_Code": "CHE-019",
    "Test_Name": "Serum Creatine Kinase (CK)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Enzymes",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "CK",
        "Unit": "U/L",
        "Range": "30 - 200"
      }
    ]
  },
  {
    "Test_Code": "CHE-020",
    "Test_Name": "C-Reactive Protein (CRP)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Inflammatory Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "CRP",
        "Unit": "mg/L",
        "Range": "< 6"
      }
    ]
  },
  {
    "Test_Code": "CHE-021",
    "Test_Name": "High Sensitivity CRP (hs-CRP)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Inflammatory Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "hs-CRP",
        "Unit": "mg/L",
        "Range": "< 1.0"
      }
    ]
  },
  {
    "Test_Code": "CHE-022",
    "Test_Name": "Procalcitonin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Inflammatory Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "Procalcitonin",
        "Unit": "ng/mL",
        "Range": "< 0.5"
      }
    ]
  },
  {
    "Test_Code": "CHE-023",
    "Test_Name": "Homocysteine",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Cardiac Risk",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "Homocysteine",
        "Unit": "umol/L",
        "Range": "5 - 15"
      }
    ]
  },
  {
    "Test_Code": "CHE-024",
    "Test_Name": "Vitamin B12",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Vitamin B12",
        "Unit": "pg/mL",
        "Range": "200 - 900"
      }
    ]
  },
  {
    "Test_Code": "CHE-025",
    "Test_Name": "Folic Acid",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Folic Acid",
        "Unit": "ng/mL",
        "Range": "4 - 20"
      }
    ]
  },
  {
    "Test_Code": "CHE-026",
    "Test_Name": "Vitamin D (25-OH)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Vitamin D",
        "Unit": "ng/mL",
        "Range": "30 - 100"
      }
    ]
  },
  {
    "Test_Code": "MIC-006",
    "Test_Name": "Stool Culture & Sensitivity",
    "Department": "Microbiology",
    "Sub_Department": "Bacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Culture",
        "Unit": "Text",
        "Range": "No Growth"
      }
    ]
  },
  {
    "Test_Code": "MIC-007",
    "Test_Name": "Throat Swab Culture",
    "Department": "Microbiology",
    "Sub_Department": "Bacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Swab",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Culture",
        "Unit": "Text",
        "Range": "Normal Flora"
      }
    ]
  },
  {
    "Test_Code": "MIC-008",
    "Test_Name": "H. pylori Antigen (Stool)",
    "Department": "Microbiology",
    "Sub_Department": "Bacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "H. pylori",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MIC-009",
    "Test_Name": "Fungal Culture",
    "Department": "Microbiology",
    "Sub_Department": "Mycology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Skin/Nails",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Fungus",
        "Unit": "Text",
        "Range": "No Growth"
      }
    ]
  },
  {
    "Test_Code": "MIC-010",
    "Test_Name": "Cryptococcal Antigen (CRAG)",
    "Department": "Microbiology",
    "Sub_Department": "Mycology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum/CSF",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "CRAG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-005",
    "Test_Name": "Occult Blood (FOB)",
    "Department": "Parasitology",
    "Sub_Department": "Stool Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Occult Blood",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-006",
    "Test_Name": "Kato-Katz (Schistosoma)",
    "Department": "Parasitology",
    "Sub_Department": "Stool Parasites",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Schistosoma Eggs",
        "Unit": "Count",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-007",
    "Test_Name": "Microfilaria (Blood Film)",
    "Department": "Parasitology",
    "Sub_Department": "Blood Parasites",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Blood Film",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Microfilaria",
        "Unit": "Text",
        "Range": "Not Seen"
      }
    ]
  },
  {
    "Test_Code": "IMM-013",
    "Test_Name": "Dengue NS1 Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Dengue NS1",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-014",
    "Test_Name": "Dengue IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Dengue IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-015",
    "Test_Name": "Dengue IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Dengue IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-016",
    "Test_Name": "Dengue Duo (NS1 + IgM/IgG)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "NS1",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-017",
    "Test_Name": "Chikungunya IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Chikungunya IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-018",
    "Test_Name": "Leptospira IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Leptospira IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-019",
    "Test_Name": "Rickettsia IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Rickettsia IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-020",
    "Test_Name": "Toxoplasma IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Toxoplasma IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-021",
    "Test_Name": "Toxoplasma IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Toxoplasma IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-022",
    "Test_Name": "Rubella IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Rubella IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-023",
    "Test_Name": "Rubella IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Rubella IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-024",
    "Test_Name": "CMV IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "CMV IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-025",
    "Test_Name": "CMV IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "CMV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-026",
    "Test_Name": "HSV-2 IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "HSV-2 IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-027",
    "Test_Name": "TPHA (Syphilis Confirmatory)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "TPHA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "IMM-028",
    "Test_Name": "Anti-CCP (Rheumatoid Arthritis)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 100000,
    "Components": [
      {
        "Analyte": "Anti-CCP",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "IMM-029",
    "Test_Name": "Anti-TPO (Thyroid Peroxidase)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Anti-TPO",
        "Unit": "IU/mL",
        "Range": "< 34"
      }
    ]
  },
  {
    "Test_Code": "IMM-030",
    "Test_Name": "Anti-Thyroglobulin",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Anti-TG",
        "Unit": "IU/mL",
        "Range": "< 40"
      }
    ]
  },
  {
    "Test_Code": "IMM-031",
    "Test_Name": "Carcinoembryonic Antigen (CEA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "CEA",
        "Unit": "ng/mL",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "IMM-032",
    "Test_Name": "CA 19-9 (Pancreatic Cancer)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "CA 19-9",
        "Unit": "U/mL",
        "Range": "< 37"
      }
    ]
  },
  {
    "Test_Code": "IMM-033",
    "Test_Name": "Beta-hCG (Pregnancy Test)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum/Urine",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Beta-hCG",
        "Unit": "mIU/mL",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "IMM-034",
    "Test_Name": "ASO Titer (Anti-Streptolysin O)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "ASO",
        "Unit": "IU/mL",
        "Range": "< 200"
      }
    ]
  },
  {
    "Test_Code": "HIS-005",
    "Test_Name": "Cell Block (Cytology)",
    "Department": "Histopathology",
    "Sub_Department": "Cytopathology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Fluid",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "Cell Block",
        "Unit": "Text",
        "Range": "Benign"
      }
    ]
  },
  {
    "Test_Code": "HIS-006",
    "Test_Name": "Bone Marrow Aspiration",
    "Department": "Histopathology",
    "Sub_Department": "Hematopathology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Bone Marrow",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "Marrow",
        "Unit": "Text",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "HIS-007",
    "Test_Name": "Bone Marrow Biopsy",
    "Department": "Histopathology",
    "Sub_Department": "Hematopathology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Bone Marrow Core",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "Biopsy",
        "Unit": "Text",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "MOL-005",
    "Test_Name": "HIV Viral Load (RNA PCR)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Plasma",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "HIV RNA",
        "Unit": "copies/mL",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "MOL-006",
    "Test_Name": "HIV DNA PCR (Early Infant Diagnosis)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Dried Blood Spot",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "HIV DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "MOL-007",
    "Test_Name": "HPV DNA (Cervical Cancer Screening)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Cervical Swab",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "HPV DNA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MOL-008",
    "Test_Name": "Cortisol (AM)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Cortisol",
        "Unit": "ug/dL",
        "Range": "6 - 23"
      }
    ]
  },
  {
    "Test_Code": "MOL-009",
    "Test_Name": "Testosterone (Total)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Testosterone",
        "Unit": "ng/dL",
        "Range": "300 - 1000"
      }
    ]
  },
  {
    "Test_Code": "MOL-010",
    "Test_Name": "Estradiol (E2)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Estradiol",
        "Unit": "pg/mL",
        "Range": "12 - 498"
      }
    ]
  },
  {
    "Test_Code": "MOL-011",
    "Test_Name": "Progesterone",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Progesterone",
        "Unit": "ng/mL",
        "Range": "0.2 - 25"
      }
    ]
  },
  {
    "Test_Code": "MOL-012",
    "Test_Name": "Growth Hormone (GH)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "GH",
        "Unit": "ng/mL",
        "Range": "0.1 - 10"
      }
    ]
  },
  {
    "Test_Code": "TOX-001",
    "Test_Name": "Serum Paracetamol",
    "Department": "Toxicology",
    "Sub_Department": "Drug Monitoring",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Paracetamol",
        "Unit": "ug/mL",
        "Range": "10 - 30"
      }
    ]
  },
  {
    "Test_Code": "TOX-002",
    "Test_Name": "Serum Salicylate",
    "Department": "Toxicology",
    "Sub_Department": "Drug Monitoring",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Salicylate",
        "Unit": "mg/dL",
        "Range": "2 - 20"
      }
    ]
  },
  {
    "Test_Code": "TOX-003",
    "Test_Name": "Blood Alcohol Level",
    "Department": "Toxicology",
    "Sub_Department": "Toxic Substances",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Alcohol",
        "Unit": "mg/dL",
        "Range": "0"
      }
    ]
  },
  {
    "Test_Code": "TOX-004",
    "Test_Name": "Carboxyhemoglobin",
    "Department": "Toxicology",
    "Sub_Department": "Toxic Substances",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "COHb",
        "Unit": "%",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "URN-001",
    "Test_Name": "Urine Drug Screen (5-Panel)",
    "Department": "Toxicology",
    "Sub_Department": "Drug Screening",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Urine",
    "Price": 100000,
    "Components": [
      {
        "Analyte": "Amphetamines",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Cannabinoids",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Cocaine",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Opiates",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Phencyclidine",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "URN-002",
    "Test_Name": "Urine Pregnancy Test (Qualitative)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "hCG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "URN-003",
    "Test_Name": "24-Hour Urine Protein",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Renal Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "24h Urine",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Protein",
        "Unit": "mg/24h",
        "Range": "< 150"
      }
    ]
  },
  {
    "Test_Code": "URN-004",
    "Test_Name": "Urine Microalbumin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Renal Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Microalbumin",
        "Unit": "mg/L",
        "Range": "< 30"
      }
    ]
  },
  {
    "Test_Code": "SER-001",
    "Test_Name": "VDRL (Syphilis Screening)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "VDRL",
        "Unit": "Qualitative",
        "Range": "Non-Reactive"
      }
    ]
  },
  {
    "Test_Code": "SER-002",
    "Test_Name": "HIV Rapid Test",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "HIV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-003",
    "Test_Name": "Hepatitis B Core Antibody (Anti-HBc)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Anti-HBc",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-004",
    "Test_Name": "Hepatitis B e Antigen (HBeAg)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "HBeAg",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-005",
    "Test_Name": "Hepatitis A IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "HAV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-006",
    "Test_Name": "Hepatitis A IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "HAV IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-007",
    "Test_Name": "Epstein-Barr Virus (EBV) IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "EBV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-008",
    "Test_Name": "Mycoplasma pneumoniae IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Mycoplasma IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-009",
    "Test_Name": "Q Fever (Coxiella) IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Q Fever IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "SER-010",
    "Test_Name": "Echinococcus (Hydatid) Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Echinococcus Ab",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "COA-001",
    "Test_Name": "Thrombin Time (TT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Thrombin Time",
        "Unit": "Seconds",
        "Range": "14 - 21"
      }
    ]
  },
  {
    "Test_Code": "COA-002",
    "Test_Name": "Anti-Xa Activity (Heparin Level)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Anti-Xa",
        "Unit": "IU/mL",
        "Range": "0.3 - 0.7"
      }
    ]
  },
  {
    "Test_Code": "COA-003",
    "Test_Name": "Protein C Activity",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Protein C",
        "Unit": "%",
        "Range": "70 - 130"
      }
    ]
  },
  {
    "Test_Code": "COA-004",
    "Test_Name": "Protein S Activity",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Protein S",
        "Unit": "%",
        "Range": "65 - 140"
      }
    ]
  },
  {
    "Test_Code": "COA-005",
    "Test_Name": "Antithrombin III",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 85000,
    "Components": [
      {
        "Analyte": "AT III",
        "Unit": "%",
        "Range": "80 - 120"
      }
    ]
  },
  {
    "Test_Code": "COA-006",
    "Test_Name": "Lupus Anticoagulant",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 100000,
    "Components": [
      {
        "Analyte": "LA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "COA-007",
    "Test_Name": "Factor VIII Assay",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation Factors",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "Factor VIII",
        "Unit": "%",
        "Range": "50 - 150"
      }
    ]
  },
  {
    "Test_Code": "COA-008",
    "Test_Name": "Factor IX Assay",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation Factors",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "Factor IX",
        "Unit": "%",
        "Range": "60 - 140"
      }
    ]
  },
  {
    "Test_Code": "COA-009",
    "Test_Name": "Von Willebrand Factor Antigen",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Coagulation Factors",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Citrated Plasma",
    "Price": 130000,
    "Components": [
      {
        "Analyte": "vWF Ag",
        "Unit": "%",
        "Range": "50 - 150"
      }
    ]
  },
  {
    "Test_Code": "END-001",
    "Test_Name": "Insulin (Fasting)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Insulin",
        "Unit": "uIU/mL",
        "Range": "2 - 25"
      }
    ]
  },
  {
    "Test_Code": "END-002",
    "Test_Name": "C-Peptide",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "C-Peptide",
        "Unit": "ng/mL",
        "Range": "0.5 - 2.0"
      }
    ]
  },
  {
    "Test_Code": "END-003",
    "Test_Name": "Parathyroid Hormone (PTH)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "PTH",
        "Unit": "pg/mL",
        "Range": "15 - 65"
      }
    ]
  },
  {
    "Test_Code": "END-004",
    "Test_Name": "Aldosterone",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Aldosterone",
        "Unit": "ng/dL",
        "Range": "3 - 16"
      }
    ]
  },
  {
    "Test_Code": "END-005",
    "Test_Name": "Renin Activity",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Plasma",
    "Price": 95000,
    "Components": [
      {
        "Analyte": "Renin",
        "Unit": "ng/mL/hr",
        "Range": "0.6 - 4.3"
      }
    ]
  },
  {
    "Test_Code": "END-006",
    "Test_Name": "DHEA-S",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "DHEA-S",
        "Unit": "ug/dL",
        "Range": "35 - 430"
      }
    ]
  },
  {
    "Test_Code": "END-007",
    "Test_Name": "17-OH Progesterone",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "17-OHP",
        "Unit": "ng/mL",
        "Range": "0.2 - 1.3"
      }
    ]
  },
  {
    "Test_Code": "END-008",
    "Test_Name": "Sex Hormone Binding Globulin (SHBG)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "SHBG",
        "Unit": "nmol/L",
        "Range": "10 - 80"
      }
    ]
  },
  {
    "Test_Code": "END-009",
    "Test_Name": "Free Testosterone",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "Free Testosterone",
        "Unit": "pg/mL",
        "Range": "9 - 30"
      }
    ]
  },
  {
    "Test_Code": "END-010",
    "Test_Name": "Anti-Mullerian Hormone (AMH)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 100000,
    "Components": [
      {
        "Analyte": "AMH",
        "Unit": "ng/mL",
        "Range": "0.7 - 8.0"
      }
    ]
  },
  {
    "Test_Code": "ALG-001",
    "Test_Name": "Total IgE",
    "Department": "Immunology & Serology",
    "Sub_Department": "Allergy",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Total IgE",
        "Unit": "IU/mL",
        "Range": "< 100"
      }
    ]
  },
  {
    "Test_Code": "ALG-002",
    "Test_Name": "Allergen Screen (Food Panel)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Allergy",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 10,
    "Specimen_Type": "Serum",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "Milk",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Egg White",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Peanut",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Soybean",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Wheat",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Fish",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Shellfish",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Tree Nuts",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Sesame",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Corn",
        "Unit": "kU/L",
        "Range": "< 0.35"
      }
    ]
  },
  {
    "Test_Code": "ALG-003",
    "Test_Name": "Allergen Screen (Inhalant Panel)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Allergy",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 8,
    "Specimen_Type": "Serum",
    "Price": 130000,
    "Components": [
      {
        "Analyte": "Dust Mite",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Cat Dander",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Dog Dander",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Grass Pollen",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Tree Pollen",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Ragweed",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Mold",
        "Unit": "kU/L",
        "Range": "< 0.35"
      },
      {
        "Analyte": "Cockroach",
        "Unit": "kU/L",
        "Range": "< 0.35"
      }
    ]
  },
  {
    "Test_Code": "NUT-001",
    "Test_Name": "Zinc (Serum)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Trace Elements",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Zinc",
        "Unit": "ug/dL",
        "Range": "70 - 150"
      }
    ]
  },
  {
    "Test_Code": "NUT-002",
    "Test_Name": "Copper (Serum)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Trace Elements",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Copper",
        "Unit": "ug/dL",
        "Range": "70 - 140"
      }
    ]
  },
  {
    "Test_Code": "NUT-003",
    "Test_Name": "Selenium",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Trace Elements",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Selenium",
        "Unit": "ug/L",
        "Range": "70 - 150"
      }
    ]
  },
  {
    "Test_Code": "NUT-004",
    "Test_Name": "Manganese",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Trace Elements",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Manganese",
        "Unit": "ug/L",
        "Range": "4 - 15"
      }
    ]
  },
  {
    "Test_Code": "NUT-005",
    "Test_Name": "Vitamin A (Retinol)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Vitamin A",
        "Unit": "ug/dL",
        "Range": "30 - 80"
      }
    ]
  },
  {
    "Test_Code": "NUT-006",
    "Test_Name": "Vitamin E (Alpha-Tocopherol)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Vitamin E",
        "Unit": "mg/L",
        "Range": "5 - 20"
      }
    ]
  },
  {
    "Test_Code": "NUT-007",
    "Test_Name": "Vitamin K1",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "Vitamin K1",
        "Unit": "ng/mL",
        "Range": "0.2 - 3.2"
      }
    ]
  },
  {
    "Test_Code": "NUT-008",
    "Test_Name": "Vitamin C (Ascorbic Acid)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Plasma",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Vitamin C",
        "Unit": "mg/L",
        "Range": "4 - 20"
      }
    ]
  },
  {
    "Test_Code": "NUT-009",
    "Test_Name": "Vitamin B1 (Thiamine)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Vitamin B1",
        "Unit": "nmol/L",
        "Range": "70 - 180"
      }
    ]
  },
  {
    "Test_Code": "NUT-010",
    "Test_Name": "Vitamin B6 (Pyridoxine)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Vitamins",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Plasma",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Vitamin B6",
        "Unit": "nmol/L",
        "Range": "20 - 125"
      }
    ]
  },
  {
    "Test_Code": "LIV-001",
    "Test_Name": "Alpha-Fetoprotein (AFP) for Hepatoma",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "AFP",
        "Unit": "IU/mL",
        "Range": "< 10"
      }
    ]
  },
  {
    "Test_Code": "LIV-002",
    "Test_Name": "Des-Gamma-Carboxy Prothrombin (DCP)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "DCP",
        "Unit": "mAU/mL",
        "Range": "< 40"
      }
    ]
  },
  {
    "Test_Code": "LIV-003",
    "Test_Name": "Ceruloplasmin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Liver Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Ceruloplasmin",
        "Unit": "mg/dL",
        "Range": "20 - 60"
      }
    ]
  },
  {
    "Test_Code": "LIV-004",
    "Test_Name": "Alpha-1 Antitrypsin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Liver Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "A1AT",
        "Unit": "mg/dL",
        "Range": "90 - 200"
      }
    ]
  },
  {
    "Test_Code": "REN-001",
    "Test_Name": "Cystatin C",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Renal Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Cystatin C",
        "Unit": "mg/L",
        "Range": "0.5 - 1.0"
      }
    ]
  },
  {
    "Test_Code": "REN-002",
    "Test_Name": "Beta-2 Microglobulin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Renal Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "B2M",
        "Unit": "mg/L",
        "Range": "0.7 - 1.8"
      }
    ]
  },
  {
    "Test_Code": "REN-003",
    "Test_Name": "Urine Osmolality",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Renal Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Osmolality",
        "Unit": "mOsm/kg",
        "Range": "300 - 900"
      }
    ]
  },
  {
    "Test_Code": "REN-004",
    "Test_Name": "Serum Osmolality",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Renal Function",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Osmolality",
        "Unit": "mOsm/kg",
        "Range": "275 - 295"
      }
    ]
  },
  {
    "Test_Code": "REN-005",
    "Test_Name": "Anion Gap",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Electrolytes",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Anion Gap",
        "Unit": "mmol/L",
        "Range": "8 - 12"
      }
    ]
  },
  {
    "Test_Code": "CAR-001",
    "Test_Name": "Myoglobin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Cardiac Biomarkers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Myoglobin",
        "Unit": "ng/mL",
        "Range": "< 90"
      }
    ]
  },
  {
    "Test_Code": "CAR-002",
    "Test_Name": "Troponin T (High Sensitivity)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Cardiac Biomarkers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "Troponin T",
        "Unit": "ng/L",
        "Range": "< 14"
      }
    ]
  },
  {
    "Test_Code": "CAR-003",
    "Test_Name": "BNP (B-type Natriuretic Peptide)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Cardiac Biomarkers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Plasma",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "BNP",
        "Unit": "pg/mL",
        "Range": "< 100"
      }
    ]
  },
  {
    "Test_Code": "CAR-004",
    "Test_Name": "Lipoprotein(a) - Lp(a)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Lipid Profile",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Lp(a)",
        "Unit": "mg/dL",
        "Range": "< 30"
      }
    ]
  },
  {
    "Test_Code": "CAR-005",
    "Test_Name": "Apolipoprotein A1",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Lipid Profile",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Apo A1",
        "Unit": "mg/dL",
        "Range": "120 - 180"
      }
    ]
  },
  {
    "Test_Code": "CAR-006",
    "Test_Name": "Apolipoprotein B",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Lipid Profile",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Apo B",
        "Unit": "mg/dL",
        "Range": "60 - 120"
      }
    ]
  },
  {
    "Test_Code": "THY-001",
    "Test_Name": "Reverse T3",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Reverse T3",
        "Unit": "ng/dL",
        "Range": "10 - 24"
      }
    ]
  },
  {
    "Test_Code": "THY-002",
    "Test_Name": "Thyroid Binding Globulin (TBG)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "TBG",
        "Unit": "ug/mL",
        "Range": "13 - 39"
      }
    ]
  },
  {
    "Test_Code": "THY-003",
    "Test_Name": "Thyroglobulin",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hormones",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "Thyroglobulin",
        "Unit": "ng/mL",
        "Range": "< 40"
      }
    ]
  },
  {
    "Test_Code": "INF-001",
    "Test_Name": "COVID-19 PCR (SARS-CoV-2)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasopharyngeal Swab",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "SARS-CoV-2 RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "INF-002",
    "Test_Name": "COVID-19 Rapid Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasopharyngeal Swab",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "SARS-CoV-2 Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-003",
    "Test_Name": "Influenza A/B Rapid Test",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "Nasopharyngeal Swab",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Influenza A",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Influenza B",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-004",
    "Test_Name": "RSV (Respiratory Syncytial Virus)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasopharyngeal Swab",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "RSV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-005",
    "Test_Name": "Adenovirus Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasopharyngeal Swab",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Adenovirus",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-006",
    "Test_Name": "Rotavirus Antigen (Stool)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Rotavirus",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-007",
    "Test_Name": "Norovirus Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Norovirus",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-008",
    "Test_Name": "Malaria Rapid Diagnostic Test (RDT)",
    "Department": "Parasitology",
    "Sub_Department": "Blood Parasites",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Malaria RDT",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-009",
    "Test_Name": "Typhoid IgM (Rapid Test)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum/Whole Blood",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Typhoid IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "INF-010",
    "Test_Name": "Brucella IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Brucella IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "TMR-001",
    "Test_Name": "CA 15-3 (Breast Cancer)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 130000,
    "Components": [
      {
        "Analyte": "CA 15-3",
        "Unit": "U/mL",
        "Range": "< 30"
      }
    ]
  },
  {
    "Test_Code": "TMR-002",
    "Test_Name": "CA 72-4 (Gastric Cancer)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 140000,
    "Components": [
      {
        "Analyte": "CA 72-4",
        "Unit": "U/mL",
        "Range": "< 6.9"
      }
    ]
  },
  {
    "Test_Code": "TMR-003",
    "Test_Name": "SCC (Squamous Cell Carcinoma Antigen)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "SCC",
        "Unit": "ng/mL",
        "Range": "< 1.5"
      }
    ]
  },
  {
    "Test_Code": "TMR-004",
    "Test_Name": "NSE (Neuron-Specific Enolase)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 110000,
    "Components": [
      {
        "Analyte": "NSE",
        "Unit": "ng/mL",
        "Range": "< 16"
      }
    ]
  },
  {
    "Test_Code": "TMR-005",
    "Test_Name": "Beta-2 Microglobulin (Tumor Marker)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "B2M",
        "Unit": "mg/L",
        "Range": "< 3"
      }
    ]
  },
  {
    "Test_Code": "TMR-006",
    "Test_Name": "HE4 (Ovarian Cancer)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 160000,
    "Components": [
      {
        "Analyte": "HE4",
        "Unit": "pmol/L",
        "Range": "< 140"
      }
    ]
  },
  {
    "Test_Code": "TMR-007",
    "Test_Name": "Chromogranin A",
    "Department": "Immunology & Serology",
    "Sub_Department": "Tumor Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 130000,
    "Components": [
      {
        "Analyte": "Chromogranin A",
        "Unit": "ng/mL",
        "Range": "< 100"
      }
    ]
  },
  {
    "Test_Code": "BON-001",
    "Test_Name": "Bone Alkaline Phosphatase",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Bone Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "BAP",
        "Unit": "U/L",
        "Range": "10 - 40"
      }
    ]
  },
  {
    "Test_Code": "BON-002",
    "Test_Name": "Osteocalcin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Bone Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Osteocalcin",
        "Unit": "ng/mL",
        "Range": "5 - 30"
      }
    ]
  },
  {
    "Test_Code": "BON-003",
    "Test_Name": "C-Terminal Telopeptide (CTX)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Bone Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "CTX",
        "Unit": "ng/mL",
        "Range": "< 0.5"
      }
    ]
  },
  {
    "Test_Code": "BON-004",
    "Test_Name": "N-Terminal Propeptide (P1NP)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Bone Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "P1NP",
        "Unit": "ng/mL",
        "Range": "20 - 80"
      }
    ]
  },
  {
    "Test_Code": "ANE-001",
    "Test_Name": "Soluble Transferrin Receptor (sTfR)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Anemia Workup",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "sTfR",
        "Unit": "mg/L",
        "Range": "0.8 - 3.3"
      }
    ]
  },
  {
    "Test_Code": "ANE-002",
    "Test_Name": "Haptoglobin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Anemia Workup",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Haptoglobin",
        "Unit": "mg/dL",
        "Range": "30 - 200"
      }
    ]
  },
  {
    "Test_Code": "ANE-003",
    "Test_Name": "Bilirubin (Neonatal)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Neonatal",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Bilirubin",
        "Unit": "mg/dL",
        "Range": "< 12"
      }
    ]
  },
  {
    "Test_Code": "SPC-001",
    "Test_Name": "G6PD (Qualitative)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Special Hematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "G6PD Screen",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "SPC-002",
    "Test_Name": "Methemoglobin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Special Chemistry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "MetHb",
        "Unit": "%",
        "Range": "< 2"
      }
    ]
  },
  {
    "Test_Code": "SPC-003",
    "Test_Name": "Sulfhemoglobin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Special Chemistry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "SulfHb",
        "Unit": "%",
        "Range": "< 1"
      }
    ]
  },
  {
    "Test_Code": "SPC-004",
    "Test_Name": "Oxygen Saturation (Pulse Oximetry)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Special Chemistry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "SpO2",
        "Unit": "%",
        "Range": "95 - 100"
      }
    ]
  },
  {
    "Test_Code": "SPC-005",
    "Test_Name": "Lactate (Blood)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Special Chemistry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Lactate",
        "Unit": "mmol/L",
        "Range": "0.5 - 2.0"
      }
    ]
  },
  {
    "Test_Code": "SPC-006",
    "Test_Name": "Ammonia",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Special Chemistry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Plasma",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Ammonia",
        "Unit": "umol/L",
        "Range": "15 - 45"
      }
    ]
  },
  {
    "Test_Code": "SPC-007",
    "Test_Name": "Ketones (Blood)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Special Chemistry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Ketones",
        "Unit": "mmol/L",
        "Range": "< 0.6"
      }
    ]
  },
  {
    "Test_Code": "CSF-001",
    "Test_Name": "CSF Cell Count",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "CSF",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "RBC",
        "Unit": "/uL",
        "Range": "0"
      },
      {
        "Analyte": "WBC",
        "Unit": "/uL",
        "Range": "0 - 5"
      },
      {
        "Analyte": "Differential",
        "Unit": "%",
        "Range": "Lymphocytes"
      }
    ]
  },
  {
    "Test_Code": "CSF-002",
    "Test_Name": "CSF Protein",
    "Department": "Clinical Chemistry",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Protein",
        "Unit": "mg/dL",
        "Range": "15 - 45"
      }
    ]
  },
  {
    "Test_Code": "CSF-003",
    "Test_Name": "CSF Glucose",
    "Department": "Clinical Chemistry",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Glucose",
        "Unit": "mg/dL",
        "Range": "50 - 80"
      }
    ]
  },
  {
    "Test_Code": "CSF-004",
    "Test_Name": "CSF Chloride",
    "Department": "Clinical Chemistry",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Chloride",
        "Unit": "mmol/L",
        "Range": "110 - 130"
      }
    ]
  },
  {
    "Test_Code": "CSF-005",
    "Test_Name": "CSF Gram Stain",
    "Department": "Microbiology",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Gram Stain",
        "Unit": "Text",
        "Range": "No Organisms"
      }
    ]
  },
  {
    "Test_Code": "CSF-006",
    "Test_Name": "CSF Culture & Sensitivity",
    "Department": "Microbiology",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Culture",
        "Unit": "Text",
        "Range": "No Growth"
      }
    ]
  },
  {
    "Test_Code": "CSF-007",
    "Test_Name": "CSF India Ink (Cryptococcus)",
    "Department": "Microbiology",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "India Ink",
        "Unit": "Text",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "CSF-008",
    "Test_Name": "CSF Oligoclonal Bands",
    "Department": "Immunology & Serology",
    "Sub_Department": "CSF Analysis",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Oligoclonal Bands",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PLF-001",
    "Test_Name": "Pleural Fluid Analysis",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Body Fluid Analysis",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Pleural Fluid",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "RBC",
        "Unit": "/uL",
        "Range": "< 1000"
      },
      {
        "Analyte": "WBC",
        "Unit": "/uL",
        "Range": "< 1000"
      },
      {
        "Analyte": "Protein",
        "Unit": "g/dL",
        "Range": "< 3"
      },
      {
        "Analyte": "LDH",
        "Unit": "U/L",
        "Range": "< 200"
      }
    ]
  },
  {
    "Test_Code": "PLF-002",
    "Test_Name": "Ascitic Fluid Analysis",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Body Fluid Analysis",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Ascitic Fluid",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "RBC",
        "Unit": "/uL",
        "Range": "< 1000"
      },
      {
        "Analyte": "WBC",
        "Unit": "/uL",
        "Range": "< 500"
      },
      {
        "Analyte": "Protein",
        "Unit": "g/dL",
        "Range": "< 2.5"
      },
      {
        "Analyte": "Albumin",
        "Unit": "g/dL",
        "Range": "Serum-Ascites Gradient"
      }
    ]
  },
  {
    "Test_Code": "PLF-003",
    "Test_Name": "Pericardial Fluid Analysis",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Body Fluid Analysis",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Pericardial Fluid",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "RBC",
        "Unit": "/uL",
        "Range": "< 1000"
      },
      {
        "Analyte": "WBC",
        "Unit": "/uL",
        "Range": "< 1000"
      },
      {
        "Analyte": "Culture",
        "Unit": "Text",
        "Range": "No Growth"
      }
    ]
  },
  {
    "Test_Code": "PLF-004",
    "Test_Name": "Synovial Fluid Analysis (Joint Fluid)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Body Fluid Analysis",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Synovial Fluid",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "RBC",
        "Unit": "/uL",
        "Range": "< 2000"
      },
      {
        "Analyte": "WBC",
        "Unit": "/uL",
        "Range": "< 200"
      },
      {
        "Analyte": "PMN%",
        "Unit": "%",
        "Range": "< 25"
      },
      {
        "Analyte": "Crystals",
        "Unit": "Text",
        "Range": "None"
      },
      {
        "Analyte": "Culture",
        "Unit": "Text",
        "Range": "No Growth"
      }
    ]
  },
  {
    "Test_Code": "SEM-001",
    "Test_Name": "Semen Analysis (Basic)",
    "Department": "Andrology",
    "Sub_Department": "Semen Analysis",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 6,
    "Specimen_Type": "Semen",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Volume",
        "Unit": "mL",
        "Range": "1.5 - 5"
      },
      {
        "Analyte": "Concentration",
        "Unit": "M/mL",
        "Range": "> 15"
      },
      {
        "Analyte": "Motility",
        "Unit": "%",
        "Range": "> 40"
      },
      {
        "Analyte": "Progressive Motility",
        "Unit": "%",
        "Range": "> 32"
      },
      {
        "Analyte": "Morphology",
        "Unit": "%",
        "Range": "> 4"
      },
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "7.2 - 8.0"
      }
    ]
  },
  {
    "Test_Code": "SEM-002",
    "Test_Name": "Semen Analysis (Extended)",
    "Department": "Andrology",
    "Sub_Department": "Semen Analysis",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 10,
    "Specimen_Type": "Semen",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Volume",
        "Unit": "mL",
        "Range": "1.5 - 5"
      },
      {
        "Analyte": "Concentration",
        "Unit": "M/mL",
        "Range": "> 15"
      },
      {
        "Analyte": "Total Count",
        "Unit": "M",
        "Range": "> 39"
      },
      {
        "Analyte": "Motility",
        "Unit": "%",
        "Range": "> 40"
      },
      {
        "Analyte": "Progressive Motility",
        "Unit": "%",
        "Range": "> 32"
      },
      {
        "Analyte": "Non-Progressive",
        "Unit": "%",
        "Range": "< 20"
      },
      {
        "Analyte": "Immotile",
        "Unit": "%",
        "Range": "< 40"
      },
      {
        "Analyte": "Morphology",
        "Unit": "%",
        "Range": "> 4"
      },
      {
        "Analyte": "Vitality",
        "Unit": "%",
        "Range": "> 58"
      },
      {
        "Analyte": "WBC",
        "Unit": "M/mL",
        "Range": "< 1"
      }
    ]
  },
  {
    "Test_Code": "SEM-003",
    "Test_Name": "Sperm Antibodies (MAR Test)",
    "Department": "Andrology",
    "Sub_Department": "Immunology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Semen",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "MAR",
        "Unit": "%",
        "Range": "< 50"
      }
    ]
  },
  {
    "Test_Code": "SEM-004",
    "Test_Name": "Sperm DNA Fragmentation",
    "Department": "Andrology",
    "Sub_Department": "Advanced Semen",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Semen",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "DNA Fragmentation",
        "Unit": "%",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "GEN-001",
    "Test_Name": "Factor V Leiden Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "Factor V Leiden",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "GEN-002",
    "Test_Name": "Prothrombin G20210A Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "Prothrombin Mutation",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "GEN-003",
    "Test_Name": "MTHFR Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 160000,
    "Components": [
      {
        "Analyte": "MTHFR",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "GEN-004",
    "Test_Name": "Sickle Cell Mutation (HbS)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "HbS",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "GEN-005",
    "Test_Name": "Cystic Fibrosis Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "CFTR",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "GEN-006",
    "Test_Name": "Alpha-Thalassemia Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "Alpha-Globin",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "GEN-007",
    "Test_Name": "Beta-Thalassemia Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "Beta-Globin",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "GEN-008",
    "Test_Name": "Glucose-6-PD Deficiency (Molecular)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Genetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 170000,
    "Components": [
      {
        "Analyte": "G6PD Gene",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "TDM-001",
    "Test_Name": "Digoxin Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Digoxin",
        "Unit": "ng/mL",
        "Range": "0.5 - 2.0"
      }
    ]
  },
  {
    "Test_Code": "TDM-002",
    "Test_Name": "Lithium Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Lithium",
        "Unit": "mmol/L",
        "Range": "0.6 - 1.0"
      }
    ]
  },
  {
    "Test_Code": "TDM-003",
    "Test_Name": "Valproic Acid Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Valproate",
        "Unit": "ug/mL",
        "Range": "50 - 100"
      }
    ]
  },
  {
    "Test_Code": "TDM-004",
    "Test_Name": "Carbamazepine Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Carbamazepine",
        "Unit": "ug/mL",
        "Range": "4 - 12"
      }
    ]
  },
  {
    "Test_Code": "TDM-005",
    "Test_Name": "Phenytoin Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Phenytoin",
        "Unit": "ug/mL",
        "Range": "10 - 20"
      }
    ]
  },
  {
    "Test_Code": "TDM-006",
    "Test_Name": "Theophylline Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Theophylline",
        "Unit": "ug/mL",
        "Range": "10 - 20"
      }
    ]
  },
  {
    "Test_Code": "TDM-007",
    "Test_Name": "Gentamicin Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Gentamicin",
        "Unit": "ug/mL",
        "Range": "5 - 10"
      }
    ]
  },
  {
    "Test_Code": "TDM-008",
    "Test_Name": "Vancomycin Level",
    "Department": "Toxicology",
    "Sub_Department": "TDM",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Vancomycin",
        "Unit": "ug/mL",
        "Range": "10 - 20"
      }
    ]
  },
  {
    "Test_Code": "NBS-001",
    "Test_Name": "Newborn Screening (Basic Panel)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Newborn Screening",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Dried Blood Spot",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "TSH",
        "Unit": "mIU/L",
        "Range": "Normal"
      },
      {
        "Analyte": "17-OHP",
        "Unit": "ng/mL",
        "Range": "Normal"
      },
      {
        "Analyte": "Phenylalanine",
        "Unit": "mg/dL",
        "Range": "< 2"
      },
      {
        "Analyte": "Galactose",
        "Unit": "mg/dL",
        "Range": "Normal"
      },
      {
        "Analyte": "G6PD",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "NBS-002",
    "Test_Name": "Newborn Screening (Extended)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Newborn Screening",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 10,
    "Specimen_Type": "Dried Blood Spot",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "TSH",
        "Unit": "mIU/L",
        "Range": "Normal"
      },
      {
        "Analyte": "T4",
        "Unit": "ug/dL",
        "Range": "Normal"
      },
      {
        "Analyte": "17-OHP",
        "Unit": "ng/mL",
        "Range": "Normal"
      },
      {
        "Analyte": "Phenylalanine",
        "Unit": "mg/dL",
        "Range": "< 2"
      },
      {
        "Analyte": "Galactose",
        "Unit": "mg/dL",
        "Range": "Normal"
      },
      {
        "Analyte": "G6PD",
        "Unit": "Qualitative",
        "Range": "Normal"
      },
      {
        "Analyte": "Biotinidase",
        "Unit": "Qualitative",
        "Range": "Normal"
      },
      {
        "Analyte": "Carnitine",
        "Unit": "umol/L",
        "Range": "Normal"
      },
      {
        "Analyte": "Methionine",
        "Unit": "umol/L",
        "Range": "Normal"
      },
      {
        "Analyte": "Succinylacetone",
        "Unit": "umol/L",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "IG-001",
    "Test_Name": "IgG Subclasses",
    "Department": "Immunology & Serology",
    "Sub_Department": "Immunoglobulins",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Serum",
    "Price": 110000,
    "Components": [
      {
        "Analyte": "IgG1",
        "Unit": "mg/dL",
        "Range": "380 - 930"
      },
      {
        "Analyte": "IgG2",
        "Unit": "mg/dL",
        "Range": "240 - 700"
      },
      {
        "Analyte": "IgG3",
        "Unit": "mg/dL",
        "Range": "20 - 110"
      },
      {
        "Analyte": "IgG4",
        "Unit": "mg/dL",
        "Range": "10 - 120"
      }
    ]
  },
  {
    "Test_Code": "IG-002",
    "Test_Name": "IgA Subclasses",
    "Department": "Immunology & Serology",
    "Sub_Department": "Immunoglobulins",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "Serum",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "IgA1",
        "Unit": "mg/dL",
        "Range": "50 - 300"
      },
      {
        "Analyte": "IgA2",
        "Unit": "mg/dL",
        "Range": "10 - 90"
      }
    ]
  },
  {
    "Test_Code": "IG-003",
    "Test_Name": "Complement C3",
    "Department": "Immunology & Serology",
    "Sub_Department": "Complement",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "C3",
        "Unit": "mg/dL",
        "Range": "90 - 180"
      }
    ]
  },
  {
    "Test_Code": "IG-004",
    "Test_Name": "Complement C4",
    "Department": "Immunology & Serology",
    "Sub_Department": "Complement",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "C4",
        "Unit": "mg/dL",
        "Range": "10 - 40"
      }
    ]
  },
  {
    "Test_Code": "IG-005",
    "Test_Name": "CH50 (Total Complement)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Complement",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "CH50",
        "Unit": "U/mL",
        "Range": "30 - 75"
      }
    ]
  },
  {
    "Test_Code": "AI-001",
    "Test_Name": "Anti-Smith (Sm) Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 75000,
    "Components": [
      {
        "Analyte": "Anti-Sm",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-002",
    "Test_Name": "Anti-RNP Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "Anti-RNP",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-003",
    "Test_Name": "Anti-SSA/Ro Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "Anti-SSA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-004",
    "Test_Name": "Anti-SSB/La Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "Anti-SSB",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-005",
    "Test_Name": "Anti-Scl-70 Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 75000,
    "Components": [
      {
        "Analyte": "Anti-Scl-70",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-006",
    "Test_Name": "Anti-Jo-1 Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Anti-Jo-1",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-007",
    "Test_Name": "Anti-Centromere Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 75000,
    "Components": [
      {
        "Analyte": "Anti-Centromere",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-008",
    "Test_Name": "Anti-Glomerular Basement Membrane (GBM)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 85000,
    "Components": [
      {
        "Analyte": "Anti-GBM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-009",
    "Test_Name": "Anti-Neutrophil Cytoplasmic Ab (ANCA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "Serum",
    "Price": 95000,
    "Components": [
      {
        "Analyte": "c-ANCA",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "p-ANCA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-010",
    "Test_Name": "Anti-Mitochondrial Antibody (AMA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "AMA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-011",
    "Test_Name": "Anti-Smooth Muscle Antibody (ASMA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "ASMA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-012",
    "Test_Name": "Anti-Insulin Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 75000,
    "Components": [
      {
        "Analyte": "Anti-Insulin",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "AI-013",
    "Test_Name": "Anti-GAD Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Anti-GAD",
        "Unit": "U/mL",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "AI-014",
    "Test_Name": "Anti-IA2 Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Anti-IA2",
        "Unit": "U/mL",
        "Range": "< 0.8"
      }
    ]
  },
  {
    "Test_Code": "AI-015",
    "Test_Name": "Islet Cell Antibody (ICA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Autoimmunity",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 85000,
    "Components": [
      {
        "Analyte": "ICA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "NEP-001",
    "Test_Name": "Anti-Phospholipase A2 Receptor (PLA2R)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Nephrology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "Anti-PLA2R",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "NEP-002",
    "Test_Name": "Anti-Neutrophil Cytoplasmic Ab (MPO)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Nephrology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Anti-MPO",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "NEP-003",
    "Test_Name": "Anti-Proteinase 3 (PR3)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Nephrology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Anti-PR3",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "GAS-001",
    "Test_Name": "Tissue Transglutaminase IgA (tTG-IgA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Gastroenterology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "tTG-IgA",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "GAS-002",
    "Test_Name": "Endomysial Antibody (EMA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Gastroenterology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "EMA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "GAS-003",
    "Test_Name": "Gliadin IgA",
    "Department": "Immunology & Serology",
    "Sub_Department": "Gastroenterology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Gliadin IgA",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "GAS-004",
    "Test_Name": "Gliadin IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Gastroenterology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Gliadin IgG",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "GAS-005",
    "Test_Name": "Saccharomyces cerevisiae Ab (ASCA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Gastroenterology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "Serum",
    "Price": 85000,
    "Components": [
      {
        "Analyte": "ASCA IgA",
        "Unit": "U/mL",
        "Range": "< 20"
      },
      {
        "Analyte": "ASCA IgG",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "GAS-006",
    "Test_Name": "Lactoferrin (Stool)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Gastroenterology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Lactoferrin",
        "Unit": "ug/g",
        "Range": "< 7.3"
      }
    ]
  },
  {
    "Test_Code": "GAS-007",
    "Test_Name": "Calprotectin (Stool)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Gastroenterology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Calprotectin",
        "Unit": "ug/g",
        "Range": "< 50"
      }
    ]
  },
  {
    "Test_Code": "HEP-001",
    "Test_Name": "Hepatitis D Virus (HDV) Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Anti-HDV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "HEP-002",
    "Test_Name": "Hepatitis E Virus IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "HEV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "HEP-003",
    "Test_Name": "Hepatitis E Virus IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "HEV IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "HEP-004",
    "Test_Name": "Hepatitis B Surface Antibody (Anti-HBs)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Screening",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Anti-HBs",
        "Unit": "mIU/mL",
        "Range": "> 10"
      }
    ]
  },
  {
    "Test_Code": "TOR-001",
    "Test_Name": "TORCH Panel (Basic)",
    "Department": "Immunology & Serology",
    "Sub_Department": "TORCH",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Serum",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "Toxoplasma IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Rubella IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "CMV IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "HSV IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "TOR-002",
    "Test_Name": "TORCH Panel (Extended)",
    "Department": "Immunology & Serology",
    "Sub_Department": "TORCH",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 8,
    "Specimen_Type": "Serum",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "Toxoplasma IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Toxoplasma IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Rubella IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Rubella IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "CMV IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "CMV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "HSV-1 IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "HSV-2 IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "ARB-001",
    "Test_Name": "West Nile Virus IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum/CSF",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "WNV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "ARB-002",
    "Test_Name": "Yellow Fever IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "YFV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "ARB-003",
    "Test_Name": "Zika Virus IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 75000,
    "Components": [
      {
        "Analyte": "Zika IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "RCK-001",
    "Test_Name": "Scrub Typhus IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Scrub Typhus IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "RCK-002",
    "Test_Name": "Typhus IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Typhus IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "FUN-001",
    "Test_Name": "Aspergillus Antigen (Galactomannan)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum/BAL",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Galactomannan",
        "Unit": "Index",
        "Range": "< 0.5"
      }
    ]
  },
  {
    "Test_Code": "FUN-002",
    "Test_Name": "Beta-D-Glucan",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 85000,
    "Components": [
      {
        "Analyte": "Beta-D-Glucan",
        "Unit": "pg/mL",
        "Range": "< 80"
      }
    ]
  },
  {
    "Test_Code": "FUN-003",
    "Test_Name": "Histoplasma Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine/Serum",
    "Price": 95000,
    "Components": [
      {
        "Analyte": "Histoplasma Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "FUN-004",
    "Test_Name": "Coccidioides Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Coccidioides Ab",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "FUN-005",
    "Test_Name": "Blastomyces Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine/Serum",
    "Price": 95000,
    "Components": [
      {
        "Analyte": "Blastomyces Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-008",
    "Test_Name": "Strongyloides Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Strongyloides Ab",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-009",
    "Test_Name": "Trichinella Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Trichinella Ab",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-010",
    "Test_Name": "Filaria Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Filaria Ab",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-011",
    "Test_Name": "Schistosoma Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Schistosoma Ab",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PAR-012",
    "Test_Name": "Taenia solium Antibody (Cysticercosis)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Parasitic Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Cysticercosis Ab",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MYC-001",
    "Test_Name": "Dermatophyte Culture",
    "Department": "Microbiology",
    "Sub_Department": "Mycology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Skin/Nails/Hair",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Dermatophyte",
        "Unit": "Text",
        "Range": "No Growth"
      }
    ]
  },
  {
    "Test_Code": "MYC-002",
    "Test_Name": "Candida Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Candida Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MYC-003",
    "Test_Name": "Mannan Antigen (Candida)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Mannan",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MYC-004",
    "Test_Name": "Anti-Mannan Antibody",
    "Department": "Immunology & Serology",
    "Sub_Department": "Fungal Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Anti-Mannan",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VIR-001",
    "Test_Name": "Parvovirus B19 IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Parvovirus IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VIR-002",
    "Test_Name": "Parvovirus B19 IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Parvovirus IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VIR-003",
    "Test_Name": "Mumps IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Mumps IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VIR-004",
    "Test_Name": "Measles IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Measles IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VIR-005",
    "Test_Name": "Varicella-Zoster IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "VZV IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VIR-006",
    "Test_Name": "Varicella-Zoster IgG",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "VZV IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VIR-007",
    "Test_Name": "Enterovirus PCR (CSF)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 130000,
    "Components": [
      {
        "Analyte": "Enterovirus RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "VIR-008",
    "Test_Name": "HSV PCR (CSF)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 140000,
    "Components": [
      {
        "Analyte": "HSV DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "VIR-009",
    "Test_Name": "VZV PCR (CSF)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CSF",
    "Price": 140000,
    "Components": [
      {
        "Analyte": "VZV DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "VIR-010",
    "Test_Name": "CMV PCR (Quantitative)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Plasma",
    "Price": 160000,
    "Components": [
      {
        "Analyte": "CMV DNA",
        "Unit": "IU/mL",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "VIR-011",
    "Test_Name": "EBV PCR (Quantitative)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Plasma",
    "Price": 160000,
    "Components": [
      {
        "Analyte": "EBV DNA",
        "Unit": "IU/mL",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "VIR-012",
    "Test_Name": "BK Virus PCR (Quantitative)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine/Plasma",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "BK Virus DNA",
        "Unit": "copies/mL",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-001",
    "Test_Name": "Legionella Urinary Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Legionella Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "BAC-002",
    "Test_Name": "Streptococcus pneumoniae Urinary Antigen",
    "Department": "Immunology & Serology",
    "Sub_Department": "Bacterial Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Pneumococcal Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "BAC-003",
    "Test_Name": "Clostridioides difficile Toxin A/B",
    "Department": "Microbiology",
    "Sub_Department": "Bacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "C. difficile Toxin",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "BAC-004",
    "Test_Name": "Clostridioides difficile GDH",
    "Department": "Microbiology",
    "Sub_Department": "Bacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "GDH",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "BAC-005",
    "Test_Name": "MRSA PCR (Nasal)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasal Swab",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "MRSA DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-006",
    "Test_Name": "VRE PCR (Rectal)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Rectal Swab",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "VRE DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-007",
    "Test_Name": "Bordetella pertussis PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasopharyngeal Swab",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "B. pertussis DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-008",
    "Test_Name": "Chlamydia trachomatis PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine/Swab",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "C. trachomatis DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-009",
    "Test_Name": "Neisseria gonorrhoeae PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine/Swab",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "N. gonorrhoeae DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-010",
    "Test_Name": "Trichomonas vaginalis PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Swab",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "T. vaginalis DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-011",
    "Test_Name": "Mycoplasma genitalium PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Swab/Urine",
    "Price": 75000,
    "Components": [
      {
        "Analyte": "M. genitalium DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "BAC-012",
    "Test_Name": "Ureaplasma PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Swab/Urine",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "Ureaplasma DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "MTB-001",
    "Test_Name": "TB Culture (Liquid)",
    "Department": "Microbiology",
    "Sub_Department": "Mycobacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Sputum/Tissue",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "TB Culture",
        "Unit": "Text",
        "Range": "No Growth"
      }
    ]
  },
  {
    "Test_Code": "MTB-002",
    "Test_Name": "TB Drug Sensitivity (First Line)",
    "Department": "Microbiology",
    "Sub_Department": "Mycobacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Culture Isolate",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "DST",
        "Unit": "S/R",
        "Range": "Sensitive"
      }
    ]
  },
  {
    "Test_Code": "MTB-003",
    "Test_Name": "TB Drug Sensitivity (Second Line)",
    "Department": "Microbiology",
    "Sub_Department": "Mycobacteriology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Culture Isolate",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "DST 2nd Line",
        "Unit": "S/R",
        "Range": "Sensitive"
      }
    ]
  },
  {
    "Test_Code": "MTB-004",
    "Test_Name": "Line Probe Assay (LPA) for TB",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Sputum/Culture",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "LPA",
        "Unit": "Qualitative",
        "Range": "Sensitive"
      }
    ]
  },
  {
    "Test_Code": "HGB-001",
    "Test_Name": "HPLC for Hemoglobinopathies",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Special Hematology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 6,
    "Specimen_Type": "EDTA Blood",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "Hb A",
        "Unit": "%",
        "Range": "> 95"
      },
      {
        "Analyte": "Hb A2",
        "Unit": "%",
        "Range": "< 3.5"
      },
      {
        "Analyte": "Hb F",
        "Unit": "%",
        "Range": "< 1"
      },
      {
        "Analyte": "Hb S",
        "Unit": "%",
        "Range": "0"
      },
      {
        "Analyte": "Hb C",
        "Unit": "%",
        "Range": "0"
      },
      {
        "Analyte": "Hb D",
        "Unit": "%",
        "Range": "0"
      }
    ]
  },
  {
    "Test_Code": "HGB-002",
    "Test_Name": "Kleihauer-Betke Test",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "Special Hematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Fetal Cells",
        "Unit": "%",
        "Range": "0"
      }
    ]
  },
  {
    "Test_Code": "FLO-001",
    "Test_Name": "CD4 Count (Absolute)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Flow Cytometry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "CD4",
        "Unit": "cells/uL",
        "Range": "500 - 1500"
      }
    ]
  },
  {
    "Test_Code": "FLO-002",
    "Test_Name": "CD4/CD8 Ratio",
    "Department": "Immunology & Serology",
    "Sub_Department": "Flow Cytometry",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "EDTA Blood",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "CD4",
        "Unit": "cells/uL",
        "Range": "500 - 1500"
      },
      {
        "Analyte": "CD8",
        "Unit": "cells/uL",
        "Range": "200 - 800"
      }
    ]
  },
  {
    "Test_Code": "FLO-003",
    "Test_Name": "Lymphocyte Subsets",
    "Department": "Immunology & Serology",
    "Sub_Department": "Flow Cytometry",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "EDTA Blood",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "CD3",
        "Unit": "%",
        "Range": "60 - 85"
      },
      {
        "Analyte": "CD4",
        "Unit": "%",
        "Range": "30 - 55"
      },
      {
        "Analyte": "CD8",
        "Unit": "%",
        "Range": "15 - 35"
      },
      {
        "Analyte": "CD19",
        "Unit": "%",
        "Range": "5 - 15"
      },
      {
        "Analyte": "CD16/56",
        "Unit": "%",
        "Range": "5 - 20"
      }
    ]
  },
  {
    "Test_Code": "MOH-001",
    "Test_Name": "JAK2 V617F Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 220000,
    "Components": [
      {
        "Analyte": "JAK2",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MOH-002",
    "Test_Name": "BCR-ABL (Quantitative)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "BCR-ABL",
        "Unit": "IS %",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "MOH-003",
    "Test_Name": "PML-RARA (Acute Promyelocytic Leukemia)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood/Bone Marrow",
    "Price": 280000,
    "Components": [
      {
        "Analyte": "PML-RARA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MOH-004",
    "Test_Name": "FLT3 Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood/Bone Marrow",
    "Price": 260000,
    "Components": [
      {
        "Analyte": "FLT3",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "MOH-005",
    "Test_Name": "NPM1 Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Hematology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood/Bone Marrow",
    "Price": 240000,
    "Components": [
      {
        "Analyte": "NPM1",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "STM-001",
    "Test_Name": "EGFR Mutation (Lung Cancer)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 300000,
    "Components": [
      {
        "Analyte": "EGFR",
        "Unit": "Qualitative",
        "Range": "Wild Type"
      }
    ]
  },
  {
    "Test_Code": "STM-002",
    "Test_Name": "KRAS Mutation (Colorectal Cancer)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 280000,
    "Components": [
      {
        "Analyte": "KRAS",
        "Unit": "Qualitative",
        "Range": "Wild Type"
      }
    ]
  },
  {
    "Test_Code": "STM-003",
    "Test_Name": "NRAS Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 280000,
    "Components": [
      {
        "Analyte": "NRAS",
        "Unit": "Qualitative",
        "Range": "Wild Type"
      }
    ]
  },
  {
    "Test_Code": "STM-004",
    "Test_Name": "BRAF V600E Mutation",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 260000,
    "Components": [
      {
        "Analyte": "BRAF",
        "Unit": "Qualitative",
        "Range": "Wild Type"
      }
    ]
  },
  {
    "Test_Code": "STM-005",
    "Test_Name": "ALK Rearrangement",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 320000,
    "Components": [
      {
        "Analyte": "ALK",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "STM-006",
    "Test_Name": "ROS1 Rearrangement",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 320000,
    "Components": [
      {
        "Analyte": "ROS1",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "STM-007",
    "Test_Name": "PD-L1 Expression",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 280000,
    "Components": [
      {
        "Analyte": "PD-L1",
        "Unit": "TPS %",
        "Range": "< 1"
      }
    ]
  },
  {
    "Test_Code": "STM-008",
    "Test_Name": "Microsatellite Instability (MSI)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 350000,
    "Components": [
      {
        "Analyte": "MSI",
        "Unit": "Qualitative",
        "Range": "Stable"
      }
    ]
  },
  {
    "Test_Code": "STM-009",
    "Test_Name": "Tumor Mutational Burden (TMB)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Oncology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "FFPE Tissue",
    "Price": 450000,
    "Components": [
      {
        "Analyte": "TMB",
        "Unit": "mut/Mb",
        "Range": "< 10"
      }
    ]
  },
  {
    "Test_Code": "PHG-001",
    "Test_Name": "CYP2C19 Genotyping",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Pharmacogenetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "CYP2C19",
        "Unit": "Genotype",
        "Range": "*1/*1"
      }
    ]
  },
  {
    "Test_Code": "PHG-002",
    "Test_Name": "CYP2D6 Genotyping",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Pharmacogenetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "CYP2D6",
        "Unit": "Genotype",
        "Range": "*1/*1"
      }
    ]
  },
  {
    "Test_Code": "PHG-003",
    "Test_Name": "CYP2C9 Genotyping",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Pharmacogenetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "CYP2C9",
        "Unit": "Genotype",
        "Range": "*1/*1"
      }
    ]
  },
  {
    "Test_Code": "PHG-004",
    "Test_Name": "VKORC1 Genotyping (Warfarin)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Pharmacogenetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 160000,
    "Components": [
      {
        "Analyte": "VKORC1",
        "Unit": "Genotype",
        "Range": "GG"
      }
    ]
  },
  {
    "Test_Code": "PHG-005",
    "Test_Name": "HLA-B*57:01 (Abacavir Hypersensitivity)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Pharmacogenetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 220000,
    "Components": [
      {
        "Analyte": "HLA-B*57:01",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PHG-006",
    "Test_Name": "HLA-B*15:02 (Carbamazepine)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Pharmacogenetics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 220000,
    "Components": [
      {
        "Analyte": "HLA-B*15:02",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PRE-001",
    "Test_Name": "NIPT (Non-Invasive Prenatal Testing)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Prenatal",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Maternal Blood",
    "Price": 500000,
    "Components": [
      {
        "Analyte": "Trisomy 21",
        "Unit": "Risk",
        "Range": "Low"
      },
      {
        "Analyte": "Trisomy 18",
        "Unit": "Risk",
        "Range": "Low"
      },
      {
        "Analyte": "Trisomy 13",
        "Unit": "Risk",
        "Range": "Low"
      }
    ]
  },
  {
    "Test_Code": "PRE-002",
    "Test_Name": "Amniocentesis (Karyotyping)",
    "Department": "Cytogenetics",
    "Sub_Department": "Prenatal",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Amniotic Fluid",
    "Price": 400000,
    "Components": [
      {
        "Analyte": "Karyotype",
        "Unit": "Text",
        "Range": "46,XX/46,XY"
      }
    ]
  },
  {
    "Test_Code": "PRE-003",
    "Test_Name": "Chorionic Villus Sampling (CVS)",
    "Department": "Cytogenetics",
    "Sub_Department": "Prenatal",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "CVS",
    "Price": 400000,
    "Components": [
      {
        "Analyte": "Karyotype",
        "Unit": "Text",
        "Range": "46,XX/46,XY"
      }
    ]
  },
  {
    "Test_Code": "PRE-004",
    "Test_Name": "Fetal Fibronectin",
    "Department": "Immunology & Serology",
    "Sub_Department": "Prenatal",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Cervical Swab",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "fFN",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "TRP-001",
    "Test_Name": "HLA Typing (Class I)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Transplant",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "EDTA Blood",
    "Price": 350000,
    "Components": [
      {
        "Analyte": "HLA-A",
        "Unit": "Type",
        "Range": "Typed"
      },
      {
        "Analyte": "HLA-B",
        "Unit": "Type",
        "Range": "Typed"
      },
      {
        "Analyte": "HLA-C",
        "Unit": "Type",
        "Range": "Typed"
      }
    ]
  },
  {
    "Test_Code": "TRP-002",
    "Test_Name": "HLA Typing (Class II)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Transplant",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "EDTA Blood",
    "Price": 350000,
    "Components": [
      {
        "Analyte": "HLA-DR",
        "Unit": "Type",
        "Range": "Typed"
      },
      {
        "Analyte": "HLA-DQ",
        "Unit": "Type",
        "Range": "Typed"
      },
      {
        "Analyte": "HLA-DP",
        "Unit": "Type",
        "Range": "Typed"
      }
    ]
  },
  {
    "Test_Code": "TRP-003",
    "Test_Name": "Panel Reactive Antibody (PRA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Transplant",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 280000,
    "Components": [
      {
        "Analyte": "PRA",
        "Unit": "%",
        "Range": "< 10"
      }
    ]
  },
  {
    "Test_Code": "TRP-004",
    "Test_Name": "Complement-Dependent Cytotoxicity (CDC) Crossmatch",
    "Department": "Immunology & Serology",
    "Sub_Department": "Transplant",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "CDC",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "TRP-005",
    "Test_Name": "Flow Cytometry Crossmatch",
    "Department": "Immunology & Serology",
    "Sub_Department": "Transplant",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 300000,
    "Components": [
      {
        "Analyte": "FCXM",
        "Unit": "MFI",
        "Range": "< 1000"
      }
    ]
  },
  {
    "Test_Code": "TRP-006",
    "Test_Name": "Donor-Specific Antibody (DSA)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Transplant",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 350000,
    "Components": [
      {
        "Analyte": "DSA",
        "Unit": "MFI",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "FOR-001",
    "Test_Name": "Forensic Drug Screen (10-Panel)",
    "Department": "Toxicology",
    "Sub_Department": "Forensic",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 10,
    "Specimen_Type": "Urine",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "Amphetamines",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Barbiturates",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Benzodiazepines",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Cannabinoids",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Cocaine",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Methadone",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Opiates",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Phencyclidine",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Propoxyphene",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Tricyclics",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "FOR-002",
    "Test_Name": "Ethyl Glucuronide (EtG)",
    "Department": "Toxicology",
    "Sub_Department": "Forensic",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "EtG",
        "Unit": "ng/mL",
        "Range": "< 500"
      }
    ]
  },
  {
    "Test_Code": "FOR-003",
    "Test_Name": "Hair Drug Test",
    "Department": "Toxicology",
    "Sub_Department": "Forensic",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Hair",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "Cocaine",
        "Unit": "pg/mg",
        "Range": "Negative"
      },
      {
        "Analyte": "Amphetamines",
        "Unit": "pg/mg",
        "Range": "Negative"
      },
      {
        "Analyte": "Cannabinoids",
        "Unit": "pg/mg",
        "Range": "Negative"
      },
      {
        "Analyte": "Opiates",
        "Unit": "pg/mg",
        "Range": "Negative"
      },
      {
        "Analyte": "PCP",
        "Unit": "pg/mg",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "OCC-001",
    "Test_Name": "Lead (Blood)",
    "Department": "Toxicology",
    "Sub_Department": "Occupational",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 55000,
    "Components": [
      {
        "Analyte": "Lead",
        "Unit": "ug/dL",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "OCC-002",
    "Test_Name": "Mercury (Urine)",
    "Department": "Toxicology",
    "Sub_Department": "Occupational",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Mercury",
        "Unit": "ug/L",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "OCC-003",
    "Test_Name": "Arsenic (Urine)",
    "Department": "Toxicology",
    "Sub_Department": "Occupational",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Arsenic",
        "Unit": "ug/L",
        "Range": "< 50"
      }
    ]
  },
  {
    "Test_Code": "OCC-004",
    "Test_Name": "Cadmium (Urine)",
    "Department": "Toxicology",
    "Sub_Department": "Occupational",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Cadmium",
        "Unit": "ug/L",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "OCC-005",
    "Test_Name": "Cholinesterase (RBC)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Occupational",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Cholinesterase",
        "Unit": "U/mL",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "SPT-001",
    "Test_Name": "Erythropoietin (EPO)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Sports",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 150000,
    "Components": [
      {
        "Analyte": "EPO",
        "Unit": "mIU/mL",
        "Range": "2.6 - 18.5"
      }
    ]
  },
  {
    "Test_Code": "SPT-002",
    "Test_Name": "Testosterone/Epitestosterone Ratio",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Sports",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "T/E Ratio",
        "Unit": "Ratio",
        "Range": "< 4"
      }
    ]
  },
  {
    "Test_Code": "SPT-003",
    "Test_Name": "Growth Hormone (hGH) Isoform Test",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Sports",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "hGH",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "VET-001",
    "Test_Name": "Canine CBC",
    "Department": "Veterinary",
    "Sub_Department": "Hematology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 8,
    "Specimen_Type": "EDTA Blood",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "WBC",
        "Unit": "x10^3/uL",
        "Range": "6 - 17"
      },
      {
        "Analyte": "RBC",
        "Unit": "x10^6/uL",
        "Range": "5.5 - 8.5"
      },
      {
        "Analyte": "Hb",
        "Unit": "g/dL",
        "Range": "12 - 18"
      },
      {
        "Analyte": "HCT",
        "Unit": "%",
        "Range": "37 - 55"
      },
      {
        "Analyte": "Platelets",
        "Unit": "x10^3/uL",
        "Range": "200 - 500"
      },
      {
        "Analyte": "Neutrophils",
        "Unit": "%",
        "Range": "60 - 77"
      },
      {
        "Analyte": "Lymphocytes",
        "Unit": "%",
        "Range": "12 - 30"
      },
      {
        "Analyte": "Monocytes",
        "Unit": "%",
        "Range": "3 - 10"
      }
    ]
  },
  {
    "Test_Code": "VET-002",
    "Test_Name": "Feline CBC",
    "Department": "Veterinary",
    "Sub_Department": "Hematology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 8,
    "Specimen_Type": "EDTA Blood",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "WBC",
        "Unit": "x10^3/uL",
        "Range": "5.5 - 19.5"
      },
      {
        "Analyte": "RBC",
        "Unit": "x10^6/uL",
        "Range": "5 - 10"
      },
      {
        "Analyte": "Hb",
        "Unit": "g/dL",
        "Range": "8 - 15"
      },
      {
        "Analyte": "HCT",
        "Unit": "%",
        "Range": "24 - 45"
      },
      {
        "Analyte": "Platelets",
        "Unit": "x10^3/uL",
        "Range": "300 - 700"
      },
      {
        "Analyte": "Neutrophils",
        "Unit": "%",
        "Range": "35 - 75"
      },
      {
        "Analyte": "Lymphocytes",
        "Unit": "%",
        "Range": "20 - 55"
      },
      {
        "Analyte": "Monocytes",
        "Unit": "%",
        "Range": "1 - 4"
      }
    ]
  },
  {
    "Test_Code": "VET-003",
    "Test_Name": "Canine Heartworm Antigen",
    "Department": "Veterinary",
    "Sub_Department": "Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "Heartworm",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VET-004",
    "Test_Name": "Feline Leukemia Virus (FeLV)",
    "Department": "Veterinary",
    "Sub_Department": "Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "FeLV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "VET-005",
    "Test_Name": "Feline Immunodeficiency Virus (FIV)",
    "Department": "Veterinary",
    "Sub_Department": "Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "FIV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "ENV-001",
    "Test_Name": "Water Bacteriological Analysis",
    "Department": "Environmental",
    "Sub_Department": "Water Quality",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Water",
    "Price": 80000,
    "Components": [
      {
        "Analyte": "Total Coliform",
        "Unit": "CFU/100mL",
        "Range": "0"
      },
      {
        "Analyte": "E. coli",
        "Unit": "CFU/100mL",
        "Range": "0"
      },
      {
        "Analyte": "Heterotrophic Plate",
        "Unit": "CFU/mL",
        "Range": "< 500"
      }
    ]
  },
  {
    "Test_Code": "ENV-002",
    "Test_Name": "Water Chemical Analysis",
    "Department": "Environmental",
    "Sub_Department": "Water Quality",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Water",
    "Price": 120000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "6.5 - 8.5"
      },
      {
        "Analyte": "Turbidity",
        "Unit": "NTU",
        "Range": "< 5"
      },
      {
        "Analyte": "Chlorine",
        "Unit": "mg/L",
        "Range": "0.2 - 2"
      },
      {
        "Analyte": "Nitrate",
        "Unit": "mg/L",
        "Range": "< 10"
      },
      {
        "Analyte": "Fluoride",
        "Unit": "mg/L",
        "Range": "0.5 - 1.5"
      }
    ]
  },
  {
    "Test_Code": "ENV-003",
    "Test_Name": "Food Microbiological Analysis",
    "Department": "Environmental",
    "Sub_Department": "Food Safety",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Food Sample",
    "Price": 100000,
    "Components": [
      {
        "Analyte": "Total Plate Count",
        "Unit": "CFU/g",
        "Range": "< 10^5"
      },
      {
        "Analyte": "Coliforms",
        "Unit": "CFU/g",
        "Range": "< 10"
      },
      {
        "Analyte": "E. coli",
        "Unit": "CFU/g",
        "Range": "0"
      },
      {
        "Analyte": "Salmonella",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "ENV-004",
    "Test_Name": "Milk Quality Analysis",
    "Department": "Environmental",
    "Sub_Department": "Food Safety",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Milk",
    "Price": 60000,
    "Components": [
      {
        "Analyte": "Fat",
        "Unit": "%",
        "Range": "> 3"
      },
      {
        "Analyte": "Protein",
        "Unit": "%",
        "Range": "> 3"
      },
      {
        "Analyte": "Lactose",
        "Unit": "%",
        "Range": "> 4"
      },
      {
        "Analyte": "SNF",
        "Unit": "%",
        "Range": "> 8"
      },
      {
        "Analyte": "Adulteration",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "RES-001",
    "Test_Name": "Cytokine Panel (6-plex)",
    "Department": "Research",
    "Sub_Department": "Immunology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 6,
    "Specimen_Type": "Serum/Plasma",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "IL-1β",
        "Unit": "pg/mL",
        "Range": "< 5"
      },
      {
        "Analyte": "IL-6",
        "Unit": "pg/mL",
        "Range": "< 5"
      },
      {
        "Analyte": "IL-8",
        "Unit": "pg/mL",
        "Range": "< 10"
      },
      {
        "Analyte": "IL-10",
        "Unit": "pg/mL",
        "Range": "< 5"
      },
      {
        "Analyte": "TNF-α",
        "Unit": "pg/mL",
        "Range": "< 8"
      },
      {
        "Analyte": "IFN-γ",
        "Unit": "pg/mL",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "RES-002",
    "Test_Name": "Chemokine Panel",
    "Department": "Research",
    "Sub_Department": "Immunology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Serum/Plasma",
    "Price": 200000,
    "Components": [
      {
        "Analyte": "CCL2/MCP-1",
        "Unit": "pg/mL",
        "Range": "< 50"
      },
      {
        "Analyte": "CCL5/RANTES",
        "Unit": "pg/mL",
        "Range": "< 100"
      },
      {
        "Analyte": "CXCL8/IL-8",
        "Unit": "pg/mL",
        "Range": "< 10"
      },
      {
        "Analyte": "CXCL10/IP-10",
        "Unit": "pg/mL",
        "Range": "< 50"
      }
    ]
  },
  {
    "Test_Code": "RES-003",
    "Test_Name": "Growth Factor Panel",
    "Department": "Research",
    "Sub_Department": "Cell Biology",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Serum/Plasma",
    "Price": 220000,
    "Components": [
      {
        "Analyte": "VEGF",
        "Unit": "pg/mL",
        "Range": "< 100"
      },
      {
        "Analyte": "EGF",
        "Unit": "pg/mL",
        "Range": "< 50"
      },
      {
        "Analyte": "FGF",
        "Unit": "pg/mL",
        "Range": "< 20"
      },
      {
        "Analyte": "PDGF",
        "Unit": "pg/mL",
        "Range": "< 50"
      }
    ]
  },
  {
    "Test_Code": "RES-004",
    "Test_Name": "Adipokine Panel",
    "Department": "Research",
    "Sub_Department": "Metabolism",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Serum/Plasma",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "Adiponectin",
        "Unit": "ug/mL",
        "Range": "5 - 30"
      },
      {
        "Analyte": "Leptin",
        "Unit": "ng/mL",
        "Range": "2 - 20"
      },
      {
        "Analyte": "Resistin",
        "Unit": "ng/mL",
        "Range": "5 - 50"
      }
    ]
  },
  {
    "Test_Code": "RES-005",
    "Test_Name": "Oxidative Stress Panel",
    "Department": "Research",
    "Sub_Department": "Biochemistry",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Serum/Plasma",
    "Price": 160000,
    "Components": [
      {
        "Analyte": "MDA",
        "Unit": "nmol/mL",
        "Range": "< 2"
      },
      {
        "Analyte": "SOD",
        "Unit": "U/mL",
        "Range": "Normal"
      },
      {
        "Analyte": "GPx",
        "Unit": "U/mL",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "EMG-001",
    "Test_Name": "Mpox (Monkeypox) PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Lesion Swab",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "Mpox DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "EMG-002",
    "Test_Name": "Ebola Virus PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "Ebola RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "EMG-003",
    "Test_Name": "Marburg Virus PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "Marburg RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "EMG-004",
    "Test_Name": "Lassa Fever PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 220000,
    "Components": [
      {
        "Analyte": "Lassa RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "EMG-005",
    "Test_Name": "Rift Valley Fever IgM",
    "Department": "Immunology & Serology",
    "Sub_Department": "Viral Serology",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 70000,
    "Components": [
      {
        "Analyte": "RVF IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "EMG-006",
    "Test_Name": "Crimean-Congo Hemorrhagic Fever (CCHF) PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 240000,
    "Components": [
      {
        "Analyte": "CCHF RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "EMG-007",
    "Test_Name": "Nipah Virus PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Throat Swab/CSF",
    "Price": 260000,
    "Components": [
      {
        "Analyte": "Nipah RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "EMG-008",
    "Test_Name": "Hendra Virus PCR",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "PCR",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Throat Swab/CSF",
    "Price": 260000,
    "Components": [
      {
        "Analyte": "Hendra RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "NUT-011",
    "Test_Name": "Prealbumin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Nutritional Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Prealbumin",
        "Unit": "mg/dL",
        "Range": "20 - 40"
      }
    ]
  },
  {
    "Test_Code": "NUT-012",
    "Test_Name": "Transferrin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Nutritional Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "Transferrin",
        "Unit": "mg/dL",
        "Range": "200 - 360"
      }
    ]
  },
  {
    "Test_Code": "NUT-013",
    "Test_Name": "Retinol Binding Protein",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Nutritional Markers",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "RBP",
        "Unit": "mg/dL",
        "Range": "3 - 6"
      }
    ]
  },
  {
    "Test_Code": "AGE-001",
    "Test_Name": "Telomere Length",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Aging",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 400000,
    "Components": [
      {
        "Analyte": "Telomere",
        "Unit": "kb",
        "Range": "Age-dependent"
      }
    ]
  },
  {
    "Test_Code": "AGE-002",
    "Test_Name": "Epigenetic Age (DNA Methylation)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Aging",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood",
    "Price": 500000,
    "Components": [
      {
        "Analyte": "Epigenetic Age",
        "Unit": "Years",
        "Range": "Chronological"
      }
    ]
  },
  {
    "Test_Code": "STM-010",
    "Test_Name": "CD34+ Stem Cell Count",
    "Department": "Immunology & Serology",
    "Sub_Department": "Flow Cytometry",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "EDTA Blood/Bone Marrow",
    "Price": 180000,
    "Components": [
      {
        "Analyte": "CD34+",
        "Unit": "cells/uL",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "STM-011",
    "Test_Name": "Mesenchymal Stem Cell Markers",
    "Department": "Immunology & Serology",
    "Sub_Department": "Flow Cytometry",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 4,
    "Specimen_Type": "Bone Marrow",
    "Price": 220000,
    "Components": [
      {
        "Analyte": "CD73",
        "Unit": "%",
        "Range": "> 95"
      },
      {
        "Analyte": "CD90",
        "Unit": "%",
        "Range": "> 95"
      },
      {
        "Analyte": "CD105",
        "Unit": "%",
        "Range": "> 95"
      },
      {
        "Analyte": "CD45",
        "Unit": "%",
        "Range": "< 2"
      }
    ]
  },
  {
    "Test_Code": "EXO-001",
    "Test_Name": "Exosome Isolation & Characterization",
    "Department": "Research",
    "Sub_Department": "Liquid Biopsy",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Plasma/Serum",
    "Price": 350000,
    "Components": [
      {
        "Analyte": "Exosome Count",
        "Unit": "particles/mL",
        "Range": "Variable"
      },
      {
        "Analyte": "CD63",
        "Unit": "Qualitative",
        "Range": "Positive"
      },
      {
        "Analyte": "CD81",
        "Unit": "Qualitative",
        "Range": "Positive"
      }
    ]
  },
  {
    "Test_Code": "EXO-002",
    "Test_Name": "Circulating Tumor DNA (ctDNA)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Liquid Biopsy",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Plasma",
    "Price": 400000,
    "Components": [
      {
        "Analyte": "ctDNA",
        "Unit": "ng/mL",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "EXO-003",
    "Test_Name": "Circulating Tumor Cells (CTC)",
    "Department": "Immunology & Serology",
    "Sub_Department": "Liquid Biopsy",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Blood",
    "Price": 450000,
    "Components": [
      {
        "Analyte": "CTC",
        "Unit": "cells/mL",
        "Range": "0"
      }
    ]
  },
  {
    "Test_Code": "MIC-011",
    "Test_Name": "Gut Microbiome Analysis (16S rRNA)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Microbiome",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 350000,
    "Components": [
      {
        "Analyte": "Microbiome",
        "Unit": "Composition",
        "Range": "Diverse"
      }
    ]
  },
  {
    "Test_Code": "MIC-012",
    "Test_Name": "Gut Microbiome Analysis (Shotgun)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Microbiome",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 500000,
    "Components": [
      {
        "Analyte": "Microbiome",
        "Unit": "Species",
        "Range": "Complete"
      }
    ]
  },
  {
    "Test_Code": "MIC-013",
    "Test_Name": "Oral Microbiome Analysis",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Microbiome",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Oral Swab",
    "Price": 300000,
    "Components": [
      {
        "Analyte": "Oral Microbiome",
        "Unit": "Composition",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "MIC-014",
    "Test_Name": "Skin Microbiome Analysis",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "Microbiome",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Skin Swab",
    "Price": 300000,
    "Components": [
      {
        "Analyte": "Skin Microbiome",
        "Unit": "Composition",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "MET-001",
    "Test_Name": "Amino Acid Profile",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Metabolomics",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 20,
    "Specimen_Type": "Plasma",
    "Price": 280000,
    "Components": [
      {
        "Analyte": "Essential AAs",
        "Unit": "umol/L",
        "Range": "Normal"
      },
      {
        "Analyte": "Non-essential AAs",
        "Unit": "umol/L",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "MET-002",
    "Test_Name": "Organic Acids Profile",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Metabolomics",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 30,
    "Specimen_Type": "Urine",
    "Price": 320000,
    "Components": [
      {
        "Analyte": "Organic Acids",
        "Unit": "mmol/mol",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "MET-003",
    "Test_Name": "Fatty Acid Profile",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Metabolomics",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 15,
    "Specimen_Type": "Plasma",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "Omega-3",
        "Unit": "%",
        "Range": "> 4"
      },
      {
        "Analyte": "Omega-6",
        "Unit": "%",
        "Range": "< 10"
      },
      {
        "Analyte": "Saturated",
        "Unit": "%",
        "Range": "< 40"
      }
    ]
  },
  {
    "Test_Code": "PRO-001",
    "Test_Name": "Protein Electrophoresis (SPEP)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Proteomics",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Serum",
    "Price": 65000,
    "Components": [
      {
        "Analyte": "Albumin",
        "Unit": "%",
        "Range": "55 - 65"
      },
      {
        "Analyte": "Alpha-1",
        "Unit": "%",
        "Range": "2 - 5"
      },
      {
        "Analyte": "Alpha-2",
        "Unit": "%",
        "Range": "7 - 13"
      },
      {
        "Analyte": "Beta",
        "Unit": "%",
        "Range": "8 - 14"
      },
      {
        "Analyte": "Gamma",
        "Unit": "%",
        "Range": "12 - 22"
      }
    ]
  },
  {
    "Test_Code": "PRO-002",
    "Test_Name": "Immunofixation Electrophoresis",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Proteomics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum/Urine",
    "Price": 90000,
    "Components": [
      {
        "Analyte": "Monoclonal Protein",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "PRO-003",
    "Test_Name": "Free Light Chains (Kappa/Lambda)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Proteomics",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Serum",
    "Price": 110000,
    "Components": [
      {
        "Analyte": "Kappa",
        "Unit": "mg/L",
        "Range": "3 - 19"
      },
      {
        "Analyte": "Lambda",
        "Unit": "mg/L",
        "Range": "5 - 26"
      },
      {
        "Analyte": "K/L Ratio",
        "Unit": "Ratio",
        "Range": "0.26 - 1.65"
      }
    ]
  },
  {
    "Test_Code": "LIP-001",
    "Test_Name": "Lipidomics Profile",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Lipidomics",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 10,
    "Specimen_Type": "Plasma",
    "Price": 300000,
    "Components": [
      {
        "Analyte": "Phospholipids",
        "Unit": "%",
        "Range": "Normal"
      },
      {
        "Analyte": "Sphingolipids",
        "Unit": "%",
        "Range": "Normal"
      },
      {
        "Analyte": "Glycerolipids",
        "Unit": "%",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "GLY-001",
    "Test_Name": "HbA1c (Point of Care)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Glycomics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "HbA1c",
        "Unit": "%",
        "Range": "< 5.7"
      }
    ]
  },
  {
    "Test_Code": "GLY-002",
    "Test_Name": "Glycated Albumin",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Glycomics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 45000,
    "Components": [
      {
        "Analyte": "Glycated Albumin",
        "Unit": "%",
        "Range": "11 - 16"
      }
    ]
  },
  {
    "Test_Code": "GLY-003",
    "Test_Name": "1,5-Anhydroglucitol",
    "Department": "Clinical Chemistry",
    "Sub_Department": "Glycomics",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "1,5-AG",
        "Unit": "ug/mL",
        "Range": "> 10"
      }
    ]
  },
  {
    "Test_Code": "POC-001",
    "Test_Name": "Blood Glucose (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Glucose",
        "Unit": "mg/dL",
        "Range": "70 - 100"
      }
    ]
  },
  {
    "Test_Code": "POC-002",
    "Test_Name": "Blood Ketones (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Ketones",
        "Unit": "mmol/L",
        "Range": "< 0.6"
      }
    ]
  },
  {
    "Test_Code": "POC-003",
    "Test_Name": "Blood Lactate (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Lactate",
        "Unit": "mmol/L",
        "Range": "0.5 - 2.0"
      }
    ]
  },
  {
    "Test_Code": "POC-004",
    "Test_Name": "Blood Gas (ABG)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 7,
    "Specimen_Type": "Arterial Blood",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "7.35 - 7.45"
      },
      {
        "Analyte": "pCO2",
        "Unit": "mmHg",
        "Range": "35 - 45"
      },
      {
        "Analyte": "pO2",
        "Unit": "mmHg",
        "Range": "80 - 100"
      },
      {
        "Analyte": "HCO3",
        "Unit": "mmol/L",
        "Range": "22 - 26"
      },
      {
        "Analyte": "Base Excess",
        "Unit": "mmol/L",
        "Range": "-2 to +2"
      },
      {
        "Analyte": "O2 Saturation",
        "Unit": "%",
        "Range": "95 - 100"
      },
      {
        "Analyte": "Lactate",
        "Unit": "mmol/L",
        "Range": "0.5 - 2.0"
      }
    ]
  },
  {
    "Test_Code": "POC-005",
    "Test_Name": "Venous Blood Gas (VBG)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Venous Blood",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "7.32 - 7.43"
      },
      {
        "Analyte": "pCO2",
        "Unit": "mmHg",
        "Range": "41 - 51"
      },
      {
        "Analyte": "HCO3",
        "Unit": "mmol/L",
        "Range": "22 - 29"
      },
      {
        "Analyte": "Base Excess",
        "Unit": "mmol/L",
        "Range": "-2 to +2"
      },
      {
        "Analyte": "Lactate",
        "Unit": "mmol/L",
        "Range": "0.5 - 2.0"
      }
    ]
  },
  {
    "Test_Code": "POC-006",
    "Test_Name": "Capillary Blood Gas (CBG)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 5,
    "Specimen_Type": "Capillary Blood",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "7.35 - 7.45"
      },
      {
        "Analyte": "pCO2",
        "Unit": "mmHg",
        "Range": "35 - 45"
      },
      {
        "Analyte": "HCO3",
        "Unit": "mmol/L",
        "Range": "22 - 26"
      },
      {
        "Analyte": "Base Excess",
        "Unit": "mmol/L",
        "Range": "-2 to +2"
      },
      {
        "Analyte": "Lactate",
        "Unit": "mmol/L",
        "Range": "0.5 - 2.0"
      }
    ]
  },
  {
    "Test_Code": "POC-007",
    "Test_Name": "INR (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "INR",
        "Unit": "Ratio",
        "Range": "0.8 - 1.2"
      }
    ]
  },
  {
    "Test_Code": "POC-008",
    "Test_Name": "D-Dimer (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "D-Dimer",
        "Unit": "ug/mL",
        "Range": "< 0.5"
      }
    ]
  },
  {
    "Test_Code": "POC-009",
    "Test_Name": "Troponin I (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "Troponin I",
        "Unit": "ng/mL",
        "Range": "< 0.04"
      }
    ]
  },
  {
    "Test_Code": "POC-010",
    "Test_Name": "BNP (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "BNP",
        "Unit": "pg/mL",
        "Range": "< 100"
      }
    ]
  },
  {
    "Test_Code": "POC-011",
    "Test_Name": "Malaria RDT (POCT)",
    "Department": "Parasitology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Malaria",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-012",
    "Test_Name": "HIV Rapid (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Fingerstick Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "HIV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-013",
    "Test_Name": "HCV Rapid (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Fingerstick Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "HCV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-014",
    "Test_Name": "HBsAg Rapid (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Fingerstick Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "HBsAg",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-015",
    "Test_Name": "Syphilis Rapid (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Fingerstick Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Syphilis",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-016",
    "Test_Name": "Urine Dipstick (POCT)",
    "Department": "Parasitology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 10,
    "Specimen_Type": "Urine",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "5 - 7.5"
      },
      {
        "Analyte": "Protein",
        "Unit": "Qual",
        "Range": "Negative"
      },
      {
        "Analyte": "Glucose",
        "Unit": "Qual",
        "Range": "Negative"
      },
      {
        "Analyte": "Ketones",
        "Unit": "Qual",
        "Range": "Negative"
      },
      {
        "Analyte": "Bilirubin",
        "Unit": "Qual",
        "Range": "Negative"
      },
      {
        "Analyte": "Urobilinogen",
        "Unit": "Qual",
        "Range": "Normal"
      },
      {
        "Analyte": "Nitrite",
        "Unit": "Qual",
        "Range": "Negative"
      },
      {
        "Analyte": "Leukocytes",
        "Unit": "Qual",
        "Range": "Negative"
      },
      {
        "Analyte": "Blood",
        "Unit": "Qual",
        "Range": "Negative"
      },
      {
        "Analyte": "Specific Gravity",
        "Unit": "SG",
        "Range": "1.005 - 1.030"
      }
    ]
  },
  {
    "Test_Code": "POC-017",
    "Test_Name": "Urine Pregnancy (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "hCG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-018",
    "Test_Name": "Stool Occult Blood (POCT)",
    "Department": "Parasitology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Occult Blood",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-019",
    "Test_Name": "Stool Rotavirus (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Rotavirus",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-020",
    "Test_Name": "Stool Adenovirus (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Adenovirus",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-021",
    "Test_Name": "Strep A Rapid (POCT)",
    "Department": "Microbiology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Throat Swab",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Strep A",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-022",
    "Test_Name": "Influenza A/B (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "Nasal Swab",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Influenza A",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Influenza B",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-023",
    "Test_Name": "COVID-19 Antigen (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasal Swab",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "SARS-CoV-2 Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-024",
    "Test_Name": "RSV (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasal Swab",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "RSV",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-025",
    "Test_Name": "COVID-19 PCR (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasal Swab",
    "Price": 40000,
    "Components": [
      {
        "Analyte": "SARS-CoV-2 RNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "POC-026",
    "Test_Name": "Flu A/B + COVID (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 3,
    "Specimen_Type": "Nasal Swab",
    "Price": 50000,
    "Components": [
      {
        "Analyte": "Influenza A",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      },
      {
        "Analyte": "Influenza B",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      },
      {
        "Analyte": "SARS-CoV-2",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "POC-027",
    "Test_Name": "MRSA PCR (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Nasal Swab",
    "Price": 30000,
    "Components": [
      {
        "Analyte": "MRSA DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "POC-028",
    "Test_Name": "C. difficile PCR (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Stool",
    "Price": 35000,
    "Components": [
      {
        "Analyte": "C. difficile DNA",
        "Unit": "Qualitative",
        "Range": "Not Detected"
      }
    ]
  },
  {
    "Test_Code": "POC-029",
    "Test_Name": "Hemoglobin (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Hemoglobin",
        "Unit": "g/dL",
        "Range": "12 - 17"
      }
    ]
  },
  {
    "Test_Code": "POC-030",
    "Test_Name": "Hematocrit (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Hematocrit",
        "Unit": "%",
        "Range": "36 - 52"
      }
    ]
  },
  {
    "Test_Code": "POC-031",
    "Test_Name": "WBC Count (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "WBC",
        "Unit": "x10^3/uL",
        "Range": "4 - 11"
      }
    ]
  },
  {
    "Test_Code": "POC-032",
    "Test_Name": "Platelet Count (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Platelets",
        "Unit": "x10^3/uL",
        "Range": "150 - 450"
      }
    ]
  },
  {
    "Test_Code": "POC-033",
    "Test_Name": "Sodium (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 6000,
    "Components": [
      {
        "Analyte": "Sodium",
        "Unit": "mmol/L",
        "Range": "135 - 145"
      }
    ]
  },
  {
    "Test_Code": "POC-034",
    "Test_Name": "Potassium (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 6000,
    "Components": [
      {
        "Analyte": "Potassium",
        "Unit": "mmol/L",
        "Range": "3.5 - 5.1"
      }
    ]
  },
  {
    "Test_Code": "POC-035",
    "Test_Name": "Chloride (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 6000,
    "Components": [
      {
        "Analyte": "Chloride",
        "Unit": "mmol/L",
        "Range": "98 - 107"
      }
    ]
  },
  {
    "Test_Code": "POC-036",
    "Test_Name": "Ionized Calcium (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "iCa",
        "Unit": "mmol/L",
        "Range": "1.12 - 1.32"
      }
    ]
  },
  {
    "Test_Code": "POC-037",
    "Test_Name": "Magnesium (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Magnesium",
        "Unit": "mmol/L",
        "Range": "0.7 - 1.0"
      }
    ]
  },
  {
    "Test_Code": "POC-038",
    "Test_Name": "Bilirubin (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Bilirubin",
        "Unit": "mg/dL",
        "Range": "0.2 - 1.2"
      }
    ]
  },
  {
    "Test_Code": "POC-039",
    "Test_Name": "ALT (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "ALT",
        "Unit": "U/L",
        "Range": "5 - 45"
      }
    ]
  },
  {
    "Test_Code": "POC-040",
    "Test_Name": "AST (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "AST",
        "Unit": "U/L",
        "Range": "5 - 40"
      }
    ]
  },
  {
    "Test_Code": "POC-041",
    "Test_Name": "ALP (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "ALP",
        "Unit": "U/L",
        "Range": "40 - 130"
      }
    ]
  },
  {
    "Test_Code": "POC-042",
    "Test_Name": "GGT (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "GGT",
        "Unit": "U/L",
        "Range": "10 - 60"
      }
    ]
  },
  {
    "Test_Code": "POC-043",
    "Test_Name": "Albumin (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Albumin",
        "Unit": "g/dL",
        "Range": "3.5 - 5.0"
      }
    ]
  },
  {
    "Test_Code": "POC-044",
    "Test_Name": "Total Protein (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Total Protein",
        "Unit": "g/dL",
        "Range": "6.4 - 8.3"
      }
    ]
  },
  {
    "Test_Code": "POC-045",
    "Test_Name": "Creatinine (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Creatinine",
        "Unit": "mg/dL",
        "Range": "0.6 - 1.2"
      }
    ]
  },
  {
    "Test_Code": "POC-046",
    "Test_Name": "BUN (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "BUN",
        "Unit": "mg/dL",
        "Range": "15 - 45"
      }
    ]
  },
  {
    "Test_Code": "POC-047",
    "Test_Name": "Uric Acid (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Uric Acid",
        "Unit": "mg/dL",
        "Range": "3.5 - 7.2"
      }
    ]
  },
  {
    "Test_Code": "POC-048",
    "Test_Name": "Total Cholesterol (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Cholesterol",
        "Unit": "mg/dL",
        "Range": "< 200"
      }
    ]
  },
  {
    "Test_Code": "POC-049",
    "Test_Name": "HDL (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "HDL",
        "Unit": "mg/dL",
        "Range": "> 40"
      }
    ]
  },
  {
    "Test_Code": "POC-050",
    "Test_Name": "Triglycerides (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Triglycerides",
        "Unit": "mg/dL",
        "Range": "< 150"
      }
    ]
  },
  {
    "Test_Code": "POC-051",
    "Test_Name": "LDL (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Calculated",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "LDL",
        "Unit": "mg/dL",
        "Range": "< 100"
      }
    ]
  },
  {
    "Test_Code": "POC-052",
    "Test_Name": "Glucose (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Glucose",
        "Unit": "mg/dL",
        "Range": "70 - 100"
      }
    ]
  },
  {
    "Test_Code": "POC-053",
    "Test_Name": "HbA1c (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "HbA1c",
        "Unit": "%",
        "Range": "< 5.7"
      }
    ]
  },
  {
    "Test_Code": "POC-054",
    "Test_Name": "TSH (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "TSH",
        "Unit": "uIU/mL",
        "Range": "0.45 - 4.5"
      }
    ]
  },
  {
    "Test_Code": "POC-055",
    "Test_Name": "Free T4 (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Free T4",
        "Unit": "ng/dL",
        "Range": "0.8 - 1.8"
      }
    ]
  },
  {
    "Test_Code": "POC-056",
    "Test_Name": "Free T3 (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Free T3",
        "Unit": "pg/mL",
        "Range": "2.0 - 4.4"
      }
    ]
  },
  {
    "Test_Code": "POC-057",
    "Test_Name": "CK-MB (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "CK-MB",
        "Unit": "ng/mL",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-058",
    "Test_Name": "Myoglobin (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Myoglobin",
        "Unit": "ng/mL",
        "Range": "< 90"
      }
    ]
  },
  {
    "Test_Code": "POC-059",
    "Test_Name": "D-Dimer (POCT) - High Sensitivity",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "D-Dimer",
        "Unit": "ng/mL",
        "Range": "< 500"
      }
    ]
  },
  {
    "Test_Code": "POC-060",
    "Test_Name": "CRP (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Capillary Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "CRP",
        "Unit": "mg/L",
        "Range": "< 6"
      }
    ]
  },
  {
    "Test_Code": "POC-061",
    "Test_Name": "Procalcitonin (POCT)",
    "Department": "Clinical Chemistry",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Procalcitonin",
        "Unit": "ng/mL",
        "Range": "< 0.5"
      }
    ]
  },
  {
    "Test_Code": "POC-062",
    "Test_Name": "LH Surge (Ovulation Test)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "LH",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-063",
    "Test_Name": "FSH (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "FSH",
        "Unit": "Qualitative",
        "Range": "Normal"
      }
    ]
  },
  {
    "Test_Code": "POC-064",
    "Test_Name": "TB LAM Ag (Urine)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "TB LAM",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-065",
    "Test_Name": "Cryptococcal Antigen (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Serum/Plasma",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "CRAG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-066",
    "Test_Name": "Histoplasma Antigen (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Histoplasma Ag",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-067",
    "Test_Name": "Reticulocyte Count (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Reticulocytes",
        "Unit": "%",
        "Range": "0.5 - 2.5"
      }
    ]
  },
  {
    "Test_Code": "POC-068",
    "Test_Name": "ESR (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "ESR",
        "Unit": "mm/hr",
        "Range": "0 - 15"
      }
    ]
  },
  {
    "Test_Code": "POC-069",
    "Test_Name": "PT (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "PT",
        "Unit": "Seconds",
        "Range": "11 - 13"
      }
    ]
  },
  {
    "Test_Code": "POC-070",
    "Test_Name": "APTT (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "APTT",
        "Unit": "Seconds",
        "Range": "25 - 35"
      }
    ]
  },
  {
    "Test_Code": "POC-071",
    "Test_Name": "Fibrinogen (POCT)",
    "Department": "Hematology & Coagulation",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Fibrinogen",
        "Unit": "mg/dL",
        "Range": "200 - 400"
      }
    ]
  },
  {
    "Test_Code": "POC-072",
    "Test_Name": "Dengue NS1 (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Dengue NS1",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-073",
    "Test_Name": "Dengue IgM/IgG (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "MULTI_COMPONENT",
    "Component_Count": 2,
    "Specimen_Type": "Whole Blood",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "Dengue IgM",
        "Unit": "Qualitative",
        "Range": "Negative"
      },
      {
        "Analyte": "Dengue IgG",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-074",
    "Test_Name": "Chikungunya (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Chikungunya",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-075",
    "Test_Name": "Zika (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "Zika",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-076",
    "Test_Name": "PSA (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "PSA",
        "Unit": "ng/mL",
        "Range": "< 4"
      }
    ]
  },
  {
    "Test_Code": "POC-077",
    "Test_Name": "AFP (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "AFP",
        "Unit": "ng/mL",
        "Range": "< 10"
      }
    ]
  },
  {
    "Test_Code": "POC-078",
    "Test_Name": "CEA (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "CEA",
        "Unit": "ng/mL",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-079",
    "Test_Name": "CA-125 (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "CA-125",
        "Unit": "U/mL",
        "Range": "< 35"
      }
    ]
  },
  {
    "Test_Code": "POC-080",
    "Test_Name": "RF (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "RF",
        "Unit": "IU/mL",
        "Range": "< 14"
      }
    ]
  },
  {
    "Test_Code": "POC-081",
    "Test_Name": "Anti-CCP (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Anti-CCP",
        "Unit": "U/mL",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "POC-082",
    "Test_Name": "ANA (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "ANA",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-083",
    "Test_Name": "Anti-dsDNA (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Anti-dsDNA",
        "Unit": "IU/mL",
        "Range": "< 25"
      }
    ]
  },
  {
    "Test_Code": "POC-084",
    "Test_Name": "Total IgE (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Total IgE",
        "Unit": "IU/mL",
        "Range": "< 100"
      }
    ]
  },
  {
    "Test_Code": "POC-085",
    "Test_Name": "Specific IgE (POCT)",
    "Department": "Immunology & Serology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Whole Blood",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Specific IgE",
        "Unit": "kU/L",
        "Range": "< 0.35"
      }
    ]
  },
  {
    "Test_Code": "POC-086",
    "Test_Name": "Salbutamol (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Salbutamol",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-087",
    "Test_Name": "Morphine (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Morphine",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-088",
    "Test_Name": "Cocaine (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Cocaine",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-089",
    "Test_Name": "Amphetamine (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Amphetamine",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-090",
    "Test_Name": "Cannabinoids (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "THC",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-091",
    "Test_Name": "Benzodiazepines (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Benzodiazepines",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-092",
    "Test_Name": "Barbiturates (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Barbiturates",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-093",
    "Test_Name": "Phencyclidine (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "PCP",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-094",
    "Test_Name": "Methadone (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Methadone",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-095",
    "Test_Name": "Propoxyphene (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Propoxyphene",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-096",
    "Test_Name": "Tricyclic Antidepressants (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "TCA",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-097",
    "Test_Name": "Oxycodone (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Oxycodone",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-098",
    "Test_Name": "Hydrocodone (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Hydrocodone",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-099",
    "Test_Name": "Fentanyl (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "Fentanyl",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-100",
    "Test_Name": "Buprenorphine (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Urine",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "Buprenorphine",
        "Unit": "ng/mL",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-101",
    "Test_Name": "Breath Alcohol (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Breath",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Alcohol",
        "Unit": "mg/L",
        "Range": "0"
      }
    ]
  },
  {
    "Test_Code": "POC-102",
    "Test_Name": "Saliva Alcohol (POCT)",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Saliva",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Alcohol",
        "Unit": "mg/L",
        "Range": "0"
      }
    ]
  },
  {
    "Test_Code": "POC-103",
    "Test_Name": "Sweat Alcohol Patch",
    "Department": "Toxicology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Sweat",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Alcohol",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-104",
    "Test_Name": "DNA Paternity Test (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Buccal Swab",
    "Price": 250000,
    "Components": [
      {
        "Analyte": "Paternity",
        "Unit": "Probability",
        "Range": "> 99.9"
      }
    ]
  },
  {
    "Test_Code": "POC-105",
    "Test_Name": "Ancestry DNA (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Saliva",
    "Price": 300000,
    "Components": [
      {
        "Analyte": "Ancestry",
        "Unit": "%",
        "Range": "Report"
      }
    ]
  },
  {
    "Test_Code": "POC-106",
    "Test_Name": "Pharmacogenomics (POCT)",
    "Department": "Molecular & Endocrinology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Buccal Swab",
    "Price": 350000,
    "Components": [
      {
        "Analyte": "PGx",
        "Unit": "Genotype",
        "Range": "Report"
      }
    ]
  },
  {
    "Test_Code": "POC-107",
    "Test_Name": "Wound pH (POCT)",
    "Department": "Microbiology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Wound",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "4 - 6"
      }
    ]
  },
  {
    "Test_Code": "POC-108",
    "Test_Name": "Wound Infection (POCT)",
    "Department": "Microbiology",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Wound Swab",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Infection",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-109",
    "Test_Name": "Radon (Home Test)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 20000,
    "Components": [
      {
        "Analyte": "Radon",
        "Unit": "pCi/L",
        "Range": "< 4"
      }
    ]
  },
  {
    "Test_Code": "POC-110",
    "Test_Name": "Carbon Monoxide (Home Test)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "CO",
        "Unit": "ppm",
        "Range": "< 9"
      }
    ]
  },
  {
    "Test_Code": "POC-111",
    "Test_Name": "Mold (Home Test)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air/Surface",
    "Price": 18000,
    "Components": [
      {
        "Analyte": "Mold",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-112",
    "Test_Name": "Lead (Home Test)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Surface",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Lead",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-113",
    "Test_Name": "Asbestos (Home Test)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Material",
    "Price": 25000,
    "Components": [
      {
        "Analyte": "Asbestos",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-114",
    "Test_Name": "Food Allergen (Peanut) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Peanut",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-115",
    "Test_Name": "Food Allergen (Gluten) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Gluten",
        "Unit": "ppm",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "POC-116",
    "Test_Name": "Food Allergen (Milk) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Milk",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-117",
    "Test_Name": "Food Allergen (Egg) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Egg",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-118",
    "Test_Name": "Food Allergen (Soy) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Soy",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-119",
    "Test_Name": "Food Allergen (Fish) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Fish",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-120",
    "Test_Name": "Food Allergen (Shellfish) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Shellfish",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-121",
    "Test_Name": "Food Allergen (Tree Nuts) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Tree Nuts",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-122",
    "Test_Name": "Food Allergen (Sesame) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Sesame",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-123",
    "Test_Name": "Food Allergen (Mustard) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Mustard",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-124",
    "Test_Name": "Food Allergen (Celery) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Celery",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-125",
    "Test_Name": "Food Allergen (Lupin) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Lupin",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-126",
    "Test_Name": "Food Allergen (Molluscs) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Molluscs",
        "Unit": "ppm",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-127",
    "Test_Name": "Food Allergen (Sulphites) - POCT",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 12000,
    "Components": [
      {
        "Analyte": "Sulphites",
        "Unit": "ppm",
        "Range": "< 10"
      }
    ]
  },
  {
    "Test_Code": "POC-128",
    "Test_Name": "Food Allergen (Gluten) - Quantitative",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Food",
    "Price": 15000,
    "Components": [
      {
        "Analyte": "Gluten",
        "Unit": "ppm",
        "Range": "< 20"
      }
    ]
  },
  {
    "Test_Code": "POC-129",
    "Test_Name": "Water pH (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "6.5 - 8.5"
      }
    ]
  },
  {
    "Test_Code": "POC-130",
    "Test_Name": "Water Chlorine (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Chlorine",
        "Unit": "mg/L",
        "Range": "0.2 - 2"
      }
    ]
  },
  {
    "Test_Code": "POC-131",
    "Test_Name": "Water Hardness (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Hardness",
        "Unit": "mg/L",
        "Range": "< 180"
      }
    ]
  },
  {
    "Test_Code": "POC-132",
    "Test_Name": "Water Nitrate (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Nitrate",
        "Unit": "mg/L",
        "Range": "< 10"
      }
    ]
  },
  {
    "Test_Code": "POC-133",
    "Test_Name": "Water Nitrite (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Nitrite",
        "Unit": "mg/L",
        "Range": "< 1"
      }
    ]
  },
  {
    "Test_Code": "POC-134",
    "Test_Name": "Water Fluoride (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Fluoride",
        "Unit": "mg/L",
        "Range": "0.5 - 1.5"
      }
    ]
  },
  {
    "Test_Code": "POC-135",
    "Test_Name": "Water Iron (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Iron",
        "Unit": "mg/L",
        "Range": "< 0.3"
      }
    ]
  },
  {
    "Test_Code": "POC-136",
    "Test_Name": "Water Copper (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Copper",
        "Unit": "mg/L",
        "Range": "< 1.3"
      }
    ]
  },
  {
    "Test_Code": "POC-137",
    "Test_Name": "Water Lead (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Lead",
        "Unit": "mg/L",
        "Range": "< 0.015"
      }
    ]
  },
  {
    "Test_Code": "POC-138",
    "Test_Name": "Water Arsenic (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Arsenic",
        "Unit": "mg/L",
        "Range": "< 0.01"
      }
    ]
  },
  {
    "Test_Code": "POC-139",
    "Test_Name": "Water Bacteria (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Bacteria",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-140",
    "Test_Name": "Water E. coli (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "E. coli",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-141",
    "Test_Name": "Water Coliforms (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Coliforms",
        "Unit": "Qualitative",
        "Range": "Negative"
      }
    ]
  },
  {
    "Test_Code": "POC-142",
    "Test_Name": "Water Total Plate Count (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "TPC",
        "Unit": "CFU/mL",
        "Range": "< 500"
      }
    ]
  },
  {
    "Test_Code": "POC-143",
    "Test_Name": "Water Turbidity (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Turbidity",
        "Unit": "NTU",
        "Range": "< 5"
      }
    ]
  },
  {
    "Test_Code": "POC-144",
    "Test_Name": "Water Dissolved Oxygen (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "DO",
        "Unit": "mg/L",
        "Range": "> 5"
      }
    ]
  },
  {
    "Test_Code": "POC-145",
    "Test_Name": "Water Conductivity (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Conductivity",
        "Unit": "uS/cm",
        "Range": "< 1500"
      }
    ]
  },
  {
    "Test_Code": "POC-146",
    "Test_Name": "Water TDS (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "TDS",
        "Unit": "mg/L",
        "Range": "< 1000"
      }
    ]
  },
  {
    "Test_Code": "POC-147",
    "Test_Name": "Water Temperature (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Temperature",
        "Unit": "°C",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "POC-148",
    "Test_Name": "Water ORP (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "ORP",
        "Unit": "mV",
        "Range": "> 650"
      }
    ]
  },
  {
    "Test_Code": "POC-149",
    "Test_Name": "Water Ammonia (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Ammonia",
        "Unit": "mg/L",
        "Range": "< 0.5"
      }
    ]
  },
  {
    "Test_Code": "POC-150",
    "Test_Name": "Water Phosphate (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Water",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Phosphate",
        "Unit": "mg/L",
        "Range": "< 0.1"
      }
    ]
  },
  {
    "Test_Code": "POC-151",
    "Test_Name": "Soil pH (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "pH",
        "Unit": "pH",
        "Range": "6 - 7"
      }
    ]
  },
  {
    "Test_Code": "POC-152",
    "Test_Name": "Soil Nitrogen (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Nitrogen",
        "Unit": "mg/kg",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "POC-153",
    "Test_Name": "Soil Phosphorus (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Phosphorus",
        "Unit": "mg/kg",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "POC-154",
    "Test_Name": "Soil Potassium (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Potassium",
        "Unit": "mg/kg",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "POC-155",
    "Test_Name": "Soil Organic Matter (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Organic Matter",
        "Unit": "%",
        "Range": "> 3"
      }
    ]
  },
  {
    "Test_Code": "POC-156",
    "Test_Name": "Soil Moisture (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Moisture",
        "Unit": "%",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "POC-157",
    "Test_Name": "Soil Temperature (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Temperature",
        "Unit": "°C",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "POC-158",
    "Test_Name": "Soil EC (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "EC",
        "Unit": "dS/m",
        "Range": "< 4"
      }
    ]
  },
  {
    "Test_Code": "POC-159",
    "Test_Name": "Soil Salinity (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Salinity",
        "Unit": "dS/m",
        "Range": "< 4"
      }
    ]
  },
  {
    "Test_Code": "POC-160",
    "Test_Name": "Soil Texture (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Soil",
    "Price": 5000,
    "Components": [
      {
        "Analyte": "Texture",
        "Unit": "Class",
        "Range": "Variable"
      }
    ]
  },
  {
    "Test_Code": "POC-161",
    "Test_Name": "Air PM2.5 (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "PM2.5",
        "Unit": "ug/m3",
        "Range": "< 35"
      }
    ]
  },
  {
    "Test_Code": "POC-162",
    "Test_Name": "Air PM10 (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "PM10",
        "Unit": "ug/m3",
        "Range": "< 150"
      }
    ]
  },
  {
    "Test_Code": "POC-163",
    "Test_Name": "Air CO2 (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "CO2",
        "Unit": "ppm",
        "Range": "< 1000"
      }
    ]
  },
  {
    "Test_Code": "POC-164",
    "Test_Name": "Air CO (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "CO",
        "Unit": "ppm",
        "Range": "< 9"
      }
    ]
  },
  {
    "Test_Code": "POC-165",
    "Test_Name": "Air Ozone (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "Ozone",
        "Unit": "ppb",
        "Range": "< 70"
      }
    ]
  },
  {
    "Test_Code": "POC-166",
    "Test_Name": "Air NO2 (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "NO2",
        "Unit": "ppb",
        "Range": "< 100"
      }
    ]
  },
  {
    "Test_Code": "POC-167",
    "Test_Name": "Air SO2 (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 8000,
    "Components": [
      {
        "Analyte": "SO2",
        "Unit": "ppb",
        "Range": "< 75"
      }
    ]
  },
  {
    "Test_Code": "POC-168",
    "Test_Name": "Air VOCs (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "VOCs",
        "Unit": "mg/m3",
        "Range": "< 0.3"
      }
    ]
  },
  {
    "Test_Code": "POC-169",
    "Test_Name": "Air Formaldehyde (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Formaldehyde",
        "Unit": "mg/m3",
        "Range": "< 0.1"
      }
    ]
  },
  {
    "Test_Code": "POC-170",
    "Test_Name": "Air Benzene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Benzene",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-171",
    "Test_Name": "Air Toluene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Toluene",
        "Unit": "mg/m3",
        "Range": "< 0.2"
      }
    ]
  },
  {
    "Test_Code": "POC-172",
    "Test_Name": "Air Xylene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Xylene",
        "Unit": "mg/m3",
        "Range": "< 0.2"
      }
    ]
  },
  {
    "Test_Code": "POC-173",
    "Test_Name": "Air Ethylbenzene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Ethylbenzene",
        "Unit": "mg/m3",
        "Range": "< 0.1"
      }
    ]
  },
  {
    "Test_Code": "POC-174",
    "Test_Name": "Air Styrene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Styrene",
        "Unit": "mg/m3",
        "Range": "< 0.07"
      }
    ]
  },
  {
    "Test_Code": "POC-175",
    "Test_Name": "Air Naphthalene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Naphthalene",
        "Unit": "mg/m3",
        "Range": "< 0.01"
      }
    ]
  },
  {
    "Test_Code": "POC-176",
    "Test_Name": "Air Acetaldehyde (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Acetaldehyde",
        "Unit": "mg/m3",
        "Range": "< 0.2"
      }
    ]
  },
  {
    "Test_Code": "POC-177",
    "Test_Name": "Air Acrolein (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Acrolein",
        "Unit": "mg/m3",
        "Range": "< 0.002"
      }
    ]
  },
  {
    "Test_Code": "POC-178",
    "Test_Name": "Air Acrylonitrile (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Acrylonitrile",
        "Unit": "mg/m3",
        "Range": "< 0.002"
      }
    ]
  },
  {
    "Test_Code": "POC-179",
    "Test_Name": "Air 1,3-Butadiene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "1,3-Butadiene",
        "Unit": "mg/m3",
        "Range": "< 0.002"
      }
    ]
  },
  {
    "Test_Code": "POC-180",
    "Test_Name": "Air Vinyl Chloride (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Vinyl Chloride",
        "Unit": "mg/m3",
        "Range": "< 0.001"
      }
    ]
  },
  {
    "Test_Code": "POC-181",
    "Test_Name": "Air Carbon Tetrachloride (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "CCl4",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-182",
    "Test_Name": "Air Chloroform (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Chloroform",
        "Unit": "mg/m3",
        "Range": "< 0.05"
      }
    ]
  },
  {
    "Test_Code": "POC-183",
    "Test_Name": "Air Dichloromethane (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "DCM",
        "Unit": "mg/m3",
        "Range": "< 0.05"
      }
    ]
  },
  {
    "Test_Code": "POC-184",
    "Test_Name": "Air Trichloroethylene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "TCE",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-185",
    "Test_Name": "Air Tetrachloroethylene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "PCE",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-186",
    "Test_Name": "Air 1,1,1-Trichloroethane (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "1,1,1-TCA",
        "Unit": "mg/m3",
        "Range": "< 0.05"
      }
    ]
  },
  {
    "Test_Code": "POC-187",
    "Test_Name": "Air 1,1,2-Trichloroethane (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "1,1,2-TCA",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-188",
    "Test_Name": "Air 1,2-Dichloroethane (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "1,2-DCA",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-189",
    "Test_Name": "Air 1,2-Dichloropropane (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "1,2-DCP",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-190",
    "Test_Name": "Air 1,4-Dioxane (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "1,4-Dioxane",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-191",
    "Test_Name": "Air Ethylene Oxide (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "EtO",
        "Unit": "mg/m3",
        "Range": "< 0.001"
      }
    ]
  },
  {
    "Test_Code": "POC-192",
    "Test_Name": "Air Propylene Oxide (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "PO",
        "Unit": "mg/m3",
        "Range": "< 0.005"
      }
    ]
  },
  {
    "Test_Code": "POC-193",
    "Test_Name": "Air Acrylamide (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Acrylamide",
        "Unit": "mg/m3",
        "Range": "< 0.0003"
      }
    ]
  },
  {
    "Test_Code": "POC-194",
    "Test_Name": "Air Epichlorohydrin (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "ECH",
        "Unit": "mg/m3",
        "Range": "< 0.001"
      }
    ]
  },
  {
    "Test_Code": "POC-195",
    "Test_Name": "Air Ethylene Dibromide (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "EDB",
        "Unit": "mg/m3",
        "Range": "< 0.0001"
      }
    ]
  },
  {
    "Test_Code": "POC-196",
    "Test_Name": "Air Ethylene Dichloride (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "EDC",
        "Unit": "mg/m3",
        "Range": "< 0.001"
      }
    ]
  },
  {
    "Test_Code": "POC-197",
    "Test_Name": "Air Hexachlorobutadiene (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "HCBD",
        "Unit": "mg/m3",
        "Range": "< 0.0001"
      }
    ]
  },
  {
    "Test_Code": "POC-198",
    "Test_Name": "Air Hexachloroethane (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "HCE",
        "Unit": "mg/m3",
        "Range": "< 0.001"
      }
    ]
  },
  {
    "Test_Code": "POC-199",
    "Test_Name": "Air Methyl Chloride (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Methyl Chloride",
        "Unit": "mg/m3",
        "Range": "< 0.05"
      }
    ]
  },
  {
    "Test_Code": "POC-200",
    "Test_Name": "Air Methylene Chloride (POCT)",
    "Department": "Environmental",
    "Sub_Department": "POCT",
    "Catalog_Item_Type": "SINGLE_COMPONENT",
    "Component_Count": 1,
    "Specimen_Type": "Air",
    "Price": 10000,
    "Components": [
      {
        "Analyte": "Methylene Chloride",
        "Unit": "mg/m3",
        "Range": "< 0.05"
      }
    ]
  }
];

async function initOfflineTestsDatabase() {
    try {
        // التحقق من وجود قاعدة البيانات وزراعة الفحوصات إن كانت فارغة
        const existing = await dbGetAll('tests');
        if (!existing || existing.length === 0) {
            console.log('🔄 جاري حقن وزرع التحاليل في قاعدة البيانات المحلية...');
            for (const test of OFFLINE_TESTS_DATABASE) {
                await dbAdd('tests', test);
            }
            console.log('✅ تم حفظ جميع التحاليل (' + OFFLINE_TESTS_DATABASE.length + ') في النظام بنجاح تام أوفلاين!');
        } else {
            console.log('ℹ️ التحاليل مخزنة مسبقاً محلياً (' + existing.length + ' فحوصات)');
        }
    } catch (error) {
        console.error('❌ خطأ في تهيئة قاعدة بيانات التحاليل أوفلاين:', error);
    }
}

// استدعاء الدالة عند إقلاع التطبيق
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initOfflineTestsDatabase, 1000);
});
