import { Link } from 'react-router-dom'
import TypedLine from '../components/TypedLine'
import ThemeToggle from '../components/ThemeToggle'

const INTRO_LINES = [
  'Real-time graphics and simulation.',
  'Cloth, fluids, particles, volumetric clouds.',
  'Senior software engineer at DraftKings.',
]

export default function Home() {
  return (
    <div className="landing">
      <div className="landing-top">
        <ThemeToggle />
      </div>

      <div className="landing-main">
        <h1>Tien Dinh</h1>
        <TypedLine lines={INTRO_LINES} />
      </div>

      <nav className="landing-nav" aria-label="Main">
        <Link to="/projects">Projects</Link>
        <Link to="/blog">Writing</Link>
        <Link to="/about">About</Link>
        <a href="https://github.com/tienpdinh" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>
    </div>
  )
}
