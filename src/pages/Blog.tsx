import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { posts } from 'virtual:content'
import { formatDate } from '../lib/date'

export default function Blog() {
  return (
    <>
      <Head>
        <title>Writing — Tien Dinh</title>
      </Head>

      <div className="page-head">
        <h1>Writing</h1>
        <p>Notes on the things I had to look up twice.</p>
      </div>

      {posts.length === 0 ? (
        <p className="empty">Nothing published yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id}>
              <article>
                {post.date && (
                  <p className="post-date">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </p>
                )}
                <h2>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
