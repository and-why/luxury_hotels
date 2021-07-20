import { Button, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { LogoIcon } from './icons/icons';

export default function Navbar() {
  const user = false;

  return (
    <Flex w='100%' maxW='1440px' px={[8, 4, 16, 32]} py={4} justify='space-between' align='center'>
      <Flex>
        <NextLink href='/' as={`/`} passHref>
          <Link>
            <LogoIcon h={8} w={32} />
          </Link>
        </NextLink>
      </Flex>

      <Flex align='center'>
        <Link ml={2}>
          <Button variant='ghost'>Account</Button>
        </Link>
      </Flex>
    </Flex>
  );
}
