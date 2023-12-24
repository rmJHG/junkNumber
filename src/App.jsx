import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/layout/Layout";
import MainPage from "./component/pages/MainPage";
import Community from "./component/pages/Community";
import ReportJunk from "./component/pages/ReportJunk";
import Login from "./component/authentication/Login";
import SignIn from "./component/authentication/SignIn";
import SearchResult from "./component/search/SearchResult";
import PostDetail from "./component/community/PostDetail";
import PostUpdate from "./component/community/PostUpdate";
import WritePost from "./component/community/WritePost";
import SignInSuccess from "./component/authentication/SignInSuccess";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/community/:commuQuery" element={<Community />} />
        <Route path="/report" element={<ReportJunk />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<SignIn />} />
        <Route path="/sucess" element={<SignInSuccess/>} />
        <Route path="/num/:searchQuery" element={<SearchResult />} />
        <Route path="/community/post/:postQuery" element={<PostDetail />} />
        <Route path="/community/post/edit" element={<PostUpdate />} />
        <Route path="/community/write" element={<WritePost />} />
      </Routes>
    </Layout>
  );
};

export default App;
