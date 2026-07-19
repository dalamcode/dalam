import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1>Something went wrong</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem' }}>{this.state.error?.message}</p>
          <button className="btn-hero btn-primary" onClick={() => window.location.reload()}>Reload page</button>
        </div>
      )
    }
    return this.props.children
  }
}
