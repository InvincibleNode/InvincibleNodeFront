import Web3 from "web3";
import polygonStaking from "../../artifacts/contracts/LiquidStakingPolygon.sol/LiquidStakingPolygon.json";

const web3 = new Web3(window.ethereum);
const VerifyValidatorContractPolygon = async (
  polygonValidatorAddress,
  validatorAddress
) => {
  console.log(
    "polygon address: ",
    polygonValidatorAddress,
    validatorAddress,
    polygonStaking
  );

  const polygonStakingContract = new web3.eth.Contract(
    polygonStaking.abi,
    validatorAddress
  );
  // return contract owner
  return await polygonStakingContract.methods.owner().call();
};

export default VerifyValidatorContractPolygon;
