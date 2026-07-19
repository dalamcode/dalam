const stats = [
  { label: 'GitHub Stars', value: '2.5K+' },
  { label: 'Contributors', value: '50+' },
  { label: 'Providers', value: '16+' },
  { label: 'Platforms', value: '6' },
]

export function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        {stats.map((stat, i) => (
          <div key={i} className="stat">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
