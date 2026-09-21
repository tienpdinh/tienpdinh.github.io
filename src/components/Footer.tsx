export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Tien Dinh</p>
      <p className="footer-links">
        <a href="mailto:tiendinhphuc@gmail.com">Email</a>
        <a href="/tiendinh.pdf">Résumé</a>
        <a href="https://github.com/tienpdinh" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  )
}
