// importer mongoose
const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema( { 
    titre:{
        type:  String, 
        required: true
    },
    contenu: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        default: Date.now()
    }

})
// on importe le schéma en tant que module Mongoose et se sera aussi disponible d'utilisation dans l'application express
const Note =mongoose.model('Note', notesSchema)
module.exports = Note