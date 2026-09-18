import { INSTALL_STEPS } from '../config'

export default function Install() {
  return (
    <section className="section" id="install">
      <div className="container">
        <h2 className="section-title">安装步骤</h2>
        <ol className="steps">
          {INSTALL_STEPS.map((step, index) => (
            <li className="card step" key={step}>
              <span className="step-index">{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
