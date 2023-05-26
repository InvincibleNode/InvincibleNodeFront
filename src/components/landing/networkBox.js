import styled from "styled-components";
import Ton from "assets/images/landingpage_ton.png";
import Evmos from "assets/images/landingpage_evmos.png";
import Klaytn from "assets/images/landingpage_klaytn.png";
import {routeStake} from "components/common/routePath";
import {useNavigate} from "react-router-dom";
import { Button } from "styles/styledComponents/button";
import {size} from "styles/styledComponents/media/mediaSize";

export const NetworkBox=({network})=>{
    const navigate = useNavigate();
    const getNetworkImage = (network) => {
            switch(network.name){
                case "ton":
                    return Ton;
                case "evmos":
                    return Evmos;
                case "klaytn":
                    return Klaytn;
                default:
                    return Klaytn;
            };
        }
    return(

       
        <Wrapper>
            <NetworkImage src={getNetworkImage(network)}/>
            <NetworkBtn onClick={() => network.state === 0 ? null : routeStake(navigate)} state={network.state}>
                {network.state === 0 ? "Coming soon" : "Stake"}
            </NetworkBtn>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    justify-content: space-between;
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 30%;
    height: 4vw;
    border-radius: 1rem;
    margin-bottom: 16rem;
    padding-left: 2.8%;
    padding-right: 1.5%;
`;

const NetworkImage = styled.img`
    height: 1.8vw;

`;

const NetworkBtn = styled(Button)`
    background:${(props) => props.state === 0 ? "#3E4064" : "#1F53FF"};
    font-family: 'Montserrat';
    font-weight: 600;
    color: #FFFFFF;
    width: ${(props) => props.state === 0 ? "8.4vw" : "5vw"};
    height: 2.8vw;
    font-size: 0.8vw;
    display : flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem;
`;