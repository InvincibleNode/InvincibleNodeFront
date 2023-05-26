import { useState } from "react";
import styled from "styled-components";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import { BoldText } from "styles/styledComponents/boldText";
import { LightText } from "styles/styledComponents/lightText";
import { WhiteButton } from "styles/styledComponents/Buttons/whiteButton";
import { StakeINVIModal } from "./stakeINVIModal/stakeINVIModal";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";
import { accountAtom } from "store/account";
import { useEffect } from "react";
import { fixBalance } from "utils/fixBalance";

/**
 * @path index.js -> buyEarn.js -> buyEarnInfo.js -> tokenInfo.js -> inviStake.js
 */
export const InviStake = () => {
  //------useStates------//
  const [inviBalance, setInviBalance] = useState("--");
  const [option, setOption] = useState(0);
  const [showModal, setShowModal] = useState(false);

  //------useRecoilValues------//
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);

  //------TX objects------//
  const inviTokenTx = new InviTokenTx(network);

  //------functions------//
  const getInviBalance = async () => {
    const balance = await inviTokenTx.getBalance(account.address);
    setInviBalance(fixBalance(balance, network));
  };

  //------useEffect------//
  useEffect(() => {
    getInviBalance();
  }, [account]);

  return (
    <>
      {showModal && (
        <StakeINVIModal
          closeModal={() => {
            setShowModal(false);
          }}
          option={option}
          setOption={setOption}
        />
      )}
      <Wrapper>
        <InviBalance>
          <AvailableText>Available</AvailableText>
          <BalanceText>{inviBalance} INVI</BalanceText>
        </InviBalance>
        <StakeButton
          onClick={() => {
            setShowModal(true);
            setOption(0);
          }}
        >
          Stake
        </StakeButton>
        <UnstakeButton
          onClick={() => {
            setShowModal(true);
            setOption(1);
          }}
        >
          Unstake
        </UnstakeButton>
      </Wrapper>
    </>
  );
};

//------styles------//
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-family: Pretendard;

  width: 450px;
  height: 107px;
  position: absolute;
  right: -10px;

  border: 1px solid transparent;
  border-radius: 50px 0px 0px 50px;
  background-color: #f6f8ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(#f6f8ff, #f6f8ff), linear-gradient(160deg, rgba(31, 83, 255, 1) 0%, rgba(156, 31, 255, 1) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;
const InviBalance = styled.div`
  margin-left: 50px;
  margin-right: 20px;
  color: ${(props) => props.theme.colors.navy};
  font-weight: 800;
  font-size: 22px;
`;
const AvailableText = styled(LightText)`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;
const BalanceText = styled(BoldText)`
  font-size: 1.6rem;
`;
const StakeButton = styled(BlueButton)`
  width: 104px;
  height: 40px;
  margin-right: 1rem;
  font-weight: 500;
  font-size: 16px;
`;
const UnstakeButton = styled(WhiteButton)`
  width: 104px;
  height: 40px;
  font-weight: 500;
  font-size: 16px;
  margin-right: 1rem;
`;
