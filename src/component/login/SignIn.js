import React, { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";


const SignIn = () => {
  const enterUserEmail = useRef();
  const enterUserPassword = useRef();
  const nav = useNavigate();

  const userDataSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(firebaseAuth, enterUserEmail.current.value, enterUserPassword.current.value)
      .then((userCredential) => {
        console.log(userCredential.user);
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      SignIn
      <form onSubmit={userDataSubmit}>
        <input type="text" ref={enterUserEmail} />
        <input type="password" ref={enterUserPassword} />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default SignIn;
