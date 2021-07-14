import { Flex, Text } from '@chakra-ui/react';
import NextImage from 'next/image';

export default function DisplayTile({ hotel }) {
  const hotelName = hotel.hotel.name.toLowerCase();
  return (
    <Flex direction='column' w={['50%', '50%', '33.3%', '25%']} p={4}>
      {hotel.hotel.media && (
        <NextImage src={hotel.hotel.media[0].uri} height='200px' width='200px' objectFit='cover' />
      )}
      <Flex mt={4} w='100%'>
        <Flex justify='space-between' w='100%'>
          <Text
            color='black'
            fontWeight='700'
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
    </Flex>
  );
}
