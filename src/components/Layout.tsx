import { TinacmsGithubProvider, authenticate } from 'react-tinacms-github';
import { FC } from 'react';

const enterEditMode = () =>
  fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname;
  });
const exitEditMode = () => {
  fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

interface Props {
  error: any;
}

export const Layout: FC<Props> = ({ children, error }) => {
  return (
    <TinacmsGithubProvider
      error={error}
      authenticate={() => authenticate('/api/create-github-access-token')}
      enterEditMode={enterEditMode}
      exitEditMode={exitEditMode}
    >
      {children}
    </TinacmsGithubProvider>
  );
};
