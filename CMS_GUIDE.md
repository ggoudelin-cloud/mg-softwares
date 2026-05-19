# 📝 Guide CMS - Gestion du contenu

## Vue d'ensemble

Votre site fonctionne désormais comme un **CMS** simple basé sur JSON:
- **Contenu centralisé** dans `data/pages.json`
- **Routing automatique** basé sur les slugs
- **Meta tags dynamiques** pour SEO

---

## 📁 Structure de `data/pages.json`

```json
{
  "pages": [
    {
      "slug": "identifiant-unique",
      "title": "Titre du navigateur (< 60 caractères)",
      "description": "Meta description (< 160 caractères)",
      "keywords": "mots, clés, pertinents",
      "type": "home|product|legal|custom",
      "canonical": "https://mg-softwares.fr/identifiant-unique/",
      "ogImage": "https://mg-softwares.fr/image.png",
      "ogType": "website|article|product"
    }
  ]
}
```

---

## 🏠 Pages actuelles

### 1. **Accueil** (`slug: ""`)
```json
{
  "slug": "",
  "title": "MG Softwares — Applications mobiles & web",
  "description": "Studio de développement indépendant français...",
  "type": "home"
}
```
**URL:** `/`
**Modifié dans:** `app.js` → `renderHome()`

### 2. **Gamiz** (`slug: "gamiz"`)
```json
{
  "slug": "gamiz",
  "title": "Gamiz — Calculateur de scores pour jeux de société",
  "type": "product"
}
```
**URL:** `/gamiz/`
**Modifié dans:** `app.js` → `renderProduct()`

### 3. **AutoZen** (`slug: "autozen"`)
```json
{
  "slug": "autozen",
  "title": "AutoZen — Suivi automobile",
  "type": "product"
}
```
**URL:** `/autozen/`
**Modifié dans:** `app.js` → `renderProduct()`

### 4. **Confidentialité** (`slug: "privacy"`)
```json
{
  "slug": "privacy",
  "title": "Politique de confidentialité",
  "type": "legal"
}
```
**URL:** `/privacy/`
**Modifié dans:** `app.js` → `renderLegal()`

### 5. **Conditions** (`slug: "terms"`)
```json
{
  "slug": "terms",
  "title": "Conditions d'utilisation",
  "type": "legal"
}
```
**URL:** `/terms/`
**Modifié dans:** `app.js` → `renderLegal()`

---

## ✏️ Modifier une page existante

### Cas 1: Changer le titre ou description

**Fichier:** `data/pages.json`

```json
{
  "slug": "gamiz",
  "title": "Gamiz — Votre nouveau titre",  // ← Changer ici
  "description": "Nouvelle description",   // ← Changer ici
  "type": "product"
}
```

**Puis:** Commit et push
```bash
git add data/pages.json
git commit -m "Mise à jour titre/description Gamiz"
git push
```

### Cas 2: Modifier le contenu de la page

**Fichier:** `app.js`

Pour modifier le contenu produit (Gamiz/AutoZen):
```javascript
renderProduct(page) {
  const title = page.slug === 'gamiz' ?
    '🎲 Gamiz — Votre nouveau titre' :  // ← Changer ici
    '🚗 AutoZen — Suivi automobile';

  const description = page.slug === 'gamiz' ?
    'Nouveau contenu du produit' :  // ← Changer ici
    'Autre description';

  // ...
}
```

Pour modifier les pages légales (Privacy/Terms):
```javascript
const content = page.slug === 'privacy' ? `
  <h2>1. Responsable du traitement</h2>
  <p>Votre nouveau contenu ici</p>  <!-- ← Changer ici -->
` : `
  <!-- Contenu Terms -->
`;
```

**Puis:** Commit et push
```bash
git add app.js
git commit -m "Mise à jour contenu Gamiz"
git push
```

---

## ➕ Ajouter une nouvelle page

### Étape 1: Ajouter à `data/pages.json`

```json
{
  "slug": "blog",
  "title": "Blog — MG Softwares",
  "description": "Actualités et articles sur nos applications",
  "keywords": "blog, actualités, MG Softwares",
  "type": "blog",
  "canonical": "https://mg-softwares.fr/blog/",
  "ogType": "website"
}
```

### Étape 2: Ajouter la fonction de rendu dans `app.js`

```javascript
renderPage(page) {
  const app = document.getElementById('app');

  if (page.type === 'home') {
    app.innerHTML = this.renderHome();
  } else if (page.type === 'product') {
    app.innerHTML = this.renderProduct(page);
  } else if (page.type === 'legal') {
    app.innerHTML = this.renderLegal(page);
  } else if (page.type === 'blog') {  // ← Ajouter
    app.innerHTML = this.renderBlog(page);
  } else {
    this.renderNotFound();
  }
}

// Ajouter la fonction de rendu
renderBlog(page) {
  return `
    <div class="page-content">
      <section style="position: relative; z-index: 1; padding: 100px 40px;">
        <div style="max-width: 900px; margin: 0 auto;">
          <h1 style="font-size: 2.5rem; margin-bottom: 40px;">Blog</h1>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;">
            <article style="background: var(--gl); border: 1px solid var(--bd); border-radius: 20px; padding: 30px;">
              <h2 style="margin-bottom: 10px;">Article 1</h2>
              <p style="color: var(--tx2); margin-bottom: 15px;">Contenu de l'article...</p>
              <small style="color: var(--tx3);">19 mai 2026</small>
            </article>
          </div>
        </div>
      </section>
    </div>
  `;
}
```

