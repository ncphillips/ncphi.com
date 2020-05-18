import { listMarkdownPosts } from "../../lib/list-local-markdown-posts"
import { GetStaticProps } from "next"
import Link from "next/link"

export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      {!posts.length && (
        <>
          <p>Not much here yet.</p>
          <p>Come back later :) </p>
        </>
      )}
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`}>
          <li>{post.title}</li>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async function ({ preview }) {
  if (preview) {
    // TODO: Load list of files from GitHub
  }

  const posts = await listMarkdownPosts()

  return {
    props: {
      posts: posts.map((post) => ({
        slug: post.slug,
        title: post.data.frontmatter.title,
      })),
    },
  }
}
