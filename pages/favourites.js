import NextImage from 'next/image';
import { useAuth } from '@/utils/auth';
import Layout from '@/components/Layout';
import HotelListItem from '@/components/HotelListItem';
import Container from '@/components/Container';
import { Flex, Heading, Box } from '@chakra-ui/react';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

export default function FavouritesPage() {
  const { user } = useAuth();
  const { data } = useSWR(`/api/favourites/${user?.uid}`);

  const [favourites, setFavourites] = useState();

  const init = () => {
  const allFavs = data.favourites;
  const userFavs = user.hotelIds;

  const newFavourites = allFavs?.reduce((filtered, fav) => {
    for (let i = 0; i < userFavs?.length; i++) {
      if (fav.id == userFavs[i]) {
        filtered.push(fav);
      }
    }
    return filtered;
  }, []);

  return newFavourites
  }

  useEffect(() => {
    if (user && data) {
      setFavourites(init());
    }
  }, [user, data]);

  console.log('favourites', favourites);
  return (
    <Layout>
      <Container>
        <Flex direction='column'>
          <Heading fontSize='2xl' mb={8}>
            Favourites
          </Heading>
          <Flex direction='column'>
            {favourites?.map((favourite) => {
              console.log(favourite);
              return <HotelListItem key={favourite.id} favourite={favourite} />;
            })}
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
