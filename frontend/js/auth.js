const URL = 'http://localhost:3000';

async function signUpUser(form){
    
    let formData = new FormData(form);
    // Récupérer les  valeurs des input email et password
    const emailValue = formData.get('email');
    const passwordValue = formData.get('password');
    let userCreate = {
        email: emailValue,
        password: passwordValue
    };
    try{
        const response = await fetch(`${URL}/auth/signup`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        //convertir le corps de la requete en format json
        body: JSON.stringify(userCreate)
    });
    const data = await response.json()

    if (!response.ok){
            console.error('Erreur lors de la sauvegarde côté serveur. Statut:', response.status);
            // Afficher le message d'erreur pour aider au débogage
            const errorData = await response.json();
            console.error('Message du serveur:', errorData.message || errorData.error);
        }else{
        console.log("Utilisateur créé");
        window.location.href = '/diary';
    
    }

    } catch{
        console.log("Erreur de connexion (Serveur non démarré)")
    }

}

async function loginUser(form){
    console.log('Fonction login')
     let formData = new FormData(form);
    // Récupérer les  valeurs des input email et password
    const emailValue = formData.get('email-login');
    const passwordValue = formData.get('password-login');
    let userlogin = {
        email: emailValue,
        password: passwordValue
    };
    try{
        const response = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        //convertir le corps de la requete en format json
        body: JSON.stringify(userlogin)
    });
    const data = await response.json()
    if (!response.ok){
            // NOUVELLE LOGIQUE DE DÉBOGAGE
            console.error('Erreur lors de la connexion. Statut HTTP reçu:', response.status);
            if (data.message) {
                 console.error('Message d\'erreur du serveur:', data.message);
            } else {
                 console.error('Le serveur n\'a pas fourni de message d\'erreur JSON.');
            }
            
        }else{
        // Enregistrer le token 
        console.log("Utilisateur connecté");
        localStorage.setItem('userToken', data.token);
        localStorage.setItem("userId", data.userId);
        // rediriger vers la page diary.html
        window.location.href = '/diary';

         /*try{
        await fetch(`${utilsConfig.URL}/diary`);
       }catch{
        console.log("Erreur du serveur");
       }*/
        
    }

    } catch{
        console.log("Erreur de connexion (Serveur non démarré")
    }

}
/*

let loginForm = document.querySelector('.login-form');
let signUpForm = document.querySelector('.sign-up-form')

if(loginForm){
    loginForm.addEventListener('submit', (event)=>{
    console.log('le boutton se connecter est cliqué')
    event.preventDefault();
    loginUser(loginForm);

})
}



if (signUpForm){
    signUpForm.addEventListener('submit', (event)=>{
    console.log("Boutton s'inscrire active");
    event.preventDefault();
    signUpUser(signUpForm);
})

}

*/
document.addEventListener('DOMContentLoaded', () => {
    
    console.log("DOM entièrement chargé. Début de l'attachement des écouteurs."); // [1]
    
    // Tentative de récupération du formulaire de CONNEXION
    const loginForm = document.querySelector('.login-form');
    
    // Tentative de récupération du formulaire d'INSCRIPTION
    const signUpForm = document.querySelector('.sign-up-form');

    // Vérification pour la Connexion
    if (loginForm) {
        console.log("Formulaire de connexion trouvé."); // [2]
        loginForm.addEventListener('submit', (event) => {
            console.log('rechargement empeche')
            event.preventDefault(); // Empêche le rechargement de la page
            console.log('terminer')
            console.log('Soumission du formulaire de connexion.');
            loginUser(loginForm);
        });
    } else {
        console.log("Formulaire de connexion non trouvé sur cette page."); // [4]
    }

    // Vérification pour l'Inscription (Ceci corrige votre erreur "null")
    if (signUpForm) {
        console.log("Formulaire d'inscription trouvé."); // [5]
        signUpForm.addEventListener('submit', (event) => {
            console.log('rechargement empeche')
            event.preventDefault(); // Empêche le rechargement de la page
            console.log('Soumission du formulaire d’inscription.');
            signUpUser(signUpForm);
        });
    } else {
        console.log("Formulaire d'inscription non trouvé sur cette page."); // [6]
    }
});