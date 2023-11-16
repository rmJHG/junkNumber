import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import classes from "./style/Login.module.css";

const Login = () => {
  const enterEmail = useRef();
  const enterPassword = useRef();
  const nav = useNavigate();
  const [content, setContent] = useState(false);

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

  const loginSubmit = async (event) => {
    event.preventDefault();

    await signInWithEmailAndPassword(
      firebaseAuth,
      enterEmail.current.value,
      enterPassword.current.value
    )
      .then((userCredential) => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      {content && (
        <div>
          <form onSubmit={loginSubmit}>
            <div className={classes.inputContainer}>
              <div className={classes.emailContainer}>
                <label htmlFor="email">email :</label>
                <input type="email" ref={enterEmail} />
              </div>

              <div className={classes.passwordContainer}>
                <label htmlFor="password">password :</label>
                <input type="password" ref={enterPassword} />
              </div>
            </div>
            <div className={classes.btnContainer}>
              <button>로그인</button>
            </div>
          </form>
          <div className={classes.linkContainer}>
            <Link className={classes.signBtn} to="/create">
              회원가입
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
