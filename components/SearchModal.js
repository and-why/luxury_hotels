import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import FullSearchForm from './FullSearchForm';

export default function SearchModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg='white'
        fontWeight='400'
        color='black'
        boxShadow='xs'
        onClick={onOpen}
        cursor='text'
        padding={4}
        borderRadius='10px'
        _hover={{ backgroundColor: 'white', color: 'black' }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalCloseButton />
          <ModalBody>
            <FullSearchForm closeModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
