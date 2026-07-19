import { useState } from 'react'

const faqs = [
  { q: 'What is Dalam?', a: 'Dalam is a local-first AI coding agent that runs in your terminal, desktop app, or IDE.' },
  { q: 'Do I need extra AI subscriptions?', a: 'No. Dalam uses your own API keys (BYOK). You pay only for what you use.' },
  { q: 'Can I use my existing subscriptions?', a: 'Yes. Dalam supports OpenAI, Anthropic, Google, Azure, and 15+ other providers.' },
  { q: 'How much does it cost?', a: 'Dalam is free and open source. You only pay for the AI models you use.' },
  { q: 'Is my code private?', a: 'Yes. Dalam is local-first. Your code never leaves your machine.' },
  { q: 'What platforms are supported?', a: 'macOS, Windows, and Linux. Available as CLI, desktop app, and VS Code extension.' },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section section-alt">
      <div className="section-inner">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Questions & Answers</h2>
        <p className="section-desc">Everything you need to know.</p>
        
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {open === i && <div className="faq-answer"><p>{f.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
