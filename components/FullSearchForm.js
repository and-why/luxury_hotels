import { useState, useRef, useEffect } from 'react';
import {
  Flex,
  Spinner,
  Button,
  FormControl,
  FormLabel,
  Input,
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
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/functions';

export default function FullSearchForm({ closeModal }) {
  const cityNameInput = useRef();
  // const [close, set]
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate).setDate(new Date(startDate).getDate() + 1),
  );
  const [isCityError, setCityError] = useState(false);
  const [isDateError, setDateError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (
      new Date(e.target.dateEnd.value).getTime() <= new Date(e.target.dateStart.value).getTime()
    ) {
      return setDateError(true);
    }
    const cityCode = e.target.addressSearch.getAttribute('data-iata');
    if (cityCode === null) {
      setLoading(false);
      return setCityError(true);
    }
    e.target.addressSearch.focus();
    const guests = e.target.adults.value;
    const rooms = e.target.rooms.value;
    const checkInDate = formatDate(e.target.dateStart.value);
    const checkOutDate = formatDate(e.target.dateEnd.value);

    closeModal();
    router.push({
      pathname: `/search/`,
      query: {
        cityCode: cityCode,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests,
        rooms: rooms,
      },
    });
  };

  useEffect(() => {
    AirportInput('addressSearch');
  }, []);
  return (
    <FormControl as='form' borderRadius='10px' onSubmit={handleSearch} autoComplete='off'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <FormControl mb={4}>
            <FormLabel
              m='0'
              p='0'
              ml={2}
              fontSize='10px'
              textTransform='uppercase'
              fontWeight='600'
            >
              Choose closest airport
            </FormLabel>
            <Input
              ref={cityNameInput}
              name='cityName'
              w='100%'
              mr={2}
              id='addressSearch'
              placeholder='Where are you going?'
              bg='white'
              required
              autoFocus
            />
          </FormControl>
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
                  setEndDate(new Date(date).setDate(new Date(date).getDate() + 1));
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
                onChange={(date) => setEndDate(date)}
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
              defaultValue={1}
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
              mb={8}
              required
              defaultValue={1}
            >
              <NumberInputField placeholder='Add guests' bg='white' name='rooms' id='rooms' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Popover
            onClose={() => {
              setCityError(false);
              setDateError(false);
            }}
          >
            <PopoverTrigger>
              <Button
                w='100%'
                type='submit'
                bg='brand.100'
                _hover={{ backgroundColor: 'brand.150' }}
                isLoading={isLoading}
              >
                Search
              </Button>
            </PopoverTrigger>
            {isCityError ||
              (isDateError && (
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight='600'>Error!</PopoverHeader>
                  <PopoverBody>
                    {isCityError && 'Please select the closest airport from the city dropdown?'}
                    {isDateError &&
                      'The Check Out Date must be at least one day in the future of the Check In Date?'}
                  </PopoverBody>
                </PopoverContent>
              ))}
          </Popover>
        </>
      )}
    </FormControl>
  );
}
