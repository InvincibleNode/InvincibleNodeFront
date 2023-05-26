import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { stakeInfoAtom } from "store/stakeInfo";
import styled from "styled-components";
import rewardsIndicator from "../../../assets/icons/rewardsIndicator.svg";
import { useEffect } from "react";
import { fixBalance } from "utils/fixBalance";

const RewardInfo = () => {
  const network = useRecoilValue(networkAtom);
  const stakeInfo = useRecoilValue(stakeInfoAtom);

  useEffect(() => {
    console.log("stakeInfo info: ", stakeInfo);
  });

  return (
    <Wrapper>
      <GeneralTitle>General Staking Rewards</GeneralTitle>
      <GeneralDescription>Try comparing both estimated rewards</GeneralDescription>
      <GeneralApr>
        <span>{network.name} network APR</span>
        <span>10%</span>
      </GeneralApr>
      <GeneralReward>
        <span>Estimated rewards</span>
        <span>0.0000 {network.token}</span>
      </GeneralReward>
      <Line></Line>
      <RewardsTitle>Expected Rewards</RewardsTitle>
      <MinMaxRewardsBox>
        <MinRewardsBox>
          <div>
            <MinBox>Min</MinBox>Rewards
          </div>
          <div>
            <MinRewards>{fixBalance(stakeInfo.minReward / 100, network)}</MinRewards>
            {network.token}
          </div>
        </MinRewardsBox>
        <MaxRewardsBox>
          <div>
            <MaxBox>Max</MaxBox>Rewards
          </div>
          <div>
            <MaxRewards>{fixBalance(stakeInfo.maxReward / 100, network)}</MaxRewards>
            {network.token}
          </div>
        </MaxRewardsBox>
      </MinMaxRewardsBox>

      <RewardsLine>{/* <RewardsIndicator src={rewardsIndicator} /> */}</RewardsLine>

      <EstimatedRewardsBox>
        <div>
          Current estimated
          <br /> rewards
        </div>
        <div>
          <span>{fixBalance(stakeInfo.expectedReward, network)}</span>
          <br />
          <div>{network.token}</div>
        </div>
      </EstimatedRewardsBox>

      <TokenAddressText>2023 No.Token Address will be noted on here</TokenAddressText>
    </Wrapper>
  );
};

export default RewardInfo;

const Wrapper = styled.div`
  width: 83%;
  padding: 40px 40px;
  border-radius: 20px 20px 10px 10px;
  background-color: ${(props) => props.theme.colors.navy};
  position: relative;
`;

const GeneralTitle = styled.div`
  color: ${(props) => props.theme.colors.lightPurple1};
  font-size: 16px;
  margin-bottom: 6px;
`;
const GeneralDescription = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.lightPurple1};
  margin-bottom: 20px;
`;
const GeneralApr = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  span {
    font-size: 14px;
    color: ${(props) => props.theme.colors.lightPurple1};
  }
`;
const GeneralReward = styled(GeneralApr)`
  margin-bottom: 30px;
`;

const Line = styled.hr`
  color: ${(props) => props.theme.colors.lightBlue2};
  border-radius: 4px;
  margin-bottom: 25px;
`;

const RewardsTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: white;
  margin-bottom: 30px;
`;

const MinMaxRewardsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  font-weight: 700;
  font-size: 10px;
  color: ${(props) => props.theme.colors.lightPurple1};
  margin-bottom: 40px;
`;

const MinRewardsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MinBox = styled.span`
  border: 1px solid #d8daff;
  border-radius: 2px;
  padding: 2px 3px;
  margin-right: 10px;
`;

const MinRewards = styled.span`
  width: 40px;
  margin-left: 35px;
  margin-right: 2px;
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
  background-color: ${(props) => props.theme.colors.mediumGray};
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

const EstimatedRewardsBox = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  font-weight: 400;
  font-size: 20px;
  div > span {
    font-weight: 800;
  }
  div > div {
    text-align: right;
  }
`;

const TokenAddressText = styled.div`
  height: 10px;
  padding: 5px 0;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.colors.lightPurple2};
`;
