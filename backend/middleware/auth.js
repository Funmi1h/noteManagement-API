// Importer le pacckage pour gérer les tokens

const jwt = require('jsonwebtoken');

//Le middleware d'authentification
module.exports = (req, res, next)=> {
    try{
        // on extrait le token du header Authorization de la requete entrante
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }
        next()
    }catch (error){
        res.status(401).json({error});

    }
}