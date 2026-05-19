# 🚀 MG Softwares — Site SPA Modern

**Studio de développement indépendant français** • Applications mobiles & web • Gamiz • AutoZen • Budget Familial • ShopZen

[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue)](https://mg-softwares.fr)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)
[![Node.js](https://img.shields.io/badge/Requires-Node.js%2016+-green)](https://nodejs.org)

---

## ✨ Caractéristiques

### 🎯 Architecture
- **Single Page Application (SPA)** - Pas de rechargement page
- **Routing côté client** - Expérience fluide
- **Clean URLs** - `/gamiz/` au lieu de `/gamiz.html`
- **Pas de redirections** - Parfait pour Google Search

### 💾 Données
- **JSON CMS** - Contenu centralisé dans `data/pages.json`
- **IndexedDB** - Cache local pour chargement rapide
- **24h de cache** - Fonctionne hors ligne

### 🔍 SEO
- **Meta tags dynamiques** - Title, description, keywords mis à jour
- **Open Graph & Twitter Cards** - Partage optimal sur réseaux sociaux
- **JSON-LD Schema** - Données structurées pour Google
- **Canonical URLs** - Évite le duplicate content
- **Sitemap.xml** - URLs propres pour crawlers

### ⚡ Performance
- **CSS minifié inline** - Pas de requête CSS externe
- **Fonts préconnect** - Chargement optimisé
- **Lazy loading** - Ressources chargées à la demande
- **Pas de dépendances lourdes** - Vanilla JavaScript

### 🔒 Sécurité
- **CSP (Content Security Policy)** - Blocage des XSS
- **X-Frame-Options: DENY** - Protection clickjacking
- **Referrer stricte** - Privacy-first
- **Nosniff headers** - Type MIME sécurisé

---

## 🚀 Démarrage rapide

### 1. Tester localement
```bash
# Cloner le repo (si needed)
git clone https://github.com/ggoudelin/mg-softwares-main.git
cd mg-softwares-main

# Lancer le serveur local
node server.js

# Ouvrir http://localhost:3000
```

### 2. Modifier le contenu
Éditer `data/pages.json` pour les meta tags:
```json
{
  "slug": "gamiz",
  "title": "Gamiz — Calculateur de scores",
  "description": "Application gratuite pour jeux de société"
}
```

Puis modifier le contenu dans `app.js`:
```javascript
renderProduct(page) {
  // Votre HTML ici
}
```

### 3. Déployer sur GitHub Pages
```bash
git add -A
git commit -m "Mise à jour contenu"
git push origin main
```

---

## 📁 Structure du projet

```
.
├── index.html              # Point d'entrée SPA
├── app.js                  # Routeur + Rendering + IndexedDB
├── 404.html                # Redirection SPA pour GitHub Pages
├── data/
│   └── pages.json         # CMS - Configuration des pages
├── sitemap.xml            # URLs pour Google
├── robots.txt             # Directives crawlers
├── server.js              # Serveur de test Node.js
├── QUICK_START.md         # Démarrage rapide (⭐ LIRE D'ABORD)
├── DEPLOYMENT.md          # Guide détaillé du déploiement
├── CMS_GUIDE.md          # Comment gérer le contenu
├── ARCHITECTURE.md        # Vue technique du projet
└── MIGRATION_COMPLETE.md  # Vue d'ensemble complète
```

---

## 🎯 Routes disponibles

| Route | Description | Type |
|-------|-------------|------|
| `/` | Accueil | home |
| `/gamiz/` | Calculateur de scores jeux | product |
| `/autozen/` | Suivi automobile | product |
| `/privacy/` | Politique de confidentialité | legal |
| `/terms/` | Conditions d'utilisation | legal |

---

## 📚 Documentation

- **⚡ [QUICK_START.md](QUICK_START.md)** - Démarrage en 5 minutes
- **🚀 [DEPLOYMENT.md](DEPLOYMENT.md)** - Guide complet du déploiement
- **📝 [CMS_GUIDE.md](CMS_GUIDE.md)** - Gestion du contenu et ajout de pages
- **🏗️ [ARCHITECTURE.md](ARCHITECTURE.md)** - Documentation technique détaillée
- **✅ [MIGRATION_COMPLETE.md](MIGRATION_COMPLETE.md)** - Vue d'ensemble de la migration

---

## 🔧 Modification du contenu

### Modifier une page existante
1. Éditer `data/pages.json` (title, description, etc.)
2. Éditer la fonction de rendu dans `app.js`
3. Tester localement: `node server.js`
4. Commit et push

### Ajouter une nouvelle page
1. Ajouter entrée dans `data/pages.json`
2. Créer fonction `render[PageType]()` dans `app.js`
3. Ajouter lien de navigation dans `index.html`
4. Ajouter URL dans `sitemap.xml`

**Voir [CMS_GUIDE.md](CMS_GUIDE.md) pour exemples détaillés**

---

## 🌐 Déploiement

### GitHub Pages (recommandé)
```bash
# 1. Configurer dans settings repo
# Settings → Pages → Branch: main, Folder: /

# 2. Pousser le code
git push origin main

# 3. Attendre 1-2 minutes
# Site accessible sur https://mg-softwares.fr
```

### Vérifier l'indexation Google
```bash
# Dans Google Search Console:
# 1. Ajouter propriété: https://mg-softwares.fr
# 2. Soumettre sitemap.xml
# 3. Attendre 24-48h l'indexation
```

---

## 🧪 Tests

### Avant le déploiement
```bash
# Vérifier la syntaxe JSON
cat data/pages.json | python -m json.tool

# Lancer le serveur
node server.js

# Tester les routes:
# http://localhost:3000/
# http://localhost:3000/gamiz/
# http://localhost:3000/autozen/
```

### Après le déploiement
- Vérifier les URLs en live
- Vérifier le source HTML (F12)
- Vérifier pas d'erreurs console
- Vérifier meta tags changent

---

## 📊 Avant/Après

| Métrique | Avant | Après |
|----------|-------|-------|
| Fichiers HTML | 6 | 1 |
| Redirections HTTP | 5+ | 0 ✅ |
| Indexation Google | ❌ Problématique | ✅ Clean |
| Performance | Moyen | Rapide |
| Maintenabilité | Difficile | Facile |
| Cache local | ❌ | ✅ IndexedDB |

---

## 🆘 Troubleshooting

### Site affiche "Chargement..." infini
- Vérifier `data/pages.json` existe
- Vérifier le chemin dans app.js: `/data/pages.json`
- Vérifier console (F12) pour erreurs

### Pages ne chargent pas
- Hard refresh: **Ctrl+Shift+R**
- Vider IndexedDB: DevTools → Application → Clear site data
- Vérifier la syntaxe du slug dans JSON

### Google n'indexe pas
- Attendre 24-48h (normal pour premier crawl)
- Vérifier sitemap.xml dans Search Console
- Pas de redirections = ✅

**Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour plus de détails**

---

## 📋 Checklist avant production

- [ ] Tester localement avec `node server.js`
- [ ] Vérifier pas d'erreurs console
- [ ] Vérifier navigation fonctionne
- [ ] Vérifier meta tags changent
- [ ] Commit et push vers GitHub
- [ ] Vérifier GitHub Pages est activé
- [ ] Tester les URLs en live
- [ ] Vérifier le source HTML

---

## 🤝 Support

Questions ou problèmes?
1. Lire la documentation appropriée (voir ci-dessus)
2. Vérifier les DevTools (F12 → Console)
3. Lire [DEPLOYMENT.md](DEPLOYMENT.md) section Troubleshooting

---

## 📄 Licence

© 2026 MG Softwares — Tous droits réservés

---

## 🎉 Créé avec ❤️

**Architecture**: SPA moderne avec clean URLs
**Framework**: Vanilla JavaScript (0 dépendances)
**Hosting**: GitHub Pages
**CMS**: JSON flat-file

**Prêt à lancer? Commencez par [QUICK_START.md](QUICK_START.md)! 🚀**
