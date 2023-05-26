import styled from "styled-components";
import Step1 from "assets/images/ilpStep1.png";
import Step2 from "assets/images/ilpStep2.png";
import Step3 from "assets/images/ilpStep3.png";

export const StepBox = () => {
   return (
        <Wrapper>
            <Title>How it works</Title>
            <StepContents>
                <Step>
                    <StepImage >
                        <img src={Step1} alt="Step1" step={1}/>
                    </StepImage>
                    <StepTitle>
                        <StepNumber  step={1}>1</StepNumber>
                        Provide Liquidity
                    </StepTitle>
                </Step>
                <Step>
                    <StepImage >
                        <img src={Step2} alt="Step1"  step={2}/>
                    </StepImage>
                    <StepTitle>
                        <StepNumber  step={2}>2</StepNumber>
                        Receive Hold ILP
                    </StepTitle>
                </Step>
                <Step>
                    <StepImage >
                        <img src={Step3} alt="Step1" step={3} />
                    </StepImage>
                    <StepTitle>
                        <StepNumber  step={3}>3</StepNumber>
                        Receive Reward
                        periodically
                    </StepTitle>
                </Step>
            </StepContents>
        </Wrapper>
   ) 
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-bottom: 8.6rem;
`;

const Title = styled.div`
    font-family: "Pretendard";
    font-weight: 800;  
    font-size: 4rem;
    color: white;
`;

const StepContents = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    max-width: 200rem;
    min-width: 50rem;
`;

const Step = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 20%;
    max-width: 40rem;
    gap: 1.2rem;
`;

const StepImage = styled.div`
`;

const StepTitle = styled.div`
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 1.6rem;
    color: white;
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const StepNumber = styled.div`
    font-family: "Pretendard";
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 100rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: ${(props) => props.step === 1 ?  '#1F53FF' 
    : props.step === 2 ? '#5A42EE' : '#746FFF'    
}
`;