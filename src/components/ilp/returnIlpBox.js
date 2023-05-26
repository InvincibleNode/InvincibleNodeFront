import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

//web3
import Web3 from "web3";
import { accountAtom } from "store/account";
import getContract from "utils/web3/getContract";
import { networkAtom } from "store/network";
import GetNetworkLogo from "utils/getNetworkLogo/getNetworkLogo";

// assets
import IcIlp from "assets/icons/ilp_logo.svg";
import { Button } from "styles/styledComponents/button";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import ILPTokenTx from "utils/web3/transactions/tokens/ILPTokenTx";
import LpPoolTx from "utils/web3/transactions/LpPoolTx";

const web3 = new Web3(window.ethereum);
export const ReturnIlpBox = () => {
    const [ilpBalance, setIlpBalance] = useState(0);
    const [returnAmount, setReturnAmount] = useState();
    const [receiveAmount, setReceiveAmount] = useState(0);
    const UnlockDesc =`You will not receive rewards of 70% protocol fees and INVI periodically. 
    You will need to wait 7days for the amount to be deposited into your wallet.
    Please return ILP as an amount of you want to get rid of liquidity.`;

    const account = useRecoilValue(accountAtom);
    const network = useRecoilValue(networkAtom);

    const ilpTokenTx = new ILPTokenTx(network);
    const lpPoolTx = new LpPoolTx(network);

   useEffect(() => {
    const getWeb3 = async () => {
        const ilpBalance = await ilpTokenTx.getBalance(account.address);
        setIlpBalance((ilpBalance / 10 ** 18).toFixed(3));
    };
    getWeb3(); 

   },[account.address, ilpTokenTx]);

   const returnIlp = async () => {
         const realAmount = web3.utils
         .toBN(returnAmount)
            .mul(web3.utils.toBN(10).pow(web3.utils.toBN(18)));
        const result = await lpPoolTx.unstake(account, realAmount);
    };
         

    return(
        <ReturnIlpWrapper>
            <UnlockBox>
                <Title>
                Unlocking your liquidity provision will take <p>7 days</p>
                </Title>
                <Desc>
                    {UnlockDesc}
                </Desc>
            </UnlockBox>

            <BalanceBox>
                <BalanceTitle>
                    Your ILP balance
                </BalanceTitle>
                <BalanceValue>
                    {`${ilpBalance} ILP`}
                </BalanceValue>
            </BalanceBox>

            <SetAmountBox>
                <SetAmountTitle>
                    Amount to Return
                </SetAmountTitle>
                <SetAmountInput>
                    <SetAmountLeft>
                        <input 
                            type="number"
                            placeholder="0.0"
                            value={returnAmount}
                            onChange={(e) => {
                                setReturnAmount(e.target.value);
                                setReceiveAmount(e.target.value);
                            }}
                        />
                        <AmountMax>MAX</AmountMax>
                    </SetAmountLeft>
                    <SetAmountRight>
                        <img src={IcIlp} alt="ilp" />
                        <ILPText>ILP</ILPText>
                    </SetAmountRight>
                </SetAmountInput>
            </SetAmountBox>

                <ReceiveBox>
                    <ReceiveTitle>
                        You will receive
                    </ReceiveTitle>
                    <ReceiveValue>
                        {receiveAmount ? receiveAmount : 0}
                        <GetNetworkLogo/>
                        <p>{network.token}</p>
                    </ReceiveValue>
                </ReceiveBox>
                
                <FeeBox>
                    <FeeTitle>
                        Fee
                    </FeeTitle>
                    <FeeValue>
                        0.0
                        <p>%</p>
                    </FeeValue>
                </FeeBox>

                <ConfirmButton
                returnAmount={returnAmount}
                    onClick={() => {
                        if(returnAmount > 0) {
                        returnIlp();
                    }}}
                >
                    {returnAmount > 0 ? "Confirm" : "Enter an Amount"}
                </ConfirmButton>
            
        </ReturnIlpWrapper>
    );
};

