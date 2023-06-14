// Vérification de l'existence d'un utilisateur connecté
const userId = window.localStorage.getItem("userId");
const token = window.localStorage.getItem("token");

if (!userId && !token) {
  document.location.href = "index.html";
}

// Fonction de deconnexion
document
  .getElementById("logout")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    document.location.href = "index.html";
  });

// Déclaration des variables
const sectionGaleryModal = document.querySelector(".gallery-modal");
let modal = document.querySelector(".modal");
let modalContenus = document.querySelector(".modal-contenus");
let btn = document.getElementById("btn-modal");
let closes = document.querySelectorAll(".close");
let closeSupp = document.getElementById("close--supp");
let blocSupprimer = document.querySelector(".modal__bloc-supprimer");
let trashCans;
let photoChange;
let photo = document.getElementById("photo-baniere");
let photoSupp;

// Fonction de création Html de la galerie dans la modal
async function recupererGalerie() {
  await recupererDonnees();
  for (let i = 0; i < donnees.length; i++) {
    let blocfigure = document.createElement("figure");
    let btnPoubelle = document.createElement("i");
    btnPoubelle.classList.add("fa-solid", "fa-trash-can");
    btnPoubelle.dataset.id = donnees[i].id;
    let image = document.createElement("img");
    image.src = donnees[i].imageUrl;
    let titre = document.createElement("figcaption");
    titre.innerText = "éditer";
    sectionGaleryModal.appendChild(blocfigure);

    if (i === 0) {
      let btnPosition = document.createElement("i");
      btnPosition.classList.add("fa-solid", "fa-arrows-up-down-left-right");
      blocfigure.appendChild(btnPosition);
    }

    blocfigure.appendChild(btnPoubelle);
    blocfigure.appendChild(image);
    blocfigure.appendChild(titre);
  }

  trashCans = document.querySelectorAll(".fa-trash-can");

// Fonction qui récupère l'id de l'image qui va servir à la suppression
  trashCans.forEach(function (trashCan) {
    trashCan.addEventListener("click", function (event) {
      photoSupp = event.target.dataset.id;
      blocSupprimer.style.display = "block";
    });
  });
}

// Bouton pour ouvrir la modale
btn.onclick = function () {
  modal.style.display = "block";
  modalContenus.style.display = "flex";
  recupererGalerie();
};

// Fonction qui ferme la modale et tout ses éléments enfants
function fermerTout() {
  modal.style.display = "none";
  blocSupprimer.style.display = "none";
  document.getElementById("modal-ajout").style.display = "none";
  document.querySelector(".baniere--photo").style.display = "none";
  document.getElementById("banniereVide").style.display = "flex";
  sectionGaleryModal.innerHTML = "";
}

// Fonction de fermeture de la modale relier à tous les boutons close
closes.forEach(function (closes) {
  closes.onclick = function () {
    fermerTout();
  };
});

// Bouton Close pour la modale de suppression
closeSupp.onclick = function () {
  blocSupprimer.style.display = "none";
};

// fonction qui quitte là modale quand on click n'importe ou sur l'écran en de hors de la modale
window.onclick = function (event) {
  if (event.target === modal) {
    fermerTout();
  }
};


// fonction qui ferme tous les éléments de la modale d'ajout d'image
function btnRetour() {
  document.getElementById("modal-ajout").style.display = "none";
  document.querySelector(".baniere--photo").style.display = "none";
  document.getElementById("banniereVide").style.display = "flex";
  modalContenus.style.display = "flex";
  blocSupprimer.style.display = "none";
  sectionGaleryModal.innerHTML = "";
  let erreurElement = document.getElementById("erreur");
      erreurElement.innerHTML = "";
  recupererGalerie();
}

// Fonction qui affiche la modale d'ajout d'image
async function ajouterPhoto() {
  modalContenus.style.display = "none";
  document.getElementById("modal-ajout").style.display = "flex";
}

// Fonction qui affiche l'image uploader
async function changephoto(event) {
  let photoChange = window.URL.createObjectURL(event.target.files[0]);
  if (photoChange) {
    document.querySelector(".baniere--photo").style.display = "block";
    document.getElementById("banniereVide").style.display = "none";
    photo.src = window.URL.createObjectURL(event.target.files[0]);
  }
}

// Fonction pour supprimer une image de la galerie
document
  .querySelector(".btn-ajouter--supprimer")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    // On teste si l'on est bien connecté au serveur
    try {
      const response = await fetch("http://localhost:5678/api/works");
      if (response.ok) {

        // Lancement de la requête
        let reponse = await fetch(
          `http://localhost:5678/api/works/${photoSupp}`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (reponse.status === 204) {
          event.preventDefault();
          btnRetour();
        } else {
          // Sélectionne l'élément avec l'id "erreur"
          document.getElementById("erreur").style.display = "block";
          let erreurElement = document.getElementById("erreur");
          // Creer le message
          erreurElement.innerHTML = "Probleme de suppression ";
          console.log("Probleme de suppression");
        }
      }
    } catch (error) {
      console.log("Le serveur ne répond pas. Erreur :", error);
      // Sélectionne l'élément avec l'id "erreur"
      let erreurElement = document.getElementById("erreur");
      // Creer le message
      erreurElement.innerHTML = "Le serveur ne répond pas.";
      console.error;
    }
  });


  // Fonction pour ajouter une image dans la galerie
document
  .getElementById("valider")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    // Je récupère les données
    let photo = document.querySelector("#imageUpload").files[0];
    let titre = document.querySelector("#titre").value;
    let categorie = document.querySelector("#categorie").value;

    // Vérifier si les données ne sont pas vides
    if (photo !== undefined && titre !== "" && categorie !== "") {

       // Création de l'objet d'envoi
      const donneesform = new FormData();
      donneesform.append("image", photo);
      donneesform.append("title", titre);
      donneesform.append("category", categorie);

       // Test pour savoir si on est bien connecté au serveur
      try {
        const response = await fetch("http://localhost:5678/api/works");
        if (response.ok) {

          // Lancement de la requête
          let reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: donneesform,
          });

          if (reponse.ok === true) {
            document.getElementById("modal-ajout").reset();
            btnRetour();
            event.preventDefault();
          } else {
            // Sélectionne l'élément avec l'id "erreur"
            document.getElementById("erreur").style.display = "block";
            let erreurElement = document.getElementById("erreur");
            // Creer le message
            erreurElement.innerHTML = "Probleme d'envoi";
            console.log("Probleme d'envoi");
            console.error;
          }
        }
      } catch (error) {
        console.log("Le serveur ne répond pas. Erreur :", error);
        // Sélectionne l'élément avec l'id "erreur"
        let erreurElement = document.getElementById("erreur");
        // Creer le message
        erreurElement.innerHTML = "Le serveur ne répond pas.";
        console.error;
      }
    } else {
      document.getElementById("erreur").style.display = "block";
      // Sélectionne l'élément avec l'id "erreur"
      let erreurElement = document.getElementById("erreur");
      // Creer le message
      erreurElement.innerHTML = "Tous les champs doivent etre rempli";
      console.log("il faut ecrire un truc");
    }
  });
