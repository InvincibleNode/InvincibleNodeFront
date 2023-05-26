import styled from "styled-components";
import { NetworkBox } from "./networkBox";
import {size} from "styles/styledComponents/media/mediaSize";

export const NetworkDesc = () => {
const NetworkInfo = [{name: "ton", state: 1}, {name: "evmos", state: 0}, {name: "klaytn", state: 1}]
    return(
        <>
            <Title>Stake on your preferred network</Title>
            <Wrapper>
                <NetworkInfoBox>
                    <NetworkBox network={NetworkInfo[0]}/>
                    <NetworkBox network={NetworkInfo[2]}/>
                    <NetworkBox network={NetworkInfo[1]}/>
                </NetworkInfoBox>
            </Wrapper>
        </>
    )
};

const Wrapper = styled.div`
    width: 100%;
`;

const Title = styled.div`
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 4rem;
    color: #FFFFFF;
    margin-bottom: 6rem;
@media(${size.tablet} < width < ${size.laptop}) {
    font-size: 3rem;
    line-height: 4rem;
    margin-bottom: 5rem;
}
@media(${size.mobileL} <  width < ${size.tablet}) {
    font-size: 2rem;
    line-height: 3rem;
    margin-bottom: 4rem;
}
@media(width < ${size.mobileL}) {
    font-size: 1.4rem;
    line-height: 2rem;
    margin-bottom: 3rem;
}
`;

const NetworkInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 3%;
`;