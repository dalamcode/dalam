import { useState, useEffect, useRef, type JSX } from 'react'
import { Link } from 'react-router-dom'
import { detectPlatform, getDesktopDownloadUrl, getDesktopLabel } from '../platform'
import type { Platform } from '../platform'

const commands = {
  curl: 'curl -fsSL https://dalam.uthakkan.in/install | bash',
  npm: 'npm install -g @uthakkan/dalam',
  brew: 'brew install dalamcode/tap/dalam',
}

const features = [
  { id: 'cli', title: 'CLI/TUI', desc: 'Terminal interface with syntax highlighting, multi-file editing, and tool calling.', icon: 'terminal' },
  { id: 'desktop', title: 'Desktop App', desc: 'Electron app for macOS, Windows, and Linux with integrated terminal.', icon: 'monitor' },
  { id: 'vscode', title: 'VS Code', desc: 'Editor integration. Run without leaving your IDE.', icon: 'code' },
  { id: 'byok', title: 'BYOK', desc: 'Use your own API keys for 15+ providers.', icon: 'key' },
  { id: 'local-first', title: 'Local-First', desc: 'Code never leaves your machine. Full control.', icon: 'shield' },
  { id: 'plugins', title: 'Plugins', desc: 'Extend with tools, MCP servers, and community plugins.', icon: 'puzzle' },
]

const featureIcons: Record<string, JSX.Element> = {
  terminal: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  monitor: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  code: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  key: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  puzzle: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.706 2.404 2.404 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.404 2.404 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.73c.31-.31.404-.762.274-1.154-.268-.804-.066-1.724.662-2.452a2.5 2.5 0 0 1 3.606.036c.23.23.556.338.877.289a1.026 1.026 0 0 0 .838-.276l1.61-1.611c.47-.47 1.088-.705 1.704-.705.617 0 1.234.235 1.704.706l1.568 1.568c.23.23.556.338.877.289.322-.049.648.059.878.289.729.729.927 1.648.659 2.452z"/></svg>,
}

const tabs = ['curl', 'npm', 'brew'] as const
type Tab = typeof tabs[number]

export function Home() {
  const [tab, setTab] = useState<Tab>('curl')
  const [copied, setCopied] = useState(false)
  const [platform, setPlatform] = useState<Platform>('unknown')
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => { setPlatform(detectPlatform()) }, [])

  useEffect(() => {
    return () => { if (copiedTimer.current) clearTimeout(copiedTimer.current) }
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(commands[tab])
    setCopied(true)
    if (copiedTimer.current) clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>The AI coding agent<br />built for the terminal</h1>
          <p className="hero-sub">Local-first BYOK. Your API keys, your code, your control.</p>

          <div className="install-box" role="tablist">
            <div className="install-tabs">
              {tabs.map(t => (
                <button
                  key={t}
                  className={`tab ${tab === t ? 'active' : ''}`}
                  onClick={() => setTab(t)}
                  role="tab"
                  aria-selected={tab === t}
                  aria-controls={`panel-${t}`}
                >{t}</button>
              ))}
            </div>
            <div id={`panel-${tab}`} className="install-code" role="tabpanel">
              <code>{commands[tab]}</code>
              <button className="copy-btn" onClick={copy} aria-label="Copy command">
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                )}
              </button>
            </div>
          </div>

          <div className="hero-buttons">
            <button onClick={() => window.open(getDesktopDownloadUrl(platform), '_blank', 'noopener')} className="btn-hero btn-primary">{getDesktopLabel(platform)}</button>
            <a href="https://github.com/dalamcode/dalam" className="btn-hero btn-outline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-label">Features</p>
          <h2 className="section-title">Everything you need</h2>
          <p className="section-desc">A complete AI coding toolkit for your terminal, desktop, and editor.</p>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.id} className="feature">
                <div className="feature-icon">{featureIcons[f.icon]}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
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
            {['OpenAI', 'Anthropic', 'Google', 'Azure', 'AWS Bedrock', 'xAI', 'Groq', 'Mistral', 'Cohere', 'Together AI', 'DeepInfra', 'OpenRouter', 'Perplexity', 'Cerebras', 'GitHub Copilot', 'Cloudflare AI'].map(p => <span key={p} className="provider">{p}</span>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner text-center">
          <p className="section-label">How it works</p>
          <h2 className="section-title">See Dalam in action</h2>
          <p className="section-desc">Watch how Dalam helps you write code faster.</p>
          <Link to="/how-it-works" className="btn-hero btn-primary">See how it works</Link>
        </div>
      </section>
    </>
  )
}
