import { useState } from "react"

export function Nav({ siteTitle }) {
  const [navIsOpen, setNavIsOpen] = useState(false)

  return (
    <nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          <strong>{siteTitle}</strong>
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          Data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setNavIsOpen((p) => !p)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-collapse ${navIsOpen ? "" : "collapse"}`}
          id="navbarColor02"
        >
          <ul className="navbar-nav mr-auto d-flex align-items-center">
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="https://github.com/ncphillips">GitHub</NavLink>
            <NavLink href="https://www.instagram.com/ncphi/">Instagram</NavLink>
          </ul>
          <ul className="navbar-nav ml-auto d-flex align-items-center">
            <li className="nav-item highlight">
              <a
                className="nav-link"
                href="https://www.wowthemes.net/mundana-free-html-bootstrap-template/"
              >
                Get this Theme
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }) {
  return (
    <li className="nav-item">
      <a className="nav-link" href={href}>
        {children}
      </a>
    </li>
  )
}
