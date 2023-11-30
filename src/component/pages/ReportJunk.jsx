import React, { useContext, useEffect, useRef, useState } from "react";
import { dbRef, firebaseAuth } from "../../firebase";
import { push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import JunkNumContext from "../context/DataContext";
import LoginRequired from "../authentication/LoginRequired";
import styled from "styled-components";

const ReportJunk = () => {
  const context = useContext(JunkNumContext);
  const nav = useNavigate();

  const [content, setContent] = useState(false);
  const [checkNum, setCheckNum] = useState(true);
  const [textCount, setTextCount] = useState(0);
  const userNameRef = useRef(null);

  const enterFirstNumRef = useRef();
  const enterLastNumRef = useRef();
  const enterJunkComent = useRef();
  const enterDetail = useRef();
  const handleLastNumInput = (e) => {
    const number = e.target.value.replace(/[^0-9]/g, "").replace(/^(\d{3,4})(\d{4})/, "$1-$2");

    enterLastNumRef.current.value = number;
  };

  const addData = async (e) => {
    e.preventDefault();
    const enteredFirstNum = enterFirstNumRef.current.value;
    const enteredLastNum = enterLastNumRef.current.value;
    const enteredDetail = enterDetail.current.value;

    let today = new Date();
    let year = today.getFullYear();
    let month = "00" + (today.getMonth() + 1);
    let day = "00" + today.getDate();
    const date = `${year}/${month.toString().slice(-2)}/${day.toString().slice(-2)}`;

    if (enteredLastNum.length < 8) {
      setCheckNum(false);
    } else {
      await push(dbRef, {
        number: `${enteredFirstNum}-${enteredLastNum}`,
        postName: userNameRef.current,
        postDate: date,
        postMS: today.getTime(),
        type: enteredDetail,
        coment: enterJunkComent.current.value,
      }).then(() => {
        context.refreshFn();
        nav("/");
      });
    }
  };

  const onTextareaHandler = (e) => {
    setTextCount(e.target.value.length);
  };
  useEffect(() => {
    const fetchData = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        userNameRef.current = user.displayName;
        setContent(true);
      } else {
        setContent(false);
      }
    });

    return () => {
      fetchData();
    };
  }, []);

  return (
    <Container>
      {content ? (
        <ReportForm onSubmit={addData}>
          <NumberContainer>
            <select ref={enterDetail}>
              <option value="문자광고">문자광고</option>
              <option value="휴대폰광고">휴대폰광고</option>
              <option value="보험광고">보험광고</option>
              <option value="사칭사기">사칭사기</option>
            </select>
            <select ref={enterFirstNumRef}>
              <option value="02">02</option>
              <option value="031">031</option>
              <option value="032">032</option>
              <option value="033">033</option>
              <option value="041">041</option>
              <option value="042">042</option>
              <option value="043">043</option>
              <option value="044">044</option>
              <option value="051">051</option>
              <option value="052">052</option>
              <option value="053">053</option>
              <option value="054">054</option>
              <option value="055">055</option>
              <option value="061">061</option>
              <option value="062">062</option>
              <option value="063">063</option>
              <option value="064">064</option>
              <option value="010">010</option>
              <option value="070">070</option>
            </select>
            <input type="text" required maxLength={9} ref={enterLastNumRef} onChange={handleLastNumInput} />
          </NumberContainer>

          <TextComentWrapper>
            <CommentBox onChange={onTextareaHandler} rows={20} maxLength={60} ref={enterJunkComent} placeholder="상세 설명"></CommentBox>
          </TextComentWrapper>

          <NotificationContainer>
            {checkNum ? <p></p> : <p>올바른 형식의 번호가 아닙니다.</p>}
            <p>{`${textCount}/ 60`}</p>
          </NotificationContainer>
          <BtnWrapper>
            <button>신고</button>
          </BtnWrapper>
        </ReportForm>
      ) : (
        <LoginRequired />
      )}
    </Container>
  );
};

export default ReportJunk;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;

const ReportForm = styled.form`
  width: 500px;
  height: 100%;
  margin-top: 5rem;
  border: 1px solid #ccc;
  padding: 3rem 2rem 2rem 2rem;
  background-color: #fff;

  &:first-child {
    justify-content: left;
  }
`;

const NumberContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  select,
  input {
    border: none;
    padding: 5px 10px;
  }
  select {
    width: 25%;
    padding-left: 1rem;
  }
  select:nth-child(2) {
    padding-left: 1.5rem;
    width: 15%;
  }
  input {
    box-sizing: border-box;
    padding-left: 1.5rem;
    width: 50%;
  }
`;

const NotificationContainer = styled.div`
  margin-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
  p:first-child {
    color: red;
  }
`;

const TextComentWrapper = styled.div`
  width: 100%;
`;

const CommentBox = styled.textarea`
  width: 100%;
  height: 200px;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  resize: none;
  box-sizing: border-box;
`;

const BtnWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  button {
    width: 100%;
    height: 3rem;
    border-radius: 10px;
  }
`;
