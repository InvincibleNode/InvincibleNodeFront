import styled from "styled-components";
import Skeleton from "./Skeleton";

const LoadingSpinner = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <Skeleton style={{ width: "40px", height: "50px" }} />
      <Skeleton style={{ width: "40px", height: "100px" }} />
      <Skeleton style={{ width: "40px", height: "70px" }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
`;

export default LoadingSpinner;
