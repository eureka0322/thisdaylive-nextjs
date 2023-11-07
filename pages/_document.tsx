import { Html, Head, Main, NextScript } from 'next/document'
import { useAmp } from 'next/amp';
export default function Document() {
  const isAmp = useAmp();
  return (
    <Html lang="en">
      <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Oswald:wght@500&display=swap"
          rel="stylesheet"
        />
         {!isAmp &&
        <script data-mrf-script="garda" data-mrf-dt="1" data-mrf-host="live.mrf.io" src="https://live.mrf.io/statics/marfeel/gardac-sync.js" data-cfasync="false"></script>
         }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
