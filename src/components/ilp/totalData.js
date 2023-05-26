import styled from "styled-components";
import liquidityCircle from "assets/icons/liquidityCircle.svg";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";

export const TotalData = ({ totalLiquidity }) => {
  const network = useRecoilValue(networkAtom);

  return (
    <TotalDataWrapper>
      <TotalLiquidity>
        <Title>
          <img src={liquidityCircle} alt="liquidityCircle" />
          <span>Total Provided Liquidity</span>
        </Title>
        <Data>
          <span>{fixBalance(totalLiquidity, network)}</span>
          <span>{network.token}</span>
        </Data>
      </TotalLiquidity>
    </TotalDataWrapper>
  );
};

const TotalDataWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  padding: 1.4rem 2rem;
  gap: 2rem;
  font-family: "Pretendard";
  color: white;
`;

const IlpSupplied = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 1.4rem 2rem;
  img {
    width: 2rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1.4rem;
  gap: 0.4rem;
`;
const Data = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.6rem;
  gap: 0.4rem;
  line-height: 2.2rem;
`;
const TotalLiquidity = styled(IlpSupplied)``;
