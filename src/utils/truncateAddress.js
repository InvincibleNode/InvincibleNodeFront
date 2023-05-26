/**
 * 지갑 주소 자르기
 */
export const truncateAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};
