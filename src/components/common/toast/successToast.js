import { toast } from "react-toastify";
import successToastIcon from "assets/icons/toast/successToast.svg";

export const SuccessToastMsg = ({ title, message, check }) =>
  check === "stake" ? (
    <div style={{ marginLeft: "2rem", maxWidth: "40rem" }}>
      <h1 style={{ color: "#1F53FF", fontSize: "1.6rem", marginBottom: 0 }}>
        {title}
      </h1>
      <p style={{ color: "#1F53FF", fontSize: "1.4rem", marginTop: "0.4rem" }}>
        {message}
      </p>
    </div>
  ) : (
    <div style={{ marginLeft: "2rem", maxWidth: "40rem" }}>
      <h1 style={{ color: "#5A42EE", fontSize: "1.6rem", marginBottom: 0 }}>
        {title}
      </h1>
      <p style={{ color: "#5A42EE", fontSize: "1.4rem", marginTop: "0.4rem" }}>
        {message}
      </p>
    </div>
  );

const SuccessIcon = () => {
  return <img src={successToastIcon} alt="success" />;
};

export const successToast = (title, message) => {
  toast.success(<SuccessToastMsg title={title} message={message} />, {
    icon: SuccessIcon,
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
      background: "#F6F8FF",
      padding: "15px 25px",
    },
  });
};
