import { Flex, Heading } from '@chakra-ui/layout';
import Container from './Container';
import DisplayTile from './DisplayTile';

export default function SearchResults({ data }) {
  console.log('SearchResults:', data);

  if (!data) return <p>loading</p>;

  if (data.status) {
    return (
      <Flex>
        <p>{data.title}</p>
      </Flex>
    );
  }
  if ((data = 'Unknown Error'))
    return (
      <Flex>
        <p>No hotels are available for those dates or location. Please try another search</p>
      </Flex>
    );
  return (
    <Container>
      <Flex direction='column' w='100%' justify='flex-start'>
        <Heading fontSize='2xl' p={4}>
          Results for {data[0].hotel.address.cityName}
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
