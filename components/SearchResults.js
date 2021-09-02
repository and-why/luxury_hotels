import { Box, Flex, Heading, Button } from '@chakra-ui/layout';
import NextImage from 'next/image';
import { useState } from 'react';
import Container from './Container';
import DisplayTile from './DisplayTile';
import HotelListItem from './HotelListItem';

export default function SearchResults({ data }) {
  // console.log('SearchResults:', data);
  const [listMode, setListMode] = useState(false);

  const handleView = () => {
    setListMode(!listMode);
  };

  if (!data) {
    return (
      <Heading as='h3' fontSize='xl' textAlign='center' w='100%'>
        No results for those dates or location.
      </Heading>
    );
  }
  return (
    <Container>
      <Flex direction='column' w='100%' justify='flex-start'>
        <Heading fontSize='2xl' p={4} textTransform='capitalize'>
          Search Results
        </Heading>
        <Button onClick={handleView}>{listMode ? 'Grid' : 'List'}</Button>
        <Flex
          justify='flex-start'
          align='flex-start'
          w='100%'
          wrap='wrap'
          transition='all ease 0.5s'
          env
        >
          <Flex
            direction='column'
            w={['50%', '50%', '33.3%', '25%']}
            p={2}
            transition='all 0.3s ease'
            bg='white'
            borderRadius='10px'
          >
            <NextImage
              src={`/images/search/${Math.floor(Math.random() * 15)}.png`}
              height='400px'
              width='400px'
            />
          </Flex>
          {!listMode
            ? data.data.map((hotel, index) => {
                return <DisplayTile key={index} data={hotel} dictionary={data.dictionaries} />;
              })
            : data.data.map((hotel, index) => {
                return <HotelListItem key={index} data={hotel} dictionary={data.dictionaries} />;
              })}
          <Flex
            direction='column'
            w={['50%', '50%', '33.3%', '25%']}
            p={2}
            transition='all 0.3s ease'
            bg='white'
            borderRadius='10px'
          >
            <NextImage
              src={`/images/search/${Math.floor(Math.random() * 15)}.png`}
              height='400px'
              width='400px'
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
