import { useRouter } from "next/router";
import Head from "next/head";
import { getCategoryPosts, getCategoriesPaths } from "../../../lib/categories";
import Navbar from "../../../components/NavBar";
import Meta from "../../../components/Meta";
import styles from "../../../styles/Blog.module.css";
import BlogPostElt from "../../../components/BlogPostElt";

export default function Category({ yearsPosts }) {
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
        <h1>{router.query?.category}</h1>
        {yearsPosts.map((y) => (
          <div key={y.year}>
            <h2 className={styles.indexTitles}>{y.year}</h2>
            {y.posts.map((p) => (
              <BlogPostElt key={p.id} {...p} categoryPage />
            ))}
          </div>
        ))}
      </article>
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
  return { props: { yearsPosts } };
}

export function getStaticPaths() {
  let paths = getCategoriesPaths();

  return { paths, fallback: false };
}
