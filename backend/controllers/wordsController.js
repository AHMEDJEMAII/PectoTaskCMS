const WordsModel = require('../models/wordsModel');

const WordsController = {
    getAllWords: (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        WordsModel.getAllWords(limit, offset, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    },

    updateWord: (req, res) => {
        const id = req.params.id;
        const { word, translation, example_sentence } = req.body;

        if (!word || !translation || !example_sentence) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        WordsModel.updateWord(id, word, translation, example_sentence, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Word updated successfully' });
        });
    },
};

module.exports = WordsController;
