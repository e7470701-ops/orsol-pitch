# ORSOL — Pitch Stratégique International

Site de présentation du projet **Orsol** : conception, exploitation et commercialisation de systèmes de production hors-sol modulaires et largement automatisés (Bénin → Afrique → International).

## Contenu

- 14 sections (slides) fidèles au dossier stratégique
- Même identité visuelle (palette terre / terracotta / olive)
- Narration audio professionnelle sur chaque page
- Navigation clavier (← →), boutons et points
- Lecteur audio persistant + démarrage automatique après activation

## Lecture audio

Les navigateurs bloquent l’autoplay sans interaction utilisateur.  
Au premier chargement, cliquez sur **« Activer la narration audio »**.  
Ensuite, le son se lance automatiquement à chaque changement de page.

## Déploiement Cloudflare Pages (recommandé)

1. Allez sur [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Sélectionnez le dépôt `e7470701-ops/orsol-pitch`
3. Configuration :
   - Framework preset : **None**
   - Build command : *(laisser vide)*
   - Build output directory : `/` (racine)
4. Cliquez **Save and Deploy**
5. Votre site sera disponible sur `https://orsol-pitch.pages.dev` (ou un domaine personnalisé)

## Structure

```
/
├── index.html      # Application complète
├── styles.css      # Identité visuelle
├── app.js          # Navigation + audio
├── audio/          # 14 narrations MP3 (à uploader)
│   ├── slide01.mp3
│   └── ...
└── assets/         # Images de référence
```

## Local

Ouvrez simplement `index.html` dans un navigateur moderne,  
ou servez le dossier :

```bash
npx serve .
```

---

**Orsol** — Novembre 2026  
Bénin → Afrique → International
