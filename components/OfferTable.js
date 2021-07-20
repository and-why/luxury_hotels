import { Box, Link, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Table, Tr, Th, Td } from './Table';
import { formatter } from '@/utils/functions';

export default function OfferTable({ offers }) {
  return (
    <Table w='100%'>
      <thead>
        <Tr>
          <Th>Room type</Th>
          <Th>Sleeps</Th>
          <Th>Rooms</Th>
          <Th>Board</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {offers.map((offer, index) => (
          <Box as='tr' key={offer.id}>
            <Td>
              {offer.room.typeEstimated.category.toLowerCase().replaceAll('_', ' ')}. <br />
              {offer.room.typeEstimated.beds} {offer.room.typeEstimated.bedType.toLowerCase()} Bed
              {offer.room.typeEstimated.beds > 1 && 's'}
            </Td>
            <Td>
              {offer.guests.adults} Adults
              <br />
              <Text fontSize='12px'>
                (Max sleep:{' '}
                {offer.room.typeEstimated.bedType != 'SINGLE' &&
                  offer.guests.adults * offer.room.typeEstimated.beds}
                )
              </Text>
            </Td>
            <Td>{offer.roomQuantity || '1'}</Td>
            <Td>{offer.boardType.toLowerCase().replaceAll('_', ' ')}</Td>
            <Td textAlign='right'>
              <Button
                w='100%'
                size='sm'
                bg='brand.100'
                m='0'
                _hover={{ backgroundColor: 'brand.150' }}
              >
                <Text fontWeight='600'>Book for {formatter.format(offer.price.total)}</Text>
              </Button>
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
}
