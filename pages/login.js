import { Flex, Button } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function LoginPage() {
  const [session, loading] = useSession();
  return (
    <Flex>
      <Button>Sign Up</Button>
      <Button>Sign In</Button>
    </Flex>
  );
}
