import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type Platform = 'mac' | 'windows' | 'linux' | 'unknown'

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'mac'
  if (ua.includes('win')) return 'windows'
  if (ua.includes('linux')) return 'linux'
  return 'unknown'
}

function getArch(): string {
  if (typeof window === 'undefined') return ''
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('arm64') || ua.includes('aarch64')) return '-arm64'
  return ''
}

function getDownloadUrl(platform: Platform): string {
  const arch = getArch()
  if (platform === 'mac') return `https://github.com/dalamcode/dalam/releases/latest/download/dalam-darwin${arch}.zip`
  if (platform === 'windows') return `https://github.com/dalamcode/dalam/releases/latest/download/dalam-windows-x64.zip`
  if (platform === 'linux') return `https://github.com/dalamcode/dalam/releases/latest/download/dalam-linux${arch}.tar.gz`
  return 'https://github.com/dalamcode/dalam/releases'
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [platform, setPlatform] = useState<Platform>('unknown')

  useEffect(() => { setPlatform(detectPlatform()) }, [])

  const handleDownload = () => {
    const url = getDownloadUrl(platform)
    const a = document.createElement('a')
    a.href = url
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

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
          <button onClick={handleDownload} className="btn-download">Download</button>
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
