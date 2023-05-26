import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlainBlueButton } from "styles/styledComponents/Buttons/blueButton";
import SimpleBar from "simplebar-react";
import exitWhite from "assets/icons/exitWhite.svg";
import exitBlack from "assets/icons/exitBlack.svg";

import "simplebar/dist/simplebar.min.css";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { TimestampToDate } from "utils/time/timestampToDate";
import { fixAddress } from "utils/fixAddress";
import { routeBuyEarn, routeLoan } from "components/common/routePath";
import { useNavigate } from "react-router-dom";
import { LeverageInfoData } from "./leverageInfoData";
import { LoanInfoData } from "./loanInfoData";
import LendingPoolTx from "utils/web3/transactions/LendingPoolTx";
import InviCoreTx from "utils/web3/transactions/InviCoreTx";
import { accountAtom } from "store/account";
import pendingToast from "components/common/toast/pendingToast";

/**
 * @path index.js -> rightNft.js -> nftGrid.js -> nftModal.js -> nftData.js
 */
const NftData = ({ closeModal, nftData, stakeInfos, nftId }) => {
  //------useStates------//
  const [leverageInfoData, setLeverageInfoData] = useState([]);
  const [loanInfoData, setLoanInfoData] = useState([]);
  let navigate = useNavigate();

  const pendingToastMsg = {
    success: {
      title: "Successfully NFT Unstaked",
      message:
        "Unstaking NFT transaction is included in a block. It will be deposit into your wallet in 2 weeks.",
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

  //------useRecoils------//
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);

  //----Tx objects----//
  const lendingPoolTx = new LendingPoolTx(network);
  const inviCoreTx = new InviCoreTx(network);

  //------functions------//
  const getData = async () => {
    const loanData = await LoanInfoData(
      stakeInfos,
      network,
      nftData,
      lendingPoolTx,
      nftId
    );
    setLeverageInfoData(LeverageInfoData(stakeInfos, network));
    setLoanInfoData(loanData);
  };

  const repayNFT = async () => {
    await inviCoreTx.repayNFT(account, nftId).then((txResult) => {
      //successfully repayNFT
      getData();
    });
    closeModal();
  };

  //------useEffects------//
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper isLent={stakeInfos.isLent}>
      <ExitButton
        isLent={stakeInfos.isLent}
        src={stakeInfos.isLent ? exitWhite : exitBlack}
        onClick={() => {
          closeModal();
        }}
      ></ExitButton>
      <ScrollBar scrollbarMinSize={100} scrollbarMaxSize={200} autoHide={true}>
        <InnerWrapper>
          <NftInfo>
            <Title isLent={stakeInfos.isLent} color={nftData.color}>
              NFT Info
            </Title>
            <InfoBox isLent={stakeInfos.isLent}>
              <InfoBoxLine isLent={stakeInfos.isLent}>
                <span>Token ID</span>
                <span>{stakeInfos.principal}</span>
              </InfoBoxLine>
              <InfoBoxLine isLent={stakeInfos.isLent}>
                <span>Token Standard</span>
                <span>x{stakeInfos.leverageRatio / 10 ** 5}</span>
              </InfoBoxLine>
              <InfoBoxLine isLent={stakeInfos.isLent}>
                <span>Network</span>
                <span>{network.name}</span>
              </InfoBoxLine>
            </InfoBox>
            <InfoBox isLent={stakeInfos.isLent}>
              <InfoBoxLine isLent={stakeInfos.isLent}>
                <span>Status</span>
                <span>Success</span>
              </InfoBoxLine>
              <InfoBoxLine isLent={stakeInfos.isLent}>
                <span>Creation Date</span>
                <span>{TimestampToDate(stakeInfos.lockStart)}</span>
              </InfoBoxLine>
            </InfoBox>
            <InfoBox isLent={stakeInfos.isLent}>
              <InfoBoxLine isLent={stakeInfos.isLent}>
                <span>Owner</span>
                <span>{fixAddress(stakeInfos.user, 15)}</span>
              </InfoBoxLine>
              <InfoBoxLine isLent={stakeInfos.isLent}>
                <span>Creator</span>
                <span>{fixAddress(stakeInfos.user, 15)}</span>
              </InfoBoxLine>
            </InfoBox>
          </NftInfo>
          <LeverageInfo>
            <Title isLent={stakeInfos.isLent} color={nftData.color}>
              Leverage Info
            </Title>
            <InfoLines>
              {leverageInfoData.map((data, index) => (
                <InfoLine isLent={stakeInfos.isLent} key={`leverage-${index}`}>
                  <span>{data.title}</span>
                  <span>{data.value}</span>
                </InfoLine>
              ))}
            </InfoLines>
          </LeverageInfo>
          <LoanInfo>
            <Title isLent={stakeInfos.isLent} color={nftData.color}>
              Loan Info
            </Title>
            <InfoLines>
              {loanInfoData.map((data, index) => (
                <InfoLine isLent={stakeInfos.isLent} key={`loan-${index}`}>
                  <span>{data.title}</span>
                  <span>{data.value}</span>
                </InfoLine>
              ))}
            </InfoLines>
          </LoanInfo>
          <Buttons>
            {nftData.color === "white" && !stakeInfos.isLent ? (
              <UnstakeButton
                onClick={async () => {
                  pendingToast(repayNFT(), pendingToastMsg);
                }}
              >
                Unstake
              </UnstakeButton>
            ) : (
              ""
            )}
            <Button
              color={nftData.color}
              onClick={() => {
                if (stakeInfos.isLent) {
                  routeLoan(navigate);
                } else {
                  routeLoan(navigate);
                }
                closeModal();
              }}
            >
              {stakeInfos.isLent ? "Repay" : "Loan"}
            </Button>
          </Buttons>
        </InnerWrapper>
      </ScrollBar>
    </Wrapper>
  );
};

