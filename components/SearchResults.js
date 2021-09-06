import { Box, Flex, Heading } from '@chakra-ui/layout';
import NextImage from 'next/image';
import Container from './Container';
import DisplayTile from './DisplayTile';

export default function SearchResults({ data }) {
  // console.log('SearchResults:', data);

  if (!data) return <p>loading</p>;

  return (
    <Container>
      <Flex direction='column' w='100%' justify='flex-start'>
        <Heading fontSize='2xl' p={4} textTransform='capitalize'>
          Search Results
        </Heading>

        <Flex
          justify='flex-start'
          align='flex-start'
          w='100%'
          wrap='wrap'
          transition='all ease 0.5s'
          env
        >
          {data ? (
            data.data.map((hotel, index) => {
              return <DisplayTile key={index} data={hotel} dictionary={data.dictionaries} />;
            })
          ) : (
            <Heading as='h3' fontSize='xl' textAlign='center' w='100%'>
              No results for those dates or location.
            </Heading>
          )}
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
