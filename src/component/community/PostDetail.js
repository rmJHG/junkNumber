import React, { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "../../firebase";
import { ref, remove } from "firebase/database";
import { useRecoilState } from "recoil";
import { contentData, keyData, titleData } from "../store/PostData";

const PostDetail = () => {
  const nav = useNavigate();
  const context = useContext(DataContext);
  const data = context.postData;
  const params = useParams();
  const [isWriter, setIsWriter] = useState();
  const msToTime = (ms) => {
    return new Date(ms).toLocaleTimeString();
  };
  const [titleState, setTitleState] = useRecoilState(titleData);
  const [contentState, setContentState] = useRecoilState(contentData);
  const [keyState, setKeyState] = useRecoilState(keyData);

  //데이터가 없을 경우 로딩창을 출력, 있을 경우 정상적인 게시글 출력
  if (data[params.postQuery - 1] !== undefined) {
    const { id, writer, title, content, postDate, postMS } = data[params.postQuery - 1];
    //로그인이 된 상태를 확인하고 유저네임이 있을 경우 작성자인지 확인
    onAuthStateChanged(firebaseAuth, (user) => {
      user?.displayName === writer ? setIsWriter(true) : setIsWriter(false);
    });
    const getRef = ref(firebaseDb, `/posts/${id}`);

    const updateBtnHandler = () => {
      setTitleState(title);
      setContentState(content);
      setKeyState(id);
      nav("/community/post/edit");
    };

    const deleteBtnHandler = () => {
      remove(getRef);
      nav("/");
      context.refreshFn();
    };
    return (
      <PostContainer>
        <HeaderContainer>
          <TitleContainer>
            <HeaderText>{title}</HeaderText>
            {isWriter && (
              <ControlContainer>
                <button onClick={updateBtnHandler}>수정</button>
                <button onClick={deleteBtnHandler}>삭제</button>
              </ControlContainer>
            )}
          </TitleContainer>

          <InfoContainer>
            <div>{writer}</div>
            <div>
              {postDate} {msToTime(postMS)}
            </div>
          </InfoContainer>
        </HeaderContainer>

        <ContentWrapper>
          <Content>{content}</Content>
        </ContentWrapper>
      </PostContainer>
    );
  } else {
    return <Loading />;
  }
};

export default PostDetail;

//styled-components 를 배우기
const PostContainer = styled.div`
  max-height: 100%;
  min-height: calc(100% - 7.5rem);
  padding: 0.5rem 0.3rem;
`;
const HeaderContainer = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid gray;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.p`
  font-size: 20px;
`;

const InfoContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: gray;
`;

const ContentWrapper = styled.div`
  margin-top: 1rem;
  font-size: 200px;
`;

const Content = styled.pre`
  font-size: 15px;
`;
