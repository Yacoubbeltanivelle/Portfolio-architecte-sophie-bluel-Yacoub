let donnees;

// Fonction de récupération des données de la galerie
async function recupererDonnees() {

  // Lancement de la requête
  const reponse = await fetch("http://localhost:5678/api/works");
  donnees = await reponse.json();
  genererDonnees(donnees);
}

// Récupération de la balise qui contiendra les données
const sectionGalery = document.querySelector(".gallery");

// Fonction de création Html de la galerie
async function genererDonnees(donnees) {
  sectionGalery.innerHTML = "";
  for (let i = 0; i < donnees.length; i++) {

    let blocfigure = document.createElement("figure");
    let image = document.createElement("img");
    image.src = donnees[i].imageUrl;
    let titre = document.createElement("figcaption");
    titre.innerText = donnees[i].title;
    sectionGalery.appendChild(blocfigure);
    blocfigure.appendChild(image);
    blocfigure.appendChild(titre);
  }
}

// Lancement de la fonction au démarrage de la page
recupererDonnees();

// Fonction filtre qui affiche tous les travaux
document.getElementById("btn-tous").addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  genererDonnees(donnees);
});

// Fonction filtre qui affiche tous les travaux de la catégorie objet
document.getElementById("btn-objets").addEventListener("click", function () {
  const objetsFiltre = donnees.filter(function (donnee) {
    return donnee.category.name == "Objets";
  });

  document.querySelector(".gallery").innerHTML = "";
  genererDonnees(objetsFiltre);
});

// Fonction filtre qui affiche tous les travaux de la catégorie Appartements
document
  .getElementById("btn-appartements")
  .addEventListener("click", function () {
    const objetsFiltre = donnees.filter(function (donnee) {
      return donnee.category.name == "Appartements";
    });

    document.querySelector(".gallery").innerHTML = "";
    genererDonnees(objetsFiltre);
  });

// Fonction filtre qui affiche tous les travaux de la catégorie Hotels & restaurants
document.getElementById("btn-h&r").addEventListener("click", function () {
  const objetsFiltre = donnees.filter(function (donnee) {
    return donnee.category.name == "Hotels & restaurants";
  });

  document.querySelector(".gallery").innerHTML = "";
  genererDonnees(objetsFiltre);
});
