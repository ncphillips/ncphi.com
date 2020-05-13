import styled from "styled-components"
import {
  BlocksControls,
  BlockTextarea,
  Block,
  useInlineForm,
} from "react-tinacms-inline"

const Link = styled(({ index, data, className }) => {
  const { status } = useInlineForm()
  const url = status === "inactive" ? data.url : undefined
  return (
    <a href={url} className={className}>
      <BlocksControls index={index}>
        <h3>
          <BlockTextarea name="title" />
        </h3>
        <p>
          <BlockTextarea name="description" />
        </p>
      </BlocksControls>
    </a>
  )
})`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  :hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`

const link: Block = {
  template: {
    // TODO: This probably shouldn't be required?
    key: undefined,
    type: "link",
    label: "Link",
    fields: [
      {
        name: "url",
        label: "URL",
        component: "text",
      },
    ],
    defaultItem: {
      title: "Link",
      description: "Some descriptive text.",
      url: "http://example.com",
    },
  },
  Component: Link,
}

export const HOME_BLOCKS = {
  link,
}
