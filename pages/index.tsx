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

export default function Home({ file }) {
  const [, form] = useGithubJsonForm(file, {})

  useGithubToolbarPlugins()

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <InlineForm form={form}>
          <h1 className="title">
            <InlineTextareaField name="title" />
          </h1>

          <p className="description">
            <InlineTextareaField name="description" />
          </p>

          <InlineBlocks name="links" blocks={HOME_BLOCKS} className="grid" />
        </InlineForm>
        <Footer />
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      <GlobalStyles />
    </div>
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
