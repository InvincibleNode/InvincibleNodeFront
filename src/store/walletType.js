import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ATOM_WALLET_TYPE } from "utils/constants/atom.constant";
import { WALLET_TYPE_DEFAULT } from "utils/constants/walletType.constant";
const { persistAtom } = recoilPersist();

export const walletTypeAtom = atom({
  key: ATOM_WALLET_TYPE,
  default: WALLET_TYPE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});
