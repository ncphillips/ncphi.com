import App from "next/app"
import { TinaCMS, TinaProvider, useCMS } from "tinacms"
import { GithubClient, TinacmsGithubProvider } from "react-tinacms-github"

export default class Site extends App {
  cms: TinaCMS

  constructor(props) {
    super(props)
    console.log(props.pageProps)
    const enabled = props.pageProps.preview
    /**
     * 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      enabled,
      apis: {
        github: new GithubClient({
          proxy: "/api/proxy-github",
          authCallbackRoute: "/api/create-github-access-token",
          clientId: process.env.GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
          authScope: "repo",
        }),
      },
      toolbar: enabled,
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      /**
       * 4. Wrap the page Component with the Tina and Github providers
       */
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          onLogin={enterEditMode}
          onLogout={exitEditMode}
          error={pageProps.error}
        >
          {/**
           * 5. Add a button for entering Preview/Edit Mode
           */}
          <EditLink editMode={pageProps.preview} />
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

export interface EditLinkProps {
  editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const cms = useCMS()

  return (
    <div className="edit-wrap">
      <button onClick={() => (editMode ? cms.disable() : cms.enable())}>
        {editMode ? "Click to Exit" : "Click to Edit"}
      </button>
      <style jsx>{`
        .edit-wrap {
          position: absolute;
          top: 5rem;
          right: 2rem;
        }
        button {
          border: none;
          background: white;
          color: inherit;
        }
      `}</style>
    </div>
  )
}
