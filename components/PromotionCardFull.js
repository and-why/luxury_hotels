import { Button } from '@chakra-ui/button';
import { Box, Flex, Grid, Heading, Text, Link } from '@chakra-ui/layout';
import NextImage from 'next/image';
import NextLink from 'next/link';

import Container from './Container';

export default function PromotionCardFull() {
  return (
    <Container>
      <NextLink href='/solo-cities'>
        <Link w='100%'>
          <Flex position='relative' w='100%' height='500px' borderRadius='10px'>
            <NextImage
              alt='travel solo, travel by yourself image'
              src='/images/promos/solo-promo-illustration.jpg'
              // width='1440'
              // height='773'
              objectFit='cover'
              layout='fill'
              placeholder='blur'
              blurDataURL='/images/promos/blur/solo-promo-illustration.jpg'
              className='borderRadius'
            />
            <Flex
              zIndex='99'
              width={['100%', '100%', '40%']}
              align='flex-start'
              p={16}
              justify='center'
              direction='column'
            >
              <Heading>Top Solo Traveller Locations</Heading>
              <Text my={4}>
                Make the most of your me time by exploring cities packed with things to do!
              </Text>
              <Button mt={8}>Learn More</Button>
            </Flex>
          </Flex>
        </Link>
      </NextLink>
    </Container>
  );
}
