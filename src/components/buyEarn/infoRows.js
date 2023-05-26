import { useState } from "react";
import styled from "styled-components";
import { BoxInfo } from "./boxInfo";
import ViewBtn from "assets/icons/icon_down_purple.svg";
import CloseBtn from "assets/icons/icon_up_purple.svg";
import { BoldText } from "styles/styledComponents/boldText";
import { LightText } from "styles/styledComponents/lightText";
import { Button } from "styles/styledComponents/button";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import { accountAtom } from "store/account";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import liquidityCircle from "assets/icons/liquidityCircle.svg";
import chatBot from "assets/icons/chatBot.svg";

/**
 *
 * @path index.js -> buyEarn.js -> buyEarnInfo.js -> infoRows.js
 */
export const InfoRows = ({ option }) => {
  const [view, setView] = useState(0);
  const [data, setData] = useState([]);
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);

  const inviTokenStakeTx = new InviTokenStakeTx(network);

  async function fetchData() {
    const dataArr = [];
    if (option === 0 && view === 0) {
      for (let i = 0; i < 3; i++) {
        const boxInfo = await BoxInfo(option, view, i, network, account.address);
        dataArr.push(boxInfo);
      }
    } else if (option === 0 && view === 1) {
      for (let i = 0; i < 7; i++) {
        const boxInfo = await BoxInfo(option, view, i, network, account.address);
        dataArr.push(boxInfo);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const boxInfo = await BoxInfo(option, view, i, network, account.address);
        dataArr.push(boxInfo);
      }
    }
    setData(dataArr);
    console.log(dataArr);
  }

  async function claimReward() {
    await inviTokenStakeTx.receiveNativeReward(account.address);
    await inviTokenStakeTx.receiveInviReward(account.address);
  }

  useEffect(() => {
    fetchData();
    console.log(account);
  }, [option, view, account]);

  return (
    <Wrapper>
      {/* row1 */}

      {option === 0 ? (
        <InfoBox option={option}>
          <InfoRow small={view === 0} gap={0}>
            <InfoLine>
              <InfoTitle>
                <img src={liquidityCircle}></img>
                {data[0]?.[0]}
              </InfoTitle>
              <InfoValue>{data[0]?.[1]} ILP</InfoValue>
            </InfoLine>
            <InfoLine>
              <InfoTitle>
                <img src={liquidityCircle}></img>
                {data[1]?.[0]}
              </InfoTitle>
              <InfoValue>{data[1]?.[1]} KLAY</InfoValue>
            </InfoLine>
          </InfoRow>
        </InfoBox>
      ) : (
        <InfoBox>
          <Row small={true}>
            <SmallBox>
              <Title>{data[0]?.[0]}</Title>
              <Value>{data[0]?.[1]}</Value>
            </SmallBox>{" "}
            <SmallBox>
              <ClaimBox>
                <Title>{data[1]?.[0]}</Title>
                <ClaimButton
                  onClick={async () => {
                    await claimReward();
                  }}
                >
                  claim
                </ClaimButton>
              </ClaimBox>
              <Value>{data[1]?.[1]}</Value>
            </SmallBox>{" "}
            <SmallBox>
              <Title>{data[2]?.[0]}</Title>
              <Value>{data[2]?.[1]}</Value>
            </SmallBox>
          </Row>
        </InfoBox>
      )}

      <RowBox view={view}>
        {/* row2,3 */}
        {option == 0 && view === 1 && (
          <>
            <BoxTitle>
              <img src={chatBot}></img>
              <span>You</span>
            </BoxTitle>
            <Row small={false}>
              <BigBox>
                <Title>{data[2]?.[0]}</Title>
                <Value>{data[2]?.[1]}</Value>
              </BigBox>
              <BigBox>
                <Title>{data[3]?.[0]}</Title>
                <Value>{data[3]?.[1]}</Value>
              </BigBox>
            </Row>
            <Row small={true} gap={0}>
              <SmallBox>
                <Title>{data[4]?.[0]}</Title>
                <Value>{data[4]?.[1]}</Value>
              </SmallBox>{" "}
              <SmallBox>
                <Title>{data[5]?.[0]}</Title>
                <Value>{data[5]?.[1]}</Value>
              </SmallBox>{" "}
              <SmallBox>
                <Title>{data[6]?.[0]}</Title>
                <Value>{data[6]?.[1]}</Value>
              </SmallBox>
            </Row>
          </>
        )}
      </RowBox>

      {/* view button */}
      {option === 0 ? (
        <ViewButton onClick={() => setView(view === 0 ? 1 : 0)}>
          {view === 0 ? (
            <>
              <img src={ViewBtn} alt="moreBtn" />
              <span>view</span>
            </>
          ) : (
            <>
              <img src={CloseBtn} alt="moreBtn" />
              <span>close</span>
            </>
          )}
        </ViewButton>
      ) : (
        <EmptySpace></EmptySpace>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 0px 0px 20px 20px;
  background-color: ${(props) => props.theme.colors.lightBlue2};
`;
const RowBox = styled.div`
  margin-bottom: 6.4rem;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid ${(props) => props.theme.colors.realWhite};
  background-color: ${(props) => props.theme.colors.lightBlue2};
`;

const BoxTitle = styled.div`
  display: flex;
  margin-left: 5%;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
  margin-top: 4rem;
  img {
    margin-right: 10px;
  }
  span {
    text-align: left;
    color: ${(props) => props.theme.colors.blue1};
    font-weight: 700;
  }
  margin-bottom: 1.8rem;
`;
const InfoBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.realWhite};
  padding-bottom: ${(props) => (props.option === 0 ? "6.4rem" : "0.5rem")};
  border-radius: ${(props) => (props.option === 0 ? "0px 0px 20px 20px" : "")};
`;
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  background-color: ${(props) => props.theme.colors.realWhite};
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  margin-bottom: 1rem;

  gap: ${(props) => (props.small ? (props.gap === 0 ? "16px" : "49px") : "16px")};
`;
const Title = styled(BoldText)`
  text-align: left;
  font-size: 1.6rem;
`;
const Value = styled(LightText)`
  text-align: right;
  margin-bottom: 5%;
  margin-right: 5%;
  font-weight: 400px;
  margin-top: 14px;
  font-size: 1.4rem;
`;

const InfoTitle = styled(Title)`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;
const InfoValue = styled(InfoTitle)`
  font-size: 1.4rem;
  font-weight: 500;
`;
const Box = styled.div`
  display: flex;
  background: #ecedff;
  border-radius: 14px;
  flex-basis: calc(33.33% - 10px);
  flex-direction: column;
  justify-content: space-between;
`;

const InfoLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 45%;
  justify-content: space-between;
  align-items: center;
`;

const BigBox = styled(Box)`
  height: 48px;
  width: 433px;
  padding: 16px 20px;
  flex-basis: calc(50% - 10px);
`;

const SmallBox = styled(Box)`
  height: 48px;
  padding: 16px 20px;
  flex-basis: calc(33.33% - 10px);
`;
const ClaimBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  align-items: start;
`;
const ClaimButton = styled(Button)`
  width: 55px;
  height: 24px;

  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.blue1};
  font-weight: 400;
  color: white;
  font-size: 14px;
  margin-left: 34px;
`;
const ViewButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 60px;
  margin: auto;
  font-family: "Pretendard";
  background: linear-gradient(140.37deg, #1f53ff 2.52%, #9c1fff 89.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 600px;
  margin-top: 28px;
  margin-bottom: 20px;
  cursor: pointer;
`;
const EmptySpace = styled.div`
  margin-bottom: 3vw;
`;
