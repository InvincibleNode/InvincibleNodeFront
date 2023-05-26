import { fixBalance } from "utils/fixBalance";
import { getUnixTimestamp } from "utils/time/getUnixTimestamp";
import { secondsToMonths } from "utils/time/secondToMonths";
import { TimestampToDate } from "utils/time/timestampToDate";

/**
 * @path index.js -> rightNft.js -> nftGrid.js -> nftModal.js -> nftData.js -> leverageInfoData.js
 */
export const LeverageInfoData = (stakeInfos, network) => {
  const data = [
    {
      title: "Principal",
      value: fixBalance(stakeInfos.principal, network) + " " + network.token,
    },
    {
      title: "Leveraged",
      value: "x" + stakeInfos.leverageRatio / 10 ** 5,
    },
    {
      title: "TimeLocks",
      value: secondsToMonths(stakeInfos.lockEnd - getUnixTimestamp()) + " left",
    },
    {
      title: "Unstakable Date",
      value: TimestampToDate(stakeInfos.lockEnd),
    },
    {
      title: "Protocol Fees",
      value: stakeInfos.protocolFee / 10 ** 3 + "%",
    },
    {
      title: "Current Accrued Rewards",
      value: "-- " + network.token,
    },
  ];
  return data;
};
