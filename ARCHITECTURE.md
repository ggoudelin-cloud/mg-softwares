# Architecture - MG Softwares CMS

## 🏗️ Vue d'ensemble

Site SPA (Single Page Application) avec:
- **Routing côté client** (pas de redirections)
- **IndexedDB** pour cache local
- **Meta tags dynamiques** pour SEO
- **GitHub Pages compatible**
- **Clean URLs** sans extensions .html

## 📁 Structure des fichiers

```
/
├── index.html          # Point d'entrée unique
├── app.js              # Logique SPA + routing + IndexedDB
├── data/
│   └── pages.json      # Configuration des pages (CMS)
├── 404.html            # Redirection SPA pour GitHub Pages
├── sitemap.xml         # URLs propres pour Google
├── robots.txt          # Directives crawler
├── favicon.ico         # Icônes
└── _archive/           # Pages HTML anciennes (backup)
```

## 🎯 Fonctionnement

### 1. **Routing côté client**
- L'utilisateur accède à `/gamiz/`
- GitHub Pages renvoie 404 → `404.html`
- `404.html` redirige vers `index.html?/gamiz/`
- `app.js` parse l'URL et charge la page correcte
- Pas de redirections HTTP visibles par Google

### 2. **Gestion des pages**
Fichier `data/pages.json`:
```json
{
  "pages": [
    {
      "slug": "gamiz",
      "title": "Gamiz — Calculateur de scores",
      "description": "...",
      "type": "product"
    }
  ]
}
```

### 3. **Cache avec IndexedDB**
- Rechargement instantané des pages
- Fonctionne hors ligne
- Cache de 24h

### 4. **SEO optimisé**
- Meta tags mis à jour dynamiquement
- JSON-LD schema pour Google
- Open Graph pour réseaux sociaux
- Twitter Cards
- Canonical URLs propres

## 🔄 Migration depuis l'ancienne structure

**Avant:**
- `index.html` → page accueil
- `gamiz.html` → page produit
- `autozen.html` → page produit
- Redirections 301 nécessaires

**Après:**
- Tout passe par `index.html`
- URLs: `/gamiz/`, `/autozen/`, `/privacy/`, `/terms/`
- Pas de redirections

## 🚀 Déploiement sur GitHub Pages

### Prérequis
- Repository public sur GitHub
- Settings → Pages → Source: `main` (ou votre branche)

### Configuration (déjà faite)
- ✅ `404.html` configuré
- ✅ `index.html` SPA
- ✅ `app.js` avec routing
- ✅ `data/pages.json` CMS

### Après push
1. Site accessible sur `https://USERNAME.github.io/mg-softwares-main/`
2. Google indexe les clean URLs
3. Pas de redirections détectées

## 📝 Ajouter une nouvelle page

1. Éditer `data/pages.json`:
```json
{
  "slug": "nouvelle-page",
  "title": "Titre pour le navigateur",
  "description": "Meta description",
  "keywords": "mots clés",
  "type": "product|legal|home",
  "canonical": "https://mg-softwares.fr/nouvelle-page/"
}
```

2. Ajouter le contenu dans `app.js` (fonction `renderPage()`)

3. Mettre à jour `sitemap.xml`

## 🔒 Sécurité

- CSP (Content Security Policy) stricte
- X-Frame-Options: DENY
- Referrer stricte
- Nosniff headers

## ♿ Accessibilité

- Structure HTML sémantique
- Contraste de couleurs adéquat
- Navigation au clavier
- ARIA labels si nécessaire

## ⚡ Performance

- ✅ Pas de rechargement page complet
- ✅ IndexedDB pour cache local
- ✅ Fonts préconnect
- ✅ CSS minifié inline
- ✅ Chargement JS asynchrone

## 🎨 Thème

- Variables CSS pour styling cohérent
- Mode sombre par défaut
- Responsive design
- Animations subtiles

## 📊 Analytics

Pour ajouter Google Analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXX');
</script>
```

(CSP déjà autorise `googletagmanager.com`)

## 🐛 Troubleshooting

### Les pages ne chargent pas
- Vérifier la console browser (DevTools → Console)
- Vérifier que `data/pages.json` existe et est valide
- Vérifier IndexedDB (DevTools → Application)

### Google n'indexe pas les pages
- Vérifier le sitemap.xml avec Google Search Console
- Attendre 24-48h pour le premier crawl
- Pas de redirections = pas de problème

### Problèmes de CSS
- Vérifier les variables CSS dans `:root`
- Contrôler les préfixes `-webkit-`
- Test sur Chrome/Firefox/Safari

## 📚 Ressources

- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [GitHub Pages SPA](https://github.com/rafgraph/spa-github-pages)
- [Google SEO Guidelines](https://developers.google.com/search/docs)

## 📄 Licence

MG Softwares © 2026 - Tous droits réservés
