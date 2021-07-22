import NextLink from 'next/link';
import { Flex, Text, Icon, Link } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function AccountCard({ linkref, icon, heading, text, color }) {
  console.log(linkref);
  return (
    <Flex m={2} boxShadow='base' borderRadius='5px' direction='column' w='300px'>
      <NextLink href={linkref} passHref>
        <Link>
          <Flex p={4} direction='column' w='100%' h='150px'>
            <Icon mb={4} as={icon} h='30px' w='30px' color={color} />
            <Flex align='center'>
              <Text fontSize='md' fontWeight='bold'>
                {heading}
              </Text>
              <ChevronRightIcon h='22px' w='22px' />
            </Flex>
            <Text fontSize='sm'>{text}</Text>
          </Flex>
        </Link>
      </NextLink>
    </Flex>
  );
}
