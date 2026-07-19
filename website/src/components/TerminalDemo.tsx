import { useState, useEffect } from 'react'

const terminalLines = [
  { type: 'prompt', text: '$ dalam' },
  { type: 'output', text: '' },
  { type: 'output', text: '  AI coding agent loaded' },
  { type: 'output', text: '  Provider: anthropic (claude-sonnet-4-20250514)' },
  { type: 'output', text: '  Project: ~/my-project' },
  { type: 'output', text: '' },
  { type: 'input', text: '> refactor the auth module to use middleware pattern' },
  { type: 'output', text: '' },
  { type: 'thinking', text: 'Thinking...' },
  { type: 'output', text: '' },
  { type: 'success', text: '  Edited src/auth/middleware.ts' },
  { type: 'success', text: '  Edited src/auth/handler.ts' },
  { type: 'success', text: '  Edited src/routes/protected.ts' },
  { type: 'output', text: '' },
  { type: 'output', text: '  3 files edited, 47 insertions, 23 deletions' },
  { type: 'output', text: '' },
  { type: 'prompt', text: '$' },
]

export function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isTyping) return
    if (visibleLines >= terminalLines.length) return

    const line = terminalLines[visibleLines]
    if (!line) return

    if (currentChar < line.text.length) {
      const timer = setTimeout(() => {
        setCurrentChar(c => c + 1)
      }, line.type === 'thinking' ? 50 : 20)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1)
        setCurrentChar(0)
      }, line.text === '' ? 100 : line.type === 'thinking' ? 800 : 300)
      return () => clearTimeout(timer)
    }
  }, [visibleLines, currentChar, isTyping])

  return (
    <section className="terminal-section">
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
              <div key={i} className={`terminal-line ${line.type}`}>
                {line.text}
              </div>
            ))}
            {visibleLines < terminalLines.length && isTyping && (
              <div className={`terminal-line ${terminalLines[visibleLines]?.type}`}>
                {terminalLines[visibleLines]?.text.slice(0, currentChar)}
                <span className="cursor">|</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
