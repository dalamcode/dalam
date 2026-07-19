import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const flowSteps = [
  { id: 'prompt', title: 'You type a prompt', desc: 'Describe what you want to build or change.' },
  { id: 'analyze', title: 'Dalam analyzes your code', desc: 'Reads your project structure and relevant files.' },
  { id: 'generate', title: 'AI generates changes', desc: 'The model suggests edits or new code.' },
  { id: 'review', title: 'You review & accept', desc: 'Preview changes, approve, or modify.' },
  { id: 'apply', title: 'Code is written', desc: 'Dalam applies the changes to your files.' },
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
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400)
    return () => { clearTimeout(t); timers.current.forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    if (!started || visibleLines >= terminalLines.length) return
    const line = terminalLines[visibleLines]
    if (!line || !line.text) {
      const t = setTimeout(() => {
        setVisibleLines(v => v + 1)
        setCurrentChar(0)
      }, 60)
      timers.current.push(t)
      return () => clearTimeout(t)
    }

    if (currentChar < line.text.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), line.type === 'thinking' ? 25 : 12)
      timers.current.push(t)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setVisibleLines(v => v + 1)
        setCurrentChar(0)
      }, line.type === 'thinking' ? 500 : 150)
      timers.current.push(t)
      return () => clearTimeout(t)
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
            {flowSteps.map(s => (
              <div key={s.id} className="flow-step">
                <div className="flow-icon">{s.id === 'prompt' ? 1 : s.id === 'analyze' ? 2 : s.id === 'generate' ? 3 : s.id === 'review' ? 4 : 5}</div>
                <div className="flow-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {s.id !== 'apply' && <div className="flow-line" />}
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
          
          <div className="terminal-wrapper">
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
                  <div key={`${i}-${line.type}`} className={`terminal-line ${line.type}`}>{line.text}</div>
                ))}
                {visibleLines < terminalLines.length && started && (
                  <div className={`terminal-line ${terminalLines[visibleLines]?.type}`}>
                    {terminalLines[visibleLines]?.text.slice(0, currentChar)}
                    <span className="cursor" aria-hidden="true">|</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner text-center">
          <h2 className="section-title">Ready to try it?</h2>
          <p className="section-desc">Install Dalam and start coding with AI in 30 seconds.</p>
          <div className="hero-buttons hero-buttons-center">
            <Link to="/install" className="btn-hero btn-primary">Install now</Link>
            <a href="https://github.com/dalamcode/dalam" className="btn-hero btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
        </div>
      </section>
    </div>
  )
}
