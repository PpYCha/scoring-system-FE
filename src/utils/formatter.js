export const formatter = new Intl.NumberFormat(undefined, {
  currency: "PHP",
  style: "currency",
});

export const formatDatePicker = (d) => {
  const date = new Date(d);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Manila",
  });

  const dayjs = require("dayjs");

  const advancedFormat = require("dayjs/plugin/advancedFormat");
  dayjs.extend(advancedFormat);

  const dateAbc = dayjs(formattedDate, "MM/DD/YYYY, HH:mm:ss").format(
    "YYYY-MM-DD HH:mm:ss"
  );

  return dateAbc;
};
