// APP.JS - Single Page Application with IndexedDB
const app = {
  // Configuration
  config: {
    apiUrl: '/data/pages.json',
    dbName: 'MGSoftwaresDB',
    storeName: 'pages',
    cacheDuration: 24 * 60 * 60 * 1000, // 24 heures
  },

  // État
  state: {
    pages: [],
    currentPage: null,
    db: null,
  },

  // Initialiser l'app
  async init() {
    try {
      // Initialiser IndexedDB
      await this.initDB();

      // Charger les pages
      await this.loadPages();

      // Charger la page actuelle
      this.loadPage();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      this.renderError('Erreur lors du chargement de l\'application');
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

  // Charger les pages depuis le serveur ou le cache
  async loadPages() {
    try {
      // Essayer de charger depuis le cache d'abord
      const cached = await this.getFromDB('pages');
      if (cached && Date.now() - cached.timestamp < this.config.cacheDuration) {
        this.state.pages = cached.data;
        return;
      }

      // Charger depuis le serveur
      const response = await fetch(this.config.apiUrl);
      if (!response.ok) throw new Error('Erreur réseau');

      const data = await response.json();
      this.state.pages = data.pages || [];

      // Sauvegarder dans le cache
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

  // Charger la page actuelle basée sur l'URL
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

  // Obtenir le slug actuel de l'URL
  getCurrentSlug() {
    let pathname = window.location.pathname;
    let search = window.location.search;

    // Gérer la redirection 404.html pour GitHub Pages
    // Si on a ?/route en paramètre, l'utiliser
    if (search.includes('/?/')) {
      pathname = search.split('/?/')[1];
      // Remplacer ~and~ par &
      pathname = pathname.replace(/~and~/g, '&');
      // Supprimer les caractères après le premier &
      if (pathname.includes('&')) {
        pathname = pathname.split('&')[0];
      }
    }

    // Supprimer le slash initial et final
    pathname = pathname.replace(/^\/|\/$/g, '');

    // Supprimer l'extension .html si présente (pour compatibilité)
    pathname = pathname.replace(/\.html$/, '');

    return pathname;
  },

  // Naviguer vers une page
  navigate(slug) {
    const basePath = '/';
    const newPath = slug ? `${basePath}${slug}/` : basePath;
    window.history.pushState({ slug }, '', newPath);
    this.loadPage();
  },

  // Mettre à jour les meta tags dynamiquement
  updateMetaTags(page) {
    // Title
    document.title = page.title;
    document.getElementById('pageTitle').textContent = page.title;

    // Description
    const descMeta = document.getElementById('pageDesc');
    descMeta.setAttribute('content', page.description || '');

    // Keywords
    const keywordsMeta = document.getElementById('pageKeywords');
    keywordsMeta.setAttribute('content', page.keywords || '');

    // Canonical
    const canonical = document.getElementById('canonical');
    canonical.setAttribute('href', page.canonical || `https://mg-softwares.fr/${page.slug}`);

    // Open Graph
    document.getElementById('ogTitle').setAttribute('content', page.title);
    document.getElementById('ogDesc').setAttribute('content', page.description || '');
    document.getElementById('ogUrl').setAttribute('content', page.canonical || `https://mg-softwares.fr/${page.slug}`);
    if (page.ogImage) {
      document.getElementById('ogImage').setAttribute('content', page.ogImage);
    }
    if (page.ogType) {
      document.getElementById('ogType').setAttribute('content', page.ogType);
    }

    // Twitter Card
    document.getElementById('twitterTitle').setAttribute('content', page.title);
    document.getElementById('twitterDesc').setAttribute('content', page.description || '');

    // JSON-LD Schema
    this.updateJsonLD(page);
  },

  // Mettre à jour JSON-LD Schema
  updateJsonLD(page) {
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
          <h1 class="hero-title">
            Des applications <span class="grad">pensées pour vous</span>
          </h1>
          <p class="hero-sub">
            Studio de développement indépendant français. Des applications utiles, rapides et élégantes.
          </p>
          <div>
            <button class="btn-primary" onclick="app.navigate('gamiz')">
              Découvrir Gamiz →
            </button>
            <button class="btn-secondary" onclick="app.navigate('autozen')">
              Découvrir AutoZen
            </button>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px; background: rgba(255,255,255,0.02); border-top: 1px solid var(--bd);">
          <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2rem; margin-bottom: 40px;">Nos Applications</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
              <div style="background: var(--gl); border: 1px solid var(--bd); border-radius: 20px; padding: 40px; cursor: pointer; transition: all 0.3s;" onclick="app.navigate('gamiz')">
                <h3 style="font-size: 1.5rem; margin-bottom: 10px;">🎲 Gamiz</h3>
                <p style="color: var(--tx2); margin-bottom: 20px;">Calculateur de scores pour jeux de société</p>
                <p style="font-size: 0.9rem; color: var(--tx3);">Skyjo, Qwirkle, Tarot, UNO, Yams et plus →</p>
              </div>
              <div style="background: var(--gl); border: 1px solid var(--bd); border-radius: 20px; padding: 40px; cursor: pointer; transition: all 0.3s;" onclick="app.navigate('autozen')">
                <h3 style="font-size: 1.5rem; margin-bottom: 10px;">🚗 AutoZen</h3>
                <p style="color: var(--tx2); margin-bottom: 20px;">Suivi automobile complet</p>
                <p style="font-size: 0.9rem; color: var(--tx3);">Entretien, carburant, trajets →</p>
              </div>
            </div>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">Synchronisation Google Drive</h2>
            <p style="color: var(--tx2); font-size: 1.1rem; margin-bottom: 30px;">
              Vos données synchronisées automatiquement. Accessible sur tous vos appareils.
            </p>
            <p style="font-size: 0.9rem; color: var(--tx3);">
              ✅ Gratuit • ✅ Sécurisé • ✅ Open Source
            </p>
          </div>
        </section>
      </div>
    `;
  },

  // Template: Product
  renderProduct(page) {
    const title = page.slug === 'gamiz' ?
      '🎲 Gamiz — Calculateur de scores' :
      '🚗 AutoZen — Suivi automobile';

    const description = page.slug === 'gamiz' ?
      'Application gratuite pour gérer les scores, joueurs et historique de vos soirées jeux. Supportez 8 jeux différents avec synchronisation Google Drive.' :
      'Application gratuite pour suivre l\'entretien de votre voiture, vos dépenses en carburant et vos trajets. Synchronisation Google Drive incluse.';

    return `
      <div class="page-content">
        <section class="hero">
          <h1 class="hero-title">${title}</h1>
          <p class="hero-sub">${description}</p>
          <div>
            <button class="btn-primary" onclick="window.open('https://play.google.com/store/apps', '_blank')">
              Télécharger sur Google Play
            </button>
            <button class="btn-secondary" onclick="window.open('https://mg-softwares.fr', '_blank')">
              Version Web
            </button>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px;">
          <div style="max-width: 900px; margin: 0 auto;">
            <h2 style="font-size: 2rem; margin-bottom: 30px;">Fonctionnalités principales</h2>
            <ul style="list-style: none; color: var(--tx2); line-height: 2; font-size: 1.1rem;">
              <li>✅ Synchronisation Google Drive</li>
              <li>✅ Sauvegarde automatique</li>
              <li>✅ Interface intuitive</li>
              <li>✅ Gratuit et sans publicité</li>
              <li>✅ Multi-plateforme (Android, Web, iOS)</li>
              <li>✅ Historique complet</li>
            </ul>
          </div>
        </section>

        <section style="position: relative; z-index: 1; padding: 100px 40px; text-align: center; border-top: 1px solid var(--bd);">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="font-size: 1.5rem; margin-bottom: 20px;">Prêt à essayer ?</h2>
            <button class="btn-primary" onclick="window.open('https://play.google.com/store/apps', '_blank')">
              Télécharger gratuitement →
            </button>
          </div>
        </section>
      </div>
    `;
  },

  // Template: Legal
  renderLegal(page) {
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
          <h1>${page.slug === 'privacy' ? 'Politique de Confidentialité' : 'Conditions d\'Utilisation'}</h1>
          <p style="color: var(--tx2); margin-bottom: 40px; font-size: 1.05rem;">
            Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}
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
          <h2>Page non trouvée</h2>
          <p>La page que vous recherchez n'existe pas.</p>
          <button class="btn-primary" onclick="app.navigate('')">
            Retour à l'accueil
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
          <h1>⚠️ Erreur</h1>
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
      const transaction = this.state.db.transaction(
        [this.config.storeName],
        'readonly'
      );
      const store = transaction.objectStore(this.config.storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },

  // IndexedDB: Sauvegarder
  async saveToDB(key, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.state.db.transaction(
        [this.config.storeName],
        'readwrite'
      );
      const store = transaction.objectStore(this.config.storeName);
      const request = store.put({ ...value, slug: key });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },
};
