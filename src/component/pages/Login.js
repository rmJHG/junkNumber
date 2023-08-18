import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import LogOut from "../authentication/LogOut";

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
    <div>
      {content && (
        <div>
          <form onSubmit={loginSubmit}>
            <input type="text" ref={enterEmail} />
            <input type="password" ref={enterPassword} />

            <button>로그인</button>
          </form>
          <LogOut />
          <Link to="/create">회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default Login;
