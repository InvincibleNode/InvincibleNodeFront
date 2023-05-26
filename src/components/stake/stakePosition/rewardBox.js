import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { stakeInfoAtom } from "store/stakeInfo";
import styled from "styled-components";
import InviCoreTx from "utils/web3/transactions/InviCoreTx";
import units from "../../../units/units.json";
import TooltipIcon from "assets/icons/tooltipIconQuestionBlue.svg";

export const RewardBox = () => {
  const network = useRecoilValue(networkAtom);
  const stakeInfo = useRecoilValue(stakeInfoAtom);
  const inviCoreTx = new InviCoreTx(network);
  const [apr, setApr] = useState(0.0);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const setAprByTx = async () => {
    await setApr((await inviCoreTx.getStakingAPR()) / units.aprUnit);
  }

  useEffect(() => {
    setAprByTx();
  }, [network])

  return (
    <Box>
      <ExpRewardBox>
        <span>Expected reward</span>
        <div>
          <span>
            {(stakeInfo.expectedReward / 10 ** 18).toFixed(6)} {network.token}
          </span>
        </div>
      </ExpRewardBox>
      <APRBox>
        <span>APR</span>
        <span>{apr}%</span>
      </APRBox>
      <LeveragedAPRBox>
        <div>
        <span>Leveraged APR</span>
        <TooltipIconBox TooltipIcon ={TooltipIcon} onMouseEnter={() => setIsTooltipOpen(true)} onMouseLeave={() => setIsTooltipOpen(false)}>
           {isTooltipOpen &&
        <Tooltip>
              <TooltipTitle>Leveraged APR</TooltipTitle>
              <TooltipDesc>
                <span>
                The leveraged APR is calculated by 
                  <br />
                  multiplying your leverage with the 
                  <br />
                  current APR. This calculation results 
                  <br />
                  in the Expected Rewards, which are 
                  <br />
                  presented based on this APR and 
                  <br />
                  your principal.
                </span>
              </TooltipDesc>
            </Tooltip>}
        </TooltipIconBox>
        </div>
       
        <span>{apr * stakeInfo.leverageRatio}%</span>
      </LeveragedAPRBox>
    </Box>
  );
};

const Box = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 500;
  padding: calc(1.6rem * 0.8) calc(2.4rem * 0.8);
  margin: 0 calc(0.3rem * 0.8) calc(5rem * 0.8) calc(0.3rem * 0.8);
  width: calc(43.2rem * 0.8 - 1.6rem * 0.8 * 2 - 0.8rem * 0.8 );
  font-size: 1.28rem;
  gap: 0.96rem;
  border-bottom: 0.2rem solid #D8DAFF;
`;

const ExpRewardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.darkGray};

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.black};
  }
`;

const APRBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.mediumDarkGray};
`;

const LeveragedAPRBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.blue1};
`;

const TooltipIconBox = styled.div`
 display: inline-block;
  position: relative;
  background-image: ${(props) => `url(${props.TooltipIcon})`};
  background-size: cover;
  width: 1.008rem;
  height: 1.008rem;
  margin-left: 0.56rem;
`;

const Tooltip = styled.div`
  position: absolute;
  width : 18.24rem;
  height: 11.28rem;
  padding: 1.28rem;
  background-color: ${(props) => props.theme.colors.blue3};
  border-radius: 0.8rem;
  z-index: 8;
  font-family: Pretendard;
  color: #fff;
  bottom: 100%;
  top: calc(100% + 0.32rem);
  left: calc(100% - 10.88rem);
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: rotate(180deg);
    margin-left: -0.4rem;
    border-width: 0.4rem;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.blue3} transparent transparent transparent;
  }
`;

const TooltipTitle = styled.div`
  font-size: 1.12rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
`;

const TooltipDesc = styled.div`
  font-size: 1.12rem;
  font-weight: 300;
  line-height: 1.44rem;
`;