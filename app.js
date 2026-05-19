// APP.JS - Single Page Application with IndexedDB + i18n
const app = {
  // Configuration
  config: {
    apiUrl: '/data/pages.json',
    dbName: 'MGSoftwaresDB',
    storeName: 'pages',
    cacheDuration: 24 * 60 * 60 * 1000, // 24 heures
    supportedLanguages: ['fr', 'en', 'it', 'de'],
    defaultLanguage: 'fr',
  },

  // Traductions
  translations: {
    'nav.gamiz': { fr: 'Gamiz', en: 'Gamiz', it: 'Gamiz', de: 'Gamiz' },
    'nav.autozen': { fr: 'AutoZen', en: 'AutoZen', it: 'AutoZen', de: 'AutoZen' },
    'nav.privacy': { fr: 'Confidentialité', en: 'Privacy', it: 'Privacy', de: 'Datenschutz' },
    'nav.terms': { fr: 'Conditions', en: 'Terms', it: 'Termini', de: 'Bedingungen' },

    'hero.title': { fr: 'Des applications <span class="grad">pensées pour vous</span>', en: 'Apps <span class="grad">designed for you</span>', it: 'App <span class="grad">pensate per voi</span>', de: 'Apps <span class="grad">für Sie gedacht</span>' },
    'hero.desc': { fr: 'Studio de développement indépendant français. Des applications utiles, rapides et élégantes.', en: 'Independent development studio. Useful, fast and elegant applications.', it: 'Studio di sviluppo indipendente. App utili, veloci ed eleganti.', de: 'Unabhängiges Entwicklungsstudio. Nützliche, schnelle und elegante Apps.' },

    'app.discover': { fr: 'Découvrir', en: 'Discover', it: 'Scopri', de: 'Entdecken' },
    'app.learnmore': { fr: 'En savoir plus', en: 'Learn more', it: 'Scopri di più', de: 'Mehr erfahren' },

    'apps.title': { fr: 'Nos Applications', en: 'Our Apps', it: 'Le nostre App', de: 'Unsere Apps' },

    'gamiz.title': { fr: '🎲 Gamiz', en: '🎲 Gamiz', it: '🎲 Gamiz', de: '🎲 Gamiz' },
    'gamiz.desc': { fr: 'Calculateur de scores pour jeux de société', en: 'Score tracker for board games', it: 'Calcolatore di punteggi per giochi da tavolo', de: 'Punkterechner für Brettspiele' },
    'gamiz.features': { fr: 'Skyjo, Qwirkle, Tarot, UNO, Yams et plus →', en: 'Skyjo, Qwirkle, Tarot, UNO, Yams and more →', it: 'Skyjo, Qwirkle, Tarot, UNO, Yams e altro →', de: 'Skyjo, Qwirkle, Tarot, UNO, Yams und mehr →' },

    'autozen.title': { fr: '🚗 AutoZen', en: '🚗 AutoZen', it: '🚗 AutoZen', de: '🚗 AutoZen' },
    'autozen.desc': { fr: 'Suivi automobile complet', en: 'Complete vehicle tracking', it: 'Monitoraggio completo del veicolo', de: 'Vollständige Fahrzeugverfolgung' },
    'autozen.features': { fr: 'Entretien, carburant, trajets →', en: 'Maintenance, fuel, trips →', it: 'Manutenzione, carburante, viaggi →', de: 'Wartung, Kraftstoff, Fahrten →' },

    'sync.title': { fr: 'Synchronisation Google Drive', en: 'Google Drive Sync', it: 'Sincronizzazione Google Drive', de: 'Google Drive-Synchronisierung' },
    'sync.desc': { fr: 'Vos données synchronisées automatiquement. Accessible sur tous vos appareils.', en: 'Your data synced automatically. Accessible on all your devices.', it: 'I tuoi dati sincronizzati automaticamente. Accessibile su tutti i tuoi dispositivi.', de: 'Ihre Daten werden automatisch synchronisiert. Auf allen Ihren Geräten zugänglich.' },
    'sync.features': { fr: '✅ Gratuit • ✅ Sécurisé • ✅ Open Source', en: '✅ Free • ✅ Secure • ✅ Open Source', it: '✅ Gratuito • ✅ Sicuro • ✅ Open Source', de: '✅ Kostenlos • ✅ Sicher • ✅ Open Source' },

    'product.download': { fr: 'Télécharger sur Google Play', en: 'Download on Google Play', it: 'Scarica da Google Play', de: 'Im Google Play laden' },
    'product.web': { fr: 'Version Web', en: 'Web Version', it: 'Versione Web', de: 'Web-Version' },

    'features.title': { fr: 'Fonctionnalités principales', en: 'Main Features', it: 'Funzionalità principali', de: 'Hauptmerkmale' },
    'features.sync': { fr: '✅ Synchronisation Google Drive', en: '✅ Google Drive Sync', it: '✅ Sincronizzazione Google Drive', de: '✅ Google Drive-Synchronisierung' },
    'features.auto': { fr: '✅ Sauvegarde automatique', en: '✅ Auto-backup', it: '✅ Backup automatico', de: '✅ Automatische Sicherung' },
    'features.ui': { fr: '✅ Interface intuitive', en: '✅ Intuitive interface', it: '✅ Interfaccia intuitiva', de: '✅ Intuitive Benutzeroberfläche' },
    'features.free': { fr: '✅ Gratuit et sans publicité', en: '✅ Free and ad-free', it: '✅ Gratuito senza annunci', de: '✅ Kostenlos und werbefrei' },
    'features.multi': { fr: '✅ Multi-plateforme', en: '✅ Multi-platform', it: '✅ Multi-piattaforma', de: '✅ Multiplattform' },
    'features.history': { fr: '✅ Historique complet', en: '✅ Full history', it: '✅ Cronologia completa', de: '✅ Vollständiger Verlauf' },

    'ready.title': { fr: 'Prêt à essayer ?', en: 'Ready to try?', it: 'Pronto a provare?', de: 'Bereit zum Testen?' },
    'ready.btn': { fr: 'Télécharger gratuitement →', en: 'Download for free →', it: 'Scarica gratuitamente →', de: 'Kostenlos herunterladen →' },

    'legal.privacy.title': { fr: 'Politique de Confidentialité', en: 'Privacy Policy', it: 'Informativa sulla Privacy', de: 'Datenschutzrichtlinie' },
    'legal.privacy.updated': { fr: 'Dernière mise à jour :', en: 'Last updated:', it: 'Ultimo aggiornamento:', de: 'Zuletzt aktualisiert:' },
    'legal.terms.title': { fr: 'Conditions d\'Utilisation', en: 'Terms of Use', it: 'Termini di Utilizzo', de: 'Nutzungsbedingungen' },

    'error.loading': { fr: 'Erreur lors du chargement', en: 'Loading error', it: 'Errore di caricamento', de: 'Ladefehler' },
    'error.notfound': { fr: 'Page non trouvée', en: 'Page not found', it: 'Pagina non trovata', de: 'Seite nicht gefunden' },
    'error.notfound.desc': { fr: 'La page que vous recherchez n\'existe pas.', en: 'The page you are looking for does not exist.', it: 'La pagina che stai cercando non esiste.', de: 'Die gesuchte Seite existiert nicht.' },
    'error.back': { fr: 'Retour à l\'accueil', en: 'Back to home', it: 'Torna a casa', de: 'Zur Startseite' },
  },

  // État
  state: {
    pages: [],
    currentPage: null,
    db: null,
    language: 'fr',
  },

  // Initialiser l'app
  async init() {
    try {
      // Charger la langue sauvegardée
      this.state.language = localStorage.getItem('mgs_lang') || this.config.defaultLanguage;

      // Initialiser IndexedDB
      await this.initDB();

      // Charger les pages
      await this.loadPages();

      // Mettre à jour le sélecteur de langue
      this.updateLanguageSelector();

      // Charger la page actuelle
      this.loadPage();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      this.renderError(this.t('error.loading'));
    }
  },

  // Fonction de traduction
  t(key, fallback = null) {
    if (this.translations[key] && this.translations[key][this.state.language]) {
      return this.translations[key][this.state.language];
    }
    if (this.translations[key] && this.translations[key]['fr']) {
      return this.translations[key]['fr']; // Fallback français
    }
    return fallback || key;
  },

  // Changer la langue
  setLanguage(lang) {
    if (this.config.supportedLanguages.includes(lang)) {
      this.state.language = lang;
      localStorage.setItem('mgs_lang', lang);
      this.updateLanguageSelector();
      this.loadPage(); // Recharger la page avec la nouvelle langue
    }
  },

  // Mettre à jour le sélecteur de langue
  updateLanguageSelector() {
    const selector = document.getElementById('langSelector');
    if (selector) {
      selector.value = this.state.language;
    }
  },

  // Initialiser IndexedDB
  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.state.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.config.storeName)) {
          db.createObjectStore(this.config.storeName, { keyPath: 'slug' });
        }
      };
    });
  },

  // Charger les pages
  async loadPages() {
    try {
      const cached = await this.getFromDB('pages');
      if (cached && Date.now() - cached.timestamp < this.config.cacheDuration) {
        this.state.pages = cached.data;
        return;
      }

      const response = await fetch(this.config.apiUrl);
      if (!response.ok) throw new Error('Erreur réseau');

      const data = await response.json();
      this.state.pages = data.pages || [];

      await this.saveToDB('pages', {
        slug: 'pages',
        data: this.state.pages,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Erreur lors du chargement des pages:', error);
      throw error;
    }
  },

  // Charger la page actuelle
  loadPage() {
    const slug = this.getCurrentSlug();
    const page = this.state.pages.find((p) => p.slug === slug);

    if (!page) {
      this.renderNotFound();
      return;
    }

    this.state.currentPage = page;
    this.updateMetaTags(page);
    this.renderPage(page);
  },

  // Obtenir le slug actuel
  getCurrentSlug() {
    let pathname = window.location.pathname;
    let search = window.location.search;

    if (search.includes('/?/')) {
      pathname = search.split('/?/')[1];
      pathname = pathname.replace(/~and~/g, '&');
      if (pathname.includes('&')) {
        pathname = pathname.split('&')[0];
      }
    }

    pathname = pathname.replace(/^\/|\/$/g, '');
    pathname = pathname.replace(/\.html$/, '');

    return pathname;
  },

  // Naviguer
  navigate(slug) {
    const basePath = '/';
    const newPath = slug ? `${basePath}${slug}/` : basePath;
    window.history.pushState({ slug }, '', newPath);
    this.loadPage();
  },

  // Mettre à jour meta tags
  updateMetaTags(page) {
    document.title = page.title;
    document.getElementById('pageTitle').textContent = page.title;

    const descMeta = document.getElementById('pageDesc');
    descMeta.setAttribute('content', page.description || '');

    const keywordsMeta = document.getElementById('pageKeywords');
    keywordsMeta.setAttribute('content', page.keywords || '');

    const canonical = document.getElementById('canonical');
    canonical.setAttribute('href', page.canonical || `https://mg-softwares.fr/${page.slug}`);

    document.getElementById('ogTitle').setAttribute('content', page.title);
    document.getElementById('ogDesc').setAttribute('content', page.description || '');
    document.getElementById('ogUrl').setAttribute('content', page.canonical || `https://mg-softwares.fr/${page.slug}`);
    if (page.ogImage) {
      document.getElementById('ogImage').setAttribute('content', page.ogImage);
    }

    document.getElementById('twitterTitle').setAttribute('content', page.title);
    document.getElementById('twitterDesc').setAttribute('content', page.description || '');

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': page.title,
      'description': page.description,
      'url': page.canonical || `https://mg-softwares.fr/${page.slug}`,
      'publisher': {
        '@type': 'Organization',
        'name': 'MG Softwares',
      },
    };

    const jsonldScript = document.getElementById('jsonld');
    jsonldScript.textContent = JSON.stringify(schema);
  },

  // Rendre la page
  renderPage(page) {
    const app = document.getElementById('app');

    if (page.type === 'home') {
      app.innerHTML = this.renderHome();
    } else if (page.type === 'product') {
      app.innerHTML = this.renderProduct(page);
    } else if (page.type === 'legal') {
      app.innerHTML = this.renderLegal(page);
    } else {
      this.renderNotFound();
    }
  },

  // Template: Home
  renderHome() {
    return `
      <div class="page-content">
        <section class="hero">
          <span class="eyebrow">🚀 APPLICATIONS MOBILES & WEB</span>
          <h1 class="hero-title">${this.t('hero.title')}</h1>
          <p class="hero-sub">${this.t('hero.desc')}</p>
          <div>
            <button class="btn-primary" onclick="app.navigate('gamiz')">
              ${this.t('app.discover')} Gamiz →
            </button>
            <button class="btn-secondary" onclick="app.navigate('autozen')">
              ${this.t('app.discover')} AutoZen
            </button>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px; background: rgba(255,255,255,0.02); border-top: 1px solid var(--bd);">
          <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2rem; margin-bottom: 40px;">${this.t('apps.title')}</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
              <div style="background: var(--gl); border: 1px solid var(--bd); border-radius: 20px; padding: 40px; cursor: pointer; transition: all 0.3s;" onclick="app.navigate('gamiz')">
                <h3 style="font-size: 1.5rem; margin-bottom: 10px;">${this.t('gamiz.title')}</h3>
                <p style="color: var(--tx2); margin-bottom: 20px;">${this.t('gamiz.desc')}</p>
                <p style="font-size: 0.9rem; color: var(--tx3);">${this.t('gamiz.features')}</p>
              </div>
              <div style="background: var(--gl); border: 1px solid var(--bd); border-radius: 20px; padding: 40px; cursor: pointer; transition: all 0.3s;" onclick="app.navigate('autozen')">
                <h3 style="font-size: 1.5rem; margin-bottom: 10px;">${this.t('autozen.title')}</h3>
                <p style="color: var(--tx2); margin-bottom: 20px;">${this.t('autozen.desc')}</p>
                <p style="font-size: 0.9rem; color: var(--tx3);">${this.t('autozen.features')}</p>
              </div>
            </div>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">${this.t('sync.title')}</h2>
            <p style="color: var(--tx2); font-size: 1.1rem; margin-bottom: 30px;">
              ${this.t('sync.desc')}
            </p>
            <p style="font-size: 0.9rem; color: var(--tx3);">
              ${this.t('sync.features')}
            </p>
          </div>
        </section>
      </div>
    `;
  },

  // Template: Product
  renderProduct(page) {
    const isGamiz = page.slug === 'gamiz';
    const title = isGamiz ? this.t('gamiz.title') : this.t('autozen.title');
    const description = isGamiz ? this.t('gamiz.desc') : this.t('autozen.desc');

    return `
      <div class="page-content">
        <section class="hero">
          <h1 class="hero-title">${title}</h1>
          <p class="hero-sub">${description}</p>
          <div>
            <button class="btn-primary" onclick="window.open('https://play.google.com/store/apps', '_blank')">
              ${this.t('product.download')}
            </button>
            <button class="btn-secondary" onclick="window.open('https://mg-softwares.fr', '_blank')">
              ${this.t('product.web')}
            </button>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px;">
          <div style="max-width: 900px; margin: 0 auto;">
            <h2 style="font-size: 2rem; margin-bottom: 30px;">${this.t('features.title')}</h2>
            <ul style="list-style: none; color: var(--tx2); line-height: 2; font-size: 1.1rem;">
              <li>${this.t('features.sync')}</li>
              <li>${this.t('features.auto')}</li>
              <li>${this.t('features.ui')}</li>
              <li>${this.t('features.free')}</li>
              <li>${this.t('features.multi')}</li>
              <li>${this.t('features.history')}</li>
            </ul>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px; text-align: center; border-top: 1px solid var(--bd);">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="font-size: 1.5rem; margin-bottom: 20px;">${this.t('ready.title')}</h2>
            <button class="btn-primary" onclick="window.open('https://play.google.com/store/apps', '_blank')">
              ${this.t('ready.btn')}
            </button>
          </div>
        </section>
      </div>
    `;
  },

  // Template: Legal
  renderLegal(page) {
    const title = page.slug === 'privacy' ? this.t('legal.privacy.title') : this.t('legal.terms.title');
    const content = page.slug === 'privacy' ? `
      <h2>1. Responsable du traitement</h2>
      <p>Gilles Goudelin, développeur indépendant exerçant sous le nom de MG Softwares, basé en France.</p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires au fonctionnement des applications :</p>
      <ul>
        <li>Données d'utilisation des applications (pour améliorer les services)</li>
        <li>Données stockées dans Google Drive (à votre initiative)</li>
        <li>Identifiant Google (si synchronisation activée)</li>
      </ul>

      <h2>3. Protection des données</h2>
      <p>Vos données personnelles sont :</p>
      <ul>
        <li>Stockées de manière sécurisée</li>
        <li>Jamais vendues à des tiers</li>
        <li>Traitées selon le RGPD</li>
      </ul>

      <h2>4. Droits relatifs aux données</h2>
      <p>Vous avez le droit de :</p>
      <ul>
        <li>Accéder à vos données</li>
        <li>Rectifier vos données</li>
        <li>Supprimer vos données</li>
        <li>Exporter vos données</li>
      </ul>

      <h2>5. Contact</h2>
      <p>Pour toute question concernant vos données : contact@mg-softwares.fr</p>

      <h2>6. Modifications</h2>
      <p>Cette politique peut être mise à jour à tout moment. Les modifications importantes seront notifiées par e-mail.</p>
    ` : `
      <h2>1. Conditions d'utilisation</h2>
      <p>En utilisant les applications MG Softwares, vous acceptez ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser nos services.</p>

      <h2>2. Licence d'utilisation</h2>
      <p>Les applications MG Softwares sont distribuées gratuitement. Vous obtenez une licence personnelle, non-exclusive et non-transférable pour utiliser les applications.</p>

      <h2>3. Restrictions</h2>
      <p>Vous ne pouvez pas :</p>
      <ul>
        <li>Modifier, traduire ou créer des œuvres dérivées</li>
        <li>Désassembler ou rétro-ingénierie les applications</li>
        <li>Revendre, louer ou transférer les applications</li>
        <li>Utiliser les applications à des fins commerciales</li>
      </ul>

      <h2>4. Limitation de responsabilité</h2>
      <p>Les applications sont fournies "telles quelles" sans garantie. MG Softwares ne peut être tenu responsable de :</p>
      <ul>
        <li>Perte de données</li>
        <li>Interruption de service</li>
        <li>Dommages indirects ou consécutifs</li>
      </ul>

      <h2>5. Données Google Drive</h2>
      <p>La synchronisation Google Drive est optionnelle. Vous gardez le contrôle total de vos données. MG Softwares n'accède à vos données que si vous l'autorisez explicitement.</p>

      <h2>6. Modifications</h2>
      <p>Ces conditions peuvent être mises à jour à tout moment. L'utilisation continue des applications implique l'acceptation des modifications.</p>

      <h2>7. Contact</h2>
      <p>Pour toute question : contact@mg-softwares.fr</p>
    `;

    return `
      <div class="page-content">
        <div class="legal-content">
          <h1>${title}</h1>
          <p style="color: var(--tx2); margin-bottom: 40px; font-size: 1.05rem;">
            ${this.t('legal.privacy.updated')} ${new Date().toLocaleDateString('fr-FR')}
          </p>
          ${content}
        </div>
      </div>
    `;
  },

  // Rendre 404
  renderNotFound() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-content">
        <div class="not-found">
          <h1>404</h1>
          <h2>${this.t('error.notfound')}</h2>
          <p>${this.t('error.notfound.desc')}</p>
          <button class="btn-primary" onclick="app.navigate('')">
            ${this.t('error.back')}
          </button>
        </div>
      </div>
    `;
  },

  // Rendre erreur
  renderError(message) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-content">
        <div class="not-found">
          <h1>⚠️ ${this.t('error.loading')}</h1>
          <p>${message}</p>
          <button class="btn-primary" onclick="location.reload()">
            Rafraîchir la page
          </button>
        </div>
      </div>
    `;
  },

  // IndexedDB: Récupérer
  async getFromDB(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.state.db.transaction([this.config.storeName], 'readonly');
      const store = transaction.objectStore(this.config.storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },

  // IndexedDB: Sauvegarder
  async saveToDB(key, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.state.db.transaction([this.config.storeName], 'readwrite');
      const store = transaction.objectStore(this.config.storeName);
      const request = store.put({ ...value, slug: key });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },
};
