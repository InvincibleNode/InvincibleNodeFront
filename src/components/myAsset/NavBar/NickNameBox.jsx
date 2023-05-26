import styled from "styled-components";
import theme from "styles/theme";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { truncateAddress } from "utils/truncateAddress";

const web3 = new Web3(window.ethereum);

/**
 * 계좌번호 뷰 박스
 */
const NickNameBox = () => {
  const [account, setAccount] = useState("");

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied your Account Address in Clipboard!");
    } catch (e) {
      alert("Failed to copy clipboard.");
    }
  };

  const getWeb3 = async () => {
    try {
      const account = await web3.eth.getAccounts();
      setAccount(account[0]);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getWeb3();
  }, [account]);

  return (
    <Container>
      <Title>NICKNAME</Title>
      <AddrBox onClick={() => (account ? handleCopyClipBoard(account) : null)}>
        {account ? truncateAddress(account) : "connect wallet"}
      </AddrBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 20px;
`;

const Title = styled.span`
  ${theme.fonts.Font_Heading_3};
  color: white;
`;

const AddrBox = styled.div`
  width: 100%;
  border-radius: 20px;
  height: 30px;
  background-color: ${theme.colors.darkGray2};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme.fonts.Font_Heading_5};
  border: 2px solid ${theme.colors.ActivePurple};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: #1d1d1d;
  }
`;

export default NickNameBox;
