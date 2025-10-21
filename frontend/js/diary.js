
// import * as utilsConfig from './utils.js'

const URL = 'http://localhost:3000';
let notesContainer = document.querySelector('.notes-container');
let btnAddNote = document.getElementById('addNote');
let formAddNote = document.querySelector('.formAddNote');
let btnDeconnexion = document.getElementById('btn-deconnexion');


function checkToken(){
    console.log('Token checké')
    const token = localStorage.get('userToken');
    const userId = localStorage.get('userId');
    if (!token || userId){
        window.location.href = 'login.html';
        return;
    }
}
async function displayNotes(notes) {
    notesContainer.innerHTML = "";
    if (notes.length === 0){
        notesContainer.innerHTML = "<p>Aucunne note enregristrée pour l'instant</p>"
    }else{
        notes.forEach(note => {
        titre = note.titre;
        dateCreation = note.creationDate
        // on va créer une div genre carte qui va contenir la date de création et le titre
        let noteCard = document.createElement('div');
        noteCard.innerHTML = `
        <h4> ${dateCreation}</h4>
        <p> ${titre}
        `;
        noteCard.className = "noteCard"
        notesContainer.appendChild(noteCard);
        
    });
        
    }

    
    
}

async function loadNotes(){
    // Récupérer le token et l'id de 'utilisateur connecté
    checkToken()
    console.log('Chargement des notes...')
    
    try{
        const response = await fetch(`${URL}/notes`,{
        "Authorization": `Bearer ${token}`
        });
        if (!response.ok){
            throw new error('Impossible de charger les notes')
        }
        const data = response.json();
        displayNotes(data);
    } catch(err){
        console.error(err);
        console.log("Erreur lors du chargement des notes");

    }
}

loadNotes();

async function addNote(form){
    formAddNote.style.display = 'flex'
    checkToken();
    const formData = new FormData(form);
    const titre = formData.get('titre');
    const contenu = formData.get('contenu');
    let note = {
        'titre': titre,
        'contenu': contenu
    }
    try{
        const response = await fetch(`${URL}/notes`, {
        method: "POST", 
        "Content-Type":"application/json",
        body : JSON.stringify(note),
    });
    if(!response.ok){
        console.log("Votre texte n'a pas pu etre enregistré")
    }else{
        console.log('Note enregistrée avec succes')
        loadNotes();
    }
    }catch(err){
        console.error(err)

    }
}


// COmme l'API est stateless il faut justesupprimer le token du localStorage et on redirige le user vers la page de connexion
function logoutUser(){
    console.log('Logout déclenché');//Pour debugger
    const token = localStorage.getItem('userToken');
    if (!token) {
    // Si pas connecté, redirige automatiquement
    window.location.href = '/auth/login';
    return;
    }

    
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    window.location.href = "auth/login";
    return;
}

btnDeconnexion.addEventListener('click', () =>logoutUser());
btnAddNote.addEventListener('click', () => addNote());






let btnPersonnalizeTheme = document.querySelector('.btnPersonnalize');
let themeDiv = document.querySelector('.themes');
let btnCloseTheme = document.querySelector('.btnCloseTheme');
let body = document.body


btnPersonnalizeTheme.addEventListener('click', ()=>{
    themeDiv.style.display = 'grid';
    btnCloseTheme.style.display = 'block';
    const images = document.querySelectorAll('.themes img');

    images.forEach(img => {
    img.addEventListener('click', () => {
    body.className = " ";
    // Ajouter le thème correspondant
    body.classList.add(img.className);

    // enregistrer dans le localStorage
    localStorage.setItem('theme', img.className);
    btnCloseTheme.style.display = 'none';
    themeDiv.style.display = 'none';

  });
});

})



btnCloseTheme.addEventListener('click', ()=>{
    themeDiv.style.display = 'none'
    btnCloseTheme.style.display = 'none'

})

