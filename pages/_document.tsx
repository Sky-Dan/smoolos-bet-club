import { Html, Head, Main, NextScript } from 'next/document';

import image from '../images/image.png';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="title" content="SmooloBetClub" />
        <meta
          name="description"
          content="Smoolos Bet Club is a dapp created by skydan"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://smoolos-bet-club.netlify.app/"
        />
        <meta property="og:title" content="SmooloBetClub" />
        <meta
          property="og:description"
          content="Smoolos Club is a dapp created by skydan"
        />
        {/* <meta property="og:image" content={image} /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
