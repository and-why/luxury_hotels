import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/utils/Theme';
import '../styles/globals.css';
import { AuthProvider } from '@/utils/auth';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/nprogress.css';

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
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
