import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlainBlueButton } from "styles/styledComponents/Buttons/blueButton";
import BlueNFT from "assets/icons/NFTstates/circleBlue.svg";
import RedNFT from "assets/icons/NFTstates/circleRed.svg";
import { fixBalance } from "utils/fixBalance";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { convertUnixTimeToDate } from "utils/time/convertUnixTimeToDate";
import BorrowModal from "./modals/borrowModal";
import RepayModal from "./modals/repayModal";
import SuccessModal from "./modals/successModal";
import { BigNumber } from "ethers";

/**
 *
 */
const LoanRow = ({ nftId, nftInfo, maxLTVPercent }) => {
  const [lendStatus, setLendStatus] = useState(0);
  const [nftStatus, setNftStatus] = useState(0);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [maxLTVInvi, setMaxLTVInvi] = useState(0);
  const network = useRecoilValue(networkAtom);
  const [successOption, setSuccessOption] = useState("0");

  useEffect(() => {
    console.log("nftId", nftId);
    console.log("nftInfo", nftInfo);
    console.log("maxLTVPercent", maxLTVPercent);
    setMaxLTVInvi(nftInfo.evaluation * maxLTVPercent);

    const daysLeft = Math.ceil(
      (nftInfo.lockEnd * 1000 - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysLeft <= 100) {
      setNftStatus(1);
    }

    if (nftInfo.isLent == true) setLendStatus(1);
  }, []);

  return (
    <>
      {showBorrowModal ? (
        <BorrowModal
          closeModal={() => {
            setShowBorrowModal(false);
          }}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessOption={setSuccessOption}
          info={{
            nftId: nftId,
            nftInfo: nftInfo,
            maxLTVPercent: maxLTVPercent,
            maxLTVInvi: maxLTVInvi,
            nftStatus: nftStatus,
          }}
        />
      ) : showRepayModal ? (
        <RepayModal
          closeModal={() => {
            setShowRepayModal(false);
          }}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessOption={setSuccessOption}
          info={{
            nftId: nftId,
            nftInfo: nftInfo,
            maxLTVPercent: maxLTVPercent,
            maxLTVInvi: maxLTVInvi,
            nftStatus: nftStatus,
          }}
        />
      ) : (
        showSuccessModal && (
          <SuccessModal
            closeModal={() => {
              setShowSuccessModal(false);
              window.location.reload();
            }}
            option={successOption}
            info={{
              nftId: nftId,
              nftInfo: nftInfo,
              maxLTVPercent: maxLTVPercent,
              maxLTVInvi: maxLTVInvi,
              nftStatus: nftStatus,
            }}
          />
        )
      )}
      <Wrapper>
        <Row>
          <Cell1>
            <NftCircle src={nftStatus == 0 ? BlueNFT : RedNFT}></NftCircle>
            <NftId>{nftId.toString().padStart(5, "0")}</NftId>
          </Cell1>
          <Cell2>{fixBalance(nftInfo.principal, network)}</Cell2>
          <Cell3>{fixBalance(nftInfo.evaluation, network)}</Cell3>
          <Cell4>{convertUnixTimeToDate(nftInfo.lockEnd)}</Cell4>
          <Splitter>|</Splitter>
          <Cell5>{fixBalance(maxLTVInvi, network) + " INVI"}</Cell5>
          <Cell6>
            {lendStatus === 0 ? (
              <BorrowButton
                onClick={() => {
                  setShowBorrowModal(true);
                }}
              >
                Borrow
              </BorrowButton>
            ) : (
              <RepayButton
                onClick={() => {
                  setShowRepayModal(true);
                }}
              >
                Repay
              </RepayButton>
            )}
          </Cell6>
        </Row>
      </Wrapper>{" "}
    </>
  );
};

export default LoanRow;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 15px;

  background-color: ${(props) => props.theme.colors.lightBlue2};
`;
const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 4px 24px;
  height: 70px;
`;

const Cell = styled.div`
  font-size: 14px;
  margin: auto;
  text-align: center;
`;

const Cell1 = styled(Cell)`
  width: 15%;
  display: flex;
  justify-content: center;
`;
const NftCircle = styled.img``;
const NftId = styled.span`
  margin-left: 10px;
`;
const Cell2 = styled(Cell)`
  width: 15%;
`;
const Cell3 = styled(Cell)`
  width: 15%;
`;
const Cell4 = styled(Cell)`
  width: 15%;
`;
const Cell5 = styled(Cell)`
  width: 20%;
  display: flex;
  justify-content: space-evenly;
`;
const Cell6 = styled(Cell)`
  width: 15%;
`;

const Splitter = styled.div`
  font-size: 30px;
  margin: auto;
  color: ${(props) => props.theme.colors.lightPurple1};
`;

const BorrowButton = styled(PlainBlueButton)`
  margin: auto;
  width: 100px;
  height: 40px;
`;

const RepayButton = styled(BorrowButton)`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.blue1};
  border: 1px solid ${(props) => props.theme.colors.blue1};
`;
