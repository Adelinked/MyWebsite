import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#131325" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
          <script defer data-domain="adelinked.netlify.app" src="https://plausible.io/js/script.js"></script>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
