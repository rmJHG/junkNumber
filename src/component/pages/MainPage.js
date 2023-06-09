import React from "react";
import { firebaseAuth } from "../../firebase";
import Portal from "../portal/Portal";

const MainPage = () => {
  const isLogin = () => {
    const userData = firebaseAuth.currentUser;
    if (userData !== null) {
      console.log(userData.email, userData.displayName);
    } else {
      console.log("비로그인중");
    }
  };

  return (
    <>
      MainPage
      <button onClick={isLogin}>로그인확인</button>
      <Portal />
    </>
  );
};

export default MainPage;
