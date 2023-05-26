import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ATOM_STAKE_INFO } from "utils/constants/atom.constant";
const { persistAtom } = recoilPersist();

export const stakeInfoAtom = atom({
  key: ATOM_STAKE_INFO,
  default: {
    principal: 0,
    stakedAmount: 0,
    leverageRatio: 1,
    minLockPeriod: 0,
    lockPeriod: 0,
    reward: 0,
    expectedReward: 0,
    protocolFee: 0,
  },
});
