
const Note = require('../models/Note')

exports.createNote =  (req, res, next)=>{
    delete req.body.id;
    // Créer un nouvel objet du model Note
    let note = new Note({
        ...req.body
    });
    note.save()
        .then(()=>{
            res.status(201).json({message: "Note sauvegardée"});
        })
        .catch((err)=>{
            res.status(500).json({error: err});
        })
    
};

exports.getAllNote = (req, res, next)=>{
    Note.find()
        .then(notes =>{
            res.status(200).json(notes);
        })
        .catch((err)=>{
            console.error("Erreur lors de la récupération des notes", err.message)
            // Erreur serveur
            res.status(500).json({error: err})
        })
};

exports.getOneNote = (req, res, next)=>{
    Note.findById(req.params.id)
        .then(note =>{
            if(note){
                res.status(200).json(note);
            }else{
                res.status(404).json({message: "Id invalide"})
            }
            
        })
        .catch(err => res.status(500).json({error: err}))
};


exports.modifyNote = (req, res, next) =>{
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
        .catch((err)=>{
            res.status(500).json({error: err});
        })
}

exports.deleteNote = (req, res, next)=>{
    Note.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(204).end()
        })
        .catch((err)=>{
            res.status(500).json({error: err})
        })
};

