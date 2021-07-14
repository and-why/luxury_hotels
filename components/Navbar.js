import { Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LogoIcon } from './icons/icons';

export default function Navbar() {
  const user = false;
  return (
    <Flex w='100%' maxW='1440px' m={4} justify='space-between' align='center'>
      <Flex>
        <NextLink href='/' as={`/`} passHref>
          <Link>
            <LogoIcon h={8} w={32} />
          </Link>
        </NextLink>
      </Flex>
      {user.data ? <Link>Account</Link> : <Link>Log In</Link>}
    </Flex>
  );
}
