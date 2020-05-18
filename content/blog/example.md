---
title: How to build a blog using TinaCMS & GitHub
---

### 1. Create a dynamic page:

**pages/blog/[slug].tsx**

```tsx
interface Props {}

export default function BlogPostView(props: Props) {
  return (
    <div>
      <h1>Title Goes Here</h1>
      <p>Body goes here</p>
    </div>
  )
}
```

### 2. Create a couple Markdown files in our blog.

**content/blog/example.md**

```markdown
---
title: Example
---

This is an example post.
```

**content/blog/another.md**

```markdown
---
title: Another Post
---

Yet again, I wrote something!
```

### 3. Add dummy static methods to the blog post view

```tsx
interface StaticProps {
  slug: string
}

export const getStaticProps: GetStaticProps<StaticProps> = async (ctx) => {
  const slug = ctx.params.slug as string

  return {
    props: {
      slug,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [{ params: { slug: "example" } }],
  }
}
```

Because this function hardcodes only one path–the one for `content/blog/example.md`–navigating to `localhost:3000/blog/example` will work but `localhost:3000/blog/another` will show a 404.

### 4. Use `fast-glob` to get the real paths

To list all the posts, we need to discover them dynamically. To do this we will use `fast-glob`, a library that returns a list of filenames for a given path. Then, we'll use `path.basename` to grab strip the directory path and the extension from each file to create the slug.

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const fg = require("fast-glob")
  const path = require("path")

  const files = await fg(`./content/blog/*.md`)

  return {
    fallback: false,
    paths: files.map((file: string) => {
      return {
        params: {
          slug: path.basename(file, ".md"),
        },
      }
    }),
  }
}
```
