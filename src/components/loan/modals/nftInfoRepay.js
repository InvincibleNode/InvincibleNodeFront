import styled from "styled-components";
import BlueNft from "../../../assets/icons/NFTstates/circleBlue.svg";
import RedNft from "../../../assets/icons/NFTstates/circleRed.svg";
import { useEffect } from "react";
import { fixAddress } from "utils/fixAddress";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import { convertUnixTimeToDate } from "utils/time/convertUnixTimeToDate";

const NftInfoRepay = ({ info }) => {
  const network = useRecoilValue(networkAtom);
  console.log("info", info);

  return (
    <Wrapper>
      <TitleWrapper>
        <NftImageContainer>
          <NftImage src={info.nftStatus == 0 ? BlueNft : RedNft}></NftImage>
          <NftText>NFT</NftText>
        </NftImageContainer>

        <TitleBox>
          <Title>Collateralizing NFT Information</Title>
          <NftId>
            <span>{info.nftId.toString().padStart(5, "0")}</span>
          </NftId>
        </TitleBox>
      </TitleWrapper>
      <Line />
      <Content>
        <Principle>
          <span>Principal</span>
          <span>
            {fixBalance(info.nftInfo.principal, network) + " " + network.token}
          </span>
        </Principle>
        <Evaluation>
          <span>Evaluation</span>
          <span>
            {fixBalance(info.nftInfo.evaluation, network) + " " + network.token}
          </span>
        </Evaluation>
        <TimeLeft>
          <span>TimeLeft</span>
          <span>{convertUnixTimeToDate(info.nftInfo.lockEnd)}</span>
        </TimeLeft>
        <BorrowedInvi>
          <span>Borrowed INVI</span>
          <span>{fixBalance(info.maxLTVInvi, network) + " INVI"}</span>
        </BorrowedInvi>
      </Content>
    </Wrapper>
  );
};

export default NftInfoRepay;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  width: 90%;
  margin: auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.realWhite};
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-top: 30px;
`;

const NftImageContainer = styled.div`
  width: 7rem;
  height: 7rem;
  position: relative;
  disply: inline-block;
  margin-left: 3rem;
  margin-right: 3rem;
`;

const NftImage = styled.img`
  width: 100%;
  height: 100%;
`;
const NftText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.colors.realWhite};
  font-size: 2rem;
  font-weight: 700;
`;
const TitleBox = styled.div``;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.blue1};
`;
const NftId = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue2};
  border-radius: 20px;
  border: 1px solid #61b5f2;
  padding: 1rem 1.4rem;
  display: inline-block;
  margin-top: 0.8rem;
  font-size: 1.1rem;

  span {
    margin: auto;
    font-size: 11px;
  }
`;

const Line = styled.hr`
  border: 2px solid ${(props) => props.theme.colors.lightBlue2};
  border-radius: 4px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Content = styled.div`
  margin-left: 30px;
  margin-right: 30px;
`;
const Principle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.6rem;
  font-weight: 500;
`;
const Evaluation = styled(Principle)``;
const TimeLeft = styled(Principle)``;

const BorrowedInvi = styled(Principle)`
  margin-bottom: 30px;
`;
