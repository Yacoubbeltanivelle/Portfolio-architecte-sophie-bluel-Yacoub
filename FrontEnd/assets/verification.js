// Vérification de l'existence d'un utilisateur connecté
const userId = window.localStorage.getItem("userId");
const token = window.localStorage.getItem("token");

if (userId && token) {
  document.location.href = "acceuil.html";
}