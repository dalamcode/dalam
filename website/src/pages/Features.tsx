import { Link } from 'react-router-dom'

const featureIcons: Record<string, React.ReactNode> = {
  terminal: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  monitor: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  code: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  key: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  switch: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  zap: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  layers: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  file: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  tool: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/></svg>,
  git: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>,
  puzzle: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.706 2.404 2.404 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.404 2.404 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.73c.31-.31.404-.762.274-1.154-.268-.804-.066-1.724.662-2.452a2.5 2.5 0 0 1 3.606.036c.23.23.556.338.877.289a1.026 1.026 0 0 0 .838-.276l1.61-1.611c.47-.47 1.088-.705 1.704-.705.617 0 1.234.235 1.704.706l1.568 1.568c.23.23.556.338.877.289.322-.049.648.059.878.289.729.729.927 1.648.659 2.452z"/></svg>,
  shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  user: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  github: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  database: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
}

const features = [
  {
    category: 'Interfaces',
    items: [
      { id: 'cli-tui', title: 'CLI/TUI', description: 'Full-featured terminal interface with syntax highlighting, tool calling, and multi-file editing.', icon: 'terminal' },
      { id: 'desktop-app', title: 'Desktop App', description: 'Electron app for macOS, Windows, and Linux with integrated terminal and file management.', icon: 'monitor' },
      { id: 'vscode', title: 'VS Code Extension', description: 'Seamless editor integration. Run Dalam without leaving your IDE.', icon: 'code' },
      { id: 'web-app', title: 'Web App', description: 'Browser-based UI for quick sessions and collaborative work.', icon: 'globe' },
    ],
  },
  {
    category: 'AI & Models',
    items: [
      { id: 'byok', title: 'BYOK', description: 'Use your own API keys for OpenAI, Anthropic, Google, Azure, and 15+ providers.', icon: 'key' },
      { id: 'multi-provider', title: 'Multi-Provider', description: 'Switch between providers instantly. Use the best model for each task.', icon: 'switch' },
      { id: 'completions', title: 'Smart Completions', description: 'Context-aware suggestions that understand your project structure.', icon: 'zap' },
      { id: 'model-selection', title: 'Model Selection', description: 'Choose the best model for each task. Fast for edits, powerful for refactors.', icon: 'layers' },
    ],
  },
  {
    category: 'Development',
    items: [
      { id: 'multi-file', title: 'Multi-File Editing', description: 'Edit multiple files simultaneously with intelligent context awareness.', icon: 'file' },
      { id: 'tool-calling', title: 'Tool Calling', description: 'Run shell commands, read files, search code, and manage git through natural language.', icon: 'tool' },
      { id: 'plugins', title: 'Plugin System', description: 'Extend with custom tools, MCP servers, and community plugins.', icon: 'puzzle' },
      { id: 'git', title: 'Git Integration', description: 'Stage, commit, and manage branches directly from Dalam.', icon: 'git' },
    ],
  },
  {
    category: 'Privacy',
    items: [
      { id: 'local-first', title: 'Local-First', description: 'Your code never leaves your machine unless you choose to send it to an AI provider.', icon: 'shield' },
      { id: 'no-auth', title: 'No Auth', description: 'No accounts, no sign-ups, no tracking. Install and start coding immediately.', icon: 'user' },
      { id: 'open-source', title: 'Open Source', description: 'Fully open source. Inspect the code, contribute, or self-host.', icon: 'github' },
      { id: 'your-data', title: 'Your Data', description: 'No cloud storage, no analytics, no telemetry. Your projects remain private.', icon: 'database' },
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

      {features.map(group => (
        <section key={group.category} className={`section ${group.category === 'AI & Models' || group.category === 'Privacy' ? 'section-alt' : ''}`}>
          <div className="section-inner">
            <p className="section-label">{group.category}</p>
            <div className="feature-cards">
              {group.items.map(f => (
                <div key={f.id} className="feature-card">
                  <div className="feature-icon">{featureIcons[f.icon]}</div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="section-inner text-center">
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-desc">Install Dalam in 30 seconds and start coding with AI.</p>
          <Link to="/install" className="btn-hero btn-primary">Install now</Link>
        </div>
      </section>
    </div>
  )
}
