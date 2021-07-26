import { getAllFavourites } from '@/utils/db-admin';

export default async (req, res) => {
  try {
    const { userId } = req.query;
    const { favourites } = await getAllFavourites(userId);

    res.status(200).json({ favourites });
  } catch (error) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message,
    );

    res.status(500).json({ error });
  }
};
