import styled from "styled-components";
import IconDownGr from "assets/icons/icon_down_gr.svg";
import inviLogo from "assets/icons/invi_token_logo.svg";
import KlayLogo from "assets/icons/networkLogo/klaytnLogo.svg";
import IconDown from "assets/icons/icon_down_navy.svg";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";

export const SelectBox = ({ token }) => {
  const network = useRecoilValue(networkAtom);

  return (
    <Wrapper invi={token === "INVI" ? true : false}>
      <TokenLogo src={token === "INVI" ? inviLogo : network.logo} invi={token === "INVI" ? true : false} />
      <TokenText invi={token === "INVI" ? true : false}>{token}</TokenText>
      <IconDownImage src={token === "INVI" ? IconDownGr : IconDown} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props) => (props.invi ? "98px" : "111px")};
  height: 36px;
  border-radius: 20px;
  padding: 0 6px;
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  cursor: pointer;
`;

const TokenLogo = styled.img`
  width: ${(props) => (props.invi ? "36px" : "26px")};
`;

const TokenText = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  background: ${(props) => props.invi && "linear-gradient(140.37deg, #1F53FF 2.52%, #9C1FFF 89.95%)"};
  -webkit-background-clip: ${(props) => props.invi && "text"};
  -webkit-text-fill-color: ${(props) => props.invi && "transparent"};
  background-clip: ${(props) => props.invi && "text"};
  color: ${(props) => !props.invi && props.theme.colors.navy};
`;

const IconDownImage = styled.img``;
