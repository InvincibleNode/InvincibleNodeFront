const ConnectToPetra = async () => {
  let connect = await window.aptos.connect();
  let currentAccount = await window.aptos.account();
  console.log(currentAccount);
  let network = await window.aptos.network();
  console.log(network);
  return currentAccount;
};

export default ConnectToPetra;
