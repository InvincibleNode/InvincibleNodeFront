import Header from "components/common/header/header";
import { Background } from "styles/styledComponents/background";
import styled from "styled-components";
import { useState, useEffect } from "react";
import InviTokenStakeTx from "utils/web3/transactions/InviTokenStakeTx";
import LpPoolTx from "utils/web3/transactions/LpPoolTx";
import { networkAtom } from "store/network";
import { accountAtom } from "store/account";
import { useRecoilValue } from "recoil";
import ILPLogo from "assets/icons/ilp_logo.svg";
import { TotalData } from "components/ilp/totalData";
import { GetIlpBox } from "components/ilp/getIlpBox";
import { Footer } from "components/common/footer";
import { StepBox } from "components/ilp/stepBox";
import { DataBox} from "components/ilp/DataBox";
import { AddTokenBtn } from "components/ilp/addTokenBtn";
import { Option } from "components/ilp/option";
import { ReturnIlpBox } from "components/ilp/returnIlpBox";

export const IlpPage = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [totalLiquidity, setTotalLiquidity] = useState("");
  const network = useRecoilValue(networkAtom);
  const account = useRecoilValue(accountAtom);
  const [option, setOption] = useState(0);

  //------Tx objects------//
  const lpPoolTx = new LpPoolTx(network);
  const inviTokenStakeTx = new InviTokenStakeTx(network);

  //------Fetch data asynchronously------//
  useEffect(() => {
    const fetchData = async () => {
      const totalLiquidity = await lpPoolTx.getTotalLiquidity();

      setTotalLiquidity(totalLiquidity);
    };

    fetchData();
  }, [lpPoolTx, inviTokenStakeTx, account.address]);

  const descText = `ILP refers to the liquidity provider who supplies liquidity to a pool. 
    Holding ILP entitles the holder to receive 70% protocol fees and INVI as pay-off for participating in the Invincible node.`;

  return (
    <Background launchApp={true}>
      <Header launchApp={true} showTooltip={showTooltip} />
      <IlpWrapper>
        <IlpLogo>
          <ILPLogoImg>
            <img src={ILPLogo} alt="ILPLogo" />
          </ILPLogoImg>
          <IlpLogoText>ILP</IlpLogoText>
        </IlpLogo>

        <TitleText>Invincible Liquidity Providers</TitleText>
        <DescText>{descText}</DescText>
        <TotalData totalLiquidity={totalLiquidity} />

        <IlpContentWrapper option={option === 0}>
          <Option setOption={setOption} option={option} />
          {option === 0 ? <GetIlpBox /> : <ReturnIlpBox />}
        </IlpContentWrapper>
        <StepBox />
        <DataBox />
      </IlpWrapper>
      <AddTokenBtn />
      <Footer />
    </Background>
  );
};

export default IlpPage;

const IlpWrapper = styled.div`
  padding-top: 3.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Pretendard";
`;

const IlpLogo = styled.div`
  position: relative;
`;

const ILPLogoImg = styled.div`
  width: 9.6rem;
  img {
    width: 100%;
    vertical-align: middle;
  }
`;

const IlpLogoText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 1.6rem;
  color: white;
  text-align: center;
`;

const TitleText = styled.div`
  font-family: "Pretendard";
  font-weight: 800;
  color: white;
  text-align: center;
  font-size: 4rem;
  margin-bottom: 3rem;
`;

const DescText = styled.div`
  font-family: "Pretendard";
  font-weight: 600;
  color: #fff;
  text-align: center;
  font-size: 1.4rem;
  white-space: pre-line;
  line-height: 2rem;
`;

const IlpContentWrapper = styled.div`
  width: 38.7rem;
  height: ${({ option }) => (option ? "43.5rem" : "48.1rem")};
  filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.12));
  background-color: ${(props) => props.theme.colors.lightBlue2};
  border-radius: 1.4rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 4.5rem 4rem 4.5rem;
  margin-bottom: 8.6rem;
`;
