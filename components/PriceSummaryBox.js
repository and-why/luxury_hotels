import Container from '@/components/Container';
import Layout from '@/components/Layout';
import PriceSummaryRow from '@/components/PriceSummaryRow';
import { useAuth } from '@/utils/auth';
import { formatDate, formatter, lengthOfStay } from '@/utils/functions';
import { getHotelByOfferId } from '@/utils/hotels';
import { Grid, Flex, Heading, Text, Box, Divider, Button } from '@chakra-ui/react';

export default function PriceSummaryBox({ result }) {
  const offer = result.data.offers[0];
  const dictionary = result.dictionaries;
  return (
    <Flex
      p={4}
      border='solid 1px'
      borderColor='brand.110'
      direction='column'
      borderRadius='12px'
      mb={4}
    >
      <Heading as='h3' fontSize='md' mb={4}>
        Your price summary
      </Heading>
      <Box mb={2}>
        <PriceSummaryRow
          price={offer.price.total}
          checkIn={offer.checkInDate}
          checkOut={offer.checkOutDate}
          dictionay={dictionary}
        />
      </Box>
      <Flex justify='space-between'>
        <Text fontSize='sm'>Tax 10%</Text>
        <Text fontSize='sm'>{formatter.format(offer.price.total * 0.1)}</Text>
      </Flex>
      <Divider my={4} />
      <Flex justify='space-between'>
        <Text fontSize='md' fontWeight='700'>
          Total
        </Text>
        <Text fontSize='md' fontWeight='700'>
          {formatter.format(offer.price.total * 1.1)}
        </Text>
      </Flex>
    </Flex>
  );
}
