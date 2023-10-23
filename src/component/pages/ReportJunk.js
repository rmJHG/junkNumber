import React, { useContext, useEffect, useRef, useState } from "react";
import { dbRef, firebaseAuth } from "../../firebase";
import { push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import classes from "./style/ReportJunk.module.css";
import JunkNumContext from "../context/JunkDataContext";

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
    const number = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{3,4})(\d{4})/, "$1-$2");

    enterLastNumRef.current.value = number;
  };

  const addData = async (e) => {
    e.preventDefault();
    const enteredFirstNum = enterFirstNumRef.current.value;
    const enteredLastNum = enterLastNumRef.current.value;
    const enteredDetail = enterDetail.current.value;

    console.log(enteredDetail);

    let today = new Date();
    let year = today.getFullYear();
    let month = "00" + (today.getMonth() + 1);
    let day = "00" + today.getDate();
    const date = `${year}/${month.toString().slice(-2)}/${day
      .toString()
      .slice(-2)}`;

    if (enteredLastNum.length < 8) {
      console.log("8칸미만");
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
    setTextCount(e.target.value.length)
  }
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
    <div className={classes.container}>
      {content ? (
        <form onSubmit={addData} className={classes.reportForm}>
          <div className={classes.numberContainer}>
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
            <input
              type="text"
              required
              maxLength={9}
              ref={enterLastNumRef}
              onChange={handleLastNumInput}
            />
          </div>

          <div className={classes.notificationContainer}>
            {checkNum ? <p></p> : <p>올바른 형식의 번호가 아닙니다.</p>}
            <p>{`${textCount}/ 60`}</p>
          </div>

          <div className={classes.textInfoContainer}>
            <textarea
              className={classes.comment}
              onChange={onTextareaHandler}
              rows={20}
              maxLength={60}
              ref={enterJunkComent}
              placeholder="상세 설명"
            ></textarea>
          </div>

          <div className={classes.btnContainer}>
            <button>신고</button>
          </div>
        </form>
      ) : (
        <>로그인해주세요</>
      )}
    </div>
  );
};

export default ReportJunk;
