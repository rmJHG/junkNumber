import React, { useEffect, useRef, useState } from "react";
import { dbRef, firebaseAuth } from "../../firebase";
import { push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ReportJunk = () => {
  const enterNumber = useRef();
  const nav = useNavigate();
  const [content, setContent] = useState(null);
  const userNameRef = useRef(null);

  const changeNumberInput = (e) => {
    const number = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    enterNumber.current.value = number;
  };

  const addData = async (e) => {
    e.preventDefault();
    //현재 시간구하기
    let today = new Date();
    let year = today.getFullYear();
    let month = "00" + (today.getMonth() + 1);
    let day = "00" + today.getDate();

    await push(dbRef, {
      number: enterNumber.current.value,
      postName: userNameRef.current,
      postDate: `${year}/${month.toString().slice(-2)}/${day
        .toString()
        .slice(-2)} `,
      postMS: today.getTime(),
    }).then(() => {
      nav("/");
    });
  };

  useEffect(() => {
    const fetchData = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        userNameRef.current = user.displayName;
        setContent(
          <form onSubmit={addData}>
            <input
              required
              type="text"
              maxLength={13}
              onChange={changeNumberInput}
              ref={enterNumber}
              pattern=".{9,13}"
              title="일반적으로 쓰이는 번호 양식이 아닙니다"
            />
            <button>게시</button>
          </form>
        );
      } else {
        setContent(<>로그인 해주세요</>);
      }
    });

    return () => {
      fetchData();
    };

    //eslint-disable-next-line
  }, []);

  return <>{content}</>;
};

export default ReportJunk;
