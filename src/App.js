import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/layout/Layout";
import MainPage from "./component/pages/MainPage";
import Community from "./component/pages/Community";
import ReportJunk from "./component/pages/ReportJunk";
import Login from "./component/pages/Login";
const App = () => {
  return (
    <Layout>
      <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/community" element={<Community/>}/>
      <Route path="/report" element={<ReportJunk/>} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </Layout>
  )
};

export default App;
