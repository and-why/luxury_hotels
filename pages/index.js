import { Heading, Image, Text } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { getHotels, getInitialHotels } from '@/utils/hotels';
import { getToken } from '@/utils/token';
import SearchBigHeader from '@/components/SearchBigHeader';
import { useState } from 'react';

export default function Home(props) {
  const [data, setData] = useState(props.hotels.data);
  console.log(data);

  return (
    <>
      <Layout>
        <SearchBigHeader />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const hotels = await getInitialHotels();

  return { props: { hotels }, revalidate: 1 };
}
