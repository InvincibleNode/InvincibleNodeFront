import Web3 from "web3";
import { WALLET_TYPE_METAMASK } from "./constants/walletType.constant";

const web3 = new Web3(window.ethereum);
const getCurrentCryptoInfo = async (walletType) => {
  if (walletType == WALLET_TYPE_METAMASK) {
    const accountAddress = (await web3.eth.getAccounts())[0];
    return accountAddress;
  } else {
    const response = await window.martian.connect();
    const address = response.address;
    const details = await window.martian.getAccount(address);
    const accountAddress = details.authentication_key;
    return accountAddress;
  }
};

export default getCurrentCryptoInfo;
