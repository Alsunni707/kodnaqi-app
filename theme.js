/*!
 * KodNaqi — منطق التصميم الذكي
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 */

(function() {
  'use strict';

  const THEME_KEY = 'kodnaqi_theme';
  const COLOR_KEY = 'kodnaqi_color_theme';

  const PRESET_THEMES = {
    navy: { name: 'الأزرق الكلاسيكي', primary: '#0d3b66', primaryDark: '#082844', primaryLight: '#1e6091', accent: '#c9a227', accentLight: '#e5c668' },
    emerald: { name: 'الأخضر الزمردي', primary: '#047857', primaryDark: '#064e3b', primaryLight: '#10b981', accent: '#f59e0b', accentLight: '#fbbf24' },
    royal: { name: 'البنفسجي الملكي', primary: '#6d28d9', primaryDark: '#5b21b6', primaryLight: '#8b5cf6', accent: '#f59e0b', accentLight: '#fbbf24' },
    maroon: { name: 'العنابي الفاخر', primary: '#991b1b', primaryDark: '#7f1d1d', primaryLight: '#dc2626', accent: '#eab308', accentLight: '#facc15' },
    teal: { name: 'الفيروزي', primary: '#0f766e', primaryDark: '#115e59', primaryLight: '#14b8a6', accent: '#f97316', accentLight: '#fb923c' },
    slate: { name: 'الرمادي العصري', primary: '#334155', primaryDark: '#1e293b', primaryLight: '#64748b', accent: '#0ea5e9', accentLight: '#38bdf8' }
  };

  function getThemePreference() { return localStorage.getItem(THEME_KEY) || 'auto'; }

  function setThemePreference(pref) {
    localStorage.setItem(THEME_KEY, pref);
    applyTheme(pref);
  }

  function applyTheme(pref) {
    document.documentElement.setAttribute('data-theme', pref);
    document.body.classList.remove('dark-mode');
    if (pref === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (pref === 'auto') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
      }
    }
    updateToggleIcon();
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    setThemePreference(isDark ? 'light' : 'dark');
    showToast(isDark ? '☀️ الوضع النهاري' : '🌙 الوضع الليلي');
  }

  function updateToggleIcon() {
    const btn = document.getElementById('kn-theme-toggle');
    if (!btn) return;
    const isDark = document.body.classList.contains('dark-mode');
    btn.innerHTML = isDark ? '☀️' : '🌙';
    btn.title = isDark ? 'التبديل للنهاري' : 'التبديل لليلي';
  }

  function getColorTheme() { return localStorage.getItem(COLOR_KEY) || 'navy'; }

  function applyColorTheme(themeName) {
    const theme = PRESET_THEMES[themeName] || PRESET_THEMES.navy;
    const root = document.documentElement;
    root.style.setProperty('--kn-primary', theme.primary);
    root.style.setProperty('--kn-primary-dark', theme.primaryDark);
    root.style.setProperty('--kn-primary-light', theme.primaryLight);
    root.style.setProperty('--kn-accent', theme.accent);
    root.style.setProperty('--kn-accent-light', theme.accentLight);
    localStorage.setItem(COLOR_KEY, themeName);
    updateThemeColorMeta(theme.primary);
  }

  function applyCustomColors(primary, accent) {
    const root = document.documentElement;
    root.style.setProperty('--kn-primary', primary);
    root.style.setProperty('--kn-accent', accent);
    root.style.setProperty('--kn-primary-dark', adjustColor(primary, -15));
    root.style.setProperty('--kn-primary-light', adjustColor(primary, 15));
    root.style.setProperty('--kn-accent-light', adjustColor(accent, 15));
    localStorage.setItem(COLOR_KEY, 'custom');
    localStorage.setItem('kodnaqi_custom_colors', JSON.stringify({ primary, accent }));
    updateThemeColorMeta(primary);
  }

  function updateThemeColorMeta(color) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = color;
  }

  function adjustColor(hex, percent) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const adj = Math.round(2.55 * percent);
    const nr = Math.max(0, Math.min(255, r + adj));
    const ng = Math.max(0, Math.min(255, g + adj));
    const nb = Math.max(0, Math.min(255, b + adj));
    return '#' + [nr, ng, nb].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  function showToast(msg, duration) {
    duration = duration || 2000;
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--kn-text);color:var(--kn-surface);padding:10px 20px;border-radius:25px;font-size:0.9rem;font-weight:700;z-index:99999;box-shadow:0 5px 20px rgba(0,0,0,0.3);';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  function createToggleButton() {
    if (document.getElementById('kn-theme-toggle')) return;
    const btn = document.createElement('button');
    btn.id = 'kn-theme-toggle';
    btn.className = 'kn-theme-toggle';
    btn.onclick = toggleTheme;
    btn.title = 'التبديل للوضع الليلي';
    document.body.appendChild(btn);
    updateToggleIcon();
  }

  function showColorCustomizer() {
    const current = getColorTheme();
    const custom = JSON.parse(localStorage.getItem('kodnaqi_custom_colors') || '{}');
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Cairo,sans-serif;';
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };

    let themesHtml = '';
    for (const [key, t] of Object.entries(PRESET_THEMES)) {
      const isActive = key === current;
      themesHtml += '<button onclick="KNTheme.selectTheme(\'' + key + '\')" style="background:' + t.primary + ';color:white;border:' + (isActive ? '3px solid ' + t.accent : '3px solid transparent') + ';border-radius:10px;padding:12px 8px;cursor:pointer;font-size:0.75rem;font-weight:700;width:100%;">' + t.name + '</button>';
    }

    overlay.innerHTML = '<div style="background:var(--kn-surface);border-radius:15px;padding:25px;max-width:500px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.5);color:var(--kn-text);">' +
      '<h3 style="color:var(--kn-primary);margin:0 0 20px;text-align:center;">🎨 تخصيص المظهر</h3>' +
      '<h5 style="color:var(--kn-primary);margin-bottom:10px;">الوضع:</h5>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:25px;">' +
        '<button onclick="KNTheme.setTheme(\'light\')" style="padding:10px;border-radius:8px;border:1px solid var(--kn-border);background:var(--kn-surface-alt);color:var(--kn-text);cursor:pointer;">☀️ نهاري</button>' +
        '<button onclick="KNTheme.setTheme(\'dark\')" style="padding:10px;border-radius:8px;border:1px solid var(--kn-border);background:var(--kn-surface-alt);color:var(--kn-text);cursor:pointer;">🌙 ليلي</button>' +
        '<button onclick="KNTheme.setTheme(\'auto\')" style="padding:10px;border-radius:8px;border:1px solid var(--kn-border);background:var(--kn-surface-alt);color:var(--kn-text);cursor:pointer;">🔄 تلقائي</button>' +
      '</div>' +
      '<h5 style="color:var(--kn-primary);margin-bottom:10px;">الثيمات الجاهزة:</h5>' +
      '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:25px;">' + themesHtml + '</div>' +
      '<h5 style="color:var(--kn-primary);margin-bottom:10px;">ألوان مخصصة:</h5>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px;">' +
        '<div><label style="display:block;font-size:0.8rem;color:var(--kn-text-muted);margin-bottom:5px;">اللون الأساسي</label><input type="color" id="kn-custom-primary" value="' + (custom.primary || '#0d3b66') + '" style="width:100%;height:45px;border-radius:8px;border:1px solid var(--kn-border);cursor:pointer;"></div>' +
        '<div><label style="display:block;font-size:0.8rem;color:var(--kn-text-muted);margin-bottom:5px;">اللون المميّز</label><input type="color" id="kn-custom-accent" value="' + (custom.accent || '#c9a227') + '" style="width:100%;height:45px;border-radius:8px;border:1px solid var(--kn-border);cursor:pointer;"></div>' +
      '</div>' +
      '<button onclick="KNTheme.applyCustom()" style="width:100%;padding:12px;border-radius:10px;border:none;background:var(--kn-primary);color:white;font-weight:700;cursor:pointer;margin-bottom:10px;">✨ تطبيق الألوان المخصصة</button>' +
      '<button onclick="this.closest(\'div\').parentElement.remove()" style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--kn-border);background:transparent;color:var(--kn-text);font-weight:700;cursor:pointer;">إغلاق</button>' +
    '</div>';

    document.body.appendChild(overlay);
  }

  window.KNTheme = {
    setTheme: setThemePreference,
    getTheme: getThemePreference,
    toggle: toggleTheme,
    selectTheme: function(name) {
      applyColorTheme(name);
      showToast('🎨 تم تطبيق: ' + PRESET_THEMES[name].name);
    },
    applyCustom: function() {
      const primary = document.getElementById('kn-custom-primary').value;
      const accent = document.getElementById('kn-custom-accent').value;
      applyCustomColors(primary, accent);
      showToast('✨ تم تطبيق الألوان المخصصة');
    },
    showCustomizer: showColorCustomizer,
    showToast: showToast,
    getThemes: function() { return PRESET_THEMES; }
  };

  function init() {
    applyTheme(getThemePreference());
    const colorTheme = getColorTheme();
    if (colorTheme === 'custom') {
      const custom = JSON.parse(localStorage.getItem('kodnaqi_custom_colors') || '{}');
      if (custom.primary && custom.accent) {
        applyCustomColors(custom.primary, custom.accent);
      }
    } else {
      applyColorTheme(colorTheme);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createToggleButton);
    } else {
      createToggleButton();
    }
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (getThemePreference() === 'auto') applyTheme('auto');
      });
    }
  }

  init();
  console.log('🎨 KodNaqi Theme System loaded');
})();
