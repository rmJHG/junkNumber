import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState();
 const [tryLogin, setTryLogin] = useState(-1);


  const userOnline = () => {
    setIsLogin("online");
  };
  const userOffline = () => {
    setIsLogin("offline");
  };

  const retryUseEffect = () => {
    setTryLogin(tryLogin * -1)
  }
  const contextData = {
    isLogin: isLogin,
    tryLogin:tryLogin,
    onlineFn: userOnline,
    offlineFn: userOffline,
    retryUseEffect: retryUseEffect
  };
  return <UserContext.Provider value={contextData}>{props.children}</UserContext.Provider>;
};

export default UserContext;
