import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import {
  Button,
  Flex,
  Heading,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getHotels } from '@/utils/hotels';
import DisplayTile from './DisplayTile';
import DisplayTilesSkeleton from './DisplayTilesSkeleton';
import PromotionalTab from './PromotionalTab';
import FullSearchForm from './FullSearchForm';

export default function SearchBigHeader() {
  const [data, setData] = useState(false);
  const [cityName, setCityName] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addSearchData = async (data) => {
    setLoading(true);
    onClose();

    const [cityCode, checkInDate, checkOutDate, guests, rooms] = data;
    const newData = await getHotels({ cityCode, checkInDate, checkOutDate, guests, rooms });
    setData(newData.data);
    console.log('data received to be set', newData);
    setLoading(false);
  };

  const popularSearches = async ({ cityName, cityCode, rooms, guests, nights }) => {
    setLoading(true);
    setCityName(cityName);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7 + nights);

    const data = { cityCode, guests, startDate, endDate, rooms };
    const newData = await getHotels(data);
    setData(newData.data);

    setLoading(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Flex direction='column' align='center' w='100%'>
        <Flex
          height={!data ? '50vh' : '30vh'}
          minH='200px'
          w='100%'
          position='relative'
          justify='center'
          align='center'
          transition='all ease 0.5s'
        >
          <NextImage
            src='/images/roberto-nickson.jpg'
            placeholder='blur'
            blurDataURL='/images/blur/roberto-nickson.jpg'
            layout='fill'
            objectFit='cover'
          />
          <Flex direction='column' p={4}>
            <Heading
              color='white'
              zIndex='99'
              mb={8}
              fontWeight='600'
              textShadow='0 0 2px rgba(0,0,0,0.3)'
            >
              Find the best luxury hotels
            </Heading>
            <Button
              bg='white'
              fontWeight='400'
              color='gray.400'
              onClick={onOpen}
              cursor='text'
              _hover={{ backgroundColor: 'white', color: 'black' }}
            >
              Where are you going?
            </Button>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={8}>
              <ModalCloseButton />
              <ModalBody>
                <FullSearchForm addSearchData={addSearchData} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
        {loading && <DisplayTilesSkeleton />}
        {data && !loading && (
          <Flex
            w='100%'
            maxW='1440px'
            px={[2, 4, 16, 32]}
            py={4}
            direction='column'
            justify='space-between'
          >
            <Heading fontSize='2xl' p={4}>
              Search Results
            </Heading>
            <Flex
              px={2}
              justify='flex-start'
              align='flex-start'
              w='100%'
              wrap='wrap'
              transition='all ease 0.5s'
            >
              {data.length
                ? data.map((hotel, index) => {
                    console.log(hotel);
                    return <DisplayTile key={index} hotel={hotel} />;
                  })
                : !loading && (
                    <Heading as='h3' fontSize='xl' textAlign='center' w='100%'>
                      No results for those dates or location.
                    </Heading>
                  )}
            </Flex>
          </Flex>
        )}
        <Flex
          p={4}
          transition='all ease 0.5s'
          w='100%'
          maxW='1440px'
          px={[2, 4, 16, 32]}
          py={4}
          direction='column'
          justify='space-between'
          align='center'
        >
          <Box>
            <Heading fontSize='2xl' p={4}>
              Popular Searches
            </Heading>
            <Flex wrap='wrap'>
              <PromotionalTab
                adults={2}
                nights={2}
                rooms={1}
                cityName={'Melbourne'}
                cityCode={'MEL'}
                popularSearches={popularSearches}
              />
              <PromotionalTab
                adults={2}
                nights={3}
                rooms={1}
                cityName={'Sydney'}
                cityCode={'SYD'}
                popularSearches={popularSearches}
              />
              <PromotionalTab
                adults={2}
                nights={3}
                rooms={1}
                cityName={'Auckland'}
                cityCode={'AKL'}
                popularSearches={popularSearches}
              />
              <PromotionalTab
                adults={2}
                nights={3}
                rooms={1}
                cityName={'Uluru'}
                cityCode={'AYQ'}
                popularSearches={popularSearches}
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
