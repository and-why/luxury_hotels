import { Flex, Skeleton } from '@chakra-ui/react';

export default function DisplayTilesSkeleton() {
  return (
    <Flex w='100%' p={8} transition='all ease 0.3s'>
      <Flex display='column' w='25%'>
        <Skeleton mb={2} height='200px' />
        <Flex>
          <Skeleton mb={2} height='20px' width='60%' />
          <Skeleton mb={2} height='20px' width='40%' ml={4} />
        </Flex>
        <Skeleton mb={2} height='20px' />
        <Skeleton mb={2} />
      </Flex>
      <Flex display='column' w='25%' ml={4}>
        <Skeleton mb={2} height='200px' />
        <Flex>
          <Skeleton mb={2} height='20px' width='60%' />
          <Skeleton mb={2} height='20px' width='40%' ml={4} />
        </Flex>
        <Skeleton mb={2} height='20px' />
        <Skeleton mb={2} />
      </Flex>
      <Flex display='column' w='25%' ml={4}>
        <Skeleton mb={2} height='200px' />
        <Flex>
          <Skeleton mb={2} height='20px' width='60%' />
          <Skeleton mb={2} height='20px' width='40%' ml={4} />
        </Flex>
        <Skeleton mb={2} height='20px' />
        <Skeleton mb={2} />
      </Flex>
      <Flex display='column' w='25%' mx={4}>
        <Skeleton mb={2} height='200px' />
        <Flex>
          <Skeleton mb={2} height='20px' width='60%' />
          <Skeleton mb={2} height='20px' width='40%' ml={4} />
        </Flex>
        <Skeleton mb={2} height='20px' />
        <Skeleton mb={2} />
      </Flex>
    </Flex>
  );
}