const ReturnIlpWrapper = styled.div`
    width: 100%;
    height: 100%;
;`

const UnlockBox = styled.div`
    width: 100%;
    height: 7.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
;`

const Title = styled.div`
 color: #FF007A;
    width: 100%;
    height: 2.4rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    ${({theme}) => theme.fonts.Font_Heading_4_1};
    p{
        ${({theme}) => theme.fonts.Font_Heading_1};
    }
;`

const Desc = styled.div`
 color: #FF007A;
    width: 100%;
    text-align: start;
    ${({theme}) => theme.fonts.Font_Heading_5};
    white-space: pre-line;
;`

const BalanceBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2.6rem;
;`

const BalanceTitle = styled.div`
    ${({theme}) => theme.fonts.Font_Heading_3};
    color: ${({theme}) => theme.colors.blue1};
`;

const BalanceValue = styled.div`
    ${({theme}) => theme.fonts.Font_Heading_3_5};
;`

const SetAmountBox = styled.div`
    width: calc(100% - 4.8rem);
    padding: 2rem 2.4rem;
    border-radius: 1rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 2rem;
;`

const SetAmountTitle = styled.div`
    ${({theme}) => theme.fonts.Font_Heading_3_5};
    color: ${({theme}) => theme.colors.blue1};
;`

const SetAmountInput = styled.div`
   display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4.8rem;
;`

const SetAmountLeft = styled.div`
     display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.8rem;
  height: 2.8rem;
  background-color: ${(props) => props.theme.colors.lightBlue2};
  border-radius: 1.4rem;
  input {
    width: 17rem;
    text-align: center;
    font-family: Pretendard;
    font-weight: 500;
    font-size: 2rem;
    color: ${(props) => props.theme.colors.mediumDarkGray};
    background-color: ${(props) => props.theme.colors.lightBlue2};
  }
;`


const AmountMax = styled(Button)`
width: 4.8rem;
height: 2.8rem;
border-radius: 0.4rem;
background-color: ${(props) => props.theme.colors.blue1};
font-family: Pretendard;
font-weight: 400;
color: white;
font-size: 1.4rem;
line-height: 2rem;
`;

const SetAmountRight = styled.div`
    display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
img{
    width: 4.6rem;
}
;`

const ILPText = styled.span`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 800;
  font-size: 2rem;
  font-family: Pretendard;
`;

const ReceiveBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    height: 2.2rem;
;`

const ReceiveTitle = styled.div`
    ${({theme}) => theme.fonts.Font_Heading_3};
    color: ${({theme}) => theme.colors.blue1};
;`

const ReceiveValue = styled.div`
display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    height: 100%;
    ${({theme}) => theme.fonts.Font_Heading_3_5};
    img{
        width: 1.6rem;
    }
    p{
        ${({theme}) => theme.fonts.Font_Heading_3};
    }
;`


const FeeBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.2rem;
    margin-top: 1rem;
;`

const FeeTitle = styled.div`
    ${({theme}) => theme.fonts.Font_Heading_3};
    color: ${({theme}) => theme.colors.blue1};
;`

const FeeValue = styled.div`
    ${({theme}) => theme.fonts.Font_Heading_3_5};
    display: flex;
    align-items: center;
    height: 100%;
    p{
        ${({theme}) => theme.fonts.Font_Heading_3};
        height: 100%;
    }
;`

const ConfirmButton = styled(BlueButton)`
    width: 100%;
    height: 5.6rem;
    border-radius: 1rem;
    font-weight: 800;
    font-size: 2.2rem;
    margin-top: 2.6rem;
    background: ${(props) =>
    props.returnAmount > 0
      ? "linear-gradient(172.37deg, #1F53FF 2.52%, #9C1FFF 89.95%)"
      : props.theme.colors.lightPurple2};
;`

    
