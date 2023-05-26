import styled from "styled-components";
import { InviStake } from "./inviStake";
import iLPLogo from "assets/icons/ilp_logo.svg";
import inviLogo from "assets/icons/invi_token_logo.svg";
import { useEffect, useState } from "react";
import { BoldText } from "styles/styledComponents/boldText";
import { LightText } from "styles/styledComponents/lightText";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import { GetILPModal } from "./GetILPModal";

const ilpDescription = `ILP implies the bond that liquidity provider supplied liquidity to the pool.
Holding $ILP will occur to you receiving the 70% of protocol fees and
$INVI as compensations of participating to Invincible and ecosystem. `;

const inviDescription1 = `You can earn rewards in $Klay by staking $INVI.`;

const inviDescription2 = `If you don't have $INVI, you can obtain it by providing $KLAY
liquidity, similar to buying $ILP. As an $ILP holder, you
receive $INVI continuously based on your liquidity ratio.`;

/**
 *
 * @path index.js -> buyEarn.js -> buyEarnInfo.js -> tokenInfo.js
 */
export const TokenInfo = ({ option }) => {
  const [tokenLogoSrc, setTokenLogoSrc] = useState(iLPLogo);
  const [tokenName, setTokenName] = useState("ILP");
  const [showGetIlpModal, setShowGetIlpModal] = useState(false);

  useEffect(() => {
    setTokenLogoSrc(option === 0 ? iLPLogo : inviLogo);
    setTokenName(option === 0 ? "ILP" : "INVI");
  }, [option]);
  return (
    <>
      {showGetIlpModal && (
        <GetILPModal
          closeModal={() => {
            setShowGetIlpModal(false);
          }}
        />
      )}
      <Wrapper>
        <TokenImage option={option}>
          <TokenLogo src={tokenLogoSrc} option={option}></TokenLogo>
          <TokenName>{tokenName}</TokenName>
        </TokenImage>
        <TokenDescription option={option}>
          {option === 0 ? (
            <> {ilpDescription}</>
          ) : (
            <>
              <InviDesc1>{inviDescription1}</InviDesc1>
              <InviDesc2>{inviDescription2}</InviDesc2>
            </>
          )}
        </TokenDescription>
        {option === 0 ? (
          <BuyILPButton
            onClick={() => {
              setShowGetIlpModal(true);
            }}
          >
            Buy ILP
          </BuyILPButton>
        ) : (
          <InviStake></InviStake>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 57px;
  position: relative;
`;
const TokenImage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-radius: 50px;
  width: ${(props) => (props.option === 0 ? "78px" : "90px")};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  margin-left: 60px;
  height: 86px;
  padding: 0 30px 0 20px;
`;
const TokenLogo = styled.img`
  width: 46px;
  margin-right: 4px;
`;
const TokenName = styled(BoldText)`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 800px;
  font-size: 22px;
`;
const TokenDescription = styled(LightText)`
  width: ${(props) => (props.option === 0 ? "476px" : "350px")};
  margin-right: 40px;
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: 14px;
  margin-left: ${(props) => (props.option === 0 ? "67px" : "34px")};
  font-family: "Pretendard";
  font-weight: 600;
  white-space: pre-wrap;
  line-height: 20px;
`;

const BuyILPButton = styled(BlueButton)`
  width: 160px;
  height: 60px;
  font-size: 22px;
  font-weight: 800;
  border-radius: 14px;
  margin-left: 60px;
`;

const InviDesc1 = styled(TokenDescription)`
  margin-bottom: 10px;
  margin-left: 0;
`;

const InviDesc2 = styled(TokenDescription)`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  margin-left: 0;
`;
