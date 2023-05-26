import styled from "styled-components";
import theme from "styles/theme";
import question from "assets/icons/myassets/quesiton.svg";
import questionSelected from "assets/icons/myassets/quesiton_selected.svg";
import { useState, useEffect } from "react";
import Tooltip from "./Tooltip";
import { TYPES } from "components/myAsset/NavBar/NFTBox";

export const SELECTORS = [
  {
    gradient: "linear-gradient(135deg, #DF310A, #FFB800)",
    title: "Forthcoming",
    additional: [
      "It is a title",
      "It is a content!!!\nIt is a content!!!It is a content!!!\nIt is a content!!!It is a content!!!",
    ],
  },
  {
    gradient: "linear-gradient(90deg, #61B5F2, #98A1FE)",
    title: "Ongoing",
  },
  {
    gradient: "linear-gradient(135deg, #9D9D9D, #FDFDFB)",
    title: "Expired",
  },
];

/**
 * 스테이지를 선택할 수 있는 셀렉터 박스
 */
const Selector = ({ curType, curSelect, onSelect, curLength }) => {
  const [disabled, setDisabled] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    if (curType === TYPES[0].title) {
      console.log("gd");
      setDisabled(true);
      onSelect("");
    } else {
      onSelect(SELECTORS[0].title);
      setDisabled(false);
    }
  }, [curType]);

  return (
    <Container>
      <SelectorWrapper>
        {SELECTORS.map((selector) => (
          <BoxWrapper
            key={selector.title}
            disabled={disabled}
            onClick={() => (!disabled ? onSelect(selector.title) : null)}
          >
            <SelectorBox>
              <Caption style={{ background: `${selector.gradient}` }} />
              <Title
                disabled={disabled}
                selected={curSelect === selector.title}
              >
                {selector.title}
              </Title>
              {selector.additional ? (
                <IconWrapper>
                  <QuestionIcon
                    src={
                      curSelect === selector.title ? questionSelected : question
                    }
                    onMouseEnter={() =>
                      curSelect === "Forthcoming" || disabled
                        ? setTooltip(true)
                        : null
                    }
                    onMouseLeave={() =>
                      curSelect === "Forthcoming" || disabled
                        ? setTooltip(false)
                        : null
                    }
                  />
                  {tooltip ? <Tooltip content={selector.additional} /> : <></>}
                </IconWrapper>
              ) : (
                <></>
              )}
            </SelectorBox>
            <Line
              selected={curSelect === selector.title}
              style={{ background: `${selector.gradient}` }}
            />
          </BoxWrapper>
        ))}
      </SelectorWrapper>
      <TotalNFT>Total NFTs {curLength}</TotalNFT>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const Caption = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 100%;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  gap: 15px;
`;

const SelectorBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0px 10px;
`;

const Title = styled.span`
  ${theme.fonts.Font_Heading_4_1};
  color: ${(props) => (props.selected ? "white" : theme.colors.mediumGray)};
  transition: all 0.2s;

  &:hover {
    color: ${(props) => (props.disabled || props.selected ? "" : "#cacaca")};
  }
`;

const Line = styled.div`
  width: 100%;
  height: ${(props) => (props.selected ? "2px" : "0px")};
  transition: all 0.2s;
`;

const IconWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const TotalNFT = styled.span`
  ${theme.fonts.Font_Heading_4};
  color: ${theme.colors.realWhite};
  font-weight: 700;
`;

export default Selector;
