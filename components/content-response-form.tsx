import { Form, FormGroup } from "react-bootstrap"

export function ContentResponseForm({ id }) {
  return (
    <Form action="https://formspree.io/xjvazjyj" method="POST">
      <h2>What do you think?</h2>
      <input
        style={{ display: "none" }}
        type="text"
        name="article"
        value={id}
      />
      <FormGroup>
        <label>Your email:</label>
        <input className="form-control" type="text" name="_replyto" />
      </FormGroup>
      <FormGroup>
        <label>Your message:</label>
        <textarea className="form-control" name="message"></textarea>
      </FormGroup>

      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </Form>
  )
}
