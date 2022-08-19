import { useRouter } from "next/router";
import Head from "next/head";
import { getTagPosts, getTagsPaths } from "../../../lib/tags";
import styles from "../../../styles/Blog.module.css";
import Navbar from "../../../components/NavBar";
import Meta from "../../../components/Meta";
import BlogPostElt from "../../../components/BlogPostElt";
export default function Tag({ yearsPosts }) {
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
      <Navbar />
      <article className={styles.container}>
        <h1>{router.query?.tag}</h1>
        {yearsPosts.map((y) => (
          <div key={y.year}>
            <h2 className={styles.indexTitles}>{y.year}</h2>
            {y.posts.map((p) => (
              <BlogPostElt key={p.id} {...p} />
            ))}
          </div>
        ))}
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

  return { props: { yearsPosts } };
}

export function getStaticPaths() {
  let paths = getTagsPaths();

  return { paths, fallback: false };
}
