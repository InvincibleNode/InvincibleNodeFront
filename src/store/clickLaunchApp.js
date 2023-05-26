import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ATOM_CLICK_LAUNCH_APP } from "utils/constants/atom.constant";
const { persistAtom } = recoilPersist();

export const clickLaunchAppAtom = atom({
  key: ATOM_CLICK_LAUNCH_APP,
  default: {
    clicked: false,
    connectedWallet: false,
    connectedNetwork: false,
  },
  effects_UNSTABLE: [persistAtom],
});
