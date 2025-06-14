import { getMarkdownContent } from '@/lib/markdown'
import path from 'path'

export default async function About() {
  const aboutData = await getMarkdownContent(path.join(process.cwd(), 'about.md'))

  return (
    <div className="single_column">
      <article>
        <div dangerouslySetInnerHTML={{ __html: aboutData.content }} />
      </article>
    </div>
  )
}