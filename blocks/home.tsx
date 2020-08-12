import styled from "styled-components"
import { BlocksControls, InlineTextarea, Block } from "react-tinacms-inline"
import { useCMS } from "tinacms"
import { Card, Col } from "react-bootstrap"

const Link = ({ index, data }) => {
  const cms = useCMS()
  const url = !cms.enabled ? data.url : undefined
  return (
    <BlocksControls index={index}>
      <Col>
        <Card>
          <div className="card-body">
            <a href={url} className="text-dark">
              <h5 className="card-title">
                <InlineTextarea name="title" />
              </h5>
              <p className="card-text">
                <InlineTextarea name="description" />
              </p>
            </a>
          </div>
        </Card>
      </Col>
    </BlocksControls>
  )
}

const link: Block = {
  template: {
    // @ts-ignore
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
