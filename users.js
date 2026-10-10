// ============================================================
// KodNaqi — إدارة المستخدمين والصلاحيات
// ============================================================

// ============ الأدوار ============
const USER_ROLES = {
  'admin': {
    name: 'مدير',
    icon: '👔',
    color: 'danger',
    permissions: [
      'patients_view', 'patients_edit', 'patients_delete',
      'visits_view', 'visits_create', 'visits_edit', 'visits_delete',
      'results_edit', 'reports_print',
      'finance_view', 'finance_edit',
      'stats_view',
      'inventory_view', 'inventory_edit',
      'notifications_send',
      'users_manage',
      'settings_edit'
    ]
  },
  'tech': {
    name: 'فني',
    icon: '🔬',
    color: 'info',
    permissions: [
      'patients_view', 'patients_edit',
      'visits_view', 'visits_create', 'visits_edit',
      'results_edit', 'reports_print',
      'inventory_view', 'inventory_edit',
      'notifications_send'
    ]
  },
  'reception': {
    name: 'استقبال',
    icon: '💼',
    color: 'success',
    permissions: [
      'patients_view', 'patients_edit',
      'visits_view', 'visits_create', 'visits_edit',
      'reports_print',
      'notifications_send'
    ]
  }
};

// ============ المستخدم الحالي ============
function getCurrentUserRole() {
  try {
    const session = JSON.parse(localStorage.getItem('kodnaqi_session') || 'null');
    if (!session || !session.username) return null;
    
    const users = JSON.parse(localStorage.getItem('kodnaqi_users') || '{}');
    const user = users[session.username];
    
    // ✅ إذا وُجد المستخدم، استخدم دوره
    if (user && user.role) {
      return user.role;
    }
    
    // ✅ الحل الاحتياطي: أول مستخدم (المالك) = admin تلقائياً
    const usernames = Object.keys(users);
    if (usernames.length > 0) {
      console.log('⚠️ المستخدم غير موجود في السجل — استخدم admin افتراضي');
      // أنشئ حساب admin إذا لم يكن موجوداً
      if (!users[session.username]) {
        users[session.username] = {
          username: session.username,
          fullName: session.username,
          role: 'admin',
          createdAt: new Date().toISOString(),
          isFirstUser: true
        };
        localStorage.setItem('kodnaqi_users', JSON.stringify(users));
        console.log('✅ تم إنشاء حساب admin افتراضي لـ: ' + session.username);
      }
      return 'admin';
    }
    
    // ✅ إذا لم يوجد أي مستخدمين (نظام جديد) → المالك = admin
    users[session.username] = {
      username: session.username,
      fullName: session.username,
      role: 'admin',
      createdAt: new Date().toISOString(),
      isFirstUser: true
    };
    localStorage.setItem('kodnaqi_users', JSON.stringify(users));
    console.log('✅ تم إنشاء أول حساب admin: ' + session.username);
    
    return 'admin';
  } catch (e) {
    console.error('getCurrentUserRole error:', e);
    return null;
  }
}

function getCurrentUserInfo() {
  try {
    const session = JSON.parse(localStorage.getItem('kodnaqi_session') || 'null');
    if (!session || !session.username) return null;
    
    const users = JSON.parse(localStorage.getItem('kodnaqi_users') || '{}');
    return users[session.username] || null;
  } catch (e) {
    return null;
  }
}

// ============ فحص الصلاحية ============
function hasPermission(permission) {
  const role = getCurrentUserRole();
  if (!role) return false;
  
  const roleData = USER_ROLES[role];
  if (!roleData) return false;
  
  return roleData.permissions.indexOf(permission) !== -1;
}

