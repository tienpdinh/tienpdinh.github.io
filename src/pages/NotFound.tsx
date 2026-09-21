import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found — Tien Dinh</title>
      </Head>

      <div className="page-head">
        <h1>Nothing here</h1>
        <p>
          That page moved or never existed. Try the <Link to="/projects">projects</Link> or the{' '}
          <Link to="/blog">writing</Link>.
        </p>
      </div>
    </>
  )
}
