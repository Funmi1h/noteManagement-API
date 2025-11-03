// ====== Importations ======
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// ====== Sécurité et Middleware ======

// Autorise toutes les origines (CORS)
app.use(cors());

// Analyse les requêtes JSON
app.use(express.json());

// Politique CSP (protège contre certaines attaques XSS)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
    "connect-src 'self' http://localhost:3000 https://cdn.jsdelivr.net; " +
    "img-src 'self' data: https://cdn.jsdelivr.net;"
  );
  next();
});

// Ces routes affichent directement tes pages HTML
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'signup.html'));
});

app.get('/diary', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'diary.html'));
});

// Route par défaut → redirection vers /login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// ====== Fichiers statiques (CSS, JS, images, etc.) ======
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Routes BACKEND
const noteRoutes = require('./routes/noteRoute');
const userRoutes = require('./routes/userRoute');

app.use('/notes', noteRoutes);
app.use('/auth', userRoutes);

// Connexion MongoDB 
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie !');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur : http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Connexion à MongoDB échouée :', err.message);
  });
