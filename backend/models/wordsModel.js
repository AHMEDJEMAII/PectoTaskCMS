const db = require('../db/database'); // Assurez-vous que le chemin est correct

const WordsModel = {
    getAllWords: (limit, offset, callback) => {
        db.all('SELECT * FROM words LIMIT ? OFFSET ?', [limit, offset], callback);
    },
    updateWord: (id, word, translation, example_sentence, callback) => {
        db.run(
            'UPDATE words SET wordFirstLang = ?, sentenceFirstLang = ?, wordSecondLang = ?, sentenceSecondLang = ? WHERE id = ?',
            [word, translation, example_sentence, id],
            callback
        );
    },
};

module.exports = WordsModel;
