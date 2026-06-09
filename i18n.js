/**
 * MG Softwares — i18n (Internationalisation)
 * Langues : FR (défaut), EN, IT, DE
 * Usage : attribut data-i18n="clé" sur les éléments HTML
 */
(function () {
  'use strict';
  /* Email protégé contre les bots */
  var _em = [99,111,110,116,97,99,116,64,109,103,45,115,111,102,116,119,97,114,101,115,46,102,114].map(function(c){return String.fromCharCode(c);}).join('');
  var _emLink = '<a href="mailto:'+_em+'">'+_em+'</a>';


  const STORAGE_KEY = 'mgs_lang';
  const DEFAULT_LANG = 'fr';

  const TRANSLATIONS = {
    /* NAV */
    'nav.about':    { fr:'À propos',     en:'About',        it:'Chi siamo',    de:'Über uns'      },
    'nav.apps':     { fr:'Applications', en:'Apps',         it:'App',          de:'Apps'          },
    'nav.contact':  { fr:'Contact',      en:'Contact',      it:'Contatto',     de:'Kontakt'       },
    'nav.cta':      { fr:'Voir les apps →', en:'See apps →',it:'Vedi le app →',de:'Apps ansehen →'},
    /* HERO */
    'hero.badge':   { fr:'🇫🇷 Développeur indépendant français', en:'🇫🇷 Independent French developer', it:'🇫🇷 Sviluppatore indipendente francese', de:'🇫🇷 Unabhängiger französischer Entwickler' },
    'hero.title':   { fr:'Des applications<br /><em>pensées pour vous</em>', en:'Apps<br /><em>designed for you</em>', it:'App<br /><em>pensate per voi</em>', de:'Apps<br /><em>für Sie gedacht</em>' },
    'hero.desc':    { fr:'MG Softwares crée des applications web et mobiles utiles, rapides et élégantes. Chaque projet est conçu avec soin, de l\'idée jusqu\'au déploiement.', en:'MG Softwares builds useful, fast and elegant web and mobile apps. Every project is crafted carefully, from idea to deployment.', it:'MG Softwares crea app web e mobile utili, veloci ed eleganti. Ogni progetto è realizzato con cura, dall\'idea al rilascio.', de:'MG Softwares entwickelt nützliche, schnelle und elegante Web- und Mobile-Apps. Jedes Projekt wird sorgfältig gestaltet, von der Idee bis zum Launch.' },
    'hero.cta1':    { fr:'Découvrir les apps', en:'Discover apps', it:'Scopri le app', de:'Apps entdecken' },
    'hero.cta2':    { fr:'En savoir plus',     en:'Learn more',    it:'Scopri di più', de:'Mehr erfahren'  },
    /* STATS */
    'stats.apps':   { fr:'Applications',  en:'Apps',          it:'App',           de:'Apps'           },
    'stats.fr':     { fr:'Made in France',en:'Made in France', it:'Made in France', de:'Made in France' },
    'stats.passion':{ fr:'Passion',       en:'Passion',       it:'Passione',      de:'Leidenschaft'   },
    'stats.uptime': { fr:'Disponibilité', en:'Uptime',        it:'Disponibilità', de:'Verfügbarkeit'  },
    /* ABOUT */
    'about.tag':    { fr:'À propos',   en:'About',     it:'Chi siamo',  de:'Über uns'  },
    'about.title':  { fr:'Qui est<br />MG Softwares ?', en:'Who is<br />MG Softwares?', it:'Chi è<br />MG Softwares?', de:'Wer ist<br />MG Softwares?' },
    'about.p1':     { fr:'MG Softwares est un studio de développement indépendant basé en France. Je conçois et développe des <strong>applications web et mobiles</strong> qui répondent à de vrais besoins.', en:'MG Softwares is an independent development studio based in France. I design and build <strong>web and mobile applications</strong> that meet real needs.', it:'MG Softwares è uno studio di sviluppo indipendente con sede in Francia. Progetto e sviluppo <strong>applicazioni web e mobile</strong> che rispondono a esigenze reali.', de:'MG Softwares ist ein unabhängiges Entwicklungsstudio mit Sitz in Frankreich. Ich entwerfe und entwickle <strong>Web- und Mobile-Apps</strong>, die echten Bedürfnissen entsprechen.' },
    'about.p2':     { fr:'Chaque application est construite avec des technologies modernes, un souci du détail et une obsession pour <strong>l\'expérience utilisateur</strong>. Pas de superflu, juste ce qui compte.', en:'Every app is built with modern technologies, attention to detail and an obsession with <strong>user experience</strong>. No fluff, just what matters.', it:'Ogni app è costruita con tecnologie moderne, attenzione ai dettagli e un\'ossessione per <strong>l\'esperienza utente</strong>. Niente di superfluo.', de:'Jede App wird mit modernen Technologien, Liebe zum Detail und einer Obsession für <strong>Benutzererfahrung</strong> entwickelt. Kein Überfluss.' },
    'about.p3':     { fr:'Disponibles sur le <strong>Google Play Store</strong> et accessibles depuis votre navigateur, mes apps sont conçues pour fonctionner partout, pour tout le monde.', en:'Available on the <strong>Google Play Store</strong> and accessible from your browser, my apps are designed to work everywhere, for everyone.', it:'Disponibili sul <strong>Google Play Store</strong> e accessibili dal browser, le mie app sono progettate per funzionare ovunque, per tutti.', de:'Im <strong>Google Play Store</strong> verfügbar und über den Browser zugänglich, sind meine Apps für jeden und überall konzipiert.' },
    'about.cta':    { fr:'Voir les applications →', en:'See the apps →', it:'Vedi le app →', de:'Apps ansehen →' },
    /* VALUES */
    'val.perf.name':  { fr:'Performance', en:'Performance', it:'Performance', de:'Performance' },
    'val.perf.desc':  { fr:'Des apps rapides et réactives, optimisées pour tous les appareils.', en:'Fast and responsive apps, optimized for all devices.', it:'App veloci e reattive, ottimizzate per tutti i dispositivi.', de:'Schnelle Apps, optimiert für alle Geräte.' },
    'val.design.name':{ fr:'Design',      en:'Design',      it:'Design',      de:'Design'      },
    'val.design.desc':{ fr:'Interfaces soignées et intuitives, agréables à utiliser au quotidien.', en:'Polished and intuitive interfaces, pleasant to use every day.', it:'Interfacce curate e intuitive, piacevoli da usare ogni giorno.', de:'Gepflegte und intuitive Oberflächen, angenehm im täglichen Gebrauch.' },
    'val.sec.name':   { fr:'Sécurité',    en:'Security',    it:'Sicurezza',   de:'Sicherheit'  },
    'val.sec.desc':   { fr:'Vos données restent vos données. Respect total de la vie privée.', en:'Your data stays yours. Full respect for privacy.', it:'I tuoi dati rimangono tuoi. Rispetto totale della privacy.', de:'Ihre Daten bleiben Ihre Daten. Voller Datenschutz.' },
    'val.open.name':  { fr:'Transparence',en:'Transparency',it:'Trasparenza', de:'Transparenz'  },
    'val.open.desc':  { fr:'Politique de confidentialité claire. Aucune donnée vendue. Jamais.', en:'Clear privacy policy. No data sold. Ever.', it:'Politica sulla privacy chiara. Nessun dato venduto. Mai.', de:'Klare Datenschutzrichtlinie. Keine Daten verkauft. Niemals.' },
    /* APPS */
    'apps.tag':     { fr:'Nos applications', en:'Our apps',    it:'Le nostre app',  de:'Unsere Apps'    },
    'apps.title':   { fr:'Des outils pensés<br />pour le quotidien', en:'Tools built<br />for everyday life', it:'Strumenti pensati<br />per la vita quotidiana', de:'Werkzeuge für<br />den Alltag' },
    'apps.subtitle':{ fr:'Chaque application naît d\'un vrai besoin. Simple, efficace, sans abonnement caché.', en:'Every app is born from a real need. Simple, effective, no hidden subscription.', it:'Ogni app nasce da un\'esigenza reale. Semplice, efficace, senza abbonamento nascosto.', de:'Jede App entsteht aus einem echten Bedürfnis. Einfach, effektiv, ohne verstecktes Abo.' },
    'app.gamiz.desc':{ fr:'Le compagnon ultime pour vos soirées jeux. Gérez les scores, les joueurs et l\'historique de vos parties de société en un clin d\'œil.', en:'The ultimate companion for your game nights. Manage scores, players and your board game history in a flash.', it:'Il compagno ideale per le vostre serate di gioco. Gestite punteggi, giocatori e cronologia in un attimo.', de:'Der ultimative Begleiter für Ihre Spieleabende. Verwalten Sie Punkte, Spieler und Geschichte im Handumdrehen.' },
    'app.gamiz.t1': { fr:'Jeux de société', en:'Board games',  it:'Giochi da tavolo', de:'Brettspiele' },
    'app.gamiz.t2': { fr:'Scores',          en:'Scores',       it:'Punteggi',         de:'Punkte'     },
    'app.gamiz.t3': { fr:'Multijoueur',     en:'Multiplayer',  it:'Multigiocatore',   de:'Mehrspieler'},
    'app.gamiz.link':{ fr:'Voir Gamiz →',   en:'View Gamiz →', it:'Vedi Gamiz →',     de:'Gamiz ansehen →' },
    'app.bf.name':  { fr:'Budget Familial', en:'Family Budget',it:'Budget Familiare', de:'Familienbudget' },
    'app.bf.desc':  { fr:'Prenez le contrôle de vos finances familiales. Suivez vos revenus, dépenses, épargnes et courses avec une interface claire et intuitive.', en:'Take control of your family finances. Track income, expenses, savings and shopping with a clear intuitive interface.', it:'Prendi il controllo delle tue finanze familiari. Tieni traccia di entrate, uscite, risparmi e spesa con un\'interfaccia chiara.', de:'Behalten Sie Ihre Familienfinanzen im Griff. Verfolgen Sie Einkommen, Ausgaben, Ersparnisse und Einkäufe übersichtlich.' },
    'app.bf.t1':    { fr:'Budget',   en:'Budget',   it:'Budget',   de:'Budget'   },
    'app.bf.t2':    { fr:'Famille',  en:'Family',   it:'Famiglia', de:'Familie'  },
    'app.bf.t3':    { fr:'Finances', en:'Finances', it:'Finanze',  de:'Finanzen' },
    'app.az.desc':  { fr:'Gérez l\'entretien de vos véhicules sans effort. Suivi des réparations, rappels d\'entretien, historique complet et gestion des contrats en un seul endroit.', en:'Manage your vehicle maintenance effortlessly. Track repairs, maintenance reminders, full history and contract management in one place.', it:'Gestisci la manutenzione dei tuoi veicoli senza sforzo. Riparazioni, promemoria, storico completo in un posto.', de:'Verwalten Sie die Fahrzeugwartung mühelos. Reparaturen, Erinnerungen und vollständiger Verlauf an einem Ort.' },
    'app.az.t1':    { fr:'Automobile', en:'Automobile', it:'Automobile',    de:'Auto'    },
    'app.az.t2':    { fr:'Entretien',  en:'Maintenance',it:'Manutenzione',  de:'Wartung' },
    'app.az.t3':    { fr:'Historique', en:'History',    it:'Cronologia',    de:'Verlauf' },
    'app.live':     { fr:'En ligne',   en:'Live',        it:'Online',       de:'Online'  },
    'app.android':  { fr:'📱 Android', en:'📱 Android',  it:'📱 Android',   de:'📱 Android' },
    'app.web':      { fr:'🌐 Web App', en:'🌐 Web App',  it:'🌐 Web App',   de:'🌐 Web App' },
    'app.access':   { fr:'Accéder →',  en:'Access →',   it:'Accedi →',     de:'Öffnen →' },
    /* FOOTER */
    'footer.legal':   { fr:'Mentions légales',             en:'Legal notice',     it:'Note legali',               de:'Impressum'            },
    'footer.privacy': { fr:'Politique de confidentialité', en:'Privacy policy',   it:'Informativa sulla privacy', de:'Datenschutzerklärung' },
    'footer.terms':   { fr:'Conditions d\'utilisation',    en:'Terms of use',     it:'Termini di utilizzo',       de:'Nutzungsbedingungen'  },
    'footer.copy':    { fr:'© 2026 MG Softwares — France 🇫🇷', en:'© 2026 MG Softwares — France 🇫🇷', it:'© 2026 MG Softwares — Francia 🇫🇷', de:'© 2026 MG Softwares — Frankreich 🇫🇷' },
    'footer.backsite':{ fr:'Retour au site', en:'Back to site', it:'Torna al sito', de:'Zurück zur Website' },
    'footer.studio':  { fr:'Studio de développement indépendant — France 🇫🇷', en:'Independent development studio — France 🇫🇷', it:'Studio di sviluppo indipendente — Francia 🇫🇷', de:'Unabhängiges Entwicklungsstudio — Frankreich 🇫🇷' },

    /* MODAL PRIVACY */
    'modal.privacy.title':  { fr:'Politique de confidentialité', en:'Privacy Policy', it:'Informativa sulla privacy', de:'Datenschutzerklärung' },
    'modal.privacy.date':   { fr:'Dernière mise à jour : 3 mai 2026 — Applicable à toutes les applications MG Softwares', en:'Last updated: May 3, 2026 — Applicable to all MG Softwares applications', it:'Ultimo aggiornamento: 3 maggio 2026 — Applicabile a tutte le applicazioni MG Softwares', de:'Zuletzt aktualisiert: 3. Mai 2026 — Gilt für alle MG Softwares Anwendungen' },
    'modal.privacy.body': {
      fr: `
        <div class="modal-section"><h3>1. Qui sommes-nous ?</h3><p><strong>MG Softwares</strong> est un studio de développement indépendant basé en France, édité par <strong>Gilles Goudelin</strong>.<br>Contact : ${_emLink}<br>Site : <a href="https://mg-softwares.fr">https://mg-softwares.fr</a></p></div>
        <div class="modal-section"><h3>2. Applications concernées</h3><p>Cette politique s'applique à l'ensemble des applications développées et publiées par MG Softwares, notamment :</p><ul><li><strong>Gamiz</strong> — calculateur de scores pour jeux de société (Android &amp; Web)</li><li>Toute future application publiée sous la marque MG Softwares</li></ul></div>
        <div class="modal-section"><h3>3. Données collectées et traitées</h3><p><strong>Gamiz — données stockées localement sur votre appareil :</strong></p><ul><li>Noms et avatars des joueurs (saisis par l'utilisateur)</li><li>Historique des parties et scores</li><li>Préférences de l'application (thème, langue, sons)</li></ul><p style="margin-top:12px"><strong>Gamiz — données collectées si vous activez Google Drive :</strong></p><ul><li>Adresse email Google (pour identifier le compte et synchroniser les données)</li><li>Token de rafraîchissement OAuth (stocké de manière sécurisée)</li><li>Identifiant du fichier <code>gamiz-backup.json</code> sur Google Drive</li></ul><p style="margin-top:12px"><strong>AutoZen — données stockées localement :</strong></p><ul><li>Informations sur vos véhicules (nom, marque, modèle)</li><li>Historique des réparations (date, coût, garage, kilométrage)</li><li>Contrats d'entretien et rappels de révision</li></ul><p style="margin-top:8px">Si vous activez <strong>Google Drive</strong> dans AutoZen, un fichier <code>autozen-data.json</code> est créé dans votre Drive personnel (scope <code>drive.file</code> uniquement). AutoZen utilise également les notifications push si vous y consentez.</p><p style="margin-top:12px">Les données sont chiffrées en transit (HTTPS) et ne sont jamais vendues, partagées ou utilisées à des fins publicitaires.</p></div>
        <div class="modal-section"><h3>4. Utilisation de Google Drive</h3><p>Lorsque vous connectez Google Drive à Gamiz, l'application accède uniquement au fichier de sauvegarde qu'elle a elle-même créé (<strong>scope drive.file</strong>). Elle ne peut pas lire vos autres fichiers Google Drive.</p><p style="margin-top:8px">Vous pouvez révoquer cet accès à tout moment depuis : <a href="https://myaccount.google.com/permissions" target="_blank">myaccount.google.com/permissions</a> ou directement dans l'application (Paramètres → Déconnecter Drive).</p></div>
        <div class="modal-section"><h3>5. Durée de conservation</h3><ul><li>Les données locales restent sur votre appareil jusqu'à désinstallation de l'application</li><li>Les tokens OAuth sont supprimés de nos serveurs dès que vous déconnectez Google Drive</li><li>Aucune donnée n'est conservée sur nos serveurs au-delà de la durée d'utilisation active</li></ul></div>
        <div class="modal-section"><h3>6. Vos droits (RGPD)</h3><p>Conformément au RGPD, vous disposez des droits suivants :</p><ul><li><strong>Droit d'accès</strong> — obtenir une copie de vos données</li><li><strong>Droit de rectification</strong> — corriger vos données</li><li><strong>Droit à l'effacement</strong> — supprimer vos données</li><li><strong>Droit à la portabilité</strong> — exporter vos données</li><li><strong>Droit d'opposition</strong> — vous opposer au traitement</li></ul><p style="margin-top:8px">Pour exercer ces droits : ${_emLink}</p></div>
        <div class="modal-section"><h3>7. Cookies et traceurs</h3><p><strong>Site web mg-softwares.fr :</strong> Nous utilisons <strong>Google Analytics</strong> (Google LLC) à des fins de <strong>mesure d'audience statistique</strong> uniquement. Google Analytics est chargé <strong>uniquement après votre consentement explicite</strong>. GA4 ne stocke pas les adresses IP. Aucune donnée n'est utilisée à des fins publicitaires.</p><p><strong>Applications mobiles / PWA :</strong> Elles n'utilisent aucun cookie de tracking. Le localStorage est uniquement utilisé pour sauvegarder vos préférences en local.</p></div>
        <div class="modal-section"><h3>8. Sécurité</h3><p>Toutes les communications sont chiffrées via <strong>HTTPS/TLS</strong>. Les tokens OAuth sont stockés de manière sécurisée et ne sont jamais exposés dans les logs.</p></div>
        <div class="modal-section"><h3>9. Modifications de cette politique</h3><p>Nous nous réservons le droit de modifier cette politique à tout moment. En cas de modification substantielle, une notification sera affichée dans l'application.</p></div>
        <div class="modal-section"><h3>10. Contact</h3><p>📧 ${_emLink}</p><p style="margin-top:8px">En cas de litige non résolu, vous pouvez saisir la <strong>CNIL</strong> : <a href="https://www.cnil.fr" target="_blank">www.cnil.fr</a></p></div>`,
      en: `
        <div class="modal-section"><h3>1. Who are we?</h3><p><strong>MG Softwares</strong> is an independent development studio based in France, operated by <strong>Gilles Goudelin</strong>.<br>Contact: ${_emLink}<br>Website: <a href="https://mg-softwares.fr">https://mg-softwares.fr</a></p></div>
        <div class="modal-section"><h3>2. Covered applications</h3><p>This policy applies to all applications developed and published by MG Softwares, including:</p><ul><li><strong>Gamiz</strong> — score tracker for board games (Android &amp; Web)</li><li>Any future application published under the MG Softwares brand</li></ul></div>
        <div class="modal-section"><h3>3. Data collected and processed</h3><p><strong>Gamiz — data stored locally on your device:</strong></p><ul><li>Player names and avatars (entered by the user)</li><li>Game history and scores</li><li>App preferences (theme, language, sounds)</li></ul><p style="margin-top:12px"><strong>Gamiz — data collected if you enable Google Drive:</strong></p><ul><li>Google email address (to identify the account and sync data)</li><li>OAuth refresh token (stored securely)</li><li>Google Drive <code>gamiz-backup.json</code> file identifier</li></ul><p style="margin-top:12px"><strong>AutoZen — data stored locally:</strong></p><ul><li>Vehicle information (name, make, model)</li><li>Repair history (date, cost, garage, mileage)</li><li>Maintenance contracts and service reminders</li></ul><p style="margin-top:8px">If you enable <strong>Google Drive</strong> in AutoZen, an <code>autozen-data.json</code> file is created in your personal Drive (scope <code>drive.file</code> only). AutoZen also uses push notifications if you consent.</p><p style="margin-top:12px">Data is encrypted in transit (HTTPS) and is never sold, shared or used for advertising.</p></div>
        <div class="modal-section"><h3>4. Google Drive usage</h3><p>When you connect Google Drive to Gamiz, the app only accesses the backup file it created itself (<strong>scope drive.file</strong>). It cannot read your other Google Drive files.</p><p style="margin-top:8px">You can revoke this access at any time from: <a href="https://myaccount.google.com/permissions" target="_blank">myaccount.google.com/permissions</a> or directly in the app (Settings → Disconnect Drive).</p></div>
        <div class="modal-section"><h3>5. Retention period</h3><ul><li>Local data stays on your device until the app is uninstalled</li><li>OAuth tokens are deleted from our servers as soon as you disconnect Google Drive</li><li>No data is retained on our servers beyond the active usage period</li></ul></div>
        <div class="modal-section"><h3>6. Your rights (GDPR)</h3><p>Under the GDPR, you have the following rights:</p><ul><li><strong>Right of access</strong> — obtain a copy of your data</li><li><strong>Right to rectification</strong> — correct your data</li><li><strong>Right to erasure</strong> — delete your data</li><li><strong>Right to portability</strong> — export your data</li><li><strong>Right to object</strong> — object to processing</li></ul><p style="margin-top:8px">To exercise these rights: ${_emLink}</p></div>
        <div class="modal-section"><h3>7. Cookies and trackers</h3><p><strong>Website mg-softwares.fr:</strong> We use <strong>Google Analytics</strong> (Google LLC) solely for <strong>statistical audience measurement</strong>. It is loaded <strong>only after your explicit consent</strong>. GA4 does not store IP addresses. No data is used for advertising.</p><p><strong>Mobile / PWA apps:</strong> They use no tracking cookies. localStorage is only used to save your preferences locally.</p></div>
        <div class="modal-section"><h3>8. Security</h3><p>All communications are encrypted via <strong>HTTPS/TLS</strong>. OAuth tokens are stored securely and never exposed in logs.</p></div>
        <div class="modal-section"><h3>9. Changes to this policy</h3><p>We reserve the right to modify this policy at any time. In case of substantial modification, a notification will be shown in the app.</p></div>
        <div class="modal-section"><h3>10. Contact</h3><p>📧 ${_emLink}</p><p style="margin-top:8px">If a dispute cannot be resolved, you can contact the <strong>CNIL</strong>: <a href="https://www.cnil.fr" target="_blank">www.cnil.fr</a></p></div>`,
      it: `
        <div class="modal-section"><h3>1. Chi siamo?</h3><p><strong>MG Softwares</strong> è uno studio di sviluppo indipendente con sede in Francia, gestito da <strong>Gilles Goudelin</strong>.<br>Contatto: ${_emLink}<br>Sito: <a href="https://mg-softwares.fr">https://mg-softwares.fr</a></p></div>
        <div class="modal-section"><h3>2. Applicazioni interessate</h3><p>Questa politica si applica a tutte le applicazioni sviluppate e pubblicate da MG Softwares, tra cui:</p><ul><li><strong>Gamiz</strong> — contatore di punteggi per giochi da tavolo (Android &amp; Web)</li><li>Qualsiasi futura applicazione pubblicata sotto il marchio MG Softwares</li></ul></div>
        <div class="modal-section"><h3>3. Dati raccolti e trattati</h3><p><strong>Gamiz — dati archiviati localmente sul dispositivo:</strong></p><ul><li>Nomi e avatar dei giocatori (inseriti dall'utente)</li><li>Cronologia delle partite e punteggi</li><li>Preferenze dell'app (tema, lingua, suoni)</li></ul><p style="margin-top:12px"><strong>Gamiz — dati raccolti se si attiva Google Drive:</strong></p><ul><li>Indirizzo email Google (per identificare l'account e sincronizzare)</li><li>Token di aggiornamento OAuth (archiviato in modo sicuro)</li><li>Identificatore del file <code>gamiz-backup.json</code> su Google Drive</li></ul><p style="margin-top:12px"><strong>AutoZen — dati archiviati localmente:</strong></p><ul><li>Informazioni sui veicoli (nome, marca, modello)</li><li>Cronologia delle riparazioni (data, costo, officina, chilometraggio)</li><li>Contratti di manutenzione e promemoria di revisione</li></ul><p style="margin-top:8px">Se si attiva <strong>Google Drive</strong> in AutoZen, viene creato un file <code>autozen-data.json</code> nel proprio Drive personale (solo scope <code>drive.file</code>). AutoZen utilizza anche le notifiche push se si dà il consenso.</p><p style="margin-top:12px">I dati sono crittografati in transito (HTTPS) e non vengono mai venduti, condivisi o utilizzati per scopi pubblicitari.</p></div>
        <div class="modal-section"><h3>4. Utilizzo di Google Drive</h3><p>Quando si collega Google Drive a Gamiz, l'app accede solo al file di backup che ha creato essa stessa (<strong>scope drive.file</strong>). Non può leggere gli altri file di Google Drive.</p><p style="margin-top:8px">Puoi revocare questo accesso in qualsiasi momento da: <a href="https://myaccount.google.com/permissions" target="_blank">myaccount.google.com/permissions</a> o direttamente nell'app (Impostazioni → Disconnetti Drive).</p></div>
        <div class="modal-section"><h3>5. Periodo di conservazione</h3><ul><li>I dati locali rimangono sul dispositivo fino alla disinstallazione dell'app</li><li>I token OAuth vengono eliminati dai nostri server non appena si disconnette Google Drive</li><li>Nessun dato viene conservato oltre il periodo di utilizzo attivo</li></ul></div>
        <div class="modal-section"><h3>6. I tuoi diritti (GDPR)</h3><p>Ai sensi del GDPR, hai i seguenti diritti:</p><ul><li><strong>Diritto di accesso</strong> — ottenere una copia dei tuoi dati</li><li><strong>Diritto di rettifica</strong> — correggere i tuoi dati</li><li><strong>Diritto alla cancellazione</strong> — eliminare i tuoi dati</li><li><strong>Diritto alla portabilità</strong> — esportare i tuoi dati</li><li><strong>Diritto di opposizione</strong> — opporsi al trattamento</li></ul><p style="margin-top:8px">Per esercitare questi diritti: ${_emLink}</p></div>
        <div class="modal-section"><h3>7. Cookie e tracciatori</h3><p><strong>Sito web mg-softwares.fr:</strong> Utilizziamo <strong>Google Analytics</strong> (Google LLC) esclusivamente per la <strong>misurazione statistica dell'audience</strong>. Viene attivato <strong>solo dopo il consenso esplicito</strong>. GA4 non memorizza gli indirizzi IP. Nessun dato viene utilizzato per pubblicità.</p><p><strong>App mobile / PWA:</strong> Non utilizzano cookie di tracciamento. Il localStorage viene utilizzato solo per salvare le preferenze localmente.</p></div>
        <div class="modal-section"><h3>8. Sicurezza</h3><p>Tutte le comunicazioni sono crittografate tramite <strong>HTTPS/TLS</strong>. I token OAuth sono archiviati in modo sicuro e non vengono mai esposti nei log.</p></div>
        <div class="modal-section"><h3>9. Modifiche a questa politica</h3><p>Ci riserviamo il diritto di modificare questa politica in qualsiasi momento. In caso di modifica sostanziale, verrà mostrata una notifica nell'app.</p></div>
        <div class="modal-section"><h3>10. Contatto</h3><p>📧 ${_emLink}</p><p style="margin-top:8px">In caso di controversia non risolta, puoi contattare il <strong>Garante Privacy</strong>: <a href="https://www.garanteprivacy.it" target="_blank">garanteprivacy.it</a></p></div>`,
      de: `
        <div class="modal-section"><h3>1. Wer sind wir?</h3><p><strong>MG Softwares</strong> ist ein unabhängiges Entwicklungsstudio mit Sitz in Frankreich, betrieben von <strong>Gilles Goudelin</strong>.<br>Kontakt: ${_emLink}<br>Website: <a href="https://mg-softwares.fr">https://mg-softwares.fr</a></p></div>
        <div class="modal-section"><h3>2. Betroffene Anwendungen</h3><p>Diese Richtlinie gilt für alle von MG Softwares entwickelten und veröffentlichten Anwendungen, darunter:</p><ul><li><strong>Gamiz</strong> — Punktetracker für Brettspiele (Android &amp; Web)</li><li>Alle zukünftigen Anwendungen unter der Marke MG Softwares</li></ul></div>
        <div class="modal-section"><h3>3. Erhobene und verarbeitete Daten</h3><p><strong>Gamiz — lokal auf Ihrem Gerät gespeicherte Daten:</strong></p><ul><li>Spielernamen und Avatare (vom Nutzer eingegeben)</li><li>Spielverlauf und Punkte</li><li>App-Einstellungen (Design, Sprache, Töne)</li></ul><p style="margin-top:12px"><strong>Gamiz — Daten bei aktiviertem Google Drive:</strong></p><ul><li>Google-E-Mail-Adresse (zur Kontoidentifizierung und Synchronisierung)</li><li>OAuth-Refresh-Token (sicher gespeichert)</li><li>Kennung der Datei <code>gamiz-backup.json</code> auf Google Drive</li></ul><p style="margin-top:12px"><strong>AutoZen — lokal gespeicherte Daten:</strong></p><ul><li>Fahrzeuginformationen (Name, Marke, Modell)</li><li>Reparaturverlauf (Datum, Kosten, Werkstatt, Kilometerstand)</li><li>Wartungsverträge und Serviceerinnerungen</li></ul><p style="margin-top:8px">Wenn Sie <strong>Google Drive</strong> in AutoZen aktivieren, wird eine Datei <code>autozen-data.json</code> in Ihrem Drive erstellt (nur scope <code>drive.file</code>). AutoZen verwendet auch Push-Benachrichtigungen bei Ihrer Zustimmung.</p><p style="margin-top:12px">Daten werden bei der Übertragung verschlüsselt (HTTPS) und niemals verkauft oder für Werbezwecke verwendet.</p></div>
        <div class="modal-section"><h3>4. Verwendung von Google Drive</h3><p>Wenn Sie Google Drive mit Gamiz verbinden, greift die App nur auf die von ihr selbst erstellte Backup-Datei zu (<strong>scope drive.file</strong>). Andere Google Drive-Dateien sind nicht zugänglich.</p><p style="margin-top:8px">Zugriff widerrufbar über: <a href="https://myaccount.google.com/permissions" target="_blank">myaccount.google.com/permissions</a> oder direkt in der App (Einstellungen → Drive trennen).</p></div>
        <div class="modal-section"><h3>5. Aufbewahrungsdauer</h3><ul><li>Lokale Daten bleiben auf Ihrem Gerät bis zur Deinstallation der App</li><li>OAuth-Tokens werden gelöscht, sobald Sie Google Drive trennen</li><li>Keine Daten werden über den aktiven Nutzungszeitraum hinaus gespeichert</li></ul></div>
        <div class="modal-section"><h3>6. Ihre Rechte (DSGVO)</h3><p>Gemäß der DSGVO haben Sie folgende Rechte:</p><ul><li><strong>Auskunftsrecht</strong> — Kopie Ihrer Daten erhalten</li><li><strong>Berichtigungsrecht</strong> — Daten korrigieren</li><li><strong>Recht auf Löschung</strong> — Daten löschen</li><li><strong>Recht auf Datenübertragbarkeit</strong> — Daten exportieren</li><li><strong>Widerspruchsrecht</strong> — Verarbeitung widersprechen</li></ul><p style="margin-top:8px">Zur Ausübung dieser Rechte: ${_emLink}</p></div>
        <div class="modal-section"><h3>7. Cookies und Tracker</h3><p><strong>Website mg-softwares.fr:</strong> Wir verwenden <strong>Google Analytics</strong> (Google LLC) ausschließlich zur <strong>statistischen Zielgruppenmessung</strong>. Es wird <strong>nur nach ausdrücklicher Einwilligung</strong> geladen. GA4 speichert keine IP-Adressen. Keine Daten für Werbezwecke.</p><p><strong>Mobile / PWA Apps:</strong> Keine Tracking-Cookies. localStorage wird nur zur lokalen Speicherung von Einstellungen verwendet.</p></div>
        <div class="modal-section"><h3>8. Sicherheit</h3><p>Alle Kommunikationen werden über <strong>HTTPS/TLS</strong> verschlüsselt. OAuth-Tokens werden sicher gespeichert und nie in Logs offengelegt.</p></div>
        <div class="modal-section"><h3>9. Änderungen dieser Richtlinie</h3><p>Wir behalten uns das Recht vor, diese Richtlinie jederzeit zu ändern. Bei wesentlichen Änderungen wird eine Benachrichtigung in der App angezeigt.</p></div>
        <div class="modal-section"><h3>10. Kontakt</h3><p>📧 ${_emLink}</p><p style="margin-top:8px">Bei ungelösten Streitigkeiten können Sie sich an den <strong>Bundesbeauftragten für Datenschutz</strong> wenden: <a href="https://www.bfdi.bund.de" target="_blank">bfdi.bund.de</a></p></div>`
    },
    /* MODAL MENTIONS */
    'modal.mentions.title': { fr:'Mentions légales', en:'Legal Notice', it:'Note legali', de:'Impressum' },
    'modal.mentions.date':  { fr:"Conformément à l'article 6 de la loi n°2004-575 du 21 juin 2004", en:'Pursuant to applicable law', it:'Ai sensi della normativa vigente', de:'Gemäß den geltenden gesetzlichen Bestimmungen' },
    'modal.mentions.body': {
      fr: `
        <div class="modal-section"><h3>Éditeur</h3><p><strong>MG Softwares</strong><br>Développeur indépendant — France 🇫🇷<br>Email : ${_emLink}<br>Directeur de la publication : <strong>Gilles Goudelin</strong></p></div>
        <div class="modal-section"><h3>Hébergement</h3><p>Le site <strong>mg-softwares.fr</strong> est hébergé par :<br><strong>GitHub Pages</strong> — GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA<br><a href="https://pages.github.com" target="_blank">pages.github.com</a></p></div>
        <div class="modal-section"><h3>Propriété intellectuelle</h3><p>L'ensemble du contenu du site et des applications (textes, graphismes, code, logos, icônes) est la propriété exclusive de MG Softwares et est protégé par les lois françaises et internationales. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p></div>
        <div class="modal-section"><h3>Limitation de responsabilité</h3><p>MG Softwares s'efforce de fournir des informations exactes et à jour. Toutefois, MG Softwares ne saurait être tenu responsable de l'utilisation faite de ces informations et des conséquences qui pourraient en découler.</p></div>
        <div class="modal-section"><h3>Droit applicable</h3><p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p></div>`,
      en: `
        <div class="modal-section"><h3>Publisher</h3><p><strong>MG Softwares</strong><br>Independent developer — France 🇫🇷<br>Email: ${_emLink}<br>Publication director: <strong>Gilles Goudelin</strong></p></div>
        <div class="modal-section"><h3>Hosting</h3><p>The website <strong>mg-softwares.fr</strong> is hosted by:<br><strong>GitHub Pages</strong> — GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA<br><a href="https://pages.github.com" target="_blank">pages.github.com</a></p></div>
        <div class="modal-section"><h3>Intellectual property</h3><p>All content on the website and applications (text, graphics, code, logos, icons) is the exclusive property of MG Softwares and is protected by French and international intellectual property laws. Any reproduction, even partial, is prohibited without prior written authorization.</p></div>
        <div class="modal-section"><h3>Limitation of liability</h3><p>MG Softwares strives to provide accurate and up-to-date information. However, MG Softwares cannot be held responsible for the use made of this information and its consequences.</p></div>
        <div class="modal-section"><h3>Applicable law</h3><p>These legal notices are governed by French law. In case of dispute, French courts shall have exclusive jurisdiction.</p></div>`,
      it: `
        <div class="modal-section"><h3>Editore</h3><p><strong>MG Softwares</strong><br>Sviluppatore indipendente — Francia 🇫🇷<br>Email: ${_emLink}<br>Direttore della pubblicazione: <strong>Gilles Goudelin</strong></p></div>
        <div class="modal-section"><h3>Hosting</h3><p>Il sito <strong>mg-softwares.fr</strong> è ospitato da:<br><strong>GitHub Pages</strong> — GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA<br><a href="https://pages.github.com" target="_blank">pages.github.com</a></p></div>
        <div class="modal-section"><h3>Proprietà intellettuale</h3><p>Tutti i contenuti del sito e delle applicazioni (testi, grafica, codice, loghi, icone) sono di esclusiva proprietà di MG Softwares e sono protetti dalle leggi italiane e internazionali sulla proprietà intellettuale. Qualsiasi riproduzione, anche parziale, è vietata senza previa autorizzazione scritta.</p></div>
        <div class="modal-section"><h3>Limitazione di responsabilità</h3><p>MG Softwares si impegna a fornire informazioni accurate e aggiornate. Tuttavia, MG Softwares non può essere ritenuta responsabile dell'uso di tali informazioni e delle relative conseguenze.</p></div>
        <div class="modal-section"><h3>Legge applicabile</h3><p>Le presenti note legali sono soggette alla legge francese. In caso di controversia, i tribunali francesi saranno gli unici competenti.</p></div>`,
      de: `
        <div class="modal-section"><h3>Herausgeber</h3><p><strong>MG Softwares</strong><br>Unabhängiger Entwickler — Frankreich 🇫🇷<br>E-Mail: ${_emLink}<br>Verantwortlicher: <strong>Gilles Goudelin</strong></p></div>
        <div class="modal-section"><h3>Hosting</h3><p>Die Website <strong>mg-softwares.fr</strong> wird gehostet von:<br><strong>GitHub Pages</strong> — GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA<br><a href="https://pages.github.com" target="_blank">pages.github.com</a></p></div>
        <div class="modal-section"><h3>Geistiges Eigentum</h3><p>Alle Inhalte der Website und Anwendungen (Texte, Grafiken, Code, Logos, Icons) sind ausschließliches Eigentum von MG Softwares und durch französisches und internationales Urheberrecht geschützt. Jede Vervielfältigung, auch auszugsweise, ist ohne vorherige schriftliche Genehmigung untersagt.</p></div>
        <div class="modal-section"><h3>Haftungsbeschränkung</h3><p>MG Softwares ist bemüht, genaue und aktuelle Informationen bereitzustellen. MG Softwares haftet jedoch nicht für die Verwendung dieser Informationen und deren Folgen.</p></div>
        <div class="modal-section"><h3>Anwendbares Recht</h3><p>Dieses Impressum unterliegt französischem Recht. Im Streitfall sind ausschließlich die französischen Gerichte zuständig.</p></div>`
    },

    /* AUTOZEN - PRIVACY */
    'priv.s3.az.local': { fr:"— données stockées <strong>localement sur votre appareil</strong> :", en:"— data stored <strong>locally on your device</strong>:", it:"— dati archiviati <strong>localmente sul dispositivo</strong>:", de:"— Daten, die <strong>lokal auf Ihrem Gerät</strong> gespeichert werden:" },
    'priv.s3.az.li1':   { fr:"Informations sur vos véhicules (nom, marque, modèle)", en:"Vehicle information (name, make, model)", it:"Informazioni sui veicoli (nome, marca, modello)", de:"Fahrzeuginformationen (Name, Marke, Modell)" },
    'priv.s3.az.li2':   { fr:"Historique des réparations (date, coût, garage, kilométrage, catégorie)", en:"Repair history (date, cost, garage, mileage, category)", it:"Cronologia delle riparazioni (data, costo, officina, chilometraggio, categoria)", de:"Reparaturverlauf (Datum, Kosten, Werkstatt, Kilometerstand, Kategorie)" },
    'priv.s3.az.li3':   { fr:"Contrats d'entretien (prestataire, durée, mensualité)", en:"Maintenance contracts (provider, duration, monthly fee)", it:"Contratti di manutenzione (fornitore, durata, canone mensile)", de:"Wartungsverträge (Anbieter, Laufzeit, Monatsbeitrag)" },
    'priv.s3.az.li4':   { fr:"Rappels de révision (date, fréquence de renouvellement)", en:"Service reminders (date, renewal frequency)", it:"Promemoria di revisione (data, frequenza di rinnovo)", de:"Wartungserinnerungen (Datum, Erneuerungsfrequenz)" },
    'priv.s3.az.li5':   { fr:"Catégories personnalisées et préférences de l'application", en:"Custom categories and app preferences", it:"Categorie personalizzate e preferenze dell'app", de:"Benutzerdefinierte Kategorien und App-Einstellungen" },
    'priv.s3.az.drive': { fr:"Si vous activez <strong>Google Drive</strong> dans AutoZen, un fichier <code>autozen-data.json</code> est créé dans votre Drive personnel. L'accès est limité à ce seul fichier (<strong>scope drive.file</strong>). Les données suivantes sont également collectées :", en:"If you enable <strong>Google Drive</strong> in AutoZen, an <code>autozen-data.json</code> file is created in your personal Drive. Access is limited to this file only (<strong>scope drive.file</strong>). The following data is also collected:", it:"Se si attiva <strong>Google Drive</strong> in AutoZen, viene creato un file <code>autozen-data.json</code> nel proprio Drive personale. L'accesso è limitato a questo solo file (<strong>scope drive.file</strong>). Vengono raccolti anche i seguenti dati:", de:"Wenn Sie <strong>Google Drive</strong> in AutoZen aktivieren, wird eine Datei <code>autozen-data.json</code> in Ihrem persönlichen Drive erstellt. Der Zugriff ist auf diese Datei beschränkt (<strong>scope drive.file</strong>). Folgende Daten werden zusätzlich erhoben:" },
    'priv.s3.az.li6':   { fr:'Adresse email Google (pour identifier le compte et synchroniser)', en:'Google email address (to identify the account and synchronize)', it:"Indirizzo email Google (per identificare l'account e sincronizzare)", de:'Google-E-Mail-Adresse (zur Kontoidentifizierung und Synchronisierung)' },
    'priv.s3.az.li7':   { fr:'Token OAuth (stocké localement, renouvelé silencieusement à expiration)', en:'OAuth token (stored locally, silently renewed on expiration)', it:"Token OAuth (archiviato localmente, rinnovato silenziosamente alla scadenza)", de:'OAuth-Token (lokal gespeichert, bei Ablauf automatisch erneuert)' },
    'priv.s3.az.li8':   { fr:'Identifiant du fichier <code>autozen-data.json</code> sur Google Drive', en:'Google Drive <code>autozen-data.json</code> file identifier', it:"Identificatore del file <code>autozen-data.json</code> su Google Drive", de:'Kennung der Datei <code>autozen-data.json</code> auf Google Drive' },
    'priv.s3.az.notif': { fr:"AutoZen utilise également les <strong>notifications push</strong> (via Service Worker) pour les rappels de révision, si vous y avez consenti dans votre navigateur. Aucune donnée de notification n'est transmise à des serveurs tiers.", en:"AutoZen also uses <strong>push notifications</strong> (via Service Worker) for service reminders, if you have consented in your browser. No notification data is transmitted to third-party servers.", it:"AutoZen utilizza anche le <strong>notifiche push</strong> (tramite Service Worker) per i promemoria di revisione, se si è dato il consenso nel browser. Nessun dato di notifica viene trasmesso a server di terze parti.", de:"AutoZen verwendet auch <strong>Push-Benachrichtigungen</strong> (über Service Worker) für Wartungserinnerungen, sofern Sie im Browser zugestimmt haben. Keine Benachrichtigungsdaten werden an Drittserver übertragen." },
    'priv.s4.p2':       { fr:"Chaque application gère son propre fichier de façon indépendante : <code>gamiz-data.json</code> pour Gamiz, <code>autozen-data.json</code> pour AutoZen.", en:'Each app manages its own file independently: <code>gamiz-data.json</code> for Gamiz, <code>autozen-data.json</code> for AutoZen.', it:"Ogni app gestisce il proprio file in modo indipendente: <code>gamiz-data.json</code> per Gamiz, <code>autozen-data.json</code> per AutoZen.", de:'Jede App verwaltet ihre eigene Datei unabhängig: <code>gamiz-data.json</code> für Gamiz, <code>autozen-data.json</code> für AutoZen.' },
    /* AUTOZEN - TERMS */
    'terms.s3.az':      { fr:"Application de suivi automobile permettant la gestion des réparations, contrats d'entretien et rappels de révision. Stockage local ou sur Google Drive personnel. Les rappels fonctionnent en arrière-plan via Service Worker (PWA installée).", en:'Automobile tracking application for managing repairs, maintenance contracts and service reminders. Local storage or personal Google Drive. Reminders work in the background via Service Worker (installed PWA).', it:"Applicazione di monitoraggio automobilistico per la gestione di riparazioni, contratti di manutenzione e promemoria di revisione. Archiviazione locale o su Google Drive personale. I promemoria funzionano in background tramite Service Worker (PWA installata).", de:'Kfz-Verfolgungsanwendung zur Verwaltung von Reparaturen, Wartungsverträgen und Serviceerinnerungen. Lokale Speicherung oder persönliches Google Drive. Erinnerungen funktionieren im Hintergrund über Service Worker (installierte PWA).' },
    'terms.s6b.h':      { fr:'6b. Notifications push (AutoZen)', en:'6b. Push notifications (AutoZen)', it:'6b. Notifiche push (AutoZen)', de:'6b. Push-Benachrichtigungen (AutoZen)' },
    'terms.s6b.p':      { fr:"AutoZen peut envoyer des notifications push pour les rappels de révision, après consentement explicite de l'utilisateur dans le navigateur. Ce service fonctionne via Service Worker. Vous pouvez révoquer cette autorisation à tout moment dans les paramètres de votre navigateur.", en:'AutoZen can send push notifications for service reminders, after explicit user consent in the browser. This service works via Service Worker. You can revoke this permission at any time in your browser settings.', it:"AutoZen può inviare notifiche push per i promemoria di revisione, dopo il consenso esplicito dell'utente nel browser. Questo servizio funziona tramite Service Worker. Puoi revocare questo permesso in qualsiasi momento nelle impostazioni del browser.", de:'AutoZen kann Push-Benachrichtigungen für Wartungserinnerungen senden, nach ausdrücklicher Zustimmung des Nutzers im Browser. Dieser Dienst funktioniert über Service Worker. Sie können diese Berechtigung jederzeit in den Browser-Einstellungen widerrufen.' },
    /* COOKIE CONSENT */
    'cookie.title':  { fr:'Ce site utilise des cookies d\'analyse', en:'This site uses analytics cookies', it:'Questo sito usa cookie analitici', de:'Diese Seite verwendet Analyse-Cookies' },
    'cookie.text':   { fr:'Nous utilisons <strong>Google Analytics</strong> pour mesurer l\'audience (pages visitées, durée, pays). Les adresses IP ne sont pas stockées par GA4. Aucune donnée n\'est vendue.<br><br>Votre choix est sauvegardé localement.', en:'We use <strong>Google Analytics</strong> to measure audience (pages visited, duration, country). IP addresses are not stored by GA4. No data is sold.<br><br>Your choice is saved locally.', it:'Utilizziamo <strong>Google Analytics</strong> per misurare l\'audience (pagine, durata, paese). GA4 non memorizza gli IP. Nessun dato viene venduto.<br><br>La scelta viene salvata localmente.', de:'Wir verwenden <strong>Google Analytics</strong> zur Messung der Besuche (Seiten, Dauer, Land). GA4 speichert keine IPs. Keine Daten werden verkauft.<br><br>Ihre Wahl wird lokal gespeichert.' },
    'cookie.more':   { fr:'En savoir plus →', en:'Learn more →', it:'Scopri di più →', de:'Mehr erfahren →' },
    'cookie.accept': { fr:'✓ Accepter les statistiques', en:'✓ Accept statistics', it:'✓ Accetta statistiche', de:'✓ Statistiken akzeptieren' },
    'cookie.refuse': { fr:'✕ Refuser', en:'✕ Decline', it:'✕ Rifiuta', de:'✕ Ablehnen' },
    /* GAMIZ PAGE */
    'gamiz.badge':      { fr:'Application Android & Web', en:'Android & Web App', it:'App Android e Web', de:'Android & Web App' },
    'gamiz.title':      { fr:'Votre compagnon<br /><em>jeux de société</em>', en:'Your board game<br /><em>companion</em>', it:'Il tuo compagno<br /><em>da gioco</em>', de:'Ihr Brettspiel-<br /><em>Begleiter</em>' },
    'gamiz.desc':       { fr:'Fini les papiers et crayons ! Gamiz gère les scores, les joueurs et l\'historique de vos parties. Simple, rapide, conçu pour ne pas gêner le jeu.', en:'No more paper and pencils! Gamiz manages scores, players and your game history. Simple, fast, designed to not interfere with play.', it:'Basta carta e matite! Gamiz gestisce punteggi, giocatori e cronologia. Semplice, veloce, progettato per non interferire col gioco.', de:'Schluss mit Papier und Bleistift! Gamiz verwaltet Punkte, Spieler und Verlauf. Einfach, schnell, spielfreundlich.' },
    'gamiz.cta1':       { fr:'📱 Google Play',  en:'📱 Google Play',   it:'📱 Google Play',  de:'📱 Google Play'  },
    'gamiz.cta2':       { fr:'🌐 Version Web',  en:'🌐 Web Version',   it:'🌐 Versione Web', de:'🌐 Web-Version'  },
    'gamiz.feat.tag':   { fr:'Fonctionnalités', en:'Features',         it:'Funzionalità',   de:'Funktionen'      },
    'gamiz.feat.title': { fr:'Tout ce qu\'il vous faut<br />pour vos soirées jeux', en:'Everything you need<br />for your game nights', it:'Tutto ciò che serve<br />per le vostre serate di gioco', de:'Alles, was Sie brauchen<br />für Ihre Spieleabende' },
    'gamiz.drive.title':{ fr:'Synchronisation Google Drive', en:'Google Drive Sync', it:'Sincronizzazione Google Drive', de:'Google Drive-Synchronisierung' },
    'gamiz.drive.desc': { fr:'Gamiz utilise Google Drive pour vous permettre de synchroniser vos données entre appareils et de les partager avec d\'autres joueurs. L\'accès est strictement limité au fichier que Gamiz crée lui-même :', en:'Gamiz uses Google Drive to let you sync your data across devices and share it with other players. Access is strictly limited to the file Gamiz itself created:', it:'Gamiz utilizza Google Drive per sincronizzare i dati tra dispositivi e condividerli. L\'accesso è strettamente limitato al file creato da Gamiz stesso:', de:'Gamiz verwendet Google Drive zur geräteübergreifenden Synchronisierung. Der Zugriff ist strikt auf die von Gamiz erstellte Datei beschränkt:' },
    'gamiz.drive.scope':{ fr:'— Gamiz ne peut accéder qu\'au fichier qu\'il a lui-même créé. Il ne peut pas lire, modifier ou supprimer vos autres fichiers Google Drive.', en:'— Gamiz can only access the file it created itself. It cannot read, modify or delete your other Google Drive files.', it:'— Gamiz può accedere solo al file che ha creato. Non può leggere, modificare o eliminare gli altri file di Google Drive.', de:'— Gamiz kann nur auf die von ihm erstellte Datei zugreifen. Andere Google Drive-Dateien sind nicht zugänglich.' },
    'gamiz.drive.revoke':{ fr:'La connexion Google Drive est entièrement optionnelle. Vous pouvez révoquer l\'accès à tout moment depuis', en:'Google Drive connection is entirely optional. You can revoke access at any time from', it:'La connessione a Google Drive è completamente facoltativa. Puoi revocare l\'accesso in qualsiasi momento da', de:'Die Google Drive-Verbindung ist optional. Sie können den Zugriff jederzeit widerrufen über' },
    'gamiz.drive.or':   { fr:'ou directement dans l\'application (Paramètres → Déconnecter Drive).', en:'or directly in the app (Settings → Disconnect Drive).', it:'o direttamente nell\'app (Impostazioni → Disconnetti Drive).', de:'oder direkt in der App (Einstellungen → Drive trennen).' },
    /* PRIVACY PAGE */
    'priv.title':    { fr:'Politique de confidentialité', en:'Privacy Policy',          it:'Informativa sulla privacy', de:'Datenschutzerklärung'  },
    'priv.subtitle': { fr:'Applicable à l\'ensemble des applications MG Softwares',    en:'Applicable to all MG Softwares applications', it:'Applicabile a tutte le applicazioni MG Softwares', de:'Gilt für alle MG Softwares Anwendungen' },
    'priv.back':     { fr:'← Retour au site', en:'← Back to site', it:'← Torna al sito', de:'← Zurück zur Website' },
    'priv.updated':  { fr:'Dernière mise à jour : 3 mai 2026', en:'Last updated: May 3, 2026', it:'Ultimo aggiornamento: 3 maggio 2026', de:'Zuletzt aktualisiert: 3. Mai 2026' },
    'priv.s1.h':     { fr:'1. Qui sommes-nous ?',              en:'1. Who are we?',               it:'1. Chi siamo?',                     de:'1. Wer sind wir?'             },
    'priv.s1.p':     { fr:'<strong>MG Softwares</strong> est un studio de développement indépendant basé en France, édité par <strong>Gilles Goudelin</strong>.', en:'<strong>MG Softwares</strong> is an independent development studio based in France, operated by <strong>Gilles Goudelin</strong>.', it:'<strong>MG Softwares</strong> è uno studio di sviluppo indipendente con sede in Francia, gestito da <strong>Gilles Goudelin</strong>.', de:'<strong>MG Softwares</strong> ist ein unabhängiges Entwicklungsstudio mit Sitz in Frankreich, betrieben von <strong>Gilles Goudelin</strong>.' },
    'priv.s1.li1':   { fr:'Contact :', en:'Contact:', it:'Contatto:', de:'Kontakt:' },
    'priv.s1.li2':   { fr:'Site :', en:'Website:', it:'Sito:', de:'Website:' },
    'priv.s2.h':     { fr:'2. Applications concernées', en:'2. Covered applications', it:'2. Applicazioni interessate', de:'2. Betroffene Anwendungen' },
    'priv.s2.p':     { fr:'Cette politique s\'applique à toutes les applications développées et publiées par MG Softwares :', en:'This policy applies to all applications developed and published by MG Softwares:', it:'Questa politica si applica a tutte le applicazioni sviluppate e pubblicate da MG Softwares:', de:'Diese Richtlinie gilt für alle von MG Softwares entwickelten und veröffentlichten Anwendungen:' },
    'priv.s2.future':{ fr:'Ainsi qu\'à toute future application publiée sous la marque MG Softwares.', en:'As well as any future application published under the MG Softwares brand.', it:'Nonché qualsiasi futura applicazione pubblicata sotto il marchio MG Softwares.', de:'Sowie alle zukünftigen Anwendungen unter der Marke MG Softwares.' },
    'priv.s3.h':     { fr:'3. Données collectées et traitées', en:'3. Data collected and processed', it:'3. Dati raccolti e trattati', de:'3. Erhobene und verarbeitete Daten' },
    'priv.s3.local': { fr:'— données stockées <strong>localement sur votre appareil</strong> :', en:'— data stored <strong>locally on your device</strong>:', it:'— dati archiviati <strong>localmente sul dispositivo</strong>:', de:'— Daten, die <strong>lokal auf Ihrem Gerät</strong> gespeichert werden:' },
    'priv.s3.li1':   { fr:'Noms et avatars des joueurs (saisis par l\'utilisateur)', en:'Player names and avatars (entered by the user)', it:'Nomi e avatar dei giocatori (inseriti dall\'utente)', de:'Spielernamen und Avatare (vom Nutzer eingegeben)' },
    'priv.s3.li2':   { fr:'Historique des parties et scores', en:'Game history and scores', it:'Cronologia delle partite e punteggi', de:'Spielverlauf und Punkte' },
    'priv.s3.li3':   { fr:'Préférences de l\'application (thème, langue, sons)', en:'App preferences (theme, language, sounds)', it:'Preferenze dell\'app (tema, lingua, suoni)', de:'App-Einstellungen (Design, Sprache, Töne)' },
    'priv.s3.drive': { fr:'Si vous activez <strong>Google Drive</strong>, les données suivantes sont également collectées :', en:'If you enable <strong>Google Drive</strong>, the following data is also collected:', it:'Se attivate <strong>Google Drive</strong>, vengono raccolti anche i seguenti dati:', de:'Wenn Sie <strong>Google Drive</strong> aktivieren, werden auch folgende Daten erhoben:' },
    'priv.s3.li4':   { fr:'Adresse email Google (pour identifier le compte et synchroniser)', en:'Google email address (to identify the account and synchronize)', it:'Indirizzo email Google (per identificare l\'account e sincronizzare)', de:'Google-E-Mail-Adresse (zur Kontoidentifizierung und Synchronisierung)' },
    'priv.s3.li5':   { fr:'Token de rafraîchissement OAuth (stocké de manière sécurisée)', en:'OAuth refresh token (stored securely)', it:'Token di aggiornamento OAuth (archiviato in modo sicuro)', de:'OAuth-Refresh-Token (sicher gespeichert)' },
    'priv.s3.li6':   { fr:'Identifiant du fichier <code>gamiz-backup.json</code> sur Google Drive', en:'Google Drive <code>gamiz-backup.json</code> file identifier', it:'Identificatore del file <code>gamiz-backup.json</code> su Google Drive', de:'Kennung der Datei <code>gamiz-backup.json</code> auf Google Drive' },
    'priv.s3.box':   { fr:'🔒 Toutes les données sont chiffrées en transit (HTTPS) et ne sont jamais vendues, partagées ou utilisées à des fins publicitaires.', en:'🔒 All data is encrypted in transit (HTTPS) and is never sold, shared or used for advertising purposes.', it:'🔒 Tutti i dati sono crittografati in transito (HTTPS) e non vengono mai venduti, condivisi o utilizzati per scopi pubblicitari.', de:'🔒 Alle Daten werden bei der Übertragung verschlüsselt (HTTPS) und niemals verkauft, geteilt oder für Werbezwecke verwendet.' },
    'priv.s4.h':     { fr:'4. Utilisation de Google Drive (Gamiz)', en:'4. Google Drive usage (Gamiz)', it:'4. Utilizzo di Google Drive (Gamiz)', de:'4. Verwendung von Google Drive (Gamiz)' },
    'priv.s4.p1':    { fr:'Lorsque vous connectez Google Drive à Gamiz, l\'application accède uniquement au fichier de sauvegarde qu\'elle a elle-même créé (<strong>scope drive.file</strong>). Elle ne peut pas lire vos autres fichiers Google Drive.', en:'When you connect Google Drive to Gamiz, the app only accesses the backup file it created itself (<strong>scope drive.file</strong>). It cannot read your other Google Drive files.', it:'Quando si collega Google Drive a Gamiz, l\'app accede solo al file di backup che ha creato essa stessa (<strong>scope drive.file</strong>). Non può leggere gli altri file.', de:'Wenn Sie Google Drive mit Gamiz verbinden, greift die App nur auf die von ihr selbst erstellte Backup-Datei zu (<strong>scope drive.file</strong>). Andere Dateien sind nicht zugänglich.' },
    'priv.s4.revoke':{ fr:'Vous pouvez révoquer cet accès à tout moment depuis les paramètres de votre compte Google :', en:'You can revoke this access at any time from your Google account settings:', it:'Puoi revocare questo accesso in qualsiasi momento dalle impostazioni del tuo account Google:', de:'Sie können diesen Zugriff jederzeit in Ihren Google-Kontoeinstellungen widerrufen:' },
    'priv.s5.h':     { fr:'5. Hébergement et sécurité', en:'5. Hosting and security', it:'5. Hosting e sicurezza', de:'5. Hosting und Sicherheit' },
    'priv.s5.li1':   { fr:'Les données sont hébergées en Europe (France / Union Européenne)', en:'Data is hosted in Europe (France / European Union)', it:'I dati sono ospitati in Europa (Francia / Unione Europea)', de:'Daten werden in Europa gehostet (Frankreich / EU)' },
    'priv.s5.li2':   { fr:'Communications chiffrées via HTTPS/TLS', en:'Communications encrypted via HTTPS/TLS', it:'Comunicazioni crittografate tramite HTTPS/TLS', de:'Kommunikation über HTTPS/TLS verschlüsselt' },
    'priv.s5.li3':   { fr:'Accès aux données limité au strict nécessaire', en:'Data access limited to what is strictly necessary', it:'Accesso ai dati limitato allo stretto necessario', de:'Datenzugriff auf das Notwendige beschränkt' },
    'priv.s5.li4':   { fr:'Aucune donnée transmise à des tiers à des fins commerciales', en:'No data transmitted to third parties for commercial purposes', it:'Nessun dato trasmesso a terzi per scopi commerciali', de:'Keine Daten für kommerzielle Zwecke weitergegeben' },
    'priv.s6.h':     { fr:'6. Durée de conservation', en:'6. Retention period', it:'6. Periodo di conservazione', de:'6. Aufbewahrungsdauer' },
    'priv.s6.p':     { fr:'Les données sont conservées tant que votre compte est actif. En cas de suppression de compte ou de désinstallation de l\'application, vos données sont supprimées dans un délai de 30 jours.', en:'Data is retained as long as your account is active. Upon account deletion or app uninstallation, your data is deleted within 30 days.', it:'I dati vengono conservati finché il tuo account è attivo. In caso di eliminazione dell\'account o disinstallazione, i dati vengono eliminati entro 30 giorni.', de:'Daten werden aufbewahrt, solange Ihr Konto aktiv ist. Bei Kontolöschung oder Deinstallation werden Ihre Daten innerhalb von 30 Tagen gelöscht.' },
    'priv.s7.h':     { fr:'7. Vos droits (RGPD)', en:'7. Your rights (GDPR)', it:'7. I tuoi diritti (GDPR)', de:'7. Ihre Rechte (DSGVO)' },
    'priv.s7.intro': { fr:'Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :', en:'In accordance with the General Data Protection Regulation (GDPR), you have the following rights:', it:'Ai sensi del GDPR, hai i seguenti diritti:', de:'Gemäß der DSGVO haben Sie folgende Rechte:' },
    'priv.s7.li1':   { fr:'Droit d\'accès à vos données personnelles', en:'Right of access to your personal data', it:'Diritto di accesso ai tuoi dati personali', de:'Recht auf Auskunft' },
    'priv.s7.li2':   { fr:'Droit de rectification', en:'Right to rectification', it:'Diritto di rettifica', de:'Recht auf Berichtigung' },
    'priv.s7.li3':   { fr:'Droit à l\'effacement (droit à l\'oubli)', en:'Right to erasure (right to be forgotten)', it:'Diritto alla cancellazione', de:'Recht auf Löschung' },
    'priv.s7.li4':   { fr:'Droit à la portabilité des données', en:'Right to data portability', it:'Diritto alla portabilità dei dati', de:'Recht auf Datenübertragbarkeit' },
    'priv.s7.li5':   { fr:'Droit d\'opposition au traitement', en:'Right to object to processing', it:'Diritto di opposizione al trattamento', de:'Widerspruchsrecht' },
    'priv.s7.contact':{ fr:'Pour exercer ces droits, contactez-nous à :', en:'To exercise these rights, contact us at:', it:'Per esercitare questi diritti, contattaci a:', de:'Um diese Rechte auszuüben, kontaktieren Sie uns:' },
    'priv.s8.h':     { fr:'8. Cookies et traceurs', en:'8. Cookies and trackers', it:'8. Cookie e tracciatori', de:'8. Cookies und Tracker' },
    'priv.s8.web':   { fr:'<strong>Site web mg-softwares.fr :</strong> Ce site utilise <strong>Google Analytics</strong> (Google LLC) à des fins de <strong>mesure d\'audience statistique</strong> uniquement (pages visitées, durée des sessions, pays d\'origine). Ce service est <strong>activé uniquement après votre consentement explicite</strong>. Google Analytics 4 ne stocke pas les adresses IP. Aucune donnée n\'est utilisée à des fins publicitaires ni transmise à des tiers. Vous pouvez retirer votre consentement à tout moment en effaçant les données locales (clé : <code>mgs_cookie_consent</code>).', en:'<strong>Website mg-softwares.fr:</strong> This site uses <strong>Google Analytics</strong> (Google LLC) solely for <strong>statistical audience measurement</strong> (pages visited, session duration, country). This service is <strong>only enabled after your explicit consent</strong>. Google Analytics 4 does not store IP addresses. No data is used for advertising or shared with commercial third parties. You can withdraw consent at any time by clearing local data (key: <code>mgs_cookie_consent</code>).', it:'<strong>Sito web mg-softwares.fr:</strong> Questo sito utilizza <strong>Google Analytics</strong> (Google LLC) esclusivamente per la <strong>misurazione statistica</strong> (pagine visitate, durata, paese). Il servizio è <strong>attivato solo dopo il consenso esplicito</strong>. GA4 non memorizza gli indirizzi IP. Nessun dato viene utilizzato per pubblicità. Puoi ritirare il consenso cancellando i dati locali (chiave: <code>mgs_cookie_consent</code>).', de:'<strong>Website mg-softwares.fr:</strong> Diese Website verwendet <strong>Google Analytics</strong> (Google LLC) ausschließlich zur <strong>statistischen Zielgruppenmessung</strong> (besuchte Seiten, Sitzungsdauer, Land). Der Dienst wird <strong>nur nach ausdrücklicher Einwilligung</strong> aktiviert. GA4 speichert keine IP-Adressen. Keine Daten werden für Werbezwecke genutzt. Einwilligung jederzeit widerrufbar (Schlüssel: <code>mgs_cookie_consent</code>).' },
    'priv.s8.app':   { fr:'<strong>Applications mobiles / PWA :</strong> Elles n\'utilisent aucun cookie publicitaire ni outil de traçage. Le stockage local (localStorage) est utilisé uniquement pour sauvegarder vos préférences et données de jeu en local sur votre appareil.', en:'<strong>Mobile / PWA apps:</strong> They use no advertising cookies or tracking tools. Local storage (localStorage) is used only to save your preferences and game data locally.', it:'<strong>App mobile / PWA:</strong> Non utilizzano cookie pubblicitari né strumenti di tracciamento. Il localStorage viene utilizzato solo per salvare preferenze e dati di gioco localmente.', de:'<strong>Mobile / PWA Apps:</strong> Sie verwenden keine Werbe-Cookies oder Tracking-Tools. Der lokale Speicher wird nur verwendet, um Einstellungen und Spieldaten lokal zu speichern.' },
    'priv.s9.h':     { fr:'9. Modifications de cette politique', en:'9. Changes to this policy', it:'9. Modifiche a questa politica', de:'9. Änderungen dieser Richtlinie' },
    'priv.s9.p':     { fr:'Nous nous réservons le droit de modifier cette politique à tout moment. En cas de modification substantielle, vous serez informé via l\'application ou par email.', en:'We reserve the right to modify this policy at any time. In case of substantial modification, you will be notified via the app or by email.', it:'Ci riserviamo il diritto di modificare questa politica in qualsiasi momento. In caso di modifica sostanziale, verrai informato tramite l\'app o via email.', de:'Wir behalten uns das Recht vor, diese Richtlinie jederzeit zu ändern. Bei wesentlichen Änderungen werden Sie über die App oder per E-Mail benachrichtigt.' },
    'priv.s10.h':    { fr:'10. Contact', en:'10. Contact', it:'10. Contatto', de:'10. Kontakt' },
    'priv.s10.p':    { fr:'Pour toute question relative à cette politique ou à vos données personnelles :', en:'For any questions about this policy or your personal data:', it:'Per qualsiasi domanda relativa a questa politica o ai tuoi dati personali:', de:'Für Fragen zu dieser Richtlinie oder Ihren personenbezogenen Daten:' },
    /* TERMS PAGE */
    'terms.title':   { fr:'Conditions d\'utilisation', en:'Terms of Use',     it:'Termini di utilizzo', de:'Nutzungsbedingungen' },
    'terms.subtitle':{ fr:'Applicable à l\'ensemble des applications MG Softwares', en:'Applicable to all MG Softwares applications', it:'Applicabile a tutte le applicazioni MG Softwares', de:'Gilt für alle MG Softwares Anwendungen' },
    'terms.back':    { fr:'← Retour au site', en:'← Back to site', it:'← Torna al sito', de:'← Zurück zur Website' },
    'terms.updated': { fr:'Dernière mise à jour : 3 mai 2026', en:'Last updated: May 3, 2026', it:'Ultimo aggiornamento: 3 maggio 2026', de:'Zuletzt aktualisiert: 3. Mai 2026' },
    'terms.s1.h':    { fr:'1. Présentation', en:'1. Overview', it:'1. Presentazione', de:'1. Übersicht' },
    'terms.s1.p1':   { fr:'<strong>MG Softwares</strong> est un studio de développement indépendant édité par <strong>Gilles Goudelin</strong>, France.', en:'<strong>MG Softwares</strong> is an independent development studio operated by <strong>Gilles Goudelin</strong>, France.', it:'<strong>MG Softwares</strong> è uno studio di sviluppo indipendente gestito da <strong>Gilles Goudelin</strong>, Francia.', de:'<strong>MG Softwares</strong> ist ein unabhängiges Entwicklungsstudio, betrieben von <strong>Gilles Goudelin</strong>, Frankreich.' },
    'terms.s1.p2':   { fr:'Les présentes conditions régissent l\'utilisation des applications suivantes :', en:'These terms govern the use of the following applications:', it:'I presenti termini regolano l\'utilizzo delle seguenti applicazioni:', de:'Diese Bedingungen regeln die Nutzung der folgenden Anwendungen:' },
    'terms.s2.h':    { fr:'2. Acceptation des conditions', en:'2. Acceptance of terms', it:'2. Accettazione dei termini', de:'2. Annahme der Bedingungen' },
    'terms.s2.p':    { fr:'En utilisant nos applications, vous acceptez les présentes conditions. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser nos applications.', en:'By using our applications, you accept these terms. If you do not accept them, please do not use our applications.', it:'Utilizzando le nostre applicazioni, accetti i presenti termini. Se non li accetti, ti preghiamo di non utilizzare le nostre applicazioni.', de:'Durch die Nutzung unserer Anwendungen akzeptieren Sie diese Bedingungen. Wenn Sie diese nicht akzeptieren, verwenden Sie bitte unsere Anwendungen nicht.' },
    'terms.s3.h':    { fr:'3. Description des services', en:'3. Service description', it:'3. Descrizione dei servizi', de:'3. Leistungsbeschreibung' },
    'terms.s3.gamiz':{ fr:'Application de gestion de jeux de société permettant le suivi des scores et l\'historique des parties. Propose une fonctionnalité optionnelle de sauvegarde sur Google Drive.', en:'Board game management app for tracking scores and game history. Offers an optional Google Drive backup feature.', it:'App di gestione giochi da tavolo per il monitoraggio dei punteggi e della cronologia. Offre una funzione opzionale di backup su Google Drive.', de:'Brettspiel-App zur Verfolgung von Punkteständen und Spielverlauf. Bietet eine optionale Google Drive-Backup-Funktion.' },
    'terms.s3.bf':   { fr:'Application de gestion budgétaire familiale permettant le suivi des salaires, dépenses, épargnes et courses.', en:'Family budget management app for tracking salaries, expenses, savings and shopping.', it:'App di gestione del budget familiare per il monitoraggio di stipendi, spese, risparmi e spesa.', de:'Familienbudget-App zur Verfolgung von Gehältern, Ausgaben, Ersparnissen und Einkäufen.' },
    'terms.s3.sz':   { fr:'Liste de courses partagée en temps réel.', en:'Real-time shared shopping list.', it:'Lista della spesa condivisa in tempo reale.', de:'Geteilte Einkaufsliste in Echtzeit.' },
    'terms.s3.az':   { fr:'Gestion du suivi automobile.', en:'Vehicle maintenance tracking.', it:'Gestione del monitoraggio automobilistico.', de:'Kfz-Wartungsverfolgung.' },
    'terms.s4.h':    { fr:'4. Accès et utilisation', en:'4. Access and use', it:'4. Accesso e utilizzo', de:'4. Zugang und Nutzung' },
    'terms.s4.li1':  { fr:'Les applications sont accessibles gratuitement ou via abonnement selon la formule choisie', en:'Apps are accessible for free or via subscription depending on the plan chosen', it:'Le app sono accessibili gratuitamente o tramite abbonamento in base al piano scelto', de:'Apps sind je nach gewähltem Plan kostenlos oder per Abonnement zugänglich' },
    'terms.s4.li2':  { fr:'L\'utilisateur est responsable de la sécurité de ses identifiants de connexion', en:'The user is responsible for the security of their login credentials', it:'L\'utente è responsabile della sicurezza delle proprie credenziali di accesso', de:'Der Nutzer ist für die Sicherheit seiner Zugangsdaten verantwortlich' },
    'terms.s4.li3':  { fr:'Toute utilisation frauduleuse ou abusive est strictement interdite', en:'Any fraudulent or abusive use is strictly prohibited', it:'Qualsiasi utilizzo fraudolento o abusivo è strettamente vietato', de:'Jede betrügerische oder missbräuchliche Nutzung ist streng verboten' },
    'terms.s4.li4':  { fr:'MG Softwares se réserve le droit de suspendre un compte en cas d\'abus', en:'MG Softwares reserves the right to suspend an account in case of abuse', it:'MG Softwares si riserva il diritto di sospendere un account in caso di abuso', de:'MG Softwares behält sich das Recht vor, ein Konto bei Missbrauch zu sperren' },
    'terms.s5.h':    { fr:'5. Données et confidentialité', en:'5. Data and privacy', it:'5. Dati e privacy', de:'5. Daten und Datenschutz' },
    'terms.s5.p1':   { fr:'La collecte et le traitement des données personnelles sont décrits dans notre', en:'The collection and processing of personal data is described in our', it:'La raccolta e il trattamento dei dati personali sono descritti nella nostra', de:'Die Erhebung und Verarbeitung personenbezogener Daten ist in unserer beschrieben' },
    'terms.s5.link': { fr:'Politique de confidentialité', en:'Privacy Policy', it:'Informativa sulla privacy', de:'Datenschutzerklärung' },
    'terms.s5.ga':   { fr:'Ce site utilise <strong>Google Analytics</strong> à des fins de mesure d\'audience statistique, <strong>uniquement après votre consentement explicite</strong>. Aucune donnée n\'est vendue ni partagée à des fins commerciales.', en:'This site uses <strong>Google Analytics</strong> for statistical audience measurement, <strong>only after your explicit consent</strong>. No data is sold or shared for commercial purposes.', it:'Questo sito utilizza <strong>Google Analytics</strong> per la misurazione statistica, <strong>solo dopo il consenso esplicito</strong>. Nessun dato viene venduto o condiviso.', de:'Diese Website verwendet <strong>Google Analytics</strong> zur statistischen Zielgruppenmessung, <strong>nur nach ausdrücklicher Einwilligung</strong>. Keine Daten werden verkauft oder geteilt.' },
    'terms.s5.box':  { fr:'🔒 Vos données ne sont jamais vendues ni partagées avec des tiers à des fins commerciales.', en:'🔒 Your data is never sold or shared with third parties for commercial purposes.', it:'🔒 I tuoi dati non vengono mai venduti né condivisi con terzi per scopi commerciali.', de:'🔒 Ihre Daten werden niemals für kommerzielle Zwecke an Dritte verkauft oder weitergegeben.' },
    'terms.s6.h':    { fr:'6. Utilisation de Google Drive (Gamiz)', en:'6. Google Drive usage (Gamiz)', it:'6. Utilizzo di Google Drive (Gamiz)', de:'6. Verwendung von Google Drive (Gamiz)' },
    'terms.s6.p':    { fr:'La connexion Google Drive est optionnelle. En l\'activant, vous autorisez Gamiz à créer et modifier uniquement le fichier de sauvegarde qu\'il a lui-même créé (<strong>scope drive.file</strong>). Vous pouvez révoquer cet accès à tout moment depuis', en:'Google Drive connection is optional. By enabling it, you authorize Gamiz to create and modify only the backup file it created itself (<strong>scope drive.file</strong>). You can revoke this access at any time from', it:'La connessione a Google Drive è opzionale. Attivandola, autorizzi Gamiz a creare e modificare solo il file di backup che ha creato esso stesso (<strong>scope drive.file</strong>). Puoi revocare questo accesso da', de:'Die Google Drive-Verbindung ist optional. Durch die Aktivierung autorisieren Sie Gamiz, nur die selbst erstellte Backup-Datei zu bearbeiten (<strong>scope drive.file</strong>). Widerruf jederzeit möglich über' },
    'terms.s7.h':    { fr:'7. Propriété intellectuelle', en:'7. Intellectual property', it:'7. Proprietà intellettuale', de:'7. Geistiges Eigentum' },
    'terms.s7.p':    { fr:'L\'ensemble des contenus, interfaces, logos et code source des applications MG Softwares sont la propriété exclusive de MG Softwares. Toute reproduction, distribution ou modification sans autorisation écrite est interdite.', en:'All content, interfaces, logos and source code of MG Softwares applications are the exclusive property of MG Softwares. Any reproduction, distribution or modification without written authorization is prohibited.', it:'Tutti i contenuti, le interfacce, i loghi e il codice sorgente sono proprietà esclusiva di MG Softwares. Qualsiasi riproduzione senza autorizzazione scritta è vietata.', de:'Alle Inhalte, Oberflächen, Logos und Quellcodes sind ausschließliches Eigentum von MG Softwares. Jede Vervielfältigung ohne schriftliche Genehmigung ist untersagt.' },
    'terms.s8.h':    { fr:'8. Disponibilité du service', en:'8. Service availability', it:'8. Disponibilità del servizio', de:'8. Dienstverfügbarkeit' },
    'terms.s8.p':    { fr:'MG Softwares s\'efforce d\'assurer la disponibilité de ses applications 24h/24 et 7j/7. Des interruptions peuvent survenir pour maintenance ou raisons techniques. MG Softwares ne saurait être tenu responsable des interruptions de service.', en:'MG Softwares strives to ensure 24/7 app availability. Interruptions may occur for maintenance or technical reasons. MG Softwares cannot be held responsible for service interruptions.', it:'MG Softwares si impegna a garantire la disponibilità delle app 24/7. Possono verificarsi interruzioni per manutenzione. MG Softwares non può essere ritenuta responsabile.', de:'MG Softwares ist bemüht, die Verfügbarkeit rund um die Uhr sicherzustellen. Unterbrechungen können aus technischen Gründen auftreten. MG Softwares haftet nicht dafür.' },
    'terms.s9.h':    { fr:'9. Limitation de responsabilité', en:'9. Limitation of liability', it:'9. Limitazione di responsabilità', de:'9. Haftungsbeschränkung' },
    'terms.s9.intro':{ fr:'MG Softwares ne peut être tenu responsable :', en:'MG Softwares cannot be held responsible for:', it:'MG Softwares non può essere ritenuta responsabile:', de:'MG Softwares kann nicht verantwortlich gemacht werden für:' },
    'terms.s9.li1':  { fr:'Des pertes de données liées à une mauvaise utilisation', en:'Data loss due to misuse', it:'Perdita di dati dovuta a un uso improprio', de:'Datenverlust durch Fehlanwendung' },
    'terms.s9.li2':  { fr:'Des dommages indirects résultant de l\'utilisation des applications', en:'Indirect damages resulting from the use of the applications', it:'Danni indiretti derivanti dall\'utilizzo delle applicazioni', de:'Mittelbare Schäden durch die Nutzung der Anwendungen' },
    'terms.s9.li3':  { fr:'Des interruptions de service dues à des tiers (hébergeur, Google, etc.)', en:'Service interruptions due to third parties (host, Google, etc.)', it:'Interruzioni del servizio dovute a terzi (host, Google, ecc.)', de:'Dienstunterbrechungen durch Dritte (Hoster, Google usw.)' },
    'terms.s10.h':   { fr:'10. Modifications des conditions', en:'10. Changes to terms', it:'10. Modifiche ai termini', de:'10. Änderungen der Bedingungen' },
    'terms.s10.p':   { fr:'MG Softwares se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés des modifications substantielles via l\'application ou par email.', en:'MG Softwares reserves the right to modify these terms at any time. Users will be notified of substantial changes via the app or by email.', it:'MG Softwares si riserva il diritto di modificare i presenti termini. Gli utenti saranno informati delle modifiche sostanziali tramite l\'app o via email.', de:'MG Softwares behält sich das Recht vor, diese Bedingungen jederzeit zu ändern. Nutzer werden über wesentliche Änderungen informiert.' },
    'terms.s11.h':   { fr:'11. Droit applicable', en:'11. Applicable law', it:'11. Legge applicabile', de:'11. Anwendbares Recht' },
    'terms.s11.p':   { fr:'Les présentes conditions sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.', en:'These terms are governed by French law. In case of dispute, French courts shall have exclusive jurisdiction.', it:'I presenti termini sono soggetti alla legge francese. In caso di controversia, i tribunali francesi saranno competenti.', de:'Diese Bedingungen unterliegen französischem Recht. Im Streitfall sind ausschließlich die französischen Gerichte zuständig.' },
    'terms.s12.h':   { fr:'12. Contact', en:'12. Contact', it:'12. Contatto', de:'12. Kontakt' },
    /* STATS (nouvelles clés) */
    'stats.free':   { fr:'Sans pub ni abo',  en:'No ads or sub',    it:'Nessuna pub',       de:'Keine Werbung'    },
    /* VALUES */
    'val.innov.name':{ fr:'Innovation',      en:'Innovation',       it:'Innovazione',       de:'Innovation'       },
    'val.innov.desc':{ fr:'Technologies actuelles, approches modernes du développement.', en:'Current technologies, modern development approaches.', it:'Tecnologie attuali, approcci moderni allo sviluppo.', de:'Aktuelle Technologien, moderne Entwicklungsansätze.' },
    /* APPS SECTION HEADER */
    'apps.tag.main':  { fr:'Applications',   en:'Apps',             it:'App',               de:'Apps'             },
    'apps.title.main':{ fr:'Mes créations',  en:'My creations',     it:'Le mie creazioni',  de:'Meine Werke'      },
    'apps.sub.main':  { fr:'Des applications conçues pour être utiles, belles et durables. Cliquez pour découvrir.', en:'Apps designed to be useful, beautiful and lasting. Click to discover.', it:'App progettate per essere utili, belle e durature. Clicca per scoprire.', de:'Apps für Nutzen, Ästhetik und Langlebigkeit. Klicken zum Entdecken.' },
    /* APP CARD DESCRIPTIONS */
    'app.gamiz.card.desc': { fr:'Calculateur de scores pour jeux de société. Skyjo, Qwirkle, Tarot, UNO et 4 autres. Historique complet, sync Google Drive.', en:'Score calculator for board games. Skyjo, Qwirkle, Tarot, UNO and 4 more. Full history, Google Drive sync.', it:'Calcolatore punteggi per giochi da tavolo. Skyjo, Qwirkle, Tarot, UNO e altri 4. Cronologia, sync Drive.', de:'Punkterechner für Brettspiele. Skyjo, Qwirkle, Tarot, UNO und 4 weitere. Verlauf, Google Drive Sync.' },
    'app.az.card.desc':    { fr:'Carnet d'entretien automobile intelligent. Réparations, contrats, rappels de révision. Données sur votre Google Drive.', en:'Smart vehicle maintenance logbook. Repairs, contracts, service reminders. Data on your Google Drive.', it:'Libretto auto intelligente. Riparazioni, contratti, promemoria revisione. Dati su Google Drive.', de:'Intelligentes Wartungslogbuch. Reparaturen, Verträge, Serviceerinnerungen. Daten auf Google Drive.' },
    'app.bf.card.desc':    { fr:'Gérez votre budget simplement. Dépenses, revenus, épargne, score de santé financière. Vos données sur Google Drive.', en:'Manage your budget simply. Expenses, income, savings, financial health score. Your data on Google Drive.', it:'Gestisci il budget semplicemente. Spese, entrate, risparmio, score finanziario. Dati su Google Drive.', de:'Budget einfach verwalten. Ausgaben, Einnahmen, Ersparnisse, Finanznote. Daten auf Google Drive.' },
    'app.vape.card.desc':  { fr:'Studio DIY e-liquid complet. Calculateur PG/VG/nicotine, recettes sauvegardées, steep tracker. Android PWA.', en:'Complete DIY e-liquid studio. PG/VG/nicotine calculator, saved recipes, steep tracker. Android PWA.', it:'Studio DIY e-liquid completo. Calcolatore PG/VG/nicotina, ricette salvate, steep tracker. Android PWA.', de:'Vollständiges DIY E-Liquid-Studio. PG/VG/Nikotin-Rechner, gespeicherte Rezepte, Steep-Tracker. Android PWA.' },
    /* APP TAGS */
    'app.tag.free':   { fr:'🆓 Gratuit',   en:'🆓 Free',     it:'🆓 Gratis',   de:'🆓 Kostenlos'  },
    'app.tag.reminders':{ fr:'🔔 Rappels', en:'🔔 Reminders',it:'🔔 Promemoria',de:'🔔 Erinnerungen'},
    'app.tag.sim':    { fr:'🔮 Simulation',en:'🔮 Simulation',it:'🔮 Simulazione',de:'🔮 Simulation' },
    'app.tag.recipes':{ fr:'📋 Recettes', en:'📋 Recipes',   it:'📋 Ricette',  de:'📋 Rezepte'    },
    'app.tag.calc':   { fr:'🧮 Calculateur',en:'🧮 Calculator',it:'🧮 Calcolatore',de:'🧮 Rechner' },
    'app.tag.games8': { fr:'🎮 8 jeux',   en:'🎮 8 games',  it:'🎮 8 giochi', de:'🎮 8 Spiele'   },
    'app.tag.stats2': { fr:'📊 Statistiques',en:'📊 Statistics',it:'📊 Statistiche',de:'📊 Statistiken' },
    /* APP PLATFORM */
    'app.plat.aw':    { fr:'📱 Android · Web', en:'📱 Android · Web', it:'📱 Android · Web', de:'📱 Android · Web' },
    'app.plat.apwa':  { fr:'📱 Android · PWA', en:'📱 Android · PWA', it:'📱 Android · PWA', de:'📱 Android · PWA' },
    'app.plat.a':     { fr:'📱 Android',       en:'📱 Android',       it:'📱 Android',       de:'📱 Android'       },
    /* APP CARD CTA */
    'app.discover':   { fr:'Découvrir →', en:'Discover →', it:'Scopri →', de:'Entdecken →' },
    /* APP STATUS */
    'app.status.live':{ fr:'Live', en:'Live', it:'Live', de:'Live' },
    /* CONTACT */
    'contact.tag':   { fr:'Contact',  en:'Contact',  it:'Contatto', de:'Kontakt'  },
    'contact.title': { fr:'Une question ? Un projet ?', en:'A question? A project?', it:'Una domanda? Un progetto?', de:'Eine Frage? Ein Projekt?' },
    'contact.desc':  { fr:"N'hésitez pas à me contacter pour toute demande ou retour sur les applications.", en:"Don't hesitate to contact me for any request or feedback on the applications.", it:"Non esitate a contattarmi per qualsiasi richiesta o feedback sulle applicazioni.", de:"Zögern Sie nicht, mich für Anfragen oder Feedback zu kontaktieren." },
    'contact.play':  { fr:'▶️ Google Play Store', en:'▶️ Google Play Store', it:'▶️ Google Play Store', de:'▶️ Google Play Store' },
    'contact.priv':  { fr:'🔒 Confidentialité', en:'🔒 Privacy', it:'🔒 Privacy', de:'🔒 Datenschutz' },
    /* FOOTER */
    'footer.about2': { fr:'À propos',      en:'About',    it:'Chi siamo',  de:'Über uns'   },
    'footer.apps2':  { fr:'Applications',  en:'Apps',     it:'App',        de:'Apps'       },
    'footer.priv2':  { fr:'Confidentialité',en:'Privacy', it:'Privacy',    de:'Datenschutz'},
    'footer.terms2': { fr:'CGU',           en:'Terms',    it:'Termini',    de:'Nutzungsbedingungen'},
    'footer.copy2':  { fr:'© 2026 MG Softwares — Gilles Goudelin', en:'© 2026 MG Softwares — Gilles Goudelin', it:'© 2026 MG Softwares — Gilles Goudelin', de:'© 2026 MG Softwares — Gilles Goudelin' },
    /* LEGAL MODALS HEADERS */
    'legal.priv.title':{ fr:'Politique de confidentialité', en:'Privacy Policy', it:'Informativa sulla privacy', de:'Datenschutzerklärung' },
    'legal.priv.badge':{ fr:'Dernière mise à jour : 3 mai 2026', en:'Last updated: May 3, 2026', it:'Ultimo aggiornamento: 3 maggio 2026', de:'Zuletzt aktualisiert: 3. Mai 2026' },
    'legal.priv.sub':  { fr:'Applicable à l'ensemble des applications MG Softwares', en:'Applicable to all MG Softwares applications', it:'Applicabile a tutte le applicazioni MG Softwares', de:'Gilt für alle MG Softwares Anwendungen' },
    'legal.terms.title':{ fr:'Conditions d'utilisation', en:'Terms of Use', it:'Termini di utilizzo', de:'Nutzungsbedingungen' },
    'legal.terms.badge':{ fr:'Dernière mise à jour : 3 mai 2026', en:'Last updated: May 3, 2026', it:'Ultimo aggiornamento: 3 maggio 2026', de:'Zuletzt aktualisiert: 3. Mai 2026' },
    'legal.terms.sub':  { fr:'Applicable à l'ensemble des applications MG Softwares', en:'Applicable to all MG Softwares applications', it:'Applicabile a tutte le applicazioni MG Softwares', de:'Gilt für alle MG Softwares Anwendungen' },
    /* APP MODALS HERO */
    'modal.gamiz.eye':  { fr:'🎮 Calculateur de scores',        en:'🎮 Score Calculator',          it:'🎮 Calcolatore punteggi',       de:'🎮 Punkterechner'         },
    'modal.gamiz.title':{ fr:'Vos soirées jeux méritent <span class="grad">mieux</span>', en:'Your game nights deserve <span class="grad">better</span>', it:'Le vostre serate meritano <span class="grad">di più</span>', de:'Ihre Spieleabende verdienen <span class="grad">mehr</span>' },
    'modal.gamiz.sub':  { fr:'Fini les feuilles de papier perdues. Gamiz gère tout pendant que vous profitez du jeu — 8 jeux, historique complet, sync Google Drive.', en:'No more lost paper sheets. Gamiz handles everything while you enjoy the game — 8 games, full history, Google Drive sync.', it:'Basta fogli persi. Gamiz gestisce tutto mentre giocate — 8 giochi, cronologia, sync Drive.', de:'Keine verlorenen Zettel mehr. Gamiz verwaltet alles — 8 Spiele, Verlauf, Drive-Sync.' },
    'modal.az.eye':     { fr:'🚗 Carnet d'entretien automobile', en:'🚗 Vehicle Maintenance Log',  it:'🚗 Libretto manutenzione auto', de:'🚗 Fahrzeug-Wartungslogbuch' },
    'modal.az.title':   { fr:'Votre voiture mérite <span class="grad">mieux</span>', en:'Your car deserves <span class="grad">better</span>', it:'La tua auto merita <span class="grad">di più</span>', de:'Ihr Auto verdient <span class="grad">mehr</span>' },
    'modal.az.sub':     { fr:'Suivez toutes vos réparations, gérez vos contrats d'entretien, recevez des rappels de révision. Vos données sur Google Drive — ou en local.', en:'Track all repairs, manage maintenance contracts, receive service reminders. Data on Google Drive — or locally.', it:'Monitora riparazioni, gestisci contratti, ricevi promemoria. Dati su Google Drive o in locale.', de:'Reparaturen, Wartungsverträge, Serviceerinnerungen verwalten. Daten auf Google Drive oder lokal.' },
    'modal.bf.eye':     { fr:'💰 Gestion budget familial',       en:'💰 Family budget management', it:'💰 Gestione budget familiare',   de:'💰 Familienbudget-Verwaltung'},
    'modal.bf.title':   { fr:'Simple, privé, <span class="grad">efficace</span>', en:'Simple, private, <span class="grad">effective</span>', it:'Semplice, privato, <span class="grad">efficace</span>', de:'Einfach, privat, <span class="grad">effektiv</span>' },
    'modal.bf.sub':     { fr:'Suivez vos dépenses, visualisez vos épargnes et atteignez vos objectifs — vos données restent sur votre Google Drive.', en:'Track expenses, visualize savings and reach your goals — your data stays on Google Drive.', it:'Tieni traccia delle spese, visualizza risparmi e raggiungi obiettivi — dati su Google Drive.', de:'Ausgaben verfolgen, Ersparnisse visualisieren, Ziele erreichen — Daten auf Google Drive.' },
    'modal.vape.eye':   { fr:'🧪 Studio DIY E-liquid',           en:'🧪 DIY E-liquid Studio',      it:'🧪 Studio DIY E-liquid',        de:'🧪 DIY E-Liquid-Studio'    },
    'modal.vape.title': { fr:'Créez vos recettes comme un <span class="grad">expert</span>', en:'Create your recipes like an <span class="grad">expert</span>', it:'Crea le tue ricette come un <span class="grad">esperto</span>', de:'Kreieren Sie Rezepte wie ein <span class="grad">Experte</span>' },
    'modal.vape.sub':   { fr:'Calculateur PG/VG/nicotine, recettes sauvegardées, steep tracker. Tout ce qu'il faut pour votre atelier DIY e-liquid.', en:'PG/VG/nicotine calculator, saved recipes, steep tracker. Everything you need for your DIY e-liquid workshop.', it:'Calcolatore PG/VG/nicotina, ricette salvate, steep tracker. Tutto il necessario per il laboratorio DIY.', de:'PG/VG/Nikotin-Rechner, gespeicherte Rezepte, Steep-Tracker. Alles für Ihr DIY E-Liquid-Labor.' },

  };

  /* ══ SÉLECTEUR DE LANGUES ══ */
  const LANGS = [
    { code:'fr', flag:'🇫🇷', label:'Français' },
    { code:'en', flag:'🇬🇧', label:'English'  },
    { code:'it', flag:'🇮🇹', label:'Italiano' },
    { code:'de', flag:'🇩🇪', label:'Deutsch'  },
  ];

  function injectStyles() {
    if (document.getElementById('mgs-i18n-styles')) return;
    var s = document.createElement('style');
    s.id = 'mgs-i18n-styles';
    s.textContent = `
      .mgs-lang-picker{position:relative;display:inline-flex;align-items:center;margin-left:12px;}
      .mgs-lang-btn{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:6px 11px;cursor:pointer;font-family:inherit;font-size:.82rem;font-weight:600;color:#f0f0f8;transition:background .2s,border-color .2s;white-space:nowrap;}
      .mgs-lang-btn:hover{background:rgba(255,255,255,0.11);border-color:rgba(255,255,255,0.22);}
      .mgs-arrow{font-size:.6rem;opacity:.55;transition:transform .2s;}
      .mgs-lang-picker.open .mgs-arrow{transform:rotate(180deg);}
      .mgs-lang-dd{position:absolute;top:calc(100% + 8px);right:0;background:#16161f;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:6px;display:none;flex-direction:column;gap:2px;box-shadow:0 16px 48px rgba(0,0,0,.55);min-width:140px;z-index:2147483646;animation:mgs-ddin .15s ease;}
      @keyframes mgs-ddin{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
      .mgs-lang-picker.open .mgs-lang-dd{display:flex;}
      .mgs-lang-opt{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:10px;cursor:pointer;font-size:.85rem;font-weight:500;color:#8888aa;transition:background .15s,color .15s;}
      .mgs-lang-opt:hover{background:rgba(255,255,255,.06);color:#f0f0f8;}
      .mgs-lang-opt.active{color:#9b5dff;font-weight:700;}
    `;
    document.head.appendChild(s);
  }

  function createPicker(lang) {
    injectStyles();
    var cur = LANGS.find(function(l){return l.code===lang;})||LANGS[0];
    var wrap = document.createElement('div');
    wrap.className = 'mgs-lang-picker';
    var btn = document.createElement('button');
    btn.className = 'mgs-lang-btn';
    btn.setAttribute('aria-haspopup','true');
    btn.innerHTML = '<span>'+cur.flag+'</span><span>'+cur.label+'</span><span class="mgs-arrow">▼</span>';
    var dd = document.createElement('div');
    dd.className = 'mgs-lang-dd';
    LANGS.forEach(function(l) {
      var opt = document.createElement('div');
      opt.className = 'mgs-lang-opt'+(l.code===lang?' active':'');
      opt.innerHTML = '<span>'+l.flag+'</span><span>'+l.label+'</span>';
      opt.addEventListener('click', function(e){
        e.stopPropagation();
        setLang(l.code);
        wrap.classList.remove('open');
      });
      dd.appendChild(opt);
    });
    btn.addEventListener('click', function(e){e.stopPropagation();wrap.classList.toggle('open');});
    document.addEventListener('click', function(){wrap.classList.remove('open');});
    wrap.appendChild(btn); wrap.appendChild(dd);
    return wrap;
  }


  /* ══ RENDU DES MODALES ══ */
  /* ══ MOTEUR ══ */
  function getLang() {
    try{return localStorage.getItem(STORAGE_KEY)||DEFAULT_LANG;}catch(e){return DEFAULT_LANG;}
  }

  function t(key) {
    var lang = getLang();
    var d = TRANSLATIONS[key];
    if(!d) return key;
    return d[lang]||d[DEFAULT_LANG]||key;
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      var d = TRANSLATIONS[key];
      if(!d) return;
      var text = d[lang]||d[DEFAULT_LANG]||'';
      if(text.indexOf('<')!==-1) el.innerHTML=text; else el.textContent=text;
    });
    document.documentElement.lang = lang;
    /* Titre de page */
    var titleKey = document.documentElement.getAttribute('data-title-i18n');
    if(titleKey && TRANSLATIONS[titleKey]) document.title = TRANSLATIONS[titleKey][lang]||document.title;
  }

  function mountPickers(lang) {
    /* Supprimer anciens */
    document.querySelectorAll('.mgs-lang-picker').forEach(function(p){p.remove();});
    /* Slot explicite dans la nav (index.html) */
    document.querySelectorAll('.nav-lang-slot').forEach(function(slot){
      slot.appendChild(createPicker(lang));
    });
    /* Fallback : header légal/légales (mgs-header-inner) */
    document.querySelectorAll('.mgs-header-inner').forEach(function(el){
      el.appendChild(createPicker(lang));
    });
    /* Dans la bannière cookie si elle existe */
    if(window._mgsUpdateCookieBanner) window._mgsUpdateCookieBanner(lang);
  }

  function setLang(code) {
    try{localStorage.setItem(STORAGE_KEY,code);}catch(e){}
    applyLang(code);
    mountPickers(code);
  }

  function init() {
    var lang = getLang();
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',function(){applyLang(lang);mountPickers(lang);});
    } else {
      applyLang(lang);
      mountPickers(lang);
    }
  }

  /* API publique */
  window._mgsI18n = { getLang:getLang, t:t, setLang:setLang };
  init();
})();
