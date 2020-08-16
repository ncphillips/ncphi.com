export default async function builds(req, res) {
  const username = "ncphi"
  const sitename = "ncphicom"
  const branch = `branch`
  const url = `${sitename}-git-${branch}.${username}.now.sh`

  const id = "av9hh55e3"

  const idEndpoint = `https://api.vercel.com/v11/now/deployments/${id}`
  const urlEndpoint = `https://api.vercel.com/v11/now/deployments/get?url=${url}`
  const response = await fetch(idEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer <${process.env.VERCEL_AUTH_TOKEN}>`,
    },
  })
  const data = await response.text()
  res.json({
    status: response.status,
    data,
  })
}
