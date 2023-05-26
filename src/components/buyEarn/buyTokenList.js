import styled from "styled-components";
import KlayIcon from "../../assets/icons/networkLogo/klaytnLogo.svg";
import { LightText } from "styles/styledComponents/lightText";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";

import { Button } from "styles/styledComponents/button";
import { useEffect, useState } from "react";
import { GetILPModal } from "./GetILPModal";
import { DragControls } from "framer-motion";
import getCoinPrice from "utils/fetchCoinPrice";

/**
 * @path index.js -> buyToken.js -> buyTokenList.js
 */
export const BuyTokenList = () => {
  //------states------//
  const [account, setAccount] = useRecoilState(accountAtom);
  const [showGetIlpModal, setShowGetIlpModal] = useState(false);
  const [coinPrice, setCoinPrice] = useState(0);

  //------recoil------//
  const network = useRecoilValue(networkAtom);
  const fixedBalance = fixBalance(account.balance, network);

  //------functions------//
  const fetchCoinPrice = async () => {
    const price = await getCoinPrice("KLAY");
    setCoinPrice(price);
  };

  //------useEffect------//
  useEffect(() => {
    fetchCoinPrice();
  }, []);

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
        <Row>
          <LeftBox>
            <TokenInfo>
              <TokenImage src={KlayIcon}></TokenImage>
              <TokenTitle>
                <TokenName>${network.token}</TokenName>
                <NetworkName>${network.name}</NetworkName>
              </TokenTitle>
            </TokenInfo>
          </LeftBox>
          <DivideLine />
          <MiddleBox>
            <TokenPrice>${coinPrice}</TokenPrice>
            <TotalSupply>$2,913,348.77</TotalSupply>
            <TokenData>{`${fixedBalance} ${network.token}`}</TokenData>
          </MiddleBox>
          <RightBox>
            <BuyTokenButton
              onClick={() => {
                setShowGetIlpModal(true);
              }}
            >
              Buy with ${network.token}
            </BuyTokenButton>
          </RightBox>
        </Row>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Row = styled.div`
  width: 100%;
  height: 41px;
  background-color: ${(props) => props.theme.colors.lightPurple};
  border-radius: 20px;
  padding: 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

const TokenImage = styled.img`
  width: 30px;
  margin-right: 10px;
`;

const TokenTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  height: 39px;
`;

const TokenName = styled(LightText)``;

const NetworkName = styled(LightText)`
  font-size: 14px;
  font-weight: 400;
`;

const DivideLine = styled.div`
  width: 2px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.lightPurple1};
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-evenly;
  width: 60%;
`;

const TokenData = styled(LightText)`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.navy};
  text-align: center;
  height: 20px;
  margin-top: 10px;
  width: 30%;
`;

const TokenPrice = styled(TokenData)``;

const TotalSupply = styled(TokenData)``;

const RightBox = styled(LeftBox)``;

const BuyTokenButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.blue1};
  width: 125px;
  height: 41px;
  border-radius: 8px;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
`;
