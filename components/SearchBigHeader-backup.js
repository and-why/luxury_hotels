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
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import { getHotels } from '@/utils/hotels';
import DisplayTile from './DisplayTile';
import DisplayTilesSkeleton from './DisplayTilesSkeleton';
import 'react-datepicker/dist/react-datepicker.css';
import Head from 'next/head';

export default function SearchBigHeader() {
  useEffect(() => {
    AirportInput('addressSearch');
  }, []);

  const [data, setData] = useState(false);
  const [cityName, setCityName] = useState(false);
  const { handleSubmit, register, control, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleSearch = async (allData) => {
    setLoading(true);
    const cityIata = this.target.getAttribute('data-iata');
    console.log(allData);
    const { cityCode, adults, dateStart, dateEnd } = allData;
    console.log(cityCode);
    // const newCityName = cityCode.splice(4);
    // cityCode = cityCode.splice(0, 3);
    // console.log(cityCode);
    // setCityName(newCityName);
    const data = { cityIata, adults, dateStart, dateEnd };
    const newData = await getHotels(data);
    setData(newData);
    console.log(newData);
    setLoading(false);
  };
  const popularSearches = async (cityName, cityCode, adults, nights) => {
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
          <FormControl as='form' onSubmit={handleSubmit(handleSearch)} maxW='900px' w='100%' p={8}>
            <Flex>
              {/* <Select
              w='20%'
              mr={2}
              bg='white'
              color='black'
              {...register('cityCode', { requires: 'Required', message: 'please enter a site' })}
            >
              <option color='gray.400' value>
                Where to?
              </option>
              <option value={['SYD', 'Sydney']}>Sydney</option>
              <option value={['MEL', 'Melbourne']}>Melbourne</option>
              <option value={['BNE', 'Brisbane']}>Brisbane</option>
              <option value={['PER', 'Perth']}>Perth</option>
              <option value={['ADL', 'Adelaide']}>Adelaide</option>
              <option value={['OOL', 'Gold Coast']}>Gold Coast</option>
              <option value={['CNS', 'Cairns']}>Cairns</option>
              <option value={['CBR', 'Canberra']}>Canberra</option>
              <option value={['HBA', 'Hobart']}>Hobart</option>
              <option value={['DRW', 'Darwin']}>Darwin</option>
              <option value={['TSW', 'Townsville']}>Townsville</option>
              <option value={['LST', 'Launceston']}>Launceston</option>
              <option value={['NTL', 'Newcastle']}>Newcastle</option>
              <option value={['MCY', 'Sunshine Coast']}>Sunshine Coast</option>
              <option value={['MKY', 'Mackay']}>Mackay</option>
              <option value={['AVV', 'Avalon']}>Avalon</option>
              <option value={['ASP', 'Alice Springs']}>Alice Springs</option>
              <option value={['ROK', 'Rockhampton']}>Rockhampton</option>
              <option value={['BNK', 'Ballina']}>Ballina</option>
              <option value={['AYQ', 'Ayers Rock']}>Ayers Rock</option>
              <option value={['KTA', 'Karratha']}>Karratha</option>
              <option value={['HTI', 'Hamilton Island']}>Hamilton Island</option>
              <option value={['PPP', 'Proserpine']}>Proserpine</option>
              <option value={['BME', 'Broome']}>Broome</option>
              <option value={['CFS', 'Coffs Harbour']}>Coffs Harbour</option>
              <option value={['PHE', 'Port Hedland']}>Port Hedland</option>
              <option value={['ZNE', 'Newman']}>Newman</option>
              <option value={['KGI', 'Kalgoorlie-Boulder']}>Klgoorlie-Boulder </option>
              <option value={['ABX', 'Albury']}>Albury</option>
              <option value={['GLT', 'Gladstone']}>Gladstone</option>
              <option value={['MQL', 'Mildura']}>Mildura</option>
              <option value={['PQQ', 'Port Macquarie']}>Port Macquarie</option>
              <option value={['ISA', 'Mount Isa']}>Mount Isa</option>
              <option value={['DBO', 'Dubbo']}>Dubbo</option>
            </Select> */}

              <Input
                {...register('cityName', {
                  required: 'Required',
                  message: 'please enter a site',
                })}
                w='90%'
                mr={2}
                bg='white'
                id='addressSearch'
                placeholder='Where to?'
                bg='white'
              />

              <Controller
                mb={0}
                w='20%'
                ml={2}
                h={4}
                _hover={{ cursor: 'pointer' }}
                control={control}
                name='dateStart'
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    className='firstInput'
                    onChange={onChange}
                    variant='unstyled'
                    selected={today || value}
                    dateFormat='dd MMM yyyy'
                    shouldCloseOnSelect
                    placeholderText={'Check in date'}
                    showTimeSelect={false}
                    todayButton='Today'
                    minDate={today}
                  />
                )}
              />
              <Controller
                mb={0}
                ml={2}
                w='20%'
                _hover={{ cursor: 'pointer' }}
                control={control}
                name='dateEnd'
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    className='secondInput'
                    onChange={onChange}
                    variant='unstyled'
                    selected={tomorrow || value}
                    dateFormat='dd MMM yyyy'
                    shouldCloseOnSelect
                    placeholderText={'Check out date'}
                    showTimeSelect={false}
                    minDate={tomorrow}
                  />
                )}
              />
              <NumberInput id='people' min={1} max={9} w='20%' ml={2}>
                <NumberInputField
                  placeholder='Add guests'
                  bg='white'
                  {...register('adults', {
                    required: 'Required',
                    message: 'please enter a site',
                  })}
                />
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
            <Flex
              w={['50%', '50%', '50%', '25%']}
              px={4}
              position='relative'
              _hover={{ pointer: 'cursor' }}
              onClick={() => popularSearches('Melbourne', 'MEL', 2, 3)}
            >
              <NextImage
                src='/images/melbourne.jpg'
                height='400px'
                width='400px'
                objectFit='cover'
              />
              <Box position='absolute' p={4} color='white' bottom='0' bg='brand.100' w='60%'>
                <Heading fontSize='lg'>Melbourne</Heading>
                <Text fontSize='sm'>2 adults for 2 nights</Text>
              </Box>
            </Flex>
            <Flex
              w={['50%', '50%', '50%', '25%']}
              px={4}
              position='relative'
              _hover={{ pointer: 'cursor' }}
              onClick={() => popularSearches('Sydney', 'SYD', 2, 2)}
            >
              <NextImage src='/images/sydney.jpg' height='400px' width='400px' objectFit='cover' />
              <Box position='absolute' p={4} color='white' bottom='0' bg='brand.100' w='60%'>
                <Heading fontSize='lg'>Sydney</Heading>
                <Text fontSize='sm'>2 adults for 2 nights</Text>
              </Box>
            </Flex>
            <Flex
              w={['50%', '50%', '50%', '25%']}
              px={4}
              position='relative'
              _hover={{ pointer: 'cursor' }}
              onClick={() => popularSearches('Brisbane', 'BNE', 9, 3)}
            >
              <NextImage
                src='/images/brisbane.jpg'
                height='400px'
                width='400px'
                objectFit='cover'
              />
              <Box position='absolute' p={4} color='white' bottom='0' bg='brand.100' w='60%'>
                <Heading fontSize='lg'>Brisbane</Heading>
                <Text fontSize='sm'>9 adults for 3 nights</Text>
              </Box>
            </Flex>
            <Flex
              w={['50%', '50%', '50%', '25%']}
              px={4}
              position='relative'
              _hover={{ pointer: 'cursor' }}
              onClick={() => popularSearches('Uluru', 'AYQ', 2, 2)}
            >
              <NextImage
                src='/images/ayers-rock.jpg'
                height='400px'
                width='400px'
                objectFit='cover'
              />
              <Box position='absolute' p={4} color='white' bottom='0' bg='brand.100' w='60%'>
                <Heading fontSize='lg'>Uluru</Heading>
                <Text fontSize='sm'>2 adults for 2 nights</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
