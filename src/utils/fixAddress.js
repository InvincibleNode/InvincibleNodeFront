export const fixAddress = (address, maxLength) => {
  if (address === "" || address === undefined) return "";
  const truncatedString =
    address.slice(0, maxLength) + (address.length > maxLength ? "..." : "");

  return truncatedString;
};
