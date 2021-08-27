import { Box, Flex, Heading } from '@chakra-ui/layout';
import NextImage from 'next/image';
import Container from './Container';
import DisplayTile from './DisplayTile';

export default function SearchResults({ data }) {
  console.log('SearchResults:', data);

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
        >
          {data ? (
            data.map((hotel, index) => {
              if (index % 5 === 0 && index !== 0) {
                return (
                  <Box padding={2} w={['50%', '50%', '33.3%', '25%']}>
                    <NextImage
                      src={`/images/search/${Math.floor(Math.random() * 12)}.png`}
                      height={250}
                      width={250}
                    />
                  </Box>
                );
              }
              return <DisplayTile key={index} data={hotel} dictionary={data.dictionaries} />;
            })
          ) : (
            <Heading as='h3' fontSize='xl' textAlign='center' w='100%'>
              No results for those dates or location.
            </Heading>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
