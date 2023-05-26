import { css } from "styled-components";
const colors = {
  primary: "#1F53FF",
  blue1: "#1F53FF",
  blue2: "#1540CF",
  blue3: "#746FFF",
  skyBlue: "#45CEFA",
  navy: "#3E4064",
  white: "#F1F1F1",
  mint: "#10F5CC",
  black: "#0B0B0B",
  darkGray: "#252423",
  mediumDarkGray: "#6A6A6A",
  mediumGray: "#b0b0b0",
  mediumGray2: "#333333",
  mediumLightGray: "#B0B0B0",
  purple: "#5A42EE",
  purple1: "#ACB0FD",
  lightBlue2: "#F6F8FF",
  lightPurple: "#E2E4FF",
  lightPurple1: "#D8DAFF",
  lightPurple2: "#ECEDFF",
  ActivePurple: "#5A42EE",
  red: "#FF2C27",
  realWhite: "#FFFFFF",
  lightRed: "#FFF5F5",
  forthcomingRed: "#FF6240",
  darkGray2: "#262626",
  lightGray: "#E1E3EA",
  pink: "FF007A",
};

const fonts = {
  Font_Special: css`
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 4rem;
    line-height: 5rem;
  `,
  Font_Title: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 800;
    font-size: 3rem;
    line-height: 3.6rem;
  `,
  Font_Body_Text: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  Font_Heading_1: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  Font_Heading_2: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.9rem;
  `,
  Font_Heading_3: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.9rem;
  `,
  Font_Heading_3_5: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
  `,
  Font_Heading_4: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.8rem;
  `,
  Font_Heading_4_1: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2rem;
  `,
  Font_Heading_4_5: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 1.7rem;
  `,
  Font_Heading_5: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.5rem;
  `,
  Font_Heading_6: css`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.4rem;
  `,
};
const theme = {
  colors,
  fonts,
};

export default theme;
