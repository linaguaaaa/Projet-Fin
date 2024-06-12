// Obtention de l'élément DOM pour les événements
const events = document.getElementById("events");

// Variables pour suivre l'état du clic de la souris et la position initiale
let isDown = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;

// Ajout d'un écouteur d'événement pour le clic de la souris
events.addEventListener("mousedown", (e) => {
  isDown = true; // L'utilisateur a cliqué
  startX = e.pageX - events.offsetLeft; // Position initiale X
  startY = e.pageY - events.offsetTop; // Position initiale Y
  scrollLeft = events.scrollLeft; // Position de défilement initiale X
  scrollTop = events.scrollTop; // Position de défilement initiale Y
  events.style.cursor = "grabbing"; // Changement du curseur
});

// Ajout d'un écouteur d'événement pour le cas où la souris quitte l'élément
events.addEventListener("mouseleave", () => {
  isDown = false; // L'utilisateur a relâché le clic
  events.style.cursor = "grab"; // Réinitialisation du curseur
});

// Ajout d'un écouteur d'événement pour le relâchement du clic de la souris
events.addEventListener("mouseup", () => {
  isDown = false; // L'utilisateur a relâché le clic
  events.style.cursor = "grab"; // Réinitialisation du curseur
});

// Ajout d'un écouteur d'événement pour le mouvement de la souris
document.addEventListener("mousemove", (e) => {
  if (!isDown) return; // Si l'utilisateur n'a pas cliqué, ne rien faire
  e.preventDefault(); // Empêcher le comportement par défaut
  const x = e.pageX - events.offsetLeft; // Nouvelle position X
  const y = e.pageY - events.offsetTop; // Nouvelle position Y
  const walkX = (x - startX) * 1; // Calcul du déplacement X
  const walkY = (y - startY) * 1; // Calcul du déplacement Y
  events.scrollLeft = scrollLeft - walkX; // Défilement horizontal
  events.scrollTop = scrollTop - walkY; // Défilement vertical
});

// Boutons pour le défilement horizontal
const scrollLeftButton = document.getElementById("action-button--previous");
const scrollRightButton = document.getElementById("action-button--next");

// Écouteur d'événement pour le bouton de défilement vers la gauche
scrollLeftButton.addEventListener("click", () => {
  events.scrollBy({
    top: 0,
    left: -200, // Défilement de 200px vers la gauche
    behavior: "smooth", // Effet de défilement doux
  });
});

// Écouteur d'événement pour le bouton de défilement vers la droite
scrollRightButton.addEventListener("click", () => {
  events.scrollBy({
    top: 0,
    left: 200, // Défilement de 200px vers la droite
    behavior: "smooth", // Effet de défilement doux
  });
});

// Écouteur d'événement pour le défilement de l'élément
events.addEventListener("scroll", (e) => {
  const position = events.scrollLeft; // Position actuelle du défilement
  // Désactivation du bouton de défilement vers la gauche si au début
  if (position === 0) {
    scrollLeftButton.disabled = true;
  } else {
    scrollLeftButton.disabled = false;
  }

  // Désactivation du bouton de défilement vers la droite si à la fin
  if (Math.round(position) === events.scrollWidth - events.clientWidth) {
    scrollRightButton.disabled = true;
  } else {
    scrollRightButton.disabled = false;
  }
});

// Fonction pour créer un effet de frappe au clavier sur un élément
function typeEffect(element, speed) {
  var text = element.innerHTML; // Texte initial de l'élément
  element.innerHTML = ""; // Effacement du texte
  
  var i = 0;
  // Timer pour ajouter les caractères un par un
  var timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i)); // Ajout du caractère
      i++;
    } else {
      clearInterval(timer); // Fin de l'effet
    }
  }, speed);
}

// Application de l'effet de frappe
var speed = 75; // Vitesse de l'effet
var h1 = document.querySelector('h1'); // Sélection du titre
var p = document.querySelector('p'); // Sélection du paragraphe
var delay = h1.innerHTML.length * speed + speed; // Calcul du délai

// Effet de frappe sur le titre
typeEffect(h1, speed);

// Effet de frappe sur le corps après un délai
setTimeout(function(){
  p.style.display = "inline-block";
  typeEffect(p, speed);
}, delay);
