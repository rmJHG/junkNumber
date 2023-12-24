import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";
import styled from "styled-components";

const SignInSuccess = () => {
  const nav = useNavigate();

  const navLogin = () => {
    nav("/login");
  };
  const navMain = () => {
    nav("/");
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        nav("/");
      }
    });
  }, [nav]);

  return (
    <Container>
      <div>
        <p>회원가입 완료.</p>
      </div>
      <BtnContainer>
        <button onClick={navLogin}>로그인</button>
        <button onClick={navMain}>메인으로</button>
      </BtnContainer>
    </Container>
  );
};

export default SignInSuccess;

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  margin-top: 50px;
`;
