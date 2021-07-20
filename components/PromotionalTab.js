import { Flex, Box, Text, Heading, Link } from '@chakra-ui/react';
import NextImage from 'next/image';

export default function PromotionalTab({
  adults,
  nights,
  rooms,
  cityName,
  cityCode,
  popularSearches,
}) {
  const cityLower = cityName.toLowerCase();
  const data = { adults, nights, rooms, cityName, cityCode };
  return (
    <Flex
      w={['50%', '50%', '25%', '25%']}
      px={2}
      position='relative'
      pointer='cursor'
      transition='all 0.3s ease'
      bg='white'
      borderRadius='10px'
      _hover={{
        transform: 'scale(1.05)',
        transition: 'all 0.3s ease',
        zIndex: '99',
      }}
    >
      <Link onClick={() => popularSearches(data)} position='relative'>
        <NextImage
          src={`/images/${cityLower}.jpg`}
          height='400px'
          width='400px'
          objectFit='cover'
          className='borderRadius relative'
        />
        <Box mt={1} maxW='90%' borderBottomLeftRadius='5px'>
          <Text fontSize='sm' fontWeight='600'>
            {cityName}
          </Text>
          <Text fontSize='sm'>
            {adults} adults for {nights} nights
          </Text>
        </Box>
      </Link>
    </Flex>
  );
}
