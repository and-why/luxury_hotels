import { getAllHotels } from '@/utils/hotels';

export default async (req, res) => {
  try {
    const { cityCode } = req.query;
    const hotels = await getAllHotels(cityCode);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
