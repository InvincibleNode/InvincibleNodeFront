import styled from "styled-components";
import { useEffect, useState } from "react";
import getBalance from "utils/web3/getBalance";
import Web3 from "web3";
import getContract from "utils/web3/getContract";
import units from "../../units/units.json";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { networkAtom } from "store/network";
import { PeriodBox } from "components/stake/stakePosition/periodBox";
import { RewardBox } from "components/stake/stakePosition/rewardBox";
import { LeverageSizeBox } from "components/stake/stakePosition/leverageSizeBox";
import { StakeAmountBox } from "components/stake/stakePosition/stakeAmountBox";
import { BalanceBox } from "components/stake/stakePosition/balanceBox";
import { ConfirmButton } from "components/stake/stakePosition/confirmButton";
import { accountAtom } from "store/account";
import { stakeInfoAtom } from "store/stakeInfo";
import InviCoreTx from "utils/web3/transactions/InviCoreTx";

const web3 = new Web3(window.ethereum);
function SetStakingPosition({ getShowTooltip }) {
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const inviCoreTx = new InviCoreTx(network);

  console.log(account.address, network);

  const [shownBalance, setShownBalance] = useState(-1);
  const [stakeInfoRecoil, setStakeInfoRecoil] = useRecoilState(stakeInfoAtom);
  const resetStakeInfo = useResetRecoilState(stakeInfoAtom);

  useEffect(() => {
    console.log("account.balance: ", account.balance);
    setShownBalance((account.balance / 10 ** 18).toFixed(3));
  }, [account.balance]);

  const setStakeInfo = async () => {
    if (stakeInfoRecoil.principal <= 0) return; // 입력 값이 없을 때는 실행하지 않음

    const principalAmount = web3.utils.toBN(Math.floor(stakeInfoRecoil.principal * 10 ** 18));
    const leverageAmount = web3.utils.toBN(Math.floor(principalAmount * stakeInfoRecoil.leverageRatio));

    //TODO : 입력 금액이 maxLentAmount보다 클 때, alert Modal 보여주기
    try {
      // get stakeInfo
      const stakeInfo = await inviCoreTx.getStakeInfo(account.address, principalAmount, stakeInfoRecoil.leverageRatio, stakeInfoRecoil.lockPeriod * 86400);

      // get expected reward
      const expectedReward = await inviCoreTx.getExpectedReward(leverageAmount, stakeInfo.lockPeriod);

      setStakeInfoRecoil((prev) => ({
        ...prev,
        // lockPeriod: stakeInfo.lockPeriod / 86400,
        // minLockPeriod: stakeInfo.lockPeriod / 86400,
        expectedReward: expectedReward,
        protocolFee: stakeInfo.protocolFee,
      }));
    } catch (e) {
      resetStakeInfo();
      console.log("error: ", e);
    }
  };

  useEffect(() => {
    if (stakeInfoRecoil.principal) setStakeInfo();
  }, [stakeInfoRecoil.principal, stakeInfoRecoil.leverageRatio, stakeInfoRecoil.lockPeriod]);

  return (
    <StakingPosition>
      {/* <BalanceBox shownBalance={shownBalance} tokenName={network.token}></BalanceBox> */}
      <StakeAmountBox shownBalance={shownBalance} token={network.token} getShowTooltip={getShowTooltip}></StakeAmountBox>
      <LeverageSizeBox getShowTooltip={getShowTooltip}></LeverageSizeBox>
      <PeriodBox getShowTooltip={getShowTooltip} />
      <RewardBox getShowTooltip={getShowTooltip}></RewardBox>
      <ConfirmButton getShowTooltip={getShowTooltip}></ConfirmButton>
    </StakingPosition>
  );
}

export default SetStakingPosition;

const StakingPosition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  background-color:#EEEFFF; 
  width: calc(51rem * 0.8);
`;
