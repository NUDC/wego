import { FAQ } from '../config'

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <h2 className="section-title">常见问题</h2>
        <div className="faq-list">
          {FAQ.map((item) => (
            <details className="card faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
