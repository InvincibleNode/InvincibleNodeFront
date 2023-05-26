/**
 * Import
 * -----------------------------------------------------------------------------
 */
import styled from "styled-components";
import Modal from "./modalBackground";

/**
 * Styled-Component
 * -----------------------------------------------------------------------------
 */
import { BoldText } from "styles/styledComponents/boldText";
import { Button } from "styles/styledComponents/button";
/**
 * Images
 * -----------------------------------------------------------------------------
 */
import BnbLogo from "assets/icons/networkLogo/bnbLogo.svg";
import KlaytnLogo from "assets/icons/networkLogo/klaytnLogo.svg";
import PolygonLogo from "assets/icons/networkLogo/polygonLogo.svg";
import EvmosLogo from "assets/icons/networkLogo/evmosLogo.svg";
import BifrostLogo from "assets/icons/networkLogo/bifrostLogo.svg";

/**
 * Json
 * -----------------------------------------------------------------------------
 */
import {
  NETWORK_KLAYTN,
  NETWORK_BSC,
  NETWORK_DEFAULT,
  NETWORK_POLYGON,
  NETWORK_EVMOS,
  NETWORK_BIFROST,
} from "utils/constants/network.constant";
import { LightText } from "styles/styledComponents/lightText";
import { useRecoilState, useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { useEffect, useState } from "react";
import { accountAtom } from "store/account";
import { clickLaunchAppAtom } from "store/clickLaunchApp";
const Web3 = require("web3");
const SelectNetworkPopup = ({ closeModal }) => {
  const account = useRecoilValue(accountAtom);
  const [network, setNetwork] = useRecoilState(networkAtom);
  const [selectedNetwork, setSelectedNetwork] = useState(network);
  const [clickLaunchApp, setClickLaunchApp] =
    useRecoilState(clickLaunchAppAtom);

  useEffect(() => {
    console.log("selectedNetwork : ", selectedNetwork);
  }, [selectedNetwork]);

  const connectNetwork = () => {
    const ethereum = window.ethereum;
    const chainId = "0x" + selectedNetwork.id.toString(16);
    console.log("chainId : ", chainId);
    ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      })
      .then(() => {
        setNetwork(selectedNetwork);
        console.log(`Switched to ${selectedNetwork.name} network`);
        setClickLaunchApp({ ...clickLaunchApp, connectedNetwork: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal closeModal={closeModal}>
      <SelectNetworkWrapper>
        {account.address === undefined && (
          <StepContainer>
            <Step>
              <p style={{ fontSize: "1rem", fontWeight: "700" }}>Step 2</p>
            </Step>
          </StepContainer>
        )}

        <div>
          <Title>Network</Title>
          {account.address !== undefined ? (
            <Text style={{ marginTop: "0.4rem" }}>Connect your network</Text>
          ) : (
            <Text style={{ marginTop: "0.4rem" }}>
              Next, connect your network
            </Text>
          )}
        </div>

        <SelectNetworkBox
          clicked={selectedNetwork.id === NETWORK_EVMOS.id}
          onClick={() => {
            setSelectedNetwork(NETWORK_EVMOS);
          }}
        >
          <NetworkLogo src={EvmosLogo} />
          <NetworkName>Evmos</NetworkName>
        </SelectNetworkBox>

        <SelectNetworkBox
          clicked={selectedNetwork.id === NETWORK_KLAYTN.id}
          onClick={() => {
            setSelectedNetwork(NETWORK_KLAYTN);
          }}
        >
          <NetworkLogo src={KlaytnLogo} />
          <NetworkName>Klaytn</NetworkName>
        </SelectNetworkBox>

        <SelectNetworkBox
          clicked={selectedNetwork.id === NETWORK_BIFROST.id}
          onClick={() => {
            setSelectedNetwork(NETWORK_BIFROST);
          }}
        >
          <NetworkLogo src={BifrostLogo} />
          <NetworkName>Bifrost</NetworkName>
        </SelectNetworkBox>

        <SelectNetworkBox
          clicked={selectedNetwork.id === NETWORK_BSC.id}
          onClick={() => {
            setSelectedNetwork(NETWORK_BSC);
          }}
        >
          <NetworkLogo src={BnbLogo} />
          <NetworkName>Binance</NetworkName>
        </SelectNetworkBox>

        <SelectNetworkBox
          clicked={selectedNetwork.id === NETWORK_POLYGON.id}
          onClick={() => {
            setSelectedNetwork(NETWORK_POLYGON);
          }}
        >
          <NetworkLogo src={PolygonLogo} />
          <NetworkName>Polygon</NetworkName>
        </SelectNetworkBox>

        <ConnectButton
          clicked={selectedNetwork.id != NETWORK_DEFAULT.id}
          onClick={() => {
            connectNetwork();
            closeModal();
          }}
        >
          Connect
        </ConnectButton>
      </SelectNetworkWrapper>
    </Modal>
  );
};

export default SelectNetworkPopup;

const StepContainer = styled.div`
  display: flex;
  width: 104px;
  height: 20px;
  background: #3e4064;
  border-radius: 10px;
  justify-content: right;
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

const SelectNetworkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 45px;
  align-items: center;
  background: #ecedff;
  border-radius: 10px;
  width: 286px;
  z-index: 5;
  gap: 28px;
`;

const SelectNetworkBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  border: ${(props) => props.clicked && "2px solid"};
  border-color: ${(props) => props.clicked && props.theme.colors.blue1};
  width: 286px;
  height: 60px;
  cursor: pointer;
`;

const NetworkLogo = styled.img`
  margin-left: 40px;
  width: 40px;
`;

const NetworkName = styled(LightText)`
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
