import getContract from "../../getContract";

const InviTokenTx = function (network) {
  this.inviTokenContract = getContract(network).inviTokenContract;

  this.getOwner = async () => {
    const owner = await this.inviTokenContract.methods.owner().call();
    return owner;
  };

  this.getBalance = async (address) => {
    const balance = await this.inviTokenContract.methods.balanceOf(address).call();
    return balance;
  };

  this.getStakedAmount = async (address) => {
    const txResult = await this.inviTokenContract.methods.stakedAmount(address).call();
    return txResult;
  };
};

export default InviTokenTx;
