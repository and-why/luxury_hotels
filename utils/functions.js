export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'AUD',
});

export const formatDate = (date) => {
  let startDate = new Date(date);
  return new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
};

export const lengthOfStay = (checkIn, checkOut) => {
  return (new Date(checkOut) - new Date(checkIn)) / 24 / 60 / 60 / 1000;
};
