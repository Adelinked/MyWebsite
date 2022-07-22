import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Blog.module.css";

import BlogPostELt from "../components/BlogPostElt";
import { useState } from "react";
import { getSortedPostsData } from "../lib/posts";

const Blog = ({ blogPosts, allPostsData }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Adelinked | Blog</title>
        <meta name="description" content="Adelinked website blog" />
        <link rel="icon" href="/favicon.ico" />
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
            </div>
            <div className={styles.categoriesTags}>
              <h2 className={styles.indexTitles}>Tags</h2>
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
  return { props: { allPostsData: allPostsData } };
}
