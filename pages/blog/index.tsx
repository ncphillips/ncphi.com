import { Row, Col, Badge } from "react-bootstrap"
import { listMarkdownPosts } from "../../lib/list-local-markdown-posts"
import { GetStaticProps } from "next"
import Link from "next/link"
import { Layout } from "../../components/layout"

export default function Blog({ posts }) {
  return (
    <Layout title="Blog" description="">
      <Row>
        <Col md="2" />
        <Col md="8">
          <h5 className="font-weight-bold spanborder">
            <span>All Posts</span>
          </h5>

          {!posts.length && (
            <>
              <p>Not much here yet.</p>
              <p>Come back later :) </p>
            </>
          )}
          {posts.map(({ slug, data: post }) => (
            <div className="mb-3 d-flex justify-content-between">
              <div className="pr-3">
                <h2 className="mb-1 h4 font-weight-bold">
                  <Link href={`/blog/${slug}`}>
                    <span className="text-dark">
                      {post.frontmatter.title || "Unnamed Post"}
                    </span>
                  </Link>
                </h2>
                <p>{post.description}</p>
                <div className="card-text text-muted small">
                  by {post.frontmatter.author || "Nolan Phillips"}{" "}
                  {post.frontmatter.category ? (
                    <Badge pill>{post.frontmatter.category}</Badge>
                  ) : null}
                </div>
              </div>
              {post.frontmatter.coverImage ? (
                <img height="120" src={post.frontmatter.coverImage} />
              ) : null}
            </div>
          ))}
        </Col>
      </Row>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async function ({ preview }) {
  if (preview) {
    // TODO: Load list of files from GitHub
  }

  const posts = await listMarkdownPosts()

  return {
    props: {
      posts,
    },
  }
}
