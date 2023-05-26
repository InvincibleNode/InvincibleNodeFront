import styled from "styled-components";
import NftOverall from "./nftOverall";
import NftData from "./nftData";

/**
 *
 * @path index.js -> rightNft.js -> nftGrid.js -> nftModal.js
 */
const NftModal = ({ closeModal, nftData, stakeInfos, expectedReward, nftId }) => {
  return (
    <Wrapper isLent={stakeInfos.isLent}>
      <NftOverall nftData={nftData} stakeInfos={stakeInfos} expectedReward={expectedReward}></NftOverall>
      <NftData closeModal={closeModal} nftData={nftData} stakeInfos={stakeInfos} nftId={nftId}></NftData>
    </Wrapper>
  );
};

export default NftModal;

const Wrapper = styled.div`
  width: 1050px;
  background: rgba(37, 36, 35, 0.5);
  background: ${(props) => (props.isLent ? "rgba(37, 36, 35, 0.5)" : props.theme.colors.white)};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(50px);
  position: fixed;
  z-index: 1;
  left: 5%;
  top: 0%;
  height: 850px;

  display: flex;
  justify-content: space-between;
  border-radius: 14px;
`;
