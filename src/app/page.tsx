import { getVisibleProjects } from '@/lib/markdown'
import Footer from '@/components/Footer'
import TypedAnimation from '@/components/TypedAnimation'
import Link from 'next/link'

export default async function Home() {
  const projects = await getVisibleProjects()

  return (
    <>
      {/* Avatar section */}
      <div className="avatar_frontpage">
        {/* Text section, potential for type.js */}
        <div className="avatar_left">
          <h1>Tien Dinh</h1>
          <div id="typed-strings" style={{ display: 'none' }}>
            <p>Hello there!</p>
            <p>I&apos;m a college student.</p>
            <p>I&apos;m a software developer.</p>
            <p>I&apos;m a web developer.</p>
            <p>I&apos;m a machine learning enthusiast.</p>
            <p>Welcome to my website!</p>
          </div>
          <span id="typed"></span>
        </div>
        <div className="avatar_right">
          <img sizes="(max-width: 300px) 100vw, 300px" src="/avatar.jpg" alt="Tien Dinh" />
        </div>
      </div>

      {/* Project label */}
      <h2 className="grid_label">Projects</h2>

      {/* Project grid */}
      <div className="grid">
        <div className="gutter"></div>
        {projects.map((project) => (
          <div key={project.id} className="grid_item">
            {project.redirect ? (
              <a target="_blank" href={project.permalink} rel="noopener noreferrer">
                <img src={project.image} alt={project.title} />
              </a>
            ) : (
              <Link href={`/projects/${project.slug}`}>
                <img src={project.image} alt={project.title} />
              </Link>
            )}
            <p className="grid_item_label">
              {project.redirect ? (
                <a target="_blank" href={project.permalink} rel="noopener noreferrer">
                  {project.title}
                </a>
              ) : (
                <Link href={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              )}
            </p>
          </div>
        ))}
      </div>
      
      <TypedAnimation />
      <Footer masonry={true} />
    </>
  )
}