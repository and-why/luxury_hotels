import BookingInformation from '@/components/BookingInformation';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import LoginBox from '@/components/LoginBox';
import PoliciesBox from '@/components/PoliciesBox';
import PriceSummaryBox from '@/components/PriceSummaryBox';
import PriceSummaryRow from '@/components/PriceSummaryRow';
import rawCountries from '@/lib/coutryDialingCodes';
import { useAuth } from '@/utils/auth';
import { formatDate, formatter, lengthOfStay } from '@/utils/functions';
import { getHotelByOfferId, makeBooking } from '@/utils/hotels';
import useForm from '@/utils/useForm';
import {
  Grid,
  Flex,
  Heading,
  Text,
  Box,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillCodeSandboxCircle } from 'react-icons/ai';
import { ImCreditCard } from 'react-icons/im';
import { vendorCodes } from '@/lib/vendorCodes';
import { months } from '@/lib/months';
import { addBookingDetails } from '@/utils/db';

export default function MakeBookingPage({ result }) {
  const [loading, setLoading] = useState();
  // const [displayForm, ]
  const { user } = useAuth();

  const hotel = result.data.hotel;
  const offer = result.data.offers[0];
  const router = useRouter();

  let cards = vendorCodes.filter((o1) =>
    offer.policies.guarantee.acceptedPayments.creditCards.some((o2) => o1.code === o2),
  );

  console.log(result);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    title: user?.gender === 'male' ? 'MR' : '',
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    ext: '+61',
    phone: '411111111',
    email: user?.email || '',
    method: 'creditCard',
    vendorCode: 'VI',
    cardNumber: '4111111111111111',
    year: '2023',
    month: '01',
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const guestInfo = {
      title: inputs.title,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      phone: inputs.ext + inputs.phone,
      email: inputs.email,
    };
    const payment = {
      method: inputs.method,
      vendorCode: inputs.vendorCode,
      cardNumber: inputs.cardNumber,
      expiryDate: `${inputs.year}-${inputs.month}`,
    };
    const res = await makeBooking(offer.id, guestInfo, payment);

    const data = {
      userId: user.id,
      hotelId: hotel.hotelId,
      hotelData: result.data,
      bookingInfo: res.data,
    };
    addBookingDetails(data);

    if (res.result.data) {
      router.push({
        pathname: '/booking-confirmation',
        query: {
          hotelConfirmation: res.result.data[0].providerConfirmationId,
          bookingConfirmation: res.result.data[0].associatedRecords[0].reference,
        },
      });
    }
  };

  return (
    <Layout>
      <Container>
        <Grid templateColumns={['1fr', '1fr', '1fr 2fr']} w='100%'>
          <Box>
            <BookingInformation result={result} />
            <PriceSummaryBox result={result} />
            <PoliciesBox result={result} cards={cards} />
          </Box>
          <Flex px={[0, 0, 8]} py={[8, 8, 0]} direction='column' order={['-1', '-1', 1]}>
            <Heading as='h3' fontSize='xl' mb={4}>
              Booking Form
            </Heading>
            {!user && <LoginBox />}
            <Heading as='h4' fontSize='md' mb={4}>
              Enter your details
            </Heading>
            <FormControl
              as='form'
              onSubmit={handleBookingSubmit}
              bg='gray.100'
              borderRadius='12px'
              p={4}
            >
              <Grid templateColumns='repeat(auto-fit, minmax(100px, 1fr))' columnGap={4}>
                <FormControl mb={2} mr={4}>
                  <FormLabel
                    m='0'
                    p='0'
                    mr={4}
                    fontSize='10px'
                    textTransform='uppercase'
                    fontWeight='600'
                  >
                    First Name *
                  </FormLabel>
                  <Input
                    bg='white'
                    required
                    name='title'
                    type='text'
                    onChange={handleChange}
                    value={inputs?.title}
                    placeholder='Title'
                  />
                </FormControl>
                <FormControl mb={2} mr={4}>
                  <FormLabel
                    m='0'
                    p='0'
                    mr={4}
                    fontSize='10px'
                    textTransform='uppercase'
                    fontWeight='600'
                  >
                    First Name *
                  </FormLabel>
                  <Input
                    bg='white'
                    required
                    name='firstName'
                    type='text'
                    onChange={handleChange}
                    value={inputs?.firstName}
                    placeholder='First name'
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel m='0' p='0' fontSize='10px' textTransform='uppercase' fontWeight='600'>
                    Last Name *
                  </FormLabel>
                  <Input
                    bg='white'
                    required
                    name='lastName'
                    type='text'
                    onChange={handleChange}
                    value={inputs?.lastName}
                    placeholder='First name'
                  />
                </FormControl>
              </Grid>
              <Grid templateColumns='repeat(auto-fit, minmax(100px, 1fr))' columnGap={8}>
                <FormControl mb={4}>
                  <FormLabel m='0' p='0' fontSize='10px' textTransform='uppercase' fontWeight='600'>
                    Extension *
                  </FormLabel>
                  <Select
                    bg='white'
                    required
                    name='ext'
                    onChange={handleChange}
                    value={inputs?.ext}
                    placeholder='Phone extension'
                  >
                    {rawCountries.map((country, index) => (
                      <option value={`+${country[3]}`} key={index}>
                        {country[0]}: +{country[3]}{' '}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4} mr={4}>
                  <FormLabel m='0' p='0' fontSize='10px' textTransform='uppercase' fontWeight='600'>
                    Contact Phone Number *
                  </FormLabel>
                  <Input
                    bg='white'
                    required
                    name='phone'
                    type='text'
                    onChange={handleChange}
                    value={+inputs?.phone}
                    placeholder='Phone Number'
                  />
                </FormControl>
              </Grid>
              <FormControl mb={4}>
                <FormLabel m='0' p='0' fontSize='10px' textTransform='uppercase' fontWeight='600'>
                  Email Address *
                </FormLabel>
                <Input
                  bg='white'
                  required
                  name='email'
                  type='text'
                  onChange={handleChange}
                  value={inputs?.email}
                  placeholder='Email'
                />
              </FormControl>
              <Flex direction='column'>
                <Heading as='h3' fontSize='md' mb={2}>
                  Payment Details
                </Heading>
                <Text fontSize='xs' fontWeight='700' mb={4} color='red'>
                  Important: Cancellations must be dealt with directly with the hotel. Sonder
                  Escapes can not facilitate any cancellations. See Policies section on this page
                  for more information.
                </Text>
                <FormControl mb={4} mr={4}>
                  <FormLabel m='0' p='0' fontSize='10px' textTransform='uppercase' fontWeight='600'>
                    Credit Card Vendor *
                  </FormLabel>
                  <Select
                    bg='white'
                    required
                    name='vendorCode'
                    type='text'
                    onChange={handleChange}
                    value={inputs?.vendorCode}
                    placeholder='Card Vendor'
                  >
                    {cards.map((card) => (
                      <option key={card.code} value={card.code}>
                        {card.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4} mr={4}>
                  <FormLabel m='0' p='0' fontSize='10px' textTransform='uppercase' fontWeight='600'>
                    Credit Card Number *
                  </FormLabel>
                  <Input
                    bg='white'
                    required
                    name='cardNumber'
                    type='text'
                    maxlength={inputs?.vendorCode === 'AX' ? 15 : 16}
                    onChange={handleChange}
                    value={inputs?.cardNumber}
                    placeholder='Phone Number'
                  />
                </FormControl>
              </Flex>
              <FormLabel m='0' p='0' fontSize='10px' textTransform='uppercase' fontWeight='600'>
                Credit Card Expiry *
              </FormLabel>
              <Flex>
                <FormControl mb={4} mr={4}>
                  <Select
                    required
                    bg='white'
                    required
                    name='month'
                    onChange={handleChange}
                    value={inputs?.month}
                    placeholder='Month'
                  >
                    {months.map((month) => (
                      <option key={month.code} value={month.code}>
                        {month.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <Input
                    bg='white'
                    required
                    name='year'
                    type='text'
                    maxlength='4'
                    minlength='4'
                    onChange={handleChange}
                    value={inputs?.year}
                    placeholder='2025'
                  />
                </FormControl>
              </Flex>
              <Flex justify='flex-end'>
                <Button type='submit' bgColor='brand.150'>
                  Book Now
                </Button>
              </Flex>
            </FormControl>
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
  if (!data.result) {
    return { notFound: true };
  }

  return {
    props: {
      result: data.result,
    },
  };
}
