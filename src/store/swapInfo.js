import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ATOM_SWAP_INFO } from "utils/constants/atom.constant";
const { persistAtom } = recoilPersist();

export const swapInfoAtom = atom({
  key: ATOM_SWAP_INFO,
  default: {
    // swap related
    inputToken: "",
    swapAmount: 0,
    minAmountOut: 0,
    // pool related
    expectedLiquidityAmountInvi: 0,
    liquidityAmountKlay: 0,
    slippage: 0,
  },
});
