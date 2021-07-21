import { getToken } from './token';

export async function getHotels(data) {
  const amadeus = await getToken();
  var { cityCode, checkInDate, checkOutDate, guests, rooms } = data;
  console.log('data received by getHotels()', data);

  if (guests > 2) {
    rooms = Math.ceil(guests / 2);
    guests = 2;
  }

  const response = await amadeus.shopping.hotelOffers
    .get({
      cityCode: cityCode,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      // roomQuantity: roomQuantity,
      adults: guests,
      roomQuantity: rooms,
      radius: 300,
      radiusUnit: 'KM',
      // amenities: ,
      ratings: '4,5',
      bestRateOnly: true,
      currency: 'AUD',
    })
    .catch((x) => console.log(x));

  console.log('data returned from getHotels()', response.result);

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

export async function getHotelById(hotelId, checkInDate, checkOutDate, guests, rooms) {
  const amadeus = await getToken();

  let adults = guests;

  if (guests > 2) {
    adults = 2;
  }
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

  console.log('hotel result', response.result);
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
