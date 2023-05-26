import styled from "styled-components";
import { BoldText } from "styles/styledComponents/boldText";
import { LightText } from "styles/styledComponents/lightText";
import { BuyTokenList } from "components/buyEarn/buyTokenList";

/**
 * @path index.js -> buyToken.js
 */
export const BuyToken = () => {
  return (
    <Wrapper>
      <ColumnTitle>
        <LeftTitle>
          <TokenText>TOKEN</TokenText>
        </LeftTitle>
        <MiddleTitle>
          <LeftTitleText>PRICE</LeftTitleText>
          <LeftTitleText>TOTAL SUPPLY</LeftTitleText>
          <LeftTitleText>WALLET</LeftTitleText>
        </MiddleTitle>
        <RightTitle>
          <BuyText>BUY</BuyText>
        </RightTitle>
      </ColumnTitle>
      <BuyTokenList></BuyTokenList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 954px;
  height: 132px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 30px 50px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.lightPurple1};
  @media (max-width: 1000px) {
    width: 80%;
    font-size: 1vw;
  }
`;

const ColumnTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 37px;
  width: 100%;
`;

const LeftTitle = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`;

const MiddleTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 60%;
`;

const RightTitle = styled(LeftTitle)`
  width: 20%;
`;

const LeftTitleText = styled(LightText)`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.lightPurple2};
  text-align: center;
  width: 30%;
`;

const TokenText = styled(LeftTitleText)`
  width: 20%;
`;

const BuyText = styled(BoldText)`
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.theme.colors.blue1};
  padding: 10px;
`;
