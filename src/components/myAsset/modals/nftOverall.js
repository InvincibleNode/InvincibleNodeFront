import styled from "styled-components";
import OverallInfo from "./overallInfo";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import { useEffect, useState } from "react";

/**
 *
 * @path index.js -> rightNft.js -> nftGrid.js -> nftModal.js -> nftOverall.js
 */
const NftOverall = ({ nftData, stakeInfos, expectedReward }) => {
  // needs change
  const network = useRecoilValue(networkAtom);
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(nftData.color);
  }, [nftData]);

  return (
    <Wrapper>
      <OverallInfo nftData={nftData} stakeInfos={stakeInfos}></OverallInfo>
      <Rewards>
        <RewardsTitle isLent={stakeInfos.isLent} color={color}>
          Expected Rewards
        </RewardsTitle>
        <MinMaxRewardsBox>
          <MinRewardsBox isLent={stakeInfos.isLent} color={color}>
            <div>
              <MinBox>Min</MinBox>Rewards
            </div>
            <div>
              <MinRewards>{fixBalance(stakeInfos.minReward / 100, network)}</MinRewards>
              {network.token}
            </div>
          </MinRewardsBox>
          <MaxRewardsBox isLent={stakeInfos.isLent} color={color}>
            <div>
              <MaxBox>Max</MaxBox>Rewards
            </div>
            <div>
              <MaxRewards>{fixBalance(stakeInfos.maxReward / 100, network)}</MaxRewards>
              {network.token}
            </div>
          </MaxRewardsBox>
        </MinMaxRewardsBox>

        <RewardsLine>{/* <RewardsIndicator src={rewardsIndicator} /> */}</RewardsLine>

        <EstimatedRewardsBox isLent={stakeInfos.isLent} color={color}>
          <div isLent={stakeInfos.isLent} color={color}>
            Current estimated rewards
          </div>
          <div>
            <span isLent={stakeInfos.isLent} color={color}>
              {(expectedReward / 10 ** 18).toFixed(6)} {network.token}
            </span>
          </div>
        </EstimatedRewardsBox>
      </Rewards>
    </Wrapper>
  );
};

export default NftOverall;

const Wrapper = styled.div`
  width: 530px;
`;
const Rewards = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 45px;
`;

const Color = styled.div`
  color: ${(props) =>
    props.isLent
      ? props.theme.colors.white
      : props.color === "blue"
      ? props.theme.colors.blue1
      : props.color === "red"
      ? props.theme.colors.forthcomingRed
      : props.theme.colors.darkGray};
`;

const RewardsTitle = styled(Color)`
  font-weight: 700;
  font-size: 20px;

  margin-bottom: 30px;
  color: ${(props) =>
    props.isLent
      ? props.theme.colors.white
      : props.color === "blue"
      ? props.theme.colors.blue1
      : props.color === "red"
      ? props.theme.colors.forthcomingRed
      : props.theme.colors.darkGray};
`;

const MinMaxRewardsBox = styled(Color)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  font-weight: 700;
  font-size: 10px;
  color: ${(props) => props.theme.colors.lightPurple1};
  margin-bottom: 20px;
`;

const MinRewardsBox = styled(Color)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
`;

const MinBox = styled.span`
  border: 1px solid ${(props) => props.theme.colors.blue1};
  border-radius: 2px;
  padding: 2px 3px;
  margin-right: 10px;
`;

const MinRewards = styled.span`
  width: 40px;
  margin-left: 35px;
  margin-right: 2px;
  font-weight: 700;
`;

const MaxRewardsBox = styled(MinRewardsBox)``;

const MaxBox = styled(MinBox)``;

const MaxRewards = styled.span`
  width: 40px;
  margin-left: 35px;
  margin-right: 2px;
`;

const RewardsLine = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${(props) => props.theme.colors.black};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: relative;
`;

const RewardsIndicator = styled.img`
  position: absolute;
  top: -15px;
  left: 50%;
  width: 50px;
  height: 80px;
`;

const EstimatedRewardsBox = styled(Color)`
  margin-top: 30px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  font-weight: 700;

  div > span {
    font-weight: 700;
    font-size: 20px;
    color: ${(props) =>
      props.isLent
        ? props.theme.colors.white
        : props.color === "blue"
        ? props.theme.colors.blue1
        : props.color === "red"
        ? props.theme.colors.forthcomingRed
        : props.theme.colors.darkGray};
  }
  div {
    text-align: right;
    font-size: 12px;
    color: ${(props) =>
      props.isLent
        ? props.theme.colors.white
        : props.color === "blue"
        ? props.theme.colors.blue1
        : props.color === "red"
        ? props.theme.colors.forthcomingRed
        : props.theme.colors.darkGray};
  }
`;
