import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { useAuth } from '@/utils/auth';
import fetcher from '@/utils/fetcher';
import { Heading, Grid, Flex, Text } from '@chakra-ui/react';
import useSWR from 'swr';

export default function BookingsPage() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString();
  const { data, error } = useSWR(user ? ['/api/bookings', user.token] : null, fetcher);
  console.log(data);
  if (!data) {
    return (
      <Layout>
        <Container>
          <Heading fontSize='2xl'>Loading Bookings</Heading>
        </Container>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Container>
          <Heading fontSize='2xl'>{error.message}</Heading>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout>
      <Container>
        <Heading fontSize='2xl' mb={8}>
          Bookings
        </Heading>
        <Grid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' w='100%'>
          {data.bookings.map((booking) => {
            return (
              <Flex
                opacity={
                  new Date(booking.hotelData.offers[0].checkInDate).toLocaleDateString() < today
                    ? '0.5'
                    : 1
                }
                key={booking.id}
                border='1px solid'
                borderColor={
                  new Date(booking.hotelData.offers[0].checkInDate).toLocaleDateString() < today
                    ? 'red'
                    : 'brand.100'
                }
                borderRadius='12px'
                m={2}
              >
                <Flex
                  bgColor={
                    new Date(booking.hotelData.offers[0].checkInDate).toLocaleDateString() < today
                      ? 'red'
                      : 'brand.100'
                  }
                  borderRadius='8px 0px 0px 8px'
                  width='50px'
                  position='relative'
                  align='center'
                  justify='center'
                  p={8}
                >
                  <Text transform='rotate(-90deg)' fontSize='4xl' fontWeight='900'>
                    {booking.hotelData.hotel.cityCode}
                  </Text>
                </Flex>
                <Flex p={4} direction='column'>
                  <Text fontSize='lg' mb={4}>
                    Hotel provider reference:{' '}
                    <strong>{booking.bookingInfo[0].providerConfirmationId}</strong>
                  </Text>
                  <Text fontSize='12px' fontWeight='700' color='gray.400'>
                    {booking.hotelData.offers[0].checkInDate} -{' '}
                    {booking.hotelData.offers[0].checkOutDate}
                  </Text>
                  <Heading
                    as='h2'
                    fontFamily="'Inter', sans-serif"
                    fontSize='2xl'
                    textTransform='capitalize'
                    mb={2}
                  >
                    {booking.hotelData.hotel.name.toLowerCase()}
                  </Heading>
                  {booking.hotelData.offers[0].policies.checkInOut && (
                    <Text fontSize='sm' mb={2}>
                      Check in after:{' '}
                      {booking.hotelData.offers[0].policies.checkInOut.checkIn.slice(0, -3)} | Check
                      out before:{' '}
                      {booking.hotelData.offers[0].policies.checkInOut.checkOut.slice(0, -3)}
                    </Text>
                  )}
                  <Text fontSize='sm' mb={2}>
                    Provided address:{' '}
                    <address>
                      <Flex wrap='wrap'>
                        {booking?.hotelData?.hotel?.address?.lines &&
                          booking.hotelData.hotel.address.lines.map((line, index) => {
                            return <Text mr='5px' key={index}>{`${line.toLowerCase()},`}</Text>;
                          })}
                        <Text>
                          {booking.hotelData.hotel.address.cityName &&
                            `${booking.hotelData.hotel.address.cityName.toLowerCase()}, `}
                          {booking.hotelData.hotel.address.postalCode &&
                            `${booking.hotelData.hotel.address.postalCode}, `}
                          {booking.hotelData.hotel.cityCode &&
                            `${booking.hotelData.hotel.cityCode}, `}
                          {booking.hotelData.hotel.address.stateCode &&
                            `${booking.hotelData.hotel.address.stateCode}, `}
                          {booking.hotelData.hotel.address.countryCode &&
                            `${booking.hotelData.hotel.address.countryCode}`}
                        </Text>
                      </Flex>
                    </address>
                  </Text>
                  {booking.hotelData.offers[0].policies.cancellation.deadline && (
                    <Text color='red' fontSize='sm'>
                      Cancellation Deadline:{' '}
                      {booking.hotelData.offers[0].policies.cancellation.deadline}
                    </Text>
                  )}
                </Flex>
              </Flex>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
}
