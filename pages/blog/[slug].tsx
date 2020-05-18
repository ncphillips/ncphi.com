import { GetStaticProps, NextPage, GetStaticPaths } from "next"

interface Props {
  slug: string
}

const BlogPostView: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>{props.slug} </h1>
      <p>Body goes here</p>
    </div>
  )
}

interface StaticProps {
  slug: string
}

export const getStaticProps: GetStaticProps<StaticProps> = async (ctx) => {
  const slug = ctx.params.slug as string

  return {
    props: {
      slug,
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
