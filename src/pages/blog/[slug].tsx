import * as React from "react";
import ReactMarkdown from "react-markdown";
import { NextPage } from "next";
import { MarkdownFile, useLocalMarkdownForm } from "next-tinacms-markdown";
import {
  InlineForm,
  InlineTextField,
  InlineField,
  useInlineForm
} from "react-tinacms-inline";
import grayMatter from "gray-matter";
import { Wysiwyg } from "tinacms";

const Post: NextPage<{ post: MarkdownFile }> = props => {
  const [post, form] = useLocalMarkdownForm(props.post, {
    fields: [
      { name: "frontmatter.title", component: "text" },
      { name: "markdownBody", component: "markdown" }
    ]
  });

  if (!form) return null;

  return (
    <InlineForm form={form}>
      <article>
        <header>
          <EditToggle />
          <SaveButton />
          <ResetButton />
          <h1>
            <InlineTextField name="frontmatter.title" />
          </h1>
        </header>
        <InlineField name="markdownBody">
          {({ input, meta, status }) => {
            if (status === "active") {
              return <Wysiwyg input={input} meta={meta} />;
            }

            return <ReactMarkdown>{input.value}</ReactMarkdown>;
          }}
        </InlineField>
      </article>
    </InlineForm>
  );
};

Post.getInitialProps = async function(ctx) {
  const { slug } = ctx.query;
  const rawContent = await import(`../../content/blog/${slug}.md`);
  const { data: frontmatter = {}, content: markdownBody } = grayMatter(
    rawContent.default
  );

  return {
    post: {
      fileRelativePath: `src/content/blog/${slug}.md`,
      frontmatter,
      markdownBody
    }
  };
};

export default Post;

function EditToggle() {
  const { status, activate, deactivate } = useInlineForm();
  const editing = status === "active";
  return (
    <button
      onClick={() => {
        if (editing) deactivate();
        else activate();
      }}
    >
      {editing ? "Preview" : "Edit"}
    </button>
  );
}

function SaveButton() {
  const { status, form } = useInlineForm();
  const editing = status === "active";
  if (!editing) return null;
  return (
    <button
      onClick={() => {
        form.finalForm.submit();
      }}
    >
      Save
    </button>
  );
}

function ResetButton() {
  const { status, form } = useInlineForm();
  const editing = status === "active";
  if (!editing) return null;
  return (
    <button
      onClick={() => {
        form.reset();
      }}
    >
      Reset
    </button>
  );
}
