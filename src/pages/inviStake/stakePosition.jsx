import React from "react";
import styled, { css } from "styled-components";
import IcInviLogo from "../../assets/icons/ic_inviLogo.svg";
import IcAlert from "../../assets/icons/ic_alert.svg";
import ConversionStake from "./conversionStake";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";

function StakePosition() {
  const network = useRecoilValue(networkAtom);
  const { staking } = useParams();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StakingBtnWrapper>
        <StakingStakeBtn
          staking={staking}
          onClick={() => navigate("/invi/stake")}
        >
          Stake
        </StakingStakeBtn>
        <StakingUnStakeBtn
          staking={staking}
          onClick={() => navigate("/invi/unstake")}
        >
          Unstake
        </StakingUnStakeBtn>
      </StakingBtnWrapper>
      <StakeCommissionBlock>
        <img src={IcInviLogo} alt="invilogo" />
        <StakeCommission>Commission -5%</StakeCommission>
      </StakeCommissionBlock>
      <StakeMessage staking={staking}>
        {staking === "stake" ? (
          <StakeBlock>
            <StakeText>Stake INVI and get rewards in {network.token}</StakeText>
            <StakeDesc>
              The {network.token} equivalent to 30% of the protocol fee will be
              distributed according to your
            </StakeDesc>
            <StakeDesc>staking share of the INVI pool.</StakeDesc>
          </StakeBlock>
        ) : (
          <>
            <AlertBlock>
              <img src={IcAlert} alt="alert" />
              <AlertText>Once the unbonding period begins you will:</AlertText>
            </AlertBlock>
            <AlertUl>
              <AlertLi>not receive staking rewards</AlertLi>
              <AlertLi>not be able to cancel the unbonding</AlertLi>
              <AlertLi>
                need to wait 14 days for the amount to be liquid
              </AlertLi>
            </AlertUl>
          </>
        )}
      </StakeMessage>
      <ConversionStake />
    </Wrapper>
  );
}

export default StakePosition;

const Wrapper = styled.div`
  width: 53.4rem;
  margin-top: 7rem;

  border-radius: 1.4rem;
  background-color: ${({ theme }) => theme.colors.lightBlue2};
  box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.12);

  text-align: center;
`;

const StakingBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 15rem;
  height: 3.2rem;
  padding: 0.106rem;
  margin: 4rem auto 2.4rem;

  background-color: ${({ theme }) => theme.colors.realWhite};
  border-radius: 3rem;
`;
const StakingStakeBtn = styled.button`
  height: 100%;
  margin-right: 0.464rem;
  padding: 0.493rem 1.192rem;

  border: none;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.colors.blue1};

  ${({ theme }) => theme.fonts.Font_Heading_3_5};
  color: ${({ theme }) => theme.colors.realWhite};

  ${({ staking }) =>
    staking === "unstake" &&
    css`
      padding: 0.4rem 1rem;

      background-color: transparent;
      box-shadow: none;
      color: ${({ theme }) => theme.colors.blue1};
    `}
  cursor: pointer;
`;
const StakingUnStakeBtn = styled.button`
  height: 100%;

  height: 100%;
  padding: 0.4rem 0.6rem;

  border: none;
  border-radius: 3rem;
  background-color: transparent;

  color: ${({ theme }) => theme.colors.blue1};
  ${({ theme }) => theme.fonts.Font_Heading_3_5};

  ${({ staking }) =>
    staking === "unstake" &&
    css`
      padding: 0.6rem 0.8rem;

      background-color: ${({ theme }) => theme.colors.blue1};
      box-shadow: none;
      color: ${({ theme }) => theme.colors.realWhite};
    `}

  cursor: pointer;
`;

const StakeCommissionBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;
  padding: 0 4.4rem;
`;
const StakeCommission = styled.span`
  ${({ theme }) => theme.fonts.Font_Heading_4}
`;

const StakeMessage = styled.div`
  padding: 2rem 5.2rem;

  background: #fff5f5;
  box-shadow: inset 0 0.4rem 1rem rgba(95, 64, 64, 0.15);

  ${({ staking }) =>
    staking === "stake" &&
    css`
      background-color: ${({ theme }) => theme.colors.realWhite};
      box-shadow: none;
    `}
`;

const AlertBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ staking }) =>
    staking === "stake" &&
    css`
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    `}
`;
const AlertText = styled.span`
  margin-left: 1rem;

  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.Font_Heading_4_1};
`;

const AlertUl = styled.ul`
  margin: 1rem 0 0 2.1rem;
  padding: 0;

  text-align: left;
`;
const AlertLi = styled.li`
  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.Font_Heading_5};
`;

const StakeBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const StakeText = styled.div`
  margin-bottom: 0.6rem;

  ${({ theme }) => theme.fonts.Font_Heading_4_1};
  color: ${({ theme }) => theme.colors.blue1};
`;
const StakeDesc = styled.span`
  ${({ theme }) => theme.fonts.Font_Heading_5};
  color: ${({ theme }) => theme.colors.blue1};
`;
