import { listMarkdownPosts } from "../../lib/list-local-markdown-posts"

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
        <a href={`/blog/${post.slug}`}>
          <li>{post.title}</li>
        </a>
      ))}
    </div>
  )
}

export async function getStaticProps() {
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
