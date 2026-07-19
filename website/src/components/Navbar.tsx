import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { detectPlatform, getDesktopDownloadUrl } from '../platform'
import type { Platform } from '../platform'

interface NavbarProps {
  toggleTheme: () => void
  theme: 'light' | 'dark'
}

export function Navbar({ toggleTheme, theme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [platform, setPlatform] = useState<Platform>('unknown')
  const location = useLocation()

  useEffect(() => { setPlatform(detectPlatform()) }, [])
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mobileOpen])

  const handleDownload = useCallback(() => {
    window.open(getDesktopDownloadUrl(platform), '_blank', 'noopener')
  }, [platform])

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
          <a href="https://github.com/dalamcode/dalam" target="_blank" rel="noopener noreferrer">GitHub</a>
          <button className="btn-download" onClick={handleDownload}>
            {platform === 'unknown' ? 'Download' : platform === 'mac' ? 'Download for macOS' : platform === 'windows' ? 'Download for Windows' : 'Download for Linux'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setMobileOpen(o => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>
    </nav>
  )
}
