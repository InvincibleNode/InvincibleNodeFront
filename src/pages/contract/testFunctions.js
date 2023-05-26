export const testFunctions = {
  inviCoreContract: [
    "owner",
    "stKlay",
    "stakeManager",
    "stakeNFTContract",
    "lpPoolContract",
    "inviTokenStakeContract",
  ],

  lpPoolContract: [
    "owner",
    "iLP",
    "inviToken",
    "stakeManager",
    "inviCoreContract",
    "ILPHolders",
    "totalStakedAmount",
    "totalLentAmount",
  ],

  inviTokenStakeContract: [
    "owner",
    "inviToken",
    "inviCoreAddress",
    "stakeManger",
    "totalStakedAmount",
  ],

  iLPTokenContract: ["owner"],

  inviTokenContract: [
    "owner",
    "lendingPoolAddress",
    "lastMinted",
    "regularMintAmount",
  ],

  stakeNFTContract: [
    "owner",
    "inviCoreAddress",
    "lendingPoolAddress",
    "totalStakedAmount",
  ],

  iSPTTokenContract: ["owner", "inviSwapPool", "totalSupply"],

  lendingPoolContract: [
    "owner",
    "inviToken",
    "stakeNFTContract",
    "totalLentAmount",
    "priceManager",
    "maxLendRatio",
  ],

  inviSwapPoolContract: [
    "owner",
    "priceManager",
    "isptToken",
    "inviPrice",
    "klayPrice",
    "totalLiquidityKlay",
    "totalLiquidityInvi",
    "totalFeesKlay",
    "totalFeesInvi",
    "inviToken",
  ],

  priceManagerContract: ["owner", "inviPrice", "nativePrice"],
};
