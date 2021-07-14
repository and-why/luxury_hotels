import Amadeus from 'amadeus';

export async function getToken() {
  const amadeus = await new Amadeus({
    // hostname: 'production',
    clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET,
  });

  return amadeus;
}
