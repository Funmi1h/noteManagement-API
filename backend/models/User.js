const mongoose = require('mongoose');
// IMPORTER LE PAckage pour les validateurs
    // On veut vérifier l'unicité d'un champ dans ce cas si l'email
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema ({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

// Pour ajouter le plugin mongoose-unique-validator a mon schéma 
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema);
module.exports = User;