import styled from "styled-components";
import LoanRow from "./loanRow";
import { useRecoilValue } from "recoil";
import { accountAtom } from "store/account";
import StakeNFTTx from "utils/web3/transactions/StakeNFTTx";
import { networkAtom } from "store/network";
import { useEffect, useState } from "react";
import LendingPoolTx from "utils/web3/transactions/LendingPoolTx";
const LoanBody = () => {
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom);
  const stakeNFTTx = new StakeNFTTx(network);
  const lendingPoolTx = new LendingPoolTx(network);
  const [nftInfos, setNFTInfos] = useState({});
  const [maxLTVPercent, setMaxLTVPercent] = useState(0);

  const initFunction = async () => {
    await getMaxLTVPercents();
    const nftIds = await getNftId();
    await setNftInfo(nftIds);
  };

  const getMaxLTVPercents = async () => {
    const maxLTVPercent = await lendingPoolTx.getMaxLendRatio();
    setMaxLTVPercent(maxLTVPercent);
  };

  const getNftId = async () => {
    if (account.address === "") return;
    const nftIds = await stakeNFTTx.getNFTOwnership(account.address);

    return nftIds;
  };

  const setNftInfo = async (nftIds) => {
    for (let i = 0; i < nftIds.length; i++) {
      const nftId = nftIds[i];
      let nftInfo = await stakeNFTTx.getStakeInfo(nftId);
      nftInfo = {
        ...nftInfo,
        evaluation: await stakeNFTTx.getEvaluation(nftId),
      };
      setNFTInfos((prev) => ({
        ...prev,
        [nftId]: nftInfo,
      }));
    }
  };

  useEffect(() => {
    initFunction();
    console.log(lendingPoolTx);
  }, [account.address]);

  return (
    <Wrapper>
      {Object.entries(nftInfos).map(([key, value]) => {
        return (
          <LoanRow
            key={key}
            nftId={key}
            nftInfo={value}
            maxLTVPercent={maxLTVPercent}
          ></LoanRow>
        );
      })}
    </Wrapper>
  );
};

export default LoanBody;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
