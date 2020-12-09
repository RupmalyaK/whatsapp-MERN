const getDayString = {
  0: "Sunday",
  1: "Monday",
  2: "Truesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export default  (hourGap) => {
  const currentDay = new Date().getDay();
  switch (true) {
    case hourGap < 24:
      return "Today";
    case hourGap > 24 && hourGap < 48:
      return "Yesterday";
    case hourGap > 48 && hourGap < 72:
      return getDayString[(currentDay - 2) % 7];
    case hourGap > 72 && hourGap < 96:
      return getDayString[(currentDay - 3) % 7];
    case hourGap > 120 && hourGap < 144:
      return getDayString[(currentDay - 4) % 7];
    case hourGap > 144 && hourGap < 168:
      return getDayString[(currentDay - 5) % 7];
    case hourGap > 168: {
      const date = Date.now() - hourGap * 60 * 60 * 1000;
      return;
    }
  }
};
