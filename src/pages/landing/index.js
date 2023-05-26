import styled from "styled-components";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "styles/styledComponents/button";
import { Background } from "styles/styledComponents/background";
import Header from "components/common/header/header";
import { routeStake } from "components/common/routePath";
import { StakeDesc } from "components/landing/stakeDesc";
import { LoanDesc } from "components/landing/loanDesc";
import { BuyEarnDesc } from "components/landing/buyEarnDesc";
import { NetworkDesc } from "components/landing/networkDesc";
import { InviDesc } from "components/landing/inviDesc";
import { Footer } from "components/common/footer";
import { size } from "styles/styledComponents/media/mediaSize";
import ScrollImg from "assets/icons/icon_scroll.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickLaunchAppAtom } from "store/clickLaunchApp";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import { walletTypeAtom } from "store/walletType";
import { NETWORK_DEFAULT } from "utils/constants/network.constant";
import { WALLET_TYPE_DEFAULT } from "utils/constants/walletType.constant";
import connectMetamask from "utils/web3/connectToMetamask";

function LandingPage() {
  const navigate = useNavigate();
  const LearnRef = useRef(null);
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const walletType = useRecoilValue(walletTypeAtom);
  const [clickLaunchApp, setClickLaunchApp] = useRecoilState(clickLaunchAppAtom);
  function handleScroll() {
    LearnRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Background launchApp={false}>
        <Header />
        <HeaderWrapper>
          <MainTitle>
            Secure your future
            <br />
            with invincible leverage staking
          </MainTitle>
          <ButtonWrapper>
            <Contact onClick={() => handleScroll()}>Learn More</Contact>
            <LaunchApp
              onClick={async () => {
                await connectMetamask();
                if (!(account.address !== undefined && network !== NETWORK_DEFAULT && walletType !== WALLET_TYPE_DEFAULT)) {
                  setClickLaunchApp(true); //하나라도 연결이 안되어있으면 launchApp = true
                }

                routeStake(navigate);
              }}
            >
              Launch App
            </LaunchApp>
          </ButtonWrapper>
          <ValueText>
            <span>Total Value Locked</span>
            <span>$</span>
            <span>100000000</span>
          </ValueText>
          <ScrollImgWrapper onClick={() => handleScroll()}>
            <ScrollImage src={ScrollImg} />
            <span>more</span>
          </ScrollImgWrapper>
        </HeaderWrapper>
        <BodyWrapper ref={LearnRef}>
          <BodyTitle>How it works</BodyTitle>
          <BodyDesc>
            The invincible node as a contributor of ecosystem’s sustainability, it’s aiming to enable users to earn maximized profits without risk.
          </BodyDesc>
          <StakeDesc />
          <LoanDesc />
          <BuyEarnDesc />
          <NetworkDesc />
        </BodyWrapper>
      </Background>
      <InviDesc />
      <Footer />
    </>
  );
}
export default LandingPage;

const HeaderWrapper = styled.div`
  position: relative;
  text-align: left;
  z-index: 2;
  width: 62.5%;
  height: calc(100vh - 42rem);
  padding-top: 42rem;
  margin: 0 auto;
  @media (${size.laptop} < width < ${size.desktop}) {
    padding-top: 31rem;
    height: calc(100vh - 31rem);
  }
  @media (${size.tablet} < width < ${size.laptop}) {
    padding-top: 25rem;
    height: calc(100vh - 25rem);
  }
  @media (${size.mobileL} < width < ${size.tablet}) {
    padding-top: 20rem;
    height: calc(100vh - 20rem);
  }
  @media (width < ${size.mobileL}) {
    padding-top: 15rem;
    height: calc(100vh - 15rem);
  }
`;

const MainTitle = styled.div`
  color: #fdf5e9;
  font-family: "Montserrat";
  font-size: 4.6rem;
  font-weight: 700;
  line-height: 6rem;
  text-align: left;
  margin-bottom: 4.2rem;

  @media (${size.laptop} < width < ${size.desktop}) {
    font-size: 4rem;
    margin-bottom: 3.8rem;
    line-height: 5.4rem;
  }
  @media (${size.tablet} < width < ${size.laptop}) {
    font-size: 3.8rem;
    margin-bottom: 3.6rem;
    line-height: 5rem;
  }
  @media (${size.mobileL} < width < ${size.tablet}) {
    font-size: 3.2rem;
    margin-bottom: 3.2rem;
    line-height: 4.4rem;
  }
  @media (width < ${size.mobileL}) {
    font-size: 2.4rem;
    margin-bottom: 2.2rem;
    line-height: 3.2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5rem;
  @media (${size.laptop} < width < ${size.desktop}) {
    margin-bottom: 4.4rem;
  }
  @media (${size.tablet} < width < ${size.laptop}) {
    margin-bottom: 3.8rem;
  }
  @media (${size.mobileL} < width < ${size.tablet}) {
    margin-bottom: 3.2rem;
  }
  @media (width < ${size.mobileL}) {
    margin-bottom: 2.6rem;
  }
`;