export default NftData;

const Wrapper = styled.div`
  width: 500px;
  background: ${(props) =>
    props.isLent ? "rgba(11, 11, 11, 0.3);" : props.theme.colors.lightBlue2};
  backdrop-filter: blur(50px);
  height: 95%;
  margin: auto;
  margin-right: 10px;
  border-radius: 14px;
`;

const ExitButton = styled.img`
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const ScrollBar = styled(SimpleBar)`
  margin-top: 30px;
  height: 90%;
  margin-right: 10px;

  .simplebar-content-wrapper {
    scrollbar-width: auto;
    -ms-overflow-style: auto;
    height: 300px;
  }
  .simplebar-scrollbar::before {
    background-color: ${(props) => props.theme.colors.white};
  }
  .simplebar-hide-scrollbar::-webkit-scrollbar {
    display: initial;
    width: initial;
    height: 300px;
  }
`;
const InnerWrapper = styled.div`
  width: 450px;
  margin-left: 20px;
`;
const Title = styled.div`
  text-align: center;
  color: ${(props) =>
    props.isLent
      ? props.theme.colors.white
      : props.color === "blue"
      ? props.theme.colors.blue1
      : props.color === "red"
      ? props.theme.colors.forthcomingRed
      : props.theme.colors.darkGray};
  font-size: 16px;
  padding: 10px 20px 10px 20px;
  border-radius: 30px;
  border: 1px solid
    ${(props) =>
      props.color === "blue"
        ? props.theme.colors.blue1
        : props.color === "red"
        ? props.theme.colors.forthcomingRed
        : props.theme.colors.darkGray};
  background-color: ${(props) =>
    props.isLent
      ? props.color === "blue"
        ? props.theme.colors.blue1
        : props.color === "red"
        ? props.theme.colors.forthcomingRed
        : props.theme.colors.white
      : ""};
  width: fit-content;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
`;
const InfoBox = styled.div`
  border: 1px solid ${(props) => props.theme.colors.white};
  border-radius: 5px;
  margin-top: 10px;
  background-color: ${(props) =>
    props.isLent ? "" : props.theme.colors.white};
`;
const InfoBoxLine = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    margin: 10px 10px 10px 10px;
    color: ${(props) =>
      props.isLent ? props.theme.colors.white : props.theme.colors.navy};
    font-weight: 400;
  }
`;
const InfoLines = styled.div``;
const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;

  border-top: 1px solid
    ${(props) =>
      props.isLent ? props.theme.colors.navy : props.theme.colors.mediumGray};

  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.navy};
  }
  span {
    margin-top: 5px;
    color: ${(props) =>
      props.isLent ? props.theme.colors.white : props.theme.colors.navy};
  }
`;

const NftInfo = styled.div``;
const LeverageInfo = styled.div``;
const LoanInfo = styled.div``;
const Buttons = styled.div`
  width: 100;
  display: flex;
  justify-content: space-between;
`;
const Button = styled(PlainBlueButton)`
  width: 100%;
  height: 45px;
  margin-top: 50px;
  background-color: ${(props) =>
    props.color === "blue"
      ? props.theme.colors.blue1
      : props.color === "red"
      ? props.theme.colors.forthcomingRed
      : props.theme.colors.white};
  color: ${(props) =>
    props.color === "blue"
      ? props.theme.colors.white
      : props.color === "red"
      ? props.theme.colors.white
      : props.theme.colors.blue1};
`;
const UnstakeButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.blue1};
  width: 120%;
  margin-right: 10px;
  color: ${(props) => props.theme.colors.white};
`;
