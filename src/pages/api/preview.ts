import { createPreviewFn } from 'next-tinacms-github';

export default createPreviewFn(
  'fork_full_name',
  'head_branch',
  'github_access_token'
);
