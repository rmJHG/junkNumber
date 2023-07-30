import React, { useEffect, useRef, useState } from "react";
import { dbRef, firebaseAuth } from "../../firebase";
import { push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import classes from "./ReportJunk.module.css";
const ReportJunk = () => {
  const nav = useNavigate();
  const [checkedType, setCheckedType] = useState("보이스피싱");
  const [content, setContent] = useState(false);
  const userNameRef = useRef(null);

  const enterFirstNumRef = useRef();
  const enterLastNumRef = useRef();

  const handleLastNumInput = (e) => {
    const number = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{3,4})(\d{4})/, "$1-$2");

    enterLastNumRef.current.value = number;
  };

  const handleRadiobox = (e) => {
    const checkValue = e.target.value;
    setCheckedType(checkValue);
  };
  const addData = async (e) => {
    e.preventDefault();
    const enteredFirstNum = enterFirstNumRef.current.value;
    const enteredLastNum = enterLastNumRef.current.value;

    let today = new Date();
    let year = today.getFullYear();
    let month = "00" + (today.getMonth() + 1);
    let day = "00" + today.getDate();

    await push(dbRef, {
      number: `${enteredFirstNum}-${enteredLastNum}`,
      postName: userNameRef.current,
      postDate: `${year}/${month.toString().slice(-2)}/${day
        .toString()
        .slice(-2)} `,
      postMS: today.getTime(),
      type: checkedType,
    }).then(() => {
      nav("/");
    });
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
    <div className={classes.reportForm}>
      {content ? (
        <form onSubmit={addData}>
          <select name="" id="" ref={enterFirstNumRef}>
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

          <div>
            <input
              type="radio"
              value="보이스피싱"
              checked={checkedType === "보이스피싱"}
              onChange={handleRadiobox}
            />
            보이스피싱
            <input
              type="radio"
              value="휴대폰광고"
              checked={checkedType === "휴대폰광고"}
              onChange={handleRadiobox}
            />
            휴대폰광고
            <input
              type="radio"
              value="보험광고"
              checked={checkedType === "보험광고"}
              onChange={handleRadiobox}
            />
            보험광고
          </div>
          <div>
            <textarea
              className={classes.comment}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <button>신고</button>
        </form>
      ) : (
        <>로그인해주세요</>
      )}
    </div>
  );
};

export default ReportJunk;
