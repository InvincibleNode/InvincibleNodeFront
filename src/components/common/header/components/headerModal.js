import SelectWalletPopup from "components/modals/selectWalletPopup";
import SelectNetworkPopup from "components/modals/selectNetworkPopup";
import WalletInfoPopup from "components/modals/walletInfoPopup";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { clickLaunchAppAtom } from "store/clickLaunchApp";

const HeaderModals = ({ showWalletInfoState, showSelectWalletState, showSelectNetworkState }) => {
  const [showWalletInfo, setShowWalletInfo] = showWalletInfoState;
  const [showSelectWallet, setShowSelectWallet] = showSelectWalletState;
  const [showSelectNetwork, setShowSelectNetwork] = showSelectNetworkState;
  const [clickLaunchApp, setClickLaunchApp] = useRecoilState(clickLaunchAppAtom);

  useEffect(() => {
    console.log("showWalletInfo: ", showWalletInfo);
    console.log("showSelectWallet: ", showSelectWallet);
    console.log("showSelectNetwork: ", showSelectNetwork);
  }, []);

  console.log("state: ", showSelectNetworkState, showSelectWalletState, showWalletInfoState);
  return (
    <>
      {showWalletInfo ? (
        <WalletInfoPopup
          closeModal={() => {
            setShowWalletInfo(false);
          }}
        />
      ) : null}
      {showSelectWallet ? (
        <SelectWalletPopup
          closeModal={() => {
            setShowSelectWallet(false);
          }}
          setShowSelectNetwork={setShowSelectNetwork}
        />
      ) : null}

      {showSelectNetwork ? (
        <SelectNetworkPopup
          closeModal={() => {
            setClickLaunchApp({ ...clickLaunchApp, clicked: false });
            setShowSelectNetwork(false);
          }}
        />
      ) : null}
    </>
  );
};

export default HeaderModals;
