import React from 'react';
import { Box, Text } from '@chakra-ui/layout';

export const Th = (props) => (
  <Text
    as='th'
    textTransform='uppercase'
    fontSize='xs'
    color='black'
    fontWeight='600'
    p={2}
    py={6}
    backgroundColor='brand.100'
    {...props}
  />
);

export const Td = (props) => (
  <Box
    as='td'
    textTransform='capitalize'
    color='gray.900'
    p={2}
    borderBottom='1px solid'
    borderBottomColor='brand.100'
    {...props}
  />
);

export const Tr = (props) => (
  <Box
    as='tr'
    backgroundColor='gray.50'
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom='1px solid'
    borderBottomColor='gray.200'
    height='40px'
    {...props}
  />
);

export const Table = (props) => {
  return (
    <Box
      as='table'
      textAlign='left'
      backgroundColor='white'
      ml={0}
      mr={0}
      borderRadius={8}
      {...props}
    />
  );
};
