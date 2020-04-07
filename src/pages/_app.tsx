import React from 'react';
import App, { AppProps } from 'next/app';
import { TinaProvider, TinaCMS } from 'tinacms';
import { GithubClient } from 'react-tinacms-github';
import { Layout } from '../components/Layout';

export default class MyApp extends App {
  private cms: TinaCMS;

  constructor(props: AppProps) {
    super(props);
    this.cms = new TinaCMS({
      apis: {
        github: new GithubClient(
          '/api/proxy-github',
          process.env.REPO_FULL_NAME
        ),
      },
      sidebar: { hidden: true },
      toolbar: { hidden: false },
    });
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <TinaProvider cms={this.cms}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TinaProvider>
    );
  }
}
