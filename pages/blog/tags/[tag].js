import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { getTagPosts, getTagsPaths } from "../../../lib/tags";
import styles from "../../../styles/Blog.module.css";
import Meta from "../../../components/Meta";
import BlogPostELt from "../../../components/BlogPostElt";
export default function Tag({ yearsPosts, categories, tags }) {
  const router = useRouter();

  return (
    <>
      <Meta />
      <Head>
        <title>{`Adelinked | Blog | ${yearsPosts[0].tag}`}</title>
        <meta
          name="description"
          content={`Adelinked Blog categorie=${yearsPosts[0].tag}`}
        />
      </Head>
      <article className={styles.container}>
        <div className={styles.blogSections}>
          <section className={styles.indexPostsDiv}>
            <header className={styles.indexHeader}>
              <h1 className={styles.indexHero}>{yearsPosts[0].tag}</h1>
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
    </>
  );
}

export function getStaticProps({ params }) {
  const tagPosts = getTagPosts(params.tag).map((p) => ({
    ...p,
    year: p.date.slice(0, 4),
  }));
  const yearsPosts = Array.from(new Set(tagPosts.map((p) => p.year))).map(
    (y) => ({
      ["year"]: y,
      ["posts"]: tagPosts.filter((p) => p.year === y),
      ["tag"]: params.tag,
    })
  );
  const categories = Array.from(new Set(tagPosts.map((p) => p.category))).map(
    (c) => ({
      ["categoryTitle"]: c,
      ["count"]: tagPosts.filter((p) => p.category === c).length,
    })
  );

  const tags = Array.from(
    new Set(
      tagPosts.reduce((acc, post) => {
        acc.push(...post.tags);
        return acc;
      }, [])
    )
  );

  return { props: { yearsPosts, categories, tags } };
}

export function getStaticPaths() {
  let paths = getTagsPaths();

  return { paths, fallback: false };
}
