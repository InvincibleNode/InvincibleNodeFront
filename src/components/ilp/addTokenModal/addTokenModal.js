import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "components/modals/modalBackground";
import closeIcon from "assets/icons/closeIcon.svg";
import { TokenBox } from "./TokenBox";
import InviTokenTx from "utils/web3/transactions/tokens/InviTokenTx";
import { useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import { networkAtom } from "store/network";
import ISPTTokenTx from "utils/web3/transactions/tokens/ISPTTokenTx";
import ILPTokenTx from "utils/web3/transactions/tokens/ILPTokenTx";
import contractAddress from "../../../addresses/bfc/contractAddress.json";

export const AddTokenModal = ({ closeModal }) => {
  const [tokenBalance, setTokenBalance] = useState({
    inviTokenBalance: 0,
    ilpTokenBalance: 0,
    isptTokenBalance: 0,
  });
  const [networkAddress, setNetworkAddress] = useState({
    inviTokenContractAddress: "",
    iLPTokenContractAddress: "",
    iSPTTokenContractAddress: "",
  });
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);
  const inviTokenTx = new InviTokenTx(network);
  const ilpTokenTx = new ILPTokenTx(network);
  const isptTokenTx = new ISPTTokenTx(network);

  const {
    inviTokenContractAddress,
    iLPTokenContractAddress,
    iSPTTokenContractAddress,
  } = contractAddress;

  const { inviTokenBalance, ilpTokenBalance, isptTokenBalance } = tokenBalance;

  const getData = async () => {
    const inviTokenBalance = await inviTokenTx.getBalance(account.address);
    const ilpTokenBalance = await ilpTokenTx.getBalance(account.address);
    const isptTokenBalance = await isptTokenTx.getBalance(account.address);
    setTokenBalance({ inviTokenBalance, ilpTokenBalance, isptTokenBalance });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getData();
  }, [account]);

  useEffect(() => {
    switch (network.name) {
      case "bifrost":
        setNetworkAddress({
          inviTokenContractAddress,
          iLPTokenContractAddress,
          iSPTTokenContractAddress,
        });
        break;
      case "evmos":
        setNetworkAddress({
          inviTokenContractAddress,
          iLPTokenContractAddress,
          iSPTTokenContractAddress,
        });
        break;
      case "klaytn":
        setNetworkAddress({
          inviTokenContractAddress,
          iLPTokenContractAddress,
          iSPTTokenContractAddress,
        });
        break;
      default:
        break;
    }
  }, [network.name]);

  return (
    <Modal closeModal={closeModal}>
      <ModalWrapper>
        <CloseModal>
          <img src={closeIcon} alt="closeIcon" onClick={closeModal} />
        </CloseModal>
        <Title>
          Welcome!
          <span>Add token to your metamask</span>
        </Title>
        <TokenWrapper>
          <TokenBox
            name={"INVI"}
            desc={"Utility Token"}
            address={networkAddress.inviTokenContractAddress}
            balance={inviTokenBalance}
          />
          <TokenBox
            name={"ILP"}
            desc={"LP incentive Token"}
            address={networkAddress.iLPTokenContractAddress}
            balance={ilpTokenBalance}
          />
          <TokenBox
            name={"ISPT"}
            desc={"Swap Pool LP Token"}
            address={networkAddress.iSPTTokenContractAddress}
            balance={isptTokenBalance}
          />
        </TokenWrapper>
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.div`
  padding: 4.4rem;
  width: 61.2rem;
  height: 39.2rem;
  background: #e7ecff;
  border-radius: 2rem;
  font-family: "Pretendard";
`;

const CloseModal = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  img {
    cursor: pointer;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.navy};
  line-height: 2.4rem;
  gap: 0.2rem;
  margin-bottom: 2.4rem;
  span {
    font-size: 2.2rem;
    font-weight: 800;
    color: ${(props) => props.theme.colors.blue1};
  }
`;

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
