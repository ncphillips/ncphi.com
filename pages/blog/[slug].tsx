import { GetStaticProps, NextPage, GetStaticPaths } from "next"
import {
  getGithubPreviewProps,
  GithubPreviewProps,
  parseMarkdown,
  MarkdownData,
} from "next-tinacms-github"
import { readLocalMarkdownFile } from "../../lib/read-local-markdown-file"

interface BlogFrontmatter {
  title: string
}

type BlogPost = MarkdownData<BlogFrontmatter>

type Props = GithubPreviewProps<BlogPost>["props"]

const BlogPostView: NextPage<Props> = ({ file }) => {
  return (
    <div>
      <h1>{file.data.frontmatter.title} </h1>
      <p>{file.data.markdownBody}</p>
    </div>
  )
}

export async function getStaticProps({ preview, previewData, params }) {
  const slug = params.slug as string
  const fileRelativePath = `content/blog/${slug}.md`

  if (preview) {
    return await getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    })
  }

  return {
    props: {
      preview: false,
      repoFullName: "ncphillips/ncphi.com",
      branch: "master",
      file: readLocalMarkdownFile(fileRelativePath),
      error: null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fg = require("fast-glob")
  const path = require("path")

  const files = await fg(`./content/blog/**/*.md`)

  return {
    fallback: false,
    paths: files.map((file: string) => ({
      params: { slug: path.basename(file, ".md") },
    })),
  }
}

export default BlogPostView
