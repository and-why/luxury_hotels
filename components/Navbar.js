import { useRef } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
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
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { LogoIcon } from './icons/icons';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '@/utils/auth';
import Container from './Container';
import FullSearchForm from './FullSearchForm';
import SearchModal from './SearchModal';
import { useRouter } from 'next/router';

export default function Navbar({ search }) {
  const { user, signinWithGoogle, signout, loading } = useAuth();
  const router = useRouter();

  // if homepage, don't show the search icon in navigation
  const homepage = router.pathname === '/' || router.pathname === '/make-booking' ? true : false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuBtn = useRef();

  const handleSignout = () => {
    signout();
    onClose();
  };

  return (
    <Container>
      <Grid
        width='100%'
        templateColumns='repeat( auto-fit, minmax(130px, 1fr) )'
        justify='space-between'
        align='center'
      >
        <Flex>
          <NextLink href='/' as={`/`} passHref>
            <Link>
              <LogoIcon h={8} w={32} />
            </Link>
          </NextLink>
        </Flex>

        {!homepage ? (
          <Box display={['none', 'none', 'block']}>
            <SearchModal>Where are you going?</SearchModal>
          </Box>
        ) : (
          <div />
        )}

        <Flex align='center' justify='flex-end'>
          {user ? (
            <Button ref={menuBtn} onClick={onOpen} variant='outline' leftIcon={<HamburgerIcon />}>
              {user?.photoUrl ? (
                <NextImage
                  src={user?.photoUrl}
                  height='25px'
                  width='25px'
                  className='roundedImage'
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
                        <NextLink href='/' passHref>
                          <Link fontSize='xl' p={4} w='100%' _hover={{ background: 'gray.200' }}>
                            Home
                          </Link>
                        </NextLink>
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
                        m={4}
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
      </Grid>
    </Container>
  );
}
