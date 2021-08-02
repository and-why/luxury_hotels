import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/auth';
import { Flex, Text, Box, Button, FormControl, Input, Select, FormLabel } from '@chakra-ui/react';
import { updateUser } from '@/utils/db';

export default function ProfileEmailInput({ data }) {
  const [isEditable, setEditable] = useState(false);
  const { user } = useAuth();
  const [email, setEmail] = useState(data);
  const handleClick = () => {
    setEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    const name = `${firstname} ${surname}`;
    setEmail(email);
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
          Email address:
        </Text>
        <Text fontSize='md'>{email}</Text>
      </Flex>
    </Flex>
  );
}
