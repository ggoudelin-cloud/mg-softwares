# 📦 Guide de déploiement avec ZIP

## ✅ Fichier ZIP créé

**Fichier:** `mg-softwares-deploy.zip` (31 KB)

Contient tous les fichiers nécessaires pour mettre à jour votre site GitHub Pages.

---

## 📋 Contenu du ZIP

```
mg-softwares-deploy/
├── index.html                  (12 KB)  ← REMPLACER l'ancien
├── app.js                      (16 KB)  ← NOUVEAU (Routeur SPA)
├── 404.html                    (747 B)  ← REMPLACER l'ancien
├── data/
│   └── pages.json              (2.6 KB) ← NOUVEAU (CMS)
├── sitemap.xml                 (921 B)  ← REMPLACER l'ancien
├── robots.txt                  (104 B)  ← REMPLACER l'ancien
├── README.md                   (7 KB)   ← Documentation
├── QUICK_START.md              (4 KB)   ← Démarrage rapide
├── DEPLOYMENT.md               (8 KB)   ← Guide détaillé
├── CMS_GUIDE.md                (10 KB)  ← Gestion contenu
├── ARCHITECTURE.md             (4.5 KB) ← Vue technique
├── MIGRATION_COMPLETE.md       (9 KB)   ← Vue d'ensemble
└── INSTRUCTIONS_DEPLOY.txt     (8 KB)   ← Étapes déploiement
```

---

## 🚀 Étapes de déploiement (5 minutes)

### 1️⃣ Télécharger et extraire

- Télécharger `mg-softwares-deploy.zip`
- Extraire le ZIP → Vous obtenez un dossier `mg-softwares-deploy/`

### 2️⃣ Copier les fichiers

Ouvrir le dossier `mg-softwares-deploy/` et copier:

**À la racine du repository** (`mg-softwares-main/`):
```
index.html       ← Remplacer l'ancien
app.js           ← Ajouter (NOUVEAU)
404.html         ← Remplacer l'ancien
sitemap.xml      ← Remplacer l'ancien
robots.txt       ← Remplacer l'ancien
README.md        ← Remplacer l'ancien
QUICK_START.md   ← Ajouter
DEPLOYMENT.md    ← Ajouter
CMS_GUIDE.md     ← Ajouter
ARCHITECTURE.md  ← Ajouter
MIGRATION_COMPLETE.md ← Ajouter
```

**Dans le dossier `data/`** (créer s'il n'existe pas):
```
pages.json       ← Ajouter (NOUVEAU)
```

### 3️⃣ Vérifier les fichiers

Après copie, votre dossier `mg-softwares-main/` doit contenir:
```
mg-softwares-main/
├── index.html              (✅ remplacé)
├── app.js                  (✨ nouveau)
├── 404.html                (✅ remplacé)
├── data/
│   └── pages.json         (✨ nouveau)
├── sitemap.xml             (✅ remplacé)
├── robots.txt              (✅ remplacé)
├── favicon.ico             (✅ garder)
├── favicon.svg             (✅ garder)
├── apple-touch-icon.png    (✅ garder)
├── android-chrome-*.png    (✅ garder)
├── site.webmanifest        (✅ garder)
├── CNAME                   (✅ garder)
└── [Documentation files]
```

### 4️⃣ Commit et Push

Ouvrir Terminal/PowerShell:

```bash
# Aller au dossier
cd C:\Users\ggoudelin\VSCode_Projects\mg-softwares-main

# Ajouter les changements
git add -A

# Créer un commit
git commit -m "Migration vers SPA avec clean URLs - Déploiement en ligne"

# Pousser vers GitHub
git push origin main
```

### 5️⃣ Attendre le déploiement

⏳ **1-2 minutes** pour que GitHub Pages déploie

### 6️⃣ Tester en live

