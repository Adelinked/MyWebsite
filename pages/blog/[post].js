import Layout from "../../components/layout";
import styles from "../../styles/Blog.module.css";

import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.post);
  return {
    props: {
      postData,
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

export default function Post({ postData }) {
  return (
    <Layout>
      <h1 className={styles.indexHero}>{postData.title}</h1>
      <div className={styles.dateCategory}>
        <Date dateString={postData.date} />
        <span>Categorie: {postData.category}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
