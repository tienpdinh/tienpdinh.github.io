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

      <div className="page-head page-head-wide">
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
                <div className="card-reveal" aria-hidden="true">
                  <p>{project.summary}</p>
                </div>
              </div>
              <h2 className="card-title">{project.title}</h2>
              <p className="card-desc">{project.summary}</p>
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
