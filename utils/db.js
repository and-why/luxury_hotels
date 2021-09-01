// already set up firebase so import that
import firebase from '@/lib/firebase';

// create a firestore instance from our firebase instance to access firestore
const firestore = firebase.firestore();

// set up function to create a new a user
// takes in an id and their data
export function createUser(uid, data) {
  // call firestore - a collection is a typical table in firestore
  // set the user on the document§
  // doc uid creates an id based on the document uid
  // if()

  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export function getUserData(uid) {
  const data = firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .catch((error) => {
      return error;
    });
  return data;
}

export function updateUser(id, data) {
  return firestore.collection('users').doc(id).update(data);
}

export function updateFavourites(userId, data) {
  const hotelId = data.hotelId;
  firestore
    .collection('favourites')
    .doc(hotelId)
    .set({ hotelData: data }, { merge: true })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.log(error);
    });

  firestore
    .collection('users')
    .doc(userId)
    .update({
      hotelIds: firebase.firestore.FieldValue.arrayUnion(hotelId),
    });
  return;
}

export function removeFromFavourites(userId, data) {
  const hotelId = data.hotelId;
  firestore
    .collection('users')
    .doc(userId)
    .update({
      hotelIds: firebase.firestore.FieldValue.arrayRemove(hotelId),
    });
  return;
}

export function getFavourites(userId) {
  const ref = firestore.collection('favourites').where;
}

export function updateApproved(data) {
  const hotelId = data.hotelId;
  firestore
    .collection('approved')
    .doc(hotelId)
    .set({ hotelData: data }, { merge: true })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.log(error);
    });

  return;
}

export function removeFromApproved(data) {
  // remove from a
  return;
}

// Favourites
export function addBookingDetails(data) {
  const { userId, hotelId, hotelData, bookingInfo } = data;

  firestore.collection('users').doc(userId).update(
    {
      bookings: { hotelId, hotelData, bookingInfo },
    },
    { merge: true },
  );
  return;
}
