import { extendTheme, createBreakpoints } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontWeight: 400,
      },
      h1: {
        fontWeight: 400,
      },
      h2: {
        fontWeight: 400,
      },
    },
  },
  colors: {
    brand: {
      100: '#DEAD3A',
      150: '#ffc107',
      200: '#E77250',
      300: '#586728',
      400: '#1C484E',
      dark: '#10203D',
    },
    black: '#10203D',
  },
  fonts: {
    heading: 'Roboto Slab',
    body: 'Inter',
  },
  fontWeights: {
    normal: 400,
    medium: 400,
    bold: 400,
    extraBold: 600,
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
