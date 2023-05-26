import styled from "styled-components";
import CloseSvg from "assets/icons/closeIcon.svg";
import inviLogo from "assets/icons/invi_token_logo.svg";
import DescSvg from "assets/icons/descIcon.svg";
import { useState } from "react";
import { Button } from "styles/styledComponents/button";
import { WhiteButton } from "styles/styledComponents/Buttons/whiteButton";

export const UnstakeBox = ({closeModal}) => {

const  [availableInvi, setAvailableInvi] = useState(2041.76);
const  [unstakeAmount, setUnstakeAmount] = useState(0);
return(
    <Wrapper>
            <CloseModalBox>
                <CloseIcon src={CloseSvg} onClick={()=>closeModal()}/>
            </CloseModalBox>

            <InfoBox>
                <InviHeader>
                    <InviImage>
                        <InviLogo src={inviLogo}/>
                        <InviText>INVI</InviText>
                    </InviImage>
                    <Commission>Commission -5%</Commission>
                </InviHeader>
                <UnboundDesc>
                    <Title>
                        <DescIcon src={DescSvg}/>
                        Once the unbonding period begins you will:</Title>
                    <Desc>
                        <ul>
                            <li>not receive staking rewards</li>
                            <li>not be able to cancel the unbonding</li>
                            <li>need to wait 14 days for the amount to be liquid</li>
                        </ul>
                    </Desc>
                </UnboundDesc>

                <BalanceBox>
                    <BalanceTitle>Available for Unstake</BalanceTitle>
                    <Balance>{`${availableInvi} INVI`}</Balance>
                </BalanceBox>
                
                <InputTitle>Amount to Unstake</InputTitle>
                <InputBox>
                    <input type="number" value={unstakeAmount} onChange={(e) => setUnstakeAmount(e.target.value)}></input>
                    <MaxButton onClick={()=>{setUnstakeAmount(availableInvi)}}>MAX</MaxButton>
                    <InviImage>
                        <InviLogo src={inviLogo} max='max'/>
                        <InviText max='max'>INVI</InviText>
                    </InviImage>
                </InputBox>
                <UnstakingButton><span>Unstaking</span></UnstakingButton>
            </InfoBox>
    </Wrapper>
)

}

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CloseModalBox = styled.div`
    height: 54px;
    display: flex;
    justify-content: flex-end;
`;

const CloseIcon = styled.img`
    width: 24px;
    padding-right: 15px;
    cursor: pointer;
`;

const InfoBox = styled.div`
    height: 100%;
    padding-bottom: 38px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-family: 'Pretendard';
`;

const InviHeader = styled.div`
    height: 46px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 44px;
`;

const InviImage = styled.div`
    width: 94px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const InviLogo = styled.img`
    width: ${(props) => props.max ? '36px' : '46px'};
`;

const InviText = styled.div`
    font-weight: 800;
    font-size: ${(props) => props.max ? '20px' : '22px'};
    line-height: 26px;
    background: linear-gradient(140.37deg, #1F53FF 2.52%, #9C1FFF 89.95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
`;

const Commission = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 46px;
`;

const UnboundDesc = styled.div`
    height: 70px;
    display: flex;
    padding: 20px 52px;
    gap: 10px;
    color: ${(props) => props.theme.colors.red};
    flex-direction: column;
    justify-content: space-between;
    background-color: ${(props) => props.theme.colors.lightRed};
    box-shadow: inset 0px 4px 10px rgba(95, 64, 64, 0.15);
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
`;

const DescIcon = styled.img`
    width: 20px;
`;

const Desc = styled.div`
    font-weight: 400;
    font-size: 11px;
    color: ${(props) => props.theme.colors.red};
    ul{
        margin: 0;
        margin-left: 20px;
        padding: 0;
    }
`;

const BalanceBox = styled.div`
    margin: 30px 50px;
    height: 19px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const BalanceTitle = styled.div`
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: ${(props) => props.theme.colors.blue1};
`;

const Balance = styled.div`
    font-weight: 500;
    font-size: 16px;
`;

const InputTitle = styled(BalanceTitle)`
    margin: 0 50px 10px 50px;
    line-height: 25px;
`;

const InputBox = styled.div`
    width: 404px;
    height: 44px;
    background-color: white;
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-bottom: 30px;
    align-items: center;
    input{
        width: 250px;
        height: 36px;
        text-align: center;
        font-family: Pretendard;
        font-weight: 500;
        font-size: 20px;
    }
`;

const MaxButton = styled(Button)`
    width: 46px;
    height: 25px;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.blue1};
    font-weight: 400;
    color: white;
    font-size: 14px;
    margin-left: 34px;
`;

const UnstakingButton = styled(WhiteButton)`
    height: 56px;
    margin: 0 45px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    padding: 0;

    border: 1px solid transparent;
    /* border-radius: 10px; */
    background-color: white;
    background-image: linear-gradient(white, white), linear-gradient(140deg, rgba(31, 83, 255, 1) 0%, rgba(156, 31, 255, 1) 100%);
    background-origin: border-box;
    background-clip:  content-box, border-box;
  span{
    background: linear-gradient(160deg, #1F53FF 2.52%, #9C1FFF 89.95%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent
  }
`;