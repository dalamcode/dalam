import { useState, useEffect } from 'react'

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

const commands = {
  curl: 'curl -fsSL https://dalam.uthakkan.in/install | bash',
  npm: 'npm install -g @uthakkan/dalam',
  brew: 'brew install dalamcode/tap/dalam',
}

export function Hero() {
  const [tab, setTab] = useState<'curl' | 'npm' | 'brew'>('curl')
  const [copied, setCopied] = useState(false)
  const [platform, setPlatform] = useState<Platform>('unknown')

  useEffect(() => { setPlatform(detectPlatform()) }, [])

  const copy = () => {
    navigator.clipboard.writeText(commands[tab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadUrl = (() => {
    const arch = getArch()
    if (platform === 'mac') return `https://github.com/dalamcode/dalam/releases/latest/download/dalam-darwin${arch}.zip`
    if (platform === 'windows') return `https://github.com/dalamcode/dalam/releases/latest/download/dalam-windows-x64.zip`
    if (platform === 'linux') return `https://github.com/dalamcode/dalam/releases/latest/download/dalam-linux${arch}.tar.gz`
    return 'https://github.com/dalamcode/dalam/releases'
  })()

  const downloadLabel = platform === 'mac' ? 'Download for macOS' : platform === 'windows' ? 'Download for Windows' : platform === 'linux' ? 'Download for Linux' : 'Download'

  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>The AI coding agent<br />built for the terminal</h1>
        <p className="hero-sub">Local-first BYOK. Your API keys, your code, your control.</p>

        <div className="install-box">
          <div className="install-tabs">
            {(['curl', 'npm', 'brew'] as const).map(t => (
              <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <div className="install-code">
            <code>{commands[tab]}</code>
            <button className="copy-btn" onClick={copy}>
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              )}
            </button>
          </div>
        </div>

        <div className="hero-buttons">
          <a href={downloadUrl} className="btn-hero btn-primary" target="_blank" rel="noopener">{downloadLabel}</a>
          <a href="https://github.com/dalamcode/dalam" className="btn-hero btn-outline" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </section>
  )
}
