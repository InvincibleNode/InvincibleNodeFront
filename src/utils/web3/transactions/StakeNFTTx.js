import getContract from "../getContract";
import units from "../../../units/units.json";
import InviCoreTx from "./InviCoreTx";
import { BigNumber } from "ethers";

const StakeNFTTx = function (network) {
  const inviCoreTx = new InviCoreTx(network);
  this.stakeNFTContract = getContract(network).stakeNFTContract;

  //====== getter functions ======//
  this.getOwner = async () => {
    const owner = await this.stakeNFTContract.methods.owner().call();
    return owner;
  };

  this.getStakeInfo = async (nftId) => {
    const txResult = await this.stakeNFTContract.methods
      .getStakeInfo(nftId)
      .call();
    return txResult;
  };

  this.getRewardAmount = async (nftId) => {
    const txResult = await this.stakeNFTContract.methods
      .getRewardAmount(nftId)
      .call();
    return txResult;
  };

  this.getEvaluation = async (nftId) => {
    const stakeInfo = await this.getStakeInfo(nftId);
    const expectedReward = await inviCoreTx.getExpectedReward(
      stakeInfo.stakedAmount,
      stakeInfo.lockPeriod
    );
    const evaluationValue = BigNumber.from(expectedReward).add(
      BigNumber.from(stakeInfo.principal)
    );
    return evaluationValue.toString();
  };

  this.getNFTOwnership = async (address) => {
    const txResult = await this.stakeNFTContract.methods
      .getNFTOwnership(address)
      .call();
    return txResult;
  };
};

export default StakeNFTTx;
