---
title: "When to Use Static Generation v.s. Server-side Rendering"
date: "2022-01-22"
category: "Rendering2"
tags: ["SSG", "SSR", "CDN"]
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

```javaScript
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
```

```html
<h1>Title</h1>
```

```javaScript
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
function someCode() {
  let x = 1;
  console.log("x = ", 1);
}
```

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.

for more infos visit [nextjs](https://nextjs.org).

1. list item 1
2. list item 2
3. list item 3
