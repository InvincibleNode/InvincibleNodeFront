import styled from "styled-components"
import { StakeBox } from "./stakeBox";
import { UnstakeBox } from "./unstakeBox";
import Modal from "components/modals/modalBackground";

export const StakeINVIModal = ({closeModal, option, setOption}) => {

return(
    <Modal closeModal={closeModal}>
        <Wrapper option={option}>
            <Option>
                <StakeOption option={option === 0}>
                    <StakeButton
                        option={option === 0}
                        onClick={() => {
                            setOption(0);
                    }}>
                    Stake</StakeButton>
                </StakeOption>
                <UnstakeOption option={option === 1}>
                    <UnstakeButton
                        option={option === 1}
                        onClick={() => {
                            setOption(1);
                        }}
                    >Unstake</UnstakeButton>
                </UnstakeOption>
            </Option>
            <InfoWrapper>
                {option === 0 ? <StakeBox closeModal={closeModal}/> : <UnstakeBox closeModal={closeModal}/>}
            </InfoWrapper>
        </Wrapper>
    </Modal>
)

}

const Wrapper = styled.div`
    width: 534px;
    height: ${(props) => (props.option === 0 ? "636px" : "606px")};
    border-radius: 14px;
    background-color: ${(props) => props.theme.colors.lightBlue2};
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.12));   
`;

const Option = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
`;

const StakeOption = styled.div`
    width: 50%;
    height: 72px;
    background-color: ${(props) => (props.option ? props.theme.colors.lightPurple2 : props.theme.colors.lightBlue2)};
    border-radius: 14px 0 0 0;
`;  

const UnstakeOption = styled(StakeOption)`
    border-radius: ${(props) => (props.option ? "0 14px 0px 0px" : "0px 14px 14px 0px")};
`;

const StakeButton = styled.button`
    width: 100%;
    height: 73.88px;
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 16px;
    color: ${(props) => (props.option ? props.theme.colors.blue2 : '#FFFFFF')};
    border: none;
    border-radius: ${(props) => (props.option ? "14px 14px 0px 0px" : "14px 0 14px 0px")};
    background-color: ${(props) => (props.option ? props.theme.colors.lightBlue2 : props.theme.colors.lightPurple2)};
`;

const UnstakeButton = styled(StakeButton)`
border-radius: ${(props) => (props.option ? "14px 14px 0px 0px" : "0 14px 0 14px")};
   
`;

const InfoWrapper = styled.div`
    background-color: ${(props) => props.theme.colors.lightBlue2};
    width: 100%;
    border-radius: 0 0 14px 14px;
`;

