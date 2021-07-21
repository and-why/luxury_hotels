import { Flex, Text, Box, Link } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function DisplayTile({ hotel }) {
  const hotelName = hotel.hotel.name.toLowerCase();
  console.log(hotel);
  const randomInt = Math.floor(Math.random() * 7);
  return (
    <Flex
      direction='column'
      w={['50%', '50%', '33.3%', '25%']}
      p={2}
      transition='all 0.3s ease'
      bg='white'
      borderRadius='10px'
      _hover={{
        transform: 'scale(1.05)',
        transition: 'all 0.3s ease',
        zIndex: '99',
      }}
    >
      <NextLink
        href={{
          pathname: `/hotels/${hotel.hotel.hotelId}`,
          query: {
            checkInDate: hotel.offers[0].checkInDate,
            checkOutDate: hotel.offers[0].checkOutDate,
            guests: hotel.offers[0].guests.adults,
            rooms: hotel.roomQuantity || 1,
          },
        }}
      >
        <a>
          {hotel.hotel.media && process.env.NODE_ENV ? (
            <NextImage
              src={`/images/placeholder/hotel-${randomInt}.jpg`}
              height='400px'
              width='400px'
              className='borderRadius'
              quality='100'
              placeholder='blur'
              blurDataURL={`/images/placeholder/blur/hotel-${randomInt}.jpg`}
            />
          ) : (
            <NextImage
              src={hotel.hotel.media[0].uri}
              height='400px'
              width='400px'
              objectFit='cover'
            />
          )}

          <Flex mt={1} w='100%'>
            <Flex justify='space-between' w='100%'>
              <Text
                color='black'
                fontWeight='600'
                fontSize='sm'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                overflow='hidden'
                width='60%'
                textTransform='capitalize'
              >
                {hotelName}
              </Text>
              <Text
                color='black'
                pr={4}
                w='40%'
                fontSize='sm'
                minW='90px'
                textAlign='right'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                overflow='hidden'
              >
                ${hotel.offers[0].price.total}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize='sm' color='gray.400'>
            {hotel.hotel.rating ? `${hotel.hotel.rating} stars` : 'No rating'}{' '}
          </Text>
        </a>
      </NextLink>
    </Flex>
  );
}
