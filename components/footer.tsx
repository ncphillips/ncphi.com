export function Footer() {
  return (
    <div>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <b>TinaCMS</b> +
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer b {
          padding-left: 0.2rem;
          padding-right: 0.5rem;
        }

        .logo {
          height: 1em;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
