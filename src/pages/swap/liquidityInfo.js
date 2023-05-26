import styled from "styled-components";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import inviLogo from "assets/icons/invi_token_logo.svg";
import klaytnLogo from "assets/icons/networkLogo/klaytnLogo.svg";
import bifrstLogo from "assets/icons/networkLogo/bifrostLogo.svg";
import evmosLogo from "assets/icons/networkLogo/evmosLogo.svg";

import { PoolLiquidityAdd } from "components/swap/poolLiquidityAdd";
import { AddLiquidityBox } from "components/swap/addLiquidityBox";
import IconDown from "assets/icons/icon_down_navy.svg";
import { AprBox } from "components/swap/aprBox";
import { useRecoilValue } from "recoil";
import { swapInfoAtom } from "store/swapInfo";
import Web3 from "web3";
import InviSwapPoolTx from "utils/web3/transactions/InviSwapPoolTx";
import { networkAtom } from "store/network";
import pendingToast from "components/common/toast/pendingToast";

const web3 = new Web3(window.ethereum);
export const LiquidityInfo = () => {
  const swapInfo = useRecoilValue(swapInfoAtom);
  const network = useRecoilValue(networkAtom);
  const inviSwapPoolTx = new InviSwapPoolTx(network);
  console.log(network);

  const pendingToastMsg = {
    success: {
      stake: {
        title: "Successfully add liquidity",
        message: "Check your wallet if received lp token",
      },
    },
    error: {
      title: "Spotty connection",
      message:
        "While sending, transaction wasn’t broadcasted. Something went wrong. Please try again. ",
    },
    pending: {
      title: "Pending...",
      message:
        "Waiting for the transaction to be broadcaste and included in a block",
    },
  };

  const addLiquidity = async () => {
    const klayAmount = web3.utils.toBN(swapInfo.liquidityAmountKlay);
    console.log(
      klayAmount.toString(),
      swapInfo.expectedLiquidityAmountInvi.toString(),
      swapInfo.slippage
    );
    await inviSwapPoolTx
      .addLiquidity(
        klayAmount,
        swapInfo.expectedLiquidityAmountInvi,
        swapInfo.slippage
      )
      .then((txResult) => {
        console.log("txResult : ", txResult);
      });
  };

  return (
    <Wrapper>
      <PairWrapper>
        <Title>Liquidity Pair</Title>
        <PairBox>
          <Pair1>
            <Pair1Img src={inviLogo}></Pair1Img>
            <Pair1Text>INVI</Pair1Text>
            <PickToken src={IconDown}></PickToken>
          </Pair1>
          <span>|</span>
          <Pair2>
            <Pair2Img src={network.logo}></Pair2Img>
            <Pair2Text>{network.token}</Pair2Text>
            <PickToken src={IconDown}></PickToken>
          </Pair2>
        </PairBox>
        <ProtocolFee>
          <span>Protocol Fee</span>
          <span>0.3%</span>
        </ProtocolFee>
      </PairWrapper>
      <Title>Amount</Title>
      <AddLiquidityBox />
      <PoolLiquidityAdd />
      <AprBox />
      <ConfirmButton
        onClick={() => {
          addLiquidity();
        }}
      >
        Confirm
      </ConfirmButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
`;
const PairWrapper = styled.div``;
const Title = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.blue1};
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 18px;
`;
const PairBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
  background-color: ${(props) => props.theme.colors.lightPurple};
  border-radius: 14px;

  span {
    font-size: 35px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.lightPurple1};
    margin-top: 3px;
    position: absolute;
    left: 49.5%;
  }
`;
const Pair1 = styled.div`
  display: flex;
  justify-content: center;
`;
const Pair1Img = styled.img`
  width: 40px;
  height: 40px;
  margin: auto;
  margin-right: 8px;
  margin-left: 58px;
  cursor: pointer;
`;
const Pair1Text = styled.div`
  margin: auto;
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  cursor: pointer;
`;
const PickToken = styled.img`
  width: 20px;
  margin-right: 58px;
  margin-left: 5px;
  cursor: pointer;
`;
const Pair2 = styled(Pair1)``;
const Pair2Img = styled(Pair1Img)`
  width: 22px;
  height: 22px;
`;
const Pair2Text = styled.div`
  margin: auto;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const ProtocolFee = styled.div`
  display: flex;
  margin-top: 14px;
  font-size: 14px;
  justify-content: space-between;

  span {
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const ConfirmButton = styled(BlueButton)`
  width: 100%;
  margin-bottom: 30px;
`;
