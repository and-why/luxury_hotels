import { Flex, Skeleton } from '@chakra-ui/react';

export default function DisplayTilesSkeleton() {
  return (
    <Flex
      w='100%'
      maxW='1440px'
      px={[2, 4, 16, 32]}
      py={4}
      justify='space-between'
      transition='all ease 0.3s'
      wrap='wrap'
    >
      <Flex display='column' w={['50%', '50%', '33.3%', '25%']} px={2} mb={4}>
        <Skeleton mb={2} h={['100px', '150px', '180px', '200px']} />
        <Flex>
          <Skeleton mb={2} height='20px' width='60%' />
          <Skeleton mb={2} height='20px' width='40%' ml={4} />
        </Flex>
        <Skeleton mb={2} height='20px' />
        <Skeleton mb={2} />
      </Flex>
      <Flex display='column' w={['50%', '50%', '33.3%', '25%']} px={2} mb={4}>
        <Skeleton mb={2} h={['100px', '150px', '180px', '200px']} />
        <Flex>
          <Skeleton mb={2} height='20px' width='60%' />
          <Skeleton mb={2} height='20px' width='40%' ml={4} />
        </Flex>
        <Skeleton mb={2} height='20px' />
        <Skeleton mb={2} />
      </Flex>
      <Flex display='column' w={['50%', '50%', '33.3%', '25%']} px={2} mb={4}>
        <Skeleton mb={2} h={['100px', '150px', '180px', '200px']} />
        <Flex>
          <Skeleton mb={2} height='20px' width='60%' />
          <Skeleton mb={2} height='20px' width='40%' ml={4} />
        </Flex>
        <Skeleton mb={2} height='20px' />
        <Skeleton mb={2} />
      </Flex>
      <Flex display='column' w={['50%', '50%', '33.3%', '25%']} px={2} mb={4}>
        <Skeleton mb={2} h={['100px', '150px', '180px', '200px']} />
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
