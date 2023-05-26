import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IcInvi from "../../assets/icons/ic_invi.svg";
import IcRoboto from "../../assets/icons/ic_roboto.svg";
import GetNetworkLogo from "utils/getNetworkLogo/getNetworkLogo";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import { accountAtom } from "store/account";
import { fixBalance } from "utils/fixBalance";

function InviReward() {
  const [nativeReward, setNativeReward] = useState(0);
  const [inviReward, setInviReward] = useState(0);

  //------useRecoilValues------//
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);

  //------TX objects------//
  const inviTokenStakeTx = new InviTokenStakeTx(network);

  //------functions------//
  //native token reward
  const getData = async () => {
    const nativeReward = await inviTokenStakeTx.getNativeRewardAmount(account);
    setNativeReward(nativeReward);
  };

  const claimNative = async () => {
    await inviTokenStakeTx.receiveNativeReward(account.address);
  };

  const claimInvi = async () => {
    await inviTokenStakeTx.receiveInviReward(account.address);
  };

  useEffect(() => {
    getData();
  }, [account]);

  console.log(nativeReward);

  return (
    <Wrapper>
      <LeftTextBlock>
        <img src={IcRoboto} alt="roboto" />
        <LeftText>You</LeftText>
      </LeftTextBlock>
      <Rectangle />
      <RightTextBlock>
        <RightText>Accrued Reward</RightText>
        <RightBottomBlock>
          <GetNetworkLogo />
          <RightBottomText>
            {network.token} {fixBalance(nativeReward, network)}K
          </RightBottomText>
          <ClaimBtn
            onClick={async () => {
              claimNative();
            }}
          >
            claim
          </ClaimBtn>
          <img src={IcInvi} alt="invi" style={{ marginLeft: "3rem" }} />
          <RightBottomText>
            INVI {fixBalance(inviReward, network)}K
          </RightBottomText>
          <ClaimBtn
            onClick={async () => {
              claimInvi();
            }}
          >
            claim
          </ClaimBtn>
        </RightBottomBlock>
      </RightTextBlock>
    </Wrapper>
  );
}

export default InviReward;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 7rem;
  padding: 4rem;

  border-radius: 3rem;
  background-color: ${({ theme }) => theme.colors.navy};
`;

const LeftTextBlock = styled.div`
  display: flex;
  align-items: center;
`;
const LeftText = styled.span`
  margin-left: 0.8rem;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 3rem;
  line-height: 4rem;

  color: ${({ theme }) => theme.colors.realWhite};
`;
const Rectangle = styled.div`
  width: 0.4rem;
  height: 1rem;
  margin: 0 3.4rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.lightPurple2};
`;
const RightTextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightText = styled.span`
  margin-bottom: 1.4rem;

  ${({ theme }) => theme.fonts.Font_Heading_4}
  color : ${({ theme }) => theme.colors.lightPurple1};
`;
const RightBottomBlock = styled.div`
  display: flex;
  align-items: center;
`;
const RightBottomText = styled.span`
  margin-left: 0.6rem;

  ${({ theme }) => theme.fonts.Font_Heading_1};
  color: ${({ theme }) => theme.colors.realWhite};
`;
const ClaimBtn = styled.button`
  margin-left: 1.4rem;
  padding: 0.4rem 1rem;

  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  ${({ theme }) => theme.fonts.Font_Heading_1}
  color: ${({ theme }) => theme.colors.realWhite};

  cursor: pointer;
`;
