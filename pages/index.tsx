import Head from "next/head"
import { GetStaticProps } from "next"
import { getGithubPreviewProps, parseJson } from "next-tinacms-github"
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github"
import {
  InlineForm,
  InlineBlocks,
  InlineTextareaField,
} from "react-tinacms-inline"
import { HOME_BLOCKS } from "../blocks/home"
import { GlobalStyles } from "../components/global-styles"
import { Footer } from "../components/footer"
import { Layout } from "../components/layout"
import { Row, Col, Jumbotron } from "react-bootstrap"

export default function Home({ file }) {
  const [post, form] = useGithubJsonForm(file, {})

  useGithubToolbarPlugins()

  return (
    <Layout title="ncphi.dev" description="">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={post.title} key="title" />
        <meta property="description" content={post.description} />
      </Head>
      <InlineForm form={form}>
        <div className="container pt-4 pb-4">
          <Row>
            <Col>
              <Jumbotron>
                <h1 className="display-6 secondfont">
                  <InlineTextareaField name="title" />
                </h1>
                <p className="lead">
                  <InlineTextareaField name="description" />
                </p>
                <hr className="my-4" />
                <InlineBlocks
                  name="links"
                  blocks={HOME_BLOCKS}
                  direction="horizontal"
                  className="row"
                />
              </Jumbotron>
            </Col>
          </Row>
        </div>
      </InlineForm>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
      },
    },
  }
}
