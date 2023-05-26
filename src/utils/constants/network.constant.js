import Evmos from "assets/icons/networkLogo/evmosLogo.svg";
import Kava from "assets/icons/networkLogo/kavaLogo.svg";
import Klaytn from "assets/icons/networkLogo/klaytnLogo.svg";
import Bnb from "assets/icons/networkLogo/bnbLogo.svg";
import Polygon from "assets/icons/networkLogo/polygonLogo.svg";
import Bifrost from "assets/icons/networkLogo/bifrostLogo.svg";

export const NETWORK_DEFAULT = { id: -1, name: "default", token: "default", logo: "logo" };
//export const NETWORK_ETH = { id: 1, name: "eth", token: "eth" };
export const NETWORK_BSC = { id: 97, name: "bsc", token: "BNB", logo: Bnb };
//export const NETWORK_HECO = { id: 128, name: "heco", token: "ht" };
//export const NETWORK_OKEX = { id: 66, name: "okex", token: "okt" };
export const NETWORK_KLAYTN = { id: 1001, name: "klaytn", token: "KLAY", logo: Klaytn };
export const NETWORK_POLYGON = { id: 137, name: "polygon", token: "MATIC", logo: Polygon };
export const NETWORK_KAVA = { id: 2221, name: "kava", token: "KAVA", logo: Kava };
export const NETWORK_EVMOS = { id: 9000, name: "evmos", token: "EVMOS", logo: Evmos };
//export const NETWORK_MANTLE = { id: 5001, name: "mantle", token: "mantle", logo: Evmos };
export const NETWORK_BIFROST = { id: 49088, name: "bifrost", token: "BFC", logo: Bifrost };
