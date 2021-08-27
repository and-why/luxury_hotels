import { Box, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, search }) {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto+Slab:wght@300;600&display=swap'
          rel='stylesheet'
        />
        <script src='https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js'></script>
      </Head>
      <Flex direction='column' justify='space-between' minH='100vh'>
        <Box>
          <Flex justify='center' align='center' w='100%'>
            <Navbar search={search} />
          </Flex>
          <Flex justify='center' align='center' w='100%'>
            {children}
          </Flex>
        </Box>
        <Footer />
      </Flex>
    </>
  );
}
