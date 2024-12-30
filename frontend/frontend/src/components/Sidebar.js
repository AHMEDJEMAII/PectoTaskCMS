import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/words">Words</Link></li>
                <li><Link to="/add-word">Add Word</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
