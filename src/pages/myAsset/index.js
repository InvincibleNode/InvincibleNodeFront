import { Background } from "styles/styledComponents/background";
import Header from "components/common/header/header";
import styled from "styled-components";
import { Profile } from "./profile";
import { RightNft } from "./rightNft";
import Coin from "assets/icons/myassets/coin.svg";
import NavBar from "components/myAsset/NavBar";
import { useState } from "react";
import { TYPES } from "components/myAsset/NavBar/NFTBox";
import ContentBox from "components/myAsset/ContentBox";

function MyAssetPage() {
  const [curType, setCurType] = useState(TYPES[0].title);

  const onSelect = (peek) => {
    setCurType(peek);
  };

  return (
    <Background
      launchApp={false}
      asset={true}
      style={{ paddingBottom: "200px" }}
    >
      <Header launchApp={true} />
      <TitleWrapper>
        <img src={Coin} alt="icon" />
        <MYAssetTitle>My Asset</MYAssetTitle>
      </TitleWrapper>
      <Container>
        <NavBar curType={curType} onSelect={onSelect} />
        <ContentBox curType={curType} />
      </Container>
      {/* <MyAssetWrapper>
        <Profile></Profile>
        <RightNft></RightNft>
      </MyAssetWrapper> */}
    </Background>
  );
}

export default MyAssetPage;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 55px;
`;

const MYAssetTitle = styled.div`
  font-family: Montserrat;
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 50px;
  margin-top: 55px;
`;

const MyAssetWrapper = styled.div`
  width: 1196px;
  min-height: 90vh;
  margin: 66px auto 0 auto;
  border-radius: 20px 20px 0px 0px;
  background-color: rgba(51, 51, 51, 0.8);
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  font-family: Pretendard;
  backdrop-filter: blur(25px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;
