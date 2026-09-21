import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { posts } from 'virtual:content'
import Prose from '../components/Prose'
import NotFound from './NotFound'
import { formatDate } from '../lib/date'

export default function Post() {
  const { id } = useParams()
  const post = posts.find((candidate) => candidate.id === id)

  if (!post) return <NotFound />

  return (
    <>
      <Head>
        <title>{post.title} — Tien Dinh</title>
      </Head>

      <article className="reading">
        {post.date && (
          <p className="post-date">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        )}
        <Prose html={post.html} />
      </article>

      <p className="back">
        <Link to="/blog">All writing</Link>
      </p>
    </>
  )
}
