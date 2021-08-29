import { formatDate } from '@/utils/functions';
import { Flex, Box, Heading } from '@chakra-ui/layout';
import router from 'next/router';
import Container from './Container';
import PromotionalTab from './PromotionalTab';

export default function PromotionBlock({ data, title }) {
  const popularSearches = async ({ cityCode, guests }) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 9);

    const checkInDate = formatDate(startDate);
    const checkOutDate = formatDate(endDate);

    router.push({
      pathname: `/search/`,
      query: {
        cityCode: cityCode,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests || 2,
        rooms: 1,
      },
    });
  };

  return (
    <Container>
      <Box>
        <Heading fontSize='2xl' p={4} mb={4}>
          {title}
        </Heading>
        <Flex wrap='wrap'>
          {data.map((city, index) => (
            <PromotionalTab
              key={index}
              cityName={city.name}
              cityCode={city.code}
              knownFor={city.known}
              guests={city.guests || 2}
              popularSearches={popularSearches}
            />
          ))}
        </Flex>
      </Box>
    </Container>
  );
}
