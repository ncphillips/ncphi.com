import React from 'react';
import {
  useGithubErrorListener,
  useGithubJsonForm,
  GithubOptions,
} from 'react-tinacms-github';
import { GetStaticProps } from 'next';
import {
  getJsonFile,
  GithubError,
  SourceProviderConnection,
  getMarkdownFile,
} from 'next-tinacms-github';
import { EditLink } from '../components/EditLink';
import { InlineForm, InlineTextField } from 'react-tinacms-inline';
import { getGithubStaticProps } from '../getGithubStaticProps';

interface Props {
  home: any;
  sourceProvider: GithubOptions;
  preview: boolean;
}

export default function HomePage(props: Props) {
  const [values, form]: any = useGithubJsonForm(
    props.home,
    {
      fields: [{ name: 'title', component: 'text' }],
    },
    props.sourceProvider
  );

  useGithubErrorListener(form);

  return (
    <InlineForm
      form={form}
      initialStatus={props.preview ? 'active' : 'inactive'}
    >
      <EditLink editMode={props.preview} />
      <InlineTextField name='title' />
    </InlineForm>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubStaticProps(preview, {
      ...previewData,
      fork_full_name: 'ncphillips/ncphi.com',
      fileRelativePath: 'src/content/about.json',
      dataName: 'home',
    });
  }
  return {
    props: {
      previewError: null,
      editMode: false,
      home: {
        fileRelativePath: 'src/content/about.json',
        data: (await import('../content/about.json')).default,
      },
    },
  };
};
