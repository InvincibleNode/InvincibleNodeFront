import { useState, useEffect } from "react";
import getContract from "utils/web3/getContract";
import { Nfts } from "./nfts";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import { useRecoilValue } from "recoil";
import InviCoreTx from "utils/web3/transactions/InviCoreTx";
import { TYPES } from "components/myAsset/NavBar/NFTBox";

/**
 * 현재 소유 중인 NFT 정보를 불러오는 훅.
 * 타입(TYPES에서 선택 가능)
 */
export const useNFT = (type) => {
  const [isLogined, setIsLogined] = useState(false);
  const [accountNftIds, setAccountNftIds] = useState([]); //TODO
  const [accountNftData, setAccountNftData] = useState([]);
  const [accountNftCount, setAccountNftCount] = useState(0);
  const [accountExpectedAmount, setAccountExpectedAmount] = useState(0); //TODO
  const [nftInfo, setNftInfo] = useState();
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const { stakeNFTContract } = getContract(network);
  const inviCoreTx = new InviCoreTx(network);

  const getNftData = async () => {
    if (account.address === "") return;
    const nftCount = await stakeNFTContract.methods
      .balanceOf(account.address)
      .call();

    // get Nft Ids
    let nftIds = [];
    for (let i = 0; i < nftCount; i++) {
      const nftId = await stakeNFTContract.methods
        .NFTOwnership(account.address, i)
        .call();
      nftIds.push(nftId);
    }

    // get Nft stake info
    let stakeInfos = [];
    let expectedRewards = [];
    for (let i = 0; i < nftIds.length; i++) {
      const nftData = await stakeNFTContract.methods
        .getStakeInfo(nftIds[i])
        .call();
      const expectedReward = await inviCoreTx.getExpectedReward(
        nftData.stakedAmount,
        nftData.lockPeriod
      );
      expectedRewards.push(expectedReward);
      stakeInfos.push(nftData);
    }

    // stakeinfos, rewards에서 type에 따라 분리
    let settingNftIds = [];
    let settingInfos = [];
    let settingRewards = [];
    switch (type) {
      //Staked
      case TYPES[1].title:
        stakeInfos.forEach((stake, idx) => {
          if (!stake.isLent) {
            settingInfos.push(stake);
            settingRewards.push(expectedRewards[idx]);
            settingNftIds.push(nftIds[idx]);
          }
        });
        break;
      //collateralized
      case TYPES[2].title:
        stakeInfos.forEach((stake, idx) => {
          if (stake.isLent) {
            settingInfos.push(stake);
            settingRewards.push(expectedRewards[idx]);
            settingNftIds.push(nftIds[idx]);
          }
        });
        break;
      default:
        break;
    }

    // logined
    setIsLogined(true);

    // stakeInfo, rewards
    if (!type || type === TYPES[0].title) {
      setAccountExpectedAmount(expectedRewards);
      setAccountNftCount(stakeInfos.length);
      setNftInfo(stakeInfos);
      setAccountNftIds(nftIds);

      const nftData = await Nfts(stakeInfos, nftIds, network);
      setAccountNftData(nftData);
    } else {
      setAccountExpectedAmount(settingRewards);
      setAccountNftCount(settingInfos.length);
      setNftInfo(settingInfos);
      setAccountNftIds(settingNftIds);
      const nftData = await Nfts(settingInfos, settingNftIds, network);
      setAccountNftData(nftData);
    }
  };

  useEffect(() => {
    if (account.address === "") setIsLogined(false);
    getNftData();
  }, [account, type]);

  return {
    isLogined,
    accountExpectedAmount,
    accountNftData,
    accountNftCount,
    accountNftIds,
    nftInfo,
  };
};
