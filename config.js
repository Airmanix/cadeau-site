/* =====================================================================
   CONFIG — c'est ICI que vous personnalisez le texte du site.
   Pas besoin de toucher aux autres fichiers (sauf si vous voulez changer le style).
   Gardez bien les guillemets "..." et les virgules.
   ===================================================================== */

window.CONFIG = {
  // Prénom de la personne à qui s'adresse le cadeau
  name: "Eunice",

  // Petite ligne au-dessus du prénom (ex. "Joyeux anniversaire", "Félicitations", "Un cadeau pour toi")
  eyebrow: "Un cadeau rien que pour toi",

  // Sous-titre de l'écran d'accueil
  subtitle: "Une petite expérience préparée avec amour par tes amis. Fais défiler, et laisse-toi guider.",

  // Étape « bougies » (mettre enabled: false pour la supprimer)
  candles: {
    enabled: true,
    title: "Avant tout — un vœu",
    hint: "Touche chaque flamme pour souffler les bougies",
    count: 3
  },

  // Étape « enveloppe » : la lettre du groupe
  letter: {
    hint: "touche l'enveloppe",
    greeting: "Chère Eunice,",
    paragraphs: [
      "Il y a des personnes qui traversent nos vies, et puis il y a celles qui les illuminent. Toi, tu fais partie de celles-là, et nous avons voulu te le dire autrement qu'avec un simple message.",
      "Alors nous nous sommes réunis, nous avons fouillé nos téléphones, nos souvenirs et nos fous rires, pour te composer ce petit coin rien qu'à toi : des photos, des vidéos, des mots sincères de chacun d'entre nous.",
      "Prends ton temps. Regarde, souris, et surtout sache une chose : tu comptes énormément pour nous."
    ],
    signature: "Avec tout notre amour — tes amis"
  },

  // Titres des sections
  gallery: {
    eyebrow: "Nos souvenirs",
    title: "Quelques instants avec toi",
    intro: "Des sourires, des sorties, des moments simples qui sont devenus précieux."
  },
  videos: {
    eyebrow: "En mouvement",
    title: "Des messages rien que pour toi",
    intro: "Mets le son, et laisse-les te parler."
  },
  messages: {
    eyebrow: "Des mots du cœur",
    title: "Ce que chacun voulait te dire",
    // Ajoutez / modifiez une ligne par personne : { from: "Prénom", text: "Message" }
    items: [
      { from: "Prénom 1", text: "Écris ici le message de la première personne. Quelques lignes suffisent, sincères et simples." },
      { from: "Prénom 2", text: "Écris ici le message de la deuxième personne." },
      { from: "Prénom 3", text: "Écris ici le message de la troisième personne." },
      { from: "Prénom 4", text: "Écris ici le message de la quatrième personne." }
    ]
  },

  // Petits vœux (4 cartes)
  wishes: {
    title: "Petits vœux pour toi",
    items: [
      { icon: "☀️", text: "Que chaque jour t'apporte une raison de sourire, même les plus discrètes." },
      { icon: "🌿", text: "Que ta santé, ta force et ta paix intérieure restent inébranlables." },
      { icon: "✨", text: "Que tous les projets qui te tiennent à cœur trouvent enfin leur chemin." },
      { icon: "💗", text: "Que tu sois entourée, toujours, par celles et ceux qui t'aiment vraiment." }
    ]
  },

  // Fin de page
  finale: "Avec tout notre amour, ma belle.",
  footer: "Créé avec amour par tes amis",

  // Musique de fond (optionnel) : mettez un fichier dans le dossier music/ puis son chemin ici.
  // Exemple : "music/chanson.mp3"   — laissez "" pour ne pas avoir de musique.
  music: ""
};
