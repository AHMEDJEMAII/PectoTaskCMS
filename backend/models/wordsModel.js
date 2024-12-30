const db = require('../db/database');

const WordsModel = {
    getAllWords: (limit, offset, callback) => {
        db.all('SELECT * FROM words LIMIT ? OFFSET ?', [limit, offset], callback);
    },
    updateWord: (id, wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang, callback) => {
        db.run(
            'UPDATE words SET wordFirstLang = ?, sentenceFirstLang = ?, wordSecondLang = ?, sentenceSecondLang = ? WHERE id = ?',
            [wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang, id],
            callback
        );
    },
};

module.exports = WordsModel;
