import { useRef } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Button,
  Flex,
  Link,
  Text,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { LogoIcon } from './icons/icons';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '@/utils/auth';
import { useDisclosure } from '@chakra-ui/react';
import Container from './Container';

export default function Navbar() {
  const { user, signinWithGoogle, signout, loading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuBtn = useRef();

  const handleSignout = () => {
    signout();
    onClose();
  };

  return (
    <Container>
      <Flex>
        <NextLink href='/' as={`/`} passHref>
          <Link>
            <LogoIcon h={8} w={32} />
          </Link>
        </NextLink>
      </Flex>

      <Flex align='center'>
        {user ? (
          <Button ref={menuBtn} onClick={onOpen} variant='outline' leftIcon={<HamburgerIcon />}>
            {user?.photoUrl ? (
              <NextImage
                src={user?.photoUrl}
                height='25px'
                width='25px'
                className='roundedImage'
                placeholder='blur'
                blurDataURL='/images/placeholder/user.png'
              />
            ) : (
              'Account'
            )}
          </Button>
        ) : (
          <Button variant='outline' onClick={signinWithGoogle} isLoading={loading}>
            Log in
          </Button>
        )}

        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={menuBtn}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton mr={8} />
            <DrawerBody mt={16} p={0}>
              <Flex direction='column'>
                {user && (
                  <>
                    <Flex direction='column' mb={32}>
                      <NextLink href='/account' passHref>
                        <Link fontSize='xl' p={4} w='100%' _hover={{ background: 'gray.200' }}>
                          Account
                        </Link>
                      </NextLink>
                      <NextLink href='/favourites' passHref>
                        <Link fontSize='xl' p={4} w='100%' _hover={{ background: 'gray.200' }}>
                          Favourites
                        </Link>
                      </NextLink>
                    </Flex>
                    <Button
                      onClick={handleSignout}
                      leftIcon={<Icon as={BiLogOut} />}
                      colorScheme='red'
                    >
                      Log out
                    </Button>
                  </>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Container>
  );
}
