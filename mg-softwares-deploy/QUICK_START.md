# ⚡ Quick Start (5 minutes)

## 🎯 Objectif
Tester votre nouveau site localement, puis le mettre en ligne sur GitHub Pages.

---

## 1️⃣ Tester localement (2 min)

```bash
# Aller au répertoire du projet
cd /c/Users/ggoudelin/VSCode_Projects/mg-softwares-main

# Lancer le serveur local
node server.js
```

**Résultat attendu:**
```
🚀 Serveur de test sur http://localhost:3000

📝 URLs à tester:
  - http://localhost:3000/ (accueil)
  - http://localhost:3000/gamiz/ (gamiz)
  - http://localhost:3000/autozen/ (autozen)
  - http://localhost:3000/privacy/ (privacy)
  - http://localhost:3000/terms/ (terms)

✅ Appuyez sur Ctrl+C pour arrêter
```

### ✅ Vérifications
- [ ] Site charge correctement
- [ ] Cliquer sur les liens fonctionne
- [ ] Pas d'erreurs en rouge dans DevTools (F12 → Console)

---

## 2️⃣ Vérifier les fichiers (1 min)

```bash
# Lister les fichiers clés
ls -la | grep -E "index|app.js|404|data|sitemap"
```

**Résultat attendu:**
```
index.html       ← Point d'entrée SPA
app.js           ← Routeur et rendering
404.html         ← Redirection SPA
data/pages.json  ← Contenu CMS
sitemap.xml      ← URLs pour Google
```

---

## 3️⃣ Préparer GitHub (2 min)

```bash
# Ajouter tous les changements
git add -A

# Créer le commit
git commit -m "Migration vers SPA avec clean URLs - Résolution problèmes indexation Google"

# Vérifier que tout est prêt
git status
```

**Résultat attendu:** `On branch main` / `nothing to commit`

---

## 4️⃣ Mettre en ligne (1 min)

### Étape A: Configurer GitHub Pages

1. Aller sur: https://github.com/ggoudelin/mg-softwares-main/settings
2. Chercher **"Pages"** dans le menu de gauche
3. Sélectionner: **Branch: main** / **Folder: /**
4. Cliquer **Save**

### Étape B: Push le code

```bash
git push origin main
```

### Étape C: Attendre ⏳

- 1-2 minutes pour que GitHub déploie
- Site accessible sur votre domaine

---

## ✅ Vérifier après déploiement

### Tester les URLs
```
✅ https://mg-softwares.fr/
✅ https://mg-softwares.fr/gamiz/
✅ https://mg-softwares.fr/autozen/
✅ https://mg-softwares.fr/privacy/
✅ https://mg-softwares.fr/terms/
```

### Vérifier le HTML source
Clic droit sur la page → "Afficher le source"

Vérifier:
```html
<title>MG Softwares — Applications...</title>
<meta name="description" content="...">
<link rel="canonical" href="...">
```

### Pas d'erreurs?
- F12 → Console
- Pas de texte rouge/erreur
- ✅ Site fonctionne!

---

## 🔴 Ça ne marche pas? 

### Erreur "Chargement..." infini
- ❌ `data/pages.json` introuvable
- ✅ Vérifier: `ls -la data/pages.json`
- ✅ Vérifier le chemin dans app.js: `/data/pages.json`

### Erreur dans la console
- Copier l'erreur
- Vérifier DEPLOYMENT.md section "Troubleshooting"

### Site pas accessible en live
- Attendre 2-3 minutes
- Vérifier GitHub Pages est activé
- Vérifier la branche est `main`

---

## 📖 Documentation complète

Si vous avez besoin de plus de détails:

1. **MIGRATION_COMPLETE.md** - Vue d'ensemble complète
2. **DEPLOYMENT.md** - Guide détaillé du déploiement
3. **CMS_GUIDE.md** - Comment modifier le contenu
4. **ARCHITECTURE.md** - Vue technique

---

## 🎯 Prochaines étapes

### Immédiatement
```bash
# 1. Tester localement
node server.js

# 2. Pousser vers GitHub
git push origin main
```

### Dans 2-3 minutes
- Vérifier que le site est en live
- Tester les URLs principales

### Demain
- Ajouter le site à **Google Search Console**
- Soumettre **sitemap.xml**
- Attendre l'indexation (24-48h)

---

## 🎉 C'est tout!

Vous avez maintenant:
- ✅ Un site moderne SPA
- ✅ Clean URLs (pas de redirections)
- ✅ Cache local (IndexedDB)
- ✅ SEO optimisé
- ✅ Google Pages compatible
- ✅ CMS facile à maintenir

**Félicitations! 🚀**

---

## 🆘 Besoin d'aide?

```
1. Vérifier la console (F12)
2. Lire le section appropriée dans DEPLOYMENT.md
3. Vérifier les fichiers clés existent
4. Relancer le serveur
```

**Prêt? Commencez par `node server.js`!** 🎯
