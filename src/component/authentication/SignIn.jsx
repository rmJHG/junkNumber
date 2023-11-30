import React, { useEffect, useRef, useState } from "react";
import SignInSuccess from "./SignInSuccess";
import { firebaseAuth, userNameDbRef } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import { child, get, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

  const userDataSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(firebaseAuth, enterUserEmail.current.value, enterUserPassword.current.value)
      .then((result) => {
        updateProfile(firebaseAuth.currentUser, {
          displayName: enterNickName.current.value,
        });
        signOut(firebaseAuth);
      })
      .then(() => {
        setSignState(true);
        setContent(false);
      })
      .then(() => {
        push(userNameDbRef, {
          name: enterNickName.current.value,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <>
      {content && (
        <Wrapper>
          <form onSubmit={userDataSubmit}>
            <InputContainer>
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
                <input type="text" ref={enterNickName} onChange={checkUserName} minLength={3} maxLength={8} />
                <AlertContainer>
                  <p>닉네임은 3~8글자만 가능합니다</p>
                  {signInError && <p>사용할 수 없는 닉네임입니다.</p>}
                </AlertContainer>
              </div>
            </InputContainer>

            <BtnWrapper>
              <button>가입</button>
            </BtnWrapper>
          </form>
        </Wrapper>
      )}
      {signState && <SignInSuccess />}
    </>
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
