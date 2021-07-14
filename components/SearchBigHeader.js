import {
  Input,
  Text,
  Image,
  FormControl,
  Button,
  Flex,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Box,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import DatePicker from 'react-datepicker';
import { useState, useEffect, useRef } from 'react';
import { getHotels } from '@/utils/hotels';
import DisplayTile from './DisplayTile';
import DisplayTilesSkeleton from './DisplayTilesSkeleton';
import 'react-datepicker/dist/react-datepicker.css';
import Head from 'next/head';
import PromotionalTab from './PromotionalTab';

export default function SearchBigHeader() {
  useEffect(() => {
    AirportInput('addressSearch');
  }, []);

  const cityNameInput = useRef();
  const [data, setData] = useState(false);
  const [cityName, setCityName] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    let cityName = e.target.cityName.value;
    cityName = cityName.slice(3);
    const cityCode = e.target.addressSearch.getAttribute('data-iata');
    const adults = e.target.adults.value;
    const startDate = new Date(e.target.dateStart.value);
    const endDate = new Date(e.target.dateEnd.value);

    setCityName(cityName);
    const data = { cityCode, adults, startDate, endDate };
    console.log(data);
    const newData = await getHotels(data);
    setData(newData);
    setLoading(false);
  };

  const popularSearches = async ({ cityName, cityCode, adults, nights }) => {
    setLoading(true);
    setCityName(cityName);
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1 + nights);

    const data = { cityCode, adults, today, endDate };
    const newData = await getHotels(data);
    setData(newData);
    console.log(newData);
    setLoading(false);
  };
  return (
    <>
      <Head>
        <script src='https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js'></script>
      </Head>
      <Flex direction='column'>
        <Flex
          height={!data ? '50vh' : '20vh'}
          position='relative'
          justify='center'
          align='center'
          transition='all ease 0.5s'
        >
          <NextImage src='/images/roberto-nickson.jpg' layout='fill' objectFit='cover' />
          <FormControl as='form' onSubmit={handleSearch} maxW='900px' w='100%' p={8}>
            <Flex>
              <Input
                ref={cityNameInput}
                name='cityName'
                w='100%'
                mr={2}
                bg='white'
                id='addressSearch'
                placeholder='Where to?'
                bg='white'
                required
              />
              <DatePicker
                name='dateStart'
                id='dateStart'
                className='firstInput'
                variant='unstyled'
                selected={today || value}
                dateFormat='dd MMM yyyy'
                shouldCloseOnSelect
                placeholderText={'Check in date'}
                showTimeSelect={false}
                todayButton='Today'
                minDate={today}
              />

              <DatePicker
                name='dateEnd'
                id='dateEnd'
                className='secondInput'
                variant='unstyled'
                selected={tomorrow || value}
                dateFormat='dd MMM yyyy'
                shouldCloseOnSelect
                placeholderText={'Check out date'}
                showTimeSelect={false}
                minDate={tomorrow}
              />

              <NumberInput id='people' min={1} max={9} w='20%' required>
                <NumberInputField placeholder='Add guests' bg='white' name='adults' id='adults' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Button w='20%' ml={4} type='submit'>
                Submit
              </Button>
            </Flex>
          </FormControl>
        </Flex>
        {loading && <DisplayTilesSkeleton />}
        {data && !loading && (
          <>
            <Heading fontSize='2xl' p={8}>
              Results for {cityName}
            </Heading>
            <Flex px={4} justify='flex-start' align='flex-start' w='100%' wrap='wrap'>
              {data.data.length
                ? data.data.map((hotel) => {
                    console.log(hotel);
                    return <DisplayTile hotel={hotel} />;
                  })
                : !loading && (
                    <Heading as='h3' fontSize='xl' textAlign='center' w='100%'>
                      No results for those dates or location.
                    </Heading>
                  )}
            </Flex>
          </>
        )}
        <Box p={4}>
          <Heading fontSize='2xl' p={4}>
            Popular Searches
          </Heading>
          <Flex wrap='wrap'>
            <PromotionalTab
              adults={2}
              nights={2}
              cityName={'Melbourne'}
              cityCode={'MEL'}
              popularSearches={popularSearches}
            />
            <PromotionalTab
              adults={2}
              nights={3}
              cityName={'Sydney'}
              cityCode={'SYD'}
              popularSearches={popularSearches}
            />
            <PromotionalTab
              adults={4}
              nights={3}
              cityName={'Brisbane'}
              cityCode={'BNE'}
              popularSearches={popularSearches}
            />
            <PromotionalTab
              adults={2}
              nights={3}
              cityName={'Uluru'}
              cityCode={'AYQ'}
              popularSearches={popularSearches}
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
