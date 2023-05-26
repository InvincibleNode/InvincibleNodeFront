import { useState } from "react";
import Selector, { SELECTORS } from "./Selector";
import styled from "styled-components";
import NFTList from "./NFTList";

/**
 * My Asset 페이지의 주요 콘텐츠 Wrapper 박스
 */
const ContentBox = ({ curType }) => {
  const [curSelect, setCurSelect] = useState(SELECTORS[0].title);
  const [curLength, setCurLength] = useState(0);

  const onSelect = (select) => {
    setCurSelect(select);
  };

  const onLength = (length) => {
    setCurLength(length);
  };

  return (
    <Container>
      <Selector
        curType={curType}
        curSelect={curSelect}
        onSelect={onSelect}
        curLength={curLength}
      />
      <NFTList curType={curType} curSelect={curSelect} onLength={onLength} />
    </Container>
  );
};

const Container = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 35px;
`;

export default ContentBox;
