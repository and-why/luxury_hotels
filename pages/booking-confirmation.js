import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { useAuth } from '@/utils/auth';
import { Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';

export default function BookingConfirmationPage(props) {
  const router = useRouter();
  const { user } = useAuth();
  const bookingId = router.query.id;
  return (
    <Layout>
      <Container>
        <Flex direction='column'>
          <Text>Thank you for your booking with Sonder Escapes.</Text>
          <Text>
            Your booking ID is: <strong>{bookingId}</strong>
          </Text>
          {user && (
            <Text>Your booking will to added to your bookings in your account section.</Text>
          )}
        </Flex>
      </Container>
    </Layout>
  );
}

// export async function getServerSideProps()
