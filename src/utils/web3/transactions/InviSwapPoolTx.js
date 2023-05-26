import getContract from "../getContract";
import units from "../../../units/units.json";
import { accountAtom } from "store/account";
import { useRecoilValue } from "recoil";
import Web3 from "web3";

const InviSwapPoolTx = function (network) {
  const inviTokenContract = getContract(network).inviTokenContract;
  const inviSwapPoolContract = getContract(network).inviSwapPoolContract;
  const account = useRecoilValue(accountAtom);

  this.getOwner = async () => {
    const owner = await inviSwapPoolContract.methods.owner().call();
    return owner;
  };

  this.inviPrice = async () => {
    const inviPrice = await inviSwapPoolContract.methods.inviPrice().call();
    return inviPrice;
  };

  this.nativePrice = async () => {
    const nativePrice = await inviSwapPoolContract.methods.nativePrice().call();
    return nativePrice;
  };

  this.getInviToNativeOutAmount = async (amountIn) => {
    const amount = await inviSwapPoolContract.methods.getInviToNativeOutAmount(amountIn).call();
    return amount;
  };

  this.getNativeToInviOutAmount = async (amountIn) => {
    const amount = await inviSwapPoolContract.methods.getNativeToInviOutAmount(amountIn).call();
    return amount;
  };

  this.swapInviToNative = async (amountIn, amountOutMin) => {
    const approve = await inviTokenContract.methods.approve(inviSwapPoolContract._address, amountIn).send({ from: account.address });
    console.log(approve);
    const amount = await inviSwapPoolContract.methods.swapInviToNative(amountIn, amountOutMin).send({ from: account.address });
    console.log(amount);
    return amount;
  };

  this.swapNativeToInvi = async (amountIn, amountOutMin) => {
    const amount = await inviSwapPoolContract.methods.swapNativeToInvi(amountOutMin).send({ from: account.address, value: amountIn });
    console.log(amount);
    return amount;
  };

  this.addLiquidity = async (amountInNative, expectedAmountInInvi, slippage) => {
    const approve = await inviTokenContract.methods.approve(inviSwapPoolContract._address, expectedAmountInInvi).send({ from: account.address });
    console.log(approve, inviSwapPoolContract._address, amountInNative, expectedAmountInInvi);
    const amount = await inviSwapPoolContract.methods.addLiquidity(expectedAmountInInvi, slippage).send({ from: account.address, value: amountInNative });
    console.log(amount);
    return amount;
  };

  this.getAddLiquidityInvi = async (amountInNative) => {
    const amount = await inviSwapPoolContract.methods.getAddLiquidityInvi(amountInNative).call();
    return amount;
  };

  this.getAddLiquidityNative = async (amountInInvi) => {
    const amount = await inviSwapPoolContract.methods.getAddLiquidityNative(amountInInvi).call();
    return amount;
  };

  this.removeLiquidity = async (liquidityTokenAmount, expectedNativeAmount, expectedInviAmount, slippage) => {
    const amount = await inviSwapPoolContract.methods
      .removeLiquidity(liquidityTokenAmount, expectedNativeAmount, expectedInviAmount, slippage)
      .send({ from: account.address });
    return amount;
  };

  this.getNativeLiquidity = async () => {
    const amount = await inviSwapPoolContract.methods.totalLiquidityNative().call();
    return amount;
  };

  this.getInviLiquidity = async () => {
    const amount = await inviSwapPoolContract.methods.totalLiquidityInvi().call();
    return amount;
  };
};

export default InviSwapPoolTx;
