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
export const Nfts = async (stakeInfos, network) => {
  const { inviCoreContract } = getContract(network);

  let nftLists = [];
  const unixTimestamp = Math.floor(Date.now() / 1000);
  console.log(unixTimestamp);
  for (let i = 0; i < stakeInfos.length; i++) {
    let element = new Object();
    element.unstakableDate = TimestampToDate(stakeInfos[i].lockEnd);
    let principal = stakeInfos[i].principal;
    let lockPeriod = stakeInfos[i].lockPeriod;
    const expectedReward = await inviCoreContract.methods.getExpectedReward(principal, lockPeriod).call();
    element.expectedRewards = expectedReward;
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
  // nftLists = [
  //   { color: "red", image: RedNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  //   { color: "blue", image: BlueNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  //   { color: "white", image: WhiteNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  //   { color: "red", image: RedNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  //   { color: "blue", image: BlueNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  //   { color: "white", image: WhiteNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  //   { color: "white", image: WhiteNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  //   { color: "red", image: RedNFT, rewards: "0,000.00", token: "Klay", unstakableDate: "20th,August,23" },
  // ];
  return nftLists;
};
