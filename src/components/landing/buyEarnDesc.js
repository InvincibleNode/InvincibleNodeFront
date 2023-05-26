import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {routeBuyEarn} from "components/common/routePath";
import BuyEarnImage from "assets/images/landingpage_liquidity.png";
import ArrowRight from "assets/icons/arrow_right.svg";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import { size } from "styles/styledComponents/media/mediaSize";


export const BuyEarnDesc = () => {
    const navigate = useNavigate();
    const lpDesc= 
    `The invincible node is highly
incentivizing people to participate
in providing liquidity activity. Get
ILP by supplying liquidity to the
pool, earn perks as the network's
native token.`

const lpDesc2 =
`Enable users to
utilize the invincible!`
    return(
        
     <Wrapper>
        <TextBox>
            <Title>Participate as LP</Title>
            <Desc>{lpDesc}</Desc>
            <Desc2>{lpDesc2}</Desc2>
            <BuyEarnBtn onClick={()=> routeBuyEarn(navigate)}>
                Buy&Earn
                <ArrowImage  src={ArrowRight}/>
            </BuyEarnBtn>
        </TextBox>
        <BuyEarnImageBox src={BuyEarnImage}/>
     </Wrapper>   
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
   
    margin-bottom: 24.1rem;
    width: 100%;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Montserrat';
    gap: 3rem;
    width: 40%;
`;

const Title = styled.div`
font-weight: 700;
font-size: 4rem;
line-height: 4rem;
width: 100%;
color: #FFFFFF;
@media(${size.laptop} < width < ${size.desktop}) {
    font-size: 3.6rem;
    line-height: 4rem;
}
@media(${size.tablet} < width < ${size.laptop}) {
    font-size: 2.4rem;
    line-height: 3rem;
}
@media(${size.mobileL} <  width < ${size.tablet}) {
    font-size: 2rem;
    line-height: 2rem;
}
@media(width < ${size.mobileL}) {
    font-size: 1.4rem;
    line-height: 1.4rem;
}
`;

const Desc = styled.div`
    white-space: pre-wrap;
    width: 100%;
    font-weight: 600;
    font-size: 2.2rem;
    margin-bottom: 4rem;
    line-height: 124.9%;
    color: #FFFFFF;
    
    @media(${size.laptop} < width < ${size.desktop}) {
        font-size: 2.2rem;
        margin-bottom: 3rem;
    }
    @media(${size.tablet} < width < ${size.laptop}) {
        font-size: 1.4rem;
        margin-bottom: 2rem;
    }
    @media(${size.mobileL} < width < ${size.tablet}) {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        font-weight: 500;
    }
    @media(width < ${size.mobileL}) {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }
`;

const Desc2 = styled(Title)`
    font-size: 3rem;
    line-height: 4rem;
    width: 100%;
    white-space: pre-wrap;
    @media(${size.laptop} < width < ${size.desktop}) {
        font-size: 3rem;
        line-height: 4rem;
    }
    @media(${size.tablet} < width < ${size.laptop}) {
        font-size: 1.6rem;
        line-height: 2rem;
    }
    @media(${size.mobileL} < width < ${size.tablet}) {
        font-size: 1.2rem;
        line-height: 1.6rem;
    }
    @media(width < ${size.mobileL}) {
        font-size: 1rem;
        line-height: 1.4rem;
    }
`;

const BuyEarnBtn = styled(BlueButton)`
    width: 50.2%;
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

const BuyEarnImageBox = styled.img`
    width: 60%;   

`;