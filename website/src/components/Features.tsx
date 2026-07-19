const features = [
  { title: 'CLI/TUI', description: 'Full-featured terminal interface with syntax highlighting and multi-file editing.' },
  { title: 'Desktop App', description: 'Electron app for macOS, Windows, and Linux with integrated terminal.' },
  { title: 'VS Code', description: 'Seamless editor integration. Run Dalam without leaving your IDE.' },
  { title: 'Web App', description: 'Browser-based UI for quick sessions and collaborative work.' },
  { title: 'BYOK', description: 'Use your own API keys for OpenAI, Anthropic, Google, and 15+ providers.' },
  { title: 'Plugins', description: 'Extend with custom tools, MCP servers, and community plugins.' },
  { title: 'Local-First', description: 'Your code never leaves your machine. Full privacy and control.' },
  { title: 'Multi-File', description: 'Edit multiple files simultaneously with context awareness.' },
  { title: 'Smart Completions', description: 'Context-aware suggestions that understand your project.' },
]

export function Features() {
  return (
    <section id="features" className="section">
      <div className="section-inner">
        <p className="section-label">Features</p>
        <h2 className="section-title">Everything you need</h2>
        <p className="section-desc">A complete AI coding toolkit for your terminal, desktop, and editor.</p>
        
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature">
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
