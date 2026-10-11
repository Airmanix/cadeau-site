# Site cadeau 🎁

Un petit site élégant (accueil → bougies à souffler → enveloppe → photos → vidéos → messages des amis → vœux), prévu pour être hébergé gratuitement sur **GitHub Pages**, puis ouvert via le **QR code** du collage.

## 1. Personnaliser les textes
Ouvrez `config.js` avec le Bloc-notes (ou VS Code) et modifiez :
- le prénom, la lettre du groupe, les titres,
- les messages de chaque ami (`messages.items`), une ligne par personne,
- les 4 petits vœux.

## 2. Ajouter les photos et vidéos
1. Copiez vos photos dans le dossier `photos/` et vos vidéos dans `videos/`.
2. Lancez, dans ce dossier : `python build_media.py` (cela écrit `media.js`).
   - Sans Python : ouvrez `media.js` et ajoutez les lignes à la main, par ex. `{ src: "photos/photo-01.jpg", caption: "Au lac" }`.
3. Astuce : nommez les fichiers `01-Au lac.jpg`, `02-Mariage.jpg`… pour choisir l'ordre et avoir une légende automatique.

**Poids des fichiers (important)** — GitHub refuse les fichiers de plus de 100 Mo et le dépôt doit rester raisonnable (idéalement < 1 Go). Avant d'ajouter :
- Photos : redimensionnez à ~1600 px de large (qualité 80 %).
- Vidéos : exportez en MP4 (H.264), 720p, avec HandBrake par exemple, idéalement < 30 Mo chacune.

## 3. Musique (facultatif)
Mettez un `.mp3` dans `music/` et renseignez son chemin dans `config.js` (`music: "music/chanson.mp3"`). Elle démarre quand la personne souffle la première bougie.

## 4. Mettre en ligne sur GitHub Pages
1. Sur github.com : **New repository** → nom par exemple `cadeau-eunice` → **Public** → Create.
2. Cliquez **uploading an existing file**, glissez-déposez TOUT le contenu de ce dossier (index.html, style.css, script.js, config.js, media.js, et les dossiers photos/ videos/ music/) → **Commit changes**.
   (Pour beaucoup de fichiers, GitHub Desktop ou `git push` est plus fiable que le glisser-déposer du navigateur.)
3. Onglet **Settings → Pages** → *Source* : **Deploy from a branch** → branche **main**, dossier **/ (root)** → Save.
4. Après 1 à 2 minutes, l'adresse apparaît : `https://VOTRE-PSEUDO.github.io/cadeau-eunice/`

## 5. QR code
Générez un QR code à partir de cette adresse (par ex. avec un générateur gratuit comme qr-code-generator.com ou goqr.me), puis remplacez celui du collage. Testez-le avec un téléphone avant d'imprimer.

## 6. Tester en local
Double-cliquez sur `index.html` : le site s'ouvre dans votre navigateur.
