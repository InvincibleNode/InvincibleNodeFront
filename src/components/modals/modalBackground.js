import styled from "styled-components";
import React from "react";

function Modal(props){

    const clickModalOutside = (e) => {
         if (e.target === e.currentTarget)
          props.closeModal()
        
      };

    return (
        <ModalBackground onClick={(e)=>clickModalOutside(e)} tabIndex="-1">
            {props.children}
        </ModalBackground>
    )
}

export default Modal;

const ModalBackground = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0%;
  top: 0%;
  background: rgba(11, 11, 11, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 10;
`;