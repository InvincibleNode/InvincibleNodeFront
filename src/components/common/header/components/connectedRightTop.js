import downArrow from "assets/icons/icon_down.svg";
import GetNetworkLogo from "utils/getNetworkLogo/getNetworkLogo";
import metamaskLogo from "assets/icons/metamask_logo.svg";
import styled from "styled-components";
import { networkAtom } from "store/network";
import { useRecoilValue } from "recoil";
import { fixBalance } from "utils/fixBalance";
import WalletIcon from "assets/icons/walletIcon.svg";
import { useNavigate } from "react-router-dom";
import { routeStake } from "../../routePath";
import { accountAtom } from "store/account";
import { walletTypeAtom } from "store/walletType";

const ConnectedRightTop = ({
  showTooltip,
  setShowWalletInfo,
  setShowSelectWallet,
  setShowSelectNetwork,
}) => {
  let navigate = useNavigate();
  const walletType = useRecoilValue(walletTypeAtom);
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);
  const fixedBalance = fixBalance(account.balance, network);

  if (walletType === 1 && account.address !== undefined) {
    return (
      <>
        <RightTop>
          <StakingButton
            onClick={() => {
              routeStake(navigate);
            }}
          >
            Staking
          </StakingButton>
          <WalletAddress
            onClick={() => {
              setShowWalletInfo(true);
            }}
          >
            <img src={metamaskLogo} alt=""></img>
            <WalletAddressText>
              {account.balance ? fixedBalance : "-"}
            </WalletAddressText>
          </WalletAddress>

          <NetworkButton
            onClick={() => {
              setShowSelectNetwork(true);
            }}
          >
            <GetNetworkLogo />
            <NetworkButtonText>{network.name}</NetworkButtonText>
            <img src={downArrow} alt=""></img>
          </NetworkButton>
        </RightTop>
      </>
    );
  } else {
    return (
      <RightTop>
        <StakingButton
          onClick={() => {
            routeStake(navigate);
          }}
        >
          Staking
        </StakingButton>

        <WalletConnect
          onClick={() => {
            setShowSelectWallet(true);
          }}
        >
          <img src={WalletIcon} alt="WalletIcon" />
          Connect wallet
          {showTooltip && <Tooltip>Please Connect wallet first.</Tooltip>}
        </WalletConnect>
      </RightTop>
    );
  }
};

const RightTop = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 1rem;
`;

const NetworkButton = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.darkGray};
  justify-content: center;
  align-items: center;
  width: 13.1rem;
  height: 4.4rem;
  font-family: Pretendard;
  font-weight: 600;
  margin-left: 2rem;
  font-size: 1.4rem;
  line-height: 1rem;
  border-radius: 0.6rem;
  cursor: pointer;
  span {
    width: 2rem;
    height: 2rem;
    border-radius: 10rem;
    background-color: ${(props) => props.theme.colors.blue1};
  }
`;
const NetworkButtonText = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 1.4rem;
  margin: 0 1rem;
`;

const WalletAddress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.darkGray};
  width: 16.8rem;
  height: 4.6rem;
  border-radius: 0.5rem;
  padding-left: 1.9rem;
  margin-left: 2rem;
  img {
    width: 3rem;
    margin-right: 1rem;
  }
  &:hover {
    color: DodgerBlue;
    cursor: pointer;
  }
`;

const WalletAddressText = styled.div`
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.4rem;
  font-weight: 400;
`;

const WalletConnect = styled.div`
  position: relative;
  width: 12.9rem;
  height: 4.6rem;
  background-color: ${(props) => props.theme.colors.skyBlue};
  color: ${(props) => props.theme.colors.blue1};
  text-align: center;
  font-family: "Pretendard";
  border-radius: 0.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 4.6rem;
  margin-left: 2rem;
  padding: 0 2.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    margin-right: 1rem;
  }
  cursor: pointer;
`;

const Tooltip = styled.div`
  position: absolute;
  width: 26rem;
  height: 5.3rem;
  top: calc(100% + 1.2rem);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: #fff;
  border: none;
  filter: drop-shadow(0 0.4rem 0.4rem rgba(0, 0, 0, 0.25));

  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 5.3rem;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: rotate(180deg);
    margin-left: -0.5rem;
    border-width: 0.5rem;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

const StakingButton = styled.div`
  width: 10.1rem;
  height: 4.6rem;
  background-color: ${(props) => props.theme.colors.skyBlue};
  color: ${(props) => props.theme.colors.blue1};
  font-family: "Pretendard";
  border-radius: 0.6rem;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 4.6rem;
  margin-left: 3rem;
  cursor: pointer;
`;

export default ConnectedRightTop;
