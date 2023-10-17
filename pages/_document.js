import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#131325" />
          <meta
            name="google-site-verification"
            content="jGch0f5SusiEDUsTTkNZ0VxZn8-yTFdkxYhKNR5AT-E"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
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
