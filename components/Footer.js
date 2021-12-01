import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Container from './Container';

export default function Footer() {
  return (
    <Flex bg='black' justify='center' direction='column' w='100%' mt={16}>
      <Container>
        <Flex direction='column' w='100%'>
          <Flex bg='black' direction='column' w='100%'>
            <Flex direction='column' justify='center' w='100%' py={8}>
              <Heading as='h3' fontSize='lg' color='white' mb={4}>
                Subscribe to our newsletter for exclusive offers
              </Heading>
              <FormControl as='form' mb={4} w='100%'>
                <Flex align='flex-end' justify='space-between' wrap={['wrap', 'wrap', 'nowrap']}>
                  <Input placeholder='Josh' w='100%' mb={[4, 4, 0]} bg='white' />
                  <Input placeholder='Rogers' w='100%' ml={[0, 0, 4]} mb={[4, 4, 0]} bg='white' />
                  <Input
                    placeholder='josh.rogers@gmail.com'
                    w='100%'
                    ml={[0, 0, 4]}
                    mb={[4, 4, 0]}
                    bg='white'
                  />
                  <Button
                    type='submit'
                    bg='brand.100'
                    color='white'
                    ml={[0, 0, 4]}
                    mb={[4, 4, 0]}
                    w='100%'
                  >
                    Subscribe
                  </Button>
                </Flex>
              </FormControl>
              <Flex direction='row' mb={4} wrap={['wrap', 'wrap', 'nowrap']}>
                <NextLink href='/about' passHref>
                  <Link color='white' p={2} mr={4}>
                    About
                  </Link>
                </NextLink>
                <NextLink href='/search' passHref>
                  <Link color='white' p={2} mr={4}>
                    Search
                  </Link>
                </NextLink>
                <NextLink href='/support' passHref>
                  <Link color='white' p={2} mr={4}>
                    Support
                  </Link>
                </NextLink>
                <NextLink href='/terms' passHref>
                  <Link color='white' p={2} mr={4}>
                    Terms &amp; Conditions
                  </Link>
                </NextLink>
                <NextLink href='/privacy' passHref>
                  <Link color='white' p={2} mr={4}>
                    Privacy
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
          <Flex w='100%' align='center' justify='center'>
            <Text p={0} m={0} fontSize='10px' color='gray.400'>
              © SonderEscapes from <Link href='https://www.andysmith.is'>andysmith.is</Link> - ABN.
              97 297 663 840 — illustrations by{' '}
              <Link href='https://www.adsurd.design'>Absurd.Design</Link>
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
