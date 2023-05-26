import { Background } from "styles/styledComponents/background";
import Header from "components/common/header/header";
import { useState } from "react";
import styled from "styled-components";
import { SwapInfo } from "./swapInfo";
import { LiquidityInfo } from "./liquidityInfo";

function SwapPage() {
  const [option, setOption] = useState(0);
  return (
    <Background launchApp={true}>
      <Header launchApp={true} />
      <TitleText>Swap</TitleText>
      <Wrapper>
        <Option>
          <SwapWrapper option={option === 0}>
            <SwapButton
              option={option === 0}
              onClick={() => {
                setOption(0);
              }}
            >
              Swap
            </SwapButton>
          </SwapWrapper>
          <LiquidityWrapper option={option === 1}>
            <LiquidityButton
              option={option === 1}
              onClick={() => {
                setOption(1);
              }}
            >
              Add Liquidity
            </LiquidityButton>
          </LiquidityWrapper>
        </Option>
        <InfoWrapper option={option}>{option === 0 ? <SwapInfo /> : <LiquidityInfo />}</InfoWrapper>
      </Wrapper>
    </Background>
  );
}

export default SwapPage;

const TitleText = styled.div`
  font-family: "Pretendard";
  font-weight: 800;
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
  margin-top: 80px;
`;

const Wrapper = styled.div`
  width: 506px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.lightPurple2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 30px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const SwapWrapper = styled.div`
  width: 50%;
  border-radius: 14px 0 0 0;
  background-color: ${(props) => (props.option ? props.theme.colors.lightPurple2 : props.theme.colors.lightPurple1)};
  cursor: pointer;
`;

const SwapButton = styled.div`
  line-height: 67.6px;
  text-align: center;
  width: 100%;
  height: 67.6px;
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => (props.option ? props.theme.colors.blue2 : "#FFFFFF")};
  border: none;
  border-radius: ${(props) => (props.option ? "14px 14px 0px 0px" : "14px 0 14px 0px")};
  background-color: ${(props) => (props.option ? props.theme.colors.lightPurple1 : props.theme.colors.lightPurple2)};
`;

const LiquidityWrapper = styled(SwapWrapper)`
  border-radius: ${(props) => (props.option ? "14px 14px 0px 0px" : "0px 14px 14px 0px")};
`;

const LiquidityButton = styled(SwapButton)`
  border-radius: ${(props) => (props.option ? "14px 14px 0px 0px" : "0 14px 0px 14px")};
`;

const InfoWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightPurple1};
  border-radius: ${(props) => (props.option === 0 ? "0px 14px 14px 14px" : "14px 0px 14px 14px")};
`;
