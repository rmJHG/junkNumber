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
import classes from "./style/SignIn.module.css";

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
        <div className={classes.container}>
          <form onSubmit={userDataSubmit}>
            <div className={classes.inputContainer}>
              <div>
                <label htmlFor="userId">ID</label>
                <input type="email" id="userId" ref={enterUserEmail} />
              </div>
              <div>
                <label htmlFor="dd">PASSWORD</label>
                <input type="password" id="dd" ref={enterUserPassword} />
              </div>
              <div>
                <label htmlFor="userName">USER NAME</label>
                <input
                  type="text"
                  ref={enterNickName}
                  minLength={3}
                  maxLength={8}
                />
              </div>
            </div>

            <div className={classes.btnContainer}>
              <button>가입</button>
            </div>

          </form>
        </div>
      )}
      {signState && <SignInSuccess />}
    </>
  );
};

export default SignIn;
