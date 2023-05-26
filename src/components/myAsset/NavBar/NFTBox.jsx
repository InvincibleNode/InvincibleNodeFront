import styled from "styled-components";
import theme from "styles/theme";
import lock from "assets/icons/myassets/lock.svg";
import lockWhite from "assets/icons/myassets/lock_white.svg";
import stake from "assets/icons/myassets/stake.svg";
import stakeWhite from "assets/icons/myassets/stake_white.svg";
import menu from "assets/icons/myassets/menu.svg";
import menuWhite from "assets/icons/myassets/menu_white.svg";
import timer from "assets/icons/myassets/timer.svg";
import timerWhite from "assets/icons/myassets/timer_white.svg";

export const TYPES = [
  {
    title: "All NFTs",
    icon: [menu, menuWhite],
  },
  {
    title: "Staked",
    icon: [stake, stakeWhite],
  },
  {
    title: "Collateralized",
    icon: [lock, lockWhite],
  },
  {
    title: "NFT history",
    icon: [timer, timerWhite],
  },
];

const NFTBox = ({ curType, onSelect }) => {
  return (
    <Container>
      <Title>NFT</Title>
      <MenuWrapper>
        {TYPES.map((type) => (
          <MenuBox
            key={type.title}
            onClick={() => onSelect(type.title)}
            selected={type.title === curType}
          >
            <Icon src={type.title === curType ? type.icon[1] : type.icon[0]} />
            {type.title}
          </MenuBox>
        ))}
      </MenuWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const Title = styled.span`
  ${theme.fonts.Font_Heading_3};
  color: white;
  text-align: center;
`;

const MenuWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #0b0b0b54;
  border-radius: 18px;
  padding: 10px 5px;
`;

const MenuBox = styled.div`
  width: 100%;
  padding: 8px 20px;
  ${theme.fonts.Font_Heading_3};
  color: ${(props) => (props.selected ? "white" : theme.colors.mediumGray)};
  background-color: ${(props) => (props.selected ? "#5A42EE" : "")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 20px;
  transition: all 0.2s;
  gap: 10px;

  &:hover {
    background-color: ${(props) => (props.selected ? "#5A42EE" : "#3c3c3c1f")};
  }
`;

const Icon = styled.img`
  width: 15px;
  height: auto;
`;

export default NFTBox;
