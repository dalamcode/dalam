import { useState } from 'react'
import { Link } from 'react-router-dom'

const methods = [
  { name: 'curl', platform: 'Any platform', desc: 'One command to install. Works on macOS, Linux, and Windows (WSL).', command: 'curl -fsSL https://dalam.uthakkan.in/install | bash' },
  { name: 'Homebrew', platform: 'macOS & Linux', desc: 'Install via Homebrew package manager.', command: 'brew install dalamcode/tap/dalam' },
  { name: 'npm', platform: 'Node.js', desc: 'Install globally via npm.', command: 'npm install -g @uthakkan/dalam' },
  { name: 'Desktop', platform: 'macOS, Windows, Linux', desc: 'Download the standalone desktop application.', link: 'https://github.com/dalamcode/dalam/releases' },
]

const steps = [
  { step: 1, title: 'Install', desc: 'Run the install command for your platform.' },
  { step: 2, title: 'Configure', desc: 'Add your API key from your preferred provider.' },
  { step: 3, title: 'Code', desc: 'Start coding with AI assistance in your terminal.' },
]

export function Install() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="section-label">Install</p>
          <h1>Get started in 30 seconds</h1>
          <p className="page-hero-sub">Choose your preferred installation method.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="install-cards">
            {methods.map((m, i) => (
              <div key={i} className="install-card-full">
                <div className="install-card-header">
                  <h3>{m.name}</h3>
                  <span className="install-platform">{m.platform}</span>
                </div>
                <p className="install-desc">{m.desc}</p>
                {m.command ? (
                  <div className="install-command">
                    <code>{m.command}</code>
                    <button className="copy-btn" onClick={() => copy(m.command!, i)} aria-label="Copy">
                      {copiedIdx === i ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <a href={m.link} className="btn-hero btn-primary" target="_blank" rel="noopener">Download</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <p className="section-label">Quick Start</p>
          <h2 className="section-title">3 steps to start coding</h2>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step">
                <div className="step-number">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Learn more</h2>
          <p className="section-desc">See how Dalam works under the hood.</p>
          <Link to="/how-it-works" className="btn-hero btn-outline">How it works</Link>
        </div>
      </section>
    </div>
  )
}
