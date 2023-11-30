import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginRequired = () => {
  const nav = useNavigate();
  const loginNavBtnHandler = () => {
    nav("/login");
  };
  return (
    <Container>
      <p>로그인이 필요한 서비스입니다.</p>
      <input type="button" value="로그인" onClick={loginNavBtnHandler} />
    </Container>
  );
};

export default LoginRequired;

const Container = styled.div`
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.3rem;
  }
  input {
    margin-top: 1.5rem;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    background-color: #004080;
    color: white;
  }
`;
