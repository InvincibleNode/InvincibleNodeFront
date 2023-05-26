import { toast } from "react-toastify";
import { SuccessToastMsg } from "./successToast";
import { ErrorToastMsg } from "./errorToast";
import successToastIcon from "assets/icons/toast/successToast.svg";
import errorToastIcon from "assets/icons/toast/errorToast.svg";
import CircleSpinner from "./CircleSpinner";

const ErrorIcon = () => {
  return <img src={errorToastIcon} alt="success" />;
};

const SuccessIcon = () => {
  return <img src={successToastIcon} alt="success" />;
};

const PendingToastMsg = ({ title, message }) => (
  <div style={{ marginLeft: "2rem", maxWidth: "40rem" }}>
    <h1 style={{ color: "#5A42EE", fontSize: "1.6rem", marginBottom: 0 }}>
      {title}
    </h1>
    <p style={{ color: "#5A42EE", fontSize: "1.4rem", marginTop: "0.4rem" }}>
      {message}
    </p>
  </div>
);

const pendingToast = (promiseObject, toastMsg, check) => {
  toast.promise(
    promiseObject,
    {
      pending: {
        icon: () => (
          <div>
            <CircleSpinner />
          </div>
        ),
        style: {
          borderRadius: "14px",
          background: "#F6F8FF",
          padding: "15px 25px",
        },
        render() {
          return (
            <PendingToastMsg
              title={toastMsg.pending.title}
              message={toastMsg.pending.message}
            />
          );
        },
      },
      success: {
        render() {
          return (check === "stake") ? (
            <SuccessToastMsg
              title={toastMsg.success.stake.title}
              message={toastMsg.success.stake.message}
              check={check}
            />
          ) : (
            <SuccessToastMsg
              title={toastMsg.success.unstake.title}
              message={toastMsg.success.unstake.message}
              check={check}
            />
          );
        },
        icon: SuccessIcon,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          borderRadius: "14px",
          background: "#F6F8FF",
          padding: "15px 25px",
        },
      },
      error: {
        render() {
           if( check === "spotty" ){
            return <ErrorToastMsg
              title={toastMsg.error.spotty.title}
              message={toastMsg.error.spotty.message}
            />
           } else if ( check === "gasFee" ){
            return <ErrorToastMsg
              title={toastMsg.error.gasFee.title}
              message={toastMsg.error.gasFee.message}
            />
            } else if ( check === "transaction" ){
            return <ErrorToastMsg
              title={toastMsg.error.transaction.title}
              message={toastMsg.error.transaction.message}
            />
           } else {
            return <ErrorToastMsg
              title={toastMsg.error.network.title}
              message={toastMsg.error.network.message}
            />
           };
        },
        icon: ErrorIcon,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          borderRadius: "14px",
          background: "#FFF5F5",
          padding: "15px 25px",
        },
      },
    },
    {
      position: "bottom-left",
    }
  );
};

export default pendingToast;
