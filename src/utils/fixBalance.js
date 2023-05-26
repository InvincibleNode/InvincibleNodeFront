import { NETWORK_KLAYTN } from "./constants/network.constant";

export const fixBalance = (balance, network) => {
  if (balance <= 0) return 0;

  if (network.id == NETWORK_KLAYTN.id) {
    return Number(balance / 10 ** 18).toFixed(5);
  } else {
    return Number(balance / 10 ** 18).toFixed(5);
  }
};
