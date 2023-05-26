import styled from "styled-components";
import SwapSvg from "assets/icons/swapIcon.svg";
import { useEffect, useState } from "react";
import { LightText } from "styles/styledComponents/lightText";
import { SelectBox } from "./selectBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import { fixBalance } from "utils/fixBalance";
import { networkAtom } from "store/network";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";
import InviSwapPoolTx from "utils/web3/transactions/InviSwapPoolTx";
import PriceManagerTx from "utils/web3/transactions/PriceManagerTx";
import Web3 from "web3";
import { swapInfoAtom } from "store/swapInfo";
import getCoinPrice from "utils/fetchCoinPrice";

const web3 = new Web3(window.ethereum);
export const SwapBox = () => {
  //------Recoil------//
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const [swapInfo, setSwapInfo] = useRecoilState(swapInfoAtom);

  //------useState------//
  const [inputAmount, setInputAmount] = useState(0);
  const [inputPrice, setInputPrice] = useState();
  const [inputBalance, setInputBalance] = useState();

  const [outputAmount, setOutputAmount] = useState(0);
  const [outputPrice, setOutputPrice] = useState();
  const [outputBalance, setOutputBalance] = useState();

  const [inputToken, setInputToken] = useState("INVI");
  const [outputToken, setOutputToken] = useState(network.token);

  const [isFlipped, setIsFlipped] = useState(false);

  //------Tx functions------//
  const inviTokenTx = new InviTokenTx(network);
  const inviSwapPoolTx = new InviSwapPoolTx(network);
  const priceManagerTx = new PriceManagerTx(network);

  //------functions------//
  const handleTokenExchange = () => {
    setIsFlipped(!isFlipped);

    setInputToken(outputToken);
    setOutputToken(inputToken);
    setInputAmount(0);
    setOutputAmount(0);
    setInputPrice(outputPrice);
    setOutputPrice(inputPrice);
    setInputBalance(outputBalance);
    setOutputBalance(inputBalance);
  };

  const handleData = async () => {
    // get expected output amount
    const input = web3.utils.toBN((inputAmount * 10 ** 18).toString());
    console.log(input.toString());
    if (!isFlipped) {
      // set Balance
      setOutputBalance(fixBalance(account.balance, network));
      const inviBalance = await inviTokenTx.getBalance(account.address);
      setInputBalance(fixBalance(inviBalance, network));

      // fetch prices
      setInputPrice(fixBalance(await priceManagerTx.getInviPrice(), network));
      setOutputPrice(fixBalance(await priceManagerTx.getNativePrice(), network));
      setOutputAmount(fixBalance(await inviSwapPoolTx.getInviToNativeOutAmount(input), network));
    } else {
      // set Balance
      setInputBalance(fixBalance(account.balance, network));
      const inviBalance = await inviTokenTx.getBalance(account.address);
      setOutputBalance(fixBalance(inviBalance, network));

      // fetch prices
      setOutputPrice(fixBalance(await priceManagerTx.getInviPrice(), network));
      setInputPrice(fixBalance(await priceManagerTx.getNativePrice(), network));
      setOutputAmount(fixBalance(await inviSwapPoolTx.getNativeToInviOutAmount(input), network));
    }
  };

  useEffect(() => {
    handleData();
    console.log(inputToken);
    setSwapInfo((prev) => ({
      ...prev,
      inputToken: inputToken,
      swapAmount: inputAmount * 10 ** 18,
      // tbd
      minAmountOut: 0,
    }));
  }, [account, inputAmount]);

  return (
    <Wrapper>
      <InputTokenBox>
        <FromText>From</FromText>
        <InputTokenAmount>
          <InputBox>
            <input type="number" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}></input>
          </InputBox>
          <SelectBox token={inputToken} />
        </InputTokenAmount>
        <InputTokenData>
          <PriceText>{`Price: $ ${inputPrice}`}</PriceText>
          <BalanceText>{`Balance: ${inputBalance}`}</BalanceText>
        </InputTokenData>

        <ArrowBox onClick={() => handleTokenExchange()}>
          <ArrowImage src={SwapSvg} />
        </ArrowBox>

        <OutputTokenBox>
          <ToText>To</ToText>
          <OutputTokenAmount>
            <InputBox>
              <input type="number" value={outputAmount} onChange={(e) => setOutputAmount(e.target.value)}></input>
            </InputBox>
            <SelectBox token={outputToken} />
          </OutputTokenAmount>
          <OutputTokenData>
            <PriceText>{`Price: $ ${outputPrice}`}</PriceText>
            <BalanceText>{`Balance: ${outputBalance}`}</BalanceText>
          </OutputTokenData>
        </OutputTokenBox>
      </InputTokenBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 287px;
  display: flex;
  flex-direction: column;
`;

const InputTokenBox = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue2};
  filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.12));
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 30px;
`;

const FromText = styled(LightText)`
  padding-left: 22px;
  font-size: 14px;
`;

const ToText = styled(FromText)``;

const ArrowBox = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  bottom: -22px;
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  cursor: pointer;
`;

const ArrowImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const OutputTokenBox = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  position: absolute;
  bottom: -153px;
  padding-top: 16px;
  padding-bottom: 30px;
`;
const InputTokenAmount = styled.div`
  padding: 0 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled.div`
  width: 270px;
  input {
    width: 270px;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 34px;
    color: ${(props) => props.theme.colors.blue1};
  }
`;

const InputTokenData = styled.div`
  padding: 0 22px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const PriceText = styled(LightText)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.navy};
`;

const BalanceText = styled(PriceText)``;

const OutputTokenAmount = styled(InputTokenAmount)``;

const OutputTokenData = styled(InputTokenData)``;
