import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

const theme = extendTheme({
  fonts: { body: "'Inter', sans-serif", heading: "'Inter', sans-serif" },
  styles: { global: { body: { bg: "#F0F2F5" } } },
  components: {
    Button: { baseStyle: { borderRadius: "6px", fontWeight: 500 } },
    Modal: { baseStyle: { dialog: { borderRadius: "12px" } } },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
        <Toaster />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
);
