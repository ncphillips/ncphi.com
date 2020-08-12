import { EditLink } from "./edit-link"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="container mt-5">
      <footer className="bg-white border-top p-3 text-muted small">
        <div className="row align-items-center justify-content-between">
          <div>
            <span className="navbar-brand mr-2">
              <strong>ncphi.dev</strong>
            </span>{" "}
            Copyright &copy;
            {year} rights reserved.
          </div>
          <div>
            <EditLink />
          </div>
          <div>
            Powered by{" "}
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black" }}
            >
              <b style={{ paddingRight: "0.5rem" }}>TinaCMS</b>
            </a>{" "}
            +
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/vercel.svg"
                alt="Vercel Logo"
                className="logo"
                style={{
                  height: "0.9rem",
                  marginTop: "-0.25rem",
                  marginLeft: "0.5rem",
                }}
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
