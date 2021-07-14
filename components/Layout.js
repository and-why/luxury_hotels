import { Box, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto+Slab:wght@300;600&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Flex justify='center' align='center'>
        <Navbar />
      </Flex>
      <div>{children}</div>
    </>
  );
}
