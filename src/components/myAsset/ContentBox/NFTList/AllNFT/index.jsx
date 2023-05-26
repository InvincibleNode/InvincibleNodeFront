import styled from "styled-components";
import theme from "styles/theme";
import AllItem from "./AllItem";
import { useNFT } from "hooks/useNFT";
import { useEffect, useState } from "react";
/**
 * All NFT 탭
 */
const AllNFT = () => {
  const { accountNftData, nftInfo, accountNftIds } = useNFT("All NFTs");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accountNftData && nftInfo && accountNftIds) {
      const newDataForm = accountNftData.map((nft) => {
        switch (nft.color) {
          case "white":
            return {
              color: "linear-gradient(135deg, #9D9D9D, #FDFDFB)",
              timeleft: nft.unstakableDate,
            };
          case "red":
            return {
              color: "linear-gradient(135deg, #DF310A, #FFB800)",
              timeleft: nft.unstakableDate,
            };
          case "blue":
            return {
              color: "linear-gradient(90deg, #61B5F2, #98A1FE)",
              timeleft: nft.unstakableDate,
            };
          default:
            break;
        }
      });

      accountNftIds.forEach((id, idx) => {
        newDataForm[idx] = {
          ...newDataForm[idx],
          id: id,
        };
      });

      nftInfo.forEach((info, idx) => {
        newDataForm[idx] = {
          ...newDataForm[idx],
          principal: info.principal,
          fee: info.protocolFee,
          status: info.isLent,
        };
      });

      setData(newDataForm);
    }
  }, [accountNftData, nftInfo, accountNftIds]);

  return (
    <Container>
      <TitleWrapper>
        <Title>NFT</Title>
        <InfoWrapper>
          <Title>Principal</Title>
          <Title>Protocol Fee</Title>
          <Title>Timeleft</Title>
        </InfoWrapper>
        <Title>Status</Title>
      </TitleWrapper>
      {data.map((da) => (
        <AllItem {...da} key={da.id} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 70px 50px 70px;
  background-color: ${theme.colors.darkGray};
  border-radius: 20px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 130px 0px 120px;
  box-sizing: border-box;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 48px;
  margin-left: 20px;
`;

const Title = styled.span`
  ${theme.fonts.Font_Heading_4_1};
  color: ${theme.colors.mediumGray};
`;

export default AllNFT;
