const ConnectToMartian = async () => {
  const isMartianWalletInstalled = window.martian;
  console.log("martian installed: ", isMartianWalletInstalled);
  const getProvider = () => {
    if ("martian" in window) {
      return window.martian;
    }
    window.open("https://www.martianwallet.xyz/", "_blank");
  };
  getProvider();
  const response = await window.martian.connect();
  const sender = response.address;
  // change network
  const ConnectDevnet = async () => {
    const nodeUrl = "https://fullnode.devnet.aptoslabs.com/v1";
    const status = await window.martian.changeNetwork(nodeUrl);
    return status;
  };
  const networks = await window.martian.getNetworks();
  console.log(networks);
  // const connect = await ConnectDevnet();
  // console.log("Connect martian: ", connect);
  window.localStorage.setItem("connectMartian", true);
  // window.location.reload();
  return sender;
};

export default ConnectToMartian;
