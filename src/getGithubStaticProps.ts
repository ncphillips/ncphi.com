import { GithubError, getMarkdownFile, getJsonFile } from 'next-tinacms-github';

export interface PreviewMeta {
  github_access_token: string;
  fork_full_name: string;
  head_branch: string;
  fileRelativePath: string;
  dataName?: string;
  format?: 'markdown' | 'json';
}

export async function getGithubStaticProps(
  preview: boolean,
  options: PreviewMeta
) {
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
