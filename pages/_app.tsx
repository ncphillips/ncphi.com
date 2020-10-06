import "Mundana/assets/css/main.css"
import "Mundana/assets/css/vendor/aos.css"
import "Mundana/assets/css/vendor/bootstrap-toc.css"
import "Mundana/assets/css/vendor/prism.css"
import App from "next/app"
import { TinaCMS, TinaProvider } from "tinacms"
import { GithubClient, TinacmsGithubProvider } from "react-tinacms-github"
import { GoogleAnalytics } from "../lib/use-react-ga"
import { VercelToolbarPlugin } from "../lib/verecel-toolbar-plugin"

export default class Site extends App {
  cms: TinaCMS

  constructor(props) {
    super(props)
    const enabled = props.pageProps.preview
    this.cms = new TinaCMS({
      enabled,
      plugins: [VercelToolbarPlugin],
      apis: {
        github: new GithubClient({
          proxy: "/api/proxy-github",
          authCallbackRoute: "/api/create-github-access-token",
          clientId: process.env.GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.REPO_FULL_NAME,
        }),
      },
      toolbar: enabled,
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          onLogin={enterEditMode}
          onLogout={exitEditMode}
          error={pageProps.error}
        >
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Source+Sans+Pro:400,600,700"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
            crossOrigin="anonymous"
          />
          <script
            async
            defer
            data-domain="ncphi.dev"
            src="https://plausible.io/js/plausible.js"
          ></script>

          <GoogleAnalytics id="UA-86782303-1" />
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

const enterEditMode = async () => {
  const token = localStorage.getItem("tinacms-github-token") || null
  const headers = new Headers()

  if (token) {
    headers.append("Authorization", "Bearer " + token)
  }

  const response = await fetch(`/api/preview`, { headers })

  if (response.status === 200) {
    window.location.reload()
  } else {
    const data = await response.json()
    throw new Error(data.message)
  }
}
const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}
