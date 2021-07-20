import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getHotels } from '@/utils/hotels';
import DisplayTile from './DisplayTile';
import DisplayTilesSkeleton from './DisplayTilesSkeleton';
import PromotionalTab from './PromotionalTab';

export default function SearchBigHeader() {
  const cityNameInput = useRef();
  const [data, setData] = useState(false);
  const [cityName, setCityName] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [isError, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cityCode = e.target.addressSearch.getAttribute('data-iata');
    if (cityCode === null) {
      setLoading(false);
      return setError(true);
    }
    let cityName = e.target.cityName.value;
    cityName = cityName.slice(3);
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
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1 + nights);

    const data = { cityCode, adults, startDate, endDate };
    const newData = await getHotels(data);
    setData(newData.data);

    setLoading(false);
  };

  useEffect(() => {
    AirportInput('addressSearch');
  }, []);
  return (
    <>
      <Flex direction='column'>
        <Flex
          height={!data ? '50vh' : '20vh'}
          position='relative'
          justify='center'
          align='center'
          transition='all ease 0.5s'
        >
          <NextImage src='/images/roberto-nickson.jpg' layout='fill' objectFit='cover' />
          <FormControl
            as='form'
            onSubmit={handleSearch}
            maxW='900px'
            w='100%'
            p={8}
            autoComplete='off'
          >
            <Flex justify='space-evenly'>
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
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
                selected={endDate}
                onChange={(date) => setEndDate(date)}
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

              <Popover onClose={() => setError(false)}>
                <PopoverTrigger>
                  <Button
                    w='20%'
                    type='submit'
                    ml={4}
                    bg='brand.100'
                    _hover={{ backgroundColor: 'brand.150' }}
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </PopoverTrigger>
                {isError && (
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight='600'>Select Location!</PopoverHeader>
                    <PopoverBody>
                      Please select the closest airport from the city dropdown?
                    </PopoverBody>
                  </PopoverContent>
                )}
              </Popover>
            </Flex>
          </FormControl>
        </Flex>
        {loading && <DisplayTilesSkeleton />}
        {data && !loading && (
          <>
            <Heading fontSize='2xl' p={8}>
              Results for {cityName}
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
          </>
        )}
        <Box p={4} transition='all ease 0.5s'>
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
