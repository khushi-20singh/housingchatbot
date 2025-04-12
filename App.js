import React, { useState, useEffect } from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <h2>🏠 Easy Housing!
          </h2>
          <ul>
            <li>🏡 Home</li>
            <li>💬 Chatbot</li>
            <li>📊 Budgeting</li>
            <li>🛠️ Plans</li>
            <li>📷 Image Analysis</li>
            <li>📜 Schemes</li>
          </ul>
        </div>

        {/* Theme Switcher */}
        <div className="theme-switch-container">
          <span className="theme-label">
            {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === 'dark'}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Affordable Housing Chatbot</h1>

        <Chatbot />

        {/* Image Analysis Section */}
        <div className="image-analysis">
          <h2>🏗️ Upload Property Image</h2>
          <p>Our system will estimate the cost based on the image.</p>
          <input type="file" accept="image/*" />
        </div>
      </div>
    </div>
  );
}

export default App;

