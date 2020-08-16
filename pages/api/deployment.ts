import { NextApiRequest, NextApiResponse } from "next"

export default async function deployment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [org, repo] = process.env.REPO_FULL_NAME.split("/")
  const branch = (req.query.branch || process.env.BASE_BRANCH) as string

  const deployments = await listDeployments(org, repo, branch)

  const latest = deployments[0]

  if (latest) {
    res.json(latest)
  } else {
    res.status(404).json({ error: "Cannot find deployment." })
  }
}

async function listDeployments(org: string, repo: string, branch: string) {
  const listDeployments =
    `https://api.vercel.com/v5/now/deployments?` +
    [
      `meta-githubOrg=${org}`,
      `meta-githubRepo=${repo}`,
      `meta-githubCommitRef=${branch}`,
    ].join("&")

  const response = await fetch(listDeployments, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEPLOYMENT_AUTH_TOKEN}`,
    },
  })

  const data = await response.json()

  return data.deployments
}
