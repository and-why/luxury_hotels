import { formatter, lengthOfStay } from '@/utils/functions';
import { Flex, Text } from '@chakra-ui/layout';

export default function PriceSummaryRow({ offer, dictionary }) {
  const currency = offer.price.currency;
  const price = offer.price.total;
  const checkIn = offer.checkInDate;
  const checkOut = offer.checkOutDate;
  return (
    <Flex justify='space-between' w='100%'>
      <Text fontSize='sm'>
        {formatter.format(
          (dictionary
            ? price * dictionary.currencyConversionLookupRates[currency].rate
            : price || 0.0) / lengthOfStay(checkIn, checkOut),
        )}{' '}
        x {lengthOfStay(checkIn, checkOut)}
      </Text>
      <Text ml={2} fontSize='sm'>
        {formatter.format(
          dictionary
            ? price * dictionary.currencyConversionLookupRates[currency].rate
            : price || 0.0,
        )}
      </Text>
    </Flex>
  );
}
