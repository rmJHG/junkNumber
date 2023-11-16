import React, { useContext } from "react";
import DataContext from "../context/DataContext";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import styled from "styled-components";

const PostDetail = () => {
  const context = useContext(DataContext);
  const data = context.postData;
  const params = useParams();

  const msToTime = (ms) => {
    return new Date(ms).toLocaleTimeString();
  };

  if (data[params.postQuery - 1] !== undefined) {
    const { writer, title, content, postDate, postMS } =
      data[params.postQuery - 1];

    return (
      <PostContainer>
        <HeaderContainer>
          <TitleWrapper>
            <HeaderText>{title}</HeaderText>
          </TitleWrapper>

          <InfoContainer>
            <div>{writer}</div>
            <div>
              {postDate} {msToTime(postMS)}
            </div>
          </InfoContainer>
        </HeaderContainer>

        <ContentWrapper>
          <p>{content}</p>
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
const TitleWrapper = styled.div``;
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
