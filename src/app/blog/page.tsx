import { getAllPosts, createPostPreview } from '@/lib/markdown'
import Link from 'next/link'

export default async function Blog() {
  const posts = await getAllPosts()

  return (
    <div className="single_column">
      <article>
        <h1>Blog</h1>
        <p>Here are my blog posts on various computer science topics.</p>
        
        <div style={{ marginTop: '2rem' }}>
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <h2>
                  <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </h2>
                {post.date && (
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                <div dangerouslySetInnerHTML={{ 
                  __html: createPostPreview(post.content)
                }} />
                <Link href={`/posts/${post.id}`} style={{ color: '#0070f3', textDecoration: 'none' }}>
                  Read more →
                </Link>
              </div>
            ))
          )}
        </div>
      </article>
    </div>
  )
}