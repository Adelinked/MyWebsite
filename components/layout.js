import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
const name = "Adelinked";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main>{children}</main>
        <div className={styles.backToHome}>
          <Link href="/blog">
            <a>← Back to blog</a>
          </Link>
        </div>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a style={{ marginBottom: "10px", display: "block" }}>
                ← Back to home
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
