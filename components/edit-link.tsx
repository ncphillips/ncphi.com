import { useCMS } from "tinacms"

export interface EditLinkProps {}

export const EditLink = () => {
  const cms = useCMS()

  return (
    <div>
      <button onClick={cms.toggle}>
        {cms.enabled ? "Click to Exit" : "Click to Edit"}
      </button>
      <style jsx>{`
        button {
          border: none;
          background: white;
          color: inherit;
        }
      `}</style>
    </div>
  )
}
