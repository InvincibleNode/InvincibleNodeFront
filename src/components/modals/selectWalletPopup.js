import ConnectToMetamask from "utils/wallets/connectMetamask";
import styled from "styled-components";
import { Button } from "styles/styledComponents/button";
import metamaskLogo from "assets/icons/metamask_logo.svg";
import tonLogo from "assets/icons/networkLogo/tonLogo.svg";
import klipLogo from "assets/icons/networkLogo/klipLogo.svg";
import { useRecoilState } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { useState } from "react";
import Modal from "./modalBackground";
import { clickLaunchAppAtom } from "store/clickLaunchApp";
import { networkAtom } from "store/network";
import { NETWORK_DEFAULT } from "utils/constants/network.constant";

const SelectWalletPopup = ({ closeModal, setShowSelectNetwork }) => {
  const [selectedWallet, setSelectedWallet] = useState(0);
  const [walletType, setWalletType] = useRecoilState(walletTypeAtom);
  const [network, setNetwork] = useRecoilState(networkAtom);
  const [clickLaunchApp, setClickLaunchApp] =
    useRecoilState(clickLaunchAppAtom);

  //TODO : 다른 지갑도 연결할 수 있도록 수정 -> 현재는 메타마스크로만 연결됨.
  const ConnectWallet = () => {
    setWalletType(1);
    ConnectToMetamask().then((res) => {
      closeModal();
      setClickLaunchApp({ ...clickLaunchApp, connectedWallet: true });
      setNetwork(NETWORK_DEFAULT);
      if (setShowSelectNetwork !== undefined) {
        setShowSelectNetwork(true);
      }
    });
  };

  return (
    <Modal closeModal={closeModal}>
      <SelectWalletWrapper>
        <StepContainer>
          <Step>
            <p style={{ fontSize: "10px", fontWeight: "700" }}>Step 1</p>
          </Step>
        </StepContainer>

        <div>
          <Title>Connect wallet</Title>
          <Text style={{ marginTop: "4px" }}>
            First, please connect your wallet
          </Text>
        </div>

        <SelectWalletContainer
          clicked={selectedWallet == 1}
          onClick={() => setSelectedWallet(1)}
        >
          <WalletImage src={metamaskLogo}></WalletImage>
          <WalletName>MetaMask</WalletName>
        </SelectWalletContainer>

        <SelectWalletContainer
          clicked={selectedWallet == 2}
          onClick={() => setSelectedWallet(2)}
        >
          <WalletImage src={tonLogo}></WalletImage>
          <WalletName>TON</WalletName>
        </SelectWalletContainer>

        <SelectWalletContainer
          clicked={selectedWallet == 3}
          onClick={() => setSelectedWallet(3)}
        >
          <WalletImage src={klipLogo}></WalletImage>
          <WalletName>Klip</WalletName>
        </SelectWalletContainer>

        <ConnectButton
          clicked={selectedWallet != 0}
          onClick={() => {
            ConnectWallet();
          }}
        >
          Connect
        </ConnectButton>
      </SelectWalletWrapper>
    </Modal>
  );
};

const StepContainer = styled.div`
  display: flex;
  width: 104px;
  height: 20px;
  background: #ecedff;
  border-radius: 10px;
  justify-content: left;
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 51px;
  height: 20px;
  background: #1f53ff;
  border-radius: 10px;
  color: white;
`;

const Title = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.blue1};
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 16px;
`;

const Text = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.blue1};
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 14px;
`;

const SelectWalletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 45px;
  align-items: center;
  background: white;
  border-radius: 10px;
  width: 286px;
  z-index: 5;
  gap: 28px;
`;

const SelectWalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: ${(props) => props.clicked && "2px solid"};
  border-color: ${(props) => props.clicked && props.theme.colors.blue1};
  width: 286px;
  height: 60px;
  cursor: pointer;
`;

const WalletImage = styled.img`
  margin-left: 40px;
  width: 40px;
`;

const WalletName = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  margin-right: 40px;
`;
const ConnectButton = styled(Button)`
  width: 286px;
  height: 36px;
  color: white;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) =>
    props.clicked ? props.theme.colors.blue1 : props.theme.colors.lightPurple1};
`;

export default SelectWalletPopup;
