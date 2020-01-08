import {
  useCMS,
  useWatchFormValues,
  useForm,
  usePlugins,
  GlobalFormPlugin,
  TinaForm,
  Form
} from "tinacms";
import { useState, useEffect, useCallback, useMemo, FC } from "react";
import { NextPage } from "next";

/**
 * A datastructure representing a JsonFile stored in Git
 */
export interface JsonFile<T = any> {
  fileRelativePath: string;
  data: T;
}

/**
 * Creates a TinaCMS Form for editing a JsonFile in Git
 */
export function useJsonForm<T = any>(jsonFile: JsonFile<T>) {
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

  const [values, form] = useForm(
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

  return [values || jsonFile.data, form];
}

/**
 * Registers a Local Form with TinaCMS for editing a Json File.
 */
export function useLocalJsonForm<T = any>(jsonFile: JsonFile<T>) {
  const [values, form] = useJsonForm(jsonFile);

  usePlugins(form);

  return [values, form];
}

/**
 * Registers a Global Form with TinaCMS for editing a Json File.
 */
export function useGlobalJsonForm(jsonFile: JsonFile) {
  const [values, form] = useJsonForm(jsonFile);
  const globalFormPlugin = useMemo(() => {
    if (form) {
      return new GlobalFormPlugin(form, null);
    }
  }, [form]);

  usePlugins(globalFormPlugin);

  return [values, form];
}

export interface InlineJsonFormProps {
  jsonFile: JsonFile;
  children(props: InlineJsonFormRenderProps): React.ReactElement;
}

export interface InlineJsonFormRenderProps {
  form: Form;
  data: any;
  isEditing: boolean;
  setIsEditing(value: boolean): void;
}

export const InlineJsonForm: FC<InlineJsonFormProps> = props => {
  const [data, form] = useLocalJsonForm(props.jsonFile);

  return (
    <TinaForm form={form}>
      {editingProps => {
        return props.children({
          ...editingProps,
          form,
          data
        });
      }}
    </TinaForm>
  );
};

/**
 * inlineJsonForm
 */
export function inlineJsonForm(
  Component: FC<InlineJsonFormRenderProps>
): NextPage<{ jsonFile: JsonFile }> {
  return props => {
    return (
      <InlineJsonForm jsonFile={props.jsonFile}>
        {inlineProps => {
          return <Component {...inlineProps} />;
        }}
      </InlineJsonForm>
    );
  };
}
