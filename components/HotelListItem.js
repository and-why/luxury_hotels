import NextImage from 'next/image';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { Flex, Heading, Box, Button, Icon, Text, Link } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { StarIcon } from '@chakra-ui/icons';
import { useAuth } from '@/utils/auth';
import { updateFavourites, removeFromFavourites } from '@/utils/db';
import { mutate } from 'swr';

export default function HotelListItem({ favourite }) {
  const randomInt = Math.floor(Math.random() * 7);
  const [isFavourite, setFavourite] = useState(false);
  const { user } = useAuth();

  const handleFavourite = async () => {
    const userId = user?.uid;
    const newFavourite = { userId, ...favourite.hotelData };
    console.log(isFavourite);
    if (!isFavourite) {
      updateFavourites(userId, newFavourite);
      const newData = user.hotelIds.push(favourite.hotelData.hotelId);
      setFavourite(true);
      return mutate(user, { ...user, hotelIds: newData }, true);
    } else {
      const newData = user.hotelIds.filter((hotelId) => hotelId !== favourite.hotelData.hotelId);
      removeFromFavourites(userId, newFavourite);
      setFavourite(false);
      return mutate(user, { ...user, hotelIds: newData }, true);
    }
  };
  useEffect(() => {
    if (user) {
      setFavourite(user.hotelIds.includes(favourite.id));
    }
  }, [user]);

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
    <NextLink
      href={{
        pathname: `/hotels/${favourite.id}`,
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
        <Flex borderBottom='1px solid' borderBottomColor='gray.100' p={2}>
          <Box w='35%' maxW='300px' p={2}>
            <NextImage
              src={
                process.env.NODE_ENV /*=== 'development'*/
                  ? `/images/placeholder/hotel-${randomInt}.jpg`
                  : favourite.hotelData.image.uri
              }
              height='200px'
              width='300px'
              className='borderRadius'
              objectFit='cover'
              placeholder='blur'
              blurDataURL={`/images/placeholder/blur/hotel-${randomInt}.jpg`}
            />
          </Box>
          <Flex w='65%' p={2} direction='column' justify='space-between'>
            <Box>
              <Text textTransform='capitalize' fontSize='sm' mb={1}>
                {favourite.hotelData.address.cityName.toLowerCase()}{' '}
                {favourite.hotelData.type && favourite.hotelData.type.toLowerCase()} -{' '}
                {favourite.hotelData.address.countryCode}
              </Text>
              <Flex w='100%' justify='space-between' align='flex-start'>
                <Heading key={favourite.id} fontSize='lg' textTransform='capitalize'>
                  {favourite.hotelData.name.toLowerCase()}
                </Heading>
                {user && (
                  <Button size='sm' variant='ghost' onClick={handleFavourite} h='20px' w='20px'>
                    <Icon
                      color={isFavourite ? 'red' : 'black'}
                      as={isFavourite ? AiFillHeart : AiOutlineHeart}
                      h='20px'
                      w='20px'
                    />
                  </Button>
                )}
              </Flex>
            </Box>
            <Flex align='center' py={2}>
              {favourite.hotelData.rating} <StarIcon ml={1} color='brand.100' />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  );
}
