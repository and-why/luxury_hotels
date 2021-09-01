import { makeBooking } from '@/utils/hotels';

export default async (req, res) => {
  console.log(req);
  const response = await makeBooking({ req });

  console.log(response);

  res.status(200).json({ data: res.result });
};
