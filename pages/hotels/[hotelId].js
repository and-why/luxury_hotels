import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideForm from '@/components/SideForm';
import OfferTable from '@/components/OfferTable';
import { Flex, Heading, Link, Box, Button, Text, Icon } from '@chakra-ui/react';
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getHotelById } from '@/utils/hotels';
import Layout from '@/components/Layout';
import NextLink from 'next/link';
import NextImage from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import HotelMap from '@/components/HotelMap';
import { useAuth } from '@/utils/auth';
import { updateFavourites, removeFromFavourites } from '@/utils/db';
import { mutate } from 'swr';

export default function HotelPage({ data, checkInDate, checkOutDate, guests, rooms }) {
  console.log('hotelId Page ', data);
  const router = useRouter();
  const { user } = useAuth();

  const [hotelData, setHotelData] = useState(data.data ? data.data : data);

  const [isFavourite, setFavourite] = useState(false);

  const handleFavourite = async () => {
    const userId = user?.uid;
    const favourite = { userId, ...hotelData.hotel };
    console.log(isFavourite);
    if (!isFavourite) {
      updateFavourites(userId, favourite);
      const newData = user.hotelIds.push(hotelData.hotel.hotelId);
      setFavourite(true);
      return mutate(user, { ...user, hotelIds: newData }, true);
    } else {
      const newData = user.hotelIds.filter((hotelId) => hotelId !== hotelData.hotel.hotelId);
      removeFromFavourites(userId, favourite);
      setFavourite(false);
      return mutate(user, { ...user, hotelIds: newData }, true);
    }
  };

  const addSearchData = (data) => {
    const [checkInDate, checkOutDate, guests, rooms] = data;

    router.push({
      pathname: `/hotels/${hotelData.hotel.hotelId}`,
      query: {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests,
        rooms: rooms,
      },
    });
    // setLoading(false);
  };

  useEffect(() => {
    if (user && data.data) {
      setFavourite(user.hotelIds.includes(hotelData.hotel.hotelId));
    }
  }, [user]);

  if (hotelData.errors) {
    return (
      <Layout>
        <Flex align='center' justify='center' px={[2, 4, 16, 32]}>
          <Flex w='100%' maxW='1440px' justify='space-between' direction='column'>
            <NextLink href='/'>
              <Link>
                <Button variant='ghost' size='sm' mb={2}>
                  <ArrowBackIcon mr={2} />
                  <Text fontSize='sm'>Back to Home</Text>
                </Button>
              </Link>
            </NextLink>
            <Flex align='center' direction='column' justify='center' px={[2, 4, 16, 32]}>
              <Heading textTransform='capitalize' as='h3' fontSize='lg' mb={4}>
                Sorry. {hotelData.errors[0].title.toLowerCase()}
              </Heading>
              <Text mb={8}>Try another date or search combination.</Text>
              <SideForm addSearchData={addSearchData} />
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex align='center' justify='center'>
        <Flex w='100%' maxW='1440px' justify='space-between' direction='column' px={[2, 4, 16, 32]}>
          {/* <NextLink href='/'>
            <Link>
              <Button variant='ghost' size='sm' mb={2}>
                <ArrowBackIcon mr={2} />
                <Text fontSize='sm'>Back to Home</Text>
              </Button>
            </Link>
          </NextLink> */}

          <Flex direction='column' mb={2}>
            <Heading mb={2}>{hotelData.hotel.name}</Heading>
            <Flex align='center' w='100%' justify='space-between'>
              <Flex>
                <Flex align='center' mr={4}>
                  <Text fontWeight='600'>{hotelData.hotel.rating}</Text>
                  <StarIcon ml={1} color='brand.100' />
                </Flex>
                <Flex mr={4} textTransform='capitalize'>
                  <Link
                    href={`https://www.google.com/maps/place/${hotelData.hotel.latitude},${hotelData.hotel.longitude}`}
                  >
                    <address>
                      <Flex>
                        {hotelData.hotel.address.lines.map((line, index) => {
                          return <Text mr='5px' key={index}>{`${line.toLowerCase()},`}</Text>;
                        })}
                        <Text>
                          {hotelData.hotel.address.cityName.toLowerCase()},{' '}
                          {hotelData.hotel.address.postalCode}, {hotelData.hotel.cityCode}
                        </Text>
                      </Flex>
                    </address>
                  </Link>
                </Flex>
              </Flex>
              <Flex align='center'>
                {user && (
                  <Button size='sm' variant='ghost' onClick={handleFavourite}>
                    <Text fontWeight='600' fontSize='sm' mr={1}>
                      Favourite
                    </Text>
                    <Icon
                      color={isFavourite ? 'red' : 'black'}
                      as={isFavourite ? AiFillHeart : AiOutlineHeart}
                      h='20px'
                      w='20px'
                    />
                  </Button>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex w='100%'>
            {hotelData.hotel.media[0] &&
              hotelData.hotel.media.map((image, index) => (
                <Flex key={index} wrap='wrap' w='100%' mb={8}>
                  {index === 0 && process.env.NODE_ENV /*=== 'development' */ ? (
                    <Box w='100%' p={1} w='100%'>
                      <NextImage
                        className='borderRadius2'
                        src={'/images/roberto-nickson-room.jpg'}
                        placeholder='blur'
                        blurDataURL={'/images/blur/roberto-nickson-room.jpg'}
                        height='550px'
                        width='1440px'
                        objectFit='cover'
                      />
                    </Box>
                  ) : (
                    <Box w='100%'>
                      <NextImage src={image.uri} height='550px' width='550px' objectFit='cover' />
                    </Box>
                  )}
                  {index > 0 && index < 6 && (
                    <Flex>
                      <Box p={1}>
                        {<NextImage key={index} src={image.uri} height='550px' width='550px' />}
                      </Box>
                    </Flex>
                  )}
                </Flex>
              ))}
          </Flex>
          {/* Main Content */}
          <Flex direction='row' wrap='wrap' justify='space-between' align='flex-start' mb={4}>
            <Flex direction='column' w={['100%', '100%', '50%', '60%']} p={4}>
              {hotelData.hotel.description && (
                <>
                  <Heading as='h3' fontSize='lg' fontWeight='600' mb={4}>
                    Description
                  </Heading>
                  <Text mb={8}>{hotelData.hotel.description.text}</Text>{' '}
                </>
              )}
              <Box mb={8}>
                <HotelMap
                  name={hotelData.hotel.name}
                  latitude={hotelData.hotel.latitude}
                  longitude={hotelData.hotel.longitude}
                />
              </Box>
            </Flex>
            <Flex w={['100%', 'auto', '50%', '40%']} p={4} id='form'>
              <SideForm addSearchData={addSearchData} data={hotelData} />
            </Flex>
          </Flex>
          <Flex
            wrap='wrap'
            justify='flex-start'
            align='flex-start'
            px={4}
            mb={4}
            direction='column'
          >
            <Heading as='h4' fontSize='lg' fontWeight='600' mb={4}>
              Amenities
            </Heading>
            <Text textTransform='capitalize' mb={16}>
              {hotelData.hotel.amenities.map((amenity, index) => {
                return (
                  <Text as='span' key={index}>{`${amenity
                    .toLowerCase()
                    .replaceAll('_', ' ')} • `}</Text>
                );
              })}
            </Text>
            <Heading as='h4' fontSize='lg' fontWeight='600' mb={4}>
              Offers
            </Heading>
            <Box as='a' bg='gray.100' p={4} my={4} w='100%' href='#form'>
              <Text textTransform='uppercase' fontSize='xl' color='gray.600'>
                Check In:{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {hotelData.offers[0].checkInDate}
                </Text>
                , Check Out:{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {hotelData.offers[0].checkOutDate}
                </Text>
                .
              </Text>
              <Text textTransform='uppercase' fontSize='xl' color='gray.600'>
                For{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {hotelData.offers[0].guests.adults}
                </Text>{' '}
                adult
                {hotelData.offers[0].guests.adults && 's'} in{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {hotelData.offers[0].roomQuantity ? hotelData.offers[0].roomQuantity : '1'}
                </Text>{' '}
                room
                {hotelData.offers[0].roomQuantity > 1 && 's'} for{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {(new Date(hotelData.offers[0].checkOutDate) -
                    new Date(hotelData.offers[0].checkInDate)) /
                    24 /
                    60 /
                    60 /
                    1000}
                </Text>{' '}
                nights
              </Text>
            </Box>
            <OfferTable offers={hotelData.offers} />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const hotelId = context.params.hotelId;
  const { checkInDate, checkOutDate, hotelId, guests, rooms } = context.query;
  const data = await getHotelById(hotelId, checkInDate, checkOutDate, guests, rooms);

  return {
    props: {
      data: data,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: guests,
      rooms: rooms,
    },
  };
}
