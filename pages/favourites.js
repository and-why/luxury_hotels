import { useAuth } from '@/utils/auth';
import Layout from '@/components/Layout';
import HotelListItem from '@/components/HotelListItem';
import Container from '@/components/Container';
import { Flex, Heading, Box } from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

export default function FavouritesPage() {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? [`/api/favourites/`, user?.token] : null, fetcher);

  console.log(user);

  if (!data) {
    return (
      <Layout>
        <Container>
          <Flex direction='column' w='100%'>
            <Heading fontSize='2xl' mb={8}>
              Loading Favourites
            </Heading>
          </Flex>
        </Container>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Container>
          <Flex direction='column' w='100%'>
            <Heading fontSize='2xl' mb={8}>
              {error.message}
            </Heading>
          </Flex>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Flex direction='column' w='100%'>
          <Heading fontSize='2xl' mb={8}>
            Favourites
          </Heading>
          <Flex direction='column' w={['100%', '100%', '50%']}>
            {data.favourites.length < 1 && <p>No favourites have been added yet.</p>}
            {data.favourites.map((favourite) => {
              return <HotelListItem key={favourite.id} favourite={favourite} />;
            })}
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
