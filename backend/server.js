const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors()); // ✅ Autorise toutes les origines à accéder à ton API


require('dotenv').config();


// POLITIQUE CSP (Recommandé pour la robustesse en dev)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy", 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
    "connect-src 'self' http://localhost:3000; " + 
    "img-src 'self' data:;"
);
 next();
});


// mise en place du middleware pour analyser le corps des requetes json
app.use(express.json());
// SERvir les fichiers statiques
app.use(express.static(path.join(__dirname, '..', 'frontend')));


//Importation des routes 
const noteRoutes = require('./routes/noteRoute');
const userRoutes = require('./routes/userRoute');

// Enregistrer la route pur toutes les requetes efffectuées vers /notes et /auth
  //Servir les routes frontend en premier 
app.use('/notes', noteRoutes);
app.use('/auth', userRoutes);



app.get('/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

app.get('/auth/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'signup.html'));
});








// Rediriger l'utilisateur non connecté vers login
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.get('/diary', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'diary.html'));
});


const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connexion à MongoDB réussie !');
    app.listen(PORT, ()=>{
    console.log(`Le serveur est lancé sur le port ${PORT}`)
})

  })
  .catch((err) => {
    console.error('Connexion à MongoDB échouée !', err.message);
});










