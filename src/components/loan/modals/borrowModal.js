import styled from "styled-components";
import NftInfoBorrow from "./nftInfoBorrow";
import BorrowAmount from "./borrowAmount";
import Modal from "components/modals/modalBackground";

const BorrowModal = ({
  closeModal,
  info,
  setSuccessOption,
  setShowSuccessModal,
}) => {
  return (
    <Modal closeModal={closeModal}>
      <Wrapper>
        <Title>Borrow</Title>
        <Contents>
          <NftInfoBorrow info={info}></NftInfoBorrow>
          <BorrowAmount
            closeModal={closeModal}
            info={info}
            setSuccessOption={setSuccessOption}
            setShowSuccessModal={setShowSuccessModal}
          ></BorrowAmount>
        </Contents>
      </Wrapper>
    </Modal>
  );
};

export default BorrowModal;

const Wrapper = styled.div`
  width: 477px;
  filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.12));
  background-color: ${(props) => props.theme.colors.blue1};
  border-radius: 14px;
  position: relative;
`;

const Title = styled.div`
  padding: 2rem 0;
  font-weight: 800;
  font-size: 22px;
  text-align: center;
  color: white;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;

  top: 73px;
  width: 477px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.lightPurple2};
`;
