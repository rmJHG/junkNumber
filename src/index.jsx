import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./component/context/DataContext";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./styles/global";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
  <GlobalStyles/>
    <RecoilRoot>
      <DataProvider>
        <App />
      </DataProvider>
    </RecoilRoot>
  </BrowserRouter>
);
