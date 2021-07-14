import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import NextImage from 'next/image';

export default function PromotionalTab({ adults, nights, cityName, cityCode, popularSearches }) {
  const cityLower = cityName.toLowerCase();
  console.log(adults);
  const data = { adults, nights, cityName, cityCode };
  return (
    <Flex
      w={['50%', '50%', '50%', '25%']}
      px={4}
      position='relative'
      _hover={{ pointer: 'cursor' }}
      onClick={() => popularSearches(data)}
    >
      <NextImage src={`/images/${cityLower}.jpg`} height='400px' width='400px' objectFit='cover' />
      <Box position='absolute' p={4} color='white' bottom='0' bg='brand.100' w='60%'>
        <Heading fontSize='lg'>{cityName}</Heading>
        <Text fontSize='sm'>
          {adults} adults for {nights} nights
        </Text>
      </Box>
    </Flex>
  );
}
