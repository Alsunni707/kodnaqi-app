// ============================================================
// KodNaqi Standalone — قاعدة البيانات المحلية (IndexedDB)
// ============================================================
// تخزين كل البيانات داخل الهاتف — بدون سيرفر، بدون إنترنت

const DB_NAME = 'kodnaqi_standalone';
const DB_VERSION = 4;

let db = null;

// فتح/إنشاء قاعدة البيانات
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const database = e.target.result;

      // جدول المرضى
      if (!database.objectStoreNames.contains('patients')) {
        const s = database.createObjectStore('patients', { keyPath: 'id', autoIncrement: true });
        s.createIndex('name', 'name', { unique: false });
        s.createIndex('phone', 'phone', { unique: false });
        s.createIndex('serial', 'serial', { unique: true });
      }

      // جدول التحاليل
      if (!database.objectStoreNames.contains('tests')) {
        const s = database.createObjectStore('tests', { keyPath: 'id', autoIncrement: true });
        s.createIndex('name', 'name', { unique: true });
      }

      // معايير التحاليل
      if (!database.objectStoreNames.contains('parameters')) {
        const s = database.createObjectStore('parameters', { keyPath: 'id', autoIncrement: true });
        s.createIndex('test_id', 'test_id', { unique: false });
      }

      // الزيارات
      if (!database.objectStoreNames.contains('visits')) {
        const s = database.createObjectStore('visits', { keyPath: 'id', autoIncrement: true });
        s.createIndex('patient_id', 'patient_id', { unique: false });
        s.createIndex('serial', 'serial', { unique: false });
        s.createIndex('date', 'date', { unique: false });
      }

      // تحاليل الزيارات (المفقود سابقاً!)
      if (!database.objectStoreNames.contains('visit_tests')) {
        const s = database.createObjectStore('visit_tests', { keyPath: 'id', autoIncrement: true });
        s.createIndex('visit_id', 'visit_id', { unique: false });
        s.createIndex('test_id', 'test_id', { unique: false });
      }

      // نتائج الزيارات
      if (!database.objectStoreNames.contains('results')) {
        const s = database.createObjectStore('results', { keyPath: 'id', autoIncrement: true });
        s.createIndex('visit_id', 'visit_id', { unique: false });
        s.createIndex('param_id', 'param_id', { unique: false });
      }

      // المصروفات
      if (!database.objectStoreNames.contains('expenses')) {
        const s = database.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        s.createIndex('date', 'date', { unique: false });
      }

      // المخازن
      if (!database.objectStoreNames.contains('inventory')) {
        database.createObjectStore('inventory', { keyPath: 'id', autoIncrement: true });
      }

      // عداد الأرقام التسلسلية
      if (!database.objectStoreNames.contains('counters')) {
        database.createObjectStore('counters', { keyPath: 'name' });
      }

      // المستخدمون (نسخة IndexedDB للنسخ الاحتياطي)
      if (!database.objectStoreNames.contains('users_store')) {
        const s = database.createObjectStore('users_store', { keyPath: 'username' });
      }

      // الإشعارات المُرسلة
      if (!database.objectStoreNames.contains('notifications')) {
        const s = database.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
        s.createIndex('visit_id', 'visit_id', { unique: false });
        s.createIndex('patient_id', 'patient_id', { unique: false });
        s.createIndex('sent_at', 'sent_at', { unique: false });
      }

      // سجل العمليات
      if (!database.objectStoreNames.contains('activity')) {
        const s = database.createObjectStore('activity', { keyPath: 'id', autoIncrement: true });
        s.createIndex('date', 'date', { unique: false });
      }
    };

    req.onsuccess = (e) => {
      db = e.target.result;
      console.log('✅ قاعدة البيانات جاهزة');
      resolve(db);
    };

    req.onerror = (e) => {
      console.error('❌ فشل فتح قاعدة البيانات:', e);
      reject(e);
    };
  });
}

// ============ عمليات عامة ============
function dbAdd(store, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).add(data);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbPut(store, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(data);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbGet(store, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbGetAll(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

function dbDelete(store, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function dbClear(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function dbCount(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).count();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// الحصول على عناصر بالفهرس
function dbGetByIndex(store, indexName, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const idx = tx.objectStore(store).index(indexName);
    const req = idx.getAll(value);
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

// ============ العداد التسلسلي ============
async function getNextSerial(type) {
  const year = new Date().getFullYear();
  const counterName = `${type}_${year}`;
  const counter = await dbGet('counters', counterName);
  let nextNum = counter ? counter.value + 1 : 1;

  await dbPut('counters', { name: counterName, value: nextNum });

  if (type === 'patient') {
    return `KN-P-${year}-${String(nextNum).padStart(6, '0')}`;
  } else if (type === 'visit') {
    return `KN-${year}-${String(nextNum).padStart(6, '0')}`;
  }
  return String(nextNum);
}
