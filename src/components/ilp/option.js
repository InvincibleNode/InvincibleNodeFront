import styled from "styled-components";


export const Option = ({setOption, option}) => {
    return(
<OptionWrapper>
          <Get onClick={()=>{setOption(0)}} option={option === 0}>
            <p>Get</p>
          </Get>
          <Return onClick={()=>{setOption(1)}} option={option === 1}>
            <p>Return</p>
          </Return>
        </OptionWrapper>
    );
};

const OptionWrapper = styled.div`
  display: flex;
  width: 16rem;
  height: 2.9rem;
  background: #fff;
  border-radius: 3rem;
  justify-content: space-between;
  align-items   : center;
  font-family: Pretendard;
    font-weight: 700;
    font-size: 1.6rem;
    gap: 0.6rem;

`;

const Get = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.8rem;
  height: 100%;
  background: ${({option, theme}) => option ? theme.colors.blue1 : "white"};
  border-radius: 3rem;
  color: ${({option, theme}) => option ? "white" : theme.colors.lightBlue};
  box-shadow: ${({option}) => option && "0px 4px 24px rgba(0, 0, 0, 0.12)"};
  cursor: pointer;
`;

const Return = styled.div`
display: flex;
justify-content: center;
align-items: center;
    width: 8rem;
    height: 100%;
    border-radius: 3rem;
    background: ${({option, theme}) => option ? theme.colors.blue1 : "white"};
    color: ${({option, theme}) => option ? "white" : theme.colors.lightBlue};
    box-shadow: ${({option}) => option && "0px 4px 24px rgba(0, 0, 0, 0.12)"};
    cursor: pointer;
`;
