import RedNFT from "assets/images/nft_red.png";
import BlueNFT from "assets/images/nft_blue.png";
import WhiteNFT from "assets/images/nft_white.png";
import { TimestampToDate } from "utils/time/timestampToDate";
import getContract from "utils/web3/getContract";

const forthComing = 10000000;

/**
 *
 * @param {*} stakeInfos
 * @param {*} network
 * @path index.js -> rightNft.js -> nftGrid.js -> nfts.js
 */
export const Nfts = async (stakeInfos, nftIds, network) => {
  const { inviCoreContract } = getContract(network);

  let nftLists = [];
  const unixTimestamp = Math.floor(Date.now() / 1000);
  for (let i = 0; i < stakeInfos.length; i++) {
    let element = new Object();
    element.createDate = TimestampToDate(stakeInfos[i].lockStart);
    element.unstakableDate = TimestampToDate(stakeInfos[i].lockEnd);
    let principal = stakeInfos[i].principal;
    let lockPeriod = stakeInfos[i].lockPeriod;
    const expectedReward = await inviCoreContract.methods
      .getExpectedReward(principal, lockPeriod)
      .call();
    element.expectedRewards = expectedReward;
    element.principal = principal;
    element.isLent = stakeInfos[i].isLent;
    element.leverageRatio = stakeInfos[i].leverageRatio;
    element.stakedAmount = stakeInfos[i].stakedAmount;
    element.lockEnd = stakeInfos[i].lockEnd;
    element.lockStart = stakeInfos[i].lockStart;
    element.lockPeriod = stakeInfos[i].lockPeriod;
    element.protocolFee = stakeInfos[i].protocolFee;
    element.stakedAmount = stakeInfos[i].stakedAmount;
    element.user = stakeInfos[i].user;
    element.nftId = nftIds[i];

    // colors
    if (stakeInfos[i].lockEnd - unixTimestamp < 0) {
      element.color = "white";
      element.image = WhiteNFT;
    } else if (stakeInfos[i].lockEnd - unixTimestamp < forthComing) {
      element.color = "red";
      element.image = RedNFT;
    } else {
      element.color = "blue";
      element.image = BlueNFT;
    }
    nftLists.push(element);
  }
  return nftLists;
};
