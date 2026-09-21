import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Layout() {
  // The landing page carries its own name and links, so the site chrome would
  // only repeat itself there.
  const bare = useLocation().pathname === '/'

  return (
    <>
      <Head>
        <title>Tien Dinh</title>
      </Head>

      {bare ? (
        // The landing renders its own footer, inside the second snap panel.
        <main id="main" className="main-bare">
          <Outlet />
        </main>
      ) : (
        <>
          <a className="skip-link" href="#main">
            Skip to content
          </a>

          <Header />
          <main id="main">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
