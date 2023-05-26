import styled from "styled-components";
import NFTGridBox from "components/myAsset/nftGrid";
import expired from "assets/icons/NFTstates/whiteState.svg";
import forthcoming from "assets/icons/NFTstates/redState.svg";
import ongoing from "assets/icons/NFTstates/blueState.svg";
import getContract from "../../utils/web3/getContract";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { accountAtom } from "store/account";
import { Button } from "styles/styledComponents/button";
import { routeStake } from "components/common/routePath";
import { useNavigate } from "react-router-dom";

/**
 * @path index.js => rightNft.js
 */
export const RightNft = () => {
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const [accountNftCount, setAccountNftCount] = useState(0);
  const { stakeNFTContract } = getContract(network);
  const navigate = useNavigate();

  console.log(network, account);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNftContractData = async () => {
    if (account.address === "") return;
    const nftCount = await stakeNFTContract.methods.balanceOf(account.address).call();
    setAccountNftCount(nftCount);
    console.log(nftCount);
  };

  useEffect(() => {
    getNftContractData();
  }, [account.address, getNftContractData]);

  return (
    <RightNFTBox>
      <NFTHeader>
        <NFTTitle>NFT</NFTTitle>
        {accountNftCount !== 0 ? (
          <NFTDesc>
            You have {accountNftCount} NFTs that you had staked via the invincible’s
            <br />
            leveraged staking on the Klaytn Network.
          </NFTDesc>
        ) : null}
      </NFTHeader>
      <TotalNftBox>
        Total NFTs <span>{accountNftCount}</span>
      </TotalNftBox>
      <NFTGridBox />
      <StatesBox>
        <StateBtn>
          <img src={forthcoming} alt="forthcoming" />
          <span>Forthcoming</span>
        </StateBtn>
        <StateBtn>
          <img src={ongoing} alt="ongoing" />
          <span>Ongoing</span>
        </StateBtn>
        <StateBtn>
          <img src={expired} alt="expired" />
          <span>Expired</span>
        </StateBtn>
      </StatesBox>
      <StakingButton
        onClick={() => {
          routeStake(navigate);
        }}
      >
        Staking
      </StakingButton>
    </RightNFTBox>
  );
};

const RightNFTBox = styled.div`
  margin-top: 31px;
  margin-left: 62px;
  margin-right: 86px;
  position: relative;
  width: 90%;
`;

const NFTHeader = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.lightPurple2};
`;

const NFTTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  font-family: Montserrat;
  line-height: 50px;
`;

const NFTDesc = styled.div`
  font-weight: 500;
  margin-top: 18px;
  font-size: 16px;
`;

const TotalNftBox = styled.div`
  position: absolute;
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.colors.lightPurple2};
  right: 0px;
  top: 89px;
  span {
    margin-left: 15px;
  }
`;

const StatesBox = styled.div`
  width: 340px;
  height: 29px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  right: -35px;
  top: 0px;
`;

const StateBtn = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.mediumGray};
  span {
    font-size: 14px;
    font-weight: 500;
    color: white;
  }

  img {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
`;

const StakingButton = styled(Button)`
  width: 300px;
  height: 63.6px;
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  border-radius: 50px;
  color: white;
  font-weight: 800;
  font-size: 22px;
  margin: 132px auto 0 auto;
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
`;
