import styled from "styled-components";
import INVI from "assets/icons/invi_logo.svg";
import ILP from "assets/icons/ilp_logo.svg";
import ISPT from "assets/icons/ispt_logo.svg";
import AddIcon from "assets/icons/addIcon.svg";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import { addTokenMetamask } from "utils/addTokenMetamask";

export const TokenBox = ({ name, desc, balance, address }) => {
  const network = useRecoilValue(networkAtom);

  const getImageSource = () => {
    switch (name) {
      case "INVI":
        return INVI;
      case "ILP":
        return ILP;
      case "ISPT":
        return ISPT;
      default:
        return "";
    }
  };
  return (
    <Wrapper>
      <LeftBox>
        <TokenInfo>
          <TokenImg>
            <img src={getImageSource()} alt={name} />
          </TokenImg>
          <TokenName>
            {name}
            <span>{desc}</span>
          </TokenName>
        </TokenInfo>
        <Line />
      </LeftBox>
      <RightBox>
        <Balance>
          <Title>Balance</Title>
          <Value>
            {fixBalance(balance, network)}
            <span>{name}</span>
          </Value>
        </Balance>
        <AddBtn
          onClick={() => {
            addTokenMetamask(address, name, 18);
          }}
        >
          Add
          <img src={AddIcon} alt="addIcon" />
        </AddBtn>
      </RightBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 4.4rem);
  height: calc(100% - 4rem);
  padding: 2rem 2.2rem;
  background-color: #fff;
  border-radius: 1.4rem;
  gap: 7%;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 64%;
`;

const TokenInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8%;
  width: 100%;
`;
const TokenName = styled.div`
  display: flex;
  flex-direction: column;
  color: #2c2c2c;
  font-size: 1.6rem;
  font-weight: 700;
  span {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const TokenImg = styled.div`
  img {
    width: 4rem;
  }
`;

const Line = styled.div`
  width: 0.4rem;
  height: 1rem;
  background-color: #acb0fd;
  border-radius: 1rem;
`;

const RightBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;
  color: #2c2c2c;
  gap: 18%;
`;

const Balance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 1.4rem;
  font-weight: 400;
`;

const Value = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.4rem;
  font-weight: 600;
  width: 100%;

  span {
    font-weight: 700;
    margin-left: 5%;
  }
`;

const AddBtn = styled(BlueButton)`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  width: 8.3rem;
  border-radius: 1rem;
  padding: 1.4rem 2rem;
  img {
    height: 1.5rem;
  }
`;
