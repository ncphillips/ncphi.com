import Link from "next/link"
import Head from "next/head"
import { Nav } from "./nav"
import { Footer } from "./footer"

export function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} key="title" />
        <meta name="description" content={description} />
      </Head>
      <Nav siteTitle="ncphi.dev" />
      {children}
      <Footer />
    </>
  )
}
