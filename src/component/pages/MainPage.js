import React from "react";
import { firebaseAuth } from "../../firebase";

const MainPage = () => {
  const isLogin = () => {
    // onAuthStateChanged(firebaseAuth, (user)=>{
    //   if(user) {
    //     console.log(user)
    //   }else {
    //     console.log("비로그인중")
    //   }
    // })

    const userData = firebaseAuth.currentUser;
    if (userData !== null) {
      console.log(userData.email);
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
