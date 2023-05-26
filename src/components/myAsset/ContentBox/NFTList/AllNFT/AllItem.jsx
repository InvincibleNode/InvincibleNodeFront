import { useRecoilValue } from "recoil";
import styled from "styled-components";
import theme from "styles/theme";
import { networkAtom } from "store/network";
import Lock from "assets/icons/myassets/lock_purple.svg";
import Stake from "assets/icons/myassets/steak_blue.svg";
import { dateChangerShorter } from "utils/dateChanger";
import { floorHex } from "utils/floor";

const Collateralized = () => {
  return (
    <StatusContainer
      style={{ backgroundColor: "#5408b858", border: "1px solid #7B15FF" }}
    >
      <StatusIcon
        src={Lock}
        alt="collateralized"
        style={{ paddingBottom: "1px" }}
      />
      <StatusTitle style={{ color: "#C59EF8" }}>Collateralized</StatusTitle>
    </StatusContainer>
  );
};

const Staked = () => {
  return (
    <StatusContainer
      style={{ backgroundColor: "#7b82ff4c", border: "1px solid #7B82FF" }}
    >
      <StatusIcon src={Stake} alt="stake" />
      <StatusTitle style={{ color: "#afb3ff" }}>Staked</StatusTitle>
    </StatusContainer>
  );
};

const StatusContainer = styled.div`
  width: 140px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0.7;
`;

const StatusIcon = styled.img`
  width: auto;
  height: 13px;
`;

const StatusTitle = styled.span`
  ${theme.fonts.Font_Heading_6};
`;

/**
 * color : gradient(string)
 * id, pricipal, fee, timeleft : string
 * status : boolean (true -> collateralized / false -> staked)
 */
const AllItem = ({ color, id, principal, fee, timeleft, status }) => {
  const network = useRecoilValue(networkAtom);

  return (
    <Container>
      <Caption color={color} />
      <Title>{id}</Title>
      <Vertical />
      {[
        `${floorHex(principal, 4)} ${network.token}`,
        `${floorHex(fee, 4)} ${network.token}`,
        dateChangerShorter(timeleft),
      ].map((data) => (
        <Content key={data}>{data}</Content>
      ))}
      {status ? <Collateralized /> : <Staked />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 14px 22px;
  box-sizing: border-box;
  background-color: ${theme.colors.mediumGray2};
  border-radius: 10px;
`;

const Caption = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: ${(props) => props.color};
`;

const Vertical = styled.span`
  width: 2px;
  height: 20px;
  border-radius: 10px;
  background-color: ${theme.colors.white};
  opacity: 0.5;
`;

const Title = styled.span`
  ${theme.fonts.Font_Heading_4_1};
  color: ${theme.colors.realWhite};
`;

const Content = styled.span`
  ${theme.fonts.Font_Heading_4};
  color: ${theme.colors.realWhite};
`;

export default AllItem;
