import Container from '@/components/Container';
import Layout from '@/components/Layout';
import PromotionalTab from '@/components/PromotionalTab';
import PromotionCardFull from '@/components/PromotionCardFull';
import SearchBigHeader from '@/components/SearchBigHeader';
import SearchResults from '@/components/SearchResults';
import { getHotels } from '@/utils/hotels';
import { Flex } from '@chakra-ui/layout';

export default function SearchPage({ data }) {
  console.log('SearchPageData:', data);

  if (data[0].status) {
    return (
      <Layout>
        <Container>
          {data[0].title}
          <p>Try another search above</p>
          <PromotionCardFull />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <SearchResults data={data} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { cityCode, checkInDate, checkOutDate, guests, rooms } = context.query;
  const res = await getHotels({ cityCode, checkInDate, checkOutDate, guests, rooms });
  console.log(res);
  if (res.data.length > 0) {
    return {
      props: { data: res.data },
    };
  } else if (res.description) {
    return {
      props: { data: res.description },
    };
  } else {
    return {
      props: { data: 'Unknown Error' },
    };
  }
}
