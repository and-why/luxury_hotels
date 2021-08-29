import { Box, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, search }) {
  return (
    <>
      <Flex direction='column' justify='space-between' minH='100vh' w='100%'>
        <Box w='100%'>
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
