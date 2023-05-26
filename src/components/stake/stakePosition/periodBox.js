import SetPeriod from "./setPeriod";
import styled from "styled-components";
import { useState } from "react";

import { StepBox } from "./stepBox";
import { Calendar } from "./calendar";

export const PeriodBox = ({ getShowTooltip }) => {
 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Wrapper isCalendarOpen={isCalendarOpen}>
      <StepBox step="Step 3" title="Adjust the lock period" tooltip = {true}/>
      
    <Box isCalendarOpen={isCalendarOpen}>
      <SetPeriod getShowTooltip={getShowTooltip}/>
      <Calendar getShowTooltip={getShowTooltip} isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen}/>
    </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: calc(1.4rem * 0.8);
  width: calc(100% - 2 * calc(3.6rem * 0.8));
  margin: 0 calc(3.6rem * 0.8) calc(4rem * 0.8) calc(3.6rem * 0.8);
  height: fit-content;
  border-bottom: ${(props) => (props.isCalendarOpen ? "none" : "0.2rem solid #D8DAFF")} ;
  border-radius: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 1.6rem 1.6rem 2.4rem 1.6rem;
  width: calc(100% - 2 * 1.6rem);
  height: ${(props) => (props.isCalendarOpen ? "42rem" : "auto")};
`;


