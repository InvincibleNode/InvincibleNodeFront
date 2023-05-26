import styled from "styled-components";
import { useEffect, useState, forwardRef } from "react";
import DatePicker from "react-datepicker";

import CalendarIcon from "assets/icons/calendarIcon.svg";
import { addDays, differenceInDays } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { stakeInfoAtom } from "store/stakeInfo";


function SetPeriod({ getShowTooltip}) {
  const [period, setPeriod] = useState(0);
  const [endDate, setEndDate] = useState(addDays(new Date(), 0));
  const startDate = new Date();
  const [isminPeriodError, setIsMinPeriodError] = useState(false);
  const walletType = useRecoilValue(walletTypeAtom);
  const [stakeInfo, setStakeInfo] = useRecoilState(stakeInfoAtom);

  

  

  useEffect(() => {
    if (stakeInfo.lockPeriod) {
      if (stakeInfo.lockPeriod < 14) {
        setIsMinPeriodError(true);
      } else {
        setEndDate(addDays(new Date(), stakeInfo.lockPeriod));
        setPeriod(stakeInfo.lockPeriod);
      }
    }
  }, [stakeInfo.lockPeriod]);





  return (
    <SetPeriodBox
      onClick={() => {
        walletType === 0 && getShowTooltip();
      }}
    >
      <MinimumPeriod>
        <span>Minimum Lock Period</span>
        <span>{stakeInfo.minLockPeriod} Days</span>
      </MinimumPeriod>

      <PeriodInput walletType={walletType}>
        <input
          disabled={walletType === 0}
          defaultValue={stakeInfo.minLockPeriod}
          type="number"
          value={stakeInfo.minLockPeriod}
          onChange={(e) => {
            setStakeInfo((prev) => ({
              ...prev,
              lockPeriod: e.target.value ? e.target.value : 0,
            }))
          }}
        ></input>
        <span>Days</span>
      </PeriodInput>
    </SetPeriodBox>
  );
}

export default SetPeriod;

const SetPeriodBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const MinimumPeriod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.12rem;
  font-weight: 500;

  color: ${(props) => props.theme.colors.navy};

  span {
    margin-bottom: 1.12rem;
  }
`;

const PeriodInput = styled.div`
  background-color: #fff;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-bottom : 1.12rem;
  width: 100%;
  height: 4.8rem;
 
  input {
    text-align: center;
    font-weight: 500;
    font-size: 2.4rem;
    width: 22.4rem;
    padding: 0 1.6rem;
    font-family: Pretendard;
    color: ${(props) => props.theme.colors.darkGray};
  }
  span {
    height:4.8rem;
    line-height: 4.8rem;
    width: 6.24rem;
    background-color: ${(props) =>  props.walletType === 0 ? "#ACB0FD" : props.theme.colors.blue1};
    font-family: Pretendard;
    font-weight: 600;
    font-size: 1.28rem;
    color: #fff;
    border-radius: 0 0.8rem 0.8rem 0;
  }
`;

