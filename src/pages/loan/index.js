import { Background } from "styles/styledComponents/background";
import Header from "components/common/header/header";
import Loan from "./loan";
import styled from "styled-components";
import { device } from "styles/styledComponents/media/mediaSize";

function LoanPage() {
  return (
    <Background launchApp={true}>
      <Header launchApp={true} />
      <TopText>Loan</TopText>
      <TitleText>Deposit NFT, Borrow $INVI</TitleText>
      <DescText>
        By depositing your NFT, you can borrow INVI and stake this to earn extra pay-offs,
        <br />
        all without risking the liquidation of your deposited NFT.
      </DescText>
      <LoanWrapper>
        <Loan></Loan>
      </LoanWrapper>
    </Background>
  );
}

export default LoanPage;

const TopText = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 20px;
  margin-top: 100px;
  margin-bottom: 15px;
`;

const TitleText = styled.div`
  font-weight: 900;
  color: white;
  text-align: center;
  font-size: 40px;

  margin-bottom: 10px;
`;

const DescText = styled(TopText)`
  margin-top: 0px;
`;

const LoanWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  margin-top: 75px;

  @media ${device.mobileS} {
  }

  @media ${device.laptop} {
  }
`;
