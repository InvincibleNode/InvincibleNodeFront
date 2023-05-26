import styled, { keyframes } from "styled-components";
import theme from "styles/theme";
import polygon from "assets/icons/myassets/polygon.svg";

const Tooltip = ({ content, ...props }) => {
  return (
    <>
      <Polygon src={polygon} />
      <TooltipContainer {...props}>
        <Title>{content[0]}</Title>
        <Content>{content[1]}</Content>
      </TooltipContainer>
    </>
  );
};

const fadeIn = keyframes`
    from{
        opacity: 0;
        transform: translateY(-3px);
    }
    to{
        opacity: 1;
        transform: translateY(0px);
    }
`;

const TooltipContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  padding: 15px 20px;
  color: ${theme.colors.realWhite};
  border-radius: 10px;
  background-color: ${theme.colors.blue3};
  white-space: pre-line;
  position: absolute;
  top: 30px;
  animation: ${fadeIn} 0.2s linear;
`;

const Title = styled.span`
  ${theme.fonts.Font_Heading_4_5};
`;

const Content = styled.span`
  ${theme.fonts.Font_Heading_4};
`;

const Polygon = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 16px;
`;

export default Tooltip;
