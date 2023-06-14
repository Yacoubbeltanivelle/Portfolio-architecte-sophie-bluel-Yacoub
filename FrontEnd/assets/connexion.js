// Vérification de l'existence d'un utilisateur connecté
const userId = window.localStorage.getItem("userId");
const token = window.localStorage.getItem("token");

if (userId && token) {
  document.location.href = "acceuil.html";
} else {

// Début de la fonction après validation du formulaire
  document.getElementById("submit").addEventListener("click", async function (event) {
    event.preventDefault();

    // Récupération des données du formulaire
    let email = document.getElementById("email").value;
    let motDePasse = document.getElementById("motDePasse").value;

     // Vérifier si les données ne sont pas vides
    if (email !== "" && motDePasse !== "") {

      // Création de l'objet identifiant
      let user = {
        email: email,
        password: motDePasse,
      };

      // Test pour savoir si on est bien connecté au serveur
      try {
        const response = await fetch("http://localhost:5678/api/works");
        if (response.ok) {

          // Lancement de la requête
          let reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          });

          let donnees = await reponse.json();

          // Vérification et mise en stockage de l'id et du token de l'utilisateur
          if (donnees.message != "user not found" && !donnees.error) {
            window.localStorage.setItem("userId", donnees.userId);
            window.localStorage.setItem("token", donnees.token);
            document.location.href = "acceuil.html";

          } else {
            // Sélectionne l'élément avec l'id "erreur"
            let erreurElement = document.getElementById("erreur");
            // Creer le message
            erreurElement.innerHTML =
              "Erreur dans l’identifiant ou le mot de passe";
            console.log("L'identifiant n'existe pas");
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
      // Sélectionne l'élément avec l'id "erreur"
      let erreurElement = document.getElementById("erreur");
      // Creer le message
      erreurElement.innerHTML = "Tous les champs doivent etre rempli";
      console.log("il faut ecrire un truc");
    }
  });


}
