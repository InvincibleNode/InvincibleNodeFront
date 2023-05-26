import Header from "components/common/header/header";
import { Background } from "styles/styledComponents/background";
import styled from "styled-components";
import { useState, useEffect } from "react";
import BuyEarn from "./buyEarn";
import { BuyToken } from "./buyToken";

function BuyEarnPage() {
  const [option, setOption] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

  return (
    <Background launchApp={true}>
      <Header showTooltip={showTooltip} />

      <TitleText>Buy & Earn</TitleText>
      <DescText>Provide liquidity, Get $ILP</DescText>
      <BuyEarnWrapper>
        <BuyEarn option={option} setOption={setOption}></BuyEarn>
      </BuyEarnWrapper>
      {/* <BuyTokenWrapper>
        <BuyToken></BuyToken>
      </BuyTokenWrapper> */}
    </Background>
  );
}

export default BuyEarnPage;

const TitleText = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  color: white;
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
  margin-top: 30px;
`;

const DescText = styled.div`
  font-family: "Pretendard";
  font-weight: 800;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 40px;
  padding: 10px 0;
`;

const BuyEarnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 45px;
  padding-bottom: 34px;
`;

const BuyTokenWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
