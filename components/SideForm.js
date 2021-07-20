import { useState } from 'react';
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
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsHouseFill } from 'react-icons/bs';
import { getHotelById, getHotelByIdAll } from '@/utils/hotels';
import Layout from '@/components/Layout';
import NextLink from 'next/link';
import NextImage from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatter } from '@/utils/functions';

export default function SideForm({ addSearchData, data }) {
  const hotelData = data;
  console.log('hotel', hotelData);
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date(hotelData.offers[0].checkInDate));
  const [endDate, setEndDate] = useState(new Date(hotelData.offers[0].checkOutDate));
  const [isError, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // setLoading(true);

    if (e.target.dateEnd.value <= e.target.dateStart.value) {
      return setError(true);
    }

    const guests = e.target.adults.value;
    let startDate = new Date(e.target.dateStart.value);
    const checkInDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    let endDate = new Date(e.target.dateEnd.value);
    const checkOutDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    addSearchData([checkInDate, checkOutDate, guests]);
    // setLoading(false)
  };
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
          {formatter.format(hotelData.offers[0].price.total)}
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
              <FormLabel fontSize='12px'>Check In</FormLabel>
              <DatePicker
                name='dateStart'
                id='dateStart'
                variant='outline'
                // className='firstInput'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat='dd MMM yyyy'
                shouldCloseOnSelect
                placeholderText={'Check in date'}
                showTimeSelect={false}
                todayButton='Today'
                minDate={new Date()}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='12px'>Check out</FormLabel>
              <DatePicker
                name='dateEnd'
                id='dateEnd'
                variant='outline'
                // className='secondInput'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat='dd MMM yyyy'
                shouldCloseOnSelect
                placeholderText={'Check out date'}
                showTimeSelect={false}
                minDate={new Date()}
              />
            </FormControl>
          </Flex>
          <NumberInput
            allowMouseWheel
            id='people'
            min={1}
            max={2}
            mb={4}
            required
            defaultValue={hotelData.offers[0].guests.adults}
          >
            <NumberInputField placeholder='Add guests' bg='white' name='adults' id='adults' />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            allowMouseWheel
            id='people'
            min={1}
            max={9}
            mb={4}
            required
            defaultValue={hotelData.offers[0].roomQuantity || 1}
          >
            <NumberInputField placeholder='Add guests' bg='white' name='rooms' id='rooms' />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Popover onClose={() => setError(false)}>
            <PopoverTrigger>
              <Button
                w='100%'
                type='submit'
                bg='brand.100'
                _hover={{ backgroundColor: 'brand.150' }}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </PopoverTrigger>
            {isError && (
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight='600'>Error!</PopoverHeader>
                <PopoverBody>
                  The Check Out Date must be at least one day in the future of the Check In Date?
                </PopoverBody>
              </PopoverContent>
            )}
          </Popover>
        </>
      )}
    </FormControl>
  );
}
