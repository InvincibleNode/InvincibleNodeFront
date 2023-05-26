const GetCurrentAddress = async (web3) => {
  const address = await web3.eth.getAccounts();
  console.log(address);
  return address[0];
};

export default GetCurrentAddress;
