export const extractYearMonthDay = (date: string): string => {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  const monthIndex = originalDate.getMonth();
  const month = monthNames[monthIndex];
  const day = originalDate.getDate().toString().padStart(2, '0');

  return `${day} ${month} ${year}`;
};
