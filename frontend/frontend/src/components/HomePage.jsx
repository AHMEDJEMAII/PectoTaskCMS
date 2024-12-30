import React from 'react';
import './HomePage.css'; // Link to the CSS file for styling
import Sidebar from './Sidebar'; // Correctly import your Sidebar component

const HomePage = () => {
  return (
    <div className="home-container">
      <Sidebar /> {/* You can add the Sidebar component here if needed */}
      <div className="welcome-box">
        <h1>Welcome, Vladimir!</h1>
        <p>Your Content Management System is ready to go!</p>
        <button className="go-button" onClick={() => window.location.href = '/words'}>
          Go to Words page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
