const Web3 = require("web3");

export const convertToActualAmount = (amount, decimals) => {
  const web3 = new Web3(window.ethereum);
  const isInteger = /^-?\d+$/.test(amount);

  // if amount is int type
  if (isInteger) {
    return web3.utils.toBN(amount).mul(web3.utils.toBN(10).pow(web3.utils.toBN(18)));
  }
  // if amount is float type
  else {
    const amountArray = amount.split(".");
    const integerPart = amountArray[0];
    const decimalPart = amountArray[1];
    const decimalPartLength = decimalPart.length;
    const decimalPartBN = web3.utils.toBN(decimalPart);
    const decimalPartBNWithDecimals = decimalPartBN.mul(web3.utils.toBN(10).pow(web3.utils.toBN(decimals - decimalPartLength)));
    const integerPartBN = web3.utils.toBN(integerPart);
    const integerPartBNWithDecimals = integerPartBN.mul(web3.utils.toBN(10).pow(web3.utils.toBN(decimals)));
    const result = integerPartBNWithDecimals.add(decimalPartBNWithDecimals);
    return result;
  }
};
