import Layout from '@/components/Layout';
import PromotionalTab from '@/components/PromotionalTab';
import PromotionCardFull from '@/components/PromotionCardFull';
import SearchBigHeader from '@/components/SearchBigHeader';
import SearchResults from '@/components/SearchResults';
import { getHotels } from '@/utils/hotels';
import { Flex } from '@chakra-ui/layout';

export default function SearchPage({ data }) {
  if (data.errors) {
    return (
      <Layout>
        <Heading textTransform='capitalize' as='h3' fontSize='lg' mb={4}>
          Sorry. {data.errors[0].title.toLowerCase()}
        </Heading>
      </Layout>
    );
  }

  return (
    <Layout>
      <SearchResults data={data} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { cityCode, checkInDate, checkOutDate, guests, rooms } = context.query;
  const data = await getHotels({ cityCode, checkInDate, checkOutDate, guests, rooms });

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      data: data.result,
    },
  };
}
