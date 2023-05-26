import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import IcInviLogo from "../../assets/icons/ic_inviLogo.svg";
import IcButton from "../../assets/icons/ic_button.svg";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { accountAtom } from "store/account";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import { fixBalance } from "utils/fixBalance";
import pendingToast from "components/common/toast/pendingToast";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

function ConversionStake() {
  const { staking } = useParams();
  const [inviBalance, setInviBalance] = useState("--");
  const [inviAmount, setInviAmount] = useState(0);
  const [currentStaked, setCurrentStaked] = useState("--");

  const pendingToastMsg = {
    success: {
      stake: {
        title: "Successfully INVI staked",
        message:
          "Transaction is successfully executed. Check rewards periodically in your wallet.  ",
      },
      unstake: {
        title: "Successfully INVI unstaked",
        message:
          "Unstaking transaction was executed. It will send staked INVI into your wallet.",
      },
    },
    error: {
      title: "Spotty connection",
      message:
        "While sending, transaction wasn’t broadcasted. Something went wrong. Please try again. ",
    },
    pending: {
      title: "Pending.....",
      message:
        "Waiting for the transaction to be broadcasted and included in a block",
    },
  };

  //------useRecoilValues------//
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);

  //------TX objects------//
  const inviTokenTx = new InviTokenTx(network);
  const inviTokenStakeTx = new InviTokenStakeTx(network);

  //------functions------//
  const getValues = async () => {
    const balance = await inviTokenTx.getBalance(account.address);
    setInviBalance(balance);
    const staked = await inviTokenStakeTx.getStakedAmount(account.address);
    setCurrentStaked(staked);
  };

  // InviStake 함수
  const stakeInvi = async () => {
    const amount = web3.utils.toBN(inviAmount * 10 ** 18);
    console.log(amount);
    await inviTokenStakeTx.stake(amount, account.address);
  };

  // InviUnstake 함수
  const unStakeInvi = async () => {
    const amount = web3.utils.toBN(inviAmount * 10 ** 18);
    await inviTokenStakeTx.unstake(amount, account.address);
  };

  //------ Effects ------//
  useEffect(() => {
    getValues();
  }, [account]);

  return (
    <Wrapper>
      {staking === "stake" ? (
        <>
          <StakeTextBlock>
            <StakeLeftText>Current Staked</StakeLeftText>
            <StakeRightText>
              {fixBalance(currentStaked, network)} INVI
            </StakeRightText>
          </StakeTextBlock>
          <StakeTextBlock>
            <StakeLeftText>Available Balance</StakeLeftText>
            <StakeRightText>
              {fixBalance(inviBalance, network)} INVI
            </StakeRightText>
          </StakeTextBlock>
        </>
      ) : (
        <>
          <StakeTextBlock>
            <StakeLeftText staking={staking}>
              Unstaking Available for
            </StakeLeftText>
            <StakeRightText>
              {fixBalance(currentStaked, network)} INVI
            </StakeRightText>
          </StakeTextBlock>
          <StakeTextBlock>
            <StakeLeftText staking={staking}>Amount to Unstake</StakeLeftText>
            <StakeRightText>Balance: 0.0000</StakeRightText>
          </StakeTextBlock>
        </>
      )}
      {staking === "stake" && (
        <AmountBlock>
          <AmountText>Amount to Stake</AmountText>
          <AmountAlert>Please enter amount to provide liquidity</AmountAlert>
        </AmountBlock>
      )}
      <AmountChangeBlock>
        <AmountChangeLeft
          type="number"
          placeholder="0.0"
          onChange={(e) => setInviAmount(e.target.value)}
        />
        <AmountChangeRight>
          <AmountMax>MAX</AmountMax>
          <img src={IcInviLogo} alt="inviLogo" width={80} />
        </AmountChangeRight>
      </AmountChangeBlock>
      {staking === "stake" ? (
        <StakeSubmitBtn
          staking={staking}
          onClick={async () => {
            pendingToast(stakeInvi(), pendingToastMsg, "stake");
          }}
        >
          Staking
        </StakeSubmitBtn>
      ) : (
        <StakeBtn
          src={IcButton}
          alt="button"
          onClick={async () => {
            pendingToast(unStakeInvi(), pendingToastMsg, "unstake");
          }}
        />
      )}
    </Wrapper>
  );
}

export default ConversionStake;

const Wrapper = styled.div`
  margin-top: 3.5rem;
  padding: 0 5rem;
`;
const StakeTextBlock = styled.div`
  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 1.6rem;
  }
`;
const StakeLeftText = styled.span`
  ${({ theme }) => theme.fonts.Font_Heading_4_1};
  color: ${({ theme }) => theme.colors.navy};

  ${({ staking }) =>
    staking === "unstake" &&
    css`
      color: ${({ theme }) => theme.colors.blue1};
    `}
`;
const StakeRightText = styled.span`
  ${({ theme }) => theme.fonts.Font_Heading_3};
  color: ${({ theme }) => theme.colors.black};
`;
const AmountBlock = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin: 3.5rem 0 1rem 0;
  padding: 0 0.3rem;
`;
const AmountText = styled.span`
  ${({ theme }) => theme.fonts.Font_Heading_3};
  color: ${({ theme }) => theme.colors.blue1};
`;
const AmountAlert = styled.span`
  ${({ theme }) => theme.fonts.Font_Heading_5};
  color: ${({ theme }) => theme.colors.lightPurple2};
`;
const AmountChangeBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1rem 0 3rem 0;
  padding: 1.6rem 2rem;

  border-radius: 1.4rem;
  background-color: ${({ theme }) => theme.colors.realWhite};
`;
const AmountChangeLeft = styled.input`
  width: 25rem;
  text-align: center;

  ${({ theme }) => theme.fonts.Font_Body_Text};
  color: ${({ theme }) => theme.colors.black};
`;
const AmountChangeRight = styled.div`
  display: flex;
  align-items: center;
`;
const AmountMax = styled.div`
  padding: 0.4rem 0.8rem;

  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.blue1};
  color: ${({ theme }) => theme.colors.realWhite};
  ${({ theme }) => theme.fonts.Font_Heading_4};
`;

const StakeSubmitBtn = styled.button`
  width: 100%;
  position: relative;

  margin-bottom: 4rem;
  padding: 1.493rem 0.73rem;

  border: 0.1rem solid transparent;
  border-radius: 1rem;
  ${({ theme }) => theme.fonts.Font_Heading_1};
  color: ${({ theme }) => theme.colors.realWhite};
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);

  cursor: pointer;
`;

const StakeBtn = styled.img`
  margin-bottom: 4rem;

  cursor: pointer;
`;
