import styled from "styled-components";
import {
  BlueButton,
  PlainBlueButton,
} from "styles/styledComponents/Buttons/blueButton";
import TooltipIconQuestion from "../../../assets/icons/tooltipIconQuestion.svg";
import { useEffect, useState } from "react";
import { InfoRows } from "components/buyEarn/infoRows";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { fixBalance } from "utils/fixBalance";
import LendingPoolTx from "utils/web3/transactions/LendingPoolTx";
import { accountAtom } from "store/account";
import { BigNumber } from "ethers";
import pendingToast from "components/common/toast/pendingToast";
const Web3 = require("web3");
const web3 = new Web3();

const RepayAmount = ({
  closeModal,
  info,
  setSuccessOption,
  setShowSuccessModal,
}) => {
  const network = useRecoilValue(networkAtom);
  const lendingPoolTx = new LendingPoolTx(network);
  const [showPeriodTooltip, setShowPeriodTooltip] = useState(false);
  const [repayAmount, setRepayAmount] = useState(0.0);

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

  function handleMaxClick() {
    setRepayAmount(fixBalance(info.maxLTVInvi, network)); // set the input value to 15 when the "Max" button is clicked
  }

  function handleInputChange(e) {
    setRepayAmount(e.target.value);
  }

  async function repayInvi() {
    //TODO : 실제 유저가 입력한 repayAmount 값으로 변경하기.
    const tmpRepayAmount = web3.utils.toBN(repayAmount * 10 ** 18);
    await lendingPoolTx.repay(info.nftId, tmpRepayAmount).then((txResult) => {
      closeModal();
      setSuccessOption({
        title: "Repay",
        amount: fixBalance(tmpRepayAmount, network),
        token: "INVI",
      });
      setShowSuccessModal(true);
    });
  }

  return (
    <Wrapper>
      <RepayInfo>
        <Title>Repayment</Title>
        <Description>
          <AmountText>
            Amount to repay
            <TooltipIcon
              TooltipIcon={TooltipIconQuestion}
              onMouseEnter={() => setShowPeriodTooltip(true)}
              onMouseLeave={() => setShowPeriodTooltip(false)}
            >
              {showPeriodTooltip && (
                <Tooltip>
                  <TooltipTitle>Where will repaid INVI go?</TooltipTitle>
                  <TooltipDesc>
                    <span>Repaid INVI will be burned</span>
                  </TooltipDesc>
                </Tooltip>
              )}
            </TooltipIcon>
          </AmountText>
          <BalanceText>
            Balance {fixBalance(info.maxLTVInvi, network)} INVI
          </BalanceText>
        </Description>
        <InputBox>
          <Input type="text" value={repayAmount} onChange={handleInputChange} />
          <MaxWrapper>
            <MaxButton type="button" onClick={handleMaxClick}>
              MAX
            </MaxButton>
            <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              {" "}
              INVI{" "}
            </span>
          </MaxWrapper>
        </InputBox>
      </RepayInfo>

      <ConfirmButton
        onClick={async () => {
          pendingToast(repayInvi(), pendingToastMsg, "stake");
        }}
      >
        Repay
      </ConfirmButton>
    </Wrapper>
  );
};

export default RepayAmount;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
`;

const RepayInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  gap: 1.2rem;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.realWhite};
  margin-bottom: 20px;
`;

const Title = styled.div`
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`;
const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 13px;
`;
const AmountText = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;
const BalanceText = styled.div`
  font-weight: 400;
  font-size: 1.1rem;
`;

const TooltipIcon = styled.div`
  display: inline-block;
  position: relative;
  background-image: ${(props) => `url(${props.TooltipIcon})`};
  background-size: cover;
  width: 12px;
  height: 12px;
  margin-left: 10px;
`;

const Tooltip = styled.div`
  position: absolute;
  width: 203px;

  top: calc(100% + 12px);
  left: calc(50% + 90px);
  transform: translateX(-50%);
  text-align: center;
  background-color: ${(props) => props.theme.colors.blue3};
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: white;
  z-index: 100;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: calc(50% - 90px);
    transform: rotate(180deg);
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.blue3} transparent transparent
      transparent;
  }
`;

const TooltipTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 14px;
`;

const TooltipDesc = styled.div`
  width: 203px;

  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  text-align: justify;
  line-height: 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.div`
  display: flex;

  margin-left: 30px;
  margin-right: 30px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.blue1};
  height: 30px;
`;
const Input = styled.input`
  width: 100%;
  padding-left: 1rem;
`;
const MaxWrapper = styled.div`
  width: 150px;
  display: flex;

  span {
    margin: auto;
  }
`;
const MaxButton = styled(PlainBlueButton)`
  width: 50px;
  margin: auto;
  font-weight: 400;
`;

const ConfirmButton = styled(BlueButton)`
  width: 100%;
  height: 60px;
  font-weight: 700;
  font-size: 2rem;
`;
