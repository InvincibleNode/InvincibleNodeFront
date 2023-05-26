import styled from "styled-components";
import landing_background from "assets/images/landingpage_background.png";
import landing_background2 from "assets/images/landingpage_background2.png";
import assetpage_background from "assets/images/assetpage_background.png";

export const Background = styled.div`
  position: relative;
  background-size: cover;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${(props) =>
    props.launchApp
      ? landing_background2
      : props.asset
      ? assetpage_background
      : landing_background});
`;
