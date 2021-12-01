import Layout from '@/components/Layout';
import SearchResults from '@/components/SearchResults';
import { getHotels } from '@/utils/hotels';
import { Heading } from '@chakra-ui/react';

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
