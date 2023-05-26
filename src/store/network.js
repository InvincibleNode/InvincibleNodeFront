import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ATOM_NETWORK } from "utils/constants/atom.constant";
import { NETWORK_DEFAULT } from "utils/constants/network.constant";
const { persistAtom } = recoilPersist();

export const networkAtom = atom({
  key: ATOM_NETWORK,
  default: NETWORK_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});
