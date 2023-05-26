import theme from "styles/theme";
import {
  Caption,
  CardImage,
  Circular,
  CircularInner,
  ContentsWrapper,
  Heading1,
  Heading3,
  Heading35,
  Heading41,
  Heading45,
  Heading6,
  Horizon,
  InfoBox,
  InfoLine,
  InfoWrapper,
  LeverageBox,
  LeverageWrapper,
  MainBox,
  MainHeader,
  MainInnerWrapper,
  ModalWrapper,
  ProgressBar,
  ProgressBarBox,
  ProgressBarWrapper,
  SubCardImg,
  TitleTag,
  TitleWrapper,
  Verical,
} from "./Style/Container";
import { useEffect, useState } from "react";
import { networkAtom } from "store/network";
import { useRecoilValue } from "recoil";
import {
  calculateDuring,
  calculateRemainingDays,
  calculateRemainingTime,
  dateChangerLonger,
  dateChangerShorter,
} from "utils/dateChanger";
import { truncateAddress } from "utils/truncateAddress";
import { floorHex } from "utils/floor";
import Blue from "assets/icons/myassets/blue_card.png";
import Red from "assets/icons/myassets/red_card.png";
import White from "assets/icons/myassets/white_card.png";

/**
 * 공통 부분
 */
const ModalInner = ({ nftData }) => {
  const network = useRecoilValue(networkAtom);
  const [curTheme, setTheme] = useState(false); //false는 staked(white), true는 collateralized(black)
  const [color, setColor] = useState({ color: "", bgColor: "", card: White });
  const [info, setInfo] = useState([]);
  const [leverage, setLeverage] = useState([]);

  const settingStates = () => {
    switch (nftData.color) {
      case "blue":
        setColor({
          color: nftData.isLent ? theme.colors.white : theme.colors.blue1,
          bgColor: "linear-gradient(90deg, #61B5F2, #98A1FE)",
          card: Blue,
        });
        break;
      case "red":
        setColor({
          color: nftData.isLent
            ? theme.colors.white
            : theme.colors.forthcomingRed,
          bgColor: "linear-gradient(135deg, #DF310A, #FFB800)",
          card: Red,
        });
        break;
      case "white":
        setColor({
          color: nftData.isLent ? theme.colors.white : theme.colors.darkGray,
          bgColor: "linear-gradient(135deg, #9D9D9D, #FDFDFB)",
          card: White,
        });
        break;
      default:
        break;
    }

    setTheme(nftData.isLent);
    setInfo([
      [
        {
          caption: "Token ID",
          content: nftData.nftId,
        },
        {
          caption: "Token Standard",
          content: "ERC 721", //TODO
        },
        {
          caption: "Network",
          content: network.token,
        },
      ],
      [
        {
          caption: "Status",
          content: network.isLent ? "Collateralized" : "Staked",
        },
        {
          caption: "Creation Date",
          content: dateChangerLonger(nftData.createDate),
        },
      ],
      [
        {
          caption: "Owner",
          content: truncateAddress(nftData.user),
        },
        {
          caption: "Creator",
          content: truncateAddress(nftData.user),
        },
      ],
    ]);
    setLeverage([
      {
        caption: "Principal",
        content: `${floorHex(nftData.principal, 4)} ${network.token}`,
      },
      {
        caption: "Leveraged",
        content: `${Number(nftData.leverageRatio) / 100000}`,
      },
      {
        caption: "Timelocks",
        content: calculateRemainingDays(nftData.unstakableDate),
      },
      {
        caption: "Unstakable date",
        content: dateChangerShorter(nftData.unstakableDate),
      },
      {
        caption: "Protocol Fees",
        content: `${floorHex(nftData.protocolFee, 4)} ${network.token}`,
      },
      {
        caption: "Current Accured Rewards",
        content: `5 ${network.token} ($~)`, //TODO
      },
    ]);
  };

  useEffect(() => {
    if (nftData) settingStates();
  }, [nftData]);

  return (
    <ModalWrapper
      style={{
        backgroundColor: curTheme
          ? theme.colors.darkGray
          : theme.colors.lightBlue2,
      }}
    >
      <MainBox>
        <CircularInner style={{ background: color.bgColor }} />
        <Circular />
        <SubCardImg src={color.card} alt="subacard" />
        <CardImage src={color.card} alt="card" />
        <MainInnerWrapper>
          <TitleWrapper style={{ color: color.color }}>
            <Caption background={color.bgColor} />
            <Heading41>
              {nftData.color === "blue"
                ? "Ongoing"
                : nftData.color === "red"
                ? "Forthcoming"
                : "Expired"}
            </Heading41>
            <Verical />
            <Heading41>NFT Details</Heading41>
          </TitleWrapper>
          <MainHeader
            style={{
              width: "100%",
              color: color.color,
            }}
          >{`Staking\nNFT`}</MainHeader>
        </MainInnerWrapper>
        <MainInnerWrapper>
          <LeverageBox>
            <TitleTag
              color={color.color}
              style={{ position: "absolute", top: -20, left: 20 }}
            >
              {`x${Number(nftData.leverageRatio) / 100000} Leveraged`}
            </TitleTag>
            <LeverageWrapper>
              <Heading6
                style={{
                  color: curTheme ? theme.colors.mediumGray : theme.colors.navy,
                }}
              >
                Principal
              </Heading6>
              <Heading35 style={{ color: color.color }}>{`${floorHex(
                nftData.principal,
                4
              )} ${network.token}`}</Heading35>
            </LeverageWrapper>
            <LeverageWrapper>
              <Heading6
                style={{
                  color: curTheme ? theme.colors.mediumGray : theme.colors.navy,
                }}
              >
                Protocol Fees
              </Heading6>
              <Heading35 style={{ color: color.color }}>5%</Heading35>
            </LeverageWrapper>
            <LeverageWrapper>
              <Heading6
                style={{
                  color: curTheme ? theme.colors.mediumGray : theme.colors.navy,
                }}
              >
                Timelocks
              </Heading6>
              <Heading35 style={{ color: color.color }}>
                {calculateDuring(nftData.lockPeriod)}
              </Heading35>
            </LeverageWrapper>
          </LeverageBox>
          <ProgressBarBox>
            <InfoLine
              style={{ paddingRight: 10, paddingLeft: 10, color: color.color }}
            >
              <Heading1>Leveraged Rewards</Heading1>
              <span>
                <Heading1>{floorHex(nftData.expectedRewards, 4)}</Heading1>
                <Heading45 style={{ marginLeft: 5 }}>{network.token}</Heading45>
              </span>
            </InfoLine>
            <Heading6
              style={{
                paddingRight: 10,
                paddingLeft: 10,
                textAlign: "end",
                color: curTheme ? theme.colors.white : theme.colors.navy,
              }}
            >{`Expected\n${floorHex(nftData.expectedRewards, 4)} ${
              network.token
            }`}</Heading6>
            <ProgressBarWrapper
              style={{
                backgroundColor: curTheme
                  ? theme.colors.black
                  : theme.colors.darkGray,
              }}
            >
              <ProgressBar ratio={50} background={color.bgColor} />
            </ProgressBarWrapper>
          </ProgressBarBox>
        </MainInnerWrapper>
      </MainBox>
      <InfoBox
        style={{
          backgroundColor: curTheme ? "#0b0b0b5b" : theme.colors.lightGray,
        }}
      >
        <ContentsWrapper>
          <TitleTag color={color.color}>NFT Info</TitleTag>
          {info.map((infoData, idx) => (
            <InfoWrapper
              style={{
                backgroundColor: curTheme ? "" : theme.colors.realWhite,
                border: curTheme ? `1.5px solid ${theme.colors.navy}` : "",
                color: curTheme ? theme.colors.white : theme.colors.darkGray,
              }}
              key={idx}
            >
              {infoData.map((i) => (
                <InfoLine key={i.caption}>
                  <Heading3>{i.caption}</Heading3>
                  <Heading3
                    style={{ whiteSpace: "pre-line", textAlign: "end" }}
                  >
                    {i.content}
                  </Heading3>
                </InfoLine>
              ))}
            </InfoWrapper>
          ))}
        </ContentsWrapper>
        <ContentsWrapper
          style={{
            gap: "7px",
          }}
        >
          <TitleTag color={color.color}>Leverage Info</TitleTag>
          <Horizon
            style={{
              marginTop: 15,
              backgroundColor: curTheme
                ? theme.colors.navy
                : theme.colors.mediumGray,
            }}
          />
          {leverage.map((le) => (
            <>
              <InfoLine
                style={{
                  color: curTheme ? theme.colors.white : theme.colors.darkGray,
                }}
              >
                <Heading3>{le.caption}</Heading3>
                <Heading3>{le.content}</Heading3>
              </InfoLine>
              <Horizon
                style={{
                  backgroundColor: curTheme
                    ? theme.colors.navy
                    : theme.colors.mediumGray,
                }}
              />
            </>
          ))}
        </ContentsWrapper>
      </InfoBox>
    </ModalWrapper>
  );
};

export default ModalInner;
