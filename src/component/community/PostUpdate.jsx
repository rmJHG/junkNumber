import React, { useContext, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { contentData, keyData, titleData } from "../store/PostData";
import { ref, update } from "firebase/database";
import { firebaseDb } from "../../firebase";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";

const PostUpdate = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const nav = useNavigate();
  const context = useContext(DataContext);
  const importedTitle = useRecoilValue(titleData);
  const importedContent = useRecoilValue(contentData);
  const importedKey = useRecoilValue(keyData);

  const getRef = ref(firebaseDb, `/posts/${importedKey}`);
  useEffect(() => {
    titleRef.current.value = importedTitle;
    contentRef.current.value = importedContent;

    if (titleRef.current.value === "" || contentRef.current.value === "") {
      nav("/");
    }
  }, [importedTitle, importedContent, importedKey, nav]);

  const updateHandler = () => {
    update(getRef, { content: contentRef.current.value, title: titleRef.current.value });
    context.refreshFn();
    nav(-1);
  };
  const cancelHandler = () => {
    nav(-1);
  };

  return (
    <Wrapper>
      <Container>
        <TitleContainer>
          <input type="text" ref={titleRef} id="title" />
        </TitleContainer>
        <ContentContainer>
          <textarea type="text" ref={contentRef} id="content"></textarea>
        </ContentContainer>
        <BtnContainer>
          <button onClick={updateHandler}>수정</button>
          <button onClick={cancelHandler}>취소</button>
        </BtnContainer>
      </Container>
    </Wrapper>
  );
};

export default PostUpdate;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 500px;
  height: 500px;
  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  text-align: center;

  input {
    width: 90%;
    padding: 0.5rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
  textarea {
    padding: 0.5rem;
    width: 90%;
    height: 400px;
    border: none;
    resize: none;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 0 0.3rem;
    padding: 0.5rem 1rem;
  }
`;
