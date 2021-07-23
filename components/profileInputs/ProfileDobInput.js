import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/auth';
import {
  Flex,
  Text,
  Box,
  Button,
  FormControl,
  Input,
  Select,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { updateUser } from '@/utils/db';

export default function ProfileDobInput({ data }) {
  const [isEditable, setEditable] = useState(false);
  const { user } = useAuth();

  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  useEffect(() => {
    if (data) {
      setDay(data[0]);
      setMonth(data[1]);
      setYear(data[2]);
    }
  }, []);

  const handleClick = () => {
    setEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');

    const day = e.target.day.value;
    const month = e.target.month.value;
    const year = e.target.year.value;
    const dob = [day, month, year];
    console.log(dob);
    updateUser(user.uid, { dob: dob });
    setDay(day);
    setMonth(month);
    setYear(year);
    setEditable(false);
  };

  return (
    <Flex
      w='100%'
      justify='space-between'
      py={4}
      borderBottom='1px solid'
      borderBottomColor='#ebebeb'
    >
      <Flex direction='column'>
        <Text fontSize='md' fontWeight='bold'>
          Date of birth
        </Text>
        <Text fontSize='md'>
          {day}-{month}-{year}
        </Text>
        {isEditable && (
          <FormControl as='form' mt={4} onSubmit={handleSubmit}>
            <Flex>
              <Flex direction='column' mr={2}>
                <FormLabel p={0} m={0} fontSize='12px' type='number' forhtml='firstName'>
                  Day
                </FormLabel>
                <NumberInput
                  w='100px'
                  // id='year'
                  min={1}
                  max={31}
                  defaultValue={day}
                >
                  <NumberInputField placeholder='28' id='day' />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Flex direction='column' mr={2}>
                <FormLabel p={0} m={0} fontSize='12px' forhtml='firstName'>
                  Month
                </FormLabel>
                <NumberInput
                  w='100px'
                  // id='year'
                  min={1}
                  max={12}
                  defaultValue={month}
                >
                  <NumberInputField placeholder='12' id='month' />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Flex direction='column' mr={2}>
                <FormLabel p={0} m={0} fontSize='12px' forhtml='firstName'>
                  Year
                </FormLabel>
                <NumberInput
                  w='100px'
                  // id='year'
                  min={1900}
                  max={2020}
                  defaultValue={year}
                >
                  <NumberInputField placeholder='1987' id='year' />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Flex>
            <Button type='submit' bg='brand.100' mt={4} color='white'>
              Save
            </Button>
          </FormControl>
        )}
      </Flex>
      <Button variant='ghost' color={isEditable ? 'red' : 'brand.100'} onClick={handleClick}>
        {isEditable ? 'Cancel' : 'Edit'}
      </Button>
    </Flex>
  );
}
