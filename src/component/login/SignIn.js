import React, { useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";

const SignIn = () => {
  const enterUserEmail = useRef();
  const enterUserPassword = useRef();
  const enterNickName = useRef();
  const nav = useNavigate();

  const userDataSubmit = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(firebaseAuth, enterUserEmail.current.value, enterUserPassword.current.value)
      .then((result) => {
        updateProfile(firebaseAuth.currentUser, {
          displayName: enterNickName.current.value,
        });
      })
      .then(() => {
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
        <input type="email" ref={enterUserEmail} />
        <input type="password" ref={enterUserPassword} />
        <input type="text" ref={enterNickName} placeholder="닉네임" />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default SignIn;
