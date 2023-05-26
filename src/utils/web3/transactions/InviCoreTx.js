import getContract from "../getContract";
import units from "../../../units/units.json";

const InviCoreTx = function (network) {
  this.inviCoreContract = getContract(network).inviCoreContract;

  //====== getter functions ======//
  this.getOwner = async () => {
    const owner = await this.inviCoreContract.methods.owner().call();
    return owner;
  };

  this.getStakeInfo = async (address, amount, leverageRatio, lockPeriod) => {
    const txResult = await this.inviCoreContract.methods.getStakeInfo(address, amount, leverageRatio * units.leverageUnit, lockPeriod).call();
    return txResult;
  };

  this.getExpectedReward = async (amount, lockPeriod) => {
    const txResult = await this.inviCoreContract.methods.getExpectedReward(amount, lockPeriod).call();
    return txResult;
  };

  this.getStakingAPR = async () => {
    const txResult = await this.inviCoreContract.methods.stakingAPR().call();
    return txResult;
  };

  this.getLockPeriod = async (leverageRatio) => {
    const txResult = await this.inviCoreContract.methods.getLockPeriod(leverageRatio * units.leverageUnit).call();
    return txResult;
  };

  //====== service functions =======//
  this.stake = async (account, stakeInfo, slippage) => {
    const txResult = await this.inviCoreContract.methods.stake(stakeInfo, slippage).send({ from: account.address, value: stakeInfo.principal });
    return txResult;
  };

  this.repayNFT = async (account, nftId) => {
    const txResult = await this.inviCoreContract.methods.repayNFT(nftId).send({ from: account.address });
    return txResult;
  };
};

export default InviCoreTx;
