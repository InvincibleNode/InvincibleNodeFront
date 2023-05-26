import Header from "components/common/header/header";
import { Background } from "styles/styledComponents/background";
import styled from "styled-components";
import NFTPreview from "./nftPreview";
import SetStakingPosition from "./stakePosition";
import { useState, useEffect } from "react";
import { networkAtom } from "store/network";
import { useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import { size } from "styles/styledComponents/media/mediaSize";
import { Space } from "components/common/Space";

function StakePage() {
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);

  const [stakeAmount, setStakeAmount] = useState(0.0);
  const [leveragedAmount, setLeveragedAmount] = useState(1);
  const [period, setPeriod] = useState(14);
  const [reward, setReward] = useState(1.03);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
  }, [showTooltip]);

  const changeLeveragedAmount = (value) => {
    setLeveragedAmount(value);
  };

  const getShowTooltip = () => {
    setShowTooltip(true);
  };

  return (
    <Background launchApp={true}>
      <Header launchApp={true} showTooltip={showTooltip} />

      <TitleText>Leveraged staking</TitleText>
      <DescText>Check your NFT beforehand, while you set the leverage liquid staking position</DescText>
      <StakingWrapper>
        <NFTPreview token={network.token} stakeAmount={stakeAmount} leveragedAmount={leveragedAmount} period={period} reward={reward} setReward={setReward} />
        <SetStakingPosition getShowTooltip={getShowTooltip} />
      </StakingWrapper>
      <Space/>
    </Background>
  );
}

export default StakePage;

const TitleText = styled.div`
  font-weight: 900;
  color: white;
  text-align: center;
  font-size: 4rem;
  margin-top: 7.2rem;
  margin-bottom: 2rem;
  font-family: Pretendard;
`;

const DescText = styled.div`
font-family: Pretendard;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 2rem;
`;

const StakingWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  margin-top: 5.3rem;
flex-direction: row;
  @media (width < ${size.tablet}) {
    flex-direction: column-reverse;
    align-content: center;
    align-items: center;
  }
`;


