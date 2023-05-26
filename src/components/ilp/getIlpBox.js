import { useEffect, useState } from "react";
import styled from "styled-components";

//web3
import Web3 from "web3";
import { useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import getContract from "utils/web3/getContract";
import LpPoolTx from "utils/web3/transactions/LpPoolTx";
import { networkAtom } from "store/network";
import GetNetworkLogo from "utils/getNetworkLogo/getNetworkLogo";

//assets
import ArrowSVG from "assets/icons/getILPArrow.svg";
import { LightText } from "styles/styledComponents/lightText";
import { Button } from "styles/styledComponents/button";
import ILPLogo from "assets/icons/ilp_logo.svg";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";

//components
import pendingToast from "components/common/toast/pendingToast";

const web3 = new Web3(window.ethereum);
export const GetIlpBox = ({ closeModal }) => {
  const [tokenAmount, setTokenAmount] = useState();
  const [payAmount, setPayAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenShownBalance, setTokenShownBalance] = useState(0);
  const [iLPBalance, setILPBalance] = useState(0);
  const [iLPAmount, setILPAmount] = useState();
  const [fee, setFee] = useState(0);
  const [isEvmos, setIsEvmos] = useState(false);

  const toastMessage = "Please enter amount to provide liquidity";

  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const lpPoolTx = new LpPoolTx(network);

  const { lpPoolContract, iLPTokenContract } = getContract(network);

  //get balance
  const getWeb3 = async () => {
    const balance = await web3.eth.getBalance(account.address);
    setTokenBalance(balance);

    setTokenShownBalance((balance / 10 ** 18).toFixed(3));

    const ilpBalance = await iLPTokenContract.methods
      .balanceOf(account.address)
      .call();
    setILPBalance((ilpBalance / 10 ** 18).toFixed(3));

  };

  //get ILP 
  const provideLP = async () => {
    const realAmount = web3.utils.toBN(tokenAmount * 10 ** 18);
    await lpPoolTx.stake(account, realAmount); 
  };

  useEffect(() => {
    getWeb3();
    if (network.name === "evmos" || network.name === "polygon") {
      setIsEvmos(true);
    } else {
      setIsEvmos(false);
    }
  }, [account.address, network.name]);


  const pendingToastMsg = {
    success: {
      stake: {
        title: "Successfully LP pool received",
        message: "Liquidity pool received your provision. Check $ILP in your wallet.",
    },
   },
    error: {
      spotty: {
        title: "Spotty connection",
        message: "Fee changed while sending transaction, please try again.",
      },
      gasFee : {
        title: "Error : Insufficient gas fees",
        message: "Fee changed while sending transaction, please try again.",
      },
      transaction: {
        title: "Transaction Railed",
        message: "Siging request rejected by user.",
      },
      network:{
        title : "Wrong Network",
        message: "Please switch your wallet network. It’s not matched with current one.",
      }
  },
  pending: {
      title: "Pending....",
      message: "Waiting for the transaction to be broadcasted and included in a block",
    },
};


  return (
    <GetILPWrapper>
      <TokenBox isEvmos={isEvmos}>
        <TokenInfo>
          <PayAmount>{`Price: $${payAmount}`}</PayAmount>
          <TokenBalance>{`Balance: ${tokenShownBalance}`}</TokenBalance>
        </TokenInfo>
        <ToastMessage>{tokenAmount ? (tokenAmount === 0 ? toastMessage : "") : toastMessage}</ToastMessage>
        <SetToken>
          <InputBox>
            <input
              type="number"
              placeholder="0.0"
              value={tokenAmount}
              onChange={(e) => {
                setTokenAmount(e.target.value);
                setILPAmount(e.target.value);
              }}
            ></input>
            <MaxButton
              onClick={() => {
                setTokenAmount(tokenShownBalance);
                setILPAmount(tokenShownBalance);
              }}
            >
              MAX
            </MaxButton>
          </InputBox>
          <Token>
            <GetNetworkLogo />
            {network.token}
          </Token>
        </SetToken>

        <ArrowBox>
          <ArrowImage src={ArrowSVG} />
        </ArrowBox>
      </TokenBox>

      <ILPBox isEvmos={isEvmos}>
        <ILPInfo>
          <span></span>
          <ILPBalance>{`Balance: ${iLPBalance}`}</ILPBalance>
        </ILPInfo>

        <ILPInPutBox>
          <input
            type="number"
            placeholder="0.0"
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

      <FeeBox isEvmos={isEvmos}>
        <span>Fee</span>
        <Right>
          <Fee>{fee}</Fee>
          <span>%</span>
        </Right>
      </FeeBox>

      <ConfirmButton
        isEvmos={isEvmos}
        tokenAmount={tokenAmount}
        onClick={async () => {
          if (tokenAmount > 0) {
            pendingToast(provideLP(), pendingToastMsg, "stake");
          }}}>
        {tokenAmount > 0 ? "Confirm" : "Enter an amount"}
      </ConfirmButton>
    </GetILPWrapper>
  );
};

const GetILPWrapper = styled.div`
  height: 100%;
`;

const TokenBox = styled.div`
  width: ${(props) => (props.isEvmos ? "36rem" : "34rem")};
  height: 10.8rem;
  background-color: white;
  border-radius: 1rem;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1.2rem;
  position: relative;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1.7rem 2.35rem 0 2.35rem;
`;

const ToastMessage = styled.div`
  height: 1.3rem;
  font-weight: 400;
  font-size: 1.1rem;
  color: #acb0fd;
`;

const ArrowBox = styled.div`
  position: absolute;
  width: 4.3rem;
  height: 4.4rem;
  border-radius: 100%;
  bottom: -2.2rem;
  background-color: white;
  left: 50%;
  top: 10.3rem;
  transform: translateX(-50%);
  box-shadow: 0px 8px 6px -5px rgba(0, 0, 0, 0.1);
`;

const ArrowImage = styled.img`
  width: 2.5rem;
  height: 2.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`;

const PayAmount = styled(LightText)`
  font-weight: 400;
  font-size: 1.4rem;
`;

const TokenBalance = styled(PayAmount)``;

const SetToken = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4.8rem;
  margin-top: 0.6rem;
  gap: 0.8rem;
  z-index: 1;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.8rem;
  height: 2.8rem;
  background-color: ${(props) => props.theme.colors.lightBlue2};
  border-radius: 1.4rem;
  input {
    width: 17rem;
    text-align: center;
    font-family: Pretendard;
    font-weight: 500;
    font-size: 2rem;
    color: ${(props) => props.theme.colors.mediumDarkGray};
    background-color: ${(props) => props.theme.colors.lightBlue2};
  }
`;

const MaxButton = styled(Button)`
  width: 4.8rem;
  height: 2.8rem;
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.colors.blue1};
  font-family: Pretendard;
  font-weight: 400;
  color: white;
  font-size: 1.4rem;
  line-height: 2rem;
