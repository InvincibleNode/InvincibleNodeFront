import { useState } from "react";
import styled from "styled-components";
import TooltipIconQuestion from "../../assets/icons/tooltipIconQuestion.svg";

const LoanHeader = () => {
  const [showPeriodTooltip, setShowPeriodTooltip] = useState(false);

  return (
    <Head>
      <Component1>NFT</Component1>
      <Component2>Principal</Component2>
      <Component3>
        Evaluation
        <TooltipIcon
          TooltipIcon={TooltipIconQuestion}
          onMouseEnter={() => setShowPeriodTooltip(true)}
          onMouseLeave={() => setShowPeriodTooltip(false)}
        >
          {showPeriodTooltip && (
            <Tooltip>
              <TooltipTitle>NFT Evaluation</TooltipTitle>
              <TooltipDesc>
                <span>
                  The evaluation of each NFT is used to determine its estimated
                  value, which is determined by your staking principle and
                  expected rewards upon final settlement. The NFT will be
                  considered as 100% collateral, used to calculate the LTV
                  ratio, and the maximum amount of INVI you will be able to
                  borrow.
                </span>
              </TooltipDesc>
            </Tooltip>
          )}
        </TooltipIcon>
      </Component3>
      <Component4>TimeLeft</Component4>
      <Component5>Max. LTV</Component5>
      <Component6>Borrow & Repay</Component6>
    </Head>
  );
};

export default LoanHeader;

const Head = styled.thead`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-horizontal: 24px;
  padding: 0px 24px;
`;

const Component = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.colors.purple1};
  text-align: center;
`;

const Component1 = styled(Component)`
  width: 15%;
`;
const Component2 = styled(Component)`
  width: 15%;
`;
const Component3 = styled(Component)`
  width: 15%;
`;
const Component4 = styled(Component)`
  width: 15%;
`;
const Component5 = styled(Component)`
  width: 20%;
  color: ${(props) => props.theme.colors.blue1};
`;
const Component6 = styled(Component)`
  width: 15%;
  color: ${(props) => props.theme.colors.blue1};
`;

const TooltipIcon = styled.div`
  display: inline-block;
  position: relative;
  background-image: ${(props) => `url(${props.TooltipIcon})`};
  background-size: cover;
  width: 12px;
  height: 12px;
  margin-left: 10px;
`;

const Tooltip = styled.div`
  position: absolute;
  width: 203px;
  height: 216px;
  top: calc(100% + 12px);
  left: calc(50% + 90px);
  transform: translateX(-50%);
  text-align: center;
  background-color: ${(props) => props.theme.colors.blue3};
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: white;
  z-index: 100;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: calc(50% - 90px);
    transform: rotate(180deg);
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.blue3} transparent transparent
      transparent;
  }
`;

const TooltipTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 14px;
`;

const TooltipDesc = styled.div`
  width: 203px;
  height: 187px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  text-align: justify;
  line-height: 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
