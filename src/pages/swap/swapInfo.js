import styled from "styled-components";
import { SwapBox } from "components/swap/swapBox";
import { PoolLiquidity } from "components/swap/poolLiquidity";
import { SwapResult } from "components/swap/swapResult";
import { SwapButton } from "components/swap/swapButton";
import Web3 from "web3";
import { useRecoilValue } from "recoil";
import { swapInfoAtom } from "store/swapInfo";
import InviSwapPoolTx from "utils/web3/transactions/InviSwapPoolTx";
import { networkAtom } from "store/network";
import { BigNumber } from "ethers";
import pendingToast from "components/common/toast/pendingToast";

const web3 = new Web3(window.ethereum);
export const SwapInfo = () => {
  const swapInfo = useRecoilValue(swapInfoAtom);
  const network = useRecoilValue(networkAtom);
  const inviSwapPoolTx = new InviSwapPoolTx(network);

  const pendingToastMsg = {
    success: {
      title: "Successfully swapped for each paired token",
      message: "Check your wallet if received request token",
    },
    error: {
      title: "Spotty connection",
      message:
        "While sending, transaction wasn’t broadcasted. Something went wrong. Please try again. ",
    },
    pending: {
      title: "Pending...",
      message:
        "Waiting for the transaction to be broadcaste and included in a block",
    },
  };

  const swap = async () => {
    const amount = web3.utils.toBN(swapInfo.swapAmount); // amount in;
    let amountOutMin;
    console.log("swap amount: ", amount);
    if (swapInfo.inputToken === "INVI") {
      // amount in, amount out min
      amountOutMin = BigNumber.from(
        await inviSwapPoolTx.getInviToNativeOutAmount(amount)
      )
        .mul(97)
        .div(100);
      await inviSwapPoolTx.swapInviToNative(amount, amountOutMin);
    } else {
      // amount in, amount out min
      amountOutMin = BigNumber.from(
        await inviSwapPoolTx.getNativeToInviOutAmount(amount)
      )
        .mul(97)
        .div(100);
      await inviSwapPoolTx.swapNativeToInvi(amount, 0);
    }
  };

  return (
    <Wrapper>
      <SwapBox />
      <PoolLiquidity />
      <SwapResult />
      <SwapButton
        onClick={() => {
          pendingToast(swap(), pendingToastMsg);
        }}
      >
        Swap
      </SwapButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;
