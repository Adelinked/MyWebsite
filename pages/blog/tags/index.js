import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Blog.module.css";

import { useState } from "react";
import { getSortedPostsData } from "../../../lib/posts";
import Meta from "../../../components/Meta";

const Blog = ({ categories, tags, yearsPosts }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Meta />
      <Head>
        <title>Adelinked | Blog tags</title>
        <meta name="description" content="Adelinked website - blog tags" />
      </Head>

      <article className={styles.container}>
        <section>
          <header className={styles.indexHeader}>
            <h1 className={styles.indexHero}>Blog Tags</h1>
          </header>
          <div className={styles.categoriesTags}>
            <div className={styles.tagsDiv}>
              {tags.map((t) => (
                <span className={styles.tagSpan} key={t}>
                  <Link href={`/blog/tags/${t}`}>
                    <a>{t}</a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Blog;

export async function getStaticProps(context) {
  const allPostsData = getSortedPostsData();
  const tags = Array.from(
    new Set(
      allPostsData.reduce((acc, post) => {
        acc.push(...post.tags);
        return acc;
      }, [])
    )
  );

  return {
    props: { tags },
  };
}
