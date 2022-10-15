import Link from "next/link";
import Image from "next/image";


import Date from "../../components/Date";
import BlogPostElt from "../../components/BlogPostElt";
import { randomize } from "../../utils/functions";
import { getCategoryPosts } from "../../lib/categories";
import { getAllPostIds, getPostData } from "../../lib/posts";

import Layout from "../../components/layout";
import styles from "../../styles/Blog.module.css";
import { useEffect } from "react";


export async function getStaticProps({ params }) {
  const postData = await getPostData(params.post);

  const categoryPosts = randomize(getCategoryPosts(postData.category)).slice(
    0,
    4
  );

  return {
    props: {
      postData,
      post: params.post,
      categoryPosts,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData, post, categoryPosts }) {

  function copyCodeToClipboard(button) {
    let copyText = button.nextElementSibling.firstChild;

    let text = copyText.textContent;
    const selection = window.getSelection();
    if (selection.rangeCount == 1 && selection.type == "Range") {
      if (selection.focusNode === copyText) {
        const start = selection.anchorOffset; const end = selection.focusOffset;
        text = start <= end ? text.slice(start, end) : text.slice(end, start)
      }
    }
    navigator.clipboard.writeText(text);
    button.innerText = "Copied";
    button.disabled = true;
    setTimeout(() => {
      button.innerText = "Copy";
      button.disabled = false;
    }, 2000);
  }

  useEffect(() => {
    const buttonElements = Array.from(document.getElementsByTagName('button')).filter(e => e.parentNode.localName === "pre");
    buttonElements.forEach((button) => button.addEventListener("click", () => copyCodeToClipboard(button)));

  }, [])

  return (
    <Layout>
      <div className={styles.dateCategory}>
        <Date dateString={postData.date} /> /{" "}
        <Link href={`/blog/categories/${postData.category}`}>
          <a>#{postData.category}</a>
        </Link>
      </div>
      <h1 className={styles.indexHero}>{postData.title}</h1>

      {<div className={styles.coverImageContainer}>
        <Image
          priority
          alt={`${post} cover image`}
          src={`/blog/${post}.jpg`}
          layout="fill"
          objectFit="contain"
        />
      </div>}

      {<div className={styles.postContent} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
      <div className={styles.postTags}>
        <h2 className={styles.indexTitles} style={{ marginRight: "10px" }}>
          Tags:
        </h2>
        {postData.tags.map((t) => (
          <span className={styles.tagSpan} key={t}>
            <Link href={`/blog/tags/${t}`}>
              <a>{t}</a>
            </Link>
          </span>
        ))}
      </div>
      <div className={styles.sameCategoryDiv}>
        <h2 className={styles.indexTitles}>Read also:</h2>
        {categoryPosts.map((p) => (
          <BlogPostElt key={p.id} {...p} categoryPage noDate />
        ))}
      </div>
    </Layout>
  );
}
