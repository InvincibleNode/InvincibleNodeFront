import { fixBalance } from "utils/fixBalance";
import { getUnixTimestamp } from "utils/time/getUnixTimestamp";
import { secondsToMonths } from "utils/time/secondToMonths";
import { TimestampToDate } from "utils/time/timestampToDate";
import LendingPoolTx from "utils/web3/transactions/LendingPoolTx";

/**
 *
 * @param {*} stakeInfos
 * @param {*} network
 * @param {*} nftData
 * @param {*} lendingPoolTx
 * @param {*} nftId
 * @path index.js -> rightNft.js -> nftGrid.js -> nftModal.js -> nftData.js -> loanInfoData.js
 */
export const LoanInfoData = async (stakeInfos, network, nftData, lendingPoolTx, nftId) => {
  if (stakeInfos.isLent) {
    console.log(nftId);
    //const loanInfo = await lendingPoolTx.getLendInfo(nftId);
    //console.log(loanInfo);
  }
  const data = [
    {
      title: "Collateralized",
      value: "dd / mm / yy",
    },
    {
      title: "Evaluated",
      value: "-- " + network.token,
    },
    {
      title: "Borrowed",
      value: "0.0000" + "INVI",
    },
    {
      title: "Protocol Fees",
      value: "-- " + network.token,
    },
  ];
  return data;
};
