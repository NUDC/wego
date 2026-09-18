import { FEATURES } from '../config'

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <h2 className="section-title">为什么用它</h2>
        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <article className="card feature-card" key={feature.title}>
              <div className="feature-icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
