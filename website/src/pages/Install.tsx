import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { detectPlatform, getDesktopDownloadUrl } from '../platform'
import type { Platform } from '../platform'

const methods = [
  { id: 'curl', name: 'curl', platform: 'Any platform', desc: 'One command to install. Works on macOS, Linux, and Windows (WSL).', command: 'curl -fsSL https://dalam.uthakkan.in/install | bash' },
  { id: 'brew', name: 'Homebrew', platform: 'macOS & Linux', desc: 'Install via Homebrew package manager.', command: 'brew install dalamcode/tap/dalam' },
  { id: 'npm', name: 'npm', platform: 'Node.js', desc: 'Install globally via npm.', command: 'npm install -g @uthakkan/dalam' },
  { id: 'desktop', name: 'Desktop', platform: 'macOS, Windows, Linux', desc: 'Download the standalone desktop application.', link: true },
]

const steps = [
  { id: 1, title: 'Install', desc: 'Run the install command for your platform.' },
  { id: 2, title: 'Configure', desc: 'Add your API key from your preferred provider.' },
  { id: 3, title: 'Code', desc: 'Start coding with AI assistance in your terminal.' },
]

export function Install() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const [platform, setPlatform] = useState<Platform>('unknown')
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => { setPlatform(detectPlatform()) }, [])
  useEffect(() => {
    return () => { if (copiedTimer.current) clearTimeout(copiedTimer.current) }
  }, [])

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    if (copiedTimer.current) clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => setCopiedIdx(null), 2000)
  }

  const desktopUrl = getDesktopDownloadUrl(platform)

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
            {methods.map(m => (
              <div key={m.id} className="install-card-full">
                <div className="install-card-header">
                  <h3>{m.name}</h3>
                  <span className="install-platform">{m.platform}</span>
                </div>
                <p className="install-desc">{m.desc}</p>
                {m.command ? (
                  <div className="install-command">
                    <code>{m.command}</code>
                    <button className="copy-btn" onClick={() => copy(m.command, methods.indexOf(m))} aria-label="Copy command">
                      {copiedIdx === methods.indexOf(m) ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <a href={desktopUrl} className="btn-hero btn-primary" target="_blank" rel="noopener noreferrer">Download Desktop App</a>
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
            {steps.map(s => (
              <div key={s.id} className="step">
                <div className="step-number">{s.id}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner text-center">
          <h2 className="section-title">Learn more</h2>
          <p className="section-desc">See how Dalam works under the hood.</p>
          <Link to="/how-it-works" className="btn-hero btn-outline">How it works</Link>
        </div>
      </section>
    </div>
  )
}
