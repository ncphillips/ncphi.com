import React from "react";
import App, { AppProps } from "next/app";
import { Tina, TinaCMS } from "tinacms";
import { GitClient } from "@tinacms/git-client";

export default class MyApp extends App {
  private cms: TinaCMS;

  constructor(props: AppProps) {
    super(props);
    this.cms = new TinaCMS();
    this.cms.registerApi("git", new GitClient("http://localhost:3000/___tina"));
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Tina cms={this.cms} position="displace">
        <Component {...pageProps} />
      </Tina>
    );
  }
}
