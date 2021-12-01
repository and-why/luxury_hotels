import { useAuth } from '@/utils/auth';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';

export default function LoginBox() {
  const { user, signinWithGoogle, loading } = useAuth();
  return (
    <Flex
      p={4}
      border='solid 1px'
      borderColor='brand.110'
      direction='column'
      mb={4}
      borderRadius='12px'
    >
      <Heading as='h3' fontSize='md' mb={4}>
        Log in or sign up
      </Heading>
      <Text mb={4} fontSize='sm'>
        Log in or sign up with your Google account for faster checkout and to save the trip&apos;s
        details to your account.
      </Text>
      <Button variant='outline' onClick={signinWithGoogle} isLoading={loading}>
        Log in or sign up
      </Button>
    </Flex>
  );
}
