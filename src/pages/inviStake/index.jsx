import Header from "components/common/header/header";
import React, { useState, useEffect } from "react";
import { Background } from "styles/styledComponents/background";
import styled from "styled-components";
import IcInvi from "../../assets/icons/icon_invi.svg";
import StakePosition from "./stakePosition";
import InviReward from "./inviReward";
import { AddTokenBtn } from "components/ilp/addTokenBtn";
import { Footer } from "components/common/footer";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import { accountAtom } from "store/account";
import { fixBalance } from "utils/fixBalance";

function InviStakePage() {
  const [totalStaked, setTotalStaked] = useState("-");
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);

  const inviTokenStakeTx = new InviTokenStakeTx(network);

  const getData = async () => {
    const totalStaked = await inviTokenStakeTx.totalStaked();
    setTotalStaked(totalStaked);
  };

  useEffect(() => {
    getData();
  }, [account]);

  return (
    <Background launchApp={true}>
      <Header launchApp={true} />
      <Wrapper>
        <img src={IcInvi} alt="invi" />
        <TitleText>Stake INVI</TitleText>
        <DescText>
          <span>You can earn rewards in {network.token} by staking INVI.</span>
          <span>
            If you don't have INVI, you can obtain it by providing{" "}
            {network.token} liquidity, same as buying ILP. As an ILP holder, you
            receive
          </span>
          <span>INVI continuously based on your liquidity ratio.</span>
        </DescText>
        <StakeInfo>
          <StakeInfoBlock>
            <StakeLeftText>Total Staked</StakeLeftText>
            <StakeRightText>
              {fixBalance(totalStaked, network)} INVI
            </StakeRightText>
          </StakeInfoBlock>
          <StakeInfoBlock>
            <StakeLeftText>Reward Distribution</StakeLeftText>
            <StakeRightText>13H 53M 34S</StakeRightText>
          </StakeInfoBlock>
        </StakeInfo>
        <StakePosition />
        <InviReward />
        <AddTokenBtn />
      </Wrapper>
      <Footer />
    </Background>
  );
}

export default InviStakePage;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;
`;
const TitleText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 4rem;
  line-height: 4.8rem;

  color: ${(props) => props.theme.colors.white};
`;
const DescText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;

  color: ${(props) => props.theme.colors.white};
  ${({ theme }) => theme.fonts.Font_Heading_4_1}
`;

const StakeInfo = styled.div`
  display: flex;

  margin-top: 3rem;
`;
const StakeInfoBlock = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-left: 3rem;
  }
`;
const StakeLeftText = styled.span`
  margin-right: 3rem;

  ${({ theme }) => theme.fonts.Font_Heading_4_5}
  color: ${(props) => props.theme.colors.lightPurple1};
`;
const StakeRightText = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 2.2rem;
  line-height: 2.6rem;

  color: ${(props) => props.theme.colors.white};
`;
