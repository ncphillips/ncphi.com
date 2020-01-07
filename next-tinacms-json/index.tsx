import { useCMS, useLocalForm, useWatchFormValues } from "tinacms";
import { useState, useEffect, useCallback } from "react";

export interface JsonFile<T = any> {
  fileRelativePath: string;
  data: T;
}

export function useLocalJsonForm<T = any>(jsonFile: JsonFile<T>) {
  const cms = useCMS();
  const valuesInGit = useJsonFromGit(jsonFile);

  const [values, form] = useLocalForm(
    {
      id: jsonFile.fileRelativePath,
      label: jsonFile.fileRelativePath,
      initialValues: valuesInGit,
      onSubmit() {
        return cms.api.git.commit({
          files: [jsonFile.fileRelativePath],
          message: `Commit from Tina: Update ${jsonFile.fileRelativePath}`
        });
      },
      fields: [{ name: "title", label: "Title", component: "text" }]
    },
    { values: jsonFile.data }
  );

  let writeToDisk = useCallback(formState => {
    cms.api.git.writeToDisk({
      fileRelativePath: jsonFile.fileRelativePath,
      content: JSON.stringify({ title: formState.values.title })
    });
  }, []);

  useWatchFormValues(form, writeToDisk);

  return [values, form];
}

function useJsonFromGit<T = any>(jsonFile: JsonFile<T>) {
  const cms = useCMS();

  const [valuesInGit, setValuesInGit] = useState<JsonFile<T>>();

  useEffect(() => {
    cms.api.git
      .show(jsonFile.fileRelativePath) // Load the contents of this file at HEAD
      .then((git: { content: string }) => {
        const jsonFileInGit = JSON.parse(git.content);

        setValuesInGit(jsonFileInGit);
      })
      .catch((e: any) => {
        console.log("FAILED", e);
      });
  }, [jsonFile.fileRelativePath]);

  return valuesInGit;
}
