import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { projects } from 'virtual:content'

export default function Work() {
  const visible = projects.filter((project) => !project.hide)
  const [active, setActive] = useState(0)

  return (
    <>
      <Head>
        <title>Work — Tien Dinh</title>
      </Head>

      <div className="page-head page-head-wide">
        <h1>Work</h1>
        <p>Mostly things that had to draw a frame in under sixteen milliseconds.</p>
      </div>

      <div className="index">
        <ol className="index-list">
          {visible.map((project, i) => {
            const external = project.redirect && project.permalink
            const contents = (
              <>
                <img className="index-thumb" src={project.image} alt="" loading="lazy" />
                <span className="index-title">{project.title}</span>
              </>
            )

            return (
              <li
                key={project.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {external ? (
                  <a href={project.permalink} target="_blank" rel="noopener noreferrer">
                    {contents}
                  </a>
                ) : (
                  <Link to={`/projects/${project.slug}`}>{contents}</Link>
                )}
              </li>
            )
          })}
        </ol>

        {/*
         * Every cover is rendered and cross-faded by opacity so moving down the
         * list never waits on a network request.
         */}
        <div className="index-preview" aria-hidden="true">
          {visible.map((project, i) => (
            <img
              key={project.id}
              src={project.image}
              alt=""
              className={i === active ? 'is-active' : undefined}
            />
          ))}
        </div>
      </div>
    </>
  )
}
