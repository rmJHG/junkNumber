import React, { createContext, useState} from 'react'

const UserContext = createContext()




export const UserContextProvider = (props) => {

    const [isLogin, setIsLogin] = useState()

    const userOnline= () =>{
        setIsLogin("online")
    }
    const userOffline= () =>{
        setIsLogin("offline")
    }
    const contextData={
        isLogin : isLogin,
        onlineFn : userOnline,
        offlineFn : userOffline
    }
  return (
    <UserContext.Provider value={contextData}> {props.chilren}</UserContext.Provider>
  )
}

export default UserContext