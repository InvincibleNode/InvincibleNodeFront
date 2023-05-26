import styled from "styled-components";
import CloseSvg from "assets/icons/closeIcon.svg";
import inviLogo from "assets/icons/invi_token_logo.svg";
import { useState } from "react";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import { Button } from "styles/styledComponents/button";
import { networkAtom } from "store/network";
import { accountAtom } from "store/account";
import { useRecoilValue } from "recoil";
import { fixBalance } from "utils/fixBalance";
import { useEffect } from "react";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);
export const StakeBox = ({ closeModal }) => {
  //------useStates------//
  const [inviBalance, setInviBalance] = useState("--");
  const [inviAmount, setInviAmount] = useState();
  const [currentStaked, setCurrentStaked] = useState("--");

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

  const stakeInvi = async () => {
    const amount = web3.utils.toBN(inviAmount * 10 ** 18);
    const stake = await inviTokenStakeTx.stake(amount, account.address);
    console.log(stake);
  };

  //------useEffect------//
  useEffect(() => {
    getValues();
  }, [account]);

  return (
    <Wrapper>
      <CloseModalBox>
        <CloseIcon src={CloseSvg} onClick={() => closeModal()} />
      </CloseModalBox>

      <InfoBox>
        <InviHeader>
          <InviImage>
            <InviLogo src={inviLogo} />
            <InviText>INVI</InviText>
          </InviImage>
          <Commission>Commission -5%</Commission>
        </InviHeader>

        <StakeDesc>
          <Title>Stake INVI and get interest on {network.name}.</Title>
          <Desc>
            The KLAY equivalent to 30% of the protocol fee will be distributed according to the stake
            <br />
            you staked in the INVI pool.
          </Desc>
        </StakeDesc>

        <StakeDataBox>
          <CurrentInvi>
            <Title>Current Staked</Title>
            <InviData>{fixBalance(currentStaked, network)} INVI</InviData>
          </CurrentInvi>
          <BalanceInvi>
            <Title>Available Balance</Title>
            <InviData>{`${fixBalance(inviBalance, network)} INVI`}</InviData>
          </BalanceInvi>

          <AmountText>Amount to Stake</AmountText>
          <InputBox>
            <input type="number" placeholder="0.00" value={inviAmount} onChange={(e) => setInviAmount(e.target.value)}></input>
            <MaxButton
              onClick={() => {
                setInviAmount(inviAmount);
              }}
            >
              MAX
            </MaxButton>
            <InviImage>
              <InviLogo src={inviLogo} max="max" />
              <InviText max="max">INVI</InviText>
            </InviImage>
          </InputBox>

          <StakingButton
            onClick={() => {
              stakeInvi();
            }}
          >
            Staking
          </StakingButton>
        </StakeDataBox>
      </InfoBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CloseModalBox = styled.div`
  height: 54px;
  display: flex;
  justify-content: flex-end;
`;

const CloseIcon = styled.img`
  width: 24px;
  padding-right: 15px;
  cursor: pointer;
`;

const InfoBox = styled.div`
  height: 100%;
  padding-bottom: 38px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: "Pretendard";
`;

const InviHeader = styled.div`
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 44px;
`;

const InviImage = styled.div`
  width: 94px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InviLogo = styled.img`
  width: ${(props) => (props.max ? "36px" : "46px")};
`;

const InviText = styled.div`
  font-weight: 800;
  font-size: ${(props) => (props.max ? "20px" : "22px")};
  line-height: 26px;
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const Commission = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 46px;
`;

const StakeDesc = styled.div`
  height: 49px;
  padding: 22px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const Desc = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
`;

const StakeDataBox = styled.div`
  padding: 35px 44px 0 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CurrentInvi = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const InviData = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;

const BalanceInvi = styled(CurrentInvi)`
  margin-bottom: 35px;
`;

const AmountText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.colors.blue1};
  margin-bottom: 10px;
`;

const InputBox = styled.div`
  width: 412px;
  height: 36px;
  background-color: white;
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  align-items: center;
  input {
    width: 250px;
    height: 36px;
    text-align: center;
    font-family: Pretendard;
    font-weight: 500;
    font-size: 20px;
  }
`;

const MaxButton = styled(Button)`
  width: 46px;
  height: 25px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.blue1};
  font-weight: 400;
  color: white;
  font-size: 14px;
  margin-left: 34px;
`;

const StakingButton = styled(BlueButton)`
  height: 56px;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;