### Étape 3: Mettre à jour la navigation

Dans `index.html`, ajouter le lien:
```html
<a onclick="app.navigate('blog')">Blog</a>
```

### Étape 4: Mettre à jour le sitemap

**Fichier:** `sitemap.xml`
```xml
<url>
  <loc>https://mg-softwares.fr/blog/</loc>
  <lastmod>2026-05-19</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
```

### Étape 5: Commit et push
```bash
git add data/pages.json app.js index.html sitemap.xml
git commit -m "Ajout page Blog"
git push
```

---

## 🎨 Améliorer le design

### Ajouter des styles globaux

**Fichier:** `index.html` (section `<style>`)

```css
/* Nouveau style */
.article-card {
  background: var(--gl);
  border: 1px solid var(--bd);
  border-radius: 20px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.article-card:hover {
  border-color: rgba(212, 135, 126, 0.3);
  transform: translateY(-3px);
}
```

**Puis utiliser dans `app.js`:**
```html
<article class="article-card">
  <h2>Titre</h2>
  <p>Contenu</p>
</article>
```

---

## 🔍 Bonnes pratiques SEO

### Pour chaque page, vérifier:

✅ **Title (< 60 caractères)**
```json
"title": "Gamiz — Calculateur de scores pour jeux"
```

✅ **Description (< 160 caractères)**
```json
"description": "Application gratuite pour gérer les scores de vos jeux. Sync Google Drive."
```

✅ **Keywords (5-10 pertinents)**
```json
"keywords": "gamiz, scores, jeux, société, gratuit"
```

✅ **Canonical URL**
```json
"canonical": "https://mg-softwares.fr/gamiz/"
```

✅ **Open Graph image**
```json
"ogImage": "https://mg-softwares.fr/android-chrome-512x512.png"
```

---

## 📊 Exemple: Modifier la page d'accueil

### 1. Modifier le titre dans `data/pages.json`
```json
{
  "slug": "",
  "title": "MG Softwares — Votre nouveau titre",
  "description": "Nouvelle description..."
}
```

### 2. Modifier le contenu dans `app.js`
```javascript
renderHome() {
  return `
    <div class="page-content">
      <section class="hero">
        <h1 class="hero-title">Votre nouveau titre</h1>
        <p class="hero-sub">Votre nouvelle description</p>
        <!-- Reste du contenu -->
      </section>
    </div>
  `;
}
```

### 3. Vérifier localement
```bash
node server.js
# Visiter http://localhost:3000
```

### 4. Commit et push
```bash
git add data/pages.json app.js
git commit -m "Mise à jour contenu accueil"
git push
```

---

## 🗑️ Supprimer une page

### 1. Supprimer de `data/pages.json`
```json
// Supprimer l'objet page entier
```

### 2. Supprimer du HTML de navigation
```html
<!-- Supprimer le lien dans <nav> -->
```

### 3. Supprimer la fonction de rendu (optionnel)
Dans `app.js`, vous pouvez laisser la fonction même si elle n'est pas utilisée

### 4. Supprimer du sitemap
```xml
<!-- Supprimer l'URL du sitemap -->
```

### 5. Commit et push
```bash
git add data/pages.json index.html sitemap.xml
git commit -m "Suppression page [nom]"
git push
```

---

## 💾 Sauvegarder les modifications

```bash
# Voir les fichiers modifiés
git status

# Ajouter les changements
git add data/pages.json app.js

# Créer un commit
git commit -m "Description claire des changements"

# Envoyer à GitHub
git push origin main
```

---

## 🐛 Tester les changements

### Avant de pousser:
1. **Test local:** `node server.js`
2. **Vérifier la console:** F12 → Console (aucune erreur rouge)
3. **Tester la navigation:** Cliquer sur tous les liens
4. **Vérifier les meta tags:** F12 → Elements → `<head>`

### Après le push:
1. **Attendre le déploiement** (1-2 minutes)
2. **Visiter le site** en live
3. **Tester les URLs** principales
4. **Vérifier le source** (Clic droit → "Voir le source")

---

## 📚 Champs optionnels

Vous pouvez ajouter des champs personnalisés:

```json
{
  "slug": "gamiz",
  "title": "...",
  "author": "Gilles Goudelin",        // ← Champ custom
  "publishedDate": "2026-05-19",     // ← Champ custom
  "category": "Product",              // ← Champ custom
  "customField": "valeur"            // ← Champ custom
}
```

**Puis utiliser dans app.js:**
```javascript
renderProduct(page) {
  console.log(page.author);      // Accéder au champ
  console.log(page.publishedDate);
}
```

---

## ✨ Résumé des commandes

```bash
# Vérifier les changements
git status

# Ajouter tout
git add -A

# Créer un commit
git commit -m "Description"

# Pousser
git push

# Voir l'historique
git log --oneline

# Récupérer les derniers changements
git pull
```

---

## 🆘 Aide

- **Syntax JSON invalide?** → Vérifier avec https://jsonlint.com/
- **Erreur JavaScript?** → DevTools F12 → Console
- **Page ne s'affiche pas?** → Vérifier le `slug` dans JSON vs app.js
- **Meta tags ne changent pas?** → Hard refresh: Ctrl+Shift+R

---

**Votre contenu, facilement gérable! 🎉**
