import { Link } from 'react-router-dom'

const features = [
  {
    category: 'Interfaces',
    items: [
      { title: 'CLI/TUI', description: 'Full-featured terminal interface with syntax highlighting, tool calling, and multi-file editing.' },
      { title: 'Desktop App', description: 'Electron app for macOS, Windows, and Linux with integrated terminal and file management.' },
      { title: 'VS Code Extension', description: 'Seamless editor integration. Run Dalam without leaving your IDE.' },
      { title: 'Web App', description: 'Browser-based UI for quick sessions and collaborative work.' },
    ],
  },
  {
    category: 'AI & Models',
    items: [
      { title: 'BYOK', description: 'Use your own API keys for OpenAI, Anthropic, Google, Azure, and 15+ providers.' },
      { title: 'Multi-Provider', description: 'Switch between providers instantly. Use the best model for each task.' },
      { title: 'Smart Completions', description: 'Context-aware suggestions that understand your project structure.' },
      { title: 'Model Selection', description: 'Choose the best model for each task. Fast models for edits, powerful for refactors.' },
    ],
  },
  {
    category: 'Development',
    items: [
      { title: 'Multi-File Editing', description: 'Edit multiple files simultaneously with intelligent context awareness.' },
      { title: 'Tool Calling', description: 'Run shell commands, read files, search code, and manage git through natural language.' },
      { title: 'Plugin System', description: 'Extend with custom tools, MCP servers, and community plugins.' },
      { title: 'Git Integration', description: 'Stage, commit, and manage branches directly from Dalam.' },
    ],
  },
  {
    category: 'Privacy',
    items: [
      { title: 'Local-First', description: 'Your code never leaves your machine unless you choose to send it to an AI provider.' },
      { title: 'No Auth', description: 'No accounts, no sign-ups, no tracking. Install and start coding immediately.' },
      { title: 'Open Source', description: 'Fully open source. Inspect the code, contribute, or self-host.' },
      { title: 'Your Data', description: 'No cloud storage, no analytics, no telemetry. Your projects remain private.' },
    ],
  },
]

export function Features() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="section-label">Features</p>
          <h1>Everything you need</h1>
          <p className="page-hero-sub">A complete AI coding toolkit for your terminal, desktop, and editor.</p>
        </div>
      </section>

      {features.map((group, gi) => (
        <section key={gi} className={`section ${gi % 2 === 1 ? 'section-alt' : ''}`}>
          <div className="section-inner">
            <p className="section-label">{group.category}</p>
            <div className="feature-cards">
              {group.items.map((f, fi) => (
                <div key={fi} className="feature-card">
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-desc">Install Dalam in 30 seconds.</p>
          <Link to="/install" className="btn-hero btn-primary">Install now</Link>
        </div>
      </section>
    </div>
  )
}