const Contact = styled(Button)`
  color: #fff;
  background-color: ${(props) => props.theme.colors.blue2};
  font-size: 2rem;
  font-weight: 700;
  border-radius: 3.5rem;
  width: 14.1rem;
  height: 5rem;
  @media (${size.laptop} < width < ${size.desktop}) {
    font-size: 1.6rem;
    width: 12.5rem;
    height: 4.3rem;
    border-radius: 3rem;
  }
  @media (${size.tablet} < width < ${size.laptop}) {
    font-size: 1.2rem;
    width: 10.5rem;
    height: 3.6rem;
    border-radius: 2.5rem;
  }
  @media (width < ${size.tablet}) {
    font-size: 1.2rem;
    width: 10.5rem;
    height: 3.6rem;
    border-radius: 2.5rem;
  }
`;
const LaunchApp = styled(Button)`
  color: ${(props) => props.theme.colors.blue1};
  background-color: ${(props) => props.theme.colors.mint};
  margin-left: 1.6rem;
  font-weight: 700;
  width: 14.7rem;
  height: 5rem;
  font-size: 2rem;
  border-radius: 3.5rem;
  @media (${size.laptop} < width < ${size.desktop}) {
    width: 13.1rem;
    height: 4.3rem;
    font-size: 1.6rem;
    border-radius: 3rem;
    margin-left: 1.3rem;
  }
  @media (${size.tablet} < width < ${size.laptop}) {
    width: 11.1rem;
    height: 3.6rem;
    font-size: 1.2rem;
    border-radius: 2.5rem;
    margin-left: 1.1rem;
  }
  @media (width < ${size.tablet}) {
    width: 11.1rem;
    height: 3.6rem;
    font-size: 1.2rem;
    border-radius: 2.5rem;
    margin-left: 1.1rem;
  }
`;

const ValueText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  span {
    font-family: Intel;
    font-size: 2.4rem;
    font-weight: 700;
    color: #fff;
    @media (${size.laptop} < width < ${size.desktop}) {
      font-size: 2rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
      font-size: 1.8rem;
    }
    @media (${size.mobileL} < width < ${size.tablet}) {
      font-size: 1.6rem;
    }
    @media (width < ${size.mobileL}) {
      font-size: 1.4rem;
    }
  }
`;

const ScrollImgWrapper = styled.div`
  position: absolute;
  bottom: 13.2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;

  span {
    font-family: Pretendard;
    font-weight: 700;
    font-size: 2rem;
    color: #fff;
  }
`;

const ScrollImage = styled.img``;

const BodyWrapper = styled.div`
  width: 62.5%;
  margin: 0 auto;
`;

const BodyTitle = styled.div`
  font-family: Montserrat;
  font-size: 4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 3.4rem;
  @media (${size.laptop} < width < ${size.desktop}) {
    font-size: 4rem;
    margin-bottom: 3rem;
  }
  @media (${size.tablet} < width < ${size.laptop}) {
    font-size: 3.6rem;
    margin-bottom: 2.6rem;
  }
  @media (${size.mobileL} < width < ${size.tablet}) {
    font-size: 3.2rem;
    margin-bottom: 2.2rem;
  }
  @media (width < ${size.mobileL}) {
    font-size: 2.8rem;
    margin-bottom: 1.8rem;
  }
`;

const BodyDesc = styled.div`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 2.2rem;
  line-height: 124.9%;
  color: #fff;
  margin-bottom: 13.6rem;

  @media (${size.laptop} < width < ${size.desktop}) {
    font-size: 2.2rem;
  }
  @media (${size.tablet} < width < ${size.laptop}) {
    font-size: 2rem;
  }
  @media (${size.mobileL} < width < ${size.tablet}) {
    font-size: 1.8rem;
  }

  @media (width < ${size.mobileL}) {
    font-size: 1.6rem;
  }

`;
