import styled from "styled-components";
import expired from "assets/icons/NFTstates/whiteState.svg";
import forthcoming from "assets/icons/NFTstates/redState.svg";
import ongoing from "assets/icons/NFTstates/blueState.svg";
import ongoingCircle from "assets/icons/NFTstates/ongoingCircle.svg";
import nftPreviewBlue from "assets/icons/NFTstates/nftPreviewBlue.svg";
import nftPreviewRed from "assets/icons/NFTstates/nftPreviewRed.svg";
import nftPreviewWhite from "assets/icons/NFTstates/nftPreviewWhite.svg";
import blueBallLocked from "assets/icons/NFTstates/blueBallLocked.png";
import orangeBallLocked from "assets/icons/NFTstates/orangeBallLocked.png";
import whiteBallLocked from "assets/icons/NFTstates/whiteBallLocked.png";
import blueBallUnlocked from "assets/icons/NFTstates/blueBallUnlocked.png";
import orangeBallUnlocked from "assets/icons/NFTstates/orangeBallUnlocked.png";
import whiteBallUnlocked from "assets/icons/NFTstates/whiteBallUnlocked.png";

import lock from "assets/icons/NFTstates/lock.svg";
import { useEffect, useState } from "react";
import nftBackgroundBlack from "assets/images/nftBackgroundBlack.png";
import nftBackgroundWhite from "assets/images/nftBackgroundWhite.png";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import { secondsToMonths } from "utils/time/secondToMonths";

/**
 *
 * @path index.js -> rightNft.js -> nftGrid.js -> nftModal.js -> nftOverall.js -> overallInfo.js
 */
const OverallInfo = ({ nftData, stakeInfos }) => {
  const [state, setState] = useState("forthcoming");
  const [color, setColor] = useState();
  const [locked, setLocked] = useState(true);
  const network = useRecoilValue(networkAtom);

  const StateComponent = () => {
    if (state === "forthcoming") {
      return (
        <State>
          <img src={forthcoming} alt="forthcoming" />
          <span>Forthcoming</span>
        </State>
      );
    }
  };
  const LockComponent = () => {
    if (locked) {
      return (
        <LockStatus>
          <LockImg
            src={
              stakeInfos.isLent
                ? color == "blue"
                  ? blueBallLocked
                  : color == "red"
                  ? orangeBallLocked
                  : whiteBallLocked
                : color == "blue"
                ? blueBallUnlocked
                : color == "red"
                ? orangeBallUnlocked
                : whiteBallUnlocked
            }
          />
        </LockStatus>
      );
    }
  };

  useEffect(() => {
    setColor(nftData.color);
  }, [nftData]);

  return (
    <Wrapper>
      <Header>
        {StateComponent()}
        <Top>NFT Details</Top>
        {LockComponent()}
      </Header>
      <NftStatus>
        <Title color={color} isLent={stakeInfos.isLent}>
          Staking <br /> NFT
        </Title>
        <StatusWrapper>
          <StatusBackground src={stakeInfos.isLent ? nftBackgroundBlack : nftBackgroundWhite}></StatusBackground>
          <NftImg src={color == "blue" ? nftPreviewBlue : color == "red" ? nftPreviewRed : nftPreviewWhite}></NftImg>
          <StatusTextWrapper>
            <StatusTitle color={color}>NFT</StatusTitle>
            <PrincipleWrapper>
              <span>Principle</span>
              <Value color={color}>
                {fixBalance(stakeInfos.principal, network)} {network.token}
              </Value>
            </PrincipleWrapper>
            <LeverageWrapper>
              <span>Leverage</span>
              <Value color={color}>x{stakeInfos.leverageRatio / 10 ** 5}</Value>
            </LeverageWrapper>
            <ProtocolFeeWrapper>
              <span>Protocol Fee</span>
              <Value color={color}>{stakeInfos.protocolFee / 10 ** 3}%</Value>
            </ProtocolFeeWrapper>
            <TimeLockWrapper>
              <span>Time Lock</span>
              <Value color={color}>{secondsToMonths(stakeInfos.lockPeriod)}</Value>
            </TimeLockWrapper>
          </StatusTextWrapper>
        </StatusWrapper>
      </NftStatus>
    </Wrapper>
  );
};

export default OverallInfo;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
`;
const Header = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: space-between;
`;
const State = styled.div`
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

const Top = styled.div`
  color: ${(props) => (props.isLent ? props.theme.colors.white : props.theme.colors.navy)};
  text-align: left;
  margin: auto;
  margin-right: 200px;
`;

const LockImg = styled.img`
  position: absolute;
  right: 0;
`;
const LockStatus = styled.div`
  position: relative;
`;
const LockBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  border-radius: 35px;
  width: 70px;
  height: 70px;

  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 41.68%, #000000 64.9%);
`;
const LockImage = styled.img`
  position: absolute;
  top: 18px;
  right: 21px;
  z-index: 1;
`;

const NftStatus = styled.div`
  margin-top: 50px;
`;
const Title = styled.div`
  color: ${(props) =>
    props.isLent
      ? props.theme.colors.white
      : props.color === "blue"
      ? props.theme.colors.blue1
      : props.color === "red"
      ? props.theme.colors.forthcomingRed
      : props.theme.colors.darkGray};
  font-size: 45px;
  margin-bottom: 25px;
  font-weight: 900;
`;
const NftImg = styled.img`
  position: absolute;
  width: 200px;
  height: 270px;
  top: -80px;
  z-index: 1;
`;
const StatusWrapper = styled.div`
  width: 100%;
  background: ${(props) => (props.isLent ? "rgba(37, 36, 35, 0.2)" : props.theme.colors.white)};
  backdrop-filter: blur(25px);
  height: 300px;
  border-radius: 14px;
  z-index: 0;

  display: flex;
  justify-content: center;
`;
const StatusBackground = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  z-index: -1;
  border-radius: 0px 0px 14px 14px;
`;

const StatusTextWrapper = styled.div`
  width: 80%;
`;
const StatusTitle = styled.div`
  margin-top: 150px;
  margin-bottom: 10px;
  color: ${(props) =>
    props.color === "blue" ? props.theme.colors.blue1 : props.color === "red" ? props.theme.colors.forthcomingRed : props.theme.colors.white};
`;
const Value = styled.div`
  color: ${(props) =>
    props.color === "blue" ? props.theme.colors.blue1 : props.color === "red" ? props.theme.colors.forthcomingRed : props.theme.colors.white};
`;

const PrincipleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const LeverageWrapper = styled(PrincipleWrapper)``;
const ProtocolFeeWrapper = styled(PrincipleWrapper)``;
const TimeLockWrapper = styled(PrincipleWrapper)``;
