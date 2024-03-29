import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import styled from "styled-components";

const Login = () => {
  const enterEmail = useRef();
  const enterPassword = useRef();
  const nav = useNavigate();
  const [ErrorMsg, setErrorMsg] = useState();

  const loginSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(firebaseAuth, enterEmail.current.value, enterPassword.current.value)
      .then((userCredential) => {
        nav("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            setErrorMsg("비밀번호가 틀립니다.");
            break;

          case "auth/user-not-found":
            setErrorMsg("이메일이 틀립니다.");
            break;

          default:
        }
      });
  };
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      user && nav("/");
    });
  }, [nav]);
  return (
    <Wrapper>
      <Container>
        <form onSubmit={loginSubmit}>
          <InputContainer>
            <div>
              <label htmlFor="email">email :</label>
              <input type="email" ref={enterEmail} required />
            </div>

            <div>
              <label htmlFor="password">password :</label>
              <input type="password" ref={enterPassword} required />
            </div>
          </InputContainer>
          <LoginError>
            <p>{ErrorMsg}</p>
          </LoginError>
          <BtnContainer>
            <button>로그인</button>
          </BtnContainer>
        </form>
        <LinkWrapper>
          <Link to="/create">회원가입</Link>
        </LinkWrapper>
      </Container>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 300px;
  margin: 5rem 0;
  border: 1px solid #ccc;
  padding: 2rem;
  background-color: #fff;
`;

const InputContainer = styled.div`
  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  div:last-child {
    margin: 1rem 0;
  }
  div > input {
    width: 50%;
    margin-left: 0.5rem;
    border-radius: 30px;
    background-color: #f9f6f0;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 30rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginError = styled.div`
  text-align: center;
  margin-bottom: 0.2rem;
  p {
    color: red;
  }
`;
