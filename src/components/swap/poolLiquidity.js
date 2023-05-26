import styled from "styled-components";
import inviLogo from "assets/icons/invi_token_logo.svg";
import KlayLogo from "assets/icons/networkLogo/klaytnLogo.svg";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import PriceManagerTx from "utils/web3/transactions/PriceManagerTx";
import InviSwapPoolTx from "utils/web3/transactions/InviSwapPoolTx";
import { fixBalance } from "utils/fixBalance";
import { networkAtom } from "store/network";
import { useEffect } from "react";

export const PoolLiquidity = () => {
  const [tokenALiquidity, setTokenALiquidity] = useState();
  const [tokenBLiquidity, setTokenBLiquidity] = useState();
  const [tvl, setTvl] = useState();
  const network = useRecoilValue(networkAtom);
  const priceManagerTx = new PriceManagerTx(network);
  const inviSwapPoolTx = new InviSwapPoolTx(network);
  const handleData = async () => {
    // fetch prices
    const tokenAPrice = (await priceManagerTx.getInviPrice()) / 10 ** 18;
    const tokenBPrice = (await priceManagerTx.getNativePrice(1)) / 10 ** 18;

    const tokenALiquidity = await inviSwapPoolTx.getInviLiquidity();
    const tokenBLiquidity = await inviSwapPoolTx.getNativeLiquidity();
    // get liquidity
    setTokenALiquidity(fixBalance(tokenALiquidity, network));
    setTokenBLiquidity(fixBalance(tokenBLiquidity, network));

    // get tvl
    setTvl(fixBalance(tokenAPrice * tokenALiquidity + tokenBPrice * tokenBLiquidity, network));
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Wrapper>
      <PoolLiquidityText>Pool Liquidity</PoolLiquidityText>
      <Line />
      <TvlBox>
        <TvlText>TVL</TvlText>
        <TvlValueText>$ {tvl}</TvlValueText>
      </TvlBox>
      <TokenLockedBox>
        <TokenLockedText>Total Token Locked</TokenLockedText>
        <TokenLockedValue>
          <KlayBox>
            <KlayLogoImage src={network.logo} />
            <KlayText>{network.token}</KlayText>
            <KlayValueText>{tokenALiquidity}</KlayValueText>
          </KlayBox>
          <Box />
          <InviBox>
            <InviLogoImage src={inviLogo} />
            <InviText>INVI</InviText>
            <InviValueText>{tokenBLiquidity}</InviValueText>
          </InviBox>
        </TokenLockedValue>
      </TokenLockedBox>
      <FeeBox>
        <FeeText>24h Fees</FeeText>
        <FeeValueText>$ {"tbd"}</FeeValueText>
      </FeeBox>
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
`;

const PoolLiquidityText = styled.div`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  height: 19px;
  font-weight: 700;
  font-size: 16px;
  line-height: 34px;
  padding-left: 21px;
  padding-bottom: 16px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.blue1};
`;

const TvlBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  height: 24px;
`;

const TvlText = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.colors.navy};
`;

const TvlValueText = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${(props) => props.theme.colors.blue1};
`;

const TokenLockedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 44px;
  border-radius: 10px;
  width: calc(100% - 80px);
  margin: 0 auto;
  gap: 12px;
  background-color: ${(props) => props.theme.colors.lightPurple1};
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.colors.navy};
`;

const TokenLockedText = styled.div``;

const TokenLockedValue = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
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

const FeeBox = styled(TvlBox)``;

const FeeText = styled(TvlText)``;

const FeeValueText = styled(TvlValueText)``;
