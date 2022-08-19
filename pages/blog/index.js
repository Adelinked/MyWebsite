import Head from "next/head";
import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import styles from "../../styles/Blog.module.css";

import BlogPostELt from "../../components/BlogPostElt";
import { useState } from "react";
import { getSortedPostsData } from "../../lib/posts";
import Meta from "../../components/Meta";

const Blog = ({ categories, tags, yearsPosts }) => {
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
        <div className={styles.blogSections}>
          <section className={styles.indexPostsDiv}>
            <header className={styles.indexHeader}>
              <h1 className={styles.indexHero}>Blog</h1>
            </header>
            {yearsPosts.map((y) => (
              <div key={y.year}>
                <h2 className={styles.indexTitles}>{y.year}</h2>
                {y.posts.map((p) => (
                  <BlogPostELt key={p.id} {...p} />
                ))}
              </div>
            ))}
          </section>
          <section className={styles.categoriesTagsSec}>
            <div className={styles.categoriesTags}>
              <h2 className={styles.indexTitles}>Categories</h2>
              <ul>
                {categories.map((c) => (
                  <li key={c.categoryTitle}>
                    <Link href={`/blog/categories/${c.categoryTitle}`}>
                      <a>
                        {c.categoryTitle} ({c.count})
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.categoriesTags}>
              <h2 className={styles.indexTitles}>Tags</h2>
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
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Blog;

export async function getStaticProps(context) {
  const allPostsData = getSortedPostsData().map((p) => ({
    ...p,
    year: p.date.slice(0, 4),
  }));
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

  const yearsPosts = Array.from(new Set(allPostsData.map((p) => p.year))).map(
    (y) => ({
      ["year"]: y,
      ["posts"]: allPostsData.filter((p) => p.year === y),
    })
  );

  return {
    props: { categories, tags, yearsPosts },
  };
}
