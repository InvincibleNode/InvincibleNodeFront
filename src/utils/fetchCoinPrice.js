import React, { useState, useEffect } from "react";
import axios from "axios";

const CRYPTOCOMPARE_API_KEY = process.env.REACT_APP_CRYPTOCOMPARE_API_KEY;
const COINMARKETCAP_API_KEY = process.env.REACT_APP_COINMARKETCAP_API_KEY;

const CHANGE_coin_SYMBOL = "USDC";

let coinPrice;
async function getCoinPrice(coinName) {
  // if (coinName == "MATIC" || coinName == "BIT" || coinName == "BNB") {
  //   coinPrice = await getcoinPriceByChainLink(coinName);
  //   console.log("coin: ", coinName, coinPrice);
  // }
  if (!coinPrice) {
    coinPrice = await getcoinPriceByCryptoCompare(coinName);
    return coinPrice;
  }

  return coinPrice;
  //getcoinPriceByCoinMarketCap(coinName);
}

async function getcoinPriceByCryptoCompare(coinName) {
  const CRYPTOCOMPARE_URL = `https://min-api.cryptocompare.com/data/price?fsym=${coinName}&tsyms=${CHANGE_coin_SYMBOL}`;
  // console.log("URL : ", CRYPTOCOMPARE_URL);
  const response = await axios.get(CRYPTOCOMPARE_URL);
  const result = response.data.USDC;
  // console.log("crypto : ", result);
  return result;
}

// async function getcoinPriceByChainLink(coinName) {
//   let coinPrice;
//   const Web3 = require("web3"); // for nodejs only
//   const web3 = new Web3(process.env.REACT_APP_QUICKNODE_MAINNET_API);
//   if (coinName == "MATIC") {
//     const aggregatorV3InterfaceABI = maticPriceChainlinkAbi;
//     const addr = "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676";
//     const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
//     await priceFeed.methods
//       .latestRoundData()
//       .call()
//       .then((roundData) => {
//         // Do something with roundData
//         console.log("Latest Round Data", roundData.answer / 10 ** 8);
//         coinPrice = (roundData.answer / 10 ** 8).toFixed(3);
//       });
//   } else if (coinName == "BNB") {
//     const aggregatorV3InterfaceABI = bnbPriceChainlinkAbi;
//     const addr = "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A";
//     const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
//     priceFeed.methods
//       .latestRoundData()
//       .call()
//       .then((roundData) => {
//         // Do something with roundData
//         console.log("Latest Round Data", roundData.answer / 10 ** 8);
//         coinPrice = (roundData.answer / 10 ** 8).toFixed(3);
//       });
//   } else if (coinName == "BIT") {
//     const aggregatorV3InterfaceABI = bitPriceChainlinkAbi;
//     const addr = "0x7b33EbfA52F215a30FaD5a71b3FeE57a4831f1F0";
//     const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
//     priceFeed.methods
//       .latestRoundData()
//       .call()
//       .then((roundData) => {
//         // Do something with roundData
//         console.log("Latest Round Data", roundData.answer / 10 ** 8);
//         coinPrice = (roundData.answer / 10 ** 8).toFixed(3);
//       });
//   }
//   return coinPrice;
// }

export default getCoinPrice;
