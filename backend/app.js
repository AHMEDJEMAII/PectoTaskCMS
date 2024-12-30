const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const wordsRoutes = require('./routes/wordsRoutes');

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Routes API
app.use('/api', wordsRoutes); // Toutes les routes de mots commencent par /api

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
