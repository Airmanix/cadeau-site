/* =====================================================================
   CONFIG — c'est ICI que vous personnalisez les textes du site.
   Gardez bien les guillemets "..." et les virgules.
   Les photos et vidéos se gèrent dans media.js (voir README).
   ===================================================================== */

window.CONFIG = {
  // Prénom de la personne à qui s'adresse l'hommage
  name: "Eunice",

  // Écran d'entrée (le « générique »)
  splash: {
    line: "Un hommage de tes amies",
    button: "Entrer"
  },

  // Haut de page
  brand: "Pour Eunice",
  hero: {
    tagline: "Un hommage de tes amies",
    text: "On s'est réunies pour te dire merci : pour les rires, les conseils, les sorties et tout ce que tu es. Voici nos souvenirs, nos voix et nos mots, rassemblés rien que pour toi.",
    primary: "Voir les souvenirs",
    secondary: "Lire la lettre"
  },

  // Menu du haut (mots courts !)
  nav: {
    memories: "Souvenirs",
    videos: "Vidéos",
    messages: "Mots",
    letter: "Lettre"
  },

  // Rangée de photos
  photos: {
    title: "Nos souvenirs",
    intro: "Fais glisser la ligne, touche une photo pour l'agrandir."
  },

  // Rangée de vidéos
  videos: {
    title: "Nos vidéos",
    intro: "Mets le son. Chaque vidéo est un message de l'une d'entre nous."
  },

  // Messages des amis : une ligne par personne.
  // Ajoutez "avatar: 'photos/prenom.jpg'" si vous voulez une petite photo de la personne.
  messages: {
    title: "Ce qu'on voulait te dire",
    items: [
      { from: "Marie-Jo", text: "Eunice, tu fais partie de ces personnes qui rendent tout plus léger rien qu'en étant là. Merci pour ta présence, tes conseils et ton grand cœur. Je suis fière de t'avoir comme amie." },
      { from: "Berme", text: "Ce que j'admire chez toi, c'est que tu es vraie avec tout le monde. Avec toi, pas besoin de faire semblant, et ça n'a pas de prix. Merci d'être cette amie-là." },
      { from: "Imma", text: "Merci pour les rires, les fous rires même, et pour toutes les fois où tu as su trouver les mots justes. Que la vie te rende tout le bonheur que tu donnes autour de toi." },
      { from: "Tatiana", text: "Tu es la preuve qu'on peut être douce et forte à la fois. Je te souhaite de beaux projets, des rêves qui se réalisent, et des gens qui te traitent comme tu les traites : avec amour. Je suis là, toujours." },
      { from: "Kethia", text: "Eunice, merci d'être cette amie sur qui on peut toujours compter. Ton sourire et ta bonté font du bien à tout le monde autour de toi. Je te souhaite autant de joie que tu en donnes, et je suis fière de faire partie de ton cercle." }
    ]
  },

  // La lettre du groupe (s'ouvre dans une fenêtre)
  letter: {
    greeting: "Chère Eunice,",
    paragraphs: [
      "Pas besoin d'une date particulière pour te dire merci. Nous avons simplement eu envie de nous arrêter un moment, toutes ensemble, pour te dire ce que tu représentes pour nous.",
      "Alors nous avons fouillé nos téléphones, nos souvenirs et nos fous rires, pour te composer ce petit coin rien qu'à toi : des photos, des vidéos, des mots sincères de chacune d'entre nous.",
      "Prends ton temps. Regarde, souris, et surtout sache une chose : tu comptes énormément pour nous."
    ],
    signature: "Avec toute notre amitié, Marie-Jo, Berme, Imma, Tatiana et Kethia"
  },

  // Fin de page
  finale: {
    title: "Merci d'être toi.",
    text: "Avec toute notre amitié.",
    footer: "Fait avec amour par Marie-Jo, Berme, Imma, Tatiana et Kethia",
    replay: "Revenir en haut"
  },

  /* -------------------------------------------------------------------
     TITRES ACCROCHEURS
     Chaque photo / vidéo reçoit un titre. Si vous ne lui en donnez pas
     (voir README : on peut nommer le fichier "05-Reine du mariage.jpg"),
     le site pioche dans ces listes. Modifiez-les à votre goût !
     ------------------------------------------------------------------- */
  titles: {
    photos: [
      "Le sourire qui change tout",
      "Quand elle entre, la pièce s'illumine",
      "Ce regard-là, on s'en souvient",
      "Quand elle rit, tout le monde rit",
      "Classe, naturellement",
      "Un instant, un souvenir pour la vie",
      "La bonne humeur en personne",
      "Zéro filtre, cent pour cent elle",
      "Ce jour-là, on n'a pas vu le temps passer",
      "Tellement elle",
      "Là où elle est, c'est la fête",
      "Le genre de moment qu'on garde",
      "Beauté simple, joie contagieuse",
      "Mode : elle. Ambiance : elle.",
      "Le portrait qui dit tout",
      "Quand l'amitié pose pour la photo",
      "On ne s'en lasse pas",
      "Souvenir classé coup de cœur",
      "La reine de la photo spontanée",
      "Un cadre, mille bons souvenirs",
      "Instant précieux, amie précieuse",
      "Elle brille, même sans lumière",
      "Celle qu'on a toujours envie de croiser",
      "Impossible de rater cette énergie"
    ],
    videos: [
      "Mets le son : ça va te faire sourire",
      "Un message rien que pour toi",
      "Ces rires que tu connais bien",
      "Regarde jusqu'à la fin",
      "On a quelque chose à te dire",
      "Petit film, grand merci",
      "Le souvenir en mouvement",
      "Prépare-toi à sourire",
      "Ça valait le coup d'être filmé",
      "Spécial toi, vraiment",
      "Le moment qu'on n'oubliera pas",
      "Dans les coulisses de tes amies"
    ]
  },

  // Musique de fond (optionnelle) : mettez un fichier dans music/ puis son chemin ici.
  // Exemple : "music/chanson.mp3"   — laissez "" pour ne pas avoir de musique.
  // Elle démarre quand la personne clique sur « Entrer ».
  music: "music/musique.mp3"
};
