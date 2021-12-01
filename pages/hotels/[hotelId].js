import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import SideForm from '@/components/SideForm';
import OfferTable from '@/components/OfferTable';
import {
  Flex,
  Heading,
  Link,
  Box,
  Button,
  Text,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getHotelById } from '@/utils/hotels';
import Layout from '@/components/Layout';
import NextLink from 'next/link';
import NextImage from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import HotelMap from '@/components/HotelMap';
import Container from '@/components/Container';
import { useAuth } from '@/utils/auth';
import { createFavourite, deleteFavourite } from '@/utils/db';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';

export default function HotelPage({ hotelId, result, checkInDate, checkOutDate, guests, rooms }) {
  const router = useRouter();
  const { user } = useAuth();
  const [hotelData, setHotelData] = useState(result);
  const [isFavourite, setFavourite] = useState(false);
  const [currentFavId, setCurrentFavId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, error } = useSWR(user ? ['/api/favourites', user.token] : null, fetcher);

  const handleFavourite = async () => {
    const userId = user?.uid;

    if (!isFavourite) {
      const favourite = { userId, ...hotelData.data.hotel };
      // updateFavourites(userId, favourite);
      const { id } = createFavourite(favourite);

      mutate(
        ['/api/favourites', user.token],
        async (data) => ({ favourites: [...data.favourites, { id, ...favourite }] }),
        false,
      );
      return;
    } else {
      const currentFaveId = data?.favourites.filter((hotel) => hotel.hotelId === hotelId)[0].id;

      deleteFavourite(currentFaveId);
      mutate(
        ['/api/favourites', user.token],
        async (data) => {
          return {
            favourites: data.favourites.filter((fav) => fav.id !== currentFaveId),
          };
        },
        false,
      );
      return setFavourite(false);
    }
  };

  const addSearchData = useCallback(
    (data) => {
      const [checkInDate, checkOutDate, guests, rooms] = data;

      router.push({
        pathname: `/hotels/${hotelId}`,
        query: {
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          guests: guests,
          rooms: rooms,
        },
      });
    },
    [hotelId, router],
  );

  useEffect(() => {
    if (user && result.data) {
      setHotelData(result);
    }
    if (data) {
      setFavourite(data.favourites.some((favourite) => favourite.hotelId === hotelId));
    }
  }, [user, addSearchData, result, data, hotelId]);

  if (error) {
    return <p>{error.message}</p>;
  }
  if (hotelData.errors) {
    return (
      <Layout>
        <Container>
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
              <SideForm
                addSearchData={addSearchData}
                hotelId={hotelId}
                dictionary={result.dictionaries ? result.dictionaries : null}
              />
            </Flex>
          </Flex>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex align='center' justify='center'>
        <Flex w='100%' maxW='1440px' justify='space-between' direction='column' px={[2, 4, 16, 32]}>
          <Flex direction='column' mb={2}>
            <Heading mb={2}>{hotelData.data.hotel.name}</Heading>
            <Flex align='center' w='100%' justify='space-between'>
              <Flex>
                <Flex align='center' mr={4}>
                  <Text fontWeight='600'>{hotelData.data.hotel.rating}</Text>
                  <StarIcon ml={1} color='brand.100' />
                </Flex>
                <Flex mr={4} textTransform='capitalize'>
                  <Link
                    href={`https://www.google.com/maps/place/${hotelData.data.hotel.latitude},${hotelData.data.hotel.longitude}`}
                  >
                    <address>
                      <Flex wrap='wrap'>
                        {hotelData.data.hotel.address.lines.map((line, index) => {
                          return <Text mr='5px' key={index}>{`${line.toLowerCase()},`}</Text>;
                        })}
                        <Text>
                          {hotelData.data.hotel.address.cityName.toLowerCase()},{' '}
                          {hotelData.data.hotel.address.postalCode}, {hotelData.data.hotel.cityCode}
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
          <Box w='100%' position='relative'>
            {!hotelData.data.hotel.media ? (
              <Box w='100%' p={1} onClick={onOpen} position='relative' cursor='pointer'>
                <NextImage
                  src={'/images/roberto-nickson-room.jpg'}
                  alt={`${hotelData.data.hotel.name} image`}
                  className='borderRadius2'
                  placeholder='blur'
                  blurDataURL={'/images/blur/roberto-nickson-room.jpg'}
                  height='450px'
                  width='1200px'
                  objectFit='cover'
                />
              </Box>
            ) : (
              <Box w='100%' p={1} onClick={onOpen} position='relative'>
                <NextImage
                  src={hotelData.data.hotel.media[0].uri}
                  alt={`${hotelData.data.hotel.name} image`}
                  className='borderRadius2'
                  placeholder='blur'
                  blurDataURL={'/images/blur/roberto-nickson-room.jpg'}
                  height='450px'
                  width='1200px'
                  objectFit='cover'
                />
              </Box>
            )}
            <Box
              cursor='pointer'
              h='100%'
              w='100%'
              position='absolute'
              opacity='0'
              top='0'
              transition='all ease 0.3s'
              _hover={{ opacity: '1', transition: 'all ease 0.3s' }}
            >
              <Button
                colorScheme='blackAlpha'
                // height='100%'
                // width='100%'
                onClick={onOpen}
                position='absolute'
                top='50%'
                right='50%'
                transform='translate(50%, -50%)'
              >
                View all images
              </Button>
            </Box>
            <Drawer onClose={onClose} isOpen={isOpen} size='full' placement='bottom' w='100%'>
              <DrawerOverlay />
              <DrawerContent w='100%'>
                <DrawerHeader>
                  <Flex justify='space-between'>
                    <Heading>Gallary</Heading>
                    <Button variant='ghost' onClick={onClose} _hover={{ bg: 'black.100' }}>
                      Close
                    </Button>
                  </Flex>
                </DrawerHeader>
                <DrawerBody w='100%'>
                  {hotelData.data.hotel.media ? (
                    <Flex flexWrap={('nowrap', 'nowrap', 'wrap')}>
                      {hotelData.data.hotel.media.map((image) => {
                        const randomInt = Math.floor(Math.random() * 7);
                        return (
                          <Box key={image.uri} w={('100%', '100%', '50%')} p={1}>
                            <NextImage
                              alt={hotelData.data.hotel.name}
                              src={image.uri}
                              width='600px'
                              height='400px'
                              objectFit='cover'
                              placeholder='blur'
                              blurDataURL={`/images/placeholder/hotel-${randomInt}.jpg`}
                            />
                          </Box>
                        );
                      })}
                    </Flex>
                  ) : (
                    <p>Unfortunately, there are no images for this property</p>
                  )}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
          {/* Main Content */}
          <Flex direction='row' wrap='wrap' justify='space-between' align='flex-start' mb={4}>
            <Flex direction='column' w={['100%', '100%', '50%', '60%']} p={4}>
              {hotelData.data.hotel.description && (
                <>
                  <Heading as='h3' fontSize='lg' fontWeight='600' mb={4}>
                    Description
                  </Heading>
                  <Text mb={8}>{hotelData.data.hotel.description.text}</Text>{' '}
                </>
              )}
              {hotelData.data.hotel.latitude && hotelData.data.hotel.longitude && (
                <Box mb={8}>
                  <HotelMap
                    name={hotelData.data.hotel.name}
                    latitude={hotelData.data.hotel.latitude}
                    longitude={hotelData.data.hotel.longitude}
                  />
                </Box>
              )}
            </Flex>
            <Flex w={['100%', 'auto', '50%', '40%']} p={4} id='form'>
              <SideForm
                addSearchData={addSearchData}
                data={hotelData}
                dictionary={result.dictionaries ? result.dictionaries : null}
              />
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
              {hotelData.data.hotel.amenities.map((amenity, index) => {
                return (
                  <Text as='span' key={index}>{`${amenity
                    .toLowerCase()
                    .replace(/_/g, ' ')} • `}</Text>
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
                  {hotelData.data.offers[0].checkInDate}
                </Text>
                , Check Out:{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {hotelData.data.offers[0].checkOutDate}
                </Text>
                .
              </Text>
              <Text textTransform='uppercase' fontSize='xl' color='gray.600'>
                For{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {hotelData.data.offers[0].guests.adults}
                </Text>{' '}
                adult
                {hotelData.data.offers[0].guests.adults && 's'} in{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {hotelData.data.offers[0].roomQuantity
                    ? hotelData.data.offers[0].roomQuantity
                    : '1'}
                </Text>{' '}
                room
                {hotelData.data.offers[0].roomQuantity > 1 && 's'} for{' '}
                <Text as='span' fontSize='2xl' fontWeight='600'>
                  {(new Date(hotelData.data.offers[0].checkOutDate) -
                    new Date(hotelData.data.offers[0].checkInDate)) /
                    24 /
                    60 /
                    60 /
                    1000}
                </Text>{' '}
                nights
              </Text>
            </Box>
            <Box overflowX='scroll' w='100%'>
              <OfferTable
                offers={hotelData.data.offers}
                dictionary={result.dictionaries ? result.dictionaries : null}
              />
            </Box>
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

  // console.log('returned to [hotelId].js data.result', data.result);

  return {
    props: {
      hotelId: hotelId,
      result: data.result,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: guests,
      rooms: rooms,
    },
  };
}
