import PriceSummaryRow from '@/components/PriceSummaryRow';
import { formatter } from '@/utils/functions';
import { Flex, Heading, Text, Box, Divider } from '@chakra-ui/react';

export default function PriceSummaryBox({ result }) {
  const offer = result.data.offers[0];
  const dictionary = result.dictionaries;
  console.log(offer);
  return (
    <Flex
      p={4}
      border='solid 1px'
      borderColor='brand.110'
      direction='column'
      borderRadius='12px'
      mb={4}
    >
      <Heading as='h3' fontSize='md' mb={4}>
        Your price summary
      </Heading>
      <Box mb={2}>
        <PriceSummaryRow offer={offer} dictionary={dictionary} />
      </Box>
      <Flex justify='space-between'>
        <Text fontSize='sm'>Tax 0%</Text>
        <Text fontSize='sm'>{formatter.format(0)}</Text>
      </Flex>
      <Divider my={4} />
      <Flex justify='space-between'>
        <Text fontSize='md' fontWeight='700'>
          Total
        </Text>
        <Text fontSize='md' fontWeight='700'>
          {formatter.format(
            dictionary
              ? offer.price.total *
                  dictionary.currencyConversionLookupRates[offer.price.currency].rate
              : offer.price.total || 0.0,
          )}
        </Text>
      </Flex>
    </Flex>
  );
}
