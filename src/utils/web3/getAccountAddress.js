import { type } from "@testing-library/user-event/dist/type";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);
const getAccountAddress = async (walletType) => {
  switch (walletType) {
    default:
    case 1:
      const accounts = await web3.eth.getAccounts();
      return accounts[0];

    case 2:
      const response = await window.martian.connect();
      // change network to devnet
      const address = response.address;
      const details = await window.martian.getAccount(address);
      const account = details.authentication_key;
      return account;
  }
};

export default getAccountAddress;
