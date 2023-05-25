import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#24ce90",
    },
    secondary: {
      main: "#f7923a",
    },
    background: {
      paper: "#f6f6f6",
      default: "#dfdfdf",
    },
    warning: {
      main: "#edc802",
    },
  },
  typography: {
    h1: {
      fontFamily: "Oleo Script",
    },
    h2: {
      fontFamily: "Oleo Script",
    },
  },
};

const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
