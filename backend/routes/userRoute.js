const express = require('express');
const router = express.Router();
// importer le module userCtrl
const userCtrl = require('../controllers/userCtrl');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);

module.exports = router;