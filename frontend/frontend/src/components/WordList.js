import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WordList.css';

const WordList = () => {
    const [words, setWords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWord, setCurrentWord] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/words');
            setWords(response.data);
            setError('');
        } catch (error) {
            setError('Erreur lors du chargement des mots');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (word) => {
        if (!word?.id) {
            setError('ID invalide');
            return;
        }
        setCurrentWord({
            id: word.id,
            wordFirstLang: word.wordFirstLang || '',
            sentenceFirstLang: word.sentenceFirstLang || '',
            wordSecondLang: word.wordSecondLang || '',
            sentenceSecondLang: word.sentenceSecondLang || ''
        });
        setIsModalOpen(true);
        setError('');
    };

    const validateWord = (word) => {
        if (!word.id || typeof word.id !== 'number') return false;
        if (!word.wordFirstLang?.trim()) return false;
        if (!word.wordSecondLang?.trim()) return false;
        return true;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (!validateWord(currentWord)) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:5000/api/words/${currentWord.id}`,
                {
                    wordFirstLang: currentWord.wordFirstLang.trim(),
                    sentenceFirstLang: currentWord.sentenceFirstLang.trim(),
                    wordSecondLang: currentWord.wordSecondLang.trim(),
                    sentenceSecondLang: currentWord.sentenceSecondLang.trim()
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data) {
                setWords(prevWords => 
                    prevWords.map(w => w.id === currentWord.id ? response.data : w)
                );
                setIsModalOpen(false);
                setError('');
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setError('Données invalides ou ID incorrect');
            } else {
                setError('Erreur lors de la mise à jour');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setError('');
        setCurrentWord({});
    };

    if (isLoading && !words.length) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="word-list-container">
            <h1 className="title">Liste des mots</h1>
            
            {error && <div className="error-message">{error}</div>}
            
            <table className="word-table">
                <thead>
                    <tr>
                        <th>Mot (Première langue)</th>
                        <th>Phrase (Première langue)</th>
                        <th>Mot (Deuxième langue)</th>
                        <th>Phrase (Deuxième langue)</th>
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
                                <button 
                                    className="edit-button"
                                    onClick={() => handleEdit(word)}
                                    disabled={isLoading}
                                >
                                    Modifier
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Modifier le mot</h2>
                                <button 
                                    className="close-button"
                                    onClick={closeModal}
                                    type="button"
                                >
                                    ×
                                </button>
                            </div>
                            
                            {error && <div className="error-message">{error}</div>}
                            
                            <form onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <label>
                                        Mot (Première langue) *
                                        <input 
                                            type="text" 
                                            value={currentWord.wordFirstLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                wordFirstLang: e.target.value
                                            })}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Phrase (Première langue)
                                        <input 
                                            type="text" 
                                            value={currentWord.sentenceFirstLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                sentenceFirstLang: e.target.value
                                            })}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Mot (Deuxième langue) *
                                        <input 
                                            type="text" 
                                            value={currentWord.wordSecondLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                wordSecondLang: e.target.value
                                            })}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Phrase (Deuxième langue)
                                        <input 
                                            type="text" 
                                            value={currentWord.sentenceSecondLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                sentenceSecondLang: e.target.value
                                            })}
                                        />
                                    </label>
                                </div>
                                <div className="button-group">
                                    <button 
                                        type="submit"
                                        className="submit-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
                                    </button>
                                    <button 
                                        type="button"
                                        className="cancel-button"
                                        onClick={closeModal}
                                        disabled={isLoading}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordList;