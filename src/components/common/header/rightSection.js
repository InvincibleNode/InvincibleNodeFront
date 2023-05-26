import styled from "styled-components";
import ConnectedRightTop from "./components/connectedRightTop";
import { routeStake } from "../routePath";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { clickLaunchAppAtom } from "store/clickLaunchApp";
import { size } from "styles/styledComponents/media/mediaSize";
import connectMetamask from "utils/web3/connectToMetamask";

const RightSection = ({ pathName, showTooltip, setShowWalletInfo, setShowSelectWallet, setShowSelectNetwork, navigate }) => {
  const [clickLaunchApp, setClickLaunchApp] = useRecoilState(clickLaunchAppAtom);
  useEffect(() => {
    console.log("RightSection pathName: ", pathName);
  }, []);
  return (
    <MiddleRightWrapper>
      {pathName === "/" ? (
        <RightTop>
          <LaunchApp
            onClick={async () => {
              await connectMetamask();
              setClickLaunchApp({ ...clickLaunchApp, clicked: true });
              routeStake(navigate);
            }}
          >
            Launch App
          </LaunchApp>{" "}
        </RightTop>
      ) : (
        <ConnectedRightTop
          showTooltip={showTooltip}
          setShowWalletInfo={setShowWalletInfo}
          setShowSelectWallet={setShowSelectWallet}
          setShowSelectNetwork={setShowSelectNetwork}
        />
      )}
    </MiddleRightWrapper>
  );
};

export default RightSection;

const MiddleRightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

const LaunchApp = styled.div`
  display: flex;
  width: 17.4rem;
  height: 7.2rem;
  background-color: ${(props) => props.theme.colors.mint};
  box-shadow: 0.4rem 0.4rem 0.5rem rgba(0, 0, 0, 0.25);
  border-radius: 0 0 2rem 2rem;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  color: ${(props) => props.theme.colors.blue1};
  text-align: center;
  font-family: "Pretendard";
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1rem;
  letter-spacing: 0em;
  cursor: pointer;

  @media (width < ${size.mobileL}) {
    display: none;
  }
`;
