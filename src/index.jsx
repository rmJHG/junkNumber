import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./component/context/DataContext";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
    <RecoilRoot>
      <DataProvider>
        <App />
      </DataProvider>
    </RecoilRoot>
  </BrowserRouter>
);
