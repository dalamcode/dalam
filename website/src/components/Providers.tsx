const providers = [
  'OpenAI', 'Anthropic', 'Google', 'Azure', 'AWS Bedrock',
  'xAI', 'Groq', 'Mistral', 'Cohere', 'Together AI',
  'DeepInfra', 'OpenRouter', 'Perplexity', 'Cerebras',
  'GitHub Copilot', 'Cloudflare AI',
]

export function Providers() {
  return (
    <section className="section">
      <div className="section-inner">
        <p className="section-label">Providers</p>
        <h2 className="section-title">Works with any model</h2>
        <p className="section-desc">Use your own API keys with 16+ providers.</p>
        
        <div className="providers-row">
          {providers.map((p, i) => (
            <span key={i} className="provider">{p}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
