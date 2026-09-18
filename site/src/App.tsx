import Faq from './components/Faq'
import Features from './components/Features'
import Hero from './components/Hero'
import Install from './components/Install'
import Nav from './components/Nav'
import Versions from './components/Versions'
import { APP, REPO_URL } from './config'
import { useReleases } from './hooks/useReleases'
import { toLatestRelease } from './types'

export default function App() {
  // 整站只发一次请求，首屏和版本列表共用
  const state = useReleases()

  // 运行时数据最新；拿不到就用构建期内联的那一份
  const newest = state.releases.find((item) => !item.prerelease)
  const latest = newest ? toLatestRelease(newest) : __RELEASE__

  return (
    <div id="top">
      <Nav />
      <main>
        <Hero release={latest} loading={state.loading} />
        <Features />
        <Install />
        <Versions state={state} />
        <Faq />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © {APP.name} {APP.latinName}
          </span>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub 仓库
          </a>
        </div>
      </footer>
    </div>
  )
}
