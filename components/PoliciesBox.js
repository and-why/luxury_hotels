import { Box, Flex, Heading, Text } from '@chakra-ui/layout';

export default function PoliciesBox({ result, cards }) {
  const offer = result.data.offers[0];

  return (
    <Flex
      p={4}
      border='solid 1px'
      borderColor='brand.110'
      direction='column'
      mb={4}
      borderRadius='12px'
    >
      <Heading as='h3' fontSize='md' mb={2}>
        Policies
      </Heading>
      <Box mb={4}>
        {offer?.policies?.paymentType && (
          <>
            <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
              Payment Type:
            </Heading>
            <Text fontSize='sm' fontWeight='700' textTransform='capitalize'>
              {offer.policies.paymentType.toLowerCase()}
              {offer.policies[offer.policies.paymentType].description &&
                `- ${offer.policies[offer.policies.paymentType].description}`}
            </Text>
            <Text fontSize='12px' fontStyle='italic'>
              (
              {offer.policies.paymentType === 'guarantee' &&
                'The hotel will save credit card information during booking but not make any charges. In the case of a no-show or out-of-policy cancellation, the hotel may charge a penalty to the cardholder'}
              {offer.policies.paymentType === 'deposit' &&
                'The hotel will charge a portion of the reservation amount upon booking or on a given deadline. The traveler will have to pay the remaining balance at the hotel'}
              {offer.policies.paymentType === 'prepay' &&
                'The hotel will charge the full reservation amount upon booking'}
              )
            </Text>
          </>
        )}
      </Box>
      <Box mb={4}>
        <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
          Cancellation {offer.policies.cancellation.deadline ? 'deadline:' : 'information:'}
        </Heading>
        <Text fontSize='sm' fontWeight='700'>
          {offer.policies.cancellation.deadline
            ? new Date(offer.policies.cancellation.deadline).toLocaleString().replace(', ', ' at ')
            : offer.policies.cancellation.description.text}
        </Text>
      </Box>
      {offer.policies[offer.policies.paymentType].acceptedPayments.methods && (
        <Box mb={4}>
          <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
            Accepted Payments:
          </Heading>
          {offer.policies[offer.policies.paymentType].acceptedPayments.methods.map((method) => (
            <Text fontSize='sm' fontWeight='700' textTransform='capitalize'>
              {method.toLowerCase().replace('_', ' ')}
            </Text>
          ))}
        </Box>
      )}
      {offer.policies[offer.policies.paymentType].acceptedPayments.creditCards && (
        <Box mb={4}>
          <Heading as='h4' fontWeight='400' fontSize='sm' fontFamily='Inter, sans-serif'>
            Accepted Cards:
          </Heading>
          {cards.map((card) => (
            <Text fontSize='sm' fontWeight='700' textTransform='capitalize'>
              {card.name}
            </Text>
          ))}
        </Box>
      )}
    </Flex>
  );
}
