import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎵</span>
          <div>
            <h1>Sinhala Karaoke Songs</h1>
            <p className="subtitle">Discover classic and modern Sinhala music</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
