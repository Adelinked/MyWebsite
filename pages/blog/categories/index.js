import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Blog.module.css";

import { getSortedPostsData } from "../../../lib/posts";
import Meta from "../../../components/Meta";

const Categories = ({ categories }) => {
  return (
    <>
      <Meta />
      <Head>
        <title>Adelinked | Blog categories</title>
        <meta
          name="description"
          content="Adelinked website - blog categories"
        />
      </Head>
      <article className={styles.container}>
        <div className={styles.blogSections}>
          <section className={styles.indexPostsDiv}>
            <header className={styles.indexHeader}>
              <h1 className={styles.indexHero}>Blog Categories</h1>
            </header>
            <div className={styles.categoriesTags}>
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
          </section>
        </div>
      </article>
    </>
  );
};

export default Categories;

export async function getStaticProps(context) {
  const allPostsData = getSortedPostsData();
  const categories = Array.from(
    new Set(allPostsData.map((p) => p.category))
  ).map((c) => ({
    ["categoryTitle"]: c,
    ["count"]: allPostsData.filter((p) => p.category === c).length,
  }));

  return {
    props: { categories },
  };
}
