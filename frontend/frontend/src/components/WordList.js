import React, { useEffect, useState } from 'react';
import { Edit2, X, Loader2, AlertCircle, Search, Eye } from 'lucide-react'; // Importation de l'icône des yeux
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import './WordList.css';

const WordList = () => {
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWord, setCurrentWord] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Page actuelle
    const [wordsPerPage] = useState(8); // Nombre de mots par page
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Modal pour afficher les détails

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/words');
            setWords(response.data);
            setFilteredWords(response.data);  // Set all words as initial filteredWords
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

    const handleViewDetails = (word) => {
        setCurrentWord(word);
        setIsDetailModalOpen(true);
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
    
                // SweetAlert success popup
                Swal.fire({
                    icon: 'success',
                    title: 'Word updated successfully',
                    text: 'The word has been successfully updated.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Rafraîchissement de la page après avoir cliqué sur OK
                    window.location.reload();
                });
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

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setCurrentWord({});
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = words.filter((word) => {
            const wordFirstLang = word.wordFirstLang ? word.wordFirstLang.toLowerCase() : '';
            const wordSecondLang = word.wordSecondLang ? word.wordSecondLang.toLowerCase() : '';
            return wordFirstLang.includes(query) || wordSecondLang.includes(query);
        });

        setFilteredWords(filtered);
    };

    const indexOfLastWord = currentPage * wordsPerPage;
    const indexOfFirstWord = indexOfLastWord - wordsPerPage;
    const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading && !words.length) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="word-list-container">
            <div className="header">
                <h1 className="title">Pecto Task CMS</h1>
                <div className="search-bar-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search by keyword"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Search className="search-icon" size={20} />
                </div>
            </div>

            {error && (
                <div className="alert">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {isLoading && !words.length ? (
                <div className="loading">
                    <Loader2 className="spin" size={24} />
                    <span>Loading vocabulary...</span>
                </div>
            ) : (
                <div className="card">
                    <div className="table-container">
                        <table className="word-table">
                            <thead>
                                <tr>
                                    <th>Primary Word</th>
                                    <th>Example Sentence</th>
                                    <th>Translation</th>
                                    <th>Translation Example</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentWords.map(word => (
                                    <tr key={word.id}>
                                        <td>{word.wordFirstLang}</td>
                                        <td>{word.sentenceFirstLang}</td>
                                        <td>{word.wordSecondLang}</td>
                                        <td>{word.sentenceSecondLang}</td>
                                        <td>
                                            <button 
                                                className="icon-button"
                                                onClick={() => handleEdit(word)}
                                                disabled={isLoading}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            {/* Ajouter le bouton "yeux" pour afficher les détails */}
                                            <button
                                                className="icon-button"
                                                onClick={() => handleViewDetails(word)}
                                                disabled={isLoading}
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredWords.length / wordsPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Edit Word</h2>
                                <button 
                                    className="icon-button"
                                    onClick={closeModal}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            {error && (
                                <div className="alert">
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            <form onSubmit={handleUpdate} className="edit-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Primary Word *</label>
                                        <input 
                                            type="text" 
                                            value={currentWord.wordFirstLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                wordFirstLang: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Translation *</label>
                                        <input 
                                            type="text" 
                                            value={currentWord.wordSecondLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                wordSecondLang: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Example Sentence</label>
                                        <textarea 
                                            value={currentWord.sentenceFirstLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                sentenceFirstLang: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Translation Example</label>
                                        <textarea 
                                            value={currentWord.sentenceSecondLang || ''} 
                                            onChange={(e) => setCurrentWord({
                                                ...currentWord,
                                                sentenceSecondLang: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                                <div className="button-group">
                                    <button 
                                        type="submit"
                                        className="primary-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="spin" size={18} />
                                                Updating...
                                            </>
                                        ) : 'Update Word'}
                                    </button>
                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isDetailModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Word Details</h2>
                                <button 
                                    className="icon-button"
                                    onClick={closeDetailModal}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div>
                                <h3>Primary Word: {currentWord.wordFirstLang}</h3>
                                <p>Example: {currentWord.sentenceFirstLang}</p>
                                <h3>Translation: {currentWord.wordSecondLang}</h3>
                                <p>Translation Example: {currentWord.sentenceSecondLang}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordList;
