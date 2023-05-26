import styled from "styled-components";
import StakeImage from "assets/images/landingpage_stake.png";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import ArrowRight from "assets/icons/arrow_right.svg";
import {routeStake} from "components/common/routePath";
import { useNavigate } from "react-router-dom";
import { size, device } from "styles/styledComponents/media/mediaSize";

export const StakeDesc = () => {
    const navigate = useNavigate();
return(
    <Wrapper>
        <TitleBox>
            <NumberBox>1</NumberBox>
            <Title>Stake asset & Receive Transferrable NFT</Title>
        </TitleBox>
        <DescImageBox>
            <DescImage src={StakeImage}></DescImage>
            <StakeBtn onClick={()=>{routeStake(navigate)}}>
                Stake
                <ArrowImage src={ArrowRight}/>
            </StakeBtn>
        </DescImageBox>    
    </Wrapper>
)
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7rem;
    width: 100%;
    margin-bottom: 20rem;
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
    gap: 0.3rem;
    }
`;

const NumberBox = styled.div`
    width: 5.2rem;
    height: 5.8rem;
    font-size: 3rem;
    line-height: 5.8rem;
    background: #5A42EE;
    border-radius: 5.5rem;
    text-align: center;
   @media (${size.laptop} < width < ${size.desktop}) {
    width: 5.2rem;
    height: 5.8rem;
    font-size: 3rem;
    line-height: 5.8rem;
   }
    @media (${size.tablet} < width < ${size.laptop}) {
    width: 4.5rem;
    height: 5rem;
    font-size: 2.5rem;
    line-height: calc(4.5rem * 1.16);
    }
    @media (${size.mobileL} <  width < ${size.tablet}) {
    width: 3.8rem;
    height:  4rem;
    font-size: 2rem;
    line-height: 4rem;
    }
    @media ( width < ${size.mobileL}) {
        width: 3.6rem;
    height: 2.4rem;
    font-size: 1.2rem;
    line-height:2.4rem;
    }
    
`;

const Title = styled.div`
    font-size: 2.8rem;
    @media (${size.laptop} < width < ${size.desktop}) {
    font-size: 2.8rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
    font-size: 2.5rem;
    }
    @media ( width < ${size.tablet}) {
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
    width: 13.2%;
    height: 4.2vw;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    padding: 0 2rem 0 3rem;
    font-size: 1.2vw;
`;

const ArrowImage = styled.img`
    margin-left: 0.4vw;
    width: 1.4vw;
`;