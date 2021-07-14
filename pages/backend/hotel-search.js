import {
  Heading,
  Image,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Spinner,
} from '@chakra-ui/react';
import Layout from '@/components/Layout';
import getHotels from '@/utils/hotels';
import { useForm } from 'react-hook-form';
import { getToken } from '@/utils/token';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';

export default function HotelSearchPage() {
  const { handleSubmit, register, reset, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(false);

  const handleSearch = async ({ cityCode }) => {
    setLoading(true);
    const newData = await fetch(`/api/${cityCode}`).then((response) => response.json());

    setData(newData);
    console.log(newData);
    setLoading(false);
  };
  return (
    <>
      <Layout>
        <Heading>Search For Hotels</Heading>
        {!loading ? (
          <FormControl as='form' onSubmit={handleSubmit(handleSearch)}>
            <Input
              type='text'
              id='city-name'
              placeholder='CityCode'
              {...register('cityCode', {
                required: 'Required',
                message: 'please enter a site',
              })}
            />
            <Button type='submit'>Submit</Button>
          </FormControl>
        ) : (
          <Spinner />
        )}
        {data &&
          !loading &&
          data.data.map((hotel) => {
            return (
              <div key={hotel.hotel.hotelId}>
                <Text>{hotel.hotel.name}</Text>
                {hotel.hotel.media && hotel.hotel.media.map((image) => <Image src={image.uri} />)}
              </div>
            );
          })}
      </Layout>
    </>
  );
}
