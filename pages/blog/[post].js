import Layout from "../../components/layout";
import styles from "../../styles/Blog.module.css";
import Link from "next/link";
import Image from "next/image";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
import { getCategoryPosts } from "../../lib/categories";
import BlogPostElt from "../../components/BlogPostElt";
import { randomize } from "../../utils/functions";
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
  return (
    <Layout>
      <div className={styles.dateCategory}>
        <Date dateString={postData.date} /> /{" "}
        <Link href={`/blog/categories/${postData.category}`}>
          <a>#{postData.category}</a>
        </Link>
      </div>
      <h1 className={styles.indexHero}>{postData.title}</h1>

      <div className={styles.coverImageContainer}>
        <Image
          priority
          alt={`${post} cover image`}
          src={`/blog/${post}.jpg`}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
