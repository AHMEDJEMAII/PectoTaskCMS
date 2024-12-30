import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './WordList.css'; // Assurez-vous d'importer le fichier CSS

const WordList = () => {
    const [words, setWords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWord, setCurrentWord] = useState({});

    // Charger les mots depuis l'API
    useEffect(() => {
        axios.get('http://localhost:5000/api/words')
            .then(response => {
                setWords(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the words!', error);
            });
    }, []);

    // Ouvrir le modal avec les données à modifier
    const handleEdit = (word) => {
        console.log("Editing word:", word);  // Vérifiez que vous récupérez bien l'objet entier
        setCurrentWord({
            id: word.id,
            wordFirstLang: word.wordFirstLang,
            sentenceFirstLang: word.sentenceFirstLang,
            wordSecondLang: word.wordSecondLang,
            sentenceSecondLang: word.sentenceSecondLang
        });
        setIsModalOpen(true);
    };

    // Gérer la mise à jour d'un mot
    const handleUpdate = () => {
        // Vérifiez que l'ID est valide
        if (!currentWord.id) {
            console.error("ID is missing!");
            return;
        }
    
        // Affichez les données avant l'envoi
        console.log("Updating word:", currentWord);  // Cela vous permet de voir exactement ce qui est envoyé
    
        // Vérifiez la structure des données envoyées
        const dataToSend = {
            wordFirstLang: currentWord.wordFirstLang,
            sentenceFirstLang: currentWord.sentenceFirstLang,
            wordSecondLang: currentWord.wordSecondLang,
            sentenceSecondLang: currentWord.sentenceSecondLang
        };
        console.log("Data to send:", dataToSend);
    
        axios.put(`http://localhost:5000/api/words/${currentWord.id}`, dataToSend)
            .then(response => {
                const updatedWords = words.map(word => 
                    word.id === currentWord.id ? response.data : word
                );
                setWords(updatedWords);
                setIsModalOpen(false);  // Fermer le modal
            })
            .catch(error => {
                if (error.response) {
                    console.error("Server responded with error:", error.response.data);
                } else if (error.request) {
                    console.error("No response from the server:", error.request);
                } else {
                    console.error("Error during request setup:", error.message);
                }
            });
    };
    

    return (
        <div className="word-list-container">
            <h1 className="title">Words List</h1>
            <table className="word-table">
                <thead>
                    <tr>
                        <th>Word (First Language)</th>
                        <th>Sentence (First Language)</th>
                        <th>Word (Second Language)</th>
                        <th>Sentence (Second Language)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map(word => (
                        <tr key={word.id}>
                            <td>{word.wordFirstLang}</td>
                            <td>{word.sentenceFirstLang}</td>
                            <td>{word.wordSecondLang}</td>
                            <td>{word.sentenceSecondLang}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(word)}>Modifier</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Modifier le mot</h2>
                        <form>
                            <div>
                                <label>Word (First Language)</label>
                                <input 
                                    type="text" 
                                    value={currentWord.wordFirstLang} 
                                    onChange={(e) => setCurrentWord({ ...currentWord, wordFirstLang: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label>Sentence (First Language)</label>
                                <input 
                                    type="text" 
                                    value={currentWord.sentenceFirstLang} 
                                    onChange={(e) => setCurrentWord({ ...currentWord, sentenceFirstLang: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label>Word (Second Language)</label>
                                <input 
                                    type="text" 
                                    value={currentWord.wordSecondLang} 
                                    onChange={(e) => setCurrentWord({ ...currentWord, wordSecondLang: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label>Sentence (Second Language)</label>
                                <input 
                                    type="text" 
                                    value={currentWord.sentenceSecondLang} 
                                    onChange={(e) => setCurrentWord({ ...currentWord, sentenceSecondLang: e.target.value })} 
                                />
                            </div>
                            <button type="button" onClick={handleUpdate}>Mettre à jour</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordList;
