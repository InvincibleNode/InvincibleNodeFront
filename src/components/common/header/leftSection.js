import styled from "styled-components";
import MenuContainer from "./components/menuContainer";
import { routeMain } from "../routePath";
import logo from "assets/icons/invi_logo.svg";

const LeftSection = ({ pathName, navigate }) => {
  return (
    <LeftTop>
      <Logo
        src={logo}
        onClick={() => {
          routeMain(navigate);
        }}
      ></Logo>
      <InvincibleNodeText
        onClick={() => {
          routeMain(navigate);
        }}
      >
        INVI
      </InvincibleNodeText>
      <MenuContainer pathName={pathName} navigate={navigate} />
    </LeftTop>
  );
};

export default LeftSection;

const Logo = styled.img`
  height: 5.2rem;
  width: 5.5rem;
  margin-right: 0.3rem;
`;

const LeftTop = styled.div`
  display: flex;
  align-items: center;
  padding-right: 3rem;
`;

const InvincibleNodeText = styled.div`
  font-family: "Montserrat";
  color: #fdf5e9;
  font-size: 3rem;
  font-weight: 600;
  text-align: left;
`;
