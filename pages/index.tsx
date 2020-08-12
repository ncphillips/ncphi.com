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

export default function Home({ file }) {
  const [post, form] = useGithubJsonForm(file, {})

  useGithubToolbarPlugins()

  if (true === true) {
    return (
      <Layout title="ncphi.dev" description="">
        <div className="container pt-4 pb-4">
          <div className="row">
            <div className="col-lg-6">
              <div className="card border-0 mb-4 box-shadow h-xl-300">
                <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                  <h2 className="h4 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Brain Stimulation Relieves Depression Symptoms
                    </a>
                  </h2>
                  <p className="card-text">
                    Researchers have found an effective target in the brain for
                    electrical stimulation to improve mood in people suffering
                    from depression.
                  </p>
                  <div>
                    <small className="d-block">
                      <a className="text-muted" href="./author.html">
                        Favid Rick
                      </a>
                    </small>
                    <small className="text-muted">
                      Dec 12 &middot; 5 min read
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="flex-md-row mb-4 box-shadow h-xl-300">
                <div className="mb-3 d-flex align-items-center">
                  <img height="80" src="./assets/img/demo/blog4.jpg" />
                  <div className="pl-3">
                    <h2 className="mb-2 h6 font-weight-bold">
                      <a className="text-dark" href="./article.html">
                        Nasa's IceSat space laser makes height maps of Earth
                      </a>
                    </h2>
                    <div className="card-text text-muted small">
                      Jake Bittle in LOVE/HATE
                    </div>
                    <small className="text-muted">
                      Dec 12 &middot; 5 min read
                    </small>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <img height="80" src="./assets/img/demo/blog5.jpg" />
                  <div className="pl-3">
                    <h2 className="mb-2 h6 font-weight-bold">
                      <a className="text-dark" href="./article.html">
                        Underwater museum brings hope to Lake Titicaca
                      </a>
                    </h2>
                    <div className="card-text text-muted small">
                      Jake Bittle in LOVE/HATE
                    </div>
                    <small className="text-muted">
                      Dec 12 &middot; 5 min read
                    </small>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <img height="80" src="./assets/img/demo/blog6.jpg" />
                  <div className="pl-3">
                    <h2 className="mb-2 h6 font-weight-bold">
                      <a className="text-dark" href="./article.html">
                        Sun-skimming probe starts calling home
                      </a>
                    </h2>
                    <div className="card-text text-muted small">
                      Jake Bittle in LOVE/HATE
                    </div>
                    <small className="text-muted">
                      Dec 12 &middot; 5 min read
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-8">
              <h5 className="font-weight-bold spanborder">
                <span>All Stories</span>
              </h5>
              <div className="mb-3 d-flex justify-content-between">
                <div className="pr-3">
                  <h2 className="mb-1 h4 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Nearly 200 Great Barrier Reef coral species also live in
                      the deep sea
                    </a>
                  </h2>
                  <p>
                    There are more coral species lurking in the deep ocean that
                    previously thought.
                  </p>
                  <div className="card-text text-muted small">
                    Jake Bittle in SCIENCE
                  </div>
                  <small className="text-muted">
                    Dec 12 &middot; 5 min read
                  </small>
                </div>
                <img height="120" src="./assets/img/demo/blog8.jpg" />
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="pr-3">
                  <h2 className="mb-1 h4 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      East Antarctica's glaciers are stirring
                    </a>
                  </h2>
                  <p>
                    Nasa says it has detected the first signs of significant
                    melting in a swathe of glaciers in East Antarctica.
                  </p>
                  <div className="card-text text-muted small">
                    Jake Bittle in SCIENCE
                  </div>
                  <small className="text-muted">
                    Dec 12 &middot; 5 min read
                  </small>
                </div>
                <img height="120" src="./assets/img/demo/1.jpg" />
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="pr-3">
                  <h2 className="mb-1 h4 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      50 years ago, armadillos hinted that DNA wasn’t destiny
                    </a>
                  </h2>
                  <p>
                    Nasa says it has detected the first signs of significant
                    melting in a swathe of glaciers in East Antarctica.
                  </p>
                  <div className="card-text text-muted small">
                    Jake Bittle in SCIENCE
                  </div>
                  <small className="text-muted">
                    Dec 12 &middot; 5 min read
                  </small>
                </div>
                <img height="120" src="./assets/img/demo/5.jpg" />
              </div>
            </div>
            <div className="col-md-4 pl-4">
              <h5 className="font-weight-bold spanborder">
                <span>Popular</span>
              </h5>
              <ol className="list-featured">
                <li>
                  <span>
                    <h6 className="font-weight-bold">
                      <a href="./article.html" className="text-dark">
                        Did Supernovae Kill Off Large Ocean Animals?
                      </a>
                    </h6>
                    <p className="text-muted">Jake Bittle in SCIENCE</p>
                  </span>
                </li>
                <li>
                  <span>
                    <h6 className="font-weight-bold">
                      <a href="./article.html" className="text-dark">
                        Humans Reversing Climate Clock: 50 Million Years
                      </a>
                    </h6>
                    <p className="text-muted">Jake Bittle in SCIENCE</p>
                  </span>
                </li>
                <li>
                  <span>
                    <h6 className="font-weight-bold">
                      <a href="./article.html" className="text-dark">
                        Unprecedented Views of the Birth of Planets
                      </a>
                    </h6>
                    <p className="text-muted">Jake Bittle in SCIENCE</p>
                  </span>
                </li>
                <li>
                  <span>
                    <h6 className="font-weight-bold">
                      <a href="./article.html" className="text-dark">
                        Effective New Target for Mood-Boosting Brain Stimulation
                        Found
                      </a>
                    </h6>
                    <p className="text-muted">Jake Bittle in SCIENCE</p>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <div className="container">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={post.title} key="title" />
        <meta property="description" content={post.description} />
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
