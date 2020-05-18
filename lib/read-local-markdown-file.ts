export const readLocalMarkdownFile = (filePath: string) => {
  const fs = require("fs")
  const path = require("path")
  const matter = require("gray-matter")
  const fileContent = fs.readFileSync(path.resolve("./", filePath))
  const { data: frontmatter, content: markdownBody } = matter(fileContent)
  return {
    fileRelativePath: filePath,
    data: {
      frontmatter,
      markdownBody,
    },
  }
}
