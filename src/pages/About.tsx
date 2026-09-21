import { Head } from 'vite-react-ssg'
import { about } from 'virtual:content'
import Prose from '../components/Prose'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Tien Dinh</title>
      </Head>

      <article className="reading">
        <Prose html={about} />
      </article>
    </>
  )
}
