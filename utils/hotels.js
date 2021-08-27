import { getToken } from './token';
import { formatDate } from '@/utils/functions';

export async function getHotels(data) {
  const amadeus = await getToken();
  var { cityCode, checkInDate, checkOutDate, guests, rooms } = data;

  if (guests > 2) {
    rooms = Math.ceil(guests / 2);
    guests = 2;
    s;
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
    .catch((error) => {
      error;
    });

  return await response;
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
      adults: adults,
      roomQuantity: rooms,
      view: 'FULL_ALL_IMAGES',
      currency: 'AUD',
    })
    .catch((error) => {
      return error.response;
    });

  return await response;
}

export async function getAllHotels(cityCode) {
  const amadeus = await getToken();

  const response = await amadeus.shopping.hotelOffers
    .get({
      cityCode: cityCode,
      radius: 300,
      radiusUnit: 'KM',
      ratings: '4, 5',
      bestRateOnly: true,
    })
    .catch((error) => {
      return error;
    });

  return await response;
}

export async function getHotelByOfferId(hotelOfferId) {
  const amadeus = await getToken();
  const response = await amadeus.shopping
    .hotelOffer(hotelOfferId)
    .get({
      hotelId: hotelId,
    })
    .catch((error) => error);

  return await response;
}
