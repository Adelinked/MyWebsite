import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "../data/variables";

export default function Meta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/black.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/black32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/black16x16.png"
      />
      <meta property="og:url" content={process.env.WEBSITE_URL} />
      <meta property="og:title" content="Adelinked website" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Adelinked website" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={process.env.WEBSITE_URL} />
      <meta property="twitter:url" content={process.env.WEBSITE_URL} />
      <meta name="twitter:title" content="Adelinked website" />
      <meta name="twitter:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
}
