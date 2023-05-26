import styled from "styled-components";
import { useEffect, useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IncreaseMonth from "assets/icons/increaseMonth.svg";
import DecreaseMonth from "assets/icons/decreaseMonth.svg";
import { add, format, getMonth, getYear, isSameDay } from "date-fns";
import CalendarIcon from "assets/icons/calendarIcon.svg";
import { subDays, addDays, differenceInDays } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { stakeInfoAtom } from "store/stakeInfo";
import StartDay from "assets/icons/calendarStartDay.svg";

export const Calendar = ({ getShowTooltip, setIsCalendarOpen, isCalendarOpen}) => {
    const [stakeInfo, setStakeInfo] = useRecoilState(stakeInfoAtom);
    const [period, setPeriod] = useState(0);
    const [endDate, setEndDate] = useState(addDays(new Date(), stakeInfo.minLockPeriod + 1));
    const walletType = useRecoilValue(walletTypeAtom);
    const [isminPeriodError, setIsMinPeriodError] = useState(false);
    function getToday() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
    
        return year + "." + month + "." + day;
      }
      useEffect(() => {
        if (stakeInfo.lockPeriod) {
          if (stakeInfo.lockPeriod < stakeInfo.minLockPeriod) {
            setIsMinPeriodError(true);
          } else {
            setEndDate(addDays(new Date(), stakeInfo.lockPeriod));
            setPeriod(stakeInfo.lockPeriod);
          }
        }
      }, [stakeInfo.lockPeriod]);
    
      const formatHeaderDate = (date) => {
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        return year + "." + month;
      };

      const CustomInput = forwardRef(({ value, onClick }, ref) => {
        return (
         <DateBox onClick={() => {
            walletType === 0 && getShowTooltip();
          }}>
            <StartDate>
            <div>Start</div>
            <div>{getToday()}</div>
            </StartDate>
                
            <EndDateButton onClick={onClick} ref={ref} isCalendarOpen={isCalendarOpen}>
            <span>END</span>
            <div>
              <span>{value}</span>
              <img src={CalendarIcon} alt="calendarBtn" />
            </div>
          </EndDateButton>
        </DateBox>
          
        );
      });
    
      const formatEndDate = (endDate) => {
        const formattedDate = format(endDate, "yyyy/MM/dd");
        return `END\n${formattedDate}`;
      };
    
      const customHeader = ({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, decreaseYear, increaseYear }) => {
        function range(start, end = Infinity, step = 1) {
            const length = Math.floor((end - start) / step) + 1;
            return Array.from({ length }, (_, i) => start + (i * step));
          }
          
          const years = range(2023, 2045);
        const months = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
      
      return (
          <CustomHeader>
            <SelectBox>
                <MonthBox>
                <DecreaseIcon src={DecreaseMonth} onClick={decreaseMonth}/>
                <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                    }
                >
                    {months.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
            </select>
                <IncreaseIcon src={IncreaseMonth} onClick={increaseMonth}/>
                </MonthBox>
                <YearBox>
                <DecreaseIcon src={DecreaseMonth} onClick={decreaseYear}/>
                <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                >
                    {years.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
                <IncreaseIcon src={IncreaseMonth} onClick={increaseYear}/>
                </YearBox>
            </SelectBox>
            <PeriodText>{stakeInfo.lockPeriod}days</PeriodText>
          </CustomHeader>
        );
      };
      
      const MyContainer = ({ className, children }) => {
        return (
          <>
          <CalendarWrapper>
            <CalendarContainer className={className}>
              <div>{children}</div>
            </CalendarContainer>
            <MinDateText isCalendarOpen={isCalendarOpen}>Please select an end date that excludes the minimum date</MinDateText>
          </CalendarWrapper>
         
          </>
        );
      };
      
      const sideDateClassName = (date) => {
        const lastDate = addDays(new Date(), stakeInfo.minLockPeriod) || addDays(new Date(), stakeInfo.lockPeriod);
        const startDate = addDays(new Date(), stakeInfo.minLockPeriod + 1);
        
        if(isSameDay(date, lastDate)){
        return 'lastDate';
      } else if( isSameDay(date, startDate)
      ){ return 'startDate';
      }
      return undefined;};

      const highlightDates = [
        {
          'react-datepicker__day--highlighted-custom-1': Array.from(
            { length: Math.floor(stakeInfo.minLockPeriod) + 1 },
            (_, index) => addDays(new Date(), index)
          ),
        },
        {
          'react-datepicker__day--highlighted-custom-2':
            stakeInfo.lockPeriod > stakeInfo.minLockPeriod
              ? Array.from(
                  { length: Math.floor(stakeInfo.lockPeriod - stakeInfo.minLockPeriod) },
                  (_, index) => addDays(new Date(), Math.floor(stakeInfo.minLockPeriod) + 1 + index)
                )
              : [],
        },
      ];

    return(
      <>
       <DatePicker
          onCalendarOpen={() => setIsCalendarOpen(true)}
          onCalendarClose={() => setIsCalendarOpen(false)}
          disabled={walletType === 0}
          startDate={new Date()}
          selected={endDate}
          dateFormat="yyyy.MM.dd"
          dayClassName={sideDateClassName}
          formatWeekDay={(date) => date.toString().slice(0, 1)}
          useWeekdaysShort={true}
          minDate={new Date()}
          // selectsRange
          // selectsDisabledDaysInRange
          
          highlightDates={highlightDates}
          onChange={(date) => {
            
            setStakeInfo((prev) => ({
              ...prev,
              lockPeriod: differenceInDays(date, new Date()) + 1,
            }));
          }}
          customInput={<CustomInput />}
          renderCustomHeader={customHeader}
         
          calendarContainer={MyContainer}
        />
       
</>
    )
}

const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 3.68rem;
  width: calc(31.2rem - 1.9rem);
  padding: 0.96rem 1.28rem;
  background-color: #fff;
  border-radius: 0.8rem;
  position: relative;
  z-index: 2;
  img {
    width: 1.6rem;
  }
`;
const StartDate = styled.div`
  font-family: Pretendard;
  color: ${(props) => props.theme.colors.navy};
  font-weight: 600;
  font-size: 1.12rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height : 1.28rem;
  gap: 0.4rem;
`;

const EndDateButton = styled.div`
  display: flex;
  width: 11.2rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: none;
  background-color: #fff;
  height: 3.84rem;
  text-align: right;
  font-weight: 500;
  font-size: 1.28rem;
  margin-right  : 0.96rem;
  color: ${(props) => props.theme.colors.navy};
  cursor: pointer;
  div{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  div > span {
    margin-right: 0.4rem;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-weight: 640;
  }
`;

const CalendarWrapper = styled.div`
  position: absolute;
  width: 31.9rem;
  height: fit-content;
  border-radius: 0.8rem;
  padding-bottom: calc(3rem * 0.8);
  border-bottom: 0.2rem solid #D8DAFF;
  top: -1rem;
  z-index: -1;
  .react-datepicker {
    border: none;
    border-radius: 0.8rem;
  }
`;

const CalendarContainer = styled.div`
border-radius: 1rem;
width: 100%;
height: 100%;
padding-bottom: 3.4rem;
background-color: ${(props) => props.theme.colors.lightPurple};
  .react-datepicker__header {
    margin: 2.6rem 3rem 1.5rem 3rem;
    width: calc(100% - 6rem);
    background: ${(props) => props.theme.colors.lightPurple};
    border: none;
    color: #6A6A6A;
  }

  .react-datepicker__month-container {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    font-family: Pretendard;
    border: none;
    background: ${(props) => props.theme.colors.lightPurple};
  }
  .react-datepicker__week{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .react-datepicker__month{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.7rem;
    width: calc(100% - 6.72rem);
    height: 100%;
    margin: -0.8rem 3.36rem; 
  }

  .react-datepicker__day-names {
    border: none;
    width: calc(100% - 1.28rem);
    height: 1.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    font-size: 0.88rem;
    color: #6A6A6A;
    margin: 1.36rem 0.64rem 0 0.64rem;
  }
  .react-datepicker__day-name{
    color: #6A6A6A;
    font-family: Pretendard; 
    font-weight: 400;
    height: calc(2.2rem * 0.8);
   width: 100%;
  }
 .react-datepicker__day, .react-datepicker__time-name{
    font-family: Pretendard; 
    font-weight: 600;
    height: calc(2.2rem * 0.8);
    line-height: calc(2.2rem * 0.8);
   width: 100%;
   margin: 0;
   color: ${(props) => props.theme.colors.navy};
    background: ${(props) => props.theme.colors.lightPurple};
    &:hover{
      background-color: #6892F1;
      /* border-radius: 2rem; */
    }
    }
  
  
  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected{
    background: ${(props) => props.theme.colors.lightPurple};
    border: none;
  }

  .react-datepicker__day--in-range {
    background-color: #6892F1;
}

  
  .react-datepicker__day--in-selecting-range {
    background-color: #6892F1;
    border-radius: 0;
    &:first-of-type {
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
      }

    &:last-of-type {
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
    }
  }
  .react-datepicker__day--selecting-range-start {
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
}

.react-datepicker__day--selecting-range-end {
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
}


  
  .react-datepicker__day--today {
    /* background-image: url(${StartDay});
    background-repeat: no-repeat;
    background-position: center; */
    
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  .react-datepicker__day--highlighted-custom-1{
    background-color: #fff;
    pointer-events  : none;
    color: ${(props) => props.theme.colors.navy};
    &:hover{
    background-color: #fff;
    border-radius : 0rem;
    }

      &:first-of-type {
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    }

    &:last-of-type {
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
    }
  }

  .react-datepicker__day--highlighted-custom-2{
    background-color: #6892F1;
    border-radius: 0;
    color: ${(props) => props.theme.colors.navy};
    &:hover{
      background-color: #6892F1;
    }
    &:first-of-type {
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
        }

      &:last-of-type {
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
      }
  }
  .react-datepicker__day--disabled, .react-datepicker__month-text--disabled, .react-datepicker__quarter-text--disabled, .react-datepicker__year-text--disabled{
   background-color: ${(props) => props.theme.colors.lightPurple};
   
   &:hover{
    background-color: ${(props) => props.theme.colors.lightPurple};
   }
   .react-datepicker__day--outside-month{
    color: ${(props) => props.theme.colors.mediumLightGray};
  }
  }
  .react-datepicker__day--selected{
    background-color: #6892F1;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: none;
    &:focus{
      outline: none;
  }
}
  .startDate{
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }
  .lastDate{
    /* background-image: url(${StartDay});
    background-repeat: no-repeat;
    background-position:  center; */
    
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }

  .react-datepicker__day--outside-month{
    color: ${(props) => props.theme.colors.mediumLightGray};
    font-weight: 400;
  }
`;

const CustomHeader = styled.div`
  background: ${(props) => props.theme.colors.lightPurple};
  margin: 0 auto;
  width: 100%;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 1.28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: calc(1.7rem * 0.8);
  border-bottom: 0.2rem solid #F2F3FF;
  select {
    font-family: Pretendard;
  font-weight: 500;
  font-size: 1.28rem;
  color: ${(props) => props.theme.colors.navy};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
  outline: none;
  option{
    background-color: #ECEDFF;
    font-family: Pretendard;
    font-size: 1.28rem;
    font-weight: 600;
  }
  }
`;

const SelectBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1.6rem;
`;

const MonthBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
  width: fit-content;
  font-size: 1.12rem;
  font-weight: 480;
  margin: 0 auto;
  gap: 0.8rem;
`;

const YearBox = styled(MonthBox)``;

const IncreaseIcon = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  display: inline-block;
  width: 0.64rem;
  height: 0.96rem;
`;

const DecreaseIcon = styled(IncreaseIcon)`
 `;

 const PeriodText = styled.div`
    font-size: 1.28rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.navy};
 `;

const MinDateText = styled.div`
  display: ${(props) => (props.isCalendarOpen ? "block" : "none")};
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1.12rem;
  color: ${(props) => props.theme.colors.blue1};
  margin-top: 1rem;
  text-align: center;
`;