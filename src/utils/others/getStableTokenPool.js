import Web3 from "web3";
import contractAddress from "../../addresses/contractAddress.json";
import stableTokenPool from "../../artifacts/contracts/StableCoinPool.sol/StableCoinPool.json";

const web3 = new Web3(window.ethereum);

async function StableTokenPoolMethodObject() {
  const stableTokenPoolContract = new web3.eth.Contract(
    stableTokenPool.abi,
    contractAddress.evmosStableCoinPool
  );
  const obj = await stableTokenPoolContract.methods.withdraw(1000).call();
  return obj;
}

export default StableTokenPoolMethodObject;
