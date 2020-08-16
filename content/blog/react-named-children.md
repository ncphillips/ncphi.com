---
title: Separating Concerns with the 'Named Children' Pattern
category: react
author: Nolan Phillips
description: >-
  Props and children are different things, but when the a component takes
  multiple children things can get awkward. The Named Children pattern helps us
  deal with this.
createdAt: '2020-08-12'
---
React Components for wrapping content often use the `children` pattern. For example, this `<Card>` wraps the text "Hello World":

```tsx
<Card>Hello World</Card>
```

The size of the `<Card>` could be set with a prop:

```tsx
<Card size="large">Hello World</Card>
```

This pattern works if `<Card>` has just one content section but not if it has multiple. In that case the content might be provided by `props` instead of `children`:

```tsx
<Card
  size="large"
  title="Hello World"
  subtitle="This is a basic example"
  body="Here is where a lot more text would go."
/>
```

Unfortunately this makes unfamiliar components hard to understand since prop might configure the appearance of the `<Card>` or defines it's content. It also becomes messy when the content is not plain text:

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

The _Named Children_ pattern helps with the mixing of concerns. Instead of setting `children` as content it's set as an object that maps section names to content. This approach separates content from config making it easier to guess each prop's purpose.

```tsx
<Card size="large">
{{
  title: "Hello World"
  subtitle: <>This is a basic <strong>example</strong></>
  body: "Here is where a lot more text would go."
}}
</Card>
```

The `children` can then be used inside `<Card>` as any other object:

```tsx
function Card({ size = "medium", children }) {
  return (
    <div className={size}>
      <h2>{children.title}</h2>
      <h3>{children.subtitle}</h3>
      <p>{children.body</p>
    </div>
  )
}
```

The _Named Children_ pattern is a promising approach to [separating concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) in React Components making them easier to read and easier to change.