# Hommage — site cadeau

Un site de style « cinéma » (sombre, élégant) : écran d'entrée, anneau 3D de photos, rangées de souvenirs et de vidéos façon plateforme de streaming, messages des amis et lettre du groupe. Il se met en ligne gratuitement sur **GitHub Pages**, et s'ouvre grâce au **QR code** du collage.

## 1. Personnaliser les textes
Ouvrez `config.js` (Bloc-notes ou VS Code) et modifiez : le prénom, la lettre, les messages de chaque ami, les titres de sections.

## 2. Ajouter les photos et vidéos
1. Copiez vos photos dans `photos/` et vos vidéos dans `videos/`.
2. Dans ce dossier, lancez : `python build_media.py` (cela met à jour `media.js`).
   Sans Python : ouvrez `media.js` et ajoutez les lignes à la main, par ex. `{ src: "photos/photo-01.jpg", title: "Reine du mariage" }`.

### Titres accrocheurs
Chaque photo et chaque vidéo a un titre :
- **Titre personnalisé** : nommez le fichier avec le texte voulu, par exemple `05-Reine du mariage.jpg` devient « Reine du mariage ».
- **Sinon**, le site en choisit un automatiquement dans les listes de `config.js` (rubrique `titles`), que vous pouvez modifier à votre goût.
- Les numéros au début (`01-`, `02-`…) servent à choisir l'ordre d'affichage, et n'apparaissent pas.

### Miniature d'une vidéo (facultatif)
Mettez une image du même nom à côté de la vidéo : `01-Fete.mp4` + `01-Fete.jpg`. Sinon, la première image de la vidéo est utilisée.

### Poids des fichiers (important)
GitHub refuse les fichiers de plus de **100 Mo**, et un site trop lourd s'ouvre lentement sur téléphone.
- Photos : redimensionnez à environ 1600 px de large (qualité 80 %).
- Vidéos : exportez en MP4 (H.264), 720p, idéalement moins de 30 Mo chacune (HandBrake est gratuit).
- Évitez les accents et les espaces dans les noms de fichiers si vous le pouvez.

## 3. Musique (facultatif)
Mettez un `.mp3` dans `music/` et indiquez son chemin dans `config.js` (`music: "music/chanson.mp3"`). Elle démarre quand la personne clique sur « Entrer ».

## 4. Mettre à jour le site sur GitHub (GitHub Desktop)
1. Remplacez les fichiers dans le dossier du dépôt par ceux-ci (index.html, style.css, script.js, config.js, media.js, build_media.py, README.md, et les dossiers photos/ videos/ music/).
2. Dans GitHub Desktop : écrivez un résumé, cliquez **Commit to main**, puis **Push origin**.
3. Le site se met à jour en 1 à 2 minutes. Videz le cache du navigateur (Ctrl + F5) si l'ancienne version s'affiche encore.

## 5. QR code
Créez un QR code à partir de l'adresse du site (par ex. avec goqr.me) et remplacez celui du collage. Testez-le avec un téléphone avant d'imprimer.

## Notes
- Le site fonctionne aussi en double-cliquant sur `index.html`, mais le mieux est de le tester sur son adresse GitHub Pages.
- L'anneau 3D, les rangées et les fenêtres sont accessibles au clavier, et les animations se réduisent pour les personnes qui l'ont demandé dans leur téléphone.
