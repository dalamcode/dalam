import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <img src="/icon.svg" alt="Dalam" />
          <span>dalam</span>
        </Link>
        
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/features">Features</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/install">Install</Link>
          <a href="https://github.com/dalamcode/dalam" target="_blank" rel="noopener">GitHub</a>
          <a href="https://github.com/dalamcode/dalam/releases" className="btn-download" target="_blank" rel="noopener">Download</a>
        </div>

        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>
    </nav>
  )
}
