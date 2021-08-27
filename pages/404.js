import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import NextImage from 'next/image';

export default function PageNotFound() {
  return (
    <Layout>
      <Container>
        <Box width='50%'>
          <Flex direction='column' align='center'>
            <Heading mb={8} textAlign='center'>
              Captain, it looks like we have a leak on the website.
            </Heading>
            <Text mb={8}>Sorry for the inconvenience, please try another search or page.</Text>
            <NextImage src='/images/notfound.png' height={400} width={400} objectFit='cover' />

            <Text fontSize='sm' my={4}>
              Artist: <a href='https://absurd.design'>Absurd Designs</a>
            </Text>
          </Flex>
        </Box>
      </Container>
    </Layout>
  );
}
