import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import { useRecoilState, useRecoilValue } from "recoil";
import { walletTypeAtom } from "store/walletType";
import { stakeInfoAtom } from "store/stakeInfo";
import InviCoreTx from "utils/web3/transactions/InviCoreTx";
import { networkAtom } from "store/network";

const LeverageSlider = () => {
  const walletType = useRecoilValue(walletTypeAtom);
  const [stakeInfo, setStakeInfo] = useRecoilState(stakeInfoAtom);
  const network = useRecoilValue(networkAtom);
  const inviCoreTx = new InviCoreTx(network);

  const marks = [
    {
      value: 1,
      label: "x1",
    },
    {
      value: 1.5,
      label: "x1.5",
    },
    {
      value: 2,
      label: "x2",
    },
    {
      value: 2.5,
      label: "x2.5",
    },
    {
      value: 3,
      label: "x3",
    },
    {
      value: 3.5,
      label: "x3.5",
    },
    {
      value: 4,
      label: "x4",
    },
    {
      value: 4.5,
      label: "x4.5",
    },
    {
      value: 5,
      label: "x5",
    },
  ];

  const getValues = async (event, value) => {
    event.preventDefault();
    const lockPeriod = await inviCoreTx.getLockPeriod(value);

    setStakeInfo((prev) => ({
      ...prev,
      leverageRatio: value,
      // lockPeriod: lockPeriod / 86400,
      minLockPeriod: lockPeriod / 86400,
    }));
  };
  return (
    <StyledReactSlider
      disabled={walletType === 0}
      step={0.5}
      marks={marks}
      max={5}
      min={1}
      defaultValue={1}
      valueDisplay={true}
      value={stakeInfo.leverageRatio}
      onChange={getValues}
    />
  );
};

const StyledReactSlider = styled(Slider)(() => ({
  width: "28.9rem",
  height: "0.8rem",
  left: "50%",
  top: "0%",
  transform: "translateX(-50%)",
  color: "#1F53FF",
  
  "&.Mui-disabled": {
    color: "#3E4064",
  },
  "& .MuiSlider-thumb": {
    width: "1.2rem",
    height: "1.2rem",
    borderRadius: 100,
    color: "#1F53FF",

    "&:hover, &.Mui-focusVisible, &.Mui-active,": { boxShadow: "none" },
  },
  "& .MuiSlider-rail": {
    opacity: 100,
    height: "1rem",
    color: "#1F53FF",
    borderRadius: 20,
    width: "100%",
    position: "relative",
    paddingLeft: "1.2rem",
    paddingRight: "1.2rem",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: "-1.2rem",
      margin: "0 1.2rem",
      borderRadius: "2rem",
      backgroundColor: "#3E4064",
      zIndex: -1,
    }
  },
  
  
  "& .MuiSlider-mark": {
    height: "0.5rem",
    width: "0.32rem",
    color: "#252423",
    borderRadius: 10,
    "&.MuiSlider-markActive": {
      backgroundColor: "#252423",
    },
  },
  "& .MuiSlider-markLabel": {
    color: "#3E4064",
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: "1.12rem",
  },
}));
export default LeverageSlider;
