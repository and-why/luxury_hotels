import { Button, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { LogoIcon } from './icons/icons';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Navbar() {
  const user = false;
  const [session, loading] = useSession();

  return (
    <Flex w='100%' maxW='1440px' m={4} justify='space-between' align='center'>
      <Flex>
        <NextLink href='/' as={`/`} passHref>
          <Link>
            <LogoIcon h={8} w={32} />
          </Link>
        </NextLink>
      </Flex>
      {!loading &&
        (!session ? (
          <Link onClick={() => signIn('github')}>Log In</Link>
        ) : (
          <Flex align='center'>
            <Link ml={2} onClick={signOut}>
              Account
            </Link>
            {session.user.image && (
              <NextImage src={session.user.image} height='25px' width='25px' />
            )}
          </Flex>
        ))}
    </Flex>
  );
}
