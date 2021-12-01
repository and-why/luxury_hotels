import { getAllApproved } from '@/utils/db-admin';

export default allApproved = async (req, res) => {
  try {
    const { approvedHotels } = await getAllApproved();
    res.status(200).json({ approvedHotels });
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
