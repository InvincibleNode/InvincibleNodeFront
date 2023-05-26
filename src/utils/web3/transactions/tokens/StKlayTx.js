const { default: getContract } = require("../../getContract");

const StKlayTx = function (network) {
    const stKlayContract = getContract(network).stKlayContract;

    this.getOwner = async () => {
        const owner = await stKlayContract.methods.owner().call();
        return owner;
    }

    this.getBalance = async (address) => {
        const balance = await stKlayContract.methods.balanceOf(address).call();
        return balance;
    }

}

export default StKlayTx;