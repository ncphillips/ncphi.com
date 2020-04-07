import React from 'react';
import App, { AppProps } from 'next/app';
import { TinaProvider, TinaCMS } from 'tinacms';
import { Layout } from '../components/Layout';

export default class MyApp extends App {
  private cms: TinaCMS;

  constructor(props: AppProps) {
    super(props);
    this.cms = new TinaCMS({
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
