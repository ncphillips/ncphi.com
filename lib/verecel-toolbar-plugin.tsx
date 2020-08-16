import { useState, useEffect } from "react"
import { useCMS } from "tinacms"

export const VercelToolbarPlugin = {
  __type: "toolbar:widget",
  name: "Vercel Deployments",
  component() {
    const cms = useCMS()
    const [deployment, setDeployment] = useState<any | undefined>()
    const loadDeployment = () => {
      fetch(`/api/deployment?branch=${cms.api.github.branchName}`).then(
        (response) => {
          if (response.status === 200) {
            response.json().then(setDeployment)
          } else {
            setDeployment({ state: "Failed to load info" })
          }
        }
      )
    }
    useEffect(() => {
      loadDeployment()
    }, [])

    if (!deployment) {
      return <span>...</span>
    }
    if (deployment.state === "READY") {
      return (
        <>
          <a
            href={`https://${deployment.url}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            View Preview
          </a>
          <button onClick={loadDeployment}>Sync</button>
        </>
      )
    }
    if (deployment.state === "ERROR") {
      return (
        <span>
          Error creating preview
          <button onClick={loadDeployment}>Sync</button>
        </span>
      )
    }

    return (
      <span>
        Building Branch Preview <button onClick={loadDeployment}>Sync</button>
      </span>
    )
  },
}
