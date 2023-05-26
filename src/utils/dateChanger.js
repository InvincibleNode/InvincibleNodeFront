import dayjs from "dayjs";

/**
 * 날짜 형식을 yyyy/mm/dd로 변경
 */
export const dateChanger = (dateString) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
};

/**
 * 날짜 자르기 dd/mm/yy
 */
export const dateChangerShorter = (dateString) => {
  const dateObj = new Date(dateString);
  const year = String(dateObj.getFullYear()).slice(-2);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

/**
 * yyyy-mm-dd\nhh:mm:ss로 변환
 */
export const dateChangerLonger = (dateTimeString) => {
  const dateObj = new Date(dateTimeString);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}\n${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

/**
 * 오늘부터 얼마나 남았는지 (달 포함)
 */
export const calculateRemainingTime = (dateTimeString) => {
  const targetDate = new Date(dateTimeString);
  const currentDate = new Date();

  const timeDiff = targetDate - currentDate;

  if (timeDiff <= 0) {
    return "";
  }

  const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const remainingMonths = Math.floor(remainingDays / 30);
  const remainingDaysInMonth = remainingDays % 30;

  return `${remainingMonths} Mths ${remainingDaysInMonth} dys`;
};

/**
 * 오늘부터 얼마나 남았는지 (일로만)
 */
export const calculateRemainingDays = (endDate) => {
  const end = new Date(endDate);
  const start = new Date();

  const timeDiff = end.getTime() - start.getTime();

  if (timeDiff < 0) {
    return "";
  }

  const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return `${remainingDays} days left`;
};

/**
 * 기간을 Mths와 dys로 표현하는 함수
 */
export const calculateDuring = (duration) => {
  const months = Math.floor(duration / (30 * 24 * 60 * 60));
  const days = Math.floor((duration % (30 * 24 * 60 * 60)) / (24 * 60 * 60));

  return `${months} Mths ${days} dys`;
};
