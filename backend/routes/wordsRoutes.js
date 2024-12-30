const express = require('express');
const router = express.Router();
const wordsController = require('../controllers/wordsController');

// Route pour récupérer tous les mots
router.get('/words', wordsController.getAllWords);

// Route pour mettre à jour un mot avec l'ID
router.put('/words/:id', wordsController.updateWord);

module.exports = router;
