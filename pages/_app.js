import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/utils/Theme';
import '../styles/globals.css';
import { AuthProvider } from '@/utils/auth';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
