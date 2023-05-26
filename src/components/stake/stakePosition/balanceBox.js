import styled from "styled-components";
import { LightText } from "styles/styledComponents/lightText";
import { StepBox } from "./stepBox";

export const BalanceBox = ({ shownBalance, tokenName }) => {
  function toUpperCase(str) {
    return str.toUpperCase();
  }
  return (
    <Wrapper>
    <StepBox step="Step 1" title="Put stake amount"/>
    <Box>
      <BalanceText>Balance</BalanceText>
      <BalanceAmount>{shownBalance === 0 ? "-" : shownBalance}</BalanceAmount>
      <Token>{toUpperCase(tokenName)}</Token>
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
  color: ${(props) => props.theme.colors.black};
`;

const BalanceText = styled(LightText)`
  font-weight: 600;
  font-size: 1.12rem;
  color: ${(props) => props.theme.colors.navy};
`;

const BalanceAmount = styled(BalanceText)``;

const Token = styled(BalanceText)`
`;
