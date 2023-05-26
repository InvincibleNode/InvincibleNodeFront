import styled from "styled-components";
import successLogo from "../../../assets/icons/successLogo.svg";
import externalLink from "../../../assets/icons/externalLink.svg";
import { TextButton } from "styles/styledComponents/Buttons/textButton";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import Modal from "components/modals/modalBackground";

const SuccessModal = ({ closeModal, option, info }) => {
  const network = useRecoilValue(networkAtom);
  return (
    <Modal closeModal={closeModal}>
      <Wrapper>
        <ExitButton
          onClick={() => {
            closeModal();
          }}
        >
          X
        </ExitButton>
        <SuccessLogo src={successLogo}></SuccessLogo>
        <SuccessText>Success!</SuccessText>
        <ResultWrapper>
          <span>{option === "0" ? "Borrowed" : "Repaid"}</span>
          <BorrowedAmount>{fixBalance(info.maxLTVInvi, network)} INVI</BorrowedAmount>
        </ResultWrapper>
        <CheckWalletButton>Check your wallet</CheckWalletButton>
        <ViewExplorerButton>
          <img src={externalLink} alt=""></img>
          View explorer
        </ViewExplorerButton>
      </Wrapper>
    </Modal>
  );
};

export default SuccessModal;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 450px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ExitButton = styled(TextButton)`
  margin-left: 80%;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.navy};
`;
const SuccessLogo = styled.img`
  width: 100px;
`;
const SuccessText = styled.div`
  font-size: 20px;
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.blue1};
`;
const ResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.colors.blue1};
  border-radius: 10px;
  height: 50px;

  span {
    margin: auto;
    font-size: 14px;
  }
`;
const BorrowedAmount = styled.div`
  margin: auto;
  color: ${({ theme }) => theme.colors.blue1};
  font-size: 20px;
  margin-right: 20px;
`;
const CheckWalletButton = styled(TextButton)`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.blue1};
  margin-bottom: 30px;
`;
const ViewExplorerButton = styled(TextButton)`
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 30px;
`;
