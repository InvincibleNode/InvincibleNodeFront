import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import { walletTypeAtom } from "store/walletType";
import getAccountAddress from "utils/web3/getAccountAddress";
import getBalance from "utils/web3/getBalance";
import styled from "styled-components";
import { NETWORK_DEFAULT } from "utils/constants/network.constant";
import { WALLET_TYPE_DEFAULT } from "utils/constants/walletType.constant";
import HeaderModals from "./components/headerModal";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import { clickLaunchAppAtom } from "store/clickLaunchApp";

function Header({ showTooltip, launchApp }) {
  const navigate = useNavigate();
  const location = useLocation();

  const network = useRecoilValue(networkAtom);
  const walletType = useRecoilValue(walletTypeAtom);
  const [clickLaunchApp, setClickLaunchApp] = useRecoilState(clickLaunchAppAtom);
  const [account, setAccount] = useRecoilState(accountAtom);
  const [pathName, setPathName] = useState(location.pathname);
  const [pathList, setPathList] = useState([]);
  const [showSelectWallet, setShowSelectWallet] = useState(false);
  const [showSelectNetwork, setShowSelectNetwork] = useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);

  const fetchAccount = async () => {
    if (network !== NETWORK_DEFAULT && walletType !== WALLET_TYPE_DEFAULT) {
      const _address = await getAccountAddress(walletType);
      const _balance = await getBalance(_address);
      console.log("set account: ", _address, _balance);
      setAccount({ ...account, address: _address, balance: _balance });
    }
  };

  useEffect(() => {
    if (!clickLaunchApp.connectedWallet) {
      setShowSelectWallet(true);
    } else if (!clickLaunchApp.connectedNetwork) {
      setShowSelectNetwork(true);
    }
    console.log("launch app: ", clickLaunchApp);
  }, []);

  // fetch account
  useEffect(() => {
    fetchAccount();
  }, [walletType, network]);

  // set path name
  useEffect(() => {
    setPathName(location.pathname);
    setPathList((prev) => [...prev, location.pathname]);
    console.log("path list: ", pathList);
  }, [location]);

  return (
    <>
      <Container launchApp={launchApp}>
        <HeaderModals
          showWalletInfoState={[showWalletInfo, setShowWalletInfo]}
          showSelectWalletState={[showSelectWallet, setShowSelectWallet]}
          showSelectNetworkState={[showSelectNetwork, setShowSelectNetwork]}
        />
        <LeftSection pathName={pathName} navigate={navigate} />
        <RightSection
          pathName={pathName}
          showTooltip={showTooltip}
          navigate={navigate}
          setShowWalletInfo={setShowWalletInfo}
          setShowSelectWallet={setShowSelectWallet}
          setShowSelectNetwork={setShowSelectNetwork}
        />
      </Container>
    </>
  );
}

export default Header;

const Container = styled.div`
  height: 6.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.launchApp ? "0 3rem" : "0 9.53% 0 3rem")};
`;
