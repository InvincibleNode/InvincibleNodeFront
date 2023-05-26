import styled from "styled-components";
import NftImage from "assets/images/nftPreview.png";
import NftIcon from "assets/icons/nftPreviewIcon.svg";
import { device, size } from "styles/styledComponents/media/mediaSize";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { stakeInfoAtom } from "store/stakeInfo";


function NFTPreview() {
  const stakeInfo = useRecoilValue(stakeInfoAtom);
  const network = useRecoilValue(networkAtom);
  return (
    <NFTPreviewWrapper>
      <NftPreviewText>
        <NFTPreviewIcon src={NftIcon} />
        NFT Preview
      </NftPreviewText>
      <NftImgWrapper src={NftImage}/>
      <NFTPreviewInfo>
        <LeveragedText>
          <span>X{stakeInfo.leverageRatio}</span>
          <span>leveraged</span>  
        </LeveragedText>
        <RewardsText>
          <CompareRewards>Compare rewards</CompareRewards>
          <OtherRewards>
            <PrincipalRewards>
              <span>Principal rewards</span>
              <span>{`${stakeInfo.principal} ${network.token}`}</span>  
            </PrincipalRewards>
            <LeverageRewards>
              <span>Leveraged Rewards</span>
              <span>{(stakeInfo.expectedReward / 10 ** 18).toFixed(6)} {network.token}</span>
            </LeverageRewards>
          </OtherRewards>
        </RewardsText>
      </NFTPreviewInfo>
    </NFTPreviewWrapper>
  );
}

export default NFTPreview;

const NFTPreviewWrapper = styled.div`
zoom: 0.8;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.navy};
  width: 38rem;
  height: 61rem;
  border-radius: 2rem;
  backdrop-filter: blur(2px);
  position: relative;
  margin-right: 3rem;
  padding: 6rem;
  @media (width < ${size.tablet}) {
    zoom: 0.75;
  }
`;

const NftImgWrapper = styled.img`
  width: 28.2rem;
  height: 38.4rem;
  z-index: 100;
  position: absolute;
  top: 11rem;
  left: 50%;
  transform: translateX(-50%);
`;

const NftPreviewText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.white};
  gap: 0.6rem;
`;

const NFTPreviewIcon = styled.img`
`;

const NFTPreviewInfo = styled.div`
position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 12rem);
  height: 18.1rem;
  background: linear-gradient(5.26deg, #010000 8.71%, rgba(20, 2, 2, 0.51721) 36.54%, rgba(39, 5, 5, 0) 88.6%);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding : 10rem 6rem 6rem 6rem;
`;

const LeveragedText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 3rem;
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 4rem;
  line-height: 5rem;
  color: #fff;
`;

const RewardsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.9rem;
  font-family: 'Pretendard';
`;

const CompareRewards = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: ${(props) => props.theme.colors.lightPurple1};
`;

const OtherRewards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PrincipalRewards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: ${(props) => props.theme.colors.lightPurple1};
`;

const LeverageRewards = styled(PrincipalRewards)`
  color: #fff;
  font-size: 1.8rem;
  line-height: 2.2rem;
  font-weight: 700;
`;


