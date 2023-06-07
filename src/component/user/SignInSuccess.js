import React from 'react'
import { useNavigate } from 'react-router-dom';

const SignInSuccess = () => {

  const nav = useNavigate()

  const navLogin= () => {
    nav("/login")
  }
  const navMain= () => {
    nav("/")
  }
  return (
    <div>


        <p>회원가입 완료.</p>
        <button onClick={navLogin}>로그인</button>
        <button onClick={navMain}>메인으로</button>
        
        
        </div>
    
  )
}

export default SignInSuccess