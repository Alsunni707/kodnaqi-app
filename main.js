const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

function getIndexPath() {
  const candidates = [
    path.join(__dirname, 'www', 'index.html'),
    path.join(__dirname, 'index.html')
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || candidates[0];
}

function getIconPath() {
  const candidates = [
    path.join(__dirname, 'www', 'logo.png'),
    path.join(__dirname, 'logo.png'),
    path.join(__dirname, 'www', 'icon-512.png'),
    path.join(__dirname, 'icon-512.png')
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 900,
    minHeight: 700,
    show: false,
    backgroundColor: '#0f172a',
    icon: getIconPath(),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile(getIndexPath());
  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ═══════════════════════════════════════════════════
// 🔄 التحديث التلقائي لـ Windows
// ═══════════════════════════════════════════════════
const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');

// التحقق من التحديثات عند بدء التشغيل
app.whenReady().then(() => {
  // التحقق من التحديثات (كل 4 ساعات)
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 4 * 60 * 60 * 1000);
  
  autoUpdater.checkForUpdates();
});

// عند وجود تحديث
autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'تحديث جديد متاح',
    message: 'يوجد إصدار جديد من KodNaqi. هل تريد تحميله الآن؟',
    buttons: ['نعم', 'لاحقاً']
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

// عند تحميل التحديث
autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'جاهز للتثبيت',
    message: 'تم تحميل التحديث. هل تريد إعادة تشغيل التطبيق الآن؟',
    buttons: ['إعادة تشغيل', 'لاحقاً']
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

// خطأ في التحديث
autoUpdater.on('error', (err) => {
  console.error('Update error:', err);
});
