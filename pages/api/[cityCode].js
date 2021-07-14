import getHotels from '@/utils/hotels';

export default async (req, res) => {
  try {
    const cityCode = req.query;
    console.log(cityCode);

    const hotels = await getHotels(cityCode);

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error });
  }
};
