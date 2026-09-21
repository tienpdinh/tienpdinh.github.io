import { Outlet } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Layout() {
  return (
    <>
      <Head>
        <title>Tien Dinh</title>
      </Head>

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
