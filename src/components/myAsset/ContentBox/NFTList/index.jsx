import { useNFT } from "hooks/useNFT";
import styled from "styled-components";
import NFT from "./NFT";
import { useState, useEffect } from "react";
import Empty from "./Empty";
import AllNFT from "./AllNFT";
import { TYPES } from "components/myAsset/NavBar/NFTBox";
import { Modal } from "@qve-ui/qds";
import ModalInner from "../ModalInner";

const NFTList = ({ curType, curSelect, onLength }) => {
  const { accountNftData } = useNFT(curType);
  const [curData, setCurData] = useState(accountNftData);
  const [nftIdx, setNftIdx] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setCurData(accountNftData);
    switch (curSelect) {
      case "Forthcoming":
        setCurData((prev) => prev.filter((p) => p.color === "red"));
        break;
      case "Ongoing":
        setCurData((prev) => prev.filter((p) => p.color === "blue"));
        break;
      case "Expired":
        setCurData((prev) => prev.filter((p) => p.color === "white"));
        break;
      default:
        break;
    }
  }, [curSelect, accountNftData]);

  useEffect(() => {
    onLength(curData.length);
  }, [curData]);

  return (
    <Container>
      {modal && (
        <Modal isOpen={modal} onClose={() => setModal(false)} xButton={true}>
          <ModalInner nftData={curData[nftIdx]} />
        </Modal>
      )}
      {curType === TYPES[0].title ? (
        <AllNFT />
      ) : curData.length > 0 ? (
        curData.map((data, idx) => (
          <NFT
            nftData={data}
            key={`${data.unstakableDate}_${idx}`}
            onClick={() => {
              setNftIdx(idx);
              setModal(true);
            }}
          />
        ))
      ) : (
        <Empty />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
`;

export default NFTList;
