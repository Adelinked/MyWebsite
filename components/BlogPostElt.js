import Link from "next/link";
import Head from "next/head";
export default ({ title, id, date }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Link href={`./posts/${id}`}>
        <a>
          <p>{date}</p>
          <p>{title}</p>
        </a>
      </Link>
    </>
  );
};
