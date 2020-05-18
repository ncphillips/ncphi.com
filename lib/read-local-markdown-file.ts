import { MarkdownData, GithubFile } from "next-tinacms-github"

export function readLocalMarkdownFile<Frontmatter = any>(
  filePath: string
): GithubFile<MarkdownData<Frontmatter>> {
  const fs = require("fs")
  const path = require("path")
  const matter = require("gray-matter")
  const fileContent = fs.readFileSync(path.resolve("./", filePath))
  const { data: frontmatter, content: markdownBody } = matter(fileContent)
  return {
    sha: "",
    fileRelativePath: filePath,
    data: {
      frontmatter,
      markdownBody,
    },
  }
}
