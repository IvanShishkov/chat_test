export const useDate = (date) => {
  let dateFormat;
  let diffDays = Math.floor(
    (Date.parse(new Date()) - Date.parse(date)) / 86400000
  );
  const addZero = (date) => {
    return `0${date}`;
  };
  const formateDateToFull = (nowDate) => {
    let day = new Date(nowDate).getDate();
    let month = new Date(nowDate).getMonth() + 1;
    let year = new Date(nowDate).getFullYear().toString().substr(-2);
    if (day <= 9) {
      day = addZero(day);
    }
    if (month <= 9) {
      month = addZero(month);
    }
    return `${day}.${month}.${year}`;
  };
  const formateDateToMinutes = (date) => {
    return `${new Date(date).getHours()}:${
      new Date(date).getMinutes() <= 9
        ? "0" + new Date(date).getMinutes()
        : new Date(date).getMinutes()
    }`;
  };

  if (diffDays >= 1) {
    dateFormat = formateDateToFull(date);
  } else {
    dateFormat = formateDateToMinutes(date);
  }
  return {
    dateFormat,
  };
};
