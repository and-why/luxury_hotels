import { Flex, Text, Box, Link } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { formatter } from '@/utils/functions';

export default function DisplayTile({ data, dictionary }) {
  const hotelName = data.hotel.name.toLowerCase();

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
          pathname: `/hotels/${data.hotel.hotelId}`,
          query: {
            checkInDate: data.offers[0].checkInDate,
            checkOutDate: data.offers[0].checkOutDate,
            guests: data.offers[0].guests.adults,
            rooms: data.roomQuantity || 1,
          },
        }}
      >
        <a>
          {!data.hotel.media || process.env.NODE_ENV === 'development' ? (
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
              src={data.hotel.media[0].uri}
              height='400px'
              className='borderRadius'
              width='400px'
              objectFit='cover'
              placeholder='blur'
              blurDataURL={`/images/placeholder/blur/hotel-${randomInt}.jpg`}
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
                {formatter.format(
                  dictionary
                    ? data.offers[0].price.total *
                        dictionary.currencyConversionLookupRates[
                          Object.keys(dictionary.currencyConversionLookupRates)[0]
                        ].rate
                    : data.offers[0].price.total,
                )}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize='sm' color='gray.400'>
            {data.hotel.rating ? `${data.hotel.rating} stars` : 'No rating'}{' '}
          </Text>
        </a>
      </NextLink>
    </Flex>
  );
}
