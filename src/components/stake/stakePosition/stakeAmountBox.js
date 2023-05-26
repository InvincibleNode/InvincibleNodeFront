import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { stakeInfoAtom } from "store/stakeInfo";
import { useEffect } from "react";
import { LightText } from "styles/styledComponents/lightText";
import { StepBox } from "./stepBox";

export const StakeAmountBox = ({ shownBalance, token, getShowTooltip }) => {
  const walletType = useRecoilValue(walletTypeAtom);
  const [stakeInfo, setStakeInfo] = useRecoilState(stakeInfoAtom);
  function toUpper(str) {
    return str.toUpperCase();
  }
  return (
    <Wrapper>
      <StepBox step="Step 1" title="Put stake amount"/>
      <Box>
        <StakeAmountText>
          Stake amount
          <ErrorText show={false}>Insufficient gas fees. Try less amount.</ErrorText>
        </StakeAmountText>
        <SetStakeAmount onClick={() => walletType === 0 && getShowTooltip()}>
          <input
            type="number"  
            placeholder="0.000"
            value={stakeInfo.principal === 0 ? "" : stakeInfo.principal}
            onChange={(e) =>
              setStakeInfo((prev) => ({
                ...prev,
                principal: e.target.value,
                stakedAmount: e.target.value * prev.leverageRatio,
              }))
            }
            disabled={walletType === 0}
          ></input>
          <RightButton>
            <button
              onClick={() =>
                walletType !== 0 &&
                setStakeInfo((prev) => ({
                  ...prev,
                  principal: shownBalance,
                  stakedAmount: shownBalance * prev.leverageRatio,
                }))
              }
            >
              MAX
            </button>
            <Token>{toUpper(token)}</Token>
          </RightButton>
        </SetStakeAmount>
        <BalanceBox>
          <BalanceText>Balance: </BalanceText>
      <BalanceAmount>{shownBalance === 0 ? "-" : shownBalance}</BalanceAmount>
        </BalanceBox>
        
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: calc(1.4rem * 0.8);
  width: calc(100% - 2 * calc(3.6rem * 0.8));
  margin: calc(3rem * 0.8) calc(3.6rem * 0.8) calc(4rem * 0.8) calc(3.6rem * 0.8);
`;

const Box = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: flex-start;
  gap: calc(1.8rem * 0.8);
  justify-content: space-between;
  font-family: Pretendard;
  background-color: #ffff;
  border-radius: 1rem;
  height: calc(calc(15.5rem * 0.8) - 2 * calc(2rem * 0.8));
  width: calc(calc(43.7rem * 0.8) - 2 * calc(2.3rem * 0.8));
  padding: calc(2rem * 0.8) calc(2.3rem * 0.8) calc(2rem * 0.8) calc(2.3rem * 0.8);
  font-family: 'Pretendard';
  color: ${(props) => props.theme.colors.navy};
  border-bottom: 2px solid #D8DAFF;
`;

const StakeAmountText = styled(LightText)`
  font-weight: 500;
  font-size: 1.28rem;
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const ErrorText = styled(LightText)`
  display: ${(props) => (props.show ? "block" : "none")};
  font-weight: 240;
  font-size: 0.96rem;
  color: #ff6240;
`;

const SetStakeAmount = styled.div`
  display: flex;
  justify-items: flex-start;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  width: 100%;

  input {
    margin: 0;
    width: 16.96rem;
    text-align: left;
    font-weight: 600;
    font-family: "Pretendard";
    font-size: 2.4rem;
    color: ${(props) => props.theme.colors.blue1};

  }
  input::placeholder {
    color: ${(props) => props.theme.colors.blue1};
  } 
`;

const RightButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: calc(0.6rem * 0.8);
  button {
    background-color: ${(props) => props.theme.colors.blue1};
    color: #fff;
    border-radius: calc(0.4rem * 0.8);
    width: calc(4.6rem * 0.8);
    height: calc(2.6rem * 0.8);
    font-weight: 400;
    font-size: 1.12rem;
    border: none;
    line-height:  calc(2.6rem * 0.8);
  }
`;

const Token = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.black};
`;

const BalanceBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

const BalanceText = styled(LightText)`
  font-weight: 400;
  font-size: 1.12rem;
  color: ${(props) => props.theme.colors.navy};
`;

const BalanceAmount = styled(BalanceText)``;