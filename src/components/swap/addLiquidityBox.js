import styled from "styled-components";
import { useState } from "react";
import { LightText } from "styles/styledComponents/lightText";
import inviLogo from "assets/icons/invi_token_logo.svg";
import klayLogo from "assets/icons/networkLogo/klaytnLogo.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";
import InviSwapPoolTx from "utils/web3/transactions/InviSwapPoolTx";
import PriceManagerTx from "utils/web3/transactions/PriceManagerTx";
import { swapInfoAtom } from "store/swapInfo";
import { useEffect } from "react";
import units from "units/units.json";
import Web3 from "web3";
import ISPTTokenTx from "utils/web3/transactions/tokens/ISPTTokenTx";

const web3 = new Web3(window.ethereum);
export const AddLiquidityBox = () => {
  //------Recoil------//
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const [swapInfo, setSwapInfo] = useRecoilState(swapInfoAtom);

  //------useState------//
  const [tokenAAmount, setTokenAAmount] = useState(0);
  const [tokenAPrice, setTokenAPrice] = useState();
  const [tokenABalance, setTokenABalance] = useState();

  const [tokenBAmount, setTokenBAmount] = useState(0);
  const [tokenBPrice, setTokenBPrice] = useState();
  const [tokenBBalance, setTokenBBalance] = useState();

  //-----tx functions-----//
  const inviTokenTx = new InviTokenTx(network);
  const inviSwapPoolTx = new InviSwapPoolTx(network);
  const isptTokenTx = new ISPTTokenTx(network);
  const priceManagerTx = new PriceManagerTx(network);

  //-----functions-----//
  const handleData = async (type) => {
    // set Balance
    setTokenBBalance(fixBalance(account.balance, network));
    const inviBalance = await inviTokenTx.getBalance(account.address);
    setTokenABalance(fixBalance(inviBalance, network));

    // fetch prices
    setTokenAPrice(fixBalance(await priceManagerTx.getInviPrice(), network));
    setTokenBPrice(fixBalance(await priceManagerTx.getNativePrice(), network));
  };

  const handleTokenAChange = async (e) => {
    setTokenAAmount(e.target.value);
    const amountA = web3.utils.toBN(e.target.value * 10 ** 18); // amount in;
    const amountB = await inviSwapPoolTx.getAddLiquidityNative(amountA);
    setTokenBAmount(amountB / 10 ** 18);
  };

  const handleTokenBChange = async (e) => {
    setTokenBAmount(e.target.value);
    const amountB = web3.utils.toBN(e.target.value * 10 ** 18); // amount out;
    const amountA = await inviSwapPoolTx.getAddLiquidityInvi(amountB);
    setTokenAAmount(amountA / 10 ** 18);
  };

  //-----useEffect-----//
  useEffect(() => {
    handleData();
    setSwapInfo((prev) => ({
      ...prev,
      expectedLiquidityAmountInvi: web3.utils.toBN(tokenAAmount * 10 ** 18 * 1.01),
      liquidityAmountKlay: web3.utils.toBN(tokenBAmount * 10 ** 18),
      slippage: 1 * units.slippageUnit,
    }));
  }, [account.balance, tokenAAmount, tokenBAmount]);

  return (
    <Wrapper>
      <InputTokenBox>
        <InputTokenAmount>
          <InputBox>
            <input type="number" value={tokenAAmount} onChange={handleTokenAChange}></input>
          </InputBox>
          <TokenWrapper>
            <InviLogo src={inviLogo} />
            <InviText>INVI</InviText>
          </TokenWrapper>
        </InputTokenAmount>
        <InputTokenData>
          <PriceText>{`$ ${tokenAPrice}`}</PriceText>
          <BalanceText>{`Balance: ${tokenABalance}`}</BalanceText>
        </InputTokenData>
      </InputTokenBox>
      <OutputTokenBox>
        <OutputTokenAmount>
          <InputBox>
            <input type="number" value={tokenBAmount} onChange={handleTokenBChange}></input>
          </InputBox>
          <TokenWrapper>
            <KlayLogo src={network.logo} />
            <KlayText>{network.token}</KlayText>
          </TokenWrapper>
        </OutputTokenAmount>
        <OutputTokenData>
          <PriceText>{`$ ${tokenBPrice}`}</PriceText>
          <BalanceText>{`Balance: ${tokenBBalance}`}</BalanceText>
        </OutputTokenData>
      </OutputTokenBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const InputTokenBox = styled.div`
  width: 100%;
  height: 84px;
  margin-bottom: 6px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue2};
  filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.12));
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  padding-top: 16px;
  padding-bottom: 30px;
`;

const TokenWrapper = styled.div`
  width: ${(props) => (props.invi ? "98px" : "111px")};
  height: 36px;
  border-radius: 20px;
  padding: 0 6px;
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;
`;

const TokenLogo = styled.img``;
const TokenText = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

const InviLogo = styled(TokenLogo)`
  width: 36px;
  scroll-margin-right: 3px;
`;
const InviText = styled(TokenText)`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const KlayLogo = styled(TokenLogo)`
  width: 26px;
  margin-right: 9px;
`;
const KlayText = styled(TokenText)`
  color: ${(props) => props.theme.colors.navy};
`;

const OutputTokenBox = styled.div`
  width: 100%;
  height: 84px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;

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
