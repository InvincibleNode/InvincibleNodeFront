import React from "react";
import styled from "styled-components";

import Evmos from "assets/icons/networkLogo/evmosLogo.svg";
import Kava from "assets/icons/networkLogo/kavaLogo.svg";
import Klaytn from "assets/icons/networkLogo/klaytnLogo.svg";
import Bnb from "assets/icons/networkLogo/bnbLogo.svg";
import Polygon from "assets/icons/networkLogo/polygonLogo.svg";
import Bifrost from "assets/icons/networkLogo/bifrostLogo.svg";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { NETWORK_BIFROST, NETWORK_BSC, NETWORK_EVMOS, NETWORK_KAVA, NETWORK_KLAYTN, NETWORK_POLYGON } from "utils/constants/network.constant";

const NetworkIcon = styled.img`
  height: ${(props) => (props.medium ? "2rem" : "2rem")};
`;

function GetNetworkLogo() {
  const network = useRecoilValue(networkAtom);

  return (
    <>
      {network.id === NETWORK_EVMOS.id ? <NetworkIcon src={Evmos} /> : ""}
      {network.id === NETWORK_POLYGON.id ? <NetworkIcon src={Polygon} /> : ""}
      {network.id === NETWORK_KAVA.id ? <NetworkIcon src={Kava} /> : ""}
      {network.id === NETWORK_KLAYTN.id ? <NetworkIcon src={Klaytn} /> : ""}
      {network.id === NETWORK_BSC.id ? <NetworkIcon src={Bnb} /> : ""}
      {network.id === NETWORK_BIFROST.id ? <NetworkIcon src={Bifrost} /> : ""}
    </>
  );
}

export default GetNetworkLogo;
