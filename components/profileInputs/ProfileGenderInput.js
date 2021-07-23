import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/auth';
import { Flex, Text, Box, Button, FormControl, Input, Select, FormLabel } from '@chakra-ui/react';
import { updateUser } from '@/utils/db';
import { CgGenderMale } from 'react-icons/cg';

export default function ProfileGenderInput({ data }) {
  const [isEditable, setEditable] = useState(false);
  const { user } = useAuth();
  const [gender, setGender] = useState(data);

  const handleClick = () => {
    setEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');

    const gender = e.target.gender.value;
    updateUser(user.uid, { gender: gender });
    setGender(gender);
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
          Gender
        </Text>
        <Text fontSize='md' textTransform='capitalize'>
          {gender}
        </Text>
        {isEditable && (
          <FormControl as='form' mt={4} onSubmit={handleSubmit}>
            <Flex>
              <Flex direction='column' mr={2}>
                <FormLabel p={0} m={0} fontSize='12px' forhtml='firstName'>
                  Select Gender
                </FormLabel>
                <Select defaultValue={gender} id='gender'>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </Select>
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
