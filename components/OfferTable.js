import { Box, Link, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Table, Tr, Th, Td } from './Table';
import { formatter } from '@/utils/functions';

export default function OfferTable({ offers, dictionary }) {
  return (
    <Table w='100%' id='offerTable'>
      <thead>
        <Tr>
          <Th>Room type</Th>
          <Th>Sleeps</Th>
          <Th display={['none', 'none', offers[0].roomQuantity > 1 ? 'table-cell' : 'none']}>
            Room
          </Th>
          <Th>Board</Th>
          <Th>Book</Th>
        </Tr>
      </thead>
      <tbody>
        {offers.map((offer, index) => (
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
                      {offer.room.typeEstimated.beds}{' '}
                      {offer.room.typeEstimated.bedType.toLowerCase()} Bed
                      {offer.room.typeEstimated.beds > 1 && 's'}
                    </Text>
                  )}
                </Td>
                <Td>{offer.guests.adults} adults</Td>
                <Td display={['none', 'none', offers[0].roomQuantity > 1 ? 'table-cell' : 'none']}>
                  {offer.roomQuantity || '1'}
                </Td>
                <Td>
                  {offer.boardType
                    ? offer.boardType.toLowerCase().replaceAll('_', ' ')
                    : 'Room Only'}
                </Td>
                <Td textAlign='right'>
                  <Button
                    w='100%'
                    size='sm'
                    bg='brand.100'
                    m='0'
                    _hover={{ backgroundColor: 'brand.150' }}
                  >
                    <Text fontWeight='600'>
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
          </Box>
        ))}
      </tbody>
    </Table>
  );
}
