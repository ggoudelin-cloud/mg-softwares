/**
 * MG Softwares — Bannière de consentement cookies (RGPD / ePrivacy)
 * Google Analytics n'est chargé qu'après consentement explicite.
 * Intègre le sélecteur de langue i18n si disponible.
 */
(function () {
  'use strict';

  const GA_ID = 'G-NQP91KFD54';
  const STORAGE_KEY = 'mgs_cookie_consent';
  const CONSENT_VERSION = '1';

  /* ── Charger Google Analytics ── */
  function loadGA() {
    if (window._gaLoaded) return;
    window._gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  /* ── Consentement ── */
  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (obj.version !== CONSENT_VERSION) return null;
      return obj.value;
    } catch (e) { return null; }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: value, version: CONSENT_VERSION, date: new Date().toISOString() }));
    } catch (e) {}
  }

  /* ── Traductions de la bannière ── */
  function t(key) {
    if (window._mgsI18n) return window._mgsI18n.t(key);
    var fallback = {
      'cookie.title':  'Ce site utilise des cookies d\'analyse',
      'cookie.text':   'Nous utilisons <strong>Google Analytics</strong> pour mesurer l\'audience (pages visitées, durée, pays). GA4 ne stocke pas les adresses IP. Aucune donnée n\'est vendue.<br><br>Votre choix est sauvegardé localement.',
      'cookie.more':   'En savoir plus →',
      'cookie.accept': '✓ Accepter les statistiques',
      'cookie.refuse': '✕ Refuser',
    };
    return fallback[key] || key;
  }

  /* ── Styles ── */
  function injectStyles() {
    if (document.getElementById('mgs-consent-styles')) return;
    var style = document.createElement('style');
    style.id = 'mgs-consent-styles';
    style.textContent = `
      #mgs-consent-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;padding:0 0 32px;animation:mgs-fade-in .25s ease;}
      @keyframes mgs-fade-in{from{opacity:0}to{opacity:1}}
      #mgs-consent-box{background:#16161f;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px 32px;max-width:700px;width:calc(100% - 32px);box-shadow:0 24px 80px rgba(0,0,0,0.6);animation:mgs-slide-up .3s ease;}
      @keyframes mgs-slide-up{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
      #mgs-consent-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:12px;flex-wrap:wrap;}
      #mgs-consent-header h2{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:1rem;font-weight:800;color:#f0f0f8;margin:0;letter-spacing:-.01em;}
      #mgs-consent-icon{font-size:22px;margin-right:8px;}
      .mgs-consent-title-row{display:flex;align-items:center;}
      #mgs-consent-box p{font-size:.875rem;color:#8888aa;line-height:1.6;margin:0 0 20px;}
      #mgs-consent-box p a{color:#9b5dff;text-decoration:none;}
      #mgs-consent-box p a:hover{text-decoration:underline;}
      #mgs-consent-btns{display:flex;gap:10px;flex-wrap:wrap;}
      .mgs-btn{display:inline-flex;align-items:center;gap:6px;padding:11px 22px;border-radius:12px;font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:.875rem;font-weight:700;cursor:pointer;border:none;transition:opacity .2s,transform .15s;white-space:nowrap;}
      .mgs-btn:hover{transform:translateY(-1px);}
      .mgs-btn-accept{background:#9b5dff;color:#fff;}
      .mgs-btn-accept:hover{opacity:.88;}
      .mgs-btn-refuse{background:transparent;color:#8888aa;border:1px solid rgba(255,255,255,0.1);}
      .mgs-btn-refuse:hover{color:#f0f0f8;border-color:rgba(255,255,255,0.25);}
      @media(max-width:480px){#mgs-consent-box{padding:20px 16px;}#mgs-consent-btns{flex-direction:column;}.mgs-btn{justify-content:center;}}
    `;
    document.head.appendChild(style);
  }

  /* ── Afficher la bannière ── */
  var _overlay = null;

  function showBanner() {
    injectStyles();

    _overlay = document.createElement('div');
    _overlay.id = 'mgs-consent-overlay';

    _overlay.innerHTML = `
      <div id="mgs-consent-box" role="dialog" aria-modal="true">
        <div id="mgs-consent-header">
          <div class="mgs-consent-title-row">
            <span id="mgs-consent-icon">🍪</span>
            <h2 id="mgs-consent-title">${t('cookie.title')}</h2>
          </div>
          <div id="mgs-consent-lang-slot"></div>
        </div>
        <p id="mgs-consent-text">${t('cookie.text')} <a href="privacy.html" target="_blank" rel="noopener" onclick="event.stopPropagation()">${t('cookie.more')}</a></p>
        <div id="mgs-consent-btns">
          <button class="mgs-btn mgs-btn-accept" id="mgs-btn-accept">${t('cookie.accept')}</button>
          <button class="mgs-btn mgs-btn-refuse" id="mgs-btn-refuse">${t('cookie.refuse')}</button>
        </div>
      </div>
    `;

    document.body.appendChild(_overlay);

    /* Injecter le sélecteur de langue si i18n est dispo */
    injectLangPickerInBanner();

    function close(value) {
      setConsent(value);
      _overlay.style.animation = 'mgs-fade-in .2s ease reverse';
      setTimeout(function () { if (_overlay) _overlay.remove(); _overlay = null; }, 200);
      if (value === 'accepted') loadGA();
    }

    document.getElementById('mgs-btn-accept').addEventListener('click', function () { close('accepted'); });
    document.getElementById('mgs-btn-refuse').addEventListener('click', function () { close('refused'); });
    document.getElementById('mgs-btn-accept').focus();
  }

  /* ── Injecter le picker de langue dans la bannière ── */
  function injectLangPickerInBanner() {
    var slot = document.getElementById('mgs-consent-lang-slot');
    if (!slot) return;
    if (window._mgsI18n && typeof window._mgsI18n.getLang === 'function') {
      /* Créer un mini picker inline */
      var langs = [
        { code:'fr', flag:'🇫🇷' },
        { code:'en', flag:'🇬🇧' },
        { code:'it', flag:'🇮🇹' },
        { code:'de', flag:'🇩🇪' },
      ];
      var style = document.createElement('style');
      style.textContent = `
        .mgs-consent-flags{display:flex;gap:4px;align-items:center;}
        .mgs-consent-flag{font-size:1.15rem;cursor:pointer;opacity:0.45;transition:opacity .15s,transform .15s;border:none;background:transparent;padding:2px;}
        .mgs-consent-flag:hover{opacity:1;transform:scale(1.15);}
        .mgs-consent-flag.active{opacity:1;}
      `;
      document.head.appendChild(style);

      var wrap = document.createElement('div');
      wrap.className = 'mgs-consent-flags';
      var currentLang = window._mgsI18n.getLang();

      langs.forEach(function(l) {
        var btn = document.createElement('button');
        btn.className = 'mgs-consent-flag' + (l.code === currentLang ? ' active' : '');
        btn.title = l.code.toUpperCase();
        btn.textContent = l.flag;
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          window._mgsI18n.setLang(l.code);
          /* Les pickers de la page se rechargent via i18n, on met à jour la bannière */
          updateBannerTexts();
          wrap.querySelectorAll('.mgs-consent-flag').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
        wrap.appendChild(btn);
      });
      slot.appendChild(wrap);
    }
  }

  /* ── Mettre à jour les textes de la bannière après changement de langue ── */
  function updateBannerTexts() {
    var title = document.getElementById('mgs-consent-title');
    var text = document.getElementById('mgs-consent-text');
    var btnAccept = document.getElementById('mgs-btn-accept');
    var btnRefuse = document.getElementById('mgs-btn-refuse');
    if (title) title.textContent = t('cookie.title');
    if (text) text.innerHTML = t('cookie.text') + ' <a href="privacy.html" target="_blank" rel="noopener" onclick="event.stopPropagation()">' + t('cookie.more') + '</a>';
    if (btnAccept) btnAccept.textContent = t('cookie.accept');
    if (btnRefuse) btnRefuse.textContent = t('cookie.refuse');
  }

  /* Exposer pour i18n.js */
  window._mgsUpdateCookieBanner = function(lang) {
    updateBannerTexts();
  };

  /* ── Init ── */
  function init() {
    var consent = getConsent();
    if (consent === 'accepted') {
      loadGA();
    } else if (consent === null) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBanner);
      } else {
        showBanner();
      }
    }
  }

  init();
})();
