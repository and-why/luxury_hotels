import { Flex, Box, Text, Link } from '@chakra-ui/react';
import NextImage from 'next/image';

export default function PromotionalTab({ cityName, cityCode, guests, knownFor, popularSearches }) {
  const cityLower = cityName.toLowerCase();
  const data = { cityName, cityCode, guests };
  return (
    <Flex
      w={['50%', '25%', '25%', '25%']}
      px={2}
      mb={4}
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
          alt={`${cityLower} promo image`}
          src={`/images/promos/${cityLower}.jpg`}
          height='400px'
          width='400px'
          objectFit='cover'
          className='borderRadius relative'
          placeholder='blur'
          blurDataURL={`/images/promos/blur/${cityLower}.jpg`}
        />
        <Box m={2} maxW='90%' borderBottomLeftRadius='5px'>
          <Text fontSize='xl' fontWeight='600'>
            {cityName.replace('-', ', ')}
          </Text>
          {knownFor && <Text fontSize='sm'>{knownFor}</Text>}
        </Box>
      </Link>
    </Flex>
  );
}
