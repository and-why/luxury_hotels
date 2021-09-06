import { db } from '@/lib/firebase-admin';

export async function getAllFavourites(userId, route) {
  try {
    let ref = db.collection('favourites');

    if (route) {
      ref = ref.where('route', '==', route);
    }

    const snapshot = await ref.get();

    const favourites = [];

    snapshot.forEach((doc) => {
      favourites.push({ id: doc.id, ...doc.data() });
    });

    return { favourites };
  } catch (error) {
    return { error };
  }
}
export async function getUserFavourites(userId) {
  const snapshot = await db.collection('favourites').where('userId', '==', userId).get();

  const favourites = [];

  snapshot.forEach((doc, index) => {
    favourites.push({ id: doc.id, ...doc.data() });
  });

  return { favourites };
}

// Bookings
export async function getUserBookings(userId) {
  const snapshot = await db.collection('bookings').where('userId', '==', userId).get();

  const bookings = [];

  snapshot.forEach((doc, index) => {
    bookings.push({ id: doc.id, ...doc.data() });
  });

  return { bookings };
}
