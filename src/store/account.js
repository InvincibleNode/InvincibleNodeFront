import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ATOM_ACCOUNT } from "utils/constants/atom.constant";
const { persistAtom } = recoilPersist();

export const accountAtom = atom({
  key: ATOM_ACCOUNT,
  default: {
    address: undefined,
    balance: 0,
  },
});
