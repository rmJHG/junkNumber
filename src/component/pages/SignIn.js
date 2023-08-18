import React, { useEffect, useRef, useState } from "react";
import SignInSuccess from "../authentication/SignInSuccess";
import { firebaseAuth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const enterUserEmail = useRef();
  const enterUserPassword = useRef();
  const enterNickName = useRef();
  const [content, setContent] = useState(false);
  const [signState, setSignState] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const checkLogin = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        nav("/");
      } else {
        setContent(true);
      }
    });

    return () => checkLogin();
  }, [nav]);
  const userDataSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(
      firebaseAuth,
      enterUserEmail.current.value,
      enterUserPassword.current.value
    )
      .then((result) => {
        updateProfile(firebaseAuth.currentUser, {
          displayName: enterNickName.current.value,
        });
      })
      .then(() => {
        signOut(firebaseAuth);
        setSignState(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {content && (
        <form onSubmit={userDataSubmit}>
          <input type="email" ref={enterUserEmail} />
          <input type="password" ref={enterUserPassword} />
          <input
            type="text"
            ref={enterNickName}
            minLength={3}
            maxLength={8}
            placeholder="닉네임"
          />
          <button>회원가입</button>
        </form>
      )}
      {signState && <SignInSuccess />}
    </>
  );
};

export default SignIn;
