export const arrGroupBy = (arr, prop) => {
  const newArr = arr.reduce((acc, obj) => {
    const key = obj[prop];
    if (!acc[key]) acc[key] = [];
    acc[key].push(obj);

    return acc;
  }, {});
  return newArr;
};
