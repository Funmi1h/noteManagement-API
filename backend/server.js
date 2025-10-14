// Importer express
const express = require('express');
//Créer un objet express
const app = express()
/// Importation de mongoose
const mongoose = require('mongoose');
 // Importer le module path
const path = require('path');

require('dotenv').config();
// Importation de la route noteRoute
const noteRoutes = require('./routes/noteRoute');

// Importation de la route 
const userRoutes = require('./routes/userRoute');

const PORT = 3000;
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

//Servur le fichier index.html a la racine du projet
app.get('/', (req, res)=>{
  const indexHtmlPath = path.join(__dirname, '..', 'frontend', 'index.html');
  res.sendFile(indexHtmlPath);
})

// SERvir les fichiers statiques
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// mise en place du middleware pour analyser le corps des requetes json
app.use(express.json());
// Enregistrer la route pur toutes les demandes efffectuées vers /notes
app.use('/notes', noteRoutes);

app.use('/auth', userRoutes);