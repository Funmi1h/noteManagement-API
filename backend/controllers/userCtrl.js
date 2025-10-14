const validator = require('validator');
const User = require('../models/User');
// Importation de bcrypt pour le hashage des mots de passe
const bcrypt = require('bcrypt');

// package pour pourvoir créer et vérifier les tokens
const jwt = require('jsonwebtoken')

// Fonction pour l'inscription de l'utiliateur
exports.signUp = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
        .then( (hash)=>{
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(()=>{res.status(201).json({message: "Utilisateur créé !"})

                })
                .catch(error => res.status(400).json({error}))

        })
        .catch(error => res.status(500).json({error}))


}

// Fonction pour la connexion de l'utilisateur

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user =>{
        //Si l'utilisateur n'existe pas 
        if(!user){
            return res.status(401).json({message: "Paire motde passe/email incorrecte"})
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if (!valid){
                    return res.status(401).json({message: "Paire identifiant/mot de passe incorrecte"})
                };
                res.status(200).json({
                    // On renvoie l'objet utilisateur avec son id et son tpken d'authentification
                    userId : user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                })
            })
            .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))

};