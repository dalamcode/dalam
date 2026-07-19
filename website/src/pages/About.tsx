import { Link } from 'react-router-dom'

export function About() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="section-label">About</p>
          <h1>UTHAKKAN</h1>
          <p className="page-hero-sub">Building smart digital products for the future.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="about-content">
            <div className="about-text">
              <h2>What is UTHAKKAN?</h2>
              <p>
                UTHAKKAN is a technology product brand founded by Ajmal U K, focused on building 
                AI-powered tools, web platforms, mobile apps, games, and developer-focused solutions.
              </p>
              <p>
                The brand aims to create practical, scalable, and user-friendly digital products 
                that solve real-world problems.
              </p>
            </div>
            
            <div className="about-stats">
              <div className="about-stat">
                <h3>AI Tools</h3>
                <p>Powerful AI assistants for developers</p>
              </div>
              <div className="about-stat">
                <h3>Web Platforms</h3>
                <p>Modern web applications and tools</p>
              </div>
              <div className="about-stat">
                <h3>Mobile Apps</h3>
                <p>Native mobile experiences</p>
              </div>
              <div className="about-stat">
                <h3>Games</h3>
                <p>Fun and engaging browser games</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner text-center">
          <p className="section-label">Mission</p>
          <h2 className="section-title section-title-narrow">Building smart, useful, and accessible digital products</h2>
          <p className="section-desc">Using modern technologies, AI, and scalable software architecture.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner text-center">
          <p className="section-label">Founder</p>
          <h2 className="section-title">Ajmal U K</h2>
          <p className="section-desc">Full-stack Developer, AI Tool Builder, Product Builder</p>
          <div className="founder-links">
            <a href="https://ajmal.uthakkan.in" target="_blank" rel="noopener noreferrer" className="founder-link">Portfolio</a>
            <a href="https://github.com/ajmaluk" target="_blank" rel="noopener noreferrer" className="founder-link">GitHub</a>
            <a href="https://in.linkedin.com/in/ajmaluk" target="_blank" rel="noopener noreferrer" className="founder-link">LinkedIn</a>
            <a href="https://instagram.com/ajmaluk.me" target="_blank" rel="noopener noreferrer" className="founder-link">Instagram</a>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <p className="section-label">Products</p>
          <h2 className="section-title">Under UTHAKKAN</h2>
          <div className="products-grid">
            <div className="product">
              <h3>Dalam</h3>
              <p>AI coding agent for the terminal</p>
            </div>
            <div className="product">
              <h3>ToolPix</h3>
              <p>AI and productivity web platform</p>
            </div>
            <div className="product">
              <h3>KallanCop</h3>
              <p>Local multiplayer social deduction game</p>
            </div>
            <div className="product">
              <h3>ZyRace</h3>
              <p>Web-based racing game</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner text-center">
          <h2 className="section-title">Learn more about Dalam</h2>
          <p className="section-desc">See what Dalam can do for your development workflow.</p>
          <div className="hero-buttons hero-buttons-center">
            <Link to="/features" className="btn-hero btn-primary">View features</Link>
            <Link to="/install" className="btn-hero btn-outline">Install now</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
