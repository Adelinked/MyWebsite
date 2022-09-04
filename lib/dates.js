export const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const days = d.getDate();
  return `${months[d.getMonth()]} ${Number(days) < 10 ? `0${days}` : days}`;
};

export const completeDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const days = d.getDate();
  const year = d.getFullYear();
  return `${months[d.getMonth()]} ${
    Number(days) < 10 ? `0${days}` : days
  }, ${year}`;
};
