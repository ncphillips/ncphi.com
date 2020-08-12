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
  InlineForm,
  InlineTextareaField,
  InlineGroup,
} from "react-tinacms-inline"
import { usePlugin } from "tinacms"
import { listMarkdownPosts } from "../../lib/list-local-markdown-posts"
import { Layout } from "../../components/layout"
import { InlineWysiwyg } from "../../components/inline-editor"

interface BlogFrontmatter {
  title: string
}

type BlogPost = MarkdownData<BlogFrontmatter>

type Props = GithubPreviewProps<BlogPost>["props"]

const BlogPostView: NextPage<Props> = ({ file }) => {
  const [post, form] = useGithubMarkdownForm(file)
  usePlugin(form)
  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.description}
    >
      <InlineForm form={form}>
        <div className="container">
          <div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
            <InlineGroup
              name="frontmatter"
              fields={[
                { name: "title", component: "text" },
                { name: "description", component: "textarea" },
                { name: "category", component: "text" },
              ]}
            >
              <div className="h-100 tofront">
                <div className="row justify-content-center">
                  <div className="col-md-2 pt-2 pb-2 pr-2 align-self-center" />
                  <div className="col-md-10 pt-10 pb-10 pr-10 align-self-center">
                    <p className="text-uppercase font-weight-bold">
                      <div className="text-danger">
                        {form.values.frontmatter.category}
                      </div>
                    </p>
                    <h1 className="display-4 secondfont mb-3 font-weight-bold">
                      <InlineTextareaField name="title" />
                    </h1>
                    <p className="mb-3">{}</p>
                    <div className="d-flex align-items-center">
                      {/* <img
                      className="rounded-circle"
                      src="assets/img/demo/avatar2.jpg"
                      width="70"
                    /> */}
                      <small className="ml-2">
                        by {"Nolan Phillips"}
                        {/* <InlineTextareaField name="frontmatter.author" /> */}
                        <span className="text-muted d-block">
                          A few hours ago &middot; 5 min. read
                        </span>
                      </small>
                    </div>
                  </div>
                  {/* <div className="col-md-6 pr-0">
                  <img src="./assets/img/demo/intro.jpg" />
                </div> */}
                </div>
              </div>
            </InlineGroup>
          </div>
        </div>
        <div className="container pt-4 pb-4">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-8">
              <article className="article-post">
                <InlineWysiwyg name="markdownBody">
                  <ReactMarkdown>{file.data.markdownBody}</ReactMarkdown>
                </InlineWysiwyg>
              </article>
            </div>
          </div>
        </div>
      </InlineForm>
    </Layout>
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
  const posts = await listMarkdownPosts()

  return {
    fallback: false,
    paths: posts.map((file) => ({
      params: { slug: file.slug },
    })),
  }
}

export default BlogPostView
