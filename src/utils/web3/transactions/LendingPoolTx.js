import getContract from "../getContract";
import units from "../../../units/units.json";
import { accountAtom } from "store/account";
import { useRecoilValue } from "recoil";

const LendingPoolTx = function (network) {
  const inviTokenContract = getContract(network).inviTokenContract;
  const lendingPoolContract = getContract(network).lendingPoolContract;
  const account = useRecoilValue(accountAtom);

  this.getOwner = async () => {
    const owner = await lendingPoolContract.methods.owner().call();
    return owner;
  };

  this.getTotalLentAmount = async () => {
    const totalLentAmount = await lendingPoolContract.methods
      .totalLentAmount()
      .call();
    return totalLentAmount;
  };

  this.getMaxLendRatio = async () => {
    const maxLendRatio = await lendingPoolContract.methods
      .maxLendRatio()
      .call();
    return maxLendRatio / units.lendRatio;
  };

  this.getLendInfo = async (nftId) => {
    const lendInfo = await lendingPoolContract.methods
      .getLendInfo(nftId)
      .call();
    return lendInfo;
  };

  this.createLendInfo = async (nftId, slippage) => {
    slippage = slippage * units.slippageUnit;
    const txResult = await lendingPoolContract.methods
      .createLendInfo(nftId, slippage)
      .call();
    return txResult;
  };

  this.lend = async (lendInfo) => {
    const txResult = await lendingPoolContract.methods
      .lend(lendInfo)
      .send({ from: account.address });
    return txResult;
  };

  this.repay = async (nftId, repayAmount) => {
    await inviTokenContract.methods
      .approve(lendingPoolContract._address, repayAmount)
      .send({ from: account.address });
    const txResult = await lendingPoolContract.methods
      .repay(nftId)
      .send({ from: account.address, gasLimit: 1000000 });
    return txResult;
  };
};

export default LendingPoolTx;
