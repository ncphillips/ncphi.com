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
} from 'next-tinacms-github';
import { EditLink } from '../components/EditLink';
import { InlineForm, InlineTextField } from 'react-tinacms-inline';

interface Props {
  home: any;
  sourceProvider: GithubOptions;
  editMode: boolean;
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
      initialStatus={props.editMode ? 'active' : 'inactive'}
    >
      <EditLink editMode={props.editMode} />
      <InlineTextField name='title' />
    </InlineForm>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const accessToken = previewData?.github_access_token;
  if (!accessToken) throw new Error();
  const sourceProvider = {
    forkFullName: 'ncphillips/ncphi.com',
    headBranch: previewData?.head_branch || 'master',
  };
  let previewError: GithubError = null;
  let homeData = {};
  if (preview) {
    try {
      homeData = await getJsonFile(
        '/src/content/home.json',
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
  } else {
    homeData = {
      fileRelativePath: 'src/content/home.json',
      data: (await import('../content/home.json')).default,
    };
  }

  return {
    props: {
      home: homeData,
      previewError: previewError,
      sourceProvider,
      editMode: !!preview,
    },
  };
};

interface Response {
  accessToken: string | null;
  sourceProviderConnection: SourceProviderConnection | null;
}

interface PreviewData {
  fork_full_name: string;
  head_branch: string;
  github_access_token: string;
}

export const getGithubDataFromPreviewProps = (
  previewData?: PreviewData
): Response => {
  if (!previewData) {
    return {
      sourceProviderConnection: null,
      accessToken: null,
    };
  }

  return {
    accessToken: previewData.github_access_token,
    sourceProviderConnection: {
      forkFullName: previewData.fork_full_name,
      headBranch: previewData.head_branch || 'master',
    },
  };
};
