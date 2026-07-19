const methods = [
  { name: 'curl', platform: 'Any platform', command: 'curl -fsSL https://dalam.uthakkan.in/install | bash' },
  { name: 'Homebrew', platform: 'macOS & Linux', command: 'brew install dalamcode/tap/dalam' },
  { name: 'npm', platform: 'Node.js', command: 'npm install -g @uthakkan/dalam' },
  { name: 'Desktop', platform: 'macOS, Windows, Linux', link: 'https://github.com/dalamcode/dalam/releases' },
]

export function Install() {
  return (
    <section id="install" className="section section-alt">
      <div className="section-inner">
        <p className="section-label">Install</p>
        <h2 className="section-title">Get started in 30 seconds</h2>
        <p className="section-desc">Choose your preferred method.</p>
        
        <div className="methods-grid">
          {methods.map((m, i) => (
            <div key={i} className="method">
              <h3>{m.name}</h3>
              <p>{m.platform}</p>
              {m.command ? (
                <code>{m.command}</code>
              ) : (
                <a href={m.link} className="btn-hero btn-primary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }} target="_blank" rel="noopener">Download</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
