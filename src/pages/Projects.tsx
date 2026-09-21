import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { projects } from 'virtual:content'

export default function Projects() {
  const visible = projects.filter((project) => !project.hide)

  return (
    <>
      <Head>
        <title>Projects — Tien Dinh</title>
      </Head>

      <div className="page-head">
        <h1>Projects</h1>
        <p>Graphics, simulation, and machine learning, mostly from scratch.</p>
      </div>

      <ul className="cards">
        {visible.map((project) => {
          const external = project.redirect && project.permalink

          const body = (
            <>
              <div className="card-media">
                <img src={project.image} alt="" loading="lazy" />

                {/* Visual duplicate of .card-text, revealed on hover. */}
                <div className="card-reveal" aria-hidden="true">
                  <span className="card-title">{project.title}</span>
                  <p>{project.summary}</p>
                </div>
              </div>

              {/* The copy that carries the link's accessible name. Hidden from
                  sight wherever the overlay can be hovered. */}
              <div className="card-text">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.summary}</p>
              </div>
            </>
          )

          return (
            <li key={project.id} className="card">
              {external ? (
                <a href={project.permalink} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              ) : (
                <Link to={`/projects/${project.slug}`}>{body}</Link>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}
