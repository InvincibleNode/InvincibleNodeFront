import { toast } from "react-toastify";
import errorToastIcon from "assets/icons/toast/errorToast.svg";

export const ErrorToastMsg = ({ title, message }) => (
  <div style={{ marginLeft: "2rem", maxWidth: "40rem" }}>
    <h1 style={{ color: "#FF2C27", fontSize: "1.6rem", marginBottom: 0 }}>
      {title}
    </h1>
    <p style={{ color: "#FF2C27", fontSize: "1.4rem", marginTop: "0.4rem" }}>
      {message}
    </p>
  </div>
);

const ErrorIcon = () => {
  return <img src={errorToastIcon} alt="success" />;
};

export const errorToast = (title, message) => {
  toast.error(<ErrorToastMsg title={title} message={message} />, {
    icon: ErrorIcon,
    position: "bottom-left",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      borderRadius: "14px",
      background: "#FFF5F5",
      padding: "15px 25px",
    },
  });
};
