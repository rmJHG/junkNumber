import React, { createContext, useState } from "react";

type ContextType = {
  isLogin: string;
  tryLogin: number;
  onlineFn: () => void;
  offlineFn: () => void;
  retryUseEffect: () => void;
};

type UserContxtProviderProps = {
  children: React.ReactNode;
};
const UserContext = createContext<ContextType>();

export const UserContextProvider: React.FC<UserContxtProviderProps> = ({
  children,
}) => {
  const [isLogin, setIsLogin] = useState<string>();
  const [tryLogin, setTryLogin] = useState<number>(-1);
  const userOnline = () => {
    setIsLogin("online");
  };
  const userOffline = () => {
    setIsLogin("offline");
  };

  const retryUseEffect = () => {
    setTryLogin(tryLogin * -1);
  };
  const contextData = {
    isLogin: isLogin,
    tryLogin: tryLogin,
    onlineFn: userOnline,
    offlineFn: userOffline,
    retryUseEffect: retryUseEffect,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default UserContext;
