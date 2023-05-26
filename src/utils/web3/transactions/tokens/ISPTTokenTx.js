const { default: getContract } = require("utils/web3/getContract");

const ISPTTokenTx = function (network) {
  const iSPTTokenContract = getContract(network).iSPTTokenContract;

  this.getOwner = async () => {
    const owner = await iSPTTokenContract.methods.owner().call();
    return owner;
  };

  this.getBalance = async (address) => {
    const balance = await iSPTTokenContract.methods.balanceOf(address).call();
    return balance;
  };

  this.inviSwapPool = async () => {
    const address = await iSPTTokenContract.methods.inviSwapPool().call();
    return address;
  };
};

export default ISPTTokenTx;
