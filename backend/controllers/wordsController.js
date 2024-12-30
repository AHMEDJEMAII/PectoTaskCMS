const WordsModel = require('../models/wordsModel');

const WordsController = {
    getAllWords: (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        WordsModel.getAllWords(limit, offset, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        });
    },
    updateWord: (req, res) => {
        const id = req.params.id;
        // Mise à jour des noms des propriétés pour correspondre à la structure de la base de données
        const { wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang } = req.body;

        // Vérification si toutes les valeurs sont présentes
        if (!wordFirstLang || !sentenceFirstLang || !wordSecondLang || !sentenceSecondLang) {
            return res.status(400).json({ error: 'Tous les champs doivent être remplis.' });
        }

        WordsModel.updateWord(id, wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang, (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: 'Mot mis à jour avec succès' });
            }
        });
    },
};

module.exports = WordsController;
