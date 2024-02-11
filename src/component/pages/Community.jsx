import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import Post from "../community/Post";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import PageNav from "../community/PageNav";
import styled from "styled-components";

const Community = () => {
  const nav = useNavigate();
  const [dataState, setDataState] = useState(false);
  const context = useContext(DataContext);
  const params = useParams();
  const postData = context.postData;
  const sortedPostData = postData
    .map((data, index) => {
      const newIndex = index + 1;
      return {
        index: newIndex,
        ...data,
      };
    })
    .sort((a, b) => {
      return b.index - a.index;
    });

  const chunk = (data = [], size = 1) => {
    const arr = [];

    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }

    return arr;
  };
  const chunkedData = chunk(sortedPostData, 20);

  //데이터가 있는지 확인
  useEffect(() => {
    chunkedData.length >= 1 ? setDataState(true) : setDataState(false);
  }, [chunkedData.length]);

  if (dataState) {
    return (
      <Container>
        <HeaderWrapper>
          <div>
            <p>hello world !</p>
          </div>
        </HeaderWrapper>

        <TableWrapper>
          <table>
            <colgroup>
              <col width="13%" />
              <col width="50%" />
              <col width="17%" />
              <col width="20%" />
            </colgroup>
            <TableHead>
              <tr>
                <td>No</td>
                <td>제목</td>
                <td>작성자</td>
                <td>작성일</td>
              </tr>
            </TableHead>
            <TableListContainer>
              {chunkedData[params.commuQuery - 1].map((data) => {
                return (
                  <Post key={data.id} id={data.id} index={data.index} title={data.title} writer={data.writer} postMS={data.postMS} postDate={data.postDate} />
                );
              })}
            </TableListContainer>
          </table>
        </TableWrapper>

        <BtnWrapper>
          <button
            onClick={() => {
              nav("/community/write");
            }}
          >
            글쓰기
          </button>
        </BtnWrapper>
        <PageNav />
      </Container>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
};

export default Community;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 576px) {
    padding: 0;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 0;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 0 5%;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 0 8%;
  }

  @media (min-width: 1200px) {
    padding: 0 15%;
  }
`;
const HeaderWrapper = styled.header`
  width: 100%;
  height: 2rem;
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004080;
  color: white;
  font-family: Ramche;
`;
const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1px solid #ccc;
  background-color: white;

  table {
    width: 100%;
    height: 100%;
  }

  td {
    padding: 4px;
    font-size: 14px;
  }
`;
const TableHead = styled.thead`
  border-bottom: 1px solid #ccc;
  tr > td {
    padding: 0.6rem;
    text-align: center;
  }
`;

const TableListContainer = styled.tbody`
  tr {
    &:hover {
      background-color: #ccc;
    }
    border-bottom: 1px solid #ccc;
  }
  tr > td {
    padding: 0.5rem;
  }
  tr > td:nth-child(2):hover {
    cursor: pointer;
  }
`;
const BtnWrapper = styled.div`
  width: 100%;
  margin-top: 0.3rem;
  display: flex;
  justify-content: flex-end;
  button {
    border: 1px solid #ccc;
    padding: 0.5rem 0.7rem;
    background-color: white;
  }
`;
