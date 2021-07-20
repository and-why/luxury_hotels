import { getToken } from './token';

export async function getHotels(data) {
  const amadeus = await getToken();
  const { cityCode, adults, startDate, endDate } = data;
  console.log('data', data);

  const checkInDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  const checkOutDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  console.log('checkInDate', checkInDate == null ? new Date() : checkInDate);

  const rooms = Math.ceil(adults / 2);
  console.log(rooms);

  const response = await amadeus.shopping.hotelOffers
    .get({
      cityCode: cityCode,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      // roomQuantity: roomQuantity,
      adults: 2,
      roomQuantity: rooms,
      radius: 300,
      radiusUnit: 'KM',
      // amenities: ,
      ratings: '2,3,4,5',
      bestRateOnly: true,
      currency: 'AUD',
    })
    .catch((x) => console.log(x));

  response.result;
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

export async function getHotelById(hotelId, checkInDate, checkOutDate, guests) {
  const amadeus = await getToken();
  const rooms = Math.ceil(guests / 2);
  const response = await amadeus.shopping.hotelOffersByHotel
    .get({
      hotelId: hotelId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: 2,
      roomQuantity: rooms,
      currency: 'AUD',
    })
    .catch((error) => {
      console.log(error);
    });

  return response.result;
}

export async function getHotelByIdAll(hotelId, checkInDate, checkOutDate, guests) {
  const amadeus = await getToken();
  const response = await amadeus.shopping.hotelOffersByHotel
    .get({
      hotelId: hotelId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: guests,
      roomQuantity: Math.ceil(guests / 2),
      currency: 'AUD',
    })
    .catch((error) => {
      return error;
    });

  return response.result;
}

export async function getHotelByOfferId(hotelOfferId) {
  const amadeus = await getToken();
  const response = await amadeus.shopping
    .hotelOffer(hotelOfferId)
    .get({
      hotelId: hotelId,
    })
    .catch((x) => console.log(x));

  return response.result;
}
