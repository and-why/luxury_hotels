import { useDisclosure } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from './Table';

import OfferTableRow from './OfferTableRow';

export default function OfferTable({ offers, dictionary }) {
  // console.log('offer table:', offers);
  return (
    <Table w='100%' id='offerTable'>
      <thead>
        <Tr>
          <Th w='30%'>Room type</Th>
          <Th
            w='20%'
            display={['none', 'none', offers[0].roomQuantity > 1 ? 'table-cell' : 'none']}
          >
            Room
          </Th>
          <Th w='20%' display={['none', 'table-cell', 'table-cell']}>
            Board
          </Th>
          <Th w='20%'>More info</Th>
          <Th textAlign='center' pr={4} w='20%'>
            Booking Link
          </Th>
        </Tr>
      </thead>
      <tbody>
        {offers.map((offer, index) => (
          <OfferTableRow key={offer.id} offer={offer} dictionary={dictionary} />
        ))}
      </tbody>
    </Table>
  );
}
