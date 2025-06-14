import { getProjectBySlug, getAllProjects } from '@/lib/markdown'
import { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    id: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectBySlug(id)
  return {
    title: project.title,
    description: `Project: ${project.title}`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = await getProjectBySlug(id)

  return (
    <div className="single_column">
      <article>
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </article>
    </div>
  )
}