import { NextPageContext } from "next";
import * as React from "react";
import { JsonFile, useLocalJsonForm } from "../next-tinacms-json";

type JsonPost = JsonFile<{ title: string }>;

export default function Page(props: JsonPost) {
  const [jsonFile] = useLocalJsonForm(props);

  return (
    <>
      <h1>{jsonFile?.title}</h1>
    </>
  );
}

Page.getInitialProps = function(ctx: NextPageContext): JsonPost {
  const { slug } = ctx.query;
  let content = require(`../posts/${slug}.json`);

  return {
    fileRelativePath: `/posts/${slug}.json`,
    data: {
      title: content.title
    }
  };
};
