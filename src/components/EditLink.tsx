import { useGithubEditing } from 'react-tinacms-github';

export const EditLink = ({ editMode }: any) => {
  const github = useGithubEditing();

  return (
    <button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
};
