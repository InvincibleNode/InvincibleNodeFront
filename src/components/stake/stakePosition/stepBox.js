import styled from "styled-components";
import { useState } from "react";
import TooltipIcon from "assets/icons/tooltipIcon.svg";


export const StepBox= ({step, title, tooltip}) => {
    const [showPeriodTooltip, setShowPeriodTooltip] = useState(false);
    const TooltipText = 
    `This is the text that shows up when
you hover over thA minimum lockup 
time frame is necessary. After this 
time, you will be able to unstake in 
order to receive the principal and 
leveraged rewards.
However, you can extend your lock 
period, which means you will receive
more rewards for the duration of the
prolonged lock period you set.`
    return (
        <Box>
            <Step>{step}</Step>
            <Title>{title}</Title>
            {tooltip && <PeriodTooltipIcon TooltipIcon={TooltipIcon} onMouseEnter={() => setShowPeriodTooltip(true)} onMouseLeave={() => setShowPeriodTooltip(false)}>
          {showPeriodTooltip && (
            <PeriodTooltip>
              <TooltipTitle>Minimum vs Adjusted period?</TooltipTitle>
              <TooltipDesc>
                {TooltipText}
              </TooltipDesc>
            </PeriodTooltip>
          )}
        </PeriodTooltipIcon>}
            
        </Box>
    );
}

const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-family: Pretendard;
    gap : 0.8rem;
    padding: 0.32rem 0;
`;

const Step = styled.div`
    font-weight: 600;
    font-size: calc(0.8 * 1.2rem); /* 0.96rem */
    color: #fff;
    text-align: center;
    line-height: calc(0.8 * 2.8rem); /* 2.24rem */
    background-color: ${(props) => props.theme.colors.blue1};
    width: calc(0.8 * 6rem); /* 4.8rem */
    height: calc(0.8 * 2.8rem); /* 2.24rem */
    border-radius: calc(0.8 * 2rem); /* 1.6rem */
`;

const Title = styled.div`
    font-weight: 700;
    font-size: calc(0.8 * 1.6rem); /* 1.28rem */
    color: ${(props) => props.theme.colors.navy};
    line-height: calc(0.8 * 2.2rem);
`;

const PeriodTooltipIcon = styled.div`
  display: inline-block;
  position: relative;
  background-image: ${(props) => `url(${props.TooltipIcon})`};
  background-size: cover;
  width: calc(1.26rem * 0.8);
  height:calc(1.26rem * 0.8);
  margin-top: -0.3rem;
  cursor: pointer;
`;

const PeriodTooltip = styled.div`
  zoom: 0.96;
  position: absolute;
  width: 18.4rem;
  height: 17.28rem;
  top: calc(50%);
  left: calc(100% + 0.48rem);
  transform: translateY(-50%);
  text-align: center;
  background-color: ${(props) => props.theme.colors.blue3};
  border: none;
  filter: drop-shadow(0px 3.2px 3.2px rgba(0, 0, 0, 0.25));
  padding: 1.28rem;
  border-radius: 0.64rem;
  font-family: Pretendard;
  font-size: 1.12rem;
  font-weight: 320;
  color: white;
  z-index: 8;
  &:after {
    content: "";
    position: absolute;
    top: calc(50% - 0.48rem);
    left: -0.64rem;
    transform: rotate(90deg);
    margin-left: -0.16rem;
    border-width: 0.56rem;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.blue3} transparent transparent transparent;
  }
`;

const TooltipTitle = styled.div`      
  font-weight: 600;
  font-size: 1.12rem;
  text-align: left;
  margin-bottom: 1.44rem;
`;

const TooltipDesc = styled.div`
  font-size: 1.12rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.44rem;
  text-align: left;
  white-space: pre-wrap;
`;