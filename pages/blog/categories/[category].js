import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link"
import { getCategoryPosts, getCategoriesPaths } from "../../../lib/categories";
import Navbar from "../../../components/NavBar";
import Meta from "../../../components/Meta";
import styles from "../../../styles/Blog.module.css";
import BlogPostELt from "../../../components/BlogPostElt";
import Footer from "../../../components/Footer";

export default function Category({ yearsPosts, categories, tags }) {
  const router = useRouter();

  return (
    <>
      <Meta />
      <Head>
        <title>{`Adelinked | Blog | ${yearsPosts[0].category}`}</title>
        <meta
          name="description"
          content={`Adelinked Blog categorie=${yearsPosts[0].category}`}
        />
      </Head>
      <Navbar />
      <article className={styles.container}>
        <div className={styles.blogSections}>
          <section className={styles.indexPostsDiv}>
            <header className={styles.indexHeader}>
              <h1 className={styles.indexHero}>{yearsPosts[0].category}</h1>
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
            {/*<div className={styles.categoriesTags}>
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
            </div>*/}
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
}

export function getStaticProps({ params }) {
  const categoryPosts = getCategoryPosts(params.category).map((p) => ({
    ...p,
    year: p.date.slice(0, 4),
  }));
  const yearsPosts = Array.from(new Set(categoryPosts.map((p) => p.year))).map(
    (y) => ({
      ["year"]: y,
      ["posts"]: categoryPosts.filter((p) => p.year === y),
      ["category"]: params.category,
    })
  );
  const categories = Array.from(
    new Set(categoryPosts.map((p) => p.category))
  ).map((c) => ({
    ["categoryTitle"]: c,
    ["count"]: categoryPosts.filter((p) => p.category === c).length,
  }));

  const tags = Array.from(
    new Set(
      categoryPosts.reduce((acc, post) => {
        acc.push(...post.tags);
        return acc;
      }, [])
    )
  );
  return { props: { yearsPosts, categories, tags } };
}

export function getStaticPaths() {
  let paths = getCategoriesPaths();

  return { paths, fallback: false };
}
