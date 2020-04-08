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
      fileRelativePath: 'src/content/home.json',
      dataName: 'home',
    });
  }
  return {
    props: {
      previewError: null,
      editMode: false,
      home: {
        fileRelativePath: 'src/content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  };
};

interface PreviewMeta {
  github_access_token: string;
  fork_full_name: string;
  head_branch: string;
  fileRelativePath: string;
  dataName?: string;
  format?: 'markdown' | 'json';
}
async function getGithubStaticProps(preview: boolean, options: PreviewMeta) {
  const accessToken = options?.github_access_token;
  const sourceProvider = {
    forkFullName: options?.fork_full_name,
    headBranch: options?.head_branch || 'master',
  };
  let previewError: GithubError = null;
  let data = {};

  try {
    const getParsedFile =
      options?.format === 'markdown' ? getMarkdownFile : getJsonFile;

    data = await getParsedFile(
      options.fileRelativePath,
      sourceProvider,
      accessToken
    );
  } catch (e) {
    if (e instanceof GithubError) {
      previewError = { ...e }; //workaround since we cant return error as JSON
    } else {
      throw e;
    }
  }

  return {
    props: {
      [options.dataName || 'data']: data,
      previewError: previewError,
      sourceProvider,
      preview,
    },
  };
}
