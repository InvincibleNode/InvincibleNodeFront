import Web3 from "web3";

const web3 = new Web3(window.ethereum);
//return balance
const getBalance = async (account) => {
  const balance = await web3.eth.getBalance(account);
  return balance;
};

export default getBalance;
