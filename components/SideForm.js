import { useState, useEffect } from 'react';
import {
  Flex,
  Spinner,
  Button,
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
import { formatter, formatDate, lengthOfStay } from '@/utils/functions';
import Link from 'next/link';

export default function SideForm({ addSearchData, data, dictionary, currency }) {
  const [hotelData, setHotelData] = useState(data?.data);
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    hotelData ? new Date(hotelData.offers[0].checkInDate) : new Date(),
  );
  const [endDate, setEndDate] = useState(
    hotelData
      ? new Date(hotelData.offers[0].checkOutDate)
      : new Date(startDate).setDate(new Date(startDate).getDate() + 2),
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const guests = e.target.adults.value;
    const rooms = e.target.rooms.value;
    const checkInDate = formatDate(e.target.dateStart.value);
    const checkOutDate = formatDate(e.target.dateEnd.value);

    addSearchData([checkInDate, checkOutDate, guests, rooms]);
    setLoading(false);
  };
  useEffect(() => {
    if (data) {
      setHotelData(data.data);
    }
  }, [handleSearch]);
  return (
    <FormControl
      as='form'
      boxShadow='base'
      p={8}
      borderRadius='10px'
      onSubmit={handleSearch}
      autoComplete='off'
    >
      <Flex align='baseline'>
        <Text fontSize='xl' fontWeight='600' mb={4}>
          {hotelData &&
            formatter.format(
              dictionary
                ? hotelData.offers[0].price.total *
                    dictionary.currencyConversionLookupRates[
                      Object.keys(dictionary.currencyConversionLookupRates)[0]
                    ].rate
                : hotelData.offers[0].price.total || 0.0,
            )}
        </Text>
        <Text ml={1} fontSize='sm'>
          total
        </Text>
      </Flex>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Flex mb={4} direction='row' wrap='nowrap' width='100%' justify='space-between'>
            <FormControl>
              <FormLabel
                m='0'
                p='0'
                ml={2}
                fontSize='10px'
                textTransform='uppercase'
                fontWeight='600'
              >
                Check In
              </FormLabel>
              <DatePicker
                name='dateStart'
                id='dateStart'
                variant='outline'
                // className='firstInput'
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (date >= endDate) {
                    setEndDate(new Date(date).setDate(new Date(date).getDate() + 1));
                  }
                }}
                dateFormat='dd MMM yyyy'
                shouldCloseOnSelect
                placeholderText={'Check in date'}
                showTimeSelect={false}
                todayButton='Today'
                minDate={new Date()}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                m='0'
                p='0'
                ml={2}
                fontSize='10px'
                textTransform='uppercase'
                fontWeight='600'
              >
                Check out
              </FormLabel>
              <DatePicker
                name='dateEnd'
                id='dateEnd'
                variant='outline'
                // className='secondInput'
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  handleSearch;
                }}
                dateFormat='dd MMM yyyy'
                shouldCloseOnSelect
                placeholderText={'Check out date'}
                showTimeSelect={false}
                minDate={new Date(startDate).setDate(new Date(startDate).getDate() + 1)}
              />
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel
              m='0'
              p='0'
              ml={2}
              fontSize='10px'
              textTransform='uppercase'
              fontWeight='600'
            >
              Adults per room
            </FormLabel>
            <NumberInput
              allowMouseWheel
              id='people'
              min={1}
              max={2}
              mb={2}
              required
              defaultValue={2 || hotelData.offers[0].guests.adults}
            >
              <NumberInputField placeholder='Add guests' bg='white' name='adults' id='adults' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel
              m='0'
              p='0'
              ml={2}
              fontSize='10px'
              textTransform='uppercase'
              fontWeight='600'
            >
              Number of rooms
            </FormLabel>
            <NumberInput
              allowMouseWheel
              id='rooms'
              min={1}
              max={9}
              mb={2}
              required
              defaultValue={1 || hotelData.roomQuantity}
            >
              <NumberInputField placeholder='Add rooms' bg='white' name='rooms' id='rooms' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button
            w='100%'
            type='submit'
            bg='brand.100'
            _hover={{ backgroundColor: 'brand.150' }}
            isLoading={isLoading}
            mb={4}
          >
            Submit
          </Button>
        </>
      )}
      <Text fontSize='sm' align='center'>
        You won't be charged yet
      </Text>
      {hotelData && (
        <>
          <Text fontSize='sm' align='center' mb={4}>
            <Link color='teal.500' href='#offerTable'>
              Price shown is the best price found, there may be more options are listed below.
            </Link>
          </Text>
          <h2>Best Price</h2>
          <Flex justify='space-between'>
            <Text fontSize='sm'>
              {formatter.format(
                (dictionary
                  ? hotelData.offers[0].price.total *
                    dictionary.currencyConversionLookupRates[
                      Object.keys(dictionary.currencyConversionLookupRates)[0]
                    ].rate
                  : hotelData.offers[0].price.total || 0.0) /
                  ((new Date(hotelData.offers[0].checkOutDate) -
                    new Date(hotelData.offers[0].checkInDate)) /
                    24 /
                    60 /
                    60 /
                    1000),
              )}{' '}
              x {lengthOfStay(hotelData.offers[0].checkOutDate, hotelData.offers[0].checkInDate)}
            </Text>
            <Text ml={2} fontSize='sm'>
              {hotelData &&
                formatter.format(
                  dictionary
                    ? hotelData.offers[0].price.total *
                        dictionary.currencyConversionLookupRates[
                          Object.keys(dictionary.currencyConversionLookupRates)[0]
                        ].rate
                    : hotelData.offers[0].price.total || 0.0,
                )}
            </Text>
          </Flex>
          <Text color='teal.500' textAlign='center' w='100%' mt={4} fontSize='sm'>
            <Link href='#offerTable'>Show more options</Link>
          </Text>
        </>
      )}
    </FormControl>
  );
}
