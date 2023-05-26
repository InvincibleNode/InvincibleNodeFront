import styled from "styled-components";
import LoanImage from "assets/images/landingpage_loan.png";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import ArrowRight from "assets/icons/arrow_right.svg";
import {routeLoan} from "components/common/routePath";
import { useNavigate } from "react-router-dom";
import { size } from "styles/styledComponents/media/mediaSize";

export const LoanDesc = () => {
const navigate = useNavigate();
    return(
        <Wrapper>
            <TitleBox>
                <NumberBox>2</NumberBox>
                <Title>Get perks by Borrowing & Staking INVI</Title>
            </TitleBox>
            <DescImageBox>
                <DescImage src={LoanImage}></DescImage>
                
            </DescImageBox>
            <StakeBtn onClick={()=>{routeLoan(navigate)}}>
                    Loan
                    <ArrowImage src={ArrowRight}/>
            </StakeBtn>    
    </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20rem;
    gap: 7rem;
`;

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    gap: 3rem;
    font-family: Montserrat;
    font-weight: 700;
    color: white;
    @media (${size.laptop} < width < ${size.desktop}) {
    gap: 2.5rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
    gap: 1.5rem;
    }
    @media ( width < ${size.tablet}) {
    gap: 0.5rem;
    }
`;

const NumberBox = styled.div`
    width: 5.8rem;
    height: 5.8rem;
    font-size: 3rem;
    border-radius: 5rem;
    line-height: 5.8rem;
    border-radius: 5.5rem;
    background: #5A42EE;
    text-align: center;
    @media (${size.laptop} < width < ${size.desktop}) {
        width: 5.8rem;
        height: 5.8rem;
        font-size: 3rem;
        border-radius: 5rem;
        line-height: 5.8rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
        width: 5rem;
        height: 5rem;
        font-size: 2.5rem;
        border-radius: 4.5rem;
        line-height: 5rem;
    }
    @media (${size.mobileL} <  width < ${size.tablet}) {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
        border-radius: 4rem;
        line-height: 4.2rem;
    }
    @media ( width < ${size.mobileL}) {
        width: 3.4rem;
        height: 3.4rem;
        font-size: 1.5rem;
        border-radius: 3.5rem;
        line-height: 3.4rem;
    }
`;

const Title = styled.div`
    font-size: 3.2rem;
    @media (${size.laptop} < width < ${size.desktop}) {
        font-size: 2.8rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
        font-size: 2.5rem;
    }
    @media (${size.mobileL} <  width < ${size.tablet}) {
        font-size: 2rem;
    }
    @media ( width < ${size.mobileL}) {
        font-size: 1.5rem;
    }
`;

const DescImageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
`;

const DescImage = styled.img`
    width: 100%;
`;

const StakeBtn = styled(BlueButton)`
    width: 12%;
    height: 4vw;
    padding: 0 2.4rem 0 3.4rem;
    font-size: 1.2vw;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
`;

const ArrowImage = styled.img`
    margin-left: 0.4vw;
    width: 1.4vw;
`;