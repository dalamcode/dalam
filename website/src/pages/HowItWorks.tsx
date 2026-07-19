import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const flowSteps = [
  { title: 'You type a prompt', desc: 'Describe what you want to build or change.' },
  { title: 'Dalam analyzes your code', desc: 'Reads your project structure and relevant files.' },
  { title: 'AI generates changes', desc: 'The model suggests edits or new code.' },
  { title: 'You review & accept', desc: 'Preview changes, approve, or modify.' },
  { title: 'Code is written', desc: 'Dalam applies the changes to your files.' },
]

const terminalLines = [
  { type: 'prompt', text: '$ dalam' },
  { type: 'output', text: '' },
  { type: 'output', text: '  AI coding agent' },
  { type: 'output', text: '  Provider: anthropic (claude-sonnet-4-20250514)' },
  { type: 'output', text: '  Project: ~/my-app' },
  { type: 'output', text: '' },
  { type: 'input', text: '> add dark mode toggle to settings page' },
  { type: 'output', text: '' },
  { type: 'thinking', text: '  Analyzing codebase...' },
  { type: 'output', text: '  Found: src/components/Settings.tsx' },
  { type: 'output', text: '  Found: src/context/ThemeContext.tsx' },
  { type: 'output', text: '' },
  { type: 'thinking', text: '  Generating changes...' },
  { type: 'output', text: '' },
  { type: 'success', text: '  Edited src/components/Settings.tsx' },
  { type: 'success', text: '  Created src/components/ThemeToggle.tsx' },
  { type: 'output', text: '' },
  { type: 'output', text: '  2 files changed, 47 insertions(+), 3 deletions(-)' },
  { type: 'output', text: '' },
  { type: 'prompt', text: '$' },
]

export function HowItWorks() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started || visibleLines >= terminalLines.length) return
    const line = terminalLines[visibleLines]
    if (!line) return

    if (currentChar < line.text.length) {
      const timer = setTimeout(() => setCurrentChar(c => c + 1), line.type === 'thinking' ? 25 : 12)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1)
        setCurrentChar(0)
      }, line.text === '' ? 60 : line.type === 'thinking' ? 500 : 150)
      return () => clearTimeout(timer)
    }
  }, [visibleLines, currentChar, started])

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="section-label">How it works</p>
          <h1>See Dalam in action</h1>
          <p className="page-hero-sub">Watch how Dalam helps you write code faster.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="flow-grid">
            {flowSteps.map((s, i) => (
              <div key={i} className="flow-step">
                <div className="flow-icon">{i + 1}</div>
                <div className="flow-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {i < flowSteps.length - 1 && <div className="flow-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <p className="section-label">Demo</p>
          <h2 className="section-title">Try it yourself</h2>
          <p className="section-desc">Here's what a typical session looks like.</p>
          
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="terminal-title">dalam</span>
            </div>
            <div className="terminal-body">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={`terminal-line ${line.type}`}>{line.text}</div>
              ))}
              {visibleLines < terminalLines.length && started && (
                <div className={`terminal-line ${terminalLines[visibleLines]?.type}`}>
                  {terminalLines[visibleLines]?.text.slice(0, currentChar)}
                  <span className="cursor">|</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to try it?</h2>
          <p className="section-desc">Install Dalam and start coding with AI in 30 seconds.</p>
          <div className="hero-buttons" style={{ justifyContent: 'center' }}>
            <Link to="/install" className="btn-hero btn-primary">Install now</Link>
            <a href="https://github.com/dalamcode/dalam" className="btn-hero btn-outline" target="_blank" rel="noopener">View on GitHub</a>
          </div>
        </div>
      </section>
    </div>
  )
}
