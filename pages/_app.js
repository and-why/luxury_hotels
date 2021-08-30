import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/utils/Theme';
import '../styles/globals.css';
import { AuthProvider } from '@/utils/auth';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/nprogress.css';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: false,
  });

  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto+Slab:wght@300;600&display=swap'
          rel='stylesheet'
        />
        <script src='https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js' />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
