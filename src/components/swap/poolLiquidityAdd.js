import styled from "styled-components";
import inviLogo from "assets/icons/invi_token_logo.svg";
import KlayLogo from "assets/icons/networkLogo/klaytnLogo.svg";
import IconDown from "assets/icons/icon_down_navy.svg";
import IconUp from "assets/icons/icon_up_purple.svg";
import { useState } from "react";
import { useEffect } from "react";
import { fixBalance } from "utils/fixBalance";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import PriceManagerTx from "utils/web3/transactions/PriceManagerTx";
import InviSwapPoolTx from "utils/web3/transactions/InviSwapPoolTx";

export const PoolLiquidityAdd = () => {
  const [visibility, setVisibility] = useState(false);

  const [tokenAPrice, setTokenAPrice] = useState();
  const [tokenBPrice, setTokenBPrice] = useState();

  const [tokenALiquidity, setTokenALiquidity] = useState();
  const [tokenBLiquidity, setTokenBLiquidity] = useState();

  const network = useRecoilValue(networkAtom);
  const priceManagerTx = new PriceManagerTx(network);
  const inviSwapPoolTx = new InviSwapPoolTx(network);

  const handleData = async () => {
    // fetch prices
    setTokenAPrice(fixBalance(await priceManagerTx.getInviPrice(), network));
    setTokenBPrice(fixBalance(await priceManagerTx.getNativePrice(), network));

    // get liquidity
    setTokenALiquidity(fixBalance(await inviSwapPoolTx.getInviLiquidity(), network));
    setTokenBLiquidity(fixBalance(await inviSwapPoolTx.getNativeLiquidity(), network));
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <Wrapper>
      <Title>
        <PoolLiquidityText>Pool Liquidity</PoolLiquidityText>
        <Icon
          src={visibility === false ? IconDown : IconUp}
          onClick={() => {
            setVisibility(!visibility);
          }}
        ></Icon>
      </Title>
      {visibility === true && (
        <>
          <Line />
          <TvlBox>
            <TvlText>Total Liquidity</TvlText>
            <TvlValueText>
              <InviValue>
                <TokenImage>
                  <InviLogoImage src={inviLogo} />
                </TokenImage>

                <TokenName>INVI</TokenName>
                <TokenValue>{tokenALiquidity}</TokenValue>
              </InviValue>
              <KlayValue>
                <TokenImage>
                  <KlayLogoImage src={network.logo} />
                </TokenImage>
                <TokenName>{network.token}</TokenName>
                <TokenValue>{tokenBLiquidity}</TokenValue>
              </KlayValue>
            </TvlValueText>
          </TvlBox>
          <CurrentPriceText>Current Price</CurrentPriceText>
          <CurrentPriceBox>
            <TokenLockedValue>
              <KlayBox>
                <KlayLogoImage src={network.logo} />
                <KlayText>{network.token}</KlayText>
                <KlayValueText>$ {tokenBPrice}</KlayValueText>
              </KlayBox>
              <Box />
              <InviBox>
                <InviLogoImage src={inviLogo} />
                <InviText>INVI</InviText>
                <InviValueText>$ {tokenAPrice}</InviValueText>
              </InviBox>
            </TokenLockedValue>
          </CurrentPriceBox>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightPurple};
  border-radius: 10px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  margin-top: 12px;
  margin-bottom: 17px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;
const PoolLiquidityText = styled.div`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  font-weight: 700;
  font-size: 16px;
  line-height: 34px;
  margin-left: 21px;
`;
const Icon = styled.img`
  padding-right: 21px;
  cursor: pointer;
`;

const Line = styled.div`
  width: 90%;
  height: 1px;
  margin: auto;
  background-color: ${(props) => props.theme.colors.lightPurple2};
`;

const TvlBox = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  padding: 20px 32px;
  height: 24px;
`;

const TvlText = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.colors.navy};
`;

const TvlValueText = styled.div``;

const InviValue = styled.div`
  display: flex;
  flex-direction: row;
`;
const KlayValue = styled(InviValue)``;
const TokenImage = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
`;
const TokenName = styled.div`
  font-size: 14px;
  margin-left: 12px;
  width: 30px;
  color: ${(props) => props.theme.colors.navy};
`;
const TokenValue = styled(TokenName)`
  width: 60px;
`;

const CurrentPriceBox = styled.div`
  display: flex;
  height: 70px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.lightPurple2};
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.colors.navy};
`;

const CurrentPriceText = styled(TvlText)`
  margin-left: 32px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const TokenLockedValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
`;

const Box = styled.div`
  width: 4px;
  height: 10px;
  background: #acb0fd;
  border-radius: 10px;
`;

const KlayBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const KlayLogoImage = styled.img`
  width: 12px;
`;

const KlayText = styled.div``;

const KlayValueText = styled.div``;

const InviBox = styled(KlayBox)``;

const InviLogoImage = styled.img`
  width: 18px;
`;

const InviText = styled.div``;

const InviValueText = styled.div``;
