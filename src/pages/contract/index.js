import styled from "styled-components";
import landing_background from "assets/images/landingpage_background.png";
import Card from "./card";
import { useRecoilValue } from "recoil";
import { networkAtom } from "store/network";
import getContract from "utils/web3/getContract";
import { useEffect, useState } from "react";
import Header from "components/common/header/header";
import { Background } from "styles/styledComponents/background";

const ContractPage = () => {
  const network = useRecoilValue(networkAtom);
  const [contracts, setContracts] = useState({});

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
  }, [showTooltip]);

  useEffect(() => {
    const objects = getContract(network);
    setContracts(objects);
  }, [network]);

  return (
    <>
      <Background launchApp={true}>
        <Header launchApp={true} showTooltip={showTooltip} />

        <TitleText>Contract information</TitleText>
        <GridTable>
          {contracts &&
            Object.entries(contracts).map(([name, contract]) => (
              <Card name={name} contract={contract} />
            ))}
        </GridTable>
      </Background>
    </>
  );
};

export default ContractPage;

const GridTable = styled.div`
  width: 80%;
  margin: auto;
  max-width: 1200px;
  display: grid;
  gap: 8rem;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  margin-top: 10rem;
`;

const TitleText = styled.div`
  font-family: Montserrat;
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-top: 54px;
  text-align: center;
`;
