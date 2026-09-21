import { Link } from 'react-router-dom'
import TypedLine from '../components/TypedLine'
import ThemeToggle from '../components/ThemeToggle'

const INTRO_LINES = [
  'Real-time graphics and simulation.',
  'Cloth, fluids, particles, volumetric clouds.',
  'Lead software engineer at DraftKings.',
]

export default function Home() {
  return (
    <>
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

      <section className="bio" aria-labelledby="bio-heading">
        <div className="bio-row">
          <h2 id="bio-heading" className="bio-label">
            Currently
          </h2>

          <div className="bio-prose">
            <p>I lead a team at DraftKings working on the user sessions management system.</p>
            <p>
              I studied computer science at the University of Minnesota, Twin Cities, and
              graduated in December 2020. Most of my project work there was real-time graphics
              and simulation — cloth solvers, fluid fields, particle systems, volumetric
              raymarching — alongside deep learning research in Dr. Stephen Guy&apos;s Applied
              Motion Lab, where we trained a model to tell legitimate smiles from voluntary ones
              in video.
            </p>
            <p>
              During college I also interned at Veritas as a DevOps developer, integrating
              Google&apos;s AddressSanitizer into the NetBackup build and test pipeline, where it
              is still used to catch memory bugs before they ship.
            </p>

            {/* Contact links live in the footer just below; no need to repeat them. */}
            <p className="bio-links">
              <Link to="/about">More about me</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
