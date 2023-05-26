import styled from "styled-components";
import CircleSVG from "assets/icons/icon_circle.svg";
import TooltipSVG from "assets/icons/tooltip_blue.svg";
import { ReactComponent as IconDown } from "assets/icons/icon_down_purple.svg";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import PriceManagerTx from "utils/web3/transactions/PriceManagerTx";

export const SwapResult = () => {
  const [isShow, setIsShow] = useState(false);

  const [tokenAPrice, setTokenAPrice] = useState();
  const [tokenBPrice, setTokenBPrice] = useState();

  const network = useRecoilValue(networkAtom);
  const priceManagerTx = new PriceManagerTx(network);

  const handleData = async () => {
    // fetch prices
    setTokenAPrice(await priceManagerTx.getInviPrice());
    setTokenBPrice(await priceManagerTx.getNativePrice());

    console.log(tokenAPrice / tokenBPrice);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Wrapper isShow={isShow}>
      <PriceBox
        onClick={() => {
          setIsShow((prev) => !prev);
        }}
      >
        <KlayInviPriceBox>
          <CircleIcon src={CircleSVG} />
          <KlayText>1 KLAY =</KlayText>
          <InviText>{(tokenAPrice / tokenBPrice).toFixed(3)} INVI</InviText>
          <InviValueText>($ 1.000)</InviValueText>
          <TooltipIcon src={TooltipSVG} />
        </KlayInviPriceBox>
        <StyledIconDown isShow={isShow} />
      </PriceBox>

      <DataBox isShow={isShow}>
        <Top>
          <SwapData>
            <span>Expected Output</span>
            <KlayData>8.84832 KLAY</KlayData>
          </SwapData>
          <SwapData>
            <span>Price Impact</span>
            <span>0.08%</span>
          </SwapData>
        </Top>
        <Line />
        <Bottom>
          <SwapData>
            <span>Minimum received after slippage (5.00%)</span>
            <span>8.42697 INVI</span>
          </SwapData>
          <SwapData>
            <span>Protocol Fee</span>
            <span>Max. %</span>
          </SwapData>
        </Bottom>
      </DataBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 15px 12px;
  width: calc(100% - 24px);
  height: ${(props) => (props.isShow ? "186px" : "23px")};
  background-color: ${(props) => props.theme.colors.lightPurple};
  border-radius: 10px;
  font-family: "Pretendard";
`;

const PriceBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const KlayInviPriceBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-right: 10px;
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.theme.colors.blue1};
`;

const CircleIcon = styled.img`
  padding-right: 6px;
`;

const KlayText = styled.div``;

const InviText = styled.div``;

const InviValueText = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding-left: 4px;
  color: ${(props) => props.theme.colors.navy};
`;

const TooltipIcon = styled.img`
  background: ${(props) => props.theme.colors.lightPurple};
`;

const StyledIconDown = styled(IconDown)`
  transform: ${(props) => (props.isShow ? "matrix(1, 0, 0, -1, 0, 0)" : "none")};
  fill: ${(props) => props.theme.colors.blue1};
`;

const DataBox = styled.div`
  display: ${(props) => (props.isShow ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #d8daff;
  border-radius: 15px;
  margin-top: 22px;
  gap: 10px;
  padding: 14px 13px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const SwapData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.navy};
`;

const KlayData = styled.span`
  color: ${(props) => props.theme.colors.blue1};
`;

const Bottom = styled(Top)``;

const Line = styled.div`
  width: 100%;
  border: 1.5px solid #d8daff;
`;
