import styled from "styled-components";
import { BuyEarnInfo } from "components/buyEarn/buyEarnInfo";

/**
 *
 * @path index.js -> buyEarn.js
 */
const BuyEarn = ({ option, setOption }) => {
  return (
    <Wrapper>
      <Option>
        <BuyWrapper backgroundColor={option === 0 ? "#ACB0FD" : "#FFFFFF"} borderRadius={option === 0 ? "20px 0px 0px 0px" : "20px 20px 0px 0px"}>
          <BuyButton
            color={option === 0 ? "#1F53FF" : "#FFFFFF"}
            backgroundColor={option === 0 ? "#FFFFFF" : "#ACB0FD"}
            borderRadius={option === 0 ? "20px 20px 0px 0px" : "20px 0px 20px 0px"}
            onClick={() => {
              setOption(0);
            }}
          >
            Buy
          </BuyButton>
        </BuyWrapper>
        <EarnWrapper backgroundColor={option === 1 ? "#ACB0FD" : "#FFFFFF"} borderRadius={option === 0 ? "20px 20px 0px 0px" : "20px 20px 0px 0px"}>
          <EarnButton
            color={option === 1 ? "#1F53FF" : "#FFFFFF"}
            backgroundColor={option === 1 ? "#FFFFFF" : "#ACB0FD"}
            borderRadius={option === 1 ? "20px 20px 0px 0px" : "0px 20px 0px 20px"}
            onClick={() => {
              setOption(1);
            }}
          >
            Earn
          </EarnButton>
        </EarnWrapper>
      </Option>
      <InfoWrapper>
        <InfoBox borderRadius={option === 0 ? "0px 15px 0px 0px" : "15px 0px 0px 0px"}>
          <BuyEarnInfo option={option}></BuyEarnInfo>
        </InfoBox>
      </InfoWrapper>
    </Wrapper>
  );
};

export default BuyEarn;

const Wrapper = styled.div`
  width: 1054px;
  border-radius: 20px;
  background-color: #ffffff;
  @media (max-width: 1000px) {
    width: 80%;
    font-size: 1vw;
  }
`;
const BuyWrapper = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: 50%;
  border-radius: ${(props) => props.borderRadius};
  border: none;
`;
const EarnWrapper = styled(BuyWrapper)``;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #acb0fd;
  border-radius: 20px 20px 0px 0px;
`;
const BuyButton = styled.button`
  font-family: "Pretendard";
  height: 60px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  font-size: 22px;
  font-weight: 800;
  border: none;
  border-radius: ${(props) => props.borderRadius};
  width: 100%;
`;
const EarnButton = styled(BuyButton)``;

const InfoWrapper = styled.div`
  background-color: #acb0fd;
`;

const InfoBox = styled.div`
  padding-top: 60px;
  border-radius: ${(props) => props.borderRadius};
  background-color: #ffffff;
`;
