import { db } from '@/lib/firebase-admin';

export async function getAllFavourites(userId, route) {
  try {
    let ref = db.collection('favourites');

    console.log(ref);
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
