import styled from "styled-components";
import Telegram from "assets/icons/community/telegram.svg";
import Twitter from "assets/icons/community/twitter.svg";
import Discord from "assets/icons/community/discord.svg";
import Medium from "assets/icons/community/medium.svg";
import Github from "assets/icons/community/github.svg";
import { size } from "styles/styledComponents/media/mediaSize";


export const Footer = () => {

    return(
        <Wrapper>
                <MenuBox>
                    <div>Terms and Conditions </div>
                    <div>Documentation</div>
                    <div>Media Kit (Logo package)</div>
                    <div>Privacy Policy</div>
                </MenuBox>
                <CommunityBox>
                    <CommunityText>Community</CommunityText>
                    <LogoBox>
                        <LogoGroup>
                            <LogoImg src={Telegram}/>
                            <LogoImg src={Discord}/>
                            <LogoImg src={Github}/>
                        </LogoGroup>
                        <LogoGroup>
                            <LogoImg src={Medium}/>
                            <LogoImg src={Twitter}/>
                        </LogoGroup>
                    </LogoBox>
                </CommunityBox>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    height: 28rem;
    background-color: #0B0B0B;
    position: relative;
`;



const MenuBox = styled.div`
    position: absolute;
    top: 28.57%;
    bottom: 28.57%;
    left: 5.47%;
    display: flex;
    flex-direction: column;
    height: 12rem;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 3rem;
    width: 21.6rem;
    display: flex;
    color: ${(props) => props.theme.colors.mediumLightGray};
    div{
        width: max-content;
    }
`;

const CommunityBox = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-content: center;
    gap: 2.4rem;
    width: 56rem;
    height: 9.7rem;

    @media ( width < ${size.laptop}) {
        width: 30rem;
        height: 6.7rem;
        top: 40%;
        align-items: center;
    }

    @media (width < ${size.mobileL}){
        align-items: flex-end;
        align-content: flex-end;
    }
`;

const LogoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 9rem;
    @media ( width < ${size.laptop}) {
        gap: 1.6rem;
        flex-direction: column;
        align-content: center;
    };
`;

const LogoGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    gap: 9rem;
    width: fit-content;
    @media ( width < ${size.laptop}) {
        gap: 5rem;
        justify-content: center;
    };

    @media ( width < ${size.tablet}) {
        gap: 1.6rem;
    }
    ;`

const LogoImg = styled.img`
    width: 4rem;
    @media ( width < ${size.mobileL}) {
        width: 3rem;
        }
`;

const CommunityText = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 3rem;
    text-align: center;
    color: ${(props) => props.theme.colors.mediumLightGray};
`;