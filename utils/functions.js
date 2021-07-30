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
