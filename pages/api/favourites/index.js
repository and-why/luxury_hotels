import { getUserFavourites } from '@/utils/db-admin';
import { auth } from '@/lib/firebase-admin';

const favouriteData = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { favourites } = await getUserFavourites(uid);
    console.log('favourites api:', favourites);
    res.status(200).json({ favourites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default favouriteData;
