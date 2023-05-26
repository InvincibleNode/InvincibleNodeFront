import Router from "./components/common/Router";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <ToastContainer style={{ width: "auto" }} />
        <Router />
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div``;
