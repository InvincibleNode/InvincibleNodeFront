import Web3 from "web3";
import InviCore from "../../artifacts/common/InviCore.json";
import ILPToken from "../../artifacts/common/ILPToken.json";
import InviToken from "../../artifacts/common/InviToken.json";
import InviTokenStake from "../../artifacts/common/InviTokenStake.json";
import LiquidityProviderPool from "../../artifacts/common/LiquidityProviderPool.json";
import StakeNFT from "../../artifacts/common/StakeNFT.json";
import ISPTToken from "../../artifacts/common/ISPTToken.json";
import LendingPool from "../../artifacts/common/LendingPool.json";
import InviSwapPool from "../../artifacts/common/InviSwapPool.json";
import PriceManager from "../../artifacts/common/PriceManager.json";

import klaytnAddress from "../../addresses/klaytn/contractAddress.json";
import bifrostAddress from "../../addresses/bfc/contractAddress.json";
import evmosAddress from "../../addresses/evmos/contractAddress.json";

import {
  NETWORK_BIFROST,
  NETWORK_DEFAULT,
  NETWORK_EVMOS,
  NETWORK_KLAYTN,
} from "../constants/network.constant";

const web3 = new Web3(window.ethereum);
//const goerliWeb3 = new Web3(process.env.REACT_APP_GOERLI_RPC_URL);
const getContract = (network) => {
  let inviCoreContract,
    lpPoolContract,
    inviTokenStakeContract,
    iLPTokenContract,
    inviTokenContract,
    stakeNFTContract,
    iSPTTokenContract,
    lendingPoolContract,
    inviSwapPoolContract,
    priceManagerContract;

  if (network == null || network.id == NETWORK_DEFAULT.id) {
    //pass
  } else if (network.id == NETWORK_KLAYTN.id) {
    //common
    inviCoreContract = new web3.eth.Contract(
      InviCore.abi,
      klaytnAddress.inviCoreContractAddress
    );
    lpPoolContract = new web3.eth.Contract(
      LiquidityProviderPool.abi,
      klaytnAddress.lpPoolContractAddress
    );
    inviTokenStakeContract = new web3.eth.Contract(
      InviTokenStake.abi,
      klaytnAddress.inviTokenStakeContractAddress
    );
    iLPTokenContract = new web3.eth.Contract(
      ILPToken.abi,
      klaytnAddress.iLPTokenContractAddress
    );
    inviTokenContract = new web3.eth.Contract(
      InviToken.abi,
      klaytnAddress.inviTokenContractAddress
    );
    stakeNFTContract = new web3.eth.Contract(
      StakeNFT.abi,
      klaytnAddress.stakeNFTContractAddress
    );
    iSPTTokenContract = new web3.eth.Contract(
      ISPTToken.abi,
      klaytnAddress.iSPTTokenContractAddress
    );
    lendingPoolContract = new web3.eth.Contract(
      LendingPool.abi,
      klaytnAddress.lendingPoolContractAddress
    );
    inviSwapPoolContract = new web3.eth.Contract(
      InviSwapPool.abi,
      klaytnAddress.inviSwapPoolContractAddress
    );
    priceManagerContract = new web3.eth.Contract(
      PriceManager.abi,
      klaytnAddress.priceManagerContractAddress
    );
  } else if (network.id == NETWORK_BIFROST.id) {
    //bifrost
    inviCoreContract = new web3.eth.Contract(
      InviCore.abi,
      bifrostAddress.inviCoreContractAddress
    );
    lpPoolContract = new web3.eth.Contract(
      LiquidityProviderPool.abi,
      bifrostAddress.lpPoolContractAddress
    );
    inviTokenStakeContract = new web3.eth.Contract(
      InviTokenStake.abi,
      bifrostAddress.inviTokenStakeContractAddress
    );
    iLPTokenContract = new web3.eth.Contract(
      ILPToken.abi,
      bifrostAddress.iLPTokenContractAddress
    );
    inviTokenContract = new web3.eth.Contract(
      InviToken.abi,
      bifrostAddress.inviTokenContractAddress
    );
    stakeNFTContract = new web3.eth.Contract(
      StakeNFT.abi,
      bifrostAddress.stakeNFTContractAddress
    );
    iSPTTokenContract = new web3.eth.Contract(
      ISPTToken.abi,
      bifrostAddress.iSPTTokenContractAddress
    );
    lendingPoolContract = new web3.eth.Contract(
      LendingPool.abi,
      bifrostAddress.lendingPoolContractAddress
    );
    inviSwapPoolContract = new web3.eth.Contract(
      InviSwapPool.abi,
      bifrostAddress.inviSwapPoolContractAddress
    );
    priceManagerContract = new web3.eth.Contract(
      PriceManager.abi,
      bifrostAddress.priceManagerContractAddress
    );
  } else if (network.id == NETWORK_EVMOS.id) {
    //evmos
    inviCoreContract = new web3.eth.Contract(
      InviCore.abi,
      evmosAddress.inviCoreContractAddress
    );
    lpPoolContract = new web3.eth.Contract(
      LiquidityProviderPool.abi,
      evmosAddress.lpPoolContractAddress
    );
    inviTokenStakeContract = new web3.eth.Contract(
      InviTokenStake.abi,
      evmosAddress.inviTokenStakeContractAddress
    );
    iLPTokenContract = new web3.eth.Contract(
      ILPToken.abi,
      evmosAddress.iLPTokenContractAddress
    );
    inviTokenContract = new web3.eth.Contract(
      InviToken.abi,
      evmosAddress.inviTokenContractAddress
    );
    stakeNFTContract = new web3.eth.Contract(
      StakeNFT.abi,
      evmosAddress.stakeNFTContractAddress
    );
    iSPTTokenContract = new web3.eth.Contract(
      ISPTToken.abi,
      evmosAddress.iSPTTokenContractAddress
    );
    lendingPoolContract = new web3.eth.Contract(
      LendingPool.abi,
      evmosAddress.lendingPoolContractAddress
    );
    inviSwapPoolContract = new web3.eth.Contract(
      InviSwapPool.abi,
      evmosAddress.inviSwapPoolContractAddress
    );
    priceManagerContract = new web3.eth.Contract(
      PriceManager.abi,
      evmosAddress.priceManagerContractAddress
    );
  }

  return {
    inviCoreContract,
    lpPoolContract,
    inviTokenStakeContract,
    iLPTokenContract,
    inviTokenContract,
    stakeNFTContract,
    iSPTTokenContract,
    lendingPoolContract,
    inviSwapPoolContract,
    priceManagerContract,
  };
};

export default getContract;
