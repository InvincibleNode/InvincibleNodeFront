import dayjs from "dayjs";

export const TimestampToDate = (timestamp) => {
  const formattedDate = dayjs.unix(timestamp).format("MMMM DD YYYY, h:mm:ss a");

  return formattedDate;
};
