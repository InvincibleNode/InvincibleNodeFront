import styled from "styled-components";
import TooltipIconQuestion from "../../assets/icons/tooltipIconQuestionBlue.svg";
import { useState } from "react";

export const AprBox = () => {
  const [showPeriodTooltip, setShowPeriodTooltip] = useState(false);

  return (
    <Wrapper>
      <Title>
        <YieldText>Expected Yield</YieldText>
        <QuestionIcon src={TooltipIconQuestion} onMouseEnter={() => setShowPeriodTooltip(true)} onMouseLeave={() => setShowPeriodTooltip(false)} />
        {showPeriodTooltip && (
          <Tooltip>
            <TooltipTitle>Expected yield & APR</TooltipTitle>
            <TooltipDesc>
              <span>
                This is the estimated APR, which is based on the market price of each token and the fees generated so far when the user executes a swap. The
                reward will be distributed based on your liquidity share(%), and you receive this as the original token used for user’s swap.
              </span>
            </TooltipDesc>
          </Tooltip>
        )}
      </Title>
      <Box>
        <AprText>APR</AprText>
        <AprValue>0.00%</AprValue>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightPurple};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 30px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
`;
const YieldText = styled.div`
  font-size: 14px;
  margin: auto;
  margin-left: 20px;
  margin-right: 4px;
  font-weight: 600;
`;
const QuestionIcon = styled.img`
  width: 14px;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
`;
const AprText = styled.div`
  margin: auto;
  color: ${(props) => props.theme.colors.blue1};
  font-weight: 700;
  margin-right: 20px;
`;
const AprValue = styled(AprText)``;

const Tooltip = styled.div`
  position: absolute;
  width: 203px;
  top: calc(67%);
  left: calc(49.5%);
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
    border-color: ${(props) => props.theme.colors.blue3} transparent transparent transparent;
  }
`;

const TooltipTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 14px;
  text-align: left;
`;

const TooltipDesc = styled.div`
  width: 203px;

  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  text-align: justify;
  line-height: 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
