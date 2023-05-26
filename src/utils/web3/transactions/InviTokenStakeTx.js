const { default: getContract } = require("../getContract");

const InviTokenStakeTx = function (network) {
  this.inviTokenStakeContract = getContract(network).inviTokenStakeContract;
  this.inviTokenContract = getContract(network).inviTokenContract;

  this.totalStaked = async () => {
    const txResult = await this.inviTokenStakeContract.methods
      .totalStakedAmount()
      .call();
    return txResult;
  };

  // ....?
  this.getOwner = async () => {
    const owner = await this.inviTokenStakeContract.methods.owner().call();
    return owner;
  };

  //stake
  this.stake = async (amount, address) => {
    const approve = await this.inviTokenContract.methods
      .approve(this.inviTokenStakeContract._address, amount)
      .send({ from: address });
    console.log(approve);
    const txResult = await this.inviTokenStakeContract.methods
      .stake(amount)
      .send({ from: address });
    return txResult;
  };

  //unstake
  this.unstake = async (amount, address) => {
    const txResult = await this.inviTokenStakeContract.methods
      .unStake(amount)
      .send({ from: address });
    return txResult;
  };

  //native token reward
  this.receiveNativeReward = async (address) => {
    const txResult = await this.inviTokenStakeContract.methods
      .receiveNativeReward()
      .send({ from: address });
    return txResult;
  };

  //invi token reward
  this.receiveInviReward = async (address) => {
    const txResult = await this.inviTokenStakeContract.methods
      .receiveInviReward()
      .send({ from: address });
    return txResult;
  };

  //total staked ..?
  this.getStakedAmount = async (address) => {
    const txResult = await this.inviTokenStakeContract.methods
      .stakedAmount(address)
      .call();
    return txResult;
  };

  //어디에 사용...?
  this.getNativeRewardAmount = async (address) => {
    const txResult = await this.inviTokenStakeContract.methods
      .nativeRewardAmount(address)
      .call();
    return txResult;
  };

  this.inviRewardAmount = async (address) => {
    const txResult = await this.inviTokenStakeContract.methods
      .inviRewardAmount(address)
      .call();
    return txResult;
  }

  this.nativeRewardAmount = async (address) => {
    const txResult = await this.inviTokenStakeContract.methods
      .nativeRewardAmount(address)
      .call();
    return txResult;
  }
  
};

export default InviTokenStakeTx;
