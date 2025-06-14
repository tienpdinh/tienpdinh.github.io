import { getPostData, getAllPosts } from '@/lib/markdown'
import { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getPostData(id)
  return {
    title: post.title,
    description: `Blog post: ${post.title}`,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = await getPostData(id)

  return (
    <div className="single_column">
      <article>
        {post.date && <p className="post-date" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}