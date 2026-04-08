import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4h4l2 3h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5a1 1 0 0 0-1 1v2"></path>
            </svg>
          </div>
          <span className="navbar-text">Inverto</span>
        </div>
        
        <div className="navbar-links">
          <a href="#" className="nav-link">Explore</a>
          <a href="#" className="nav-link">About</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