// ============ تطبيق الصلاحيات على الواجهة ============
function applyRolePermissions() {
  const role = getCurrentUserRole();
  if (!role) return;
  
  console.log('🎭 تطبيق صلاحيات:', role);
  
  // قائمة الروابط في الشريط السفلي
  const navItems = {
    'finance': 'finance_view',
    'stats': 'stats_view',
    'notifications': 'notifications_send'
  };
  
  // إخفاء روابط التنقل
  document.querySelectorAll('.bottom-nav a').forEach(function(link) {
    const page = link.dataset.page;
    if (navItems[page] && !hasPermission(navItems[page])) {
      link.style.display = 'none';
    }
  });
  
  // إخفاء أزرار معينة
  document.querySelectorAll('[data-permission]').forEach(function(el) {
    const perm = el.dataset.permission;
    if (!hasPermission(perm)) {
      el.style.display = 'none';
    }
  });
  
  // في صفحة الإعدادات
  // - إخفاء إدارة المستخدمين
  // - إخفاء سجل العمليات
  // - إخفاء حذف البيانات (إلا للمدير)
  const settingsCards = document.querySelectorAll('.settings-admin-only');
  settingsCards.forEach(function(el) {
    if (role !== 'admin') el.style.display = 'none';
  });
  
  // 🛡️ إخفاء أزرار "النتائج" عن الاستقبال
  if (!hasPermission('results_edit')) {
    // إخفاء زر "إدخال النتائج" / "عرض / تعديل النتائج"
    document.querySelectorAll('button[onclick*="openVisit"]').forEach(function(btn) {
      btn.style.display = 'none';
    });
    
    // إخفاء روابط فتح النتائج
    document.querySelectorAll('a[href*="/visits/"][href*="/results"]').forEach(function(a) {
      a.style.display = 'none';
    });
  }
  
  // 🛡️ إخفاء زر الطباعة إن لم يكن مصرّحاً
  if (!hasPermission('reports_print')) {
    document.querySelectorAll('button[onclick*="generateReport"]').forEach(function(btn) {
      btn.style.display = 'none';
    });
    document.querySelectorAll('button[onclick*="generateInvoice"]').forEach(function(btn) {
      btn.style.display = 'none';
    });
  }
}

// ============ إدارة المستخدمين ============
function getAllUsers() {
  try {
    const users = JSON.parse(localStorage.getItem('kodnaqi_users') || '{}');
    return users;
  } catch (e) {
    return {};
  }
}

function saveAllUsers(users) {
  localStorage.setItem('kodnaqi_users', JSON.stringify(users));
}