Visiter:
- ✅ https://mg-softwares.fr/ (accueil)
- ✅ https://mg-softwares.fr/gamiz/ (produit)
- ✅ https://mg-softwares.fr/autozen/ (produit)
- ✅ https://mg-softwares.fr/privacy/ (legal)
- ✅ https://mg-softwares.fr/terms/ (legal)

**Important:** Vérifier en **F12 → Console** qu'il n'y a pas d'erreurs rouges

---

## ⚠️ Points importants

### Ne PAS supprimer
- ✅ favicon.ico, favicon.svg
- ✅ apple-touch-icon.png
- ✅ android-chrome-*.png (icônes)
- ✅ site.webmanifest
- ✅ CNAME (votre domaine custom)
- ✅ Anciens .html (gamiz.html, autozen.html, etc.) si vous les gardez

### Structure de dossier
- **Important:** `data/` doit être un **DOSSIER** (pas un fichier)
- **Important:** `pages.json` doit être **DANS** le dossier `data/`
- **Important:** `app.js` doit être à la **RACINE** (pas dans un sous-dossier)

### Vérification avant push
```bash
# Voir ce qui va être poussé
git status

# Voir le contenu du dossier
ls -la
ls -la data/
cat data/pages.json  # Vérifier que c'est du JSON valide
```

---

## 🔍 Troubleshooting

### Site affiche "Chargement..." infini
- ❌ `data/pages.json` manquant
- ✅ Vérifier que le dossier `data/` contient `pages.json`

### Erreur dans la console (F12)
- ❌ Mauvais chemin pour app.js
- ✅ Vérifier que `app.js` est à la racine
- ✅ Vérifier que `data/pages.json` existe

### Le site n'a pas changé
- ⏳ Attendre 2-3 minutes
- 🔄 Vider le cache: **Ctrl+Shift+R** (hard refresh)
- DevTools: F12 → Application → Clear site data

### Erreur lors du push
- ❌ Conflits non résous
- ✅ Lancer: `git pull origin main` d'abord
- ✅ Puis: `git push origin main`

---

## 📖 Documentation incluse

Lire dans cet ordre:

1. **INSTRUCTIONS_DEPLOY.txt** (dans le ZIP)
   - 5 minutes - Vue d'ensemble

2. **QUICK_START.md**
   - 5 minutes - Démarrage rapide

3. **DEPLOYMENT.md**
   - Guide complet avec tous les détails

4. **CMS_GUIDE.md**
   - Comment modifier le contenu et ajouter des pages

5. **ARCHITECTURE.md**
   - Comprendre le fonctionnement technique

---

## ✅ Checklist finale

Avant de visiter le site en live:

- [ ] ZIP extrait
- [ ] Tous les fichiers copiés à la bonne place
- [ ] `data/pages.json` existe
- [ ] `app.js` existe à la racine
- [ ] Git add effectué
- [ ] Commit créé
- [ ] Push effectué
- [ ] Attendre 2 minutes
- [ ] Visiter https://mg-softwares.fr/
- [ ] F12 → Console (aucune erreur rouge)
- [ ] Cliquer sur les liens
- [ ] Tester toutes les pages

---

## 🎉 Résultat attendu

Une fois le déploiement réussi:

✅ Site charge instantanément (SPA)
✅ Aucune redirection HTTP
✅ Clean URLs (`/gamiz/` au lieu de `/gamiz.html`)
✅ Meta tags changent dynamiquement
✅ Cache IndexedDB fonctionne
✅ Pas d'erreurs console

---

## 📞 Besoin d'aide?

1. Lire le fichier `INSTRUCTIONS_DEPLOY.txt` (dans le ZIP)
2. Lire `DEPLOYMENT.md` section "Troubleshooting"
3. Vérifier la console du navigateur (F12)
4. Vérifier que les fichiers sont au bon endroit

---

## 🚀 Vous êtes prêt!

Le ZIP contient tout ce qu'il faut pour transformer votre site en SPA moderne et optimisé pour Google.

**Étapes:** Extraire → Copier → Commit → Push → Attendre 2 min → Tester

Bonne chance! 🎉
