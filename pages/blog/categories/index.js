import Head from "next/head";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/NavBar";
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
      <Navbar />
      ${yearsPosts[0].tag}
      <Footer />
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
