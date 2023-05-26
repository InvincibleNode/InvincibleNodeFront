import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowSVG from "assets/icons/getILPArrow.svg";
import { LightText } from "styles/styledComponents/lightText";
import { Button } from "styles/styledComponents/button";
import ILPLogo from "assets/icons/ilp_logo.svg";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import Web3 from "web3";
import { useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import getContract from "utils/web3/getContract";
import Modal from "components/modals/modalBackground";
import LpPoolTx from "utils/web3/transactions/LpPoolTx";
import { networkAtom } from "store/network";

const web3 = new Web3(window.ethereum);
export const GetILPModal = ({ closeModal }) => {
  const [tokenAmount, setTokenAmount] = useState(0);
  const [payAmount, setPayAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(100);
  const [tokenShownBalance, setTokenShownBalance] = useState(0);
  const [iLPBalance, setILPBalance] = useState(0);
  const [iLPAmount, setILPAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const toastMessage = "Please enter amount to provide liquidity";
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);

  const { lpPoolContract, iLPTokenContract } = getContract(network);

  const getWeb3 = async () => {
    const balance = await web3.eth.getBalance(account.address);
    setTokenBalance(balance);
    setTokenShownBalance((balance / 10 ** 18).toFixed(3));

    const ilpBalance = await iLPTokenContract.methods.balanceOf(account.address).call();
    setILPBalance(ilpBalance / 10 ** 18);
  };

  const provideLP = async () => {
    console.log(lpPoolContract);
    const realAmount = web3.utils.toBN(tokenAmount).mul(web3.utils.toBN(10).pow(web3.utils.toBN(18)));

    //const result = await LpPoolTx.stake(account.address, realAmount);
    const result = await lpPoolContract.methods.stake().send({ from: account.address, value: realAmount });
    console.log(result);
  };

  useEffect(() => {
    getWeb3();
  }, []);

  return (
    <Modal closeModal={closeModal}>
      <GetILPModalWrapper>
        <Title>Buy & Get ILP</Title>
        <GetILPModalContents>
          <GetILPText>Get ILP</GetILPText>
          <TokenBox>
            <PayInfo>
              <PayAmount>{`Pay: $${payAmount}`}</PayAmount>
              <TokenBalance>{`Balance: ${tokenShownBalance}`}</TokenBalance>
            </PayInfo>
            <ToastMessage>{tokenAmount === 0 ? toastMessage : ""}</ToastMessage>
            <InputBox>
              <input
                type="number"
                value={tokenAmount}
                onChange={(e) => {
                  setTokenAmount(e.target.value);
                  setILPAmount(e.target.value);
                }}
              ></input>
              <MaxButton onClick={() => setTokenAmount(tokenShownBalance)}>MAX</MaxButton>
              <Token>KLAY</Token>
            </InputBox>
            <ArrowBox>
              <ArrowImage src={ArrowSVG} />
            </ArrowBox>
          </TokenBox>

          <ILPBox>
            <ILPInfo>
              <span></span>
              <ILPBalance>{`Balance: ${iLPBalance}`}</ILPBalance>
            </ILPInfo>

            <ILPInPutBox>
              <input
                type="number"
                value={iLPAmount}
                onChange={(e) => {
                  setILPAmount(e.target.value);
                  setTokenAmount(e.target.value);
                }}
              ></input>
              <ILPImageBox>
                <ILPImage src={ILPLogo} />
                <ILPText>ILP</ILPText>
              </ILPImageBox>
            </ILPInPutBox>
          </ILPBox>

          <FeeBox>
            <span>Fee</span>
            <Right>
              <Fee>{fee}</Fee>
              <span>%</span>
            </Right>
          </FeeBox>

          <ConfirmButton
            tokenAmount={tokenAmount}
            onClick={() => {
              if (tokenAmount > 0) {
                provideLP();
              }
            }}
          >
            {tokenAmount > 0 ? "Confirm" : "Enter an amount"}
          </ConfirmButton>
        </GetILPModalContents>
      </GetILPModalWrapper>
    </Modal>
  );
};

const GetILPModalWrapper = styled.div`
  width: 477px;
  height: 581px;
  filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.12));
  background-color: ${(props) => props.theme.colors.blue1};
  border-radius: 14px;
  position: relative;
`;
const Title = styled.div`
  margin-top: 27px;
  font-weight: 800;
  font-size: 22px;
  text-align: center;
  color: white;
`;

const GetILPModalContents = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 73px;
  width: 477px;
  height: 508px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.lightBlue2};
`;

const GetILPText = styled.div`
  margin-top: 23px;
  height: 46px;
  line-height: 46px;
  padding-left: 38px;
  font-weight: 800;
  font-size: 22px;
  color: ${(props) => props.theme.colors.blue1};
`;

const TokenBox = styled.div`
  width: 340px;
  height: 108px;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 13px;
  margin-bottom: 12px;
  position: relative;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 17px 23.5px 15px 23.5px;
`;

const ToastMessage = styled.div`
  height: 13px;
  font-weight: 400;
  font-size: 11px;
  color: ${(props) => props.theme.colors.lightPurple2};
`;

const ILPBox = styled.div`
  width: 340px;
  height: 104px;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 21px 23.5px 0 23.5px;
  margin-bottom: 9px;
`;

const ArrowBox = styled.div`
  position: absolute;
  width: 43.39px;
  height: 44.68px;
  border-radius: 100%;
  bottom: -22px;
  background-color: white;
  left: 50%;
  top: 108px;
  transform: translateX(-50%);
  box-shadow: 0px 8px 6px -5px rgba(0, 0, 0, 0.1);
`;

const ArrowImage = styled.img`
  width: 24.83px;
  height: 24.11px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PayInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PayAmount = styled(LightText)`
  font-weight: 400;
  font-size: 14px;
  width: 110px;
`;

const TokenBalance = styled(PayAmount)``;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  height: 44px;
  input {
    width: 190px;
    border-radius: 14px;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    margin: 0 10px 0 0;
    padding: 10px 18px;
    background-color: ${(props) => props.theme.colors.lightBlue2};
    /* z-index: 100; */
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
`;
const Token = styled(LightText)`
  font-weight: 400;
  font-size: 20px;
`;

const ILPInfo = styled(PayInfo)``;

const ILPBalance = styled(PayAmount)`
  align-items: flex-end;
`;

const ILPInPutBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  margin-top: 22px;
  input {
    width: 190px;
    border-radius: 14px;
    text-align: center;
    font-family: Pretendard;
    font-weight: 500;
    font-size: 20px;
    padding: 10px 18px;
    background-color: ${(props) => props.theme.colors.lightBlue2};
  }
`;

const ILPImageBox = styled.div`
  width: 82px;
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ILPImage = styled.img`
  width: 46px;
`;

const ILPText = styled.span`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 800;
  font-size: 20px;
`;

const FeeBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 4px 25px;
  width: 337px;
  height: 26px;
  border-radius: 10px;
  margin: 0 auto;

  span {
    font-weight: 700;
    font-size: 12px;
    color: ${(props) => props.theme.colors.blue1};
    padding: 6px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
`;

const Fee = styled.span`
  min-width: 59px;
  text-align: center;
`;

const ConfirmButton = styled(BlueButton)`
  width: 387px;
  height: 56px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 22px;
  background: ${(props) => (props.tokenAmount > 0 ? "linear-gradient(172.37deg, #1F53FF 2.52%, #9C1FFF 89.95%)" : props.theme.colors.lightPurple2)};
`;
