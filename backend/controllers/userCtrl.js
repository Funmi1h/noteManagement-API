const validator = require('validator');
const User = require('../models/User');
// Importation de bcrypt pour le hashage des mots de passe
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'RANDOM_TOKEN_SECRET_FALLBACK'

// package pour pourvoir créer et vérifier les tokens
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Fonction pour l'inscription de l'utiliateur
exports.signUp = async (req, res) => {
  try {
    // 1️⃣ Vérification des champs
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    // 2️⃣ Validation email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Adresse e-mail invalide." });
    }

    // 3️⃣ Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // 4️⃣ Hash du mot de passe
    const hash = await bcrypt.hash(password, 10);

    // 5️⃣ Sauvegarde dans la base de données
    const user = new User({ email, password: hash });
    await user.save();

    // 6️⃣ Réponse finale
    return res.status(201).json({ message: "Utilisateur créé !" });

  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({ message: "Erreur interne du serveur", error });
  }
};


// Fonction pour la connexion de l'utilisateur

exports.login = (req, res, next) => {
     if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Requête invalide : Les champs email et mot de passe sont requis." });
    }

    User.findOne({email: req.body.email})
    .then(user =>{
        //Si l'utilisateur n'existe pas 
        if(!user){
            return res.status(401).json({message: "Identifiants incorrets"})
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if (!valid){
                    return res.status(401).json({message: "Identifiants incorrets"})
                };
                res.status(200).json({
                    // On renvoie l'objet utilisateur avec son id et son tpken d'authentification
                    userId : user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        JWT_SECRET,
                        {expiresIn: '24h'}
                    )
                });
                  
            })
            .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))

};