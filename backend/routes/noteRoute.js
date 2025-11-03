const express = require('express');

// CREER un router express
const router = express.Router();

// mise en place du middleware pour analyser le corps des requetes json
router.use(express.json());

// Implémentation de l'endpoint POST/notes
    // importer le modele Notes 
const Note = require('../models/Note');


// Importer le controlleur
const noteCtrl = require('../controllers/noteCtrl');
// importer le middleware de auth
const auth = require('../middleware/auth');

router.post('/',auth,  noteCtrl.createNote);


//Implementation de l'endpoint GET/notes

router.get('/', auth, noteCtrl.getAllNote)



// Récupérer une note spécifique

router.get('/:id',auth, noteCtrl.getOneNote)


// implementation de l'endpoint PUT/notes/:id
router.put('/:id',auth,  noteCtrl.modifyNote)




// implementation de l'endpoint DELETE/note/:id
router.delete('/:id', auth, noteCtrl.deleteNote)



// exporter le router
module.exports = router;