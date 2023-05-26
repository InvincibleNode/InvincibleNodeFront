import styled from "styled-components";
import theme from "styles/theme";
import white from "assets/icons/myassets/white.svg";
import red from "assets/icons/myassets/red.svg";
import blue from "assets/icons/myassets/blue.svg";
import { useEffect, useState } from "react";
import { dateChanger } from "utils/dateChanger";

const ASSET = {
  white: {
    color: ["#9D9D9D", "#FDFDFB"],
    img: white,
  },
  red: {
    color: ["#DF310A", "#FFB800"],
    img: red,
  },
  blue: {
    color: ["#61B5F2", "#61B5F2"],
    img: blue,
  },
};

/**
 * NFT 내용 -> 모달 연결해야함
 */
const NFT = ({ nftData, ...props }) => {
  const [curAsset, setCurAsset] = useState(ASSET.blue);

  useEffect(() => {
    switch (nftData.color) {
      case "blue":
        setCurAsset(ASSET.blue);
        break;
      case "red":
        setCurAsset(ASSET.red);
        break;
      case "white":
        setCurAsset(ASSET.white);
        break;
      default:
        break;
    }
  }, [nftData]);

  return (
    <Container {...props}>
      <TitleWrapper>
        <Title>Invincible Staking NFT</Title>
        <Content color={curAsset.color}>
          Unstakable at {dateChanger(nftData.unstakableDate)}
        </Content>
      </TitleWrapper>
      <NFTImg src={curAsset.img} alt={nftData.color} />
    </Container>
  );
};

const Container = styled.div`
  width: 27%;
  height: 355px;
  border-radius: 10px;
  background-color: ${theme.colors.darkGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 5px 20px 15px 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.span`
  ${theme.fonts.Font_Heading_4_1};
  color: ${theme.colors.lightBlue2};
`;

const Content = styled.span`
  ${theme.fonts.Font_Heading_4_1};
  background: ${(props) =>
    `-webkit-linear-gradient(${props.color[0]}, ${props.color[1]})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NFTImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
export default NFT;
