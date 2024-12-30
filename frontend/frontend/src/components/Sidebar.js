import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Book } from 'lucide-react';
import './Sidebar.css';

const Sidebar = React.memo(() => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <Book className="logo-icon" />
                    <h2>Admin I for CMS</h2>
                </div>
                <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul className="sidebar-links">
                    <li>
                        <Link to="/words" className={location.pathname === '/words' ? 'active' : ''}>
                            <div className="link-content">
                                <Book size={20} />
                                <span>Words</span>
                                <ChevronRight size={16} className="arrow-icon" />
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
});

export default Sidebar;