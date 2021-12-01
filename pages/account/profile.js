import { useAuth } from '@/utils/auth';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import ProfileNameInput from '@/components/profileInputs/ProfileNameInput';
import ProfileGenderInput from '@/components/profileInputs/ProfileGenderInput';
import ProfileEmailInput from '@/components/profileInputs/ProfileEmailInput';
import ProfileDobInput from '@/components/profileInputs/ProfileDobInput';

import {
  Flex,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Layout>
      <Container>
        <Flex direction='column' w='100%'>
          <Breadcrumb fontSize='12px' mb={4} fontWeight='bold'>
            <BreadcrumbItem>
              <NextLink href='/' passHref>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NextLink href='/account' passHref>
                <BreadcrumbLink>Account</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Personal profile</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading fontSize='2xl' mb={8}>
            Personal profile
          </Heading>
          <Flex wrap={['wrap', 'wrap', 'nowrap']}>
            <Flex direction='column' w={['100%', '100%', '60%']} mb={8}>
              {!user ? (
                <Spinner />
              ) : (
                <>
                  <ProfileNameInput data={user.name} />
                  <ProfileGenderInput data={user.gender} />
                  <ProfileEmailInput data={user.email} />
                  <ProfileDobInput data={user.dob} />
                </>
              )}
            </Flex>
            <Flex direction='column' w={['100%', '100%', '40%']} ml={[0, 0, 8]}>
              <Flex bg='gray.100' direction='column' p={4}>
                <Heading as='h3' fontSize='lg' mb={2}>
                  Which details can be edited?
                </Heading>
                <Text fontSize='sm' mb={4}>
                  Details SonderEscapes uses to verify your identity can’t be changed. If using an
                  OAuth sign in, i.e. Google or Facebook, your name will likely revert back to the
                  Name used by that service.
                </Text>
                <Heading as='h3' fontSize='lg' mb={2}>
                  What info is shared with others?
                </Heading>
                <Text fontSize='sm' mb={4}>
                  SonderHotels only releases contact information for hosts and guests after a
                  reservation is confirmed.
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
