import styled from "styled-components";
import LeverageSlider from "./leverageSlider";
import { useRecoilState, useRecoilValue } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { stakeInfoAtom } from "store/stakeInfo";
import { networkAtom } from "store/network";
import { StepBox } from "./stepBox";

export const LeverageSizeBox = ({ getShowTooltip }) => {
  const walletType = useRecoilValue(walletTypeAtom);
  const stakeInfo = useRecoilValue(stakeInfoAtom);
  const network = useRecoilValue(networkAtom);
  function toUpper(str) {
    return str.toUpperCase();
  }
  ;

  return (
    <Wrapper>
      <StepBox step="Step 2" title="Set Leverage Times"/>
      <Box onClick={() => walletType === 0 && getShowTooltip()}>
        <SizeHeader>
          leverage reward
          <div>
            <span>x{stakeInfo.leverageRatio}</span>
            <span>{toUpper(network.token)}/ 1yr</span>
          </div>
        </SizeHeader>
        <LeverageSlider getShowTooltip={getShowTooltip} />
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

  margin: 0 calc(3.6rem * 0.8) calc(4rem * 0.8) calc(3.6rem * 0.8);
`;

const Box = styled.div`
  display: flex;
  background-color: #fff;
  border-radius : 1rem;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 2 * calc(2.3rem * 0.8));
  height: calc(12.6rem * 0.8 - 2 * calc(2.3rem * 0.8));
  border-bottom: 2px solid #D8DAFF;
  color: ${(props) => props.theme.colors.navy};
  padding: calc(2rem * 0.8) calc(2.3rem * 0.8) calc(2rem * 0.8) calc(2.3rem * 0.8);
`;

const SizeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.28rem;
  line-height: 1.52rem;
  margin-bottom: 0.8rem;
  font-family: "Pretendard";
  div {
    font-weight: 500;
    font-size: 1.6rem;
    display: flex;
    flex-direction: row;
    gap: 2.4rem;
  }
`;







