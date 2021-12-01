import { Heading, Text, Flex } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { getHotels } from '@/utils/hotels';
import { useCallback, useEffect, useState } from 'react';
import FullSearchForm from '@/components/FullSearchForm';
import Container from '@/components/Container';
import HotelListItem from '@/components/HotelListItem';

export default function HotelSearchPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const addSearchData = useCallback(async (data) => {
    setLoading(true);
    const [cityCode, checkInDate, checkOutDate, guests, rooms] = data;
    const newData = await getHotels({ cityCode, checkInDate, checkOutDate, guests, rooms });
    setData(newData.data);
    setLoading(false);
  }, []);
  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <Container>
          <Flex direction='column'>
            <Heading>Search For Hotels</Heading>
            <FullSearchForm addSearchData={addSearchData} />
            <Flex
              px={2}
              justify='flex-start'
              align='flex-start'
              w='100%'
              wrap='wrap'
              transition='all ease 0.5s'
            >
              {data.length ? (
                data.map((hotel, index) => {
                  return <HotelListItem key={index} hotel={hotel} />;
                })
              ) : (
                <Text>Waiting</Text>
              )}
            </Flex>
          </Flex>
        </Container>
      </Layout>
    </>
  );
}
