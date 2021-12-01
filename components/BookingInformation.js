import { lengthOfStay } from '@/utils/functions';
import { Flex, Heading, Text, Box } from '@chakra-ui/react';

export default function BookingInformation({ result }) {
  const hotel = result.data.hotel;
  const offer = result.data.offers[0];
  return (
    <Flex
      p={4}
      border='solid 1px'
      borderColor='brand.110'
      direction='column'
      mb={4}
      borderRadius='12px'
    >
      <Heading as='h3' fontSize='md' mb={4}>
        Your booking information
      </Heading>
      <Box mb={4}>
        <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
          Hotel name:
        </Heading>
        <Text fontSize='lg' fontWeight='700' textTransform='capitalize'>
          {hotel.name.toLowerCase()}
        </Text>
      </Box>
      <Flex justify='space-between' mb={4}>
        <Box>
          <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
            Check-in
          </Heading>
          <Text fontWeight='700' fontSize='sm'>
            {new Date(offer.checkInDate).toLocaleDateString()}
          </Text>
          {offer?.policies?.checkInOut && (
            <Text fontWeight='400' fontSize='12px'>
              After: {offer?.policies?.checkInOut?.checkIn.slice(0, -3)}
            </Text>
          )}
        </Box>

        <Box>
          <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
            Check-out
          </Heading>
          <Text fontWeight='700' fontSize='sm'>
            {new Date(offer.checkOutDate).toLocaleDateString()}
          </Text>
          {offer?.policies?.checkInOut && (
            <Text fontWeight='400' fontSize='12px'>
              Before: {offer?.policies?.checkInOut?.checkOut.slice(0, -3)}
            </Text>
          )}
        </Box>
      </Flex>
      <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
        Length of stay:
      </Heading>
      <Box mb={4}>
        <Text fontWeight='700' fontSize='sm'>
          {lengthOfStay(offer.checkInDate, offer.checkOutDate)} night
          {lengthOfStay(offer.checkInDate, offer.checkOutDate) > 1 && 's'}
        </Text>
      </Box>

      {offer?.room?.typeEstimated?.bedType && (
        <Flex justify='space-between'>
          <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
            Room Type
          </Heading>

          <Text fontSize='sm' fontWeight='700' textTransform='capitalize'>
            {offer?.room?.typeEstimated?.bedType.toLowerCase()}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
