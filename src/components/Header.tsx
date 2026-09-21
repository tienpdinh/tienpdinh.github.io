import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/">
        Tien Dinh
      </Link>

      <nav className="site-nav" aria-label="Main">
        <NavLink to="/" end>
          Work
        </NavLink>
        <NavLink to="/blog">Writing</NavLink>
        <NavLink to="/about">About</NavLink>

        <span className="nav-divider" aria-hidden="true" />

        <a href="https://github.com/tienpdinh" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/tien-dinh/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>

        <ThemeToggle />
      </nav>
    </header>
  )
}
