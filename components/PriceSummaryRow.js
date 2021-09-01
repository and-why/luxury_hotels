import { formatter, lengthOfStay } from '@/utils/functions';
import { Flex, Text } from '@chakra-ui/layout';

export default function PriceSummaryRow({ dictionary, price, checkIn, checkOut }) {
  return (
    <Flex justify='space-between' w='100%'>
      <Text fontSize='sm'>
        {formatter.format(
          (dictionary
            ? price *
              dictionary.currencyConversionLookupRates[
                Object.keys(dictionary.currencyConversionLookupRates)[0]
              ].rate
            : price || 0.0) / lengthOfStay(checkIn, checkOut),
        )}{' '}
        x {lengthOfStay(checkIn, checkOut)}
      </Text>
      <Text ml={2} fontSize='sm'>
        {formatter.format(
          dictionary
            ? price *
                dictionary.currencyConversionLookupRates[
                  Object.keys(dictionary.currencyConversionLookupRates)[0]
                ].rate
            : price || 0.0,
        )}
      </Text>
    </Flex>
  );
}
