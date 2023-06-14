formModalAjout.onsubmit=async function uploadImg(e) {
    e.preventDefault();
    let fd=new FormData();
    fd.append("image", document.querySelector("#file-img").files[0]);
    fd.append("title", document.querySelector("#titre-img").value);
    fd.append("category", document.querySelector("#categorie").value);
    console.log(fd);
    let token=window.localStorage.getItem("token");
    let response = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            Authorization:"Bearer "+token,
            //"Content-Type": "multipart/form-data"
        },
        body: fd
    });
    console.log(response) ;
    //let result = await response.json();
    //console.log(result);
   // alert(result.message);
    const titre=document.getElementById("titre-img").value;
    const categorie=document.getElementById("categorie").value;
    const imageElement = document.createElement("img");
    imageElement.src = document.querySelector("#image-loader").src;
    imageElement.alt = titre;
    const titreElement = document.createElement("figcaption");
    titreElement.innerText = titre;
    const figure = document.createElement("figure");
    figure.setAttribute("work-id",13);//13 a remplacer par id du work ajouté
    figure.classList.add("category-id-"+categorie,"figures");
    figure.appendChild(imageElement);
    figure.appendChild(titreElement);
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(figure);
    closeModal(e);
};