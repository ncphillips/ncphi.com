---
title: Create a TinaCMS Media Store for Next.js
category: tinacms
author: Nolan Phillips
description: >-
  Working with Media in TinaCMS can be laborious. There's a lot of configuration needed to make your image fields work correctly, and it often has to be duplicated across multiple fields. Luckily, when using Next.js and GitHub we can take care of this problem by subclassing the `GithubMediaStore`.
createdAt: "2020-08-16"
---

Working with Media in [TinaCMS](https://github.com/tinacms/tinacms) can be laborious. There's a lot of configuration needed to make your image fields work correctly, and it often has to be duplicated across multiple fields. Luckily, when using [Next.js and Github](https://tinacms.org/guides/nextjs/github/initial-setup/) we can take care of this problem by subclassing the `GithubMediaStore`.

_(Note: the code in this blog post is borderline pseudocode)_

## The Blog Post

Below is a [form definition](https://tinacms.org/docs/plugins/forms/) for a Next.js blog post component. It has just a text field and a [image field](https://tinacms.org/docs/plugins/fields/image/)

```tsx
function BlogPost({ file }) {
	const cms = useCMS()

	useGithubMarkdownForm(file, {
		fields: [
			{
				name: "title",
				component: "text",
			},
			{
				name: "coverPhoto",
				component: "image",
				uploadDir: () => "public/images",
				parse: (media) => media.path.replace('public/', ''),
				previewSrc: (path) => cms.media.previewSrc(`public/${path}`),
			}
		]
	})

	return (
	  // ...
	)
}
```

The `title` field is quite simple, but the `coverPhoto` has three extra functions that do work specific to Next.js and that can't be generalized to the `GithubMediaStore`. Here's what each of them do:

- `uploadDir` tells the media store where in the repository the file should be saved. In the case of Next.js we store assets in `public` to make the available.
- When an image is uploaded what we get back is a `Media` object, but that's not usually the object we want to save. The `parse` function is used to covert the `Media` object into the string that gets stored in frontmatter. With Next.js the file's path in the `public` directory will match it's path on the website, so return the path without the `public` prefix.
- When it comes to previewing changes we need to take the opposite approach. When running Next.js + TinaCMS in production new images are uploaded to the remote GitHub repository. This means they will not be available. In order to get a working preview we need to give it the full path to the file in the repo. Unfortauntely, we don't store the whole path so we need to put it back together.

These functions are all important but it sucks having to copy and paste them across multiple files.

But we're in luck, by creating a subclass of GithubMediaStore we can move this behaviour into one place!

```tsx
import { GithubMediaStore } from "react-tinacms-github"

class NextGithubMediaStore extends GithubMediaStore {
  previewSrc(src = "") {
    return super.previewSrc(path.join("public", src))
  }
  persist(uploads) {
    return super
      .persist(
        // Add the prefix to every upload
        uploads.map(({ directory, file }) => ({
          directory: path.join("public/images", directory),
          file,
        }))
      )
      .then((allMedia) =>
        allMedia.map((media) => ({
          ...media,
          // Strip the path on the way in
          path: media.path.replace("public", ""),
        }))
      )
  }
}
```

By registering this class as our `MediaStore` we remove the need for these functions entirely!

```tsx
function BlogPost({ file }) {
	const cms = useCMS()

	useGithubMarkdownForm(file, {
		fields: [
			{
				name: "title",
				component: "text",
			},
			{
				name: "coverPhoto",
				component: "image",
			}
		]
	})

	return (
	  // ...
	)
}
```

The benefit of this approach is that it works across all media APIs. Whether you're using normal forms, inline editing, or even `react-tinacms-editor`, your images will always be uploaded to the right place and previewed correctly.

This is a pattern that I suspect will be documented more in the future.

If you would like to see an official `NextGithubMediaStore` provided by `next-tinacms-github` then [head over to the TinaCMS repository and give this issue a thumbs up!](https://github.com/tinacms/tinacms/issues/1479)
