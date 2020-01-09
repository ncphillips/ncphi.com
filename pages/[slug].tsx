import * as React from "react";
import { inlineJsonForm } from "next-tinacms-json";
import { TinaField } from "tinacms";

const PlainText = ({ input }: any) => (
  <input style={{ background: "transparent" }} {...input} />
);

const InlineText = ({ name, children }: any) => (
  <TinaField name={name} Component={PlainText}>
    {children}
  </TinaField>
);

const Post = inlineJsonForm(({ data: post, setIsEditing, isEditing }) => (
  <>
    <h1>
      <InlineText name="title">{post.title}</InlineText>
    </h1>
    <button onClick={() => setIsEditing(!isEditing)}>
      {isEditing ? "Preview" : "Edit"}
    </button>
  </>
));

Post.getInitialProps = function(ctx) {
  const { slug } = ctx.query;

  let content = require(`../posts/${slug}.json`);

  return {
    jsonFile: {
      fileRelativePath: `/posts/${slug}.json`,
      data: {
        title: content.title
      }
    }
  };
};
export default Post;
