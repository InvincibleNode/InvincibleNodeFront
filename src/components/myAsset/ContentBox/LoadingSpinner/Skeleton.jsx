import styled, { keyframes } from "styled-components";

/**
 * Skeleton UI
 */
const Skeleton = ({ ...props }) => {
  return <SkeletonUI {...props} />;
};

const shine = keyframes`
    to {
        background-position-x: -200%;
    }
`;

const SkeletonUI = styled.div`
  background: linear-gradient(1000deg, #a0a0a0 5%, #9c9c9c 18%, #8c8c8c 53%);
  background-size: 200% 100%;
  animation: 1s ${shine} linear infinite;
  border-radius: 10px;
`;

export default Skeleton;
