# Oreille Musicale : créer l’APK Android (gratuit)

## À installer une seule fois
1. **Node.js** (version LTS) : https://nodejs.org
2. **Android Studio** : https://developer.android.com/studio (il installe aussi le SDK Android et Java)

## Étapes (dans un terminal, dans ce dossier)
```
npm install
npx cap add android
npm run permissions
npm run icons
npx cap sync android
npx cap open android
```
- `npm install` installe tout, y compris les plugins `filesystem` et `share` (déjà listés dans `package.json`), qui servent à enregistrer ou partager les attestations JPEG du Challenge 30 jours.
- `npm run permissions` autorise le micro (obligatoire pour les niveaux de chant).
- `npm run icons` crée les icônes Android à partir de ton logo (dossier `assets`).
- Dans Android Studio, attends la fin de la synchronisation (barre en bas), puis :
  **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- Android Studio affiche « locate » : clique dessus pour trouver `app-debug.apk`.

## Installer sur un téléphone
Envoie `app-debug.apk` par WhatsApp ou câble USB, ouvre-le, et autorise « installer des applications inconnues » si le téléphone le demande.

## Après des modifications de l’application
Remplace le contenu du dossier `www`, puis relance `npx cap sync android` et reconstruis l’APK.

## Publicité (AdMob) : déjà intégrée
Le code des vidéos publicitaires est dans `www/index.html` (bloc `ADS` tout en haut du script). Il ne s’active que dans l’application Android, pas dans la version web.
- **À partir de l’exercice 3** du Challenge : 1 vidéo avant de commencer l’exercice.
- **À partir de l’exercice 5** : 1 vidéo pour télécharger l’attestation (une seule fois par attestation, ensuite elle reste téléchargeable).
- **« Travaille ta voix »** : 1 vidéo avant les exercices 4, 7, 10, 13… (seulement ceux pas encore réussis). Réglable avec `voiceFrom`, `voiceEvery`, `voiceVideos`.
- **Bannière** en bas de l’écran d’accueil uniquement (elle disparaît pendant les exercices).
- Si aucune pub n’est disponible (pas de réseau, pas de pub à afficher), l’utilisateur n’est jamais bloqué.
- Pour changer les nombres : modifie `exFrom`, `exVideos`, `certFrom`, `certVideos` dans le bloc `ADS`.

### Pendant tes essais (déjà réglé)
`test:true` = pubs de TEST de Google. **Ne clique jamais sur de vraies pubs de ta propre application** : Google peut suspendre ton compte AdMob.

### Passer en vraies publicités (avant la publication)
1. Crée un compte sur https://admob.google.com, puis « Ajouter une application » (Android, application pas encore publiée).
2. Crée deux blocs d’annonces : un **Avec récompense** (Rewarded) et une **Bannière**. Note l’ID d’**application** (avec `~`) et les deux ID de **bloc** (avec `/`).
3. Dans `www/index.html`, bloc `ADS` : colle l’ID du bloc récompense dans `rewardedId`, l’ID du bloc bannière dans `bannerId`, et mets `test:false`.
4. Dans le terminal : `ADMOB_APP_ID=ca-app-pub-XXXX~YYYY npm run permissions` (sous Windows PowerShell : `$env:ADMOB_APP_ID="ca-app-pub-XXXX~YYYY"; npm run permissions`).
5. `npm install`, `npx cap sync android`, puis reconstruis.
6. Dans AdMob > Confidentialité et messagerie : crée le message de consentement (obligatoire pour les utilisateurs d’Europe et du Royaume-Uni).

## Play Store
- Identifiant de l’application : `com.oreillemusicale.app` (dans `capacitor.config.json`). **Choisis-le définitivement avant la publication : il ne pourra plus changer.**
- Fichier signé (AAB) : **Build > Generate Signed Bundle**. Garde précieusement ta clé de signature et son mot de passe.
- Dans la Play Console il faudra : une politique de confidentialité (lien web obligatoire car l’application utilise la publicité et le micro), le formulaire « Sécurité des données » (publicité et identifiant publicitaire à déclarer), la déclaration « Contient des annonces », la classification du contenu, des captures d’écran et une icône 512×512.
