import { Flex, Text, Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function EditableListItem({ heading, detail }) {
  return (
    <Flex
      w='100%'
      maxW='500px'
      justify='space-between'
      py={4}
      borderBottom='1px solid'
      borderBottomColor='#ebebeb'
    >
      <Box>
        <Text fontSize='md' fontWeight='bold'>
          {heading}
        </Text>
        <Text fontSize='md'>{detail}</Text>
      </Box>
      <Button variant='ghost' color='brand.100'>
        Edit
      </Button>
    </Flex>
  );
}
