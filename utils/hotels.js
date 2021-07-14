import { getToken } from './token';

export async function getHotels(data) {
  const amadeus = await getToken();
  const { cityCode, adults, dateStart, dateEnd } = data;
  console.log('data', data);

  const checkInDate = dateStart && dateStart.toISOString().split('T')[0];
  const checkOutDate = dateEnd && dateEnd.toISOString().split('T')[0];

  console.log('checkInDate', checkInDate == null ? new Date() : checkInDate);

  const response = await amadeus.shopping.hotelOffers
    .get({
      cityCode: cityCode,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      // roomQuantity: roomQuantity,
      adults: 2 || adults,
      radius: 300,
      radiusUnit: 'KM',
      // amenities: ,
      ratings: '2,3,4,5',
      bestRateOnly: true,
    })
    .catch((x) => console.log(x));

  return response.result;
}
export async function getInitialHotels() {
  const amadeus = await getToken();
  const response = await amadeus.shopping.hotelOffers
    .get({
      cityCode: 'MEL',
      // checkInDate: '2021-08-01',
      // checkOutDate: '2021-08-25',
      // roomQuantity: roomQuantity,
      // adults: adults,
      radius: 300,
      radiusUnit: 'KM',
      // amenities: ,
      ratings: '5',
      bestRateOnly: true,
    })
    .catch((x) => console.log(x));

  return response.result;
}
