import styled from "styled-components";
import { BlueButton } from "styles/styledComponents/Buttons/blueButton";
import equal from "../../../assets/icons/equalSimilar.svg";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import LendingPoolTx from "utils/web3/transactions/LendingPoolTx";
import units from "../../../units/units.json";
import pendingToast from "components/common/toast/pendingToast";

const BorrowAmount = ({
  info,
  closeModal,
  setSuccessOption,
  setShowSuccessModal,
}) => {
  const network = useRecoilValue(networkAtom);
  const lendingPoolTx = new LendingPoolTx(network);

  const pendingToastMsg = {
    success: {
      stake: {
        title: "Successfully borrowed INVI",
        message: "Please check deposited INVI in your wallet.",
      },
    },
    error: {
      title: "Spotty connection",
      message:
        "While sending, transaction wasn’t broadcasted. Something went wrong. Please try again. ",
    },
    pending: {
      title: "Pending...",
      message:
        "Waiting for the transaction to be broadcaste and included in a block",
    },
  };

  //TODO : 추후에 사용자가 입력한 비율로 빌리도록 수정
  const borrow = async () => {
    const maxLendRatio = await lendingPoolTx.getMaxLendRatio();
    console.log("maxLendRatio : ", maxLendRatio);
    // slippage 1%로 고정
    const slippage = 1;

    console.log("info.nftId : ", info.nftId, slippage);
    const lendInfo = await lendingPoolTx.createLendInfo(info.nftId, slippage); //지금은 그냥 maxLendRatio 비율로 빌림
    console.log("lendInfo : ", lendInfo);

    await lendingPoolTx.lend(lendInfo).then((txResult) => {
      closeModal();
      setSuccessOption({
        title: "Borrow",
        amount: fixBalance(info.maxLTVInvi, network),
        token: "INVI",
      });
      setShowSuccessModal(true);
    });
  };

  return (
    <Wrapper>
      <BorrowInfo>
        <LtvBox>
          <LtvTitle>LTV</LtvTitle>
          <LtvValue>{info.maxLTVPercent * 100 + "%"}</LtvValue>
        </LtvBox>
        <EqualImg src={equal}></EqualImg>
        <BorrowBox>
          <BorrowTitle>Borrow</BorrowTitle>
          <BorrowValue>{fixBalance(info.maxLTVInvi, network)} INVI</BorrowValue>
        </BorrowBox>
      </BorrowInfo>

      <ConfirmButton
        onClick={async () => {
          pendingToast(borrow(), pendingToastMsg, "stake");
        }}
      >
        Confirm
      </ConfirmButton>
    </Wrapper>
  );
};

export default BorrowAmount;

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
`;
const BorrowInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const LtvBox = styled.div`
  background-color: ${({ theme }) => theme.colors.realWhite};
  width: 150px;
  height: 100px;
  border-radius: 15px;
`;
const EqualImg = styled.img`
  margin-left: 5px;
  margin-right: 5px;
`;
const BorrowBox = styled(LtvBox)`
  width: 250px;
`;

const ConfirmButton = styled(BlueButton)`
  width: 100%;
  height: 60px;
  font-weight: 700;
  font-size: 2rem;
`;

const LtvTitle = styled.div`
  margin-top: 15px;
  margin-left: 15px;
  font-size: 1.4rem;
  font-weight: 600;
`;
const LtvValue = styled.div`
  text-align: right;
  margin-right: 15px;
  margin-top: 30px;
  font-size: 1.4rem;
  font-weight: 600;
`;

const BorrowTitle = styled.div`
  margin-top: 15px;
  margin-left: 15px;
  font-size: 2rem;
  font-weight: 700;

  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const BorrowValue = styled(BorrowTitle)`
  text-align: right;
  margin-right: 15px;
  margin-top: 20px;
  font-size: 2rem;
  font-weight: 700;
`;
