import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import TokenImg from "../../../assets/icons/networkLogo/klaytnLogo.svg";
import styled from "styled-components";
import { stakeInfoAtom } from "store/stakeInfo";

const NftInfo = () => {
  const network = useRecoilValue(networkAtom);
  const stakeInfo = useRecoilValue(stakeInfoAtom);

  return (
    <Wrapper>
      <Title>NFT Preview</Title>
      <TokenImage>
        <img src={TokenImg} alt="tokenImage" />
        <span>Certificated</span>
      </TokenImage>
      <NFTContents>
        <Principle>
          <span>Principal</span>
          <span>{`${stakeInfo.principal} ${network.token}`}</span>
        </Principle>
        <Leveraged>
          <span>Leveraged</span>
          <span>x{stakeInfo.leverageRatio}</span>
        </Leveraged>
        <Timelock>
          <span>Timelock</span>
          <span>{stakeInfo.lockPeriod} days</span>
        </Timelock>
        <ProtocolFees>
          <span>Protocol Fees</span>
          <span>{stakeInfo.protocolFee / 10 ** 3}%</span>
        </ProtocolFees>
      </NFTContents>
    </Wrapper>
  );
};

export default NftInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 20px 20px;
  background-color: ${(props) => props.theme.colors.lightPurple1};

  width: 100%;
  height: 400px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${(props) => props.theme.colors.blue1};
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const TokenImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 83%;
  margin-bottom: 40px;
  img {
    width: 30px;
    height: 30px;
  }
  span {
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.colors.blue1};
  }
`;

const NFTContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 83%;
  height: 180px;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.theme.colors.navy};
`;

const Principle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Leveraged = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Timelock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProtocolFees = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
