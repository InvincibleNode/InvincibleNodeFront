import Web3 from "web3";

const ConnectToMetamask = async () => {
  const web3 = new Web3(window.ethereum);
  if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" });
    const account = web3.eth.accounts;
    //Get the current MetaMask selected/active wallet
    const walletAddress = account.givenProvider.selectedAddress;
    console.log(`Wallet Address: ${walletAddress}`);
    //   console.log(dispatch(setStatus(true)));
    window.localStorage.setItem("connectMetamask", true);
    //window.location.reload();
    return true;
  } else {
    console.log("No wallet");
    return false;
  }
};

export default ConnectToMetamask;
