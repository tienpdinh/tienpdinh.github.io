import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { projects } from 'virtual:content'
import Prose from '../components/Prose'
import NotFound from './NotFound'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((candidate) => candidate.slug === slug)

  if (!project) return <NotFound />

  return (
    <>
      <Head>
        <title>{project.title} — Tien Dinh</title>
      </Head>

      <article className="reading">
        <Prose html={project.html} />
      </article>

      <p className="back">
        <Link to="/">All work</Link>
      </p>
    </>
  )
}
