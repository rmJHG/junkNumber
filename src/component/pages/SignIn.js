import React, { useRef, useState } from "react";
import SignInSuccess from "../user/SignInSuccess";
import { firebaseAuth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

const SignIn = (props) => {
  const enterUserEmail = useRef();
  const enterUserPassword = useRef();
  const enterNickName = useRef();

  const userDataSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(firebaseAuth, enterUserEmail.current.value, enterUserPassword.current.value)
      .then((result) => {
        updateProfile(firebaseAuth.currentUser, {
          displayName: enterNickName.current.value,
        });
      })
      .then(() => {
        signOut(firebaseAuth);
        setSignInPage(<SignInSuccess />);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [signInPage, setSignInPage] = useState(
    <form onSubmit={userDataSubmit}>
      <input type="email" ref={enterUserEmail} />
      <input type="password" ref={enterUserPassword} />
      <input type="text" ref={enterNickName} placeholder="닉네임" />
      <button>회원가입</button>
    </form>
  );
  return (
    <div>
      SignIn
      {signInPage}
    </div>
  );
};

export default SignIn;
