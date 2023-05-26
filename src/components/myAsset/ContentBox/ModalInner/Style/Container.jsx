import styled, { keyframes } from "styled-components";
import theme from "styles/theme";

/**
 * 모달 전체 wrapper 박스
 */
export const ModalWrapper = styled.div`
  max-width: 1056px;
  width: 70vw;
  max-height: 830px;
  height: 80vh;
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 8px;
`;
/**
 * 모달 왼쪽 그림이 있는 박스
 */
export const MainBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  gap: 20px;
`;

/**
 * 모달 우측 박스
 */
export const InfoBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2a334a77;
  }
  &::-webkit-scrollbar-track {
    background-color: #00ff0000;
  }
`;
/**
 * 메인 박스 상단 타이틀
 */
export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

/**
 * 상단에 존재하는 캡션 (원)
 */
export const Caption = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props) => props.background};
  border-radius: 100%;
`;

export const Heading1 = styled.span`
  ${theme.fonts.Font_Heading_1};
`;

export const Heading41 = styled.span`
  ${theme.fonts.Font_Heading_4_1};
`;

export const Heading3 = styled.span`
  ${theme.fonts.Font_Heading_3};
`;

export const Heading35 = styled.span`
  ${theme.fonts.Font_Heading_3_5}
`;

export const Heading45 = styled.span`
  ${theme.fonts.Font_Heading_4_5};
`;

export const Heading6 = styled.span`
  ${theme.fonts.Font_Heading_6};
  white-space: pre-line;
`;

export const Verical = styled.div`
  width: 4px;
  height: 15px;
  border-radius: 10px;
  background-color: ${theme.colors.lightGray};
`;

/**
 * Staking NFT
 */
export const MainHeader = styled.span`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 4.6rem;
  line-height: 5rem;
  text-align: start;
  white-space: pre-line;
`;

export const CircularInner = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: absolute;
  right: 35px;
  top: 31px;
`;

export const Circular = styled.div`
  width: 73px;
  height: 73px;
  position: absolute;
  right: 30px;
  top: 30px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
`;

/**
 * 테두리 있는
 */
export const TitleTag = styled.span`
  ${theme.fonts.Font_Heading_3_5};
  padding: 8px 20px;
  border-radius: 20px;
  border: 1.5px solid ${(props) => props.color};
  color: ${(props) => props.color};
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  box-sizing: border-box;
  gap: 10px;
  border-radius: 10px;
`;

export const InfoLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

/**
 * 레버리지 박스
 */
export const LeverageBox = styled.div`
  width: 100%;
  padding: 60px 30px 30px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;
/**
 * 레버리지 박스 내부 콘텐츠 래퍼
 */
export const LeverageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const MainInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ProgressBarBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 29px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  width: ${(props) => props.ratio}%;
  height: 100%;
  background: ${(props) => props.background};
  border-radius: 20px;
  transition: all 0.15s;
`;

export const ContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const Horizon = styled.div`
  width: 100%;
  height: 1px;
`;

export const cardAnimation = keyframes`
  0%{
    transform: rotate(20deg)
  }
  50%{
    transform: rotate(19deg) translate(-3px, 4px)
  }
  100%{
    transform: rotate(20deg)
  }
`;

export const subCardAnimation = keyframes`
  0%{
    transform: rotate(-30deg)
  }
  50%{
    transform: rotate(-31deg) translate(-3px, 4px)
  }
  100%{
    transform: rotate(-30deg)
  }
`;

export const CardImage = styled.img`
  width: 10vw;
  max-width: 250px;
  height: auto;
  transform: rotate(20deg);
  position: absolute;
  top: 18%;
  right: 18%;
  animation: ${cardAnimation} 2s ease-in-out infinite;
`;

export const SubCardImg = styled.img`
  width: 7vw;
  max-width: 160px;
  height: auto;
  transform: rotate(-30deg);
  position: absolute;
  top: 25%;
  right: 40%;
  filter: brightness(0.8);
  animation: ${subCardAnimation} 2.5s ease-in-out infinite;
`;
