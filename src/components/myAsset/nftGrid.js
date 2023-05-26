import styled from "styled-components";
import { useState, useEffect } from "react";
import MoreBtnSVG from "assets/icons/icon_down_purple.svg";
import redClock from "assets/icons/NFTstates/redclock.svg";
import blueClock from "assets/icons/NFTstates/blueclock.svg";
import getContract from "utils/web3/getContract";
import { Nfts } from "./nfts";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import { useRecoilValue } from "recoil";
import NftModal from "./modals/nftModal";
import InviCoreTx from "utils/web3/transactions/InviCoreTx";
import { fixBalance } from "utils/fixBalance";

const ClockStates = {
  red: redClock,
  blue: blueClock,
};

/**
 *
 * @path index.js -> rightNft.js -> nftGrid.js
 */
function NFTGridBox() {
  const [displayCount, setDisplayCount] = useState();
  const [accountNftIds, setAccountNftIds] = useState([]);
  const [accountNftData, setAccountNftData] = useState([]);
  const [accountNftCount, setAccountNftCount] = useState(0);
  const [accountExpectedAmount, setAccountExpectedAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [nftIndex, setNftIndex] = useState(0);
  const [nftInfo, setNftInfo] = useState();
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const { stakeNFTContract } = getContract(network);
  const inviCoreTx = new InviCoreTx(network);

  const getNftData = async () => {
    if (account.address === "") return;
    const nftCount = await stakeNFTContract.methods.balanceOf(account.address).call();

    // get Nft Ids
    let nftIds = [];
    for (let i = 0; i < nftCount; i++) {
      const nftId = await stakeNFTContract.methods.NFTOwnership(account.address, i).call();
      nftIds.push(nftId);
    }
    console.log("nftIds", nftIds);
    setAccountNftIds(nftIds);

    // get Nft stake info
    let stakeInfos = [];
    let expectedRewards = [];
    for (let i = 0; i < nftIds.length; i++) {
      const nftData = await stakeNFTContract.methods.getStakeInfo(nftIds[i]).call();
      console.log(nftData);
      const expectedReward = await inviCoreTx.getExpectedReward(nftData.stakedAmount, nftData.lockPeriod);
      expectedRewards.push(expectedReward);
      stakeInfos.push(nftData);
    }
    setAccountExpectedAmount(expectedRewards);
    setAccountNftCount(stakeInfos.length);
    setDisplayCount(stakeInfos.length > 3 ? 3 : stakeInfos.length);
    setNftInfo(stakeInfos);

    // set Nft data
    const nftData = await Nfts(stakeInfos, network);
    setAccountNftData(nftData);

    console.log(expectedRewards);
  };

  useEffect(() => {
    getNftData();
  }, [account]);

  return (
    <>
      {showModal && (
        <NftModal
          closeModal={() => {
            setShowModal(false);
          }}
          nftData={accountNftData[nftIndex]}
          stakeInfos={nftInfo[nftIndex]}
          expectedReward={accountExpectedAmount[nftIndex]}
          nftId={accountNftIds[nftIndex]}
        />
      )}
      {accountNftData.length > 0 ? (
        <StyledNFTGridBox>
          {accountNftData.slice(0, displayCount).map((nft, index) => (
            <NFTBox
              key={nft.color}
              onClick={() => {
                setShowModal(true);
                setNftIndex(index);
              }}
            >
              {/* <NFTImageBox> */}
              <NFTImage src={nft.image} />
              {/* </NFTImageBox> */}
              <NFTInfoBox color={nft.color}>
                <RewardsBox>
                  <span>Expected Rewards</span>

                  <span>{fixBalance(accountExpectedAmount[index], network)}</span>
                  <span>{nft.token}</span>
                </RewardsBox>
                <UnstakeTimeBox>
                  {ClockStates[nft.color] && <img src={ClockStates[nft.color]} alt={nft.color} />}
                  <UnstakableDate>
                    Invincible Staking NFT
                    <span>{`Unstakable at ${accountNftData[index].unstakableDate}`}</span>
                  </UnstakableDate>
                </UnstakeTimeBox>
              </NFTInfoBox>
            </NFTBox>
          ))}
        </StyledNFTGridBox>
      ) : (
        <NoNft>
          Empty. Nothing Detected. <br /> NFTs will appear on this page after staking!
        </NoNft>
      )}

      {displayCount < accountNftCount && (
        <ShowMoreBtn onClick={() => setDisplayCount(accountNftCount)}>
          <img src={MoreBtnSVG} alt="moreBtn" />
          <span>more</span>
        </ShowMoreBtn>
      )}
    </>
  );
}

export default NFTGridBox;

const StyledNFTGridBox = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 63px;
  row-gap: 47px;
  height: fit-content;
  margin-bottom: 200px;
`;

const NFTBox = styled.div`
  width: 240px;
  height: 340px;
  background-color: ${(props) => props.theme.colors.mediumGray};
  border-radius: 14px;
  position: relative;
  border: 1px solid #0b0b0b;

  &:hover {
    cursor: pointer;
  }
`;

const NFTImageBox = styled.div`
  position: relative;
  top: -1px;
  left: -1px;
  width: 242px;
  height: 242px;
  background-color: ${(props) => props.theme.colors.lightPurple2};
  box-shadow: inset 0px 0px 40px #8a76b2;
  border-radius: 14px;
`;

const NFTImage = styled.img`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 242px;
  height: 241px;
`;

const NFTInfoBox = styled.div`
  position: absolute;
  left: 24px;
  right: 15px;
  height: 100px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => (props.color === "red" ? props.theme.colors.red : "white")};
`;

const RewardsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 500;
  font-size: 12px;
`;

const UnstakeTimeBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  img {
    margin-right: 10px;
  }
  margin-top: 10px;
`;

const UnstakableDate = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  span {
    font-weight: 400;
    font-size: 11px;
  }
`;

const ShowMoreBtn = styled.button`
  height: 20px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0 auto;
  margin-top: -150px;

  span {
    color: ${(props) => props.theme.colors.lightPurple2};
  }
`;

const NoNft = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 100px;
  color: ${(props) => props.theme.colors.lightPurple2};
`;
