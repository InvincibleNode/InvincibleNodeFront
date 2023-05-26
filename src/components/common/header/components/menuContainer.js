import {
  routeBuyEarn,
  routeIlp,
  routeLoan,
  routeSwap,
  routeMyAsset,
  routeDocs,
  routeContract,
  routeInviStake,
} from "components/common/routePath";
import styled from "styled-components";
import { Button } from "styles/styledComponents/button";
import { LightText } from "styles/styledComponents/lightText";

const MenuContainer = ({ pathName, navigate }) => {
  return (
    <MiddleTop>
      {/* <MenuButton
        className={pathName === "/buy&earn" ? "active" : "disactive"}
        onClick={() => routeBuyEarn(navigate)}
      >
        <MenuButtonText>Buy & Earn</MenuButtonText>
      </MenuButton> */}
      <MenuButton
        className={pathName === "/ilp" ? "active" : "disactive"}
        onClick={() => routeIlp(navigate)}
      >
        <MenuButtonText>ILP</MenuButtonText>
      </MenuButton>
      <MenuButton
        className={pathName === "/invi/stake" ? "active" : "disactive"}
        onClick={() => routeInviStake(navigate)}
      >
        <MenuButtonText>INVI</MenuButtonText>
      </MenuButton>
      <MenuButton
        className={pathName === "/loan" ? "active" : "disactive"}
        onClick={() => routeLoan(navigate)}
      >
        <MenuButtonText>Loan</MenuButtonText>
      </MenuButton>
      <MenuButton
        className={pathName === "/swap" ? "active" : "disactive"}
        onClick={() => routeSwap(navigate)}
      >
        <MenuButtonText>Swap</MenuButtonText>
      </MenuButton>
      <MenuButton
        className={pathName === "/Myasset" ? "active" : "disactive"}
        onClick={() => routeMyAsset(navigate)}
      >
        <MenuButtonText>My Asset</MenuButtonText>
      </MenuButton>
      <MenuButton
        className={pathName === "/docs" ? "active" : "disactive"}
        onClick={() => routeDocs(navigate)}
      >
        <MenuButtonText>Docs</MenuButtonText>
      </MenuButton>
      <MenuButton
        className={pathName === "/contract" ? "active" : "disactive"}
        onClick={() => routeContract(navigate)}
      >
        <MenuButtonText>Contract</MenuButtonText>
      </MenuButton>
    </MiddleTop>
  );
};

export default MenuContainer;

const MenuButton = styled(Button)`
  background-color: transparent;
  color: white;
  display: flex;
  align-items: center;
  text-align: center;
  width: max-content;
  height: 3rem;
  margin-left: 3rem;
  border: none;
  border-radius: 0.5rem;
  font-family: Pretendard;
  @media screen and (max-width: 1199px) {
    display: none;
  }

  &.active {
    color: white;
  }

  &.disactive {
    color: rgba(246, 247, 252, 0.8);
  }
`;

const MenuButtonText = styled(LightText)`
  text-decoration: none;
  display: inline-block;
  font-weight: 400;
  font-size: 1.4rem;
  padding: 3px 0;
  position: relative;
  &:hover {
    color: white;
  }
`;

const MiddleTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
`;
