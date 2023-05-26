import styled from "styled-components";
import ProfileDefault from "../../assets/images/profile_default.png";
import { useState, useEffect } from "react";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);
/**
 * @path index.js -> profile.js
 */
export const Profile = () => {
  const [nickname, setnickname] = useState("NICKNAME");
  const [account, setAccount] = useState("");

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
    <ProfileBox>
      <ProfileImage src={ProfileDefault} />
      <NickNameText>{nickname}</NickNameText>
      <AccountText>{account ? `${account.slice(0, 15)}...` : "connect wallet"}</AccountText>
      <NFTText>NFT</NFTText>
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px 20px 0 0;
  background-color: ${(props) => props.theme.colors.lightPurple2};
`;

const ProfileImage = styled.img`
  margin: 10px 10px 15px 10px;
  width: 180px;
  height: 180px;
`;

const NickNameText = styled.div`
  width: 155px;
  height: 32px;
  background-color: ${(props) => props.theme.colors.mediumGray};
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  border-radius: 20px;
`;
const AccountText = styled.div`
  width: 155px;
  height: 30px;
  background-color: ${(props) => props.theme.colors.mediumGray};
  text-align: center;
  line-height: 30px;
  font-size: 11px;
  font-weight: 400;
  color: white;
  border-radius: 20px;
  margin: 10px 0 51px 0;
`;

const NFTText = styled.div`
  width: 155px;
  height: 32px;
  background-color: ${(props) => props.theme.colors.mediumGray};
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 10px;
  border-radius: 20px;
`;
