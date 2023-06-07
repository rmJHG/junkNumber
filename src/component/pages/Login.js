import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import LogOut from "../user/LogOut";

const Login = () => {
  const enterEmail = useRef();
  const enterPassword = useRef();

  const nav = useNavigate();
  // let userData;

  const loginSubmit = async (event) => {
    event.preventDefault();

    await signInWithEmailAndPassword(firebaseAuth, enterEmail.current.value, enterPassword.current.value)
      .then((userCredential) => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <input type="text" ref={enterEmail} />
        <input type="password" ref={enterPassword} />

        <button>로그인</button>
      </form>

      <LogOut />
      <Link to="/create">회원가입</Link>
    </div>
  );
};

export default Login;
