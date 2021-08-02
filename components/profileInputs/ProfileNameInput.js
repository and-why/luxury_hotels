import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/auth';
import { Flex, Text, Box, Button, FormControl, Input, Select, FormLabel } from '@chakra-ui/react';
import { updateUser } from '@/utils/db';

export default function ProfileNameInput({ data }) {
  const [isEditable, setEditable] = useState(false);
  const { user } = useAuth();
  const [name, setName] = useState(data);

  const firstname = name?.split(' ')[0];
  const surname = name?.split(' ')[1];

  const handleClick = () => {
    setEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstname = e.target.firstname.value;
    const surname = e.target.surname.value;
    const name = `${firstname} ${surname}`;
    setName(name);
    updateUser(user.uid, { name: name });
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
          First name
        </Text>
        <Text fontSize='md' textTransform='capitalize'>
          {name}
        </Text>
        {isEditable && (
          <FormControl as='form' mt={4} onSubmit={handleSubmit}>
            <Flex>
              <Flex direction='column' mr={2}>
                <FormLabel p={0} m={0} fontSize='12px' forhtml='firstName'>
                  First Name
                </FormLabel>
                <Input defaultValue={firstname} id='firstname' />
              </Flex>
              <Flex direction='column' mr={2}>
                <FormLabel p={0} m={0} fontSize='12px' forhtml='surname'>
                  Surname
                </FormLabel>
                <Input defaultValue={surname} placeholder='Surname' id='surname' />
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
