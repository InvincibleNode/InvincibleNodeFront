import styled from "styled-components";
import NickNameBox from "./NickNameBox";
import NFTBox from "./NFTBox";

/**
 *  My Asset페이지에서 왼쪽 네비게이션 바
 */
const NavBar = ({ curType, onSelect }) => {
  return (
    <Container>
      <NickNameBox />
      <NFTBox curType={curType} onSelect={onSelect} />
    </Container>
  );
};

const Container = styled.div`
  width: 155px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
  gap: 50px;
`;

export default NavBar;
