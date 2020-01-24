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
      <Tina
        cms={this.cms}
        position="displace"
        hidden={process.env.NODE_ENV === "production"}
      >
        <Component {...pageProps} />
      </Tina>
    );
  }
}

// class NcphiDotCom extends App {
//   render() {
//     const { Component, pageProps } = this.props;
//     return <Component {...pageProps} />;
//   }
// }

// export default withTina(NcphiDo, {
//   cms: {
//     apis: {
//       git: new GitClient("http://localhost:3000/___tina")
//     }
//   },
//   sidebar: {
//     position: "displace",
//     hidden: process.env.NODE_ENV === "production"
//   }
// });
