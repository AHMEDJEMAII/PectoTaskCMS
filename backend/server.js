const express = require('express');
const cors = require('cors'); // Importer le package CORS
const app = express();
const bodyParser = require('body-parser');
const WordsController = require('./controllers/wordsController');

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Configurer CORS pour permettre les requêtes du frontend
app.use(cors({
    origin: 'http://localhost:3000', // Autoriser uniquement le frontend
    methods: ['GET', 'PUT'], // Autoriser uniquement les méthodes nécessaires
    allowedHeaders: ['Content-Type'], // Autoriser les en-têtes nécessaires
}));

// Définir la route pour récupérer tous les mots
app.get('/api/words', WordsController.getAllWords);

// Définir la route pour mettre à jour un mot spécifique
app.put('/api/words/:id', WordsController.updateWord);

// Démarrer le serveur sur le port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
