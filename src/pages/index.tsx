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

  console.log(values);

  useGithubErrorListener(form);

  return (
    <div>
      <EditLink editMode={props.editMode} />
      Hello World
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const accessToken = previewData?.github_access_token || 'DEFAULT';
  const sourceProviderConnection = {
    forkFullName:
      previewData?.fork_full_name || 'https://github.com/ncphillips/ncphi.com',
    headBranch: previewData?.head_branch || 'master',
  };
  let previewError: GithubError = null;
  let homeData = {};
  try {
    homeData = await getJsonFile(
      'src/content/home.json',
      sourceProviderConnection,
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
      home: homeData,
      previewError: previewError,
      sourceProviderConnection,
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
