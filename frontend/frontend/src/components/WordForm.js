import React, { useState } from 'react';
import axios from 'axios';

const WordForm = () => {
    const [wordFirstLang, setWordFirstLang] = useState('');
    const [sentenceFirstLang, setSentenceFirstLang] = useState('');
    const [wordSecondLang, setWordSecondLang] = useState('');
    const [sentenceSecondLang, setSentenceSecondLang] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const wordData = {
            wordFirstLang,
            sentenceFirstLang,
            wordSecondLang,
            sentenceSecondLang,
        };

        axios.put('http://localhost:5000/api/words/1', wordData)
            .then(response => {
                alert('Word updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the word!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Word (First Language):
                <input type="text" value={wordFirstLang} onChange={(e) => setWordFirstLang(e.target.value)} />
            </label>
            <label>
                Sentence (First Language):
                <input type="text" value={sentenceFirstLang} onChange={(e) => setSentenceFirstLang(e.target.value)} />
            </label>
            <label>
                Word (Second Language):
                <input type="text" value={wordSecondLang} onChange={(e) => setWordSecondLang(e.target.value)} />
            </label>
            <label>
                Sentence (Second Language):
                <input type="text" value={sentenceSecondLang} onChange={(e) => setSentenceSecondLang(e.target.value)} />
            </label>
            <button type="submit">Update Word</button>
        </form>
    );
};

export default WordForm;
