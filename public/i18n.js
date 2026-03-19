/* ═══════════════════════════════════════════════════════════════
   NOODROP — i18n.js  v1.0
   Auto-translation via IP geolocation + JSON locale files.
   Supported: en (default), de, pt
   Usage: include this script on any page, then call
          window.i18n.translate() after DOM is ready, or
          annotate elements with data-i18n="key.path"
═══════════════════════════════════════════════════════════════ */

(function (global) {

  /* ── Config ── */
  var SUPPORTED   = ['en', 'de', 'pt'];
  var DEFAULT     = 'en';
  var STORAGE_KEY = 'nd_lang';
  var LOCALES_DIR = '/locales/';   // path relative to site root

  /* ── Country → language map ── */
  var COUNTRY_LANG = {
    // German-speaking
    DE: 'de', AT: 'de', CH: 'de', LI: 'de', LU: 'de',
    // Portuguese-speaking
    PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt',
    GW: 'pt', ST: 'pt', TL: 'pt'
    // Everything else → 'en'
  };

  /* ── State ── */
  var _locale = {};
  var _lang   = DEFAULT;
  var _ready  = false;
  var _queue  = [];   // callbacks waiting for locale to load

  /* ────────────────────────────────────────
     1. DETECT LANGUAGE
  ──────────────────────────────────────── */
  function detectLang(cb) {
    // 1a. Manual override stored in localStorage
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) {
      return cb(stored);
    }

    // 1b. Browser language as fast fallback (no network needed)
    var browserLang = (navigator.language || navigator.userLanguage || 'en')
      .split('-')[0].toLowerCase();
    var browserResult = SUPPORTED.indexOf(browserLang) !== -1 ? browserLang : DEFAULT;

    // 1c. IP geolocation via ipapi.co (1000 req/day free, no key needed)
    var apiUrl = 'https://ipapi.co/json/';
    var done = false;

    // Timeout: if IP API takes > 1.5s, use browser fallback immediately
    var timeout = setTimeout(function () {
      if (!done) { done = true; cb(browserResult); }
    }, 1500);

    fetch(apiUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (done) return;
        done = true;
        clearTimeout(timeout);
        var country = (data.country_code || '').toUpperCase();
        var lang    = COUNTRY_LANG[country] || DEFAULT;
        cb(lang);
      })
      .catch(function () {
        if (done) return;
        done = true;
        clearTimeout(timeout);
        cb(browserResult);
      });
  }

  /* ────────────────────────────────────────
     2. LOAD LOCALE JSON
  ──────────────────────────────────────── */
  function loadLocale(lang, cb) {
    if (lang === _lang && _ready) { return cb(_locale); }

    fetch(LOCALES_DIR + lang + '.json?v=1')
      .then(function (r) {
        if (!r.ok) throw new Error('Locale not found: ' + lang);
        return r.json();
      })
      .then(function (data) {
        _locale = data;
        _lang   = lang;
        _ready  = true;
        cb(data);
      })
      .catch(function (err) {
        console.warn('[i18n] Could not load locale "' + lang + '":', err);
        // Fall back to English
        if (lang !== DEFAULT) {
          loadLocale(DEFAULT, cb);
        } else {
          _ready = true;
          cb({});
        }
      });
  }

  /* ────────────────────────────────────────
     3. GET NESTED KEY  (e.g. "blog.h1Line1")
  ──────────────────────────────────────── */
  function t(key, fallback) {
    if (!key) return fallback || '';
    var parts = key.split('.');
    var val   = _locale;
    for (var i = 0; i < parts.length; i++) {
      if (val == null) return fallback || key;
      val = val[parts[i]];
    }
    return (val != null && val !== '') ? String(val) : (fallback || key);
  }

  /* ────────────────────────────────────────
     4. TRANSLATE DOM
     Elements with data-i18n="key" get their
     textContent replaced.
     Elements with data-i18n-placeholder="key"
     get their placeholder replaced.
     Elements with data-i18n-html="key" get
     their innerHTML replaced (for bold etc).
  ──────────────────────────────────────── */
  function translateDOM() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val !== key) el.textContent = val;
    });

    // Placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = t(key);
      if (val !== key) el.placeholder = val;
    });

    // Inner HTML (safe — only used for our own locale strings)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var val = t(key);
      if (val !== key) el.innerHTML = val;
    });

    // Update <html lang="..">
    document.documentElement.lang = _lang;

    // Fire custom event so pages can react
    document.dispatchEvent(new CustomEvent('nd:translated', { detail: { lang: _lang } }));
  }

  /* ────────────────────────────────────────
     5. LANGUAGE SWITCHER UI
     Injects a small flag-picker into the
     header's .nd-header__right (or wherever
     #i18n-switcher-anchor is placed).
  ──────────────────────────────────────── */
  var LANG_META = {
    en: { flag: '🇬🇧', label: 'EN' },
    de: { flag: '🇩🇪', label: 'DE' },
    pt: { flag: '🇧🇷', label: 'PT' }
  };

  function buildSwitcher() {
    // Don't build twice
    if (document.getElementById('nd-lang-switcher')) return;

    var anchor = document.getElementById('i18n-switcher-anchor')
               || document.querySelector('.nd-header__right');
    if (!anchor) return;

    var wrap = document.createElement('div');
    wrap.id = 'nd-lang-switcher';
    wrap.style.cssText = [
      'display:flex', 'align-items:center', 'gap:2px',
      'position:relative', 'font-family:inherit'
    ].join(';');

    SUPPORTED.forEach(function (lang) {
      var meta = LANG_META[lang];
      var btn  = document.createElement('button');
      btn.setAttribute('data-lang', lang);
      btn.setAttribute('aria-label', 'Switch to ' + lang.toUpperCase());
      btn.style.cssText = [
        'background:none', 'border:none', 'cursor:pointer',
        'font-size:13px', 'font-weight:400', 'letter-spacing:.04em',
        'padding:4px 7px', 'border-radius:6px',
        'color:rgba(245,240,232,.4)',
        'transition:color .15s, background .15s',
        'font-family:inherit', 'line-height:1'
      ].join(';');
      btn.textContent = meta.flag + '\u00A0' + meta.label;

      // Active state
      if (lang === _lang) {
        btn.style.color = 'var(--orange, #E8541A)';
        btn.style.background = 'rgba(232,84,26,.1)';
      }

      btn.addEventListener('mouseenter', function () {
        if (lang !== _lang) btn.style.color = 'rgba(245,240,232,.75)';
      });
      btn.addEventListener('mouseleave', function () {
        if (lang !== _lang) btn.style.color = 'rgba(245,240,232,.4)';
      });

      btn.addEventListener('click', function () {
        if (lang === _lang) return;
        setLang(lang);
      });

      wrap.appendChild(btn);
    });

    // Insert before the first child of anchor
    anchor.insertBefore(wrap, anchor.firstChild);
  }

  function updateSwitcherActive() {
    var switcher = document.getElementById('nd-lang-switcher');
    if (!switcher) return;
    switcher.querySelectorAll('button').forEach(function (btn) {
      var l = btn.getAttribute('data-lang');
      if (l === _lang) {
        btn.style.color = 'var(--orange, #E8541A)';
        btn.style.background = 'rgba(232,84,26,.1)';
      } else {
        btn.style.color = 'rgba(245,240,232,.4)';
        btn.style.background = 'none';
      }
    });
  }

  /* ────────────────────────────────────────
     6. PUBLIC API
  ──────────────────────────────────────── */

  /* Set language manually */
  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;
    localStorage.setItem(STORAGE_KEY, lang);
    loadLocale(lang, function () {
      translateDOM();
      updateSwitcherActive();
    });
  }

  /* Call this once per page after DOM is interactive */
  function init() {
    detectLang(function (lang) {
      loadLocale(lang, function () {
        translateDOM();
        buildSwitcher();
        // Flush any queued callbacks
        _queue.forEach(function (fn) { fn(_locale, t); });
        _queue = [];
      });
    });
  }

  /* Register a callback that fires once locale is loaded */
  function onReady(fn) {
    if (_ready) { fn(_locale, t); }
    else { _queue.push(fn); }
  }

  /* ── Expose ── */
  global.i18n = {
    init      : init,
    t         : t,
    setLang   : setLang,
    onReady   : onReady,
    getLang   : function () { return _lang; },
    supported : SUPPORTED
  };

})(window);
