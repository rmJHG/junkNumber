import React, { useEffect, useRef, useState } from "react";
import { dbRef, firebaseAuth } from "../../firebase";
import { push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const ReportJunk = () => {
  const enterNumber = useRef();
  const [content, setContent] = useState(null);
  const addData = async (e) => {
    e.preventDefault();

    push(dbRef, {
      number: enterNumber.current.value,
    });
  };

  const changeNumberInput = (e) => {
    const number = e.target.value.replace(/[^0-9]/g, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    enterNumber.current.value = number;
  };

 

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setContent(
          <form onSubmit={addData}>
            <input type="text" onChange={changeNumberInput} ref={enterNumber} minLength="9" />
            <button>게시</button>
          </form>
        );
      } else {
        setContent(<>로그인 해주세요</>);
      }
    });
  }, []);

  return (
    <>
      ReportJunk
      {content}
    </>
  );
};

export default ReportJunk;
