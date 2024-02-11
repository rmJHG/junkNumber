import React, { useEffect, useRef, useState } from "react";
import { firebaseAuth, userNameDbRef } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { child, get, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignIn = (props) => {
  const enterUserEmail = useRef();
  const enterUserPassword = useRef();
  const enterNickName = useRef();
  const [signInError, setSignInError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const nav = useNavigate();

  const checkNickName = () => {
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
          if (enterNickName.current.value.toLowerCase() === names[i].name) {
            setSignInError(true);
            break;
          } else {
            setSignInError(false);
          }
        }
      })
      .catch((error) => console.log(error.code));
  };

  const userDataSubmit = (event) => {
    event.preventDefault();

    const enteredNickName = enterNickName.current.value;

    createUserWithEmailAndPassword(firebaseAuth, enterUserEmail.current.value, enterUserPassword.current.value)
      .then(() => {
        nav("/sucess");
      }).then(()=>{
        sendEmailVerification(firebaseAuth.currentUser)
      })
      .then((result) => {
        updateProfile(firebaseAuth.currentUser, {
          displayName: enteredNickName,
        });
        signOut(firebaseAuth);
        push(userNameDbRef, {
          name: enteredNickName.toLowerCase(),
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            setPasswordError(true);
            break;
          case "auth/email-already-in-use":
            setEmailError(true);
            break;
          default:
            console.log(error.code);
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        nav("/");
      }
    });
  }, [nav]);
  return (
    <Wrapper>
      <form onSubmit={userDataSubmit}>
        <InputContainer>
          <div>
            <label htmlFor="userEmail">EMAIL</label>
            <input type="email" id="userEmail" ref={enterUserEmail} required />

            <AlertContainer>
              <p></p> {emailError && <p>사용할 수 없는 이메일입니다.</p>}
            </AlertContainer>
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" ref={enterUserPassword} required />
            <AlertContainer>
              <p>최소 6자이상만 가능합니다. </p> {passwordError && <p>올바르지 않은 비밀번호 형식입니다.</p>}
            </AlertContainer>
          </div>

          <div>
            <label htmlFor="userName">USER NAME</label>
            <input type="text" ref={enterNickName} id="userName" onChange={checkNickName} minLength={3} maxLength={8} required />
            <AlertContainer>
              <p>3~8글자만 가능합니다.</p>
              {signInError && <p>사용할 수 없는 닉네임입니다.</p>}
            </AlertContainer>
          </div>
        </InputContainer>

        <BtnWrapper>
          <button>가입</button>
        </BtnWrapper>
      </form>
    </Wrapper>
  );
};

export default SignIn;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;

  form {
    width: 500px;
    height: 100%;
    margin-top: 5rem;
    border: 1px solid #ccc;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  div:nth-child(2),
  div:last-child {
    margin-top: 1rem;
  }
  div > input {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #f8f8f8;
    box-sizing: border-box;
    border-radius: 3rem;
  }
`;

const AlertContainer = styled.div`
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-between;
  p:nth-child(2) {
    color: red;
  }
`;

const BtnWrapper = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border-radius: 30rem;
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
  }
`;
