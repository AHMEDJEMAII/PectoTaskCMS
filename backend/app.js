const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const wordsRoutes = require('./routes/wordsRoutes');
const cors = require('cors'); // Importer cors

// Middleware pour parser le JSON
app.use(bodyParser.json());

// CORS configuré pour autoriser toutes les origines
app.use(cors({
  origin: 'http://localhost:3000', // Origine de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Les méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));

// Routes API
app.use('/api', wordsRoutes); // Toutes les routes de mots commencent par /api

// Port d'écoute
const PORT = process.env.PORT || 5000; // Port 5000 pour le backend
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
