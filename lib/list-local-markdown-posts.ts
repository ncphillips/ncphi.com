import { readLocalMarkdownFile } from "./read-local-markdown-file"
import { GithubFile, MarkdownData } from "next-tinacms-github"

export async function listMarkdownPosts() {
  const path = require("path")
  const fg = require("fast-glob")
  const filePaths: string[] = await fg(`./content/blog/**/*.md`)

  let files = filePaths.map(readLocalMarkdownFile)

  if (process.env.NODE_ENV === "production") {
    files = filterBy.published(files)
  }

  return files.map((file) => ({
    ...file,
    slug: path.basename(file.fileRelativePath, ".md"),
  }))
}

const filterBy = {
  published(files: GithubFile<MarkdownData<any>>[]) {
    return files.filter((file) => {
      return !file.data.frontmatter.draft
    })
  },
}
