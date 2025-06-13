import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          {/* Main hero section */}
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            
            <h1 className="title">webtic_tac_toe</h1>
            
            <div className="description">
              Start building your application.
            </div>
            
            <button
              className="btn btn-large"
              style={{
                color: '#ffffff'
              }}>Buttonnn</button>
          </div>
          {/* --- TicTacToe Game Section --- */}
          <TicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;