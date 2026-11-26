import logoOnDark from '../assets/logo-on-dark.svg'
import logoOnLight from '../assets/logo-on-light.svg'
import { APP, REPO_URL } from '../config'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top">
          <img className="brand-mark brand-mark-dark" src={logoOnDark} alt="" aria-hidden="true" />
          <img className="brand-mark brand-mark-light" src={logoOnLight} alt="" aria-hidden="true" />
          {APP.name}
        </a>
        <div className="nav-links">
          <a href="#features">功能</a>
          <a href="#install">安装</a>
          <a href="#versions">版本</a>
          <a href="#faq">问答</a>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
