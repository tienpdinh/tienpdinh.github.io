import { Link } from 'react-router-dom'
import { projects } from 'virtual:content'
import TypedLine from '../components/TypedLine'

const INTRO_LINES = [
  'Real-time graphics and simulation.',
  'Cloth, fluids, particles, volumetric clouds.',
  'Senior software engineer at DraftKings.',
]

export default function Home() {
  const visible = projects.filter((project) => !project.hide)

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Tien Dinh</h1>
          <TypedLine lines={INTRO_LINES} />
          <p className="hero-blurb">
            I studied computer science at the University of Minnesota, where most of my project work
            was real-time graphics and simulation, alongside deep learning research in the Applied
            Motion Lab. Everything below is something I built.
          </p>
        </div>

        <div className="hero-portrait">
          <img src="/avatar.jpg" alt="Tien Dinh" width={300} height={300} loading="eager" />
        </div>
      </section>

      <section className="work" aria-labelledby="work-heading">
        <h2 id="work-heading">Selected work</h2>

        <ul className="sheet">
          {visible.map((project) => {
            const external = project.redirect && project.permalink
            const label = <span className="sheet-title">{project.title}</span>

            return (
              <li key={project.id} className="sheet-item">
                {external ? (
                  <a href={project.permalink} target="_blank" rel="noopener noreferrer">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    {label}
                  </a>
                ) : (
                  <Link to={`/projects/${project.slug}`}>
                    <img src={project.image} alt={project.title} loading="lazy" />
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
