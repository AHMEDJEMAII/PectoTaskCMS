import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WordList from './components/WordList';
import HomePage from './components/HomePage';

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ marginLeft: '260px', padding: '20px' }}>
                    <Routes>
                    <Route path="/" element={<HomePage />} />

                        <Route path="/words" element={<WordList />} />
                        
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
