import styled from "styled-components";
import chatBot from "assets/icons/chatBot.svg";

import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

//web3
import { networkAtom } from "store/network";
import { accountAtom } from "store/account";
import LpPoolTx from "utils/web3/transactions/LpPoolTx";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import ILPTokenTx from "utils/web3/transactions/tokens/ILPTokenTx";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";


export const DataBox =  () => {
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);
  const inviTokenStakeTx = new InviTokenStakeTx(network);
  const lpPoolTx = new LpPoolTx(network);
  const ilpTokenTx = new ILPTokenTx(network);
  const inviTokenTx = new InviTokenTx(network);
  
  const [suppliedLiquidity, setSuppliedLiquidity] = useState(0);
  const [receivedFees, setReceivedFees] = useState(0);
  const [inviStakedAmount, setInviStakedAmount] = useState(0);
  const [inviBalance, setInviBalance] = useState(0);
  const [iLPBalance, setILPBalance] = useState(0);

 
   //------Fetch data asynchronously------//
  useEffect(() => {
    const getWeb3 = async () => {

      const suppliedLiquidity = await lpPoolTx.getStakedAmount(account.address); 
      setSuppliedLiquidity((suppliedLiquidity / 10 ** 18).toFixed(3));

      const receivedFees = await inviTokenStakeTx.nativeRewardAmount(account.address);
      setReceivedFees((receivedFees / 10 ** 18).toFixed(3));

      const ilpBalance = await ilpTokenTx.getBalance(account.address);
      setILPBalance((ilpBalance / 10 ** 18).toFixed(3));
  
      const inviStakedAmount = await inviTokenStakeTx.getStakedAmount(account.address);
      setInviStakedAmount((inviStakedAmount / 10 ** 18).toFixed(3));
  
      const inviBalance = await inviTokenTx.getBalance(account.address);
      setInviBalance((inviBalance / 10 ** 18).toFixed(3));
    };
    getWeb3();

  },[account.address, ilpTokenTx, inviTokenStakeTx, inviTokenTx, lpPoolTx]);

  return (
    <DataBoxWrapper>
      <YouBox>
        <img src={chatBot} alt=""></img>
        You
      </YouBox>
      <Line />
      <DataContents>
        <Data>
          <Title>Supplied Liquidity</Title>
          <Value>{suppliedLiquidity} {network.token}</Value>
        </Data>
        <Data>
          <Title>Received Fees</Title>
          <Value>{receivedFees} {network.token}</Value>
        </Data>
        <Data>
          <Title>Staked $INVI</Title>
          <Value>{inviStakedAmount} INVI ($0.00)</Value>
        </Data>
        <Data>
          <Title>$INVI Balance</Title>
          <Value>{inviBalance} INVI ($0.00)</Value>
        </Data>
        <Data>
          <Title>$ILP Balance</Title>
          <Value>{iLPBalance} ILP</Value>
        </Data>
      </DataContents>
    </DataBoxWrapper>
  );
};

const DataBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 93.4rem;
  height: 8.5rem;
  padding: 3rem 3.3rem;
  background-color: #3e4064;
  border-radius: 3rem;
  gap: 3.4rem;
  color: white;
  font-family: "Pretendard";
`;

const YouBox = styled.div`
  display: flex;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 3rem;
  align-items: center;
  gap: 0.8rem;
`;

const Line = styled.div`
  width: 0.4rem;
  height: 1rem;
  background-color: #acb0fd;
  border-radius: 1rem;
`;

const DataContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;

const Value = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
`;
