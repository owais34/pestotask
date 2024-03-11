import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalStateProvider } from "./utils/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>
);
