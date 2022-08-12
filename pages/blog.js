import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Blog.module.css";

import BlogPostELt from "../components/BlogPostElt";
import { useState } from "react";
import { getSortedPostsData } from "../lib/posts";
import Meta from "../components/Meta";

const Blog = ({ blogPosts, allPostsData, categories, tags }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Meta />
      <Head>
        <title>Adelinked | Blog</title>
        <meta name="description" content="Adelinked website - blog" />
      </Head>
      <Navbar />
      <article className={styles.container}>
        <header className={styles.indexHeader}>
          <h1 className={styles.indexHero}>Blog</h1>
        </header>
        <div className={styles.blogSections}>
          <section className={styles.indexPostsDiv}>
            <h2 className={styles.indexTitles}>2020</h2>

            {!loading ? (
              <>
                {" "}
                {allPostsData.map((p) => (
                  <BlogPostELt key={p.id} {...p} />
                ))}
              </>
            ) : (
              <div>...loading</div>
            )}
          </section>
          <section className={styles.categoriesTagsSec}>
            <div className={styles.categoriesTags}>
              <h2 className={styles.indexTitles}>Categories</h2>
              {categories.map((c) => (
                <p key={c.categoryTitle}>
                  <Link href={`/categories/${c.categoryTitle}`}>
                    <a>
                      {c.categoryTitle} ({c.count})
                    </a>
                  </Link>
                </p>
              ))}
            </div>
            <div className={styles.categoriesTags}>
              <h2 className={styles.indexTitles}>Tags</h2>
              <div className={styles.tagsDiv}>
                {tags.map((t) => (
                  <span className={styles.tagSpan} key={t}>
                    <Link href={`/tags/${t}`}>
                      <a>{t}</a>
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Blog;

export async function getStaticProps(context) {
  const allPostsData = getSortedPostsData();
  const categories = Array.from(
    new Set(allPostsData.map((p) => p.category))
  ).map((c) => ({
    ["categoryTitle"]: c,
    ["count"]: allPostsData.filter((p) => p.category === c).length,
  }));

  const tags = Array.from(
    new Set(
      allPostsData.reduce((acc, post) => {
        acc.push(...post.tags);
        return acc;
      }, [])
    )
  );
  return { props: { allPostsData, categories, tags } };
}
