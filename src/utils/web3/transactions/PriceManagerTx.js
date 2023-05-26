import getContract from "../getContract";

const PriceManagerTx = function (network) {
  const priceManagerContract = getContract(network).priceManagerContract;

  this.getNativePrice = async () => {
    const nativePrice = await priceManagerContract.methods.getNativePrice().call();
    return nativePrice;
  };

  this.getInviPrice = async () => {
    const inviPrice = await priceManagerContract.methods.getInviPrice().call();
    return inviPrice;
  };
};

export default PriceManagerTx;
