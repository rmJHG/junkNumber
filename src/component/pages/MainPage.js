import React from "react";
import { firebaseAuth } from "../../firebase";


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
    <div>
      MainPage
      <button onClick={isLogin}>로그인확인</button>
    </div>
  );
};

export default MainPage;
