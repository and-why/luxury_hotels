import { Flex } from '@chakra-ui/react';

export default function Container({ children }) {
  return (
    <Flex w='100%' maxW='1440px' px={[2, 4, 16, 32]} py={4} justify='space-between' align='center'>
      {children}
    </Flex>
  );
}
