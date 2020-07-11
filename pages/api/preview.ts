import { previewHandler } from "next-tinacms-github"

const preview = previewHandler("hello-world")

export default (req, res) => {
  console.log(preview)
  return preview(req, res)
}
