const { default: getContract } = require("utils/web3/getContract");

const ILPTokenTx = function (network) {

    const iLPTokenContract = getContract(network).iLPTokenContract;

    this.getOwner = async () => {
        const owner = await iLPTokenContract.methods.owner().call();
        return owner;
    }

    this.getBalance = async (address) => {
        const balance = await iLPTokenContract.methods.balanceOf(address).call();
        return balance;
    };
};

export default ILPTokenTx;

