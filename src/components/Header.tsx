'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="site-title">
        <h1>
          <Link href="/"><u>tienpdinh.com</u></Link>
        </h1>
      </div>

      <div className="site-nav">
        <nav>
          <Link href="/"><u>Home</u></Link>
          <Link href="/blog"><u>Blog</u></Link>
          <Link href="/about"><u>About</u></Link>
          <a href="https://www.linkedin.com/in/tien-dinh/" target="_blank" rel="noopener noreferrer"><u>LinkedIn</u></a>
          <a href="https://github.com/tienpdinh" target="_blank" rel="noopener noreferrer"><u>Github</u></a>
        </nav>
      </div>
    </header>
  )
}