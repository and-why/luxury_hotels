import { getUserBookings } from '@/utils/db-admin';
import { auth } from '@/lib/firebase-admin';

const bookingData = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { bookings } = await getUserBookings(uid);
    console.log('bookings api:', bookings);
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default bookingData;
