import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/utils/auth';
import { Flex, Heading, Spinner, Text, Link } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { BsShieldLock } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import Container from '@/components/Container';
import AccountCard from '@/components/AccountCard';
import NextLink from 'next/link';

export default function AccountPage() {
  const { user, signout } = useAuth();
  const router = useRouter();

  const handleSignout = () => {
    signout();
    router.push('/');
  };

  if (!user) {
    return (
      <Layout>
        <Container>
          <Flex direction='column' mb={4}>
            <Heading fontSize='2xl' mb={8}>
              Account
            </Heading>
            <Text>
              No Account Details.{' '}
              <NextLink href='/'>
                <Link color='brand.200'>Return home</Link>
              </NextLink>
            </Text>
          </Flex>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Flex direction='column' mb={8} justify='center' w='100%'>
          <Flex direction='column' m={2} mb={8}>
            <Heading fontSize='2xl'>Account</Heading>
            <Text fontSize='sm'>
              Hello, {user.name} ({user.email}). Not you?{' '}
              <Link fontWeight='bold' color='brand.200' onClick={handleSignout}>
                Sign out
              </Link>
            </Text>
          </Flex>
          <Flex wrap={['wrap', 'wrap', 'no-wrap']}>
            <AccountCard
              linkref={'/account/profile'}
              color={'brand.300'}
              icon={CgProfile}
              heading={'Personal profile'}
              text={'Provide and update your personal profile.'}
            />
            <AccountCard
              linkref='/account/account-security'
              color={'brand.100'}
              icon={BsShieldLock}
              heading={'Account security'}
              text={'Update your password and secure account.'}
            />
            <AccountCard
              linkref='/account/travel-partners'
              color={'brand.200'}
              icon={FaUserFriends}
              heading={'Travel Partners'}
              text={'Add the emails of your travel partners so you can share trips.'}
            />
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
