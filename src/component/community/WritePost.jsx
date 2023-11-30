import { push } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { firebaseAuth, postDbRef } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginRequired from "../authentication/LoginRequired";
import DataContext from "../context/DataContext";
import styled from "styled-components";

const WritePost = () => {
  const nav = useNavigate();
  const context = useContext(DataContext);
  const [content, setContent] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState();
  const titleRef = useRef();
  const contentRef = useRef();

  const addPost = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = "00" + (today.getMonth() + 1);
    let day = "00" + today.getDate();
    const date = `${year}/${month.toString().slice(-2)}/${day.toString().slice(-2)}`;
    push(postDbRef, {
      writer: userDisplayName,
      content: contentRef.current.value,
      title: titleRef.current.value,
      postDate: date,
      postMS: today.getTime(),
    }).then(() => {
      nav(-1);
      context.refreshFn();
    });
  };
  useEffect(() => {
    const checkLogin = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setContent(true);
        setUserDisplayName(user.displayName);
      } else {
        setContent(false);
      }
    });
    return () => checkLogin();
  }, [nav]);
  return (
    <MainWrapper>
      {content ? (
        <Container>
          <input type="text" ref={titleRef} />
          <textarea ref={contentRef}></textarea>
          <button onClick={addPost}>작성하기</button>
        </Container>
      ) : (
        <LoginRequired />
      )}
    </MainWrapper>
  );
};

export default WritePost;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  input {
    border: 1px solid #ccc;
  }
  textarea {
    height: 500px;
    margin-top: 0.3rem;
    border: 1px solid #ccc;
    resize: none;
  }
  button {
    margin-top: 0.5rem;
    height: 2rem;
  }
`;
