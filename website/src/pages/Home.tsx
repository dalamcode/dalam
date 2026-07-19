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
  // Mac user agents don't include arch info, default to arm64 for modern Macs
  if (ua.includes('mac')) return '-arm64'
  return ''
}

const commands = {
  curl: 'curl -fsSL https://dalam.uthakkan.in/install | bash',
  npm: 'npm install -g @uthakkan/dalam',
  brew: 'brew install dalamcode/tap/dalam',
}

const features = [
  { title: 'CLI/TUI', desc: 'Terminal interface with syntax highlighting.' },
  { title: 'Desktop App', desc: 'Electron app for macOS, Windows, Linux.' },
  { title: 'VS Code', desc: 'Editor integration. Run without leaving IDE.' },
  { title: 'BYOK', desc: 'Your own keys for 15+ providers.' },
  { title: 'Local-First', desc: 'Code never leaves your machine.' },
  { title: 'Plugins', desc: 'Extend with tools and MCP servers.' },
]

const providers = ['OpenAI', 'Anthropic', 'Google', 'Azure', 'AWS Bedrock', 'xAI', 'Groq', 'Mistral', 'Cohere', 'Together AI', 'DeepInfra', 'OpenRouter', 'Perplexity', 'Cerebras', 'GitHub Copilot', 'Cloudflare AI']

export function Home() {
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

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <>
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
              <button className="copy-btn" onClick={copy} aria-label="Copy">
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                )}
              </button>
            </div>
          </div>

          <div className="hero-buttons">
            <button onClick={handleDownload} className="btn-hero btn-primary">{downloadLabel}</button>
            <a href="https://github.com/dalamcode/dalam" className="btn-hero btn-outline" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-label">Features</p>
          <h2 className="section-title">Everything you need</h2>
          <p className="section-desc">A complete AI coding toolkit.</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <Link to="/features" className="btn-hero btn-outline">View all features</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <p className="section-label">Providers</p>
          <h2 className="section-title">Works with any model</h2>
          <p className="section-desc">Use your own API keys with 16+ providers.</p>
          <div className="providers-row">
            {providers.map((p, i) => <span key={i} className="provider">{p}</span>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <p className="section-label">How it works</p>
          <h2 className="section-title">See Dalam in action</h2>
          <p className="section-desc">Watch how Dalam helps you write code faster.</p>
          <Link to="/how-it-works" className="btn-hero btn-primary">See how it works</Link>
        </div>
      </section>
    </>
  )
}
