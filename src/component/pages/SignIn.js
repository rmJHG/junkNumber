import React, { useEffect, useRef, useState } from "react";
import SignInSuccess from "../authentication/SignInSuccess";
import { firebaseAuth, userNameDbRef } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { child, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import classes from "./style/SignIn.module.css";

const SignIn = (props) => {
  const enterUserEmail = useRef();
  const enterUserPassword = useRef();
  const enterNickName = useRef();
  const [content, setContent] = useState(false);
  const [signState, setSignState] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const nav = useNavigate();

  const checkUserName = () => {
    const names = [];
    get(child(userNameDbRef, `/`))
      .then((res) => {
        const data = res.val();

        for (const key in data) {
          const name = {
            ...data[key],
          };
          names.push(name);
        }

        for (let i = 0; i < names.length; i++) {
          if (enterNickName.current.value === names[i].name) {
            setSignInError(true);
            break;
          } else {
            setSignInError(false);
          }
        }
      })
      .catch((error) => console.log(error));
  };

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
                <label htmlFor="userEmail">EMAIL</label>
                <input type="email" id="userEmail" ref={enterUserEmail} />
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
                  onChange={checkUserName}
                  minLength={3}
                  maxLength={8}
                />
                <div className={classes.userNameInfoContainer}>
                  <p>닉네임은 3~8글자만 가능합니다</p>
                {signInError && <p>사용할 수 없는 닉네임입니다.</p>}
                </div>
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
