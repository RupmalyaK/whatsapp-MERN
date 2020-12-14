const getDayString = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export default  (dayGap,date) => {
  const currentDay = new Date().getDay();
  switch (true) {
    case dayGap === 1:
      return "Today";
    case dayGap === 2:
      return "Yesterday";
    case dayGap >= 3 && dayGap <= 6:
      return getDayString[date.getDay()];
    case dayGap > 6:
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getYear() + 1900} `
  }
};
