import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import {
  Button,
  Flex,
  Heading,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import DisplayTilesSkeleton from './DisplayTilesSkeleton';
import FullSearchForm from './FullSearchForm';
import SearchModal from './SearchModal';

export default function SearchBigHeader({ height }) {
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction='column' align='center' w='100%'>
        <Flex
          height={height || '70vh'}
          minH='200px'
          w='100%'
          position='relative'
          justify='center'
          align='center'
          transition='all ease 0.5s'
          background='brand.200'
          direction={['column', 'column,', 'row']}
        >
          <Flex direction='column' p={4} my={8}>
            <Heading
              color='black'
              zIndex='99'
              mb={8}
              fontWeight='600'
              textShadow='0 0 2px rgba(0,0,0,0.3)'
            >
              Find the best hotels
            </Heading>
            <SearchModal>Where are you going?</SearchModal>
          </Flex>
          <NextImage
            src='/images/hero.png'
            alt='header image'
            priority='true'
            // layout='fill'
            height={500}
            width={500}
            objectFit='contain'
          />
        </Flex>
        {loading && <DisplayTilesSkeleton />}
      </Flex>
    </>
  );
}
