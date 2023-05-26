const { default: getContract } = require("../getContract");

const LpPoolTx = function (network) {
  const lpPoolTx = getContract(network).lpPoolContract;

  this.getOwner = async () => {
    const owner = await lpPoolTx.methods.owner().call();
    return owner;
  };

  this.getStakedAmount = async (address) => {
    const txResult = await lpPoolTx.methods.stakedAmount(address).call();
    return txResult;
  };

  this.getRewardAmount = async (address) => {
    const txResult = await lpPoolTx.methods.getRewardAmount(address).call();
    return txResult;
  };

  this.getTotalLiquidity = async () => {
    const txResult = await lpPoolTx.methods.getTotalLiquidity().call();
    return txResult;
  };

  this.stake = async (account, amount) => {
    const txResult = await lpPoolTx.methods.stake().send({ from: account.address, to: lpPoolTx.address, value: amount });
    return txResult;
  };

  this.unstake = async (account, amount) => {
    const txResult = await lpPoolTx.methods.unstake(amount).send({ from: account.address, to: lpPoolTx.address });
    return txResult;
  }
};

export default LpPoolTx;
