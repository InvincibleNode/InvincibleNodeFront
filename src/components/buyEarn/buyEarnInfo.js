import styled from "styled-components";
import { InfoRows } from "./infoRows";
import { TokenInfo } from "./tokenInfo";
import { SupplyInfo } from "./supplyInfo";

/**
 *
 * @path index.js -> buyEarn.js -> buyEarnInfo.js
 */
export const BuyEarnInfo = ({ option }) => {
  return (
    <Wrapper>
      <TokenInfo option={option}></TokenInfo>
      <InfoRows option={option}></InfoRows>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