async function hashPasswordLocal(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_kodnaqi_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============ عرض صفحة المستخدمين ============
async function renderUsersPage() {
  const container = document.getElementById('usersList');
  if (!container) return;
  
  // 🔄 استعد من IndexedDB أولاً
  if (typeof restoreUsersFromIndexedDB === 'function') {
    await restoreUsersFromIndexedDB();
  }
  
  if (!hasPermission('users_manage')) {
    container.innerHTML = '<div class="alert alert-danger">⛔ ليس لديك صلاحية الوصول لهذه الصفحة</div>';
    return;
  }
  
  const users = getAllUsers();
  const usernames = Object.keys(users);
  
  let html = '';
  
  // بطاقة إحصائيات
  html += '<div class="row g-2 mb-3">' +
    '<div class="col-4"><div class="card p-2 text-center">' +
    '<div class="small text-muted">إجمالي</div>' +
    '<div class="stat-value fs-4">' + usernames.length + '</div></div></div>' +
    '<div class="col-4"><div class="card p-2 text-center">' +
    '<div class="small text-muted">مديرون</div>' +
    '<div class="stat-value fs-4">' + usernames.filter(function(u) { return users[u].role === 'admin'; }).length + '</div></div></div>' +
    '<div class="col-4"><div class="card p-2 text-center">' +
    '<div class="small text-muted">فنيون</div>' +
    '<div class="stat-value fs-4">' + usernames.filter(function(u) { return users[u].role === 'tech'; }).length + '</div></div></div>' +
    '</div>';
  
  // زر إضافة
  html += '<button class="btn btn-primary w-100 mb-3" onclick="showAddUserModal()">' +
    '<i class="bi bi-person-plus"></i> إضافة مستخدم جديد</button>';
  
  // القائمة
  html += '<h6 class="fw-bold mb-2">المستخدمون:</h6>';
  
  for (var i = 0; i < usernames.length; i++) {
    var username = usernames[i];
    var user = users[username];
    var roleData = USER_ROLES[user.role] || { name: user.role, icon: '❓', color: 'secondary' };
    
    var isCurrent = false;
    try {
      var session = JSON.parse(localStorage.getItem('kodnaqi_session') || 'null');
      isCurrent = session && session.username === username;
    } catch (e) {}
    
    html += '<div class="card mb-2 p-3">' +
      '<div class="d-flex justify-content-between align-items-center">' +
      '<div style="flex:1">' +
      '<div class="d-flex align-items-center gap-2 mb-1">' +
      '<strong>' + escapeHtml(user.fullName || username) + '</strong>' +
      (isCurrent ? ' <span class="badge bg-primary">أنت</span>' : '') +
      '</div>' +
      '<div class="small text-muted">' +
      '👤 @' + escapeHtml(username) + ' • ' +
      '<span class="badge bg-' + roleData.color + '">' + roleData.icon + ' ' + roleData.name + '</span>' +
      '</div>' +
      '</div>' +
      '<div class="d-flex gap-1">' +
      '<button class="btn btn-sm btn-outline-primary" onclick="editUser(\'' + username + '\')"><i class="bi bi-pencil"></i></button>' +
      (isCurrent ? '' : '<button class="btn btn-sm btn-outline-danger" onclick="deleteUser(\'' + username + '\')"><i class="bi bi-trash"></i></button>') +
      '</div>' +
      '</div>' +
      '</div>';
  }
  
  container.innerHTML = html;
}

// ============ إضافة مستخدم ============
function showAddUserModal() {
  var html = '<form id="addUserForm" autocomplete="off" onsubmit="event.preventDefault(); saveNewUser(); return false;">' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">اسم المستخدم *</label>' +
    '<input type="text" id="nu_username" name="nu_username" class="form-control" dir="ltr" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="username">' +
    '<div class="form-text small">بالإنجليزي فقط، بدون مسافات</div>' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">الاسم الكامل</label>' +
    '<input type="text" id="nu_fullname" name="nu_fullname" class="form-control" autocomplete="off" placeholder="الاسم الكامل">' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">الصلاحية *</label>' +
    '<select id="nu_role" name="nu_role" class="form-select">' +
    '<option value="reception">💼 استقبال</option>' +
    '<option value="tech">🔬 فني</option>' +
    '<option value="admin">👔 مدير</option>' +
    '</select>' +
    '</div>' +
    '<div class="mb-3">' +
    '<label class="form-label small fw-bold">كلمة المرور *</label>' +
    '<input type="password" id="nu_password" name="nu_password" class="form-control" dir="ltr" autocomplete="new-password" placeholder="••••••••">' +
    '<div class="form-text small">6 أحرف على الأقل</div>' +
    '</div>' +
    '<div class="d-grid gap-2">' +
    '<button type="submit" class="btn btn-primary">' +
    '<i class="bi bi-save"></i> حفظ</button>' +
    '<button type="button" class="btn btn-outline-secondary" onclick="closeInfoModal()">إلغاء</button>' +
    '</div>' +
    '</form>';
  
  showInfoModal(html, '➕ إضافة مستخدم');
  
  // امسح أي auto-fill
  setTimeout(function() {
    var fields = ['nu_username', 'nu_fullname', 'nu_password'];
    for (var i = 0; i < fields.length; i++) {
      var el = document.getElementById(fields[i]);
      if (el) el.value = '';
    }
  }, 200);
}

async function saveNewUser() {
  var usernameEl = document.getElementById('nu_username');
  var fullNameEl = document.getElementById('nu_fullname');
  var roleEl = document.getElementById('nu_role');
  var passwordEl = document.getElementById('nu_password');
  
  if (!usernameEl || !passwordEl) {
    alert('⚠️ خطأ: لم يتم العثور على حقول الإدخال');
    return;
  }
  
  var username = (usernameEl.value || '').trim().toLowerCase();
  var fullName = (fullNameEl && fullNameEl.value || '').trim();
  var role = (roleEl && roleEl.value) || 'reception';
  var password = (passwordEl.value || '');
  
  console.log('=== Save User Debug ===');
  console.log('username:', username);
  console.log('fullName:', fullName);
  console.log('role:', role);
  console.log('password length:', password.length);
  
  if (!username) {
    alert('⚠️ اسم المستخدم مطلوب');
    usernameEl.focus();
    return;
  }
  
  if (!password) {
    alert('⚠️ كلمة المرور مطلوبة');
    passwordEl.focus();
    return;
  }
  
  if (password.length < 6) {
    alert('⚠️ كلمة المرور قصيرة (6 أحرف على الأقل)');
    passwordEl.focus();
    return;
  }
  
  if (!/^[a-z0-9_]+$/.test(username)) {
    alert('⚠️ اسم المستخدم يجب أن يكون بالإنجليزية فقط\n(حروف صغيرة + أرقام + _)');
    usernameEl.focus();
    return;
  }
  
  var users = getAllUsers();
  
  if (users[username]) {
    alert('⚠️ اسم المستخدم موجود مسبقاً');
    usernameEl.focus();
    return;
  }
  
  var hash = await hashPasswordLocal(password);
  
  users[username] = {
    username: username,
    passwordHash: hash,
    fullName: fullName,
    role: role,
    createdAt: new Date().toISOString(),
    createdBy: getCurrentUserInfo() ? getCurrentUserInfo().username : 'system'
  };
  
  saveAllUsers(users);
  await syncUsersToIndexedDB();
  
  console.log('✅ تم إنشاء المستخدم:', username);
  alert('✅ تم إضافة المستخدم @' + username + ' بنجاح');
  closeInfoModal();
  await renderUsersPage();
}

// ============ تعديل مستخدم ============
async function editUser(username) {
  var users = getAllUsers();
  var user = users[username];
  if (!user) return;
  
  var html = '<form id="editUserForm">' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">اسم المستخدم</label>' +
    '<input type="text" class="form-control" value="' + escapeHtml(username) + '" disabled dir="ltr">' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">الاسم الكامل</label>' +
    '<input type="text" id="editFullName" class="form-control" value="' + escapeHtml(user.fullName || '') + '">' +
    '</div>' +
    '<div class="mb-2">' +
    '<label class="form-label small fw-bold">الصلاحية</label>' +
    '<select id="editRole" class="form-select">' +
    '<option value="reception"' + (user.role === 'reception' ? ' selected' : '') + '>💼 استقبال</option>' +
    '<option value="tech"' + (user.role === 'tech' ? ' selected' : '') + '>🔬 فني</option>' +
    '<option value="admin"' + (user.role === 'admin' ? ' selected' : '') + '>👔 مدير</option>' +
    '</select>' +
    '</div>' +
    '<div class="mb-3">' +
    '<label class="form-label small fw-bold">كلمة مرور جديدة</label>' +
    '<input type="password" id="editPassword" class="form-control" dir="ltr" minlength="6">' +
    '<div class="form-text small">اتركها فارغة لعدم التغيير</div>' +
    '</div>' +
    '<div class="d-grid gap-2">' +
    '<button type="button" class="btn btn-primary" onclick="saveUserEdit(\'' + username + '\')">' +
    '<i class="bi bi-save"></i> حفظ</button>' +
    '<button type="button" class="btn btn-outline-secondary" onclick="closeInfoModal()">إلغاء</button>' +
    '</div>' +
    '</form>';
  
  showInfoModal(html, '✏️ تعديل: ' + (user.fullName || username));
}

async function saveUserEdit(username) {
  var users = getAllUsers();
  var user = users[username];
  if (!user) return;
  
  user.fullName = document.getElementById('editFullName').value.trim();
  user.role = document.getElementById('editRole').value;
  user.updatedAt = new Date().toISOString();
  
  var newPassword = document.getElementById('editPassword').value;
  if (newPassword) {
    if (newPassword.length < 6) {
      alert('⚠️ كلمة المرور قصيرة');
      return;
    }
    user.passwordHash = await hashPasswordLocal(newPassword);
  }
  
  saveAllUsers(users);
  await syncUsersToIndexedDB();
  
  console.log('✅ تم تحديث:', username);
  alert('✅ تم التحديث بنجاح');
  closeInfoModal();
  await renderUsersPage();
}

// ============ حذف مستخدم ============
async function deleteUser(username) {
  var session = JSON.parse(localStorage.getItem('kodnaqi_session') || 'null');
  if (session && session.username === username) {
    alert('⚠️ لا يمكنك حذف حسابك الحالي');
    return;
  }
  
  if (!confirm('⚠️ حذف المستخدم @' + username + '؟\n\nلا يمكن التراجع عن هذه العملية.')) {
    return;
  }
  
  var users = getAllUsers();
  delete users[username];
  saveAllUsers(users);
  await syncUsersToIndexedDB();
  
  console.log('✅ تم حذف:', username);
  alert('✅ تم حذف المستخدم');
  await renderUsersPage();
}

// ============ سجل عمليات بسيط ============
function logUserAction(action, details) {
  try {
    var user = getCurrentUserInfo();
    var logs = JSON.parse(localStorage.getItem('kodnaqi_audit_log') || '[]');
    
    logs.push({
      timestamp: new Date().toISOString(),
      user: user ? user.username : 'unknown',
      fullName: user ? user.fullName : '',
      action: action,
      details: details || ''
    });
    
    // احفظ آخر 500 سجل
    if (logs.length > 500) {
      logs = logs.slice(-500);
    }
    
    localStorage.setItem('kodnaqi_audit_log', JSON.stringify(logs));
  } catch (e) {
    console.error('logUserAction error:', e);
  }
}

function getAuditLog() {
  try {
    return JSON.parse(localStorage.getItem('kodnaqi_audit_log') || '[]');
  } catch (e) {
    return [];
  }
}


// ============ مزامنة المستخدمين مع IndexedDB ============
async function syncUsersToIndexedDB() {
  try {
    var users = getAllUsers();
    var usernames = Object.keys(users);
    
    // امسح القديم
    try {
      await dbClear('users_store');
    } catch (e) {}
    
    // أضف الجديد
    for (var i = 0; i < usernames.length; i++) {
      var username = usernames[i];
      var user = JSON.parse(JSON.stringify(users[username])); // نسخة
      user.username = username;
      try {
        await dbPut('users_store', user);
      } catch (e) {
        console.error('Failed to sync user:', username, e);
      }
    }
    
    console.log('✅ تمت مزامنة ' + usernames.length + ' مستخدم مع IndexedDB');
  } catch (e) {
    console.error('syncUsersToIndexedDB error:', e);
  }
}

// ============ استعادة المستخدمين من IndexedDB ============
async function restoreUsersFromIndexedDB() {
  try {
    var indexedUsers = await dbGetAll('users_store');
    if (!indexedUsers || indexedUsers.length === 0) {
      console.log('لا يوجد مستخدمون في IndexedDB');
      return false;
    }
    
    var users = getAllUsers();
    var localCount = Object.keys(users).length;
    
    // إذا كان localStorage فارغاً أو ناقصاً، استعد من IndexedDB
    if (localCount === 0) {
      var restored = {};
      for (var i = 0; i < indexedUsers.length; i++) {
        var u = indexedUsers[i];
        restored[u.username] = u;
      }
      saveAllUsers(restored);
      console.log('✅ تم استعادة ' + indexedUsers.length + ' مستخدم من IndexedDB');
      return true;
    }
    
    // إذا كان عدد المستخدمين في IndexedDB أكبر، ادمج
    if (indexedUsers.length > localCount) {
      for (var j = 0; j < indexedUsers.length; j++) {
        var u2 = indexedUsers[j];
        if (!users[u2.username]) {
          users[u2.username] = u2;
          console.log('  + استعادة: ' + u2.username);
        }
      }
      saveAllUsers(users);
      console.log('✅ تم دمج ' + indexedUsers.length + ' مستخدم');
      return true;
    }
    
    return false;
  } catch (e) {
    console.error('restoreUsersFromIndexedDB error:', e);
    return false;
  }
}

// ============ تصدير ============
window.USER_ROLES = USER_ROLES;
window.getCurrentUserRole = getCurrentUserRole;
window.getCurrentUserInfo = getCurrentUserInfo;
window.hasPermission = hasPermission;
window.applyRolePermissions = applyRolePermissions;
window.getAllUsers = getAllUsers;
window.renderUsersPage = renderUsersPage;
window.showAddUserModal = showAddUserModal;
window.saveNewUser = saveNewUser;
window.editUser = editUser;
window.saveUserEdit = saveUserEdit;
window.deleteUser = deleteUser;
window.logUserAction = logUserAction;
window.syncUsersToIndexedDB = syncUsersToIndexedDB;
window.restoreUsersFromIndexedDB = restoreUsersFromIndexedDB;
window.getAuditLog = getAuditLog;

// ============ عرض سجل العمليات ============
async function showAuditLog() {
  var logs = getAuditLog();
  logs.sort(function(a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  
  var html = '';
  
  if (logs.length === 0) {
    html = '<div class="text-center text-muted py-4">' +
      '<i class="bi bi-clock-history" style="font-size:3rem;opacity:.3"></i>' +
      '<div class="mt-2">لا توجد سجلات بعد</div>' +
      '</div>';
  } else {
    html += '<div class="alert alert-info py-2 small mb-3">' +
      '<i class="bi bi-info-circle"></i> آخر ' + Math.min(logs.length, 100) + ' عملية' +
      '</div>';
    
    var limit = Math.min(logs.length, 100);
    for (var i = 0; i < limit; i++) {
      var log = logs[i];
      var d = new Date(log.timestamp);
      var dateStr = d.toLocaleDateString('ar-EG') + ' ' + 
        d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
      
      html += '<div class="card mb-2 p-2">' +
        '<div class="d-flex justify-content-between align-items-center mb-1">' +
        '<strong class="small">' + escapeHtml(log.fullName || log.user) + '</strong>' +
        '<span class="text-muted" style="font-size:10px;">' + dateStr + '</span>' +
        '</div>' +
        '<div class="small text-muted">@' + escapeHtml(log.user) + '</div>' +
        '<div class="small mt-1">' + escapeHtml(log.action) + 
        (log.details ? '<br><span class="text-muted">' + escapeHtml(log.details) + '</span>' : '') +
        '</div>' +
        '</div>';
    }
  }
  
  showInfoModal(html, '📋 سجل العمليات');
}

window.showAuditLog = showAuditLog;
