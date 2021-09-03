import NextImage from 'next/image';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { Flex, Heading, Box, Button, Icon, Text, Link } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { StarIcon } from '@chakra-ui/icons';
import { useAuth } from '@/utils/auth';
import {
  updateFavourites,
  removeFromFavourites,
  deleteFavourite,
  createFavourite,
} from '@/utils/db';
import { mutate } from 'swr';

export default function HotelListItem({ favourite }) {
  console.log('favourite', favourite);
  const [isFavourite, setFavourite] = useState(true);
  const randomInt = Math.floor(Math.random() * 7);

  const { user } = useAuth();

  const handleFavourite = async () => {
    const userId = user?.uid;
    if (!isFavourite) {
      const favourite = { userId, ...favourite };
      // updateFavourites(userId, favourite);
      const { id } = createFavourite(favourite);
      return setFavourite(true);
    } else {
      deleteFavourite(favourite.id);
      mutate(
        ['/api/favourites', user.token],
        async (data) => {
          return {
            favourites: data.favourites.filter((fav) => fav.id !== favourite.id),
          };
        },
        false,
      );
      return setFavourite(false);
    }
  };

  if (!user) {
    return (
      <Flex>
        <Heading>Please log in to see favourites</Heading>
      </Flex>
    );
  }
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 7);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 9);
  return (
    <Box position='relative'>
      <NextLink
        href={{
          pathname: `/hotels/${favourite.hotelId}`,
          query: {
            checkInDate: new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
              .toISOString()
              .split('T')[0],
            checkOutDate: new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
              .toISOString()
              .split('T')[0],
            guests: 2,
            rooms: 1,
          },
        }}
      >
        <Link>
          <Flex borderBottom='1px solid' borderBottomColor='gray.100' py={2} w='100%'>
            <Box w='100%' maxW='300px'>
              <NextImage
                src={
                  process.env.NODE_ENV === 'development'
                    ? `/images/placeholder/hotel-${randomInt}.jpg`
                    : favourite.media
                    ? favourite.media[0].uri
                    : `/images/placeholder/hotel-${randomInt}.jpg`
                }
                height='200px'
                width='300px'
                className='borderRadius'
                objectFit='cover'
                placeholder='blur'
                blurDataURL={`/images/placeholder/blur/hotel-${randomInt}.jpg`}
              />
            </Box>
            <Flex w='100%' py={2} px={4} direction='column' justify='space-between'>
              <Box>
                <Text textTransform='capitalize' fontSize='sm' mb={1}>
                  {favourite.address.cityName.toLowerCase()}{' '}
                  {favourite.type && favourite.type.toLowerCase()} - {favourite.address.countryCode}
                </Text>
                <Flex w='100%' justify='space-between' align='flex-start'>
                  <Heading key={favourite.id} fontSize='lg' textTransform='capitalize'>
                    {favourite.name.toLowerCase()}
                  </Heading>
                </Flex>
              </Box>
              <Flex align='center' py={2}>
                {favourite.rating} <StarIcon ml={1} color='brand.100' />
              </Flex>
            </Flex>
          </Flex>
        </Link>
      </NextLink>
      {user && (
        <Button
          size='sm'
          variant='ghost'
          onClick={handleFavourite}
          h='20px'
          w='20px'
          zIndex='999'
          position='absolute'
          top='15px'
          right='0'
        >
          <Icon
            color={isFavourite ? 'red' : 'black'}
            as={isFavourite ? AiFillHeart : AiOutlineHeart}
            h='20px'
            w='20px'
          />
        </Button>
      )}
    </Box>
  );
}
