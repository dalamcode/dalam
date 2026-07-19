import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page">
      <section className="not-found">
        <h1>404</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-hero btn-primary">Go home</Link>
      </section>
    </div>
  )
}
