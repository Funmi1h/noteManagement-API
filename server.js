// Importer express
const express = require('express');
//Créer un objet express
const app = express()
/// Importation de mongoose
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://db_usenameHeloise:db_Password2007@notesappcluster.6flzjrk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connexion à MongoDB réussie !');
    app.listen(PORT, ()=>{
    console.log(`Le serveur est lancé sur le port ${PORT}`)
})

  })
  .catch(() => {
    console.error('Connexion à MongoDB échouée !', err.message);
});





const PORT = 3000








// importer fs.promises
const fs = require('fs/promises');
//importer path
const path = require('path');
const { error } = require('console');
// Le chemin absolue vers le fichier contenant les notes 
//const noteFilePath = path.join(__dirname, 'notes.json');



// mise en place du middleware pour analyser le corps des requetes json
app.use(express.json())

// Implémentation de l'endpoint POST/notes
    // importer le modele Notes 
const Note = require('./models/Note');

app.post('/notes', (req, res, next)=>{
    delete req.body.id;
    // Créer un nouvel objet du model Note
    let note = new Note({
        ...req.body
    });
    note.save()
        .then(()=>{
            res.status(201).json({message: "Note créée avec succès"});
        })
        .catch(()=>{
            res.status(500).json(error);
        })
    
})


//Implementation de l'endpoint GET/notes

app.get('/notes', (req, res, next)=>{
    Note.find()
        .then(notes =>{
            res.status(200).json(notes);
        })
        .catch((err)=>{
            console.error("Erreur lors de la récupération des notes", err.message)
            // Erreur serveur
            res.status(500).json(error)
        })
})



// Récupérer une note spécifique

app.get('/notes/:id', (req, res, next)=>{
    Note.findById(req.params.id)
        .then(note =>{
            if(note){
                res.status(200).json(note);
            }else{
                res.status(404).json({error})
            }
            
        })
        .catch(error => res.status(500).json({error}))
})







// implementation de l'endpoint PUT/notes/:id
app.put('/notes/:id', (req, res, next) =>{
    Note.findByIdAndUpdate(
        req.params.id,
        {...req.body},
        {new: true, runValidators: true}
    )
        .then( note=>{
            if (!note){
                res.status(404).json({message: "Note non trouvée"})

            }else{
                res.status(200).json({message: "Note modifiée ", note});
            }
            
        })
        .catch((error)=>{
            res.status(500).json({error})
        })
})




// implementation de l'endpoint DELETE/note/:id
app.delete('/notes/:id', (req, res, next)=>{
    Note.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(204).end()
        })
        .catch((error)=>{
            res.status(500).json({error})
        })
})