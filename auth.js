// ============================================================
// KodNaqi — نظام تسجيل الدخول
// ============================================================

const AUTH_KEYS = {
  USERS: 'kodnaqi_users',
  SESSION: 'kodnaqi_session',
  ATTEMPTS: 'kodnaqi_attempts',
};

const MAX_ATTEMPTS = 5;
const LOCK_DURATION = 5 * 60 * 1000; // 5 دقائق
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 ساعات
const REMEMBER_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 يوم

// ============ تشفير كلمة المرور (SHA-256) ============
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_kodnaqi_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============ إدارة المستخدمين ============
function getUsers() {
  try {
    const users = localStorage.getItem(AUTH_KEYS.USERS);
    return users ? JSON.parse(users) : {};
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));
}

// إنشاء admin افتراضي إذا لم يوجد مستخدمون
async function initDefaultAdmin() {
  const users = getUsers();
  if (Object.keys(users).length === 0) {
    const defaultHash = await hashPassword('kodnaqi2025');
    users['admin'] = {
      username: 'admin',
      passwordHash: defaultHash,
      fullName: 'مدير المعمل',
      createdAt: new Date().toISOString(),
    };
    saveUsers(users);
    console.log('✅ تم إنشاء admin افتراضي');
  }
}

// ============ محاولات تسجيل الدخول ============
function getAttempts() {
  try {
    const a = localStorage.getItem(AUTH_KEYS.ATTEMPTS);
    return a ? JSON.parse(a) : { count: 0, lockedUntil: 0 };
  } catch (e) {
    return { count: 0, lockedUntil: 0 };
  }
}

function saveAttempts(data) {
  localStorage.setItem(AUTH_KEYS.ATTEMPTS, JSON.stringify(data));
}

function isLocked() {
  const a = getAttempts();
  return a.lockedUntil > Date.now();
}

function getLockRemaining() {
  const a = getAttempts();
  const remaining = a.lockedUntil - Date.now();
  if (remaining <= 0) return 0;
  return Math.ceil(remaining / 1000); // بالثواني
}

function recordFailedAttempt() {
  const a = getAttempts();
  a.count += 1;

  if (a.count >= MAX_ATTEMPTS) {
    a.lockedUntil = Date.now() + LOCK_DURATION;
    a.count = 0;
  }

  saveAttempts(a);
  return a;
}

function resetAttempts() {
  saveAttempts({ count: 0, lockedUntil: 0 });
}

// ============ الجلسة ============
function saveSession(username, rememberMe) {
  const duration = rememberMe ? REMEMBER_DURATION : SESSION_DURATION;
  const session = {
    username: username,
    expiresAt: Date.now() + duration,
    startedAt: Date.now(),
  };
  localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify(session));
}

function getSession() {
  try {
    const s = localStorage.getItem(AUTH_KEYS.SESSION);
    if (!s) return null;
    const session = JSON.parse(s);
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(AUTH_KEYS.SESSION);
      return null;
    }
    return session;
  } catch (e) {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(AUTH_KEYS.SESSION);
}

function isAuthenticated() {
  return getSession() !== null;
}

// ============ تسجيل الدخول ============
async function login(username, password, rememberMe) {
  // تحقق من القفل
  if (isLocked()) {
    const sec = getLockRemaining();
    const min = Math.ceil(sec / 60);
    return {
      success: false,
      error: `🔒 الحساب مقفل بسبب محاولات فاشلة. حاول بعد ${min} دقيقة.`,
    };
  }

  const users = getUsers();
  const user = users[username];

  if (!user) {
    const a = recordFailedAttempt();
    const remaining = MAX_ATTEMPTS - a.count;
    return {
      success: false,
      error: `❌ اسم المستخدم غير صحيح. المحاولات المتبقية: ${remaining}`,
    };
  }

  const hash = await hashPassword(password);

  if (hash !== user.passwordHash) {
    const a = recordFailedAttempt();
    const remaining = MAX_ATTEMPTS - a.count;
    return {
      success: false,
      error: `❌ كلمة المرور غير صحيحة. المحاولات المتبقية: ${remaining}`,
    };
  }

  // نجح
  resetAttempts();
  saveSession(username, rememberMe);
  return {
    success: true,
    user: user,
  };
}

// ============ تسجيل الخروج ============
function logout() {
  if (!confirm('هل تريد تسجيل الخروج؟')) return;
  
  console.log('🚪 تسجيل خروج سريع...');
  clearSession();
  
  // اعرض شاشة الدخول فوراً
  showLoginScreen();
  
  // امسح الحقول
  setTimeout(function() {
    var u = document.getElementById('loginUsername');
    var p = document.getElementById('loginPassword');
    var r = document.getElementById('loginRemember');
    if (u) { u.value = ''; u.focus(); }
    if (p) p.value = '';
    if (r) r.checked = false;
    
    // اخفِ الأزرار والرسائل الخطأ
    var errEl = document.getElementById('loginError');
    if (errEl) errEl.style.display = 'none';
    
    var btn = document.getElementById('loginBtn');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'تسجيل الدخول';
    }
  }, 100);
  
  console.log('✅ تم تسجيل الخروج');
}

