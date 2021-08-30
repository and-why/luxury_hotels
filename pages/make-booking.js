import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { formatDate, lengthOfStay } from '@/utils/functions';
import { getHotelByOfferId } from '@/utils/hotels';
import { Grid, Flex, Heading, Text, Box, Divider } from '@chakra-ui/react';

export default function MakeBookingPage({ result }) {
  console.log(result);
  const hotel = result.data.hotel;
  const offer = result.data.offers[0];
  return (
    <Layout>
      <Container>
        <Grid templateColumns='1fr 2fr' w='100%'>
          <Flex p={4} border='solid 1px' borderColor='brand.100' direction='column'>
            <Heading as='h3' fontSize='md' mb={4}>
              Your booking information
            </Heading>
            <Flex justify='space-between'>
              <Box w='100%'>
                <Text fontSize='sm'>Check-in</Text>
                <Text fontWeight='700' fontSize='sm'>
                  {new Date(offer.checkInDate).toLocaleDateString()}
                </Text>
              </Box>
              <Divider orientation='vertical' height='20px' px={4} />
              <Box w='100%'>
                <Text fontSize='sm'>Check-out</Text>
                <Text fontWeight='700' fontSize='sm'>
                  {new Date(offer.checkOutDate).toLocaleDateString()}
                </Text>
              </Box>
            </Flex>
            <Text>{lengthOfStay(offer.checkInDate, offer.checkOutDate)}</Text>
            <Text textTransform='capitalize'>{hotel.name.toLowerCase()}</Text>
          </Flex>
          <Flex p={4}>
            <Heading as='h3' fontSize='md'>
              Booking Form
            </Heading>
          </Flex>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const offerId = query.offerId;
  const data = await getHotelByOfferId(offerId);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: { result: data.result },
  };
}