`;

const Token = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 2rem;
`;

const ILPBox = styled.div`
  width: ${(props) => (props.isEvmos ? "35.7rem" : "33.6rem")};
  height: 8.4rem;
  background-color: white;
  border-radius: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem 2rem 2.4rem;
  margin-bottom: 1.2rem;
`;

const ILPInfo = styled(TokenInfo)`
  margin-bottom: 2.2rem;
`;

const ILPBalance = styled(PayAmount)`
  align-items: flex-end;
`;

const ILPInPutBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4.6rem;
  input {
    width: 19rem;
    border-radius: 1.4rem;
    height: 2.4rem;
    text-align: center;
    font-family: Pretendard;
    color: ${(props) => props.theme.colors.mediumDarkGray};
    font-weight: 500;
    font-size: 2rem;
    padding: 1rem 1.8rem;
    background-color: ${(props) => props.theme.colors.lightBlue2};
  }
`;

const ILPImageBox = styled.div`
  width: 8.2rem;
  height: 4.6rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ILPImage = styled.img`
  width: 4.6rem;
`;

const ILPText = styled.span`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 800;
  font-size: 2rem;
`;

const FeeBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 2.5rem;
  width: ${(props) => (props.isEvmos ? "35.7rem" : "33.7rem")};
  height: 2.6rem;
  border-radius: 1rem;
  margin: 0 auto;

  span {
    font-weight: 700;
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.blue1};
    padding: 0.6rem;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.2rem;
`;

const Fee = styled.span`
  min-width: 5.9rem;
  text-align: center;
`;

const ConfirmButton = styled(BlueButton)`
  width: ${(props) => (props.isEvmos ? "40.7rem" : "38.7rem")};
  height: 5.6rem;
  margin: 0 auto;
  margin-top: 2rem;
  border-radius: 1rem;
  font-family: Pretendard;
  font-weight: 800;
  font-size: 2.2rem;
  background: ${(props) => (props.tokenAmount > 0 ? "linear-gradient(172.37deg, #1F53FF 2.52%, #9C1FFF 89.95%)" : props.theme.colors.lightPurple2)};
`;
