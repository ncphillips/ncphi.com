---
title: Separate Concerns with the React 'Named Children' Pattern
category: react
---

Components that wrap other content usually use the `children` pattern. For example, if we want to put a message inside of a `<Card>` we would do:

```tsx
<Card>Hello World</Card>
```

If we want to adjust how big the `<Card>` itself works then we could pass it extra props:

```tsx
<Card size="large">Hello World</Card>
```

This pattern works well if there's only the main body, but what if the `<Card>` has multiple sections?

Usually we might pass the content in as `props`.

```tsx
<Card
  size="large"
  title="Hello World"
  subtitle="This is a basic example"
  body="Here is where a lot more text would go."
/>
```

This is kinda awkward though because `props` is mixing two concerns:

- it configures of the `Card` itself
- it provides the inner-content of the `Card`

This looks especially weird if we wanted to wrap `example` in a `<strong>` tag:

```tsx
<Card
  size="large"
  title="Hello World"
  subtitle={
    <>
      This is a basic <strong>example</strong>
    </>
  }
  body="Here is where a lot more text would go."
/>
```

Luckily the _Named Children_ pattern is an approach that deals with that mixing of concerns!

```tsx
<Card size="large">
{{
  title: "Hello World"
  subtitle: <>This is a basic <strong>example</strong></>
  body: "Here is where a lot more text would go."
}}
</Card>
```

With this pattern the `Card` receives an object as `children` which maps the name of the section to it's content. The _Named Children_ pattern allows us to separate the config for the `Card` from the definition of it's children. This makes it easier to see what is configuration, and what is content to more quickly understand what's happening with this component.

Here's a quick example of what that `Card` component might look like:

```tsx
function Card({ size, children }) {
  return (
    <div className={size}>
      <h2>{children.title}</h2>
      <h3>{children.subtitle}</h3>
      <p>{children.body</p>
    </div>
  )
}
```
