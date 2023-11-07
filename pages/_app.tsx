import { AppProps } from 'next/app';
import {Provider} from "react-redux";
import { useSelector } from "react-redux";
import {useState, useEffect, useMemo} from "react";
import {wrapper, store} from "../store/store";
import { setThemeDarkToBody} from '../lib/utils';
import {IReduxState} from '../lib/types';
import '../styles/index.css';
import '../styles/global.scss';
import Script from 'next/script';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const COOKIEYES_APIKEY = publicRuntimeConfig.COOKIEYES_APIKEY;
const GTAG = publicRuntimeConfig.GTAG;
import { useAmp } from 'next/amp';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Main Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

const Main = ({ Component, pageProps }) => {
  const isAmp = useAmp();
  const [theme, setTheme] = useState("light");
  const accountData = useSelector((state : IReduxState) => state.account);
  const store_theme = accountData.theme;

  useEffect(()=>{
    if(store_theme == "dark")
      setThemeDarkToBody(true);
    else
      setThemeDarkToBody(false);
    setTheme(store_theme);
  },[store_theme])

  return (
    <>
        <Script       
          src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_APIKEY}/script.js`}>
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GTAG}');
          `}
        </Script>
        {isAmp && (
        <amp-analytics type="gtag">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                vars: {
                  ['gtag_id']: GTAG,
                  config: {
                    [GTAG]: { groups: 'default' },
                  },
                },
                linkers: {
                  enabled: true,
                },
              }),
            }}
          />
        </amp-analytics>
      )}
    <Component {...pageProps} />
    </>

  );
}

export default wrapper.withRedux(MyApp);
