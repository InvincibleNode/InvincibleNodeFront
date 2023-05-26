import addresses from "../../addresses/contractAddress.json";
import netIds from "../../network/networkId.json";

const AddToken = async (networkId) => {
  console.log(networkId);
  let tokenAddress, tokenSymbol, tokenDecimals;
  if (networkId === netIds.evmos) {
    tokenAddress = addresses.evmosRewardToken;
    tokenSymbol = "inEVMOS";
    tokenDecimals = 18;
  } else if (networkId === netIds.kava) {
    tokenAddress = addresses.kavaRewardToken;
    tokenSymbol = "inKAVA";
    tokenDecimals = 18;
  } else if (networkId === netIds.polygon) {
    tokenAddress = addresses.polygonRewardToken;
    tokenSymbol = "inMATIC";
    tokenDecimals = 18;
  } else if (networkId === netIds.bnb) {
    tokenAddress = addresses.bnbRewardToken;
    tokenSymbol = "inBNB";
    tokenDecimals = 18;
  } else if (networkId === netIds.klaytn) {
    tokenAddress = addresses.klaytnRewardToken;
    tokenSymbol = "inKLAYTN";
    tokenDecimals = 18;
  }
  const tokenImage = "http://placekitten.com/200/300";
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};

export default AddToken;
