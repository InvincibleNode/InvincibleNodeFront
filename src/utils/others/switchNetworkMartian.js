const getProvider = () => {
  if ("martian" in window) {
    return window.martian;
  }
  console.log("install martian first");
  window.open("https://www.martianwallet.xyz/", "_blank");
};

const SwitchNetworkMartian = async () => {
  const isMartianWalletInstalled = window.martian;
  console.log("is martian installed: ", isMartianWalletInstalled);
  // connect to martian wallet
  const networks = await window.martian.getNetworks();
  console.log(networks);
  const chainId = await window.martian.getChainId();
  console.log(chainId);
  const nodeUrl = "https://fullnode.devnet.aptoslabs.com/v1";
  // Create a transaction (token transfer)
  const response = await window.martian.connect(nodeUrl);
  const sender = response.address;
  const payload = {
    function: "0x1::coin::transfer",
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: [
      "0x86049da4777660ede4a30c3245dbd3e250a19166dbb9926d74690deeeee63058",
      50,
    ],
  };
  const transaction = await window.martian.generateTransaction(sender, payload);
  const signedTxn = await window.martian.signTransaction(transaction);
  const txnHash = await window.martian
    .submitTransaction(signedTxn)
    .then((res) => {
      console.log(res);
    });
};

export default SwitchNetworkMartian;
