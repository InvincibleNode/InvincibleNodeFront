import LoanHeader from "components/loan/loanHeader";
import styled from "styled-components";
import LoanBody from "components/loan/loanBody";

const Loan = () => {
  return (
    <Wrapper>
      <LoanTable>
        <LoanHeader></LoanHeader>
        <LoanBody></LoanBody>
      </LoanTable>
    </Wrapper>
  );
};

export default Loan;

const Wrapper = styled.div`
  width: 1050px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const LoanTable = styled.div`
  width: 85%;
  margin-top: 50px;
  margin-bottom: 40px;
`;
