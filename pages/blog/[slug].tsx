import { GetStaticProps, NextPage, GetStaticPaths } from "next"
import {
  getGithubPreviewProps,
  GithubPreviewProps,
  parseMarkdown,
  MarkdownData,
} from "next-tinacms-github"

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

const DUMMY_FILE = {
  data: {
    frontmatter: {
      title: "Hello World",
    },
    markdownBody: "Nothing to see here.",
  },
}

export async function getStaticProps({ preview, previewData, params }) {
  const slug = params.slug as string

  if (preview) {
    return await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: `content/blog/${slug}.md`,
      parse: parseMarkdown,
    })
  }

  return {
    props: {
      preview: false,
      repoFullName: "ncphillips/ncphi.com",
      branch: "master",
      file: DUMMY_FILE, // TODO: Load real content.
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
