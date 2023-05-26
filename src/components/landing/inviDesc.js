import styled from "styled-components";
import Circle from "assets/images/landingpage_circle.png";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import { size } from "styles/styledComponents/media/mediaSize";


export const InviDesc = () => {

    return(
        <Wrapper>
            <CircleImage src={Circle}/>
            <InviDescBox>
                <TextBox>
                    <Title>$INVI Tokenomics</Title>
                    <Desc>If you want to deeply know bout INVI tokenomics, please check this out.</Desc>
                </TextBox>
                <TokenButton>Tokenomics</TokenButton>
            </InviDescBox>
        </Wrapper>
    )
};


const Wrapper = styled.div`
    height: 30rem;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: -2;
    @media (${size.laptop} < width < ${size.desktop}) {
        height: 30rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
        height: 28rem;
    }

    @media (${size.mobileL} < width < ${size.tablet}) {
        height: 24rem;
    }
    @media (width < ${size.mobileL}) {
        height: 20rem;
    }
`;

const CircleImage = styled.img`
    bottom: 0;
    position: absolute;
    left: 0;
    z-index: -1;
    width: 30%;
    max-width: 36rem;

`;

const InviDescBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 62.5%;
    margin: 0 auto;
    gap: 10%;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2vw;
    width: 80%;
;`

const Title = styled.div`
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 4rem;
    line-height: 5rem;
    color: ${props => props.theme.colors.blue2};
    @media (${size.laptop} < width < ${size.desktop}) {
        font-size: 4rem;
        line-height: 5rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
        font-size: 3.5rem;
        line-height: 4.5rem;
    }
    @media (${size.mobileL} < width < ${size.tablet}) {
        font-size: 3rem;
        line-height: 4rem;
    }
    @media (width < ${size.mobileL}) {
        font-size: 2.5rem;
        line-height: 3rem;
    }
`;

const Desc = styled.div`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 2rem;
    line-height: 3rem;
    color: ${props => props.theme.colors.blue2};
    @media (${size.laptop} < width < ${size.desktop}) {
        font-size: 2rem;
        line-height: 3rem;
    }
    @media (${size.tablet} < width < ${size.laptop}) {
        font-size: 1.6rem;
        line-height: 2.4rem;
    }
    @media (${size.mobileL} < width < ${size.tablet}) {
        font-size: 1.2rem;
        line-height: 2rem;
    }
    @media (width < ${size.mobileL}) {
        font-size: 1rem;
        line-height: 1.8rem;
    }
`;

const TokenButton = styled(BlueButton)`
    font-family: 'Pretendard';
    font-weight: 800;
    width: 20%;
    height: 4.8vw;
    font-size: 1.2vw;
    box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.12);
    border-radius: 2rem;
   
`;