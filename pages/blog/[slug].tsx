import { NextPage, GetStaticPaths } from "next"
import {
  getGithubPreviewProps,
  GithubPreviewProps,
  parseMarkdown,
  MarkdownData,
} from "next-tinacms-github"
import ReactMarkdown from "react-markdown"
import { readLocalMarkdownFile } from "../../lib/read-local-markdown-file"
import { useGithubMarkdownForm } from "react-tinacms-github"
import {
  InlineWysiwyg,
  InlineForm,
  InlineTextareaField,
} from "react-tinacms-inline"
import { usePlugin } from "tinacms"

interface BlogFrontmatter {
  title: string
}

type BlogPost = MarkdownData<BlogFrontmatter>

type Props = GithubPreviewProps<BlogPost>["props"]

const BlogPostView: NextPage<Props> = ({ file, preview }) => {
  const [, form] = useGithubMarkdownForm(file)
  usePlugin(form)
  return (
    <InlineForm form={form} initialStatus={preview ? "active" : "inactive"}>
      <h1>
        <InlineTextareaField name="frontmatter.title" />
      </h1>
      <InlineWysiwyg name="markdownBody">
        <ReactMarkdown>{file.data.markdownBody}</ReactMarkdown>
      </InlineWysiwyg>
    </InlineForm>
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

  let files: string[] = await fg(`./content/blog/**/*.md`)

  if (process.env.NODE_ENV === "production") {
    files = filterBy.published(files)
  }

  return {
    fallback: false,
    paths: files.map((file) => ({
      params: { slug: path.basename(file, ".md") },
    })),
  }
}

const filterBy = {
  published(files: string[]): string[] {
    return files.filter((file) => {
      const {
        data: { frontmatter },
      } = readLocalMarkdownFile(file)

      return !frontmatter.draft
    })
  },
}

export default BlogPostView
