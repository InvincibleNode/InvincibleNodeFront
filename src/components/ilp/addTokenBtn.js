import styled from "styled-components";
import addIcon from "assets/icons/addIcon.svg";
import { useState } from "react";
import { AddTokenModal } from "./addTokenModal/addTokenModal";

export const AddTokenBtn = () => {
    const [showModal, setShowModal] = useState(false);
    
    return (
    <>
        {showModal && (
            <AddTokenModal
              closeModal={() => {
                setShowModal(false);
              }}
            />
          )}
        <BtnWrapper onClick={() => {setShowModal(true)}}>
            <AddIcon>
                <img src={addIcon} alt="addIcon"/>
            </AddIcon>
            <BtnText>Add token</BtnText>
        </BtnWrapper>
    </>
    )
}

const BtnWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 10rem;
    border-bottom: 1px solid #FFFFFF;
    padding: 1rem 0;
    margin: 0 auto;
    margin-top: 6rem;
    margin-bottom: 15rem;
`;

const AddIcon = styled.div``;

const BtnText = styled.div`
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 1.4rem;
    color: #FFFFFF;
`;
