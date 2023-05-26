import { useEffect, useState } from "react";
import styled from "styled-components";
import { fixAddress } from "utils/fixAddress";
import { testFunctions } from "./testFunctions";

const Card = ({ name, contract }) => {
  const [txResult, setTxResult] = useState({});

  useEffect(() => {
    console.log("contract : ", contract);
    console.log("address : ", contract._address);

    if (contract._address) {
      getTxResults();
    }
  }, []);

  const getTxResults = async () => {
    const functions = testFunctions[name];
    functions.forEach(async (func) => {
      const result = await contract.methods[func]().call();
      setTxResult((prev) => {
        return {
          ...prev,
          [func]: result,
        };
      });
    });
  };

  const ContractInfo = () => {
    return (
      <>
        <Address>{fixAddress(contract._address, 20)}</Address>
        {Object.entries(txResult).map(([key, value]) => (
          <InfoBox>
            <InfoTitle>{key}</InfoTitle>
            <InfoText>
              {value.length > 20 ? value.slice(0, 20) + "..." : value}
            </InfoText>
          </InfoBox>
        ))}
      </>
    );
  };

  return (
    <Container>
      <Name>{name}</Name>
      <InfoContainerBox>
        {contract._address !== undefined ? (
          <ContractInfo />
        ) : (
          <>
            <ErrorMessage>ERROR</ErrorMessage>
            <ErrorMessage>ERROR</ErrorMessage>
            <ErrorMessage>ERROR</ErrorMessage>
            <ErrorMessage>ERROR</ErrorMessage>
          </>
        )}
      </InfoContainerBox>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Name = styled.div`
  position: absolute;
  top: -1rem;
  font-size: 2rem;
  font-weight: 400;
  color: white;
`;

const InfoContainerBox = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4rem 0rem;
  background-color: white;
  border-radius: 1rem;
  min-height: 200px;
  border: 1px solid black;
`;

const Address = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
`;

const InfoTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const InfoText = styled.div`
  font-size: 1rem;
  font-weight: 300;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: red;
`;
