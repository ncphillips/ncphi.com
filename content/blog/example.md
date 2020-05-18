---
title: How to build a blog using TinaCMS & GitHub
---

### 1. Create a couple Markdown files in our blog.

I want to be able to edit content in markdown files.

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

### 2. Create a dynamic page:

**pages/blog/[slug].tsx**

```tsx
export default function BlogPostView() {
  return (
    <div>
      <h1>Title Goes Here</h1>
      <p>Body goes here</p>
    </div>
  )
}
```

Notice the odd pattern we used in the filename? `[slug].tsx`

This tells Next that every page under the `/blog/` route will use this component as a template. For example, all of these routes would work:

- `/blog/hello-world`
- `/blog/example-post`
- `/blog/announcing-my-blog`

Futher more, the part of the url after `/blog/` will be made available to us with a variable name: `slug`.

Later on we'll use that `slug` to look up a markdown file.

### 3. Add dummy static methods to the blog post view

In order for Next.js to work as a static site generator (SSG) we need to export two functions from the file: `getStaticPaths` and `getStaticProps`.

Open up `pages/blog/[slug].tsx` and add the following:

**pages/blog/[slug].tsx**

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [{ params: { slug: "example" } }],
  }
}

export async function getStaticProps(ctx) {
  return {
    props: {
      preview: false,
      repoFullName: "ncphillips/ncphi.com",
      branch: "master",
      file: DUMMY_FILE, // TODO: Load the real content
      error: null,
    },
  }
}

const DUMMY_FILE = {
  data: {
    frontmatter: {
      title: "Hello World",
    },
    markdownBody: "Nothing to see here.",
  },
}
```

The first function , `getStaticPaths` tells Next underneath `/blog/` are actually valid.

The second function `getStaticProps` provides some React props that will be used when creating the pages. Right now I've set these to some dummy values. This data structure matches the return of `getGithubPreviewProps`, a helper function we will be using from `react-tinacms-github`. The `DUMMY_FILE` is important. It shows the structure of the content we'll be working with in the component. More on this later.

Now Next knows what paths are valid, but because this function hardcodes only one path, navigating to [/blog/example](http://localhost:3000/blog/example) will work but [/blog/another](http://localhost:3000/blog/another) will show a 404.

Let's fix that!

### 4. Use `fast-glob` to get the real paths

To list all the posts, we need to discover them dynamically. We will use `fast-glob`, a library that returns a list of filenames for a given path. Then we'll use `path.basename` to grab strip the directory path and the extension from each file. This "basename" will be used as our slug.

```bash
yarn add fast-glob
```

**pages/blog/[slug].tsx**

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

### 5. Load Preview Content from GitHub

**pages/blog/[slug].tsx**

```diff
+ import { getGithubPreviewProps } from "react-tinacms-github"

export async function getStaticProps({ preview, previewData, params }) {
  const slug = params.slug as string

+ const fileRelativePath = `content/blog/${slug}.md`,
+ if (preview) {
+   return await getGithubPreviewProps({
+     ...previewData,
+     fileRelativePath,
+     parse: parseMarkdown,
+   })
+ }

  return {
    props: {
      preview: false,
      repoFullName: "ncphillips/ncphi.com",
      branch: "master",
      file: DUMMY_FILE,
      error: null,
    },
  }
}
```

Great! Now the content will be loaded from GitHub if you're in preview mode.

Let's use that data in the component. If

**pages/blog/[slug].tsx**

```tsx
const BlogPostView: NextPage<Props> = ({ file }) => {
  return (
    <div>
      <h1>{file.data.frontmatter.title} </h1>
      <p>{file.data.markdownBody}</p>
    </div>
  )
}

interface BlogFrontmatter {
  title: string
}

type BlogPost = MarkdownData<BlogFrontmatter>

type Props = GithubPreviewProps<BlogPost>["props"]
```

The `BlogPostView` is the most important part, but if you're all about type-safety look at the interfaces and types below.

Going to the page in preview mode will now show the content from GitHub.

But we skipped a step. We need to show the content when we're not in preview mode.

### 6. Loading Content From Disk

```bash
yarn add gray-matter
```

Now we can get rid of the `DUMMY_FILE` and actually read the local markdown file.

```diff
export async function getStaticProps({ preview, previewData, params }) {
  const slug = params.slug as string
  const fileRelativePath = `content/blog/${slug}.md`

  if (preview) {
    return await getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    })
  }

  return {
    props: {
      preview: false,
      repoFullName: "ncphillips/ncphi.com",
      branch: "master",
-      file: readLocalMarkdownFile(fileRelativePath),
+      file: DUMMY_FILE,
      error: null,
    },
  }
}

- const DUMMY_FILE = {
-   data: {
-     frontmatter: {
-       title: "Hello World",
-     },
-     markdownBody: "Nothing to see here.",
-   },
- }

+ const readLocalMarkdownFile = (filePath: string) => {
+   const fs = require("fs")
+   const path = require("path")
+   const matter = require("gray-matter")
+   const fileContent = fs.readFileSync(path.resolve("./", filePath))
+   const { data: frontmatter, content: markdownBody } = matter(fileContent)
+
+   return {
+     fileRelativePath: filePath,
+     data: {
+       frontmatter,
+       markdownBody,
+     },
+   }
+ }
```
