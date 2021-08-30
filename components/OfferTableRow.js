import {
  Box,
  Text,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Table, Tr, Th, Td } from './Table';
import { formatter } from '@/utils/functions';
import { getHotelByOfferId } from '@/utils/hotels';
import { useRouter } from 'next/router';

export default function OfferTableRow({ offer, dictionary }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleBooking = async () => {
    router.push({
      pathname: '/make-booking',
      query: {
        offerId: offer.id,
      },
    });
  };

  return (
    <Box as='tr' key={offer.id}>
      {offer.room.typeEstimated && (
        <>
          <Td>
            <Text>
              {offer.room.typeEstimated.category &&
                offer.room.typeEstimated.category.toLowerCase().replace(/_/g, ' ')}
            </Text>
            {offer.room.typeEstimated.bedType && (
              <Text>
                {offer.room.typeEstimated.beds} {offer.room.typeEstimated.bedType.toLowerCase()} Bed
                {offer.room.typeEstimated.beds > 1 && 's'}
              </Text>
            )}
          </Td>
          <Td display={['none', 'none', offer.roomQuantity > 1 ? 'table-cell' : 'none']}>
            {offer.roomQuantity || '1'}
          </Td>
          <Td>
            {offer.boardType ? offer.boardType.toLowerCase().replaceAll('_', ' ') : 'Room Only'}
          </Td>
          <Td>
            <Button onClick={onOpen}>More Info</Button>
          </Td>
          <Td textAlign='right'>
            <Button
              onClick={handleBooking}
              size='sm'
              bg='brand.100'
              m='0'
              px={8}
              _hover={{ backgroundColor: 'brand.150' }}
            >
              <Text fontWeight='600'>
                Book Now for{' '}
                {formatter.format(
                  dictionary
                    ? offer.price.total *
                        dictionary.currencyConversionLookupRates[
                          Object.keys(dictionary.currencyConversionLookupRates)[0]
                        ].rate
                    : offer.price.total,
                )}
              </Text>
            </Button>
          </Td>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='xl' motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent p={4} w='100%'>
          <ModalHeader>More about this offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {offer.room?.description?.text && (
              <Text mb={4}>
                <strong>Offer Description:</strong> {offer.room?.description?.text?.toLowerCase()}
              </Text>
            )}
            {offer.room?.typeEstimated?.category && (
              <Text mb={4} textTransform='capitalize'>
                <strong>Room Type:</strong>{' '}
                {offer.room?.typeEstimated?.category.replace('_', ' ').toLowerCase()}
              </Text>
            )}
            {offer.room?.typeEstimated?.bedType && (
              <Text mb={4} textTransform='capitalize'>
                <strong>Bed Type:</strong> {offer.room?.typeEstimated?.bedType?.toLowerCase()}
              </Text>
            )}
            {offer.room?.typeEstimated?.beds && (
              <Text mb={4} textTransform='capitalize'>
                <strong>Number of beds:</strong> {offer.room?.typeEstimated?.beds}
              </Text>
            )}
            {offer.guests?.adults && (
              <Text mb={4} textTransform='capitalize'>
                <strong>Number of guests:</strong> {offer.guests?.adults}
              </Text>
            )}
            {offer.policies && (
              <>
                <Heading as='h3' fontSize='xl' mb={2}>
                  Policies:
                </Heading>
                {offer.policies?.paymentType && (
                  <Text textTransform='capitalize'>
                    <strong>Payment Type:</strong> {offer.policies?.paymentType}
                  </Text>
                )}
                {offer.rateFamilyEstimated && (
                  <Text>
                    <strong>Family Rate Codes:</strong>{' '}
                    {offer.rateFamilyEstimated?.code && offer.rateFamilyEstimated?.code} /{' '}
                    {offer.rateFamilyEstimated?.type && offer.rateFamilyEstimated?.type}
                  </Text>
                )}
                {offer.policies?.cancellation?.deadline && (
                  <Text>
                    <strong>Cancellation dealine:</strong>{' '}
                    {new Date(offer.policies?.cancellation?.deadline).toLocaleString()}
                  </Text>
                )}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
