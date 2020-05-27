import Link from "next/link"

export function Layout({ children }) {
  return (
    <>
      <header>
        <nav>
          <Link href="/">
            <h1>ncphi.dev</h1>
          </Link>
        </nav>
      </header>
      <section id="content">{children}</section>
      <style jsx>{`
        header {
          margin: 0 auto;
          max-width: 800px;
        }

        #content {
          margin: 0 auto;
          max-width: 800px;
        }

        header > nav > h1 {
          font-size: 1.2rem;
          cursor: pointer;
        }

        nav {
          display: flex;
          flex-direction: horizontal;
        }
      `}</style>
    </>
  )
}
