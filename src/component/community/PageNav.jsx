import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const PageNav = () => {
  const context = useContext(DataContext);
  const postData = context.postData;
  const params = useParams();
  const [previousPageAdressState, setPreviousPageAdressState] = useState();
  const [previusPageBtnState, setPreviousPageBtnState] = useState(true);
  const [nextPageAdressState, setNextPageAdressState] = useState();
  const [nextPageBtnState, setNextPageBtnState] = useState(true);
  const chunk = (data = [], size = 1) => {
    const arr = [];

    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }

    return arr;
  };

  const chunkedData = chunk(postData, 20);

  useEffect(() => {
    // 이전 페이지 이동 버튼
    params.commuQuery > 10 && setPreviousPageBtnState(true);
    params.commuQuery > 10 ? setPreviousPageAdressState(Math.floor((params.commuQuery - 1) / 10) * 10) : setPreviousPageBtnState(false);
    //다음 페이지 이동 버튼F
    Math.floor((params.commuQuery - 1) / 10) * 10 + 10 < chunkedData.length && setNextPageBtnState(true);
    Math.floor((params.commuQuery - 1) / 10) * 10 + 10 < chunkedData.length
      ? setNextPageAdressState(Math.floor((params.commuQuery - 1) / 10) * 10 + 11)
      : setNextPageBtnState(false);
  }, [params.commuQuery, chunkedData.length]);
  //페이지 네이게이션
  const links = Array.from(chunkedData.slice(Math.floor((params.commuQuery - 1) / 10) * 10, Math.floor((params.commuQuery - 1) / 10) * 10 + 10), (_, i) => (
    <PageNavigation key={i} align="center">
      <Link to={`/community/${i + Math.floor((params.commuQuery - 1) / 10) * 10 + 1}`}>
        <p>{i + Math.floor((params.commuQuery - 1) / 10) * 10 + 1}</p>
      </Link>
    </PageNavigation>
  ));

  return (
    <Wrapper>
      <table>
        <tbody>
          <tr align="center" width="5%">
            <td>
              {previusPageBtnState ? (
                <Link to={`/community/${previousPageAdressState}`}>
                  <BtnText>&lt;이전</BtnText>
                </Link>
              ) : (
                <DisableBtnText>&lt;이전</DisableBtnText>
              )}
            </td>

            {links}

            <td>
              {nextPageBtnState ? (
                <Link to={`/community/${nextPageAdressState}`}>
                  <BtnText>다음&gt;</BtnText>
                </Link>
              ) : (
                <DisableBtnText>다음&gt;</DisableBtnText>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default PageNav;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  table {
    width: 280px;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PageNavigation = styled.td`
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  a > p {
    width: 1rem;
    font-size: 15px;
  }
`;

const BtnText = styled.p`
  width: 2.5rem;
  font-size: 100%;
`;
const DisableBtnText = styled.p`
  color: gray;
  width: 2.5rem;
  font-size: 100%;
`;