// ============ تغيير كلمة المرور ============
async function changePassword(oldPassword, newPassword, confirmPassword) {
  const session = getSession();
  if (!session) {
    return { success: false, error: '❌ لم يتم العثور على الجلسة' };
  }

  const users = getUsers();
  const user = users[session.username];
  if (!user) {
    return { success: false, error: '❌ المستخدم غير موجود' };
  }

  // تحقق من القديمة
  const oldHash = await hashPassword(oldPassword);
  if (oldHash !== user.passwordHash) {
    return { success: false, error: '❌ كلمة المرور الحالية غير صحيحة' };
  }

  // تحقق من الشروط
  if (newPassword.length < 6) {
    return { success: false, error: '❌ كلمة المرور الجديدة قصيرة (6 أحرف على الأقل)' };
  }
  if (newPassword !== confirmPassword) {
    return { success: false, error: '❌ كلمتا المرور غير متطابقتين' };
  }

  // احفظ الجديدة
  user.passwordHash = await hashPassword(newPassword);
  user.passwordChangedAt = new Date().toISOString();
  saveUsers(users);

  return { success: true };
}

// ============ المستخدم الحالي ============
function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users[session.username] || null;
}

// ============ الواجهة ============
function showLoginScreen() {
  const overlay = document.getElementById('loginOverlay');
  if (overlay) overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hideLoginScreen() {
  const overlay = document.getElementById('loginOverlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

// معالجة نموذج الدخول
async function handleLoginForm(event) {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('loginRemember').checked;
  const errorEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');

  if (!username || !password) {
    errorEl.textContent = '⚠️ أدخل اسم المستخدم وكلمة المرور';
    errorEl.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> جاري التحقق...';

  try {
    const result = await login(username, password, rememberMe);

    if (result.success) {
      errorEl.style.display = 'none';
      hideLoginScreen();
      
      // ✅ شغّل init تلقائياً بدون reload
      if (typeof postLoginInit === 'function') {
        await postLoginInit();
      } else {
        // بديل: شغّل الدوال الأساسية
        if (typeof loadDashboard === 'function') {
          await loadDashboard();
        }
      }
      
      console.log('✅ تم الدخول بنجاح');
      
    } else {
      btn.disabled = false;
      btn.innerHTML = 'تسجيل الدخول';
      errorEl.textContent = result.error;
      errorEl.style.display = 'block';
      document.getElementById('loginPassword').value = '';
      if (isLocked()) startLockCountdown();
    }
  } catch (err) {
    console.error('❌ خطأ الدخول:', err);
    btn.disabled = false;
    btn.innerHTML = 'تسجيل الدخول';
    errorEl.textContent = '❌ خطأ: ' + err.message;
    errorEl.style.display = 'block';
  }
}

function startLockCountdown() {
  const btn = document.getElementById('loginBtn');
  const errorEl = document.getElementById('loginError');

  const interval = setInterval(() => {
    if (!isLocked()) {
      clearInterval(interval);
      btn.disabled = false;
      btn.innerHTML = 'تسجيل الدخول';
      errorEl.textContent = '✅ يمكنك المحاولة الآن';
      return;
    }
    const sec = getLockRemaining();
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    btn.disabled = true;
    btn.innerHTML = `🔒 انتظر ${min}:${String(s).padStart(2, '0')}`;
  }, 1000);
}

// ============ إعداد صفحة الدخول ============
async function setupAuth() {
  // 1) أنشئ admin افتراضي
  await initDefaultAdmin();

  // 2) إذا كان مسجل دخول → اخفِ الشاشة
  if (isAuthenticated()) {
    hideLoginScreen();
    return true;
  }

  // 3) إذا لم يكن مسجل → اعرض الشاشة
  showLoginScreen();

  // 4) إذا كان مقفلاً → ابدأ العد
  if (isLocked()) {
    startLockCountdown();
  }

  return false;
}

// ============ تصدير ============
window.login = login;
window.logout = logout;
window.changePassword = changePassword;
window.getCurrentUser = getCurrentUser;
window.isAuthenticated = isAuthenticated;
window.isLocked = isLocked;
window.getLockRemaining = getLockRemaining;
window.setupAuth = setupAuth;
window.handleLoginForm = handleLoginForm;
window.showLoginScreen = showLoginScreen;
window.hideLoginScreen = hideLoginScreen;

// ============ واجهة تغيير كلمة المرور ============
function showChangePasswordModal() {
  document.getElementById('oldPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
  document.getElementById('passwordError').style.display = 'none';

  const modal = new bootstrap.Modal(document.getElementById('passwordModal'));
  modal.show();
}

async function handleChangePassword() {
  const oldPw = document.getElementById('oldPassword').value;
  const newPw = document.getElementById('newPassword').value;
  const confirmPw = document.getElementById('confirmPassword').value;
  const errorEl = document.getElementById('passwordError');

  if (!oldPw || !newPw || !confirmPw) {
    errorEl.textContent = '⚠️ املأ كل الحقول';
    errorEl.style.display = 'block';
    return;
  }

  const result = await changePassword(oldPw, newPw, confirmPw);

  if (result.success) {
    errorEl.style.display = 'none';

    const modalEl = document.getElementById('passwordModal');
    bootstrap.Modal.getInstance(modalEl).hide();

    alert('✅ تم تغيير كلمة المرور بنجاح');
  } else {
    errorEl.textContent = result.error;
    errorEl.style.display = 'block';
  }
}

function updateAccountDisplay() {
  const user = getCurrentUser();
  if (user) {
    const el = document.getElementById('currentUserDisplay');
    if (el) el.textContent = user.fullName || user.username;
  }
}

window.showChangePasswordModal = showChangePasswordModal;
window.handleChangePassword = handleChangePassword;
window.updateAccountDisplay = updateAccountDisplay;
