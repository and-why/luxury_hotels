import Amadeus from 'amadeus';

export async function getToken() {
  if (process.env.NODE_ENV === 'development') {
    const amadeus = await new Amadeus({
      clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
      clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET,
    });

    return amadeus;
  } else {
    const amadeus = await new Amadeus({
      hostname: 'production',
      clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY_PROD,
      clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET_PROD,
    });

    return amadeus;
  }
}
