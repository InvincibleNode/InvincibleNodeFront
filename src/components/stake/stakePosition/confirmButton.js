import styled from "styled-components";
import Web3 from "web3";
import units from "../../../units/units.json";
import { useRecoilValue } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { stakeInfoAtom } from "store/stakeInfo";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import InviCoreTx from "utils/web3/transactions/InviCoreTx";
import getContract from "utils/web3/getContract";
import pendingToast from "components/common/toast/pendingToast";
const web3 = new Web3(window.ethereum);

export const ConfirmButton = ({ getShowTooltip }) => {
  const walletType = useRecoilValue(walletTypeAtom);
  const stakeInfo = useRecoilValue(stakeInfoAtom);
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const inviCoreTx = new InviCoreTx(network);
  const { inviCoreContract } = getContract(network);

  const leverageStake = async () => {
    console.log("leverageStake");
    // get stake amount
    const principalAmount = await web3.utils.toBN(stakeInfo.principal * 10 ** 18);
    console.log("Stake Amount: ", principalAmount.toString());

    // get stake info by inviCore contract
    const _stakeInfo = await inviCoreTx.getStakeInfo(account.address, principalAmount, stakeInfo.leverageRatio, stakeInfo.lockPeriod * 86400);
    console.log("stakeInfo: ", _stakeInfo);

    // stake by inviCore contract
    const slippage = 3 * units.slippageUnit;
    const toastMsg = {
      success: {
        stake: {
          title: "Successfully leveraged staked",
          message: "Transaction is successfully included in a block.\n Check your NFT including staking status.",
        },
      },
      pending: {
        title: "Pending...",
        message: "Waiting for the transaction to be broadcasted and included in a block",
      },
      error: {
        title: "Transaction Failed",
        message: "Transaction is failed to be included in a block.\n Please try again.",
      },
    };
    pendingToast(inviCoreTx.stake(account, _stakeInfo, slippage), toastMsg, "stake");
  };

  return (
    <Button
      walletType={walletType}
      onClick={() => {
        walletType === 0 ? getShowTooltip() : leverageStake();
      }}
    >
      Confirm
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  height: calc(8.3rem * 0.8);
  border: none;
  font-family: "Pretendard";
  border-radius: 0 0 1rem 1rem;
  background: ${(props) => (props.walletType === 0 ? props.theme.colors.lightPurple2 : "linear-gradient(170.37deg, #1F53FF 2.52%, #9C1FFF 89.95%)")};
  font-weight: 700;
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.white};
`;
