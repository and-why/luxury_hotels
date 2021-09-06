import { extendTheme, createBreakpoints } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontWeight: 400,
        color: 'black',
      },
      h1: {
        fontWeight: 600,
        color: 'black',
      },
      h2: {
        fontWeight: 600,
        color: 'black',
      },
      h3: {
        fontWeight: 600,
        color: 'black',
      },
    },
  },
  colors: {
    brand: {
      100: '#DEAD3A',
      150: '#ffc107',
      110: '#ffc10763',
      200: '#45C5DE',
      300: '#586728',
      400: '#1C484E',
      dark: '#484848',
    },
    black: '#292929',
  },
  fonts: {
    heading: 'Roboto Slab',
    body: 'Inter',
  },
  fontWeights: {
    normal: 400,
    medium: 400,
    bold: 600,
    extraBold: 700,
  },
});

export default theme;

// export default createBreakpoints({
//   sm: '40em',
//   md: '52em',
//   lg: '72em',
//   xl: '90em',
//   '2xl': '108em',
// });
