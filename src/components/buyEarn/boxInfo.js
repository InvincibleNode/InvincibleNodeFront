import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import LpPoolTx from "utils/web3/transactions/LpPoolTx";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";

/**
 *
 * @param {*} option
 * @param {*} view
 * @param {*} index
 * @param {*} network
 * @param {*} address
 * @path index.js -> buyEarn.js -> buyEarnInfo.js -> infoRows.js -> boxInfo.js
 */
export const BoxInfo = async (option, view, index, network, address) => {
  //------Tx objects------//
  const lpPoolTx = new LpPoolTx(network);
  const inviTokenTx = new InviTokenTx(network);
  const inviTokenStakeTx = new InviTokenStakeTx(network);

  //------Values------//
  console.log(address);
  const totalLiquidity = await lpPoolTx.getTotalLiquidity();
  const stakedAmount = await lpPoolTx.getStakedAmount(address);
  const inviStakedAmount = await inviTokenStakeTx.getStakedAmount(address);
  const inviRewardAmount = await inviTokenStakeTx.getNativeRewardAmount(address);

  //------return------//
  let title, value;
  if (option === 0) {
    if (view === 0) {
      if (index === 0) {
        title = "Total ILP Supplied";
        value = totalLiquidity;
      } else if (index === 1) {
        title = "Total Provided Liquidity";
        value = totalLiquidity;
      }
    } else if (view === 1) {
      if (index === 0) {
        title = "Total Supply";
        value = totalLiquidity;
      } else if (index === 1) {
        title = "Total Provided Liquidity";
        value = totalLiquidity;
      } else if (index === 2) {
        title = "Supplied Liquidity";
        value = stakedAmount;
      } else if (index === 3) {
        title = "Received Fees";
        value = "1,000,000,000";
      } else if (index === 4) {
        title = "$ILP Balance";
        value = "1,000,000,000";
      } else if (index === 5) {
        title = "$INVI Balance";
        value = "1,000,000,000";
      } else if (index === 6) {
        title = "Staked $INVI";
        value = "1,000,000,000";
      }
    }
  } else {
    if (index === 0) {
      title = "Total Staked";
      value = inviStakedAmount;
    } else if (index === 1) {
      title = "Accrued Reward";
      value = inviRewardAmount;
    } else if (index === 2) {
      title = "Reward Distribution";
      value = "-";
    }
  }
  console.log(title, value);
  return [title, fixBalance(value, network)];
};
