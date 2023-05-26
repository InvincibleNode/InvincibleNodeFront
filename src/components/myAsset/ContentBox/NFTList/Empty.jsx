import basket from "assets/icons/myassets/basket.svg";
import styled from "styled-components";
import theme from "styles/theme";

/**
 * 비어있는 경우
 */
const Empty = () => {
  return (
    <Container>
      <Icon src={basket} alt="basket" />
      <Content>{`Nothing Detected.\nNFTs will appear on this page after staking.`}</Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Icon = styled.img`
  width: 30%;
  height: auto;
  min-width: 150px;
`;

const Content = styled.span`
  ${theme.fonts.Font_Heading_2};
  color: ${theme.colors.mediumGray};
  text-align: center;
  white-space: pre-line;
`;
export default Empty;
