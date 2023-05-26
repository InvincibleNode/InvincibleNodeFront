import styled from "styled-components";
import { BoldText } from "styles/styledComponents/boldText";
import { Button } from "styles/styledComponents/button";
import { LightText } from "styles/styledComponents/lightText";
import MetamaskLogo from "assets/icons/metamask_logo.svg";
import MartianLogo from "assets/icons/martianLogo.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { walletTypeAtom } from "store/walletType";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { accountAtom } from "store/account";
import { fixAddress } from "utils/fixAddress";
import { networkAtom } from "store/network";
import { routeMain } from "components/common/routePath";
import Modal from "./modalBackground";
import { clickLaunchAppAtom } from "store/clickLaunchApp";

const WalletInfoPopup = ({ closeModal }) => {
  const account = useRecoilValue(accountAtom);
  const [walletType, setWalletType] = useRecoilState(walletTypeAtom);
  const navigate = useNavigate();
  const resetAccount = useResetRecoilState(accountAtom);
  const resetNetwork = useResetRecoilState(networkAtom);
  const resetWalletType = useResetRecoilState(walletTypeAtom);
  const resetClickLaunchApp = useResetRecoilState(clickLaunchAppAtom);

  const notify = () => {
    toast.success("Copied to ClipBoard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("notify");
  };

  return (
    <Modal closeModal={closeModal} isCanClose={true}>
      <WalletInfoWrapper>
        <FirstText>Wallet</FirstText>
        <ListContainer>
          <Logo src={walletType === 1 ? MetamaskLogo : MartianLogo}></Logo>
          <WalletContainer>
            <WalletText>{fixAddress(account.address, 30)}</WalletText>
            <WalletFunctionWrapper>
              <CopyText
                onClick={() => {
                  navigator.clipboard.writeText(account);
                  console.log("Copied");
                  notify();
                }}
              >
                Copy
              </CopyText>
              <ViewOnExplorerText>View on Explorer</ViewOnExplorerText>
            </WalletFunctionWrapper>
          </WalletContainer>
        </ListContainer>
        <DisconnectButton
          onClick={async () => {
            await resetAccount();
            await resetNetwork();
            await resetWalletType();
            await resetClickLaunchApp();
            closeModal();
          }}
        >
          Disconnect
        </DisconnectButton>
      </WalletInfoWrapper>
    </Modal>
  );
};

const WalletInfoWrapper = styled.div`
  background-color: white;
  width: 386px;
  height: 171px;
  z-index: 3;
  border-radius: 10px;
  padding: 28px 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const FirstText = styled(BoldText)`
  text-align: center;
  color: ${(props) => props.theme.colors.blue1};
`;
const ListContainer = styled.div`
  display: flex;
`;
const Logo = styled.img``;
const WalletContainer = styled.div`
  margin-left: 1vw;
`;
const WalletText = styled(LightText)`
  font-size: 1.5vh;
  margin-bottom: 0.5vh;
  color: black;
`;
const WalletFunctionWrapper = styled.div`
  display: flex;
`;
const CopyText = styled(LightText)`
  margin-right: 1vw;
  font-size: 1.3vh;
  color: black;
`;
const ViewOnExplorerText = styled(LightText)`
  font-size: 1.3vh;
  color: black;
`;
const DisconnectButton = styled(Button)`
  width: 100%;
  height: 36px;
  background-color: ${(props) => props.theme.colors.blue1};
  color: white;
  font-size: 16px;
`;

export default WalletInfoPopup;
