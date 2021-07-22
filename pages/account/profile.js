import { useAuth } from '@/utils/auth';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import {
  Flex,
  Heading,
  Text,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import EditableListItem from '@/components/EditableListItem';

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
          <EditableListItem heading={'Name'} detail={user?.name} />
          <EditableListItem heading={'Gender'} detail={user?.gender} />
          <EditableListItem heading={'Date of birth'} detail={user?.dob} />
          <EditableListItem heading={'Email address'} detail={user?.email} />
          <EditableListItem heading={'Phone number'} detail={user?.phone} />
          <EditableListItem heading={'Emergency contact'} detail={user?.emergency} />
        </Flex>
      </Container>
    </Layout>
  );
}
